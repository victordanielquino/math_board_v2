import { fbFirestore, addDoc, collection } from "../firebase.config2";
import {getDocs} from "firebase/firestore";

// FIRESTORE: ADD galeria
const firestoreAddDoc = async (collectionFile, autorFile, nameFile, srcFile) => {
    try {
        const docRef = await addDoc(collection(fbFirestore, collectionFile), {
            autorFile, nameFile, srcFile
        });
        //console.log('collectionRef:', docRef.id)
        return docRef.id;
    } catch (err){
        console.log('error al subir imagen a collection:',err);
        return null;
    }
}
// FIRESTORE: ADD galeria
const firestoreAdd = async (collectionName, fk_user='0', url_pdf= '0', timeStamp, date) => {
    try {
        const docRef = await addDoc(collection(fbFirestore, collectionName), {fk_user, url_pdf, timeStamp, date});
        //console.log('collectionRef:', docRef.id)
        return docRef.id;
    } catch (err){
        console.log('error al subir imagen a collection:',err);
        return null;
    }
}
const firestoreConverArray = (array) => {
    let newArray = [];
    array.forEach(doc => {
        let obj = {
            id: doc.id,
            autorFile: doc.data().autorFile,
            nameFile: doc.data().nameFile,
            srcFile: doc.data().srcFile,
        }
        newArray.push(obj);
    })
    return newArray;
}
const firestoreGetDocs = async (collectionName) => {
    try {
        //const datos = await getDocs(collection(fbFirestore, collectionName));
        /*datos.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.id);
            console.log(doc.data());
        });*/
        //return datos;
        return await getDocs(collection(fbFirestore, collectionName));
        // const array = firestoreConverArray(resp);
        // return array;
    }
    catch (e) {
        console.log('error al descargar de firestore:', e);
        return null;
    }
}
const firestoreMostrarDocs = (array) => {
    console.log("MOSTRAR:")
    let array2 = firestoreConverArray(array);
    array.forEach((elem) => {
        console.log('id:', elem.id);
        console.log('data:', elem.autorFile);
    });
    array2.map(x => console.log('hello:',x));
}
export {
    firestoreAddDoc,
    firestoreGetDocs,
    firestoreMostrarDocs,
    firestoreAdd
}