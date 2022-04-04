import React, {useContext, useEffect, useState} from 'react';

//
import AppContextText from "../../context/AppContextText";
import AppContextGrid from "../../context/AppContextGrid";

// UTILS:
import AppContext from "../../context/AppContext";
import draw from '../Draw/Draw';

const PaintText = (id_canvas) => {
    // CONTEXT:
    const {
        state,
        h_addH,
    } = useContext(AppContext);
    const { stateCanvas } = useContext(AppContextGrid);
    const {
        stateText,
        h_textAddHIdFocus,
        h_textSetReset,
        h_textSetCanvas,
        h_textSetFocus
    } = useContext(AppContextText);
    // STATE:

    // LOGICA
    const paint = async () => {
        if (stateText.active){
            console.log('PaintText.jsx');
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateCanvas, stateText.fontFocus);
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('PaintText.jsx false');
        }
    }
    const paintCambiaIcono = async () => {
        console.log('PaintText.jsx paintCambiaIcono');
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        try {
            await draw(context, state.historia, state.canvas, stateCanvas);
        } catch (e) {
            console.log(e);
        }
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
        fontText: 'new text...',
        fontFocus: false,
        canvas: stateText.canvas,
        types: 'text',
    };
    let canvas = '';
    let context = '';
    let textSelect = stateText.textSelect;
    let textSelect2 = '';
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
    const objetoVacio = (obj) => {
        return Object.keys(obj).length === 0;   // VACIO ? return true,      no_vacio ? return false
    }
    // 1
    const mouseDownText = (e) => {
        mouse.click = true;
        if(!text.fontFocus){
            captura_Pos_Posprev(e);
        }
    };
    // 2
    const mouseMoveText = (e) => {};
    // 3
    const mouseUpText = async (e) => {
        if (!text.fontFocus){
            //text.fontFocus = true;
            captura_Pos_Posprev(e);
            if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
                text.y_ini = text.y_ini - text.fontSize;
                text.y_fin = text.y_fin - text.fontSize;
                await h_textSetFocus(true);
                h_addH(text);
                //u_textGraficaFontEdit(context, text, true);
                //h_textAddHIdFocus(text, stateText.id + 1, true);
                //text.id = state.id;
            }
        } else {
            console.log('false....');
        }
    };
    // 4:
    const keyDown = (e) => {
        textSelect = state.historia[state.historia.length - 1];
        if (textSelect.canvas === stateText.canvas){
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
                        console.log("Aquí tenemos el texto: ", texto);
                        key = texto;
                        console.log('key:', key)
                        textSelect.fontText = textSelect.fontText + key;
                        textSelect2 = textSelect;
                        textSelect2.id = state.id-1;
                        state.historia[state.historia.length -1] = textSelect2;
                        paint();
                    })
                    .catch(error => {
                        // Por si el usuario no da permiso u ocurre un error
                        console.log("Hubo un error: ", error);
                    });
            } else {
                if (!objetoVacio(textSelect) && stateText.fontFocus) {
                    switch (e.keyCode){
                        case 8: key = '';
                            (textSelect.fontText.length > 0) ? textSelect.fontText = textSelect.fontText.slice(0,-1): '';
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
                    textSelect.fontText = textSelect.fontText + key;
                    textSelect2 = textSelect;
                    textSelect2.id = state.id-1;
                    state.historia[state.historia.length -1] = textSelect2;
                    paint();
                } else {
                    console.log('jejeje:', textSelect);
                }
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
        if (state.historia.length > 0) {
            console.log('historia:',state.historia)
            stateText.textSelect = state.historia[state.historia.length - 1];
            paint();
        }
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
    }, [stateText, state.historia]);

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontColor = stateText.fontColor;
                paint();
            }
        }
    }, [stateText.fontColor]);

    useEffect(() => {
        if (!stateText.active){
            //console.log('reinicia valores text');
            h_textSetReset();
            paintCambiaIcono();
        }
    }, [stateText.active])

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontBold = stateText.fontBold;
                paint();
            }
        }
    }, [stateText.fontBold]);

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontItalic = stateText.fontItalic;
                paint();
            }
        }
    }, [stateText.fontItalic]);

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontUnderL = stateText.fontUnderL;
                paint();
            }
        }
    }, [stateText.fontUnderL]);

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontTypografia = stateText.fontTypografia;
                paint();
            }
        }
    }, [stateText.fontTypografia]);

    useEffect(() => {
        if(stateText.fontFocus){
            //stateText.historiaText.length > 0 ? textSelect = stateText.historiaText[stateText.historiaText.length -1]:'';
            if (!objetoVacio(textSelect)) {
                textSelect.fontSize = stateText.fontSize;
                paint();
            }
        }
    }, [stateText.fontSize]);

    useEffect(() => {
        h_textSetCanvas(state.canvas);
        if (stateText.active) {
            paint();
        }
    }, [state.canvas]);
};

export default PaintText;