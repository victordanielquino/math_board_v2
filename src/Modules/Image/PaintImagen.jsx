import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextImagen from "../../context/AppContextImagen";
import AppContextFunction from "../../context/AppContextFunction";

// utils:

import draw               from '../Draw/Draw';
import {u_canvasAutoSize} from "../../utils/utils";

const PaintImagen = (id_canvas) => {
    // useContext:
    const { state, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateImagen, h_imageSetCanvas } = useContext(AppContextImagen);
    const { stateFunction } = useContext(AppContextFunction);

    // LOGICA:
    let canvas = '';
    let context = '';
    const paint = async () => {
        if (stateImagen.active || stateFunction.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        }
    }
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
                state.historia.forEach((elm, index) => elm.canvas === stateImagen.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }

    // useEffect:
    useEffect(() => {
        stateImagen.active ? paint():'';
    }, [stateImagen.active]);

    useEffect(async () => {
        //state.historia.length > 0 ? await paint():'';
        if (stateImagen.active){
            paint();
            document.addEventListener('keydown', keyDown);
            return () => {
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [state.historia]);

    useEffect(() => {
        h_imageSetCanvas(state.canvas);
        if (stateImagen.active || stateFunction.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintImagen;