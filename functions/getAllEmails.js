const admin = require('firebase-admin');
const serviceAccount = require('./prodServiceKey.json');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getPollas = async () => {
  const pollasReference = app.firestore().collection('pollas');
  const pollasQuery = pollasReference.where('status', '==', 'paid');
  const pollas = await pollasQuery.get();
  return pollas;
};

getPollas().then((pollas) => {
  pollas.forEach(async (pollaDoc) => {
    const user = await admin.auth().getUser(pollaDoc.data().userId);
    console.log(user.email);
  });
});
