import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCirculo from "../../context/AppContextCirculo";

import draw                                from '../Draw/Draw';
import {distanciaEntredosPtos, u_lineDraw} from "../Line/UtilsLinea";
import { u_circleDraw }                    from './UtilsCirculo';
import {u_canvasAutoSize}                  from "../../utils/utils";

const PaintCirculo = (id_canvas) => {
    // useContext:
    const { state, h_addH, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateCirculo, h_circleSetCanvas } = useContext(AppContextCirculo);

    // LOGICA:
    const paint = async () => {
        if (stateCirculo.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log('PaintCirculo.jsx no active');
        }
    }
    let canvas = '';
    let context = '';
    const circulo = {
        id: stateCirculo.id,
        visible: true,
        edit: true,
        bordeEstado: stateCirculo.bordeEstado,
        bordeGrosor: stateCirculo.bordeGrosor,
        bordeColor: stateCirculo.bordeColor,
        fondoEstado: stateCirculo.fondoEstado,
        fondoColor: stateCirculo.fondoColor,
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
        radioX: 0,
        radioY: 0,
        h: 0,
        k: 0,
        types: 'circle',
        canvas: stateCirculo.canvas,
    };
    const radio = {
        visible: true,
        grosor: 1,
        color: 'red',
        segment: true,
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
        type: 'line'
    };
    const mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: { x: 0, y: 0 },
    };
    const mouseReinicia = () => {
        mouse.click = false;
        mouse.move = false;
        mouse.pos.x = 0;
        mouse.pos_prev.x = 0;
        mouse.pos.y = 0;
        mouse.pos_prev.y = 0;
    };
    const captura_Pos_Posprev = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const x_real = x - canvasCirculoDatos.left;
        const y_real = y - canvasCirculoDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
    };
    let canvasCirculoDatos = {top: 0, left: 0, width: 0, height: 0,};
    // 1
    let mouseDownCirculo = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
        radio.x_ini = mouse.pos.x;
        radio.y_ini = mouse.pos.y;
        circulo.h = mouse.pos.x;
        circulo.k = mouse.pos.y;
    };
    // 2
    let mouseMoveCirculo = async (e) => {
        if (mouse.click) {
            mouse.move = true;
            captura_Pos_Posprev(e);

            radio.x_fin = mouse.pos.x;
            radio.y_fin = mouse.pos.y;
            let d = distanciaEntredosPtos(radio);
            circulo.radioX = d;
            circulo.radioY = d;
            await paint();
            u_circleDraw(context, circulo);
            u_lineDraw(context, radio); // utilsPaint_graficaLinea
        }
    };
    // 3
    let mouseUpCirculo = (e) => {
        captura_Pos_Posprev(e);
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            circulo.x_ini = circulo.h - circulo.radioX;
            circulo.y_ini = circulo.k - circulo.radioY;
            circulo.x_fin = circulo.h + circulo.radioX;
            circulo.y_fin = circulo.k + circulo.radioY;
            circulo.id = state.id;
            h_addH(circulo);
        }
        mouseReinicia();
    };
    // 4:
    const keyDown = (e) => {
        if (state.historia.length > 0){
            // console.log(e);
            // console.log(e.key);
            // console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 90 && ctrl) {
                //console.log("Ctrl+Z is pressed.");
                let indexdDelete = -1;
                state.historia.forEach((elm, index) => elm.canvas === stateCirculo.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }

    // EFFECT:
    useEffect(() => {
        if (stateCirculo.active) {
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            canvasCirculoDatos = u_canvasAutoSize(canvas, canvasCirculoDatos);
            paint();

            canvas.addEventListener('mousedown', mouseDownCirculo);
            canvas.addEventListener('mousemove', mouseMoveCirculo);
            canvas.addEventListener('mouseup', mouseUpCirculo);
            document.addEventListener('keydown', keyDown);

            return () => {
                canvas.removeEventListener('mousedown', mouseDownCirculo);
                canvas.removeEventListener('mousemove', mouseMoveCirculo);
                canvas.removeEventListener('mouseup', mouseUpCirculo);
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateCirculo, state.historia]);

    useEffect(() => {
        if (stateCirculo.active) paint();
    }, [stateCirculo.active]);

    useEffect(() => {
        h_circleSetCanvas(state.canvas);
        if (stateCirculo.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintCirculo;