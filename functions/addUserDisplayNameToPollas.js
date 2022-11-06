const admin = require('firebase-admin');
const serviceAccount = require('./prodServiceKey.json');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getPollas = async () => {
  const pollasReference = app.firestore().collection('pollas_qatar');
  const pollasQuery = pollasReference.where('status', '==', 'paid');
  const pollas = await pollasReference.get();
  return pollas;
};

getPollas().then((pollas) => {
  pollas.forEach(async (pollaDoc) => {
    const user = await admin.auth().getUser(pollaDoc.data().userId);
    if (user.displayName) {
      pollaDoc.ref.update({ userDisplayName: user.displayName });
    }
  });
});
