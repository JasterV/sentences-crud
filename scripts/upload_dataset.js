const admin = require('firebase-admin')
const axios = require('axios')
const serviceAccount = require("../.firebase.json");

(async () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore()

    const snapshot = await db.collection('sentences').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
})();
