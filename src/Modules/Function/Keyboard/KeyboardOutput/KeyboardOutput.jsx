import React, {useContext, useEffect, useRef, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {makeStyles} from "@mui/styles";
import {ThemeProvider} from "@emotion/react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AppContextFunction from "../../../../context/AppContextFunction";
import DivReactLatex from "./DivReactLatex";
import DivReactLatexNext from "./DivReactLatexNext";
import DivReactMathjax from "./DivReactMathjax3/DivReactMathjax3";
import DivMathjaxReact from "./DivMathjaxReact";
import DivBetterReactMathjax from "./DivBetterReactMathjax";
import html2canvas from "html2canvas";
import AppContextImagen from "../../../../context/AppContextImagen";
import Paper from '@mui/material/Paper';
import ModalUI from "../../../../components/ModalUI/ModalUI";
import ModalImageLoading                       from "../../../../components/ModalImageLoading";
import {storageAddFile}                        from "../../../../firebase/services/storage.services";
import {firestoreAddDoc}                       from "../../../../firebase/services/firestore.services";
import AppContext                              from "../../../../context/AppContext";
import {
    anguloEntreDosRectasCaso2,
    rectaQuePasaPorDosPtos,
    u_distanciaEntreDosPtos,
    u_ptoMedio
}                                              from "../../../../utils/geometriaAnalitica";
import useStylesKeyboardOutput                 from './KeyboardOutputStyle';
import {u_textPositionCursor, u_textValidChar} from "../../../Text/UtilsText";
import {isObjectEmpty}                         from "../../../../utils/utils";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    },
})

const KeyboardOutput = ({successClick, uploadClick, objFunction = {}}) => {
    // CONTEXT:
    const { state, h_addH, h_updateH } = useContext(AppContext);
    const {
        stateFunction,
        h_functionSetPositionCursor,
    } = useContext(AppContextFunction);
    const { stateImagen } = useContext(AppContextImagen);

    // STATE:
    const [open, setOpen] = useState(false);
    const [stateSuccess, setStateSuccess] = useState(false);
    const [imagePreviewSrc, setImagePreviewSrc] = useState('');
    const [fileName, setFileName] = useState('funcion1.jpg');
    const [toggleLoading, setToggleLoading] = useState(false);
    const [errorFile, setErrorFile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successDisabled, setSuccessDisabled] = useState(false);

    // REF:
    const imgRef = useRef(null);
    const divImgRef = useRef(null);

    // LOGICA:
    const propsBtn = {
        fontSize: '1em',
        height: 42,
        width: 50,
    }
    const classes = useStylesKeyboardOutput(propsBtn);
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
        canvas: stateFunction.canvas,

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
    const prueba = (e) => {
        console.log('change:', e.target.value)
    }
    const handleSend = () => {
        const element = divImgRef.current;
        let widht = element.clientWidth;
        let heigth = element.clientHeight;
        imagenNew.x_fin = imagenNew.x_ini + widht;
        imagenNew.y_fin = imagenNew.y_ini + heigth;
        html2canvas(element, {logging: false}).then((canvas) => {
            const urlImagen = canvas.toDataURL();
            imagenNew.fileSrc = urlImagen;
            imagenNew.fileNombre = 'ecuacion.png';
            //
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
            // DESCRIPTION: OPTIONAL
            imagenNew.description = stateFunction.text;

            if (isObjectEmpty(objFunction)) {
                imagenNew.id = state.id;
                h_addH(imagenNew);
            } else {
                imagenNew.id = objFunction.id;
                let copyHistory = [...state.historia];
                let newHistory = [];
                copyHistory.forEach((elm) => {
                    (elm.id === objFunction.id)
                        ? newHistory.push(imagenNew)
                        : newHistory.push(elm);
                });
                h_updateH(newHistory);
            }
        })
    }
    const handleUpload = () => {
        setOpen(true);
        const element = divImgRef.current;
        let widht = element.clientWidth;
        let heigth = element.clientHeight;
        imagenNew.x_fin = imagenNew.x_ini + widht;
        imagenNew.y_fin = imagenNew.y_ini + heigth;
        html2canvas(element, {logging: false}).then((canvas) => {
            const urlImagen = canvas.toDataURL();
            setImagePreviewSrc(urlImagen);
        })
    }
    const handleSave = () => {
        if (imagePreviewSrc.length > 0) {
            if (fileName.length === 0)
                setFileName(stateFunction.text);
            let autor = 'all';
            setToggleLoading(true);
            setSuccessDisabled(true);
            storageAddFile(fileName+'_'+Date.now(), imagePreviewSrc)
                .then((urlImagen) => {
                    firestoreAddDoc('galeria', autor, fileName, urlImagen)
                        .then( (resp) => {
                            imagenNew.fileId = resp;
                            setOpen(false);// cerrar modal
                            setToggleLoading(false);// cerrar loading...
                            setSuccessDisabled(false);
                        });
                });
        }
        else {
            setErrorFile(true);
            setErrorMessage('Primero elija una imagen!!!');
        }
    }
    const keyDown = (e) => {
        if (stateFunction.active && document.activeElement.id === 'outlined-basic'){
            // console.log(e);
            // console.log(e.key);
            // console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 86 && ctrl) {
                // console.log("Ctrl+V is pressed.");
                /*navigator.clipboard.readText()
                    .then(texto => {
                        // console.log("Aquí tenemos el texto: ", texto);
                        key = texto;
                        stateText.textSelect.fontText = stateText.textSelect.fontText + key;
                        stateText.textSelect.cursor = stateText.textSelect.fontText.length;
                        stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
                        paint();
                    })
                    .catch(error => {
                        // Por si el usuario no da permiso u ocurre un error
                        console.log("Hubo un error: ", error);
                    });*/
            } else {
                if (u_textValidChar(e.keyCode)) {
                    /*let lefth = stateText.textSelect.fontText.slice(0, stateText.textSelect.cursor);
                    let right = stateText.textSelect.fontText.slice(stateText.textSelect.cursor, stateText.textSelect.fontText.length);
                    stateText.textSelect.fontText = lefth + key + right;
                    stateText.textSelect.cursor += 1;
                    stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
                    paint();*/
                } else {
                    // BTN LEFTH: BEFORE
                    if (e.keyCode === 37) {
                        (stateFunction.positionCursor - 1 >= 0)
                            ? h_functionSetPositionCursor(stateFunction.positionCursor - 1)
                            : '';
                    } else {
                        // BTN RIGTH: NEXT
                        if (e.keyCode === 39) {
                            (stateFunction.positionCursor + 1 <= stateFunction.text.length)
                                ? h_functionSetPositionCursor(stateFunction.positionCursor + 1)
                                : '';
                        } else {
                            // BTN DELETE:
                            if (e.keyCode === 8) {
                                /*if (stateFunction.positionCursor - 1 >= 0) {
                                    let array = Array.from(stateFunction.text);
                                    array.splice(stateFunction.positionCursor - 1, 1);
                                    let txt = array.join('');
                                    h_functionSetTextPositionCursor(txt, stateFunction.positionCursor - 1);
                                    h_functionSetPositionCursor(stateFunction.positionCursor)
                                }*/
                            }
                        }
                    }
                }
            }
        }
    }

    // EFECCT:
    useEffect(() => {
        if(stateSuccess) {
            handleSave();
            setStateSuccess(false);
        }
    }, [stateSuccess]);

    useEffect(() => {
        if (successClick > 0) {
            handleSend();
        }
    }, [successClick]);

    useEffect(() => {
        if (uploadClick > 0) {
            handleUpload()
        }
    }, [uploadClick]);

    useEffect( () => {
        if (stateFunction.active) {
            document.addEventListener('keydown', keyDown);
            return () => {
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateFunction.text, stateFunction.positionCursor]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <TextField
                            fullWidth={true}
                            id="outlined-basic"
                            label="Texto Matematico"
                            variant="outlined"
                            color='primary'
                            size='small'
                            value={stateFunction.text}
                            //InputProps={classes.Inputprops}
                            InputProps={{ style: {letterSpacing: '0.2em', fontSize: '1.2em'}}}
                            className={classes.editInput}
                            onChange={(e) => prueba(e)}
                            sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0, fontSize: propsBtn.fontSize, textTransform: 'none' }}
                        />
                    </div>
                    <Paper variant="outlined"  className={classes.function}>
                        <DivMathjaxReact color={state.color} background={state.colorFondo} divImgRef={divImgRef} />
                    </Paper>
                </div>
            </ThemeProvider>
            {/*<DivReactLatex/>*/}
            {/*<DivReactLatexNext/>*/}
            {/*<DivReactMathjax/>*/}
            {/*<DivBetterReactMathjax/>*/}
            <ModalUI open={open} setOpen={setOpen} setStateSuccess={setStateSuccess} maxWidth='xs' title='UPLOAD TO SERVER:' successDisabled={successDisabled} >
                {errorFile && <div className={classes.errorMessage}><center>{errorMessage}</center></div>}
                <TextField
                    fullWidth={true}
                    id="outlined-basic"
                    label="Name File:"
                    variant="outlined"
                    color='primary'
                    size='small'
                    value={stateFunction.text}
                    InputProps={{ style: {fontSize: '1em'}}}
                    sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: '0 0 10px 0', textTransform: 'none' }}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <Paper  className={classes.paper} elevation={3}>
                    <div className={classes.imageContainer}>
                        {
                            (!toggleLoading)
                                ? <img src={imagePreviewSrc} className={classes.image} alt='' ref={imgRef}/>
                                : <ModalImageLoading/>
                        }
                    </div>
                </Paper>
            </ModalUI>
        </>
    )
}

export default KeyboardOutput;