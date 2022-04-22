import React, {useContext, useEffect} from 'react';

// CONTEXT:
import AppContext          from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextGeometric from "../../context/AppContextGeometric";

import draw                                       from '../Draw/Draw';
import { u_distanciaEntreDosPtos } from '../../utils/geometriaAnalitica';
import {u_searchVertex, u_geometricDraw} from "./UtilsGeometric";

const PaintGeometric = (id_canvas) => {
    // CONTEXT:
    const { state, h_addH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateGeometric, h_geometricSetCanvas } = useContext(AppContextGeometric);

    // STATE:

    // REF:

    // LOGICA:
    const paint = async () => {
        if (stateGeometric.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                //utilsCuadricula_graficaCuadricula(context, stateGrid); // grafica cuadricula
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log('PaintGeometric.jsx no active');
        }
    }
    let canvas = '';
    let context = '';
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
        const x_real = x - canvasGeometricDatos.left;
        const y_real = y - canvasGeometricDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
    };
    const geometricFig = {
        id: 0,
        visible: true,
        edit: true,
        bordeEstado: stateGeometric.bordeEstado,
        bordeGrosor: stateGeometric.bordeGrosor,
        bordeColor: stateGeometric.bordeColor,
        fondoEstado: stateGeometric.fondoEstado,
        fondoColor: stateGeometric.fondoColor,
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
        radioX: 200,
        radioY: 100,
        radioX_: 0,
        radioY_: 0,
        radio:100,
        h: 200,
        k: 200,
        types: 'geometric',
        canvas: stateGeometric.canvas,
        arrayVertex:[],
        arrayVertexSegment:[],
        nroVertex: stateGeometric.vertices,
    };
    const canvasGeometricDatos = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };
    // 1
    let mouseDownGeometric = (e) => {
        mouse.click = true;
        captura_Pos_Posprev(e);
        geometricFig.h = mouse.pos.x;
        geometricFig.k = mouse.pos.y;
        geometricFig.radioX = mouse.pos.x;
        geometricFig.radioY = mouse.pos.y;
        geometricFig.radioX_ = mouse.pos.x;
        geometricFig.radioY_ = mouse.pos.y;
    };
    // 2
    let mouseMoveGeometric = async (e) => {
        if (mouse.click) {
            mouse.move = true;
            captura_Pos_Posprev(e);

            geometricFig.radioX_ = geometricFig.h - (mouse.pos.x - geometricFig.h);
            geometricFig.radioY_ = geometricFig.k - (mouse.pos.y - geometricFig.k);
            geometricFig.radioX = mouse.pos.x;
            geometricFig.radioY = mouse.pos.y;
            geometricFig.radio = u_distanciaEntreDosPtos(
                {x: geometricFig.h, y:geometricFig.k},
                {x: geometricFig.radioX, y:geometricFig.radioY}
            );
            let resp = u_searchVertex(
                stateGeometric.vertices,
                {x: mouse.pos.x, y: mouse.pos.y},
                {h:geometricFig.h, k:geometricFig.k},
                geometricFig.radio
            );
            geometricFig.arrayVertex = resp[0];
            geometricFig.arrayVertexSegment = resp[1];
            // draw:
            await paint();
            u_geometricDraw(context, geometricFig, true);
        }
    };
    // 3
    let mouseUpGeometric = (e) => {
        captura_Pos_Posprev(e);
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            if (geometricFig.h !== geometricFig.radioX && geometricFig.k !== geometricFig.radioY) {
                geometricFig.id = state.id;
                h_addH(geometricFig);
            } else console.log('no valido')
        }
        mouseReinicia();
    };
    const update_canvasGeometricDatos = () => {
        canvasGeometricDatos.top = canvas.getBoundingClientRect().top;
        canvasGeometricDatos.left = canvas.getBoundingClientRect().left;
        canvasGeometricDatos.width = canvas.getBoundingClientRect().width;
        canvasGeometricDatos.height = canvas.getBoundingClientRect().height;
    };
    const eventDraw = () => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        update_canvasGeometricDatos();
        if (state.historia.length > 0) paint();
    }

    // EFFECT:
    useEffect(() => {
        if (stateGeometric.active) {
            eventDraw();
            canvas.addEventListener('mousedown', mouseDownGeometric);
            canvas.addEventListener('mousemove', mouseMoveGeometric);
            canvas.addEventListener('mouseup', mouseUpGeometric);

            return () => {
                canvas.removeEventListener('mousedown', mouseDownGeometric);
                canvas.removeEventListener('mousemove', mouseMoveGeometric);
                canvas.removeEventListener('mouseup', mouseUpGeometric);
            };
        }
    }, [stateGeometric, state.historia]);

    useEffect(() => {
        if (stateGeometric.active) paint();
    }, [stateGeometric.active]);

    useEffect(() => {
        h_geometricSetCanvas(state.canvas);
        if (stateGeometric.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintGeometric;