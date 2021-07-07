const functions = require('firebase-functions');
const mercadopago = require('mercadopago');
const _ = require('lodash');
const { verifyPayment } = require('./utils');
const admin = require('firebase-admin');
const app = require('./firebase');
require('dotenv').config();

mercadopago.configure({
  access_token: functions.config().mercadopago.access_token
});

exports.createPolla = functions.https.onCall(
  async ({ name, results, seller }, context) => {
    if (!context.auth || _.isEmpty(name)) {
      return;
    }

    const docRef = await admin
      .firestore()
      .collection('pollas')
      .add({
        name,
        results,
        seller,
        userId: context.auth.uid,
        status: 'unpaid',
        score: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

    return docRef.id;
  }
);

exports.createPreference = functions.https.onCall(
  async ({ pollas }, context) => {
    if (!context.auth || _.isEmpty(pollas)) {
      return;
    }

    const getPrice = quantity => {
      if (quantity < 2) return 3000;
      else if (quantity < 7) return 2500;
      return 2000;
    };

    const validPollas = await Promise.all(pollas.map(validatePolla));

    if (!validPollas.every(Boolean)) {
      return;
    }

    const preference = {
      items: [
        {
          title: 'Pollamérica - Proyecta',
          description: pollas.toString(),
          unit_price: getPrice(pollas.length),
          quantity: pollas.length
        }
      ],
      back_urls: {
        success: `${context.rawRequest.headers.origin}/payment/callback`,
        pending: `${context.rawRequest.headers.origin}/payment/callback`,
        failure: `${context.rawRequest.headers.origin}/payment/callback`
      },
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }]
      }
    };

    const preferenceResponse = await mercadopago.preferences.create(preference);
    const preferenceId = preferenceResponse.body.id;

    return preferenceId;
  }
);

exports.verifyPayment = functions.https.onCall(async (data, context) => {
  const { paymentId } = data;

  if (!context.auth || !paymentId) {
    return;
  }

  try {
    const status = await verifyPayment(paymentId);
    return status;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});

exports.webhookVerifyPayment = functions.https.onRequest(async (req, res) => {
  console.log(req.body);
  if (req.method === 'POST') {
    const { data } = req.body;
    const paymentId = data.id;

    try {
      const status = await verifyPayment(paymentId);
      res.send(status);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  } else {
    res.status(400);
  }
});

const validatePolla = async pollaId => {
  try {
    const pollaDoc = app.firestore().doc(`pollas/${pollaId}`);
    const pollaSnapshot = await pollaDoc.get();
    return pollaSnapshot.data().status === 'unpaid';
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.onUpdateMatchesResultsTrigger = functions.firestore
  .document('matches/results')
  .onUpdate(async change => {
    const updatedResults = change.after.data();

    const pollasReference = app.firestore().collection('pollas');
    const pollasQuery = pollasReference.where('status', '==', 'paid');
    const pollas = await pollasQuery.get();

    pollas.forEach(pollaDoc => {
      const polla = pollaDoc.data();
      const score = getScore(polla.results, updatedResults);
      pollaDoc.ref.update({ score });
      console.log(pollaDoc.id, score);
    });
  });

const getScore = (pollaResults, updatedResults) => {
  let score = 0;

  const { groups: pollaGroups } = pollaResults;
  const { groups: updatedGroups } = updatedResults;
  Object.keys(updatedGroups).forEach(group => {
    updatedGroups[group].forEach((country, standing) => {
      if (pollaGroups[group][standing] === country) score += 5;
    });
  });

  const { quarterFinals: pollaQuarters } = pollaResults;
  const { quarterFinals: updatedQuarters } = updatedResults;

  updatedQuarters.forEach((updatedMatch, index) => {
    const pollaMatch = pollaQuarters[index];
    if (getMatchWinner(pollaMatch) === getMatchWinner(updatedMatch)) score += 5;
    if (pollaMatch.firstCountry.score === updatedMatch.firstCountry.score)
      score += 2;
    if (pollaMatch.secondCountry.score === updatedMatch.secondCountry.score)
      score += 2;

    const pollaScoreDiff =
      pollaMatch.firstCountry.score - pollaMatch.secondCountry.score;
    const updatedScoreDiff =
      updatedMatch.firstCountry.score - updatedMatch.secondCountry.score;
    if (pollaScoreDiff === updatedScoreDiff) score += 1;
  });

  const { semiFinals: pollaSemis } = pollaResults;
  const { semiFinals: updatedSemis } = updatedResults;

  updatedSemis.forEach((updatedMatch, index) => {
    const pollaMatch = pollaSemis[index];
    if (getMatchWinner(pollaMatch) === getMatchWinner(updatedMatch)) score += 5;
    if (pollaMatch.firstCountry.score === updatedMatch.firstCountry.score)
      score += 2;
    if (pollaMatch.secondCountry.score === updatedMatch.secondCountry.score)
      score += 2;

    const pollaScoreDiff =
      pollaMatch.firstCountry.score - pollaMatch.secondCountry.score;
    const updatedScoreDiff =
      updatedMatch.firstCountry.score - updatedMatch.secondCountry.score;
    if (pollaScoreDiff === updatedScoreDiff) score += 1;
  });

  const { finals: pollaFinals } = pollaResults;
  const { finals: updatedFinals } = updatedResults;

  updatedFinals.forEach((updatedMatch, index) => {
    const pollaMatch = pollaFinals[index];
    if (getMatchWinner(pollaMatch) === getMatchWinner(updatedMatch)) score += 5;
    if (pollaMatch.firstCountry.score === updatedMatch.firstCountry.score)
      score += 2;
    if (pollaMatch.secondCountry.score === updatedMatch.secondCountry.score)
      score += 2;

    const pollaScoreDiff =
      pollaMatch.firstCountry.score - pollaMatch.secondCountry.score;
    const updatedScoreDiff =
      updatedMatch.firstCountry.score - updatedMatch.secondCountry.score;
    if (pollaScoreDiff === updatedScoreDiff) score += 1;
  });

  return score;
};

const getMatchWinner = match => {
  if (match.firstCountry.winner) return match.firstCountry.value;
  return match.secondCountry.value;
};
