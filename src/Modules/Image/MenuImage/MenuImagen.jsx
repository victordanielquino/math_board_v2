import React, {useContext, useEffect, useState, useRef} from 'react';

import Modal from '../../../components/Modal/Modal';
import AddImageLocal from "../AddImageLocal/AddImageLocal";
import AddImageServer from "../AddImageServer/AddImageServer";
import GalleryImageServer from "../GalleryImageServer/GalleryImageServer";
import ModalUI from "../../../components/ModalUI/ModalUI";

// UTILS:
import './MenuImagen.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CollectionsIcon from '@mui/icons-material/Collections';
import {Button} from "@mui/material";

const MenuImagen = () => {
    // STATE:
    const [title, setTitle] = useState('');
    const [toggleAddImageLocal, setToggleAddImageLocal] = useState(false);
    const [toggleAddImageServer, setToggleAddImageServer] = useState(false);
    const [toggleGalleryImageServer, setToggleGalleryImageServer] = useState(false);
    const [stateSuccess, setStateSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState('xs');

    // REF:

    // LOGICA
    const handleAddImageLocal = () => {
        setMaxWidth('xs');
        setTitle('ADD IMAGE LOCAL');
        setToggleAddImageLocal(true);
        setOpen(true);
    }
    const handleAddImageServer = () => {
        setMaxWidth('xs');
        setTitle('ADD IMAGE SERVER');
        setToggleAddImageServer(true);
        setOpen(true);
    }
    const handleGalleryImageServer = () => {
        setMaxWidth('md');
        setTitle('GALLERY IMAGE ON THE SERVER');
        setToggleGalleryImageServer(true);
        setOpen(true);
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(() => {
        if (!open){
            setToggleAddImageLocal(false);
            setToggleAddImageServer(false);
            setToggleGalleryImageServer(false);
        }
    }, [open]);

    return (
        <>
            <article className="article__menuImagen">
                <div className='article__menuImagen__container'>
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<CreateNewFolderIcon/>}
                        onClick={() => handleAddImageLocal()}
                    >ADD IMAGE LOCAL</Button>
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<CreateNewFolderIcon/>}
                        //onClick={() => openModalImageDrag()}
                        onClick={() => handleAddImageServer()}
                    >ADD IMAGE ON THE SERVER</Button>
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<CollectionsIcon/>}
                        onClick={() => handleGalleryImageServer()}
                    >GALLERY ON THE SERVER</Button>
                </div>
            </article>
            {/* MODAL: ADD IMAGE LOCAL */}
            <ModalUI open={open} setOpen={setOpen} setStateSuccess={setStateSuccess} maxWidth={maxWidth} title={title} >
                {toggleAddImageLocal && <AddImageLocal setOpen={setOpen} setStateSuccess={setStateSuccess} stateSuccess={stateSuccess}/>}
                {toggleAddImageServer && <AddImageServer setOpen={setOpen} setStateSuccess={setStateSuccess} stateSuccess={stateSuccess}/>}
                {toggleGalleryImageServer && <GalleryImageServer setOpen={setOpen} setStateSuccess={setStateSuccess} stateSuccess={stateSuccess}/>}
            </ModalUI>
        </>
    );
}

export default MenuImagen;