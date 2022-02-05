import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';
import { utilsLinea_graficaLineaHistoria } from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import { uPlano_graficaCuadradoHistoriaConEjes } from '../utils/UtilsPlano';
import { u_textGraficaH } from '../utils/UtilsText';
import { u_circuloGraficaH} from "../utils/UtilsCirculo";

const PaintCirculo = (id_canvas) => {
    // useContext:
    const { stateCanvas } = useContext(AppContextCanvas);
    const { stateCuadrado } = useContext(AppContextCuadrado);
    const { stateLinea } = useContext(AppContextLinea);
    const { stateLapiz } = useContext(AppContextLapiz);
    const { statePlano } = useContext(AppContextPlano);
    const { stateText } = useContext(AppContextText);
    const { stateCirculo, s_circuloAddHId } = useContext(AppContextCirculo);

    // LOGICA:
    const paint = () => {
        utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
        uPlano_graficaCuadradoHistoriaConEjes(context, statePlano.historiaPlano); // plano cartesiano
        utilsCuadrado_graficaCuadradoHistoria(context, stateCuadrado.historiaCuadrado);
        utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
        utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
        u_textGraficaH(context, stateText.historiaText);
        u_circuloGraficaH(context, stateCirculo.historiaCirculo);
    };
    let canvas = '';
    let context = '';
    let circulo = {
        id: stateCirculo.id,
        visible: true,
        bordeEstado: stateCirculo.bordeEstado,
        bordeGrosor: stateCirculo.bordeGrosor,
        bordeColor: stateCirculo.bordeColor,
        fondoEstado: stateCirculo.fondoEstado,
        fondoColor: stateCirculo.fondoColor,
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
        radioX: stateCirculo.radioX,
        radioY: stateCirculo.radioY,
        h: stateCirculo.h,
        k: stateCirculo.k
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
    const update_canvasCirculoDatos = () => {
        canvasCirculoDatos.top = canvas.getBoundingClientRect().top;
        canvasCirculoDatos.left = canvas.getBoundingClientRect().left;
        canvasCirculoDatos.width = canvas.getBoundingClientRect().width;
        canvasCirculoDatos.height = canvas.getBoundingClientRect().height;
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
    const canvasCirculoDatos = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };
    // 1
    let mouseDownCirculo = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
    };
    // 2
    let mouseMoveCirculo = (e) => {
    };
    // 3
    let mouseUpCirculo = (e) => {
        captura_Pos_Posprev(e);
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            circulo.x_ini = mouse.pos.x - circulo.radioX;
            circulo.y_ini = mouse.pos.y - circulo.radioY;
            circulo.x_fin = mouse.pos.x + circulo.radioX;
            circulo.y_fin = mouse.pos.y + circulo.radioY;
            circulo.h = mouse.pos.x;
            circulo.k = mouse.pos.y;
            s_circuloAddHId(circulo, stateCirculo.id + 1);
        }
        mouseReinicia();
    };
    // LOGICA END.

    // useEffect:
    useEffect(() => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        if (stateCirculo.active) {
            update_canvasCirculoDatos();
            canvas.addEventListener('mousedown', mouseDownCirculo);
            canvas.addEventListener('mousemove', mouseMoveCirculo);
            canvas.addEventListener('mouseup', mouseUpCirculo);
        }
        return () => {
            canvas.removeEventListener('mousedown', mouseDownCirculo);
            canvas.removeEventListener('mousemove', mouseMoveCirculo);
            canvas.removeEventListener('mouseup', mouseUpCirculo);
        };
    }, [stateCirculo]);
    useEffect(() => {
        paint();
    }, [stateCirculo.historiaCirculo]);
}

export default PaintCirculo;