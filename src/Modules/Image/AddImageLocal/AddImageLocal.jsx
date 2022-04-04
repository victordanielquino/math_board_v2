import React, {useContext, useEffect, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import AppContextImagen from "../../../context/AppContextImagen";
import InputFileImage from "../../../components/InputFileImage/InputFileImage";
import AppContext from "../../../context/AppContext";

const useStyles  = makeStyles({
    errorMessage: {
        // outline: '1px solid red',
        fontSize: '1em',
        color: 'red',
        marginBottom: '10px',
    },
    paper: {
        //height: 100,
        padding: '10px',
    },
    parrafo: {
        marginBottom: '0.5em'
    }
});

const AddImageLocal = ({ setOpen, stateSuccess, setStateSuccess}) => {
    // CONTEXT:
    const { state, h_addH } = useContext(AppContext);
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);

    // STATE:
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [fileReader, setFileReader] = useState(null);
    const [errorFile, setErrorFile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [widthImage, setWidthImage] = useState(0);
    const [heightImage, setHeightImage] = useState(0);

    // REF::

    // LOGICA:
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
        x_fin: 400,
        y_fin: 200,
        dataImagen:[],
        dataUse: false,
        types: 'image',
        canvas: stateImagen.canvas,
    };
    const handleSuccess = () => {
        if (file){
            //console.log(file)
            imagenNew.x_fin = imagenNew.x_ini + widthImage;
            imagenNew.y_fin = imagenNew.y_ini + heightImage;
            imagenNew.fileNombre = file.name;
            imagenNew.fileSrc = fileReader.result;
            //s_imagenAddHId(imagenNew, stateImagen.id + 1);
            imagenNew.id = state.id;
            h_addH(imagenNew);
            setOpen(false);
        }else {
            setErrorFile(true);
            setErrorMessage('Primero elija una imagen!!!');
        }
    }

    // EFECCT:
    useEffect(()=>{
        setTimeout(() => {
            setErrorFile(false);
        }, 5000)
    },[errorFile]);

    useEffect(() => {
        file ? setFileName(file.name): setFileName('')
    }, [file]);

    useEffect(() => {
        if(stateSuccess) {
            handleSuccess();
            setStateSuccess(false);
        }
    }, [stateSuccess])

    return (
        <>
            {errorFile && <div className={classes.errorMessage}><center>{errorMessage}</center></div>}
            <p className={classes.parrafo}>Name File:{fileName}</p>
            <InputFileImage
                setFile={setFile}
                setFileReader={setFileReader}
                setWidthImage={setWidthImage}
                setHeightImage={setHeightImage}
            />
        </>
    );
}

export default AddImageLocal;