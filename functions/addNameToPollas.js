const admin = require('firebase-admin');
const app = admin.initializeApp();

const getPollas = async () => {
  const pollasReference = app.firestore().collection('pollas');
  const pollasQuery = pollasReference.where('status', '==', 'paid');
  const pollas = await pollasReference.get();
  return pollas;
};

getPollas().then((pollas) => {
  pollas.forEach(async (pollaDoc) => {
    const user = await admin.auth().getUser(pollaDoc.data().userId);
    console.log(user);
  });
});
