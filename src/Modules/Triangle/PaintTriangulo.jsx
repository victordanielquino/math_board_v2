import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext                          from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextTriangulo from "../../context/AppContextTriangulo";

// utils:
import draw                        from "../Draw/Draw";
import { u_lineDraw }              from "../Line/UtilsLinea";
import {u_triangleDraw}            from "./UtilsTriangulo";
import {u_squareDrawBorderSegment} from "../Square/UtilsCuadrado";
import {u_canvasAutoSize}          from "../../utils/utils";

const PaintTriangulo = (id_canvas) => {
    // useContext:
    const { state, h_addH, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateTriangulo, h_triangleSetCanvas } = useContext(AppContextTriangulo);

    // LOGICA:
    const paint = async () => {
        if (stateTriangulo.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    let canvas = '';
    let context = '';
    let triangulo = {
        id: stateTriangulo.id,
        visible: true,
        edit: true,
        bordeEstado: stateTriangulo.bordeEstado,
        bordeGrosor: stateTriangulo.bordeGrosor,
        bordeColor: stateTriangulo.bordeColor,
        fondoEstado: stateTriangulo.fondoEstado,
        fondoColor: stateTriangulo.fondoColor,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        canvas: stateTriangulo.canvas,
        types: 'triangle',
    };
    const square = {
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
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
        const x_real = x - canvasTrianguloDatos.left;
        const y_real = y - canvasTrianguloDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
    };
    let canvasTrianguloDatos = {top: 0, left: 0, width: 0, height: 0,};
    // 1
    let mouseDownTriangulo = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
        square.x_ini = mouse.pos.x;
        square.y_ini = mouse.pos.y;
    };
    // 2
    let mouseMoveTriangulo = async (e) => {
        if (mouse.click) {
            mouse.move = true;
            captura_Pos_Posprev(e);

            square.x_fin = mouse.pos.x;
            square.y_fin = mouse.pos.y;

            triangulo.x1 = square.x_ini + (square.x_fin-square.x_ini)/2;
            triangulo.y1 = square.y_ini;

            triangulo.x2 = square.x_ini;
            triangulo.y2 = square.y_fin;

            triangulo.x3 = square.x_fin;
            triangulo.y3 = square.y_fin;

            await paint();
            u_triangleDraw(context, triangulo);
            u_squareDrawBorderSegment(context, square)
        }
    };
    // 3
    let mouseUpTriangulo = async (e) => {
        captura_Pos_Posprev(e);
        square.x_fin = mouse.pos.x;
        square.y_fin = mouse.pos.y;
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0
            && square.x_ini !== square.x_fin && square.y_ini !== square.y_fin
        ) {
            triangulo.id = state.id;
            h_addH(triangulo);
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
                state.historia.forEach((elm, index) => elm.canvas === stateTriangulo.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }

    // useEffect:
    useEffect(() => {
        if (stateTriangulo.active) paint();
    }, [stateTriangulo.active]);

    useEffect(() => {
        if(stateTriangulo.active) {
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            canvasTrianguloDatos = u_canvasAutoSize(canvas, canvasTrianguloDatos);
            paint();

            canvas.addEventListener('mousedown', mouseDownTriangulo);
            canvas.addEventListener('mousemove', mouseMoveTriangulo);
            canvas.addEventListener('mouseup', mouseUpTriangulo);
            document.addEventListener('keydown', keyDown);
            return () => {
                canvas.removeEventListener('mousedown', mouseDownTriangulo);
                canvas.removeEventListener('mousemove', mouseMoveTriangulo);
                canvas.removeEventListener('mouseup', mouseUpTriangulo);
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateTriangulo, state.historia]);

    useEffect(() => {
        h_triangleSetCanvas(state.canvas);
        if (stateTriangulo.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintTriangulo;