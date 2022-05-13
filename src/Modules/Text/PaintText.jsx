import React, {useContext, useEffect, useState} from 'react';

//
import AppContextText from "../../context/AppContextText";
import AppContextGrid from "../../context/AppContextGrid";

// UTILS:
import AppContext                                                                              from "../../context/AppContext";
import draw                                                                                    from '../Draw/Draw';
import {isObjectEmpty, u_canvasAutoSize}                                                       from "../../utils/utils";
import {
    u_textLineAnimation,
    u_textMover,
    u_textPositionCursor, u_textSearchAngulo,
    u_textSearchVertex,
    u_textValidChar
} from "./UtilsText";
import {u_distanciaEntreDosPtos}                                                               from "../../utils/geometriaAnalitica";

const PaintText = (id_canvas) => {
    // CONTEXT:
    const {
        state,
        h_addH,
        h_deleteByIndex
    } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const {
        stateText,
        h_textSetReset,
        h_textSetCanvas,
        h_textSetTextselect,
        h_textSetAllTextselect,
    } = useContext(AppContextText);

    // STATE:
    const [toggleAnimation, setToggleAnimation] = useState(0);

    // LOGICA
    const paint = async () => {
        if (stateText.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid, !isObjectEmpty(stateText.textSelect));
            } catch (e) {
                console.log(e);
            }
        }
    }
    const paintAnimation = (color) => {
        if (stateText.active) {
            u_textLineAnimation(context, stateText.textSelect.line, color);
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
        fontText: '',
        canvas: stateText.canvas,
        types: 'text',
        cursor: 0,
        line:{},

        vertex: [
            {x:0, y:0, pto:0},
            {x:0, y:0, pto:1},
            {x:0, y:0, pto:2},
            {x:0, y:0, pto:3},
        ],
        select: false,
        rotateDeg: 0,
        rotateDegPrev: 0,
        angulo: 0,
        radio: 0,
        h: 0,
        k: 0,
        width: 0,
        height: 0,
    };
    let canvas = '';
    let context = '';
    let canvasTextDatos = { top: 0, left: 0, width: 0, height: 0 };
    let color = 'white';
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
        /*text.x_ini = mouse.pos_prev.x;
        text.y_ini = mouse.pos_prev.y;
        text.x_fin = mouse.pos.x;
        text.y_fin = mouse.pos.y;*/
    };
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
    // 1
    const mouseDownText = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
        text.x_ini = mouse.pos.x;
        text.y_ini = mouse.pos.y;
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
                text.id = state.id;
                text.pto = {x_ini:text.x_ini - 5, y_ini:text.y_ini - 5, x_fin:text.x_ini + 5, y_fin:text.y_ini + 5};
                text.vertex = [
                    { x : text.x_ini, y : text.y_ini, pto:0 },
                    { x : text.x_fin, y : text.y_ini, pto:1 },
                    { x : text.x_fin, y : text.y_fin, pto:2 },
                    { x : text.x_ini, y : text.y_fin, pto:3 },
                ];
                text.radioX = text.x_ini;
                text.radioY = text.y_ini;

                text.vertexS = [
                    { x : text.x_ini-5, y : text.y_ini-5 },
                    { x : text.x_fin+5, y : text.y_ini-5},
                    { x : text.x_fin+5, y : text.y_fin+5},
                    { x : text.x_ini-5, y : text.y_fin+5},
                ];
                text.ptoS = {
                    x_ini:text.vertexS[0].x - 5, y_ini:text.vertexS[0].y - 5,
                    x_fin:text.vertexS[0].x + 5, y_fin:text.vertexS[0].y + 5
                };
                text.radioXS = text.x_ini - 5;
                text.radioYS = text.y_ini - 5;
                h_addH(text);
            }
        } else {
            // cambio de pizarra y hace click para agregar nuevo texto
            if (stateText.textSelect.canvas !== stateText.canvas) {
                captura_Pos_Posprev(e);
                if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
                    text.y_ini = text.y_ini - text.fontSize;
                    text.id = state.id;
                    text.vertex = [
                        { x : text.x_ini, y : text.y_ini },
                        { x : text.x_fin, y : text.y_ini},
                        { x : text.x_fin, y : text.y_fin},
                        { x : text.x_ini, y : text.y_fin},
                    ];
                    text.pto = {
                        x_ini:text.vertex[0].x - 5, y_ini:text.vertex[0].y - 5,
                        x_fin:text.vertex[0].x + 5, y_fin:text.vertex[0].y + 5
                    };
                    text.radioX = text.x_ini;
                    text.radioY = text.y_ini;

                    text.vertexS = [
                        { x : text.x_ini-5, y : text.y_ini-5 },
                        { x : text.x_fin+5, y : text.y_ini-5},
                        { x : text.x_fin+5, y : text.y_fin+5},
                        { x : text.x_ini-5, y : text.y_fin+5},
                    ];
                    text.ptoS = {
                        x_ini:text.vertexS[0].x - 5, y_ini:text.vertexS[0].y - 5,
                        x_fin:text.vertexS[0].x + 5, y_fin:text.vertexS[0].y + 5
                    };
                    text.radioXS = text.x_ini - 5;
                    text.radioYS = text.y_ini - 5;
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
            // console.log(e.key);
            // console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 86 && ctrl) {
                // console.log("Ctrl+V is pressed.");
                navigator.clipboard.readText()
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
                    });
            } else {
                if (u_textValidChar(e.keyCode)) {
                    let lefth = stateText.textSelect.fontText.slice(0, stateText.textSelect.cursor);
                    let right = stateText.textSelect.fontText.slice(stateText.textSelect.cursor, stateText.textSelect.fontText.length);
                    stateText.textSelect.fontText = lefth + key + right;
                    stateText.textSelect.cursor += 1;
                    stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
                    paint();
                } else {
                    // BTN LEFTH:
                    if (e.keyCode === 37 && stateText.textSelect.cursor > 0) {
                        stateText.textSelect.cursor -= 1;
                        stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
                        paint();
                    } else {
                        // BTN RIGTH:
                        if (e.keyCode === 39 && stateText.textSelect.cursor < stateText.textSelect.fontText.length) {
                            stateText.textSelect.cursor += 1;
                            let line = u_textPositionCursor(stateText.textSelect);
                            stateText.textSelect.line = line;
                            paint();
                        } else {
                            // BTN DELETE:
                            if (e.keyCode === 8 && stateText.textSelect.fontText.length > 0 && stateText.textSelect.cursor > 0) {
                                //stateText.textSelect.fontText = stateText.textSelect.fontText.slice(0,-1);
                                let lefth = stateText.textSelect.fontText.slice(0, stateText.textSelect.cursor-1);
                                let right = stateText.textSelect.fontText.slice(stateText.textSelect.cursor, stateText.textSelect.fontText.length);
                                stateText.textSelect.fontText = lefth + right;
                                stateText.textSelect.cursor -= 1;
                                stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
                                paint();
                            }
                        }
                    }
                }
            }
        }
    }

    // EFECT:
    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontColor = stateText.fontColor;
            paint();
        }
    }, [stateText.fontColor]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontBold = stateText.fontBold;
            stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
            paint();
        }
    }, [stateText.fontBold]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontItalic = stateText.fontItalic;
            stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
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
            stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
            paint();
        }
    }, [stateText.fontTypografia]);

    useEffect(() => {
        if (!isObjectEmpty(stateText.textSelect) && stateText.textSelect.canvas === stateText.canvas) {
            stateText.textSelect.fontSize = stateText.fontSize;;
            stateText.textSelect.line = u_textPositionCursor(stateText.textSelect);
            paint();
        }
    }, [stateText.fontSize]);

    useEffect( () => {
        if (stateText.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            canvasTextDatos = u_canvasAutoSize(canvas, canvasTextDatos);
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
        if (!isObjectEmpty(stateText.textSelect)) {
            stateText.textSelect.line.x_ini = stateText.textSelect.x_fin;
            stateText.textSelect.line.x_fin = stateText.textSelect.x_fin;
            stateText.textSelect.line.y_ini = stateText.textSelect.y_ini-3;
            stateText.textSelect.line.y_fin = stateText.textSelect.y_fin+3;
            beginInterval();
        }
        else stopInterval();
    }, [stateText.textSelect]);

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
        if (stateText.active) {
            paint();
            // preguntamos si el textSelect es vacio:
            if (isObjectEmpty(stateText.textSelect)) {
                // no hay ningun texto select en el stateText
                let elm = {};
                for (let i = 0; i < state.historia.length; i++) {
                    if (state.historia[i].types === 'text' && state.historia[i].select) {
                        elm = state.historia[i];
                        elm.rotateDeg = 0;
                        break;
                    }
                }
                (!isObjectEmpty(elm)) ? h_textSetTextselect(elm):'';
            }
        } else {
            // stateText desactivado o se desactiva
            if (!isObjectEmpty(stateText.textSelect)) {
                if (stateText.textSelect.fontText.length > 0) {
                    stateText.textSelect.h = stateText.textSelect.x_ini + (stateText.textSelect.x_fin - stateText.textSelect.x_ini)/2;
                    stateText.textSelect.k = stateText.textSelect.y_ini + (stateText.textSelect.y_fin - stateText.textSelect.y_ini)/2;
                    stateText.textSelect.radio = u_distanciaEntreDosPtos({x:stateText.textSelect.x_ini, y:stateText.textSelect.y_ini},{x:stateText.textSelect.h, y:stateText.textSelect.k});
                    stateText.textSelect.width = stateText.textSelect.x_fin - stateText.textSelect.x_ini;
                    stateText.textSelect.height = stateText.textSelect.y_fin - stateText.textSelect.y_ini;
                    // vertex:
                    u_textSearchVertex(stateText.textSelect);
                    u_textSearchAngulo(stateText.textSelect);
                    stateText.textSelect.rotateDegPrev = stateText.textSelect.angulo / 2;
                    stateText.textSelect.select = false;
                }
                h_textSetReset();
            }
        }
        if (state.historia.length > 0
            && state.historia[state.historia.length -1].types === 'text'
            && state.historia[state.historia.length -1].fontText.length === 0
        ) {
            h_deleteByIndex(state.historia.length -1);
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