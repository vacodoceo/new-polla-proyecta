const functions = require('firebase-functions');
const app = require('./../firebase');
const axios = require('axios');

const verifyPayment = async (paymentId) => {
  const paymentsURL = 'https://api.mercadopago.com/v1/payments/';
  const response = await axios.get(paymentsURL + paymentId, {
    headers: {
      authorization: `Bearer ${functions.config().mercadopago.access_token}`,
    },
  });

  if (response.data.status === 'approved') {
    const pollasId =
      response.data.additional_info.items[0].description.split(',');
    const price = Number(response.data.additional_info.items[0].unit_price);
    const updatePollasPromises = pollasId.map((pollaId) =>
      payPolla(pollaId, price, paymentId)
    );
    await Promise.all([updatePollasPromises]);
  }

  return response.data.status;
};

const payPolla = async (pollaId, price, paymentId) => {
  try {
    const pollaDoc = app.firestore().doc(`pollas/${pollaId}`);
    const updateResult = await pollaDoc.update({
      status: 'paid',
      price,
      paymentId,
    });
    return updateResult;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  verifyPayment,
};
