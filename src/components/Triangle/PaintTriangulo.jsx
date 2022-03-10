import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextCanvas from '../../context/AppContextCanvas';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextImagen from "../../context/AppContextImagen";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../Grid/UtilsCuadricula';
import { u_cuadradoGraficaH } from '../Square/UtilsCuadrado';
import { u_lineaGraficaH } from '../Line/UtilsLinea';
import { u_lapizGraficaH } from '../Pencil/UtilsLapiz';
import { u_planoGraficaH } from '../Plano/UtilsPlano';
import { u_textGraficaH } from '../../utils/UtilsText';
import { u_circuloGraficaH } from "../Circle/UtilsCirculo";
import { u_trianguloGraficaH, u_trianguloGrafica } from "./UtilsTriangulo";
import { u_imagenGraficaH } from "../../utils/UtilsImagen";

const PaintTriangulo = (id_canvas) => {
    // useContext:
    const { stateCanvas } = useContext(AppContextCanvas);
    const { stateCuadrado } = useContext(AppContextCuadrado);
    const { stateLinea } = useContext(AppContextLinea);
    const { stateLapiz } = useContext(AppContextLapiz);
    const { statePlano } = useContext(AppContextPlano);
    const { stateText } = useContext(AppContextText);
    const { stateCirculo } = useContext(AppContextCirculo);
    const { stateTriangulo, s_trianguloAddHId } = useContext(AppContextTriangulo);
    const { stateImagen } = useContext(AppContextImagen);

    // LOGICA:
    const paint = async () => {
        console.log('PaintTriangulo');
        try {
            utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
            u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
            await u_imagenGraficaH(context, stateImagen.historiaImagen);
            u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
            u_circuloGraficaH(context, stateCirculo.historiaCirculo);
            u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
            u_lineaGraficaH(context, stateLinea.historiaLinea);
            u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
            u_textGraficaH(context, stateText.historiaText);
        } catch (e) {
            console.log(e.message);
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
    };
    // 2
    let mouseMoveTriangulo = (e) => {
    };
    // 3
    let mouseUpTriangulo = async (e) => {
        captura_Pos_Posprev(e);
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            triangulo.x1 = mouse.pos.x;
            triangulo.y1 = mouse.pos.y - 50;

            triangulo.x2 = mouse.pos.x - 50;
            triangulo.y2 = mouse.pos.y + 50;

            triangulo.x3 = mouse.pos.x + 50;
            triangulo.y3 = mouse.pos.y + 50;

            await paint();
            u_trianguloGrafica(context, triangulo);
            s_trianguloAddHId(triangulo, stateTriangulo.id + 1);
        }
        mouseReinicia();
    };
    // LOGICA END.

    // useEffect:
    useEffect(() => {
        console.log('ue PaintTriangulo.jsx');
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        if (stateTriangulo.active) {
            update_canvasTrianguloDatos();
            canvas.addEventListener('mousedown', mouseDownTriangulo);
            canvas.addEventListener('mousemove', mouseMoveTriangulo);
            canvas.addEventListener('mouseup', mouseUpTriangulo);
        }
        return () => {
            canvas.removeEventListener('mousedown', mouseDownTriangulo);
            canvas.removeEventListener('mousemove', mouseMoveTriangulo);
            canvas.removeEventListener('mouseup', mouseUpTriangulo);
        };
    }, [stateTriangulo]);
    /*useEffect(() => {
        paint();
    }, [stateTriangulo.historiaTriangulo]);*/
}

export default PaintTriangulo;