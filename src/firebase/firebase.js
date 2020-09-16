import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDCFH88utL2Paja7m0Jgk4656l8PACvHHY",
  authDomain: "crwn-db-692a7.firebaseapp.com",
  databaseURL: "https://crwn-db-692a7.firebaseio.com",
  projectId: "crwn-db-692a7",
  storageBucket: "crwn-db-692a7.appspot.com",
  messagingSenderId: "1047014129609",
  appId: "1:1047014129609:web:0ecbf66f8ebf4fe1ecb218",
  measurementId: "G-ZLC22GYGM6",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;