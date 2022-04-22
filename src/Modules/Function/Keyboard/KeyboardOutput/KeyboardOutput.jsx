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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ModalUI from "../../../../components/ModalUI/ModalUI";
import ModalImageLoading from "../../../../components/ModalImageLoading";
import {storageAddFile} from "../../../../firebase/services/storage.services";
import {firestoreAddDoc} from "../../../../firebase/services/firestore.services";
import AppContext from "../../../../context/AppContext";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    },
})
const useStyles  = makeStyles(theme => ({
    container: {
        //outline: '1px solid blue',
        display: "flex",
        flexDirection: 'column',
        height: '100%',
    },
    editButton : {
        height: props => props.height,
        width: props => props.width,
        padding: 0,
        //marginLeft: '5px'
    },
    icon: {
        outline: '1px solid red',
        marginRight: '10px',
    },
    editInput : {
        height: 30,
        //width: 100,
    },
    header: {
        display: "flex",
        justifyContent: 'space-between'
    },
    function: {
        //outline: '1px solid red',
        //alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: '0.5em',
        height: '70%',
        padding: '0',
    },
    Inputprops: {
        fontSize: '2em',
        letterSpacing: '1em',
        wordSpacing: '1em',
    },
    ImageProps: {
        width: 100,
    },
    paper: {
        //height: 100,
        padding: '0px',
        display: 'flex',
        width: '400px',
        height: '250px'
    },
    imageContainer: {
        // outline: '1px solid green',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
    },
    image: {
        // outline: '1px solid red',
        maxWidth: '380px',
        maxHeight: '230px',
        margin: '0px'
    },
    errorMessage: {
        // outline: '1px solid red',
        fontSize: '1em',
        color: 'red',
        marginBottom: '10px',
    },
}))

const KeyboardOutput = () => {
    // CONTEXT:
    const { state, h_addH } = useContext(AppContext);
    const { stateFunction } = useContext(AppContextFunction);
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
    const classes = useStyles(propsBtn);
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
        canvas: stateImagen.canvas,
        types: 'image',
    };
    const prueba = (e) => {
        console.log('change:', e)
    }
    const handleSend = () => {
        const element = divImgRef.current;
        let widht = element.clientWidth;
        let heigth = element.clientHeight;
        imagenNew.x_fin = imagenNew.x_ini + widht;
        imagenNew.y_fin = imagenNew.y_ini + heigth;
        html2canvas(element, {logging: false}).then((canvas) => {
            const urlImagen = canvas.toDataURL();
            //console.log('urlImagen:', urlImagen);
            imagenNew.fileSrc = urlImagen;
            imagenNew.fileNombre = 'ecuacion.png';
            //s_imagenAddHId(imagenNew, stateImagen.id + 1);
            imagenNew.id = state.id;
            h_addH(imagenNew);
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

    // EFECCT:
    useEffect(() => {
        if(stateSuccess) {
            handleSave();
            setStateSuccess(false);
        }
    }, [stateSuccess]);

    useEffect(() => {
        console.log('historia:',stateImagen.historiaImagen);
    }, [stateImagen.historiaImagen]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <TextField
                            fullWidth={true}
                            id="outlined-basic"
                            label="Texto"
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
                        <Button
                            variant="contained"
                            color='primary'
                            className={classes.editButton}
                            sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: '0 0 0 5px', fontSize: propsBtn.fontSize, textTransform: 'none' }}
                            onClick={() => handleSend()}
                        ><SendIcon /></Button>
                        <Button
                            variant="outlined"
                            color='primary'
                            className={classes.editButton}
                            sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: '0 0 0 5px', fontSize: propsBtn.fontSize, textTransform: 'none' }}
                            onClick={() => handleUpload()}
                        ><FileUploadIcon fontSize='large' /></Button>
                    </div>
                    <Paper variant="outlined"  className={classes.function}>
                        <DivMathjaxReact color={stateFunction.color} background={stateFunction.background} divImgRef={divImgRef} />
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