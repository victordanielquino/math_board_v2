// CLOUD FIRESTORE
import {addDoc, collection, getDocs} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// CLOUD STORAGE:
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import {firebaseConfig} from "../firebase/firebase.config";

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storageRef = firebase.app().storage().ref();
// OPTENER DATOS DE FIREBASE
const getDatos = async () => {
    const datos = await getDocs(collection(db, "usuarios"));
    datos.forEach((documento) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        console.log(documento.data());
        //setToggleModalUploadImagen(false);
    });
}
// SUBIR DATOS
const addDato = async () => {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), {
            nombre: "Adan",
            edad: "22",
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (err){
        console.log('error al subir imagen:',err);
    }
}
// SUBIR DATOS
const addDatoGaleria = async (nameGaleria, autor, src, nombre) => {
    try {
        const docRef = await addDoc(collection(db, nameGaleria), {
            autor: autor,
            src: src,
            nombre: nombre,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (err){
        console.log('error al subir imagen:',err);
    }
}
// SUBIR IMAGEN:
const subirImagenFirebase = async (nombre, imgBase64) => {
    try {
        let respuesta = await storageRef.child('imagenes/'+nombre).putString(imgBase64, 'data_url');
        return await respuesta.ref.getDownloadURL();
    } catch (e) {
        console.log(e);
        return null;
    }
}
export {
    getDatos,
    addDato,
    subirImagenFirebase,
    addDatoGaleria
}