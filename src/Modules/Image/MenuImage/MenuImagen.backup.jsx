import React, {useContext, useEffect, useState, useRef} from 'react';

import AppContextImagen from "../../../context/AppContextImagen";
import ModalImagen from "../../../components/ModalImagen";
import ModalImageDrag from "../../../components/ModalImageDrag";
import ModalImageGalery from "../../../components/ModalImageGalery";
import ModalImageLoading from "../../../components/ModalImageLoading";
import gatoSrc from '../../../assets/img/gato.jpeg';
import fileUpload from '../../../assets/img/file-upload.jpeg';
// UTILS:
import './MenuImagen.scss';

const MenuImagen = () => {
    // useContext:
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [toggleModalUploadImagen, setToggleModalUploadImagen] = useState(false);
    const [toggleModalDownloadImagen, setToggleModalDownloadImagen] = useState(false);
    const [nombreImagen, setNombreImagen] = useState('File...');
    const [imgsBase64, setImgsBase64] = useState([]);
    const [singleImage, setSingleImage] = useState(fileUpload);
    const [errorImage, setErrorImage] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [classDrag, setClassDrag] = useState('drag__image');
    const [image, setImage] = useState(fileUpload);
    const [imageName, setImageName] = useState('File...');
    //const [file, setFile] = useState(null);
    const [toggleModalImageGalery, setToggleModalImageGalery] = useState(false);

    const refInputFile = useRef(null);

    // LOGICA
    const typeImages = ['image/png', 'image/jpeg', 'image/jpg'];
    const imagenNew = {
        id: stateImagen.id,
        edit: true,
        visible: true,
        fileId: 0,
        filePropietario: 'VRQ',
        fileSrc: '',
        fileNombre: '',
        fileAutor: '',
        x_ini: 100,
        y_ini: 100,
        x_fin: 400,
        y_fin: 400,
        dataImagen:[],
        dataUse: false,
    };
    const openModal = () => {
        setToggleModalUploadImagen(true);
    }
    const closeModal = () => {
        setToggleModalUploadImagen(false);
    }

    const cargarImagen = (e) => {
        //console.log(e.target.files);
        if(e.target.files){
            let archivos = {};
            let imagenes = [];
            archivos = e.target.files;// array de archivos rescatados del modal
            setNombreImagen(archivos[0].name);
            let reader = new FileReader();
            reader.readAsDataURL(archivos[0]);
            reader.onloadend = () => {
                let imagenBase64 = reader.result;// imagen convertida a base64
                imagenes.push(imagenBase64);
                setImgsBase64(imagenes);
            }
        } else {
            console.log('no selecciono ninguna imagen');
        }
    }

    const clickSubirImagenFirebase = () => {
        if (imgsBase64.length > 0) {
            subirImagenFirebase(nombreImagen+'_'+Date.now(), imgsBase64[0]).then(urlImagen => {
                closeModal();
                imagenNew.fileSrc = urlImagen;
                imagenNew.fileNombre = nombreImagen;
                s_imagenAddHId(imagenNew, stateImagen.id + 1);
            });
        } else {
            closeModal();
            alert('no se subieron imagenes al servidor');
        }
    }
    const prueba = () => {
        let imagenAux = {
            id: stateImagen.id,
            edit: true,
            visible: true,
            fileId: 0,
            filePropietario: 'VRQ',
            fileSrc: 'https://firebasestorage.googleapis.com/v0/b/openboardv1.appspot.com/o/imagenes%2FIMG_20211106_215145.jpeg_1644809327286?alt=media&token=1eb2f261-f059-492e-a2ae-9c8bed9bb914',
            fileNombre: 'prueba.jpg',
            x_ini: 100,
            y_ini: 100,
            x_fin: 400,
            y_fin: 400,
            dataImagen:[],
            dataUse: false,
        };
        s_imagenAddHId(imagenAux, stateImagen.id + 1);
    }
    const pruebaLocal = () => {
        let imagenAux = {
            id: stateImagen.id,
            edit: true,
            visible: true,
            fileId: 0,
            filePropietario: 'VRQ',
            fileSrc: gatoSrc,
            fileNombre: 'gato.jpg',
            x_ini: 100,
            y_ini: 100,
            x_fin: 400,
            y_fin: 400,
            dataImagen:[],
            dataUse: false,
        };
        s_imagenAddHId(imagenAux, stateImagen.id + 1);
    }
    const pruebaData = () => {
        console.log('pruebaData');
        let id_canvas = 'canvas-1';
        let canvas = document.getElementById(id_canvas);
        let context = canvas.getContext('2d');
        console.log(context);
        let infoImagen = context.getImageData(100, 100, 400, 400);
        console.log('data:', infoImagen);
        context.putImageData(infoImagen, 500,100)
    }
    const isImageValid = (file) => {
        if (file && typeImages.includes(file.type)) {
            setErrorImage(false);
            return true;
        } else {
            setErrorImage(true);
            setMessageError('Archivo incorrecto');
            return false;
        }
    }
    const selectImage = () => {
        refInputFile.current.click();
    }
    const showImage = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', (e) => {
            setImage(e.target.result)
        });
        setImageName(file.name);
        setFile(file);
    }
    const addImage = (e) => {
        e.preventDefault();
        refInputFile.current.files = e.dataTransfer.files;
        const files = refInputFile.current.files;
        const file = files[0];
        if (isImageValid(file))
            showImage(file);
        else {
            setImage(fileUpload);
            setImageName('File...')
            setFile(null);
        }
    }
    const uploadImage = (e) => {
        const files = e.target.files;
        const file = files[0];

        if (isImageValid(file))
            showImage(file);
        else {
            setImage(fileUpload);
            setImageName('File...')
            setFile(null);
        }
    }

    const openModalImageGalery = () => {
        setToggleModalUploadImagen(true);
        setToggleModalImageGalery(true);
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(()=>{
        //addDato();
        //getDatos();
        setTimeout(() => {
            setErrorImage(false);
        }, 5000)
    },[errorImage]);

    return (
        <>
            <article className="article__menuImagen">
                <div>
                    <input type="button" value="Subir Imagen" onClick={() => openModal()} />
                    <input type="button" value="Galeria" onClick={() => prueba()} />
                    <input type="button" value="Local" onClick={() => pruebaLocal()} />
                    <input type="button" value="Local Data" onClick={() => pruebaData()} />
                    <input type="button" value="Ver Galeria" onClick={() => openModalImageGalery()} />
                </div>
            </article>

            <ModalImagen estado={toggleModalUploadImagen} setEstado={setToggleModalUploadImagen} titulo='Subir tu imagen: JPEG, JPG, PNG'>
                {
                    loading
                        ? <ModalImageLoading
                            file={file}
                            setFile={setFile}
                            setLoading={setLoading}
                        />
                        : <ModalImageDrag
                            estado={toggleModalUploadImagen}
                            setEstado={setToggleModalUploadImagen}
                            setMedia={setFile}
                            setLoading={setLoading}
                        />
                }
                {toggleModalImageGalery && <ModalImageGalery/>}
            </ModalImagen>
        </>
    );
}

export default MenuImagen;