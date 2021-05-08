const functions = require('firebase-functions');
const mercadopago = require('mercadopago');
const _ = require('lodash');
const { verifyPayment } = require('./utils');
const admin = require('firebase-admin');
const app = require('./firebase');
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

exports.createPolla = functions.https.onCall(async ({ name }, context) => {
  if (!context.auth || _.isEmpty(name)) {
    return;
  }

  const docRef = await app.firestore().collection('pollas').add({
    name,
    userId: context.auth.uid,
    status: 'unpaid',
    score: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return docRef.id;
});

exports.createPreference = functions.https.onCall(
  async ({ pollas }, context) => {
    if (!context.auth || _.isEmpty(pollas)) {
      return;
    }

    console.log('asd', context.rawRequest.headers.origin);

    const validPollas = await Promise.all(pollas.map(validatePolla));

    if (!validPollas.every(Boolean)) {
      return;
    }

    const preference = {
      items: [
        {
          title: 'Pollamérica - Proyecta',
          description: pollas.toString(),
          unit_price: 1000,
          quantity: pollas.length,
        },
      ],
      back_urls: {
        success: `${context.rawRequest.headers.origin}/payment/callback`,
        pending: `${context.rawRequest.headers.origin}/payment/callback`,
        failure: `${context.rawRequest.headers.origin}/payment/callback`,
      },
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
      },
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

const validatePolla = async (pollaId) => {
  try {
    const pollaDoc = app.firestore().doc(`pollas/${pollaId}`);
    const pollaSnapshot = await pollaDoc.get();
    return pollaSnapshot.data().status === 'unpaid';
  } catch (err) {
    console.log(err);
    return false;
  }
};

// 1236490606
