export var admin = require("firebase-admin");
var serviceAccount = require("../firebase/keys/firebase.keys.json");


try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.DATABASE_URL,
        });

    }
} catch (err) {
    console.log(err);
}

export const firestore = admin.firestore();
export const authAdmin = admin.auth();
