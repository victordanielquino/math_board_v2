import React, {useContext, useEffect, useState, useRef} from 'react';

import AppContextImagen from "../../../context/AppContextImagen";
import { firestoreAddDoc, firestoreGetDocs, firestoreMostrarDocs } from '../../../firebase/services/firestore.services';
import { storageAddFile, getFecha } from "../../../firebase/services/storage.services";
// UTILS:
import { TextField} from "@mui/material";

import {makeStyles} from "@mui/styles";
import InputFileImage from "../../../components/InputFileImage/InputFileImage";
import ModalImageLoading from "../../../components/ModalImageLoading";

const useStyles  = makeStyles({
    errorMessage: {
        // outline: '1px solid red',
        fontSize: '1em',
        color: 'red',
        marginBottom: '10px',
    },
    editInput : {
        //height: 30,
        //width: 100,
        marginBottom: '0.5em'
        //width: 100,
    },
});

const AddImageServer = ({ setOpen, stateSuccess, setStateSuccess }) => {
    // useContext:
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);

    // STATE:
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [fileReader, setFileReader] = useState(null);
    const [errorFile, setErrorFile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [widthImage, setWidthImage] = useState(0);
    const [heightImage, setHeightImage] = useState(0);
    const [toggleLoading, setToggleLoading] = useState(false);

    // REF::
    const inputRef = useRef(null);

    // LOGICA
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStyles(props);
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
        x_fin: 0,
        y_fin: 0,
        dataImagen:[],
        dataUse: false,
    };
    const handleSave = () => {
        if (file) {
            if (fileName.length === 0)
                setFileName(file.name);
            let autor = 'all';
            setToggleLoading(true);
            storageAddFile(fileName+'_'+Date.now(), fileReader.result)
                .then((urlImagen) => {
                    setOpen(false);// cerrar modal
                    setToggleLoading(false);// cerrar loading...
                    imagenNew.fileAutor = autor;
                    imagenNew.fileSrc = fileReader.result;
                    imagenNew.fileNombre = fileName;
                    imagenNew.x_fin = imagenNew.x_ini + widthImage;
                    imagenNew.y_fin = imagenNew.y_ini + heightImage;
                    console.log('imageNew:', imagenNew);
                    s_imagenAddHId(imagenNew, stateImagen.id + 1);
                    firestoreAddDoc('galeria', autor, fileName, urlImagen)
                        .then( resp => imagenNew.fileId = resp );
                });
        }
        else {
            setErrorFile(true);
            setErrorMessage('Primero elija una imagen!!!');
        }
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(()=>{
        setTimeout(() => {
            setErrorFile(false);
        }, 5000)
    },[errorFile]);

    useEffect(() => {
        file ? setFileName(file.name) : setFileName('');
    }, [file]);

    useEffect(() => {
        if(stateSuccess) {
            handleSave();
            setStateSuccess(false);
        }
    }, [stateSuccess])

    return (
        <>
            {errorFile && <div className={classes.errorMessage}><center>{errorMessage}</center></div>}
            <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Name File:"
                variant="outlined"
                color='primary'
                size='small'
                value={fileName}
                className={classes.editInput}
                InputProps={{ style: {fontSize: '1em'}}}
                onChange={(e) => setFileName(e.target.value)}
                sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0, textTransform: 'none' }}
            />
            {
                (!toggleLoading)
                    ?   <InputFileImage
                        setFile={setFile}
                        setFileReader={setFileReader}
                        setWidthImage={setWidthImage}
                        setHeightImage={setHeightImage}
                    />
                    : <ModalImageLoading/>
            }
        </>
    );
}

export default AddImageServer;