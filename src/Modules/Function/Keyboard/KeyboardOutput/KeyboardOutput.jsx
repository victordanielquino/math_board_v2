import React, {useContext, useEffect, useState} from 'react';
import {TextField} from "@mui/material";
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

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    },
})
const useStyles  = makeStyles(theme => ({
    editButton : {
        height: props => props.height,
        width: props => props.width,
    },
    editInput : {
        height: 30,
        //width: 100,
    },
    header: {
        display: "flex",
        justifyContent: 'space-between'
    },
    container: {
        /*background: 'lightblue',
        color: 'blue',*/
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        outline: '1px solid green',
        marginTop: '0.8em',
    },
    Inputprops: {
        fontSize: '2em',
        letterSpacing: '1em',
        wordSpacing: '1em',
    },
    ImageProps: {
        width: 100,
    }
}))

const KeyboardOutput = () => {
    // CONTEXT:
    const {stateFunction} = useContext(AppContextFunction);
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);

    // STATE:

    // LOGICA:
    const propsBtn = {
        fontSize: '1em',
        height: 38,
        width: 60,
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
    };
    const prueba = (e) => {
        console.log('change:', e)
    }
    const handleSend = () => {
        const element = document.getElementById('divImagen');
        let widht = element.clientWidth;
        let heigth = element.clientHeight;
        imagenNew.x_fin = imagenNew.x_ini + widht;
        imagenNew.y_fin = imagenNew.y_ini + heigth;
        html2canvas(element, {logging: false}).then((canvas) => {
            const urlImagen = canvas.toDataURL();
            //console.log('urlImagen:', urlImagen);
            imagenNew.fileSrc = urlImagen;
            imagenNew.fileNombre = 'ecuacion.png';
            s_imagenAddHId(imagenNew, stateImagen.id + 1);
        })
    }

    // EFECCT:
    useEffect(() => {
        console.log('historia:',stateImagen.historiaImagen);
    }, [stateImagen.historiaImagen]);

    return (
        <>
            <ThemeProvider theme={theme}>
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
                        sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0, fontSize: propsBtn.fontSize, textTransform: 'none' }}
                        endIcon={<SendIcon />}
                        onClick={() => handleSend()}
                    />
                </div>
                <div className={classes.container}>
                    <DivMathjaxReact color={stateFunction.color} background={stateFunction.background}/>
                </div>
            </ThemeProvider>
            {/*<DivReactLatex/>*/}
            {/*<DivReactLatexNext/>*/}
            {/*<DivReactMathjax/>*/}
            {/*<DivBetterReactMathjax/>*/}
        </>
    )
}

export default KeyboardOutput;