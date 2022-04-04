// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
// we dont need to setup a new provider for native providers like email/pwd or phoneno.. we just use
//the method above called createUserWithEmailAndPassword
//doc is used to get a document instance
//getdoc n setdoc is used to get the actual data in a document


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

const googleprovider= new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ( ) => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth , googleprovider);    

//creating the firestore database...
export const db = getFirestore();

// to use it.. i.e //adding authenticated users from auth to firestore
// this userAuth below is gotten from the Googlesignin page
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

    //doc takes 3 things, 1 the database, the collection (e.g users), and lastly the identifier (e.g pry key)
    const userDocRef = doc(db, "users", userAuth.uid);
    // console.log(userDocRef);

    //snapshot allows us access the data and check if its exists...
    //getDoc retrieves the document for our userDocRef
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot)

    //to check if this document exists, we use the exists method...
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
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    // if user data exists
    // if true, i.e else {do nothing, just return the userDocRef}
    return userDocRef;
}

//create / SignUp user with native email and password without an explicit provider setup
//native providers do not need to be set up explicitly by the developer...
export const createAuthUserWithEmailAndPassword =  async (email, password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword =  async (email, password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser= async ()=> await signOut(auth)