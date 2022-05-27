import React, {useContext, useEffect, useRef, useState} from 'react';
import {makeStyles}                                     from "@mui/styles";
import AppContextImagen                                 from "../../../context/AppContextImagen";
import InputFileImage                                   from "../../../components/InputFileImage/InputFileImage";
import AppContext                                                      from "../../../context/AppContext";
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
        fileNombre: '',
        fileAutor: '',
        x_ini: 100,
        y_ini: 100,
        x_fin: 400,
        y_fin: 200,
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
    const handleSuccess = () => {
        if (file){
            //console.log(file)
            imagenNew.fileNombre = file.name;
            imagenNew.fileSrc = fileReader.result;
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