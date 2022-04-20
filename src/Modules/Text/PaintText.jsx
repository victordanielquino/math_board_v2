import React, {useContext, useEffect, useState} from 'react';

//
import AppContextText from "../../context/AppContextText";
import AppContextGrid from "../../context/AppContextGrid";

// UTILS:
import AppContext      from "../../context/AppContext";
import draw            from '../Draw/Draw';
import {isObjectEmpty}                    from "../../utils/utils";
import {u_textLineAnimation, u_textMover} from "./UtilsText";

const PaintText = (id_canvas) => {
    // CONTEXT:
    const {
        state,
        h_addH,
        h_deleteById
    } = useContext(AppContext);
    const { stateCanvas } = useContext(AppContextGrid);
    const {
        stateText,
        h_textSetReset,
        h_textSetCanvas,
        h_textSetTextselect,
        h_textSetAllTextselect
    } = useContext(AppContextText);

    // STATE:
    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [toggleAnimation, setToggleAnimation] = useState(0);

    // LOGICA
    const paint = async () => {
        if (stateText.active){
            console.log('PaintText.jsx');
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateCanvas, !isObjectEmpty(stateText.textSelect));
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('PaintText.jsx false');
        }
    }
    const paintAnimation = (color) => {
        if (stateText.active)
            u_textLineAnimation(context, stateText.textSelect, color);
    }
    let text = {
        id: stateText.id,
        x_ini: 0,
        y_ini: 0,
        x_fin:0,
        y_fin:0,
        visible: true,
        edit: true,

        fontAlign: 'start',	// startr, end
        fontBaseline: 'top',
        fontColor: stateText.fontColor,
        fontBold: stateText.fontBold,
        fontItalic: stateText.fontItalic,
        fontUnderL: stateText.fontUnderL,
        fontTypografia: stateText.fontTypografia,
        fontSize: stateText.fontSize,
        fontText: '',
        fontFocus: false,
        canvas: stateText.canvas,
        types: 'text',
    };
    let canvas = '';
    let context = '';
    const mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: { x: 0, y: 0 },
    };
    const captura_Pos_Posprev = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const x_real = x - canvasTextDatos.left;
        const y_real = y - canvasTextDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
        text.x_ini = mouse.pos_prev.x;
        text.y_ini = mouse.pos_prev.y;
        text.x_fin = mouse.pos.x;
        text.y_fin = mouse.pos.y;
    };
    // 1
    const mouseDownText = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
        //handleClick();
    };
    // 2
    const mouseMoveText = (e) => {
        if (mouse.click && !isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            captura_Pos_Posprev(e);
            u_textMover(stateText.textSelect, mouse)
            paint();
        }
    };
    // 3
    const mouseUpText = async (e) => {
        if (isObjectEmpty(stateText.textSelect)){
            captura_Pos_Posprev(e);
            if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
                text.y_ini = text.y_ini - text.fontSize;
                text.y_fin = text.y_fin - text.fontSize;
                text.id = state.id;
                h_addH(text);
            }
        } else {
            if (stateText.textSelect.canvas !== stateText.canvas) {
                captura_Pos_Posprev(e);
                if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
                    text.y_ini = text.y_ini - text.fontSize;
                    text.y_fin = text.y_fin - text.fontSize;
                    text.id = state.id;
                    h_addH(text);
                }
            }
        }
        mouse.click = false;
    };
    // 4:
    const keyDown = (e) => {
        if (stateText.textSelect.canvas === stateText.canvas){
            // console.log(e);
            //console.log(e.key);
            //console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 86 && ctrl) {
                console.log("Ctrl+V is pressed.");
                navigator.clipboard.readText()
                    .then(texto => {
                        //console.log("Aquí tenemos el texto: ", texto);
                        key = texto;
                        stateText.textSelect.fontText = stateText.textSelect.fontText + key;
                        paint();
                    })
                    .catch(error => {
                        // Por si el usuario no da permiso u ocurre un error
                        console.log("Hubo un error: ", error);
                    });
            } else {
                switch (e.keyCode){
                    case 8: key = '';
                        (stateText.textSelect.fontText.length > 0) ? stateText.textSelect.fontText = stateText.textSelect.fontText.slice(0,-1): '';
                        break;
                    case 9: key = ''; break;
                    case 16: key = ''; break;
                    case 17: key = ''; break;
                    case 18: key = ''; break;
                    case 20: key = ''; break;
                    case 37: key = ''; break;
                    case 38: key = ''; break;
                    case 39: key = ''; break;
                    case 40: key = ''; break;
                    case 91: key = ''; break;
                }
                stateText.textSelect.fontText = stateText.textSelect.fontText + key;
                paint();
            }
        }
    }
    const canvasTextDatos = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };
    const update_canvasTextDatos = () => {
        canvasTextDatos.top = canvas.getBoundingClientRect().top;
        canvasTextDatos.left = canvas.getBoundingClientRect().left;
        canvasTextDatos.width = canvas.getBoundingClientRect().width;
        canvasTextDatos.height = canvas.getBoundingClientRect().height;
    };
    const enventDraw = () => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        update_canvasTextDatos();
        /*if (state.historia.length > 0) {
            console.log('historia:',state.historia);
            stateText.textSelect = state.historia[state.historia.length - 1];
            paint();
        }*/
    }
    let color = 'white';
    const beginInterval = () => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        let auxAnimation = setInterval(() => {
            paintAnimation(color);
            color === 'white' ? color = 'black': color = 'white';
        }, 500);
        setToggleAnimation(auxAnimation);
    }
    const stopInterval = () => {
        clearInterval(toggleAnimation);
    }

    // EFECT:
    useEffect( () => {
        if (stateText.active){
            enventDraw();
            canvas.addEventListener('mousedown', mouseDownText);
            canvas.addEventListener('mousemove', mouseMoveText);
            canvas.addEventListener('mouseup', mouseUpText);
            document.addEventListener('keydown', keyDown);
            return () => {
                canvas.removeEventListener('mousedown', mouseDownText);
                canvas.removeEventListener('mousemove', mouseMoveText);
                canvas.removeEventListener('mouseup', mouseUpText);
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateText]);

    useEffect( () => {
        if (stateText.active && state.historia.length > 0){
            h_textSetTextselect(state.historia[state.historia.length - 1]);
        }
    }, [state.historia]);

    useEffect(() => {
        paint();
        (!isObjectEmpty(stateText.textSelect)) ? beginInterval() : stopInterval();
    }, [stateText.textSelect]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontColor = stateText.fontColor;
            paint();
        }
    }, [stateText.fontColor]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontBold = stateText.fontBold;
            paint();
        }
    }, [stateText.fontBold]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontItalic = stateText.fontItalic;
            paint();
        }
    }, [stateText.fontItalic]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontUnderL = stateText.fontUnderL;
            paint();
        }
    }, [stateText.fontUnderL]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontTypografia = stateText.fontTypografia;
            paint();
        }
    }, [stateText.fontTypografia]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontSize = stateText.fontSize;
            paint();
        }
    }, [stateText.fontSize]);

    useEffect(() => {
        // INICIA O DETIENE ANIMACION AL CAMBIAR DE PIZARRA
        (!isObjectEmpty(stateText.textSelect) && stateText.canvas === stateText.textSelect.canvas)
            ? beginInterval()
            : stopInterval();
        // ACTUALIZA LOS DATOS DEL MENU DEL TEXTO AL CAMBIAR DE PIZARRAS
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas && stateText.active) {
            h_textSetAllTextselect(
                stateText.textSelect.fontColor,
                stateText.textSelect.fontBold,
                stateText.textSelect.fontItalic,
                stateText.textSelect.fontUnderL,
                stateText.textSelect.fontTypografia,
                stateText.textSelect.fontSize
            );
        }
    }, [stateText.canvas]);

    useEffect(() => {
        if (!stateText.active){
            h_textSetReset();
        }
    }, [stateText.active]);

    useEffect(() => {
        h_textSetCanvas(state.canvas);
        if (stateText.active) {
            paint();
        }
    }, [state.canvas]);
};

export default PaintText;