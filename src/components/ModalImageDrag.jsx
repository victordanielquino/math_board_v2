import React, {useContext, useEffect, useState, useRef} from 'react';

import AppContextImagen from "../context/AppContextImagen";
import fileUpload from '../assets/img/file-upload.jpeg';
//import {storageAddFile, getFecha} from "../firebase/services/firebase.services";
import { firestoreAddDoc, firestoreGetDocs, firestoreMostrarDocs } from '../firebase/services/firestore.services';
import { storageAddFile, getFecha } from "../firebase/services/storage.services";
// UTILS:
import '../styles/MenuImagen.scss';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from "@mui/icons-material/Download";
import {Button} from "@mui/material";

const ModalImageDrag = ({
                            estadoModalImage,
                            setEstadoModalImage,
                            setMedia,
                            setLoading
}) => {
    // useContext:
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);
    const [errorImage, setErrorImage] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [classDrag, setClassDrag] = useState('drag__image');
    const [image, setImage] = useState(fileUpload);
    const [imageName, setImageName] = useState('File...');
    const [file, setFile] = useState(null);
    // useRef:
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
        // guardamos el archivo para pasar al padre
        setMedia(file);
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
    const handleSave = () => {
        if (file) {
            let autor = document.getElementById('inputTextAutor').value;
            (autor === '' || autor === null || autor.length === 0) ? imagenNew.fileAutor = 'all': imagenNew.fileAutor = autor;
            setLoading(true);
            storageAddFile(imageName+'_'+Date.now(), image)
                .then((urlImagen) => {
                    setEstadoModalImage(false);// cerrar modal
                    setLoading(false);// cerrar loading...
                    imagenNew.fileSrc = urlImagen;
                    imagenNew.fileNombre = imageName;
                    s_imagenAddHId(imagenNew, stateImagen.id + 1);
                    firestoreAddDoc('galeria', imagenNew.fileAutor, imagenNew.fileNombre, imagenNew.fileSrc)
                        .then( resp => imagenNew.fileId = resp );
                });
        }
        else {
            setErrorImage(true);
            setMessageError('Primero elija una imagen.');
/*
            console.log(getFecha())
            firestoreGetDocs('galeria')
                .then(array => firestoreMostrarDocs(array));*/
        }
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(()=>{
        setTimeout(() => {
            setErrorImage(false);
        }, 5000)
    },[errorImage]);

    return (
        <>
            {
                estadoModalImage &&
                <div className='drag'>
                    {errorImage && <div className='drag__error'>{messageError}</div>}
                    <input type='text' className='drag__inputText' placeholder='Autor...' id='inputTextAutor' />
                    <input type='file' className='drag__file' id='drag_fileId' accept='.png, .jpg, .jpeg' ref={refInputFile} onChange={uploadImage}/>
                    <div className={classDrag}
                         onDragOver={(e) => {
                             e.preventDefault();
                             setClassDrag('drag__image active');
                         }}
                         onDragLeave={(e) => {
                             e.preventDefault();
                             setClassDrag('drag__image');
                         }}
                         onClick={selectImage}
                         onDrop={addImage}
                    >
                        <img src={image} width='150px' height='150px' alt='' className='drag__image__preview' />
                        <span className='drag__image__message'>Haga click o arrastre una imagen aqui.</span>
                    </div>
                    <p className='drag__info'>{imageName}</p>
                    {/*<button className='drag__save' onClick={() => {handleSave()}}>Save Image</button>*/}
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<UploadIcon/>}
                        onClick={() => handleSave()}
                    >SAVE IMAGE</Button>
                </div>
            }
        </>
    );
}

export default ModalImageDrag;