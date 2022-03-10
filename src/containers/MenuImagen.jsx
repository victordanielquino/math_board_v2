import React, {useContext, useEffect, useState, useRef} from 'react';

import AppContextImagen from "../context/AppContextImagen";
import ModalImagen from "../components/ModalImagen";
import ModalImageDrag from "../components/ModalImageDrag";
import ModalImageGalery from "../components/ModalImageGalery";
import ModalImageLoading from "../components/ModalImageLoading";

// UTILS:
import '../styles/MenuImagen.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CollectionsIcon from '@mui/icons-material/Collections';
import {Button} from "@mui/material";

const MenuImagen = () => {
    // useContext:
    const [file, setFile] = useState(null);
    const [toggleModalImage, setToggleModalImage] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [title, setTitle] = useState('');

    const [toggleModalImageGalery, setToggleModalImageGalery] = useState(false);
    const [toggleModalImageDrag, setToggleModalImageDrag] = useState(false);
    const [toggleModalImageLoading, setToggleModalImageLoading] = useState(false);


    // LOGICA
    const openModal = () => {
        setToggleModalImage(true);
    }
    const openModalImageDrag = () => {
        setTitle('Subir tu imagen: JPEG, JPG, PNG');
        setToggleModalImage(true);
        setToggleModalImageDrag(true);
        setToggleModalImageGalery(false);
    }
    const openModalImageGalery = () => {
        setTitle('Galeria de Imagenes:');
        setToggleModalImage(true);
        setToggleModalImageDrag(false);
        setToggleModalImageGalery(true);
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(()=>{
        setTimeout(() => {
            setErrorImage(false);
        }, 5000)
    },[errorImage]);
    useEffect(() => {
        setToggleModalImageDrag(false);
    }, [toggleModalImageLoading])

    return (
        <>
            <article className="article__menuImagen">
                <div>
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<CreateNewFolderIcon/>}
                        onClick={() => openModalImageDrag()}
                    >ADD IMAGE</Button>
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<CollectionsIcon/>}
                        onClick={() => openModalImageGalery()}
                    >GALERIA</Button>
                </div>
            </article>

            <ModalImagen estado={toggleModalImage} setEstado={setToggleModalImage} titulo={title}>
                { toggleModalImageLoading && <ModalImageLoading/> }
                { toggleModalImageDrag &&
                    <ModalImageDrag
                        estadoModalImage={toggleModalImage}
                        setEstadoModalImage={setToggleModalImage}
                        setMedia={setFile}
                        setLoading={setToggleModalImageLoading}
                    />
                }
                { toggleModalImageGalery &&
                    <ModalImageGalery
                        estadoModalImage = {toggleModalImage}
                        setEstadoModalImage = {setToggleModalImage}
                    />
                }
            </ModalImagen>
        </>
    );
}

export default MenuImagen;