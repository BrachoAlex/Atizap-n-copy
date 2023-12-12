import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import firebase storage
import 'firebase/storage';
import 'firebase/firestore';

//*Usar.env.local

if (!firebase.apps.length) {

    firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    });
}
export default firebase;

