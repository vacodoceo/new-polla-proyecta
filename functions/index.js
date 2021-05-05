const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');
const mercadopago = require('mercadopago');
const _ = require('lodash');

const app = admin.initializeApp();

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
  });

  return docRef.id;
});

exports.createPreference = functions.https.onCall(
  async ({ pollas }, context) => {
    if (!context.auth || _.isEmpty(pollas)) {
      return;
    }

    const validPollas = await Promise.all(pollas.map(validatePolla));
    console.log(validPollas);

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
        success: `${process.env.FRONTEND_URL}/payment/callback`,
        pending: `${process.env.FRONTEND_URL}/payment/callback`,
        failure: `${process.env.FRONTEND_URL}/payment/callback`,
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
  const { payment_id } = data;
  if (!context.auth || _.isEmpty(payment_id)) {
    return false;
  }

  try {
    const paymentsURL = 'https://api.mercadopago.com/v1/payments/';
    const response = await axios.get(paymentsURL + payment_id, {
      headers: {
        authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    return response.data.status;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});

const validatePolla = async (pollaId) => {
  try {
    const pollaDoc = app.firestore().doc(`pollas/${pollaId}`);
    const pollaSnapshot = await pollaDoc.get();
    console.log(pollaSnapshot, pollaSnapshot.data());
    return pollaSnapshot.data().status === 'unpaid';
  } catch (err) {
    console.log(err);
    return false;
  }
};
