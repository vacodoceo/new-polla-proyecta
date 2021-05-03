const admin = require('firebase-admin');
const functions = require('firebase-functions');
const mercadopago = require('mercadopago');

const app = admin.initializeApp();

require('dotenv').config();

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

exports.createPolla = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return;
  }

  const preference = {
    items: [
      {
        title: 'Pollamérica - Proyecta',
        description: data.name,
        unit_price: 1000,
        quantity: 1,
      },
    ],
    back_urls: {
      success: `${process.env.FRONTEND_URL}/payment`,
      pending: `${process.env.FRONTEND_URL}/payment`,
      failure: `${process.env.FRONTEND_URL}/payment`,
    },
  };
  const preferenceResponse = await mercadopago.preferences.create(preference);
  const preferenceId = preferenceResponse.body.id;

  await app
    .firestore()
    .doc(`pollas/${preferenceId}`)
    .set({
      ...data,
      userId: context.auth.uid,
    });

  return preferenceId;
});

exports.validatePayment = functions.https.onCall(async (data, context) => {
  return;
});
