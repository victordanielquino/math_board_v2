import React, {useContext, useEffect, useState, useRef} from 'react';

import AddImageLocal          from "../AddImageLocal/AddImageLocal";
import AddImageServer         from "../AddImageServer/AddImageServer";
import GalleryImageServer     from "../GalleryImageServer/GalleryImageServer";
import ModalUI                from "../../../components/ModalUI/ModalUI";

// UTILS:
import HomeIcon               from '@mui/icons-material/Home';
import FileDownloadIcon       from '@mui/icons-material/FileDownload';
import FileUploadIcon         from '@mui/icons-material/FileUpload';
import {Button}               from "@mui/material";
import useStylesMenuImage from './MenuImagenStyle';

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
    const props = {}
    const classes = useStylesMenuImage(props);
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
            <article className={classes.article}>
                <Button
                    variant="outlined"
                    size='small'
                    style={{marginRight:'20px'}}
                    startIcon={<HomeIcon/>}
                    onClick={() => handleAddImageLocal()}
                >ABRIR IMAGEN LOCAL</Button>
                <Button
                    variant="outlined"
                    size='small'
                    startIcon={<FileUploadIcon/>}
                    style={{marginRight:'20px'}}
                    onClick={() => handleAddImageServer()}
                >SUBIR IMAGEN A LA NUBE</Button>
                <Button
                    variant="outlined"
                    size='small'
                    startIcon={<FileDownloadIcon/>}
                    onClick={() => handleGalleryImageServer()}
                >MY GALERIA</Button>
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