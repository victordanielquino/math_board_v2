import React, {useContext, useEffect, useState, useRef} from 'react';

import AppContextImagen from "../../../context/AppContextImagen";
import { firestoreAddDoc, firestoreGetDocs, firestoreMostrarDocs } from '../../../firebase/services/firestore.services';
import { storageAddFile, getFecha } from "../../../firebase/services/storage.services";
// UTILS:
import { TextField} from "@mui/material";

import {makeStyles} from "@mui/styles";
import InputFileImage from "../../../components/InputFileImage/InputFileImage";
import ModalImageLoading from "../../../components/ModalImageLoading";
import AppContext from "../../../context/AppContext";
import {
    anguloEntreDosRectasCaso2,
    rectaQuePasaPorDosPtos,
    u_distanciaEntreDosPtos,
    u_ptoMedio
} from "../../../utils/geometriaAnalitica";

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
        //width: 100,
    },
});

const AddImageServer = ({ setOpen, stateSuccess, setStateSuccess }) => {
    // useContext:
    const { state, h_addH } = useContext(AppContext);
    const { stateImagen } = useContext(AppContextImagen);

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
        fileNombre: '',
        fileAutor: '',
        x_ini: 100,
        y_ini: 100,
        x_fin: 0,
        y_fin: 0,
        dataImagen:[],
        dataUse: false,
        types: 'image',
        fileSrc: '',
        canvas: stateImagen.canvas,

        vertex: [],
        h: 0,
        k: 0,
        angulo: 0,
        radio: 0,
        rotateDeg: 0,
        rotateDegPrev: 0,
        width: 0,
        height: 0,
        imageDraw: '',
        description: '',
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
                    imagenNew.id = state.id;
                    imagenNew.vertex[0] = {x:imagenNew.x_ini, y:imagenNew.y_ini, pto:0};
                    imagenNew.vertex[1] = {x:imagenNew.x_fin, y:imagenNew.y_ini, pto:1};
                    imagenNew.vertex[2] = {x:imagenNew.x_fin, y:imagenNew.y_fin, pto:2};
                    imagenNew.vertex[3] = {x:imagenNew.x_ini, y:imagenNew.y_fin, pto:3};
                    let resp = u_ptoMedio(imagenNew.vertex[0], imagenNew.vertex[1]);
                    imagenNew.vertex[4] = {x:resp.x, y:resp.y, pto:4};
                    resp = u_ptoMedio(imagenNew.vertex[1], imagenNew.vertex[2]);
                    imagenNew.vertex[5] = {x:resp.x, y:resp.y, pto:5};
                    resp = u_ptoMedio(imagenNew.vertex[2], imagenNew.vertex[3]);
                    imagenNew.vertex[6] = {x:resp.x, y:resp.y, pto:6};
                    resp = u_ptoMedio(imagenNew.vertex[3], imagenNew.vertex[0]);
                    imagenNew.vertex[7] = {x:resp.x, y:resp.y, pto:7};
                    resp = u_ptoMedio(imagenNew.vertex[0], imagenNew.vertex[2]);
                    imagenNew.h = resp.x;
                    imagenNew.k = resp.y;
                    // angulo:
                    let rec1 = rectaQuePasaPorDosPtos(imagenNew.vertex[0], {x:imagenNew.h, y:imagenNew.k});
                    let rec2 = rectaQuePasaPorDosPtos(imagenNew.vertex[3], {x:imagenNew.h, y:imagenNew.k});
                    imagenNew.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
                    (imagenNew.angulo < 0) ? imagenNew.angulo = 90 + (90 + imagenNew.angulo):'';
                    // radio:
                    imagenNew.radio = u_distanciaEntreDosPtos(imagenNew.vertex[0], {x:imagenNew.h, y:imagenNew.k});
                    // rotateDegPrev:
                    imagenNew.rotateDegPrev = imagenNew.angulo / 2;
                    // width height:
                    imagenNew.width = u_distanciaEntreDosPtos(imagenNew.vertex[7], imagenNew.vertex[5]);
                    imagenNew.height = u_distanciaEntreDosPtos(imagenNew.vertex[4], imagenNew.vertex[6]);
                    // ADD:
                    h_addH(imagenNew);
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
    }, [stateSuccess]);

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
                sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: '0 0 10px 0', textTransform: 'none' }}
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