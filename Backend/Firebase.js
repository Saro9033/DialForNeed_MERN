const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/Firebase-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mern-dialforneed.appspot.com'
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = bucket;
