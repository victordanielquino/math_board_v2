import React, {useContext, useEffect} from 'react';
import AppContext                     from "../../context/AppContext";
import AppContextGrid                 from "../../context/AppContextGrid";
import AppContextFunction             from "../../context/AppContextFunction";
import draw                           from "../Draw/Draw";
import {u_canvasAutoSize}             from "../../utils/utils";

const PaintFunction = (id_canvas) => {
    // useContext:
    const { state, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateFunction, h_functionSetCanvas } = useContext(AppContextFunction);

    // LOGICA:
    let canvas = '';
    let context = '';
    const paint = async () => {
        if (stateFunction.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        }
    }
    let canvasFunctionDatos = {top: 0, left: 0, width: 0, height: 0,};
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
                state.historia.forEach((elm, index) => elm.canvas === stateFunction.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }

    // EFFECT:
    useEffect(() => {
        if (stateFunction.active) {
            /*canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            canvasFunctionDatos = u_canvasAutoSize(canvas, canvasFunctionDatos);*/
            paint();

            document.addEventListener('keydown', keyDown);
            return () => {
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateFunction, state.historia]);

    /*useEffect(() => {
        if (stateFunction.active) {
            paint();
        }

    }, [stateFunction.active]);*/

    useEffect(() => {
        h_functionSetCanvas(state.canvas);
        if (stateFunction.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintFunction;