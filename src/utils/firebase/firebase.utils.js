// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeAhM3r_P2iP0RsV6CYCPKTUAo4XfZzok",
  authDomain: "crwn-clothing-db-7577e.firebaseapp.com",
  projectId: "crwn-clothing-db-7577e",
  storageBucket: "crwn-clothing-db-7577e.appspot.com",
  messagingSenderId: "345749511675",
  appId: "1:345749511675:web:aa997044c3e9bc751f7f5e",
  measurementId: "G-6VNX3WXRFC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider= new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInwithGooglePopup = ( ) => signInWithPopup(auth, provider);

//Firestore...
//creating the db equal to calling getFirestore
export const db = getFirestore();

// to use it.. i.e //adding authenticated users from auth to firestore
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    // console.log(userDocRef);
    //snapshot allows us access the data and check if its exists...
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot)
    //to check if this document exists, we use the exista method...
    // console.log(userSnapshot.exists)

    // if user data does not exist.
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        // create/ set the document with the data from userAuth in my collection
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    // if user data exists
    // if true, do nothing, just return the userDocRef
    return userDocRef;
}