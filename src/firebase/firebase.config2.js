import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore";
import {addDoc, collection} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZqhS6OSCWlYTSb_AbHSGzqMGOZp3uAeQ",
    authDomain: "openboardv1.firebaseapp.com",
    projectId: "openboardv1",
    storageBucket: "openboardv1.appspot.com",
    messagingSenderId: "772552306621",
    appId: "1:772552306621:web:d993641f2e935e7ec22cd4",
    measurementId: "G-NV2BE7DLCS"
};

const app = firebase.initializeApp(firebaseConfig);
const fbFirestore = getFirestore(app);
const fbStorageRef = firebase.app().storage().ref();

export {
    fbFirestore,
    fbStorageRef,
    addDoc,
    collection
}