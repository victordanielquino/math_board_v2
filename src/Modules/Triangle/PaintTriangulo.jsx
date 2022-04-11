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

const PaintTriangulo = (id_canvas) => {
    // useContext:
    const { state, h_addH } = useContext(AppContext);
    const { stateCanvas } = useContext(AppContextGrid);
    const { stateTriangulo, h_triangleSetCanvas } = useContext(AppContextTriangulo);

    // LOGICA:
    const paint = async () => {
        if (stateTriangulo.active){
            console.log('PaintTriangulo.jsx');
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                //utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
                await draw(context, state.historia, state.canvas, stateCanvas);
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
    const update_canvasTrianguloDatos = () => {
        canvasTrianguloDatos.top = canvas.getBoundingClientRect().top;
        canvasTrianguloDatos.left = canvas.getBoundingClientRect().left;
        canvasTrianguloDatos.width = canvas.getBoundingClientRect().width;
        canvasTrianguloDatos.height = canvas.getBoundingClientRect().height;
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
    const canvasTrianguloDatos = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };
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
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            /*triangulo.x1 = mouse.pos.x;
            triangulo.y1 = mouse.pos.y - 50;

            triangulo.x2 = mouse.pos.x - 50;
            triangulo.y2 = mouse.pos.y + 50;

            triangulo.x3 = mouse.pos.x + 50;
            triangulo.y3 = mouse.pos.y + 50;*/

            //await paint();
            //u_trianguloGrafica(context, triangulo);
            //s_trianguloAddHId(triangulo, stateTriangulo.id + 1);
            triangulo.id = state.id;
            h_addH(triangulo);
        }
        mouseReinicia();
    };
    const enventDraw = () => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        update_canvasTrianguloDatos();
        (state.historia.length > 0)
            ? paint():'';
    }
    // LOGICA END.

    // useEffect:
    useEffect(() => {
        if (stateTriangulo.active){
            console.log('stateTriangulo: active');
            paint();
        } else {
            console.log('no active');
        }
    }, [stateTriangulo.active]);

    useEffect(() => {
        if(stateTriangulo.active) {
            enventDraw();
            canvas.addEventListener('mousedown', mouseDownTriangulo);
            canvas.addEventListener('mousemove', mouseMoveTriangulo);
            canvas.addEventListener('mouseup', mouseUpTriangulo);
            return () => {
                canvas.removeEventListener('mousedown', mouseDownTriangulo);
                canvas.removeEventListener('mousemove', mouseMoveTriangulo);
                canvas.removeEventListener('mouseup', mouseUpTriangulo);
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