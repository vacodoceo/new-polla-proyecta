const app = require('./../firebase');
const axios = require('axios');

const verifyPayment = async (paymentId) => {
  const paymentsURL = 'https://api.mercadopago.com/v1/payments/';
  const response = await axios.get(paymentsURL + paymentId, {
    headers: {
      authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });

  const pollasId = response.data.additional_info.items[0].description.split(
    ','
  );
  const updatePollasPromises = pollasId.map(payPolla);
  await Promise.all([updatePollasPromises]);

  return response.data.status;
};

const payPolla = async (pollaId) => {
  try {
    const pollaDoc = app.firestore().doc(`pollas/${pollaId}`);
    const updateResult = await pollaDoc.update({ status: 'paid' });
    return updateResult;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  verifyPayment,
};
