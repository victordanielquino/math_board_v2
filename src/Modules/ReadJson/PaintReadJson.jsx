import React, {useContext, useEffect} from 'react';

// CONTEXT
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';

import draw               from '../Draw/Draw';
import AppContextReadJson from "../../context/AppContextReadJson";

const PaintReadJson = (id_canvas) => {
    // CONTEXT:
    const { state } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateReadJson, h_readJsonSetCanvas } = useContext(AppContextReadJson);

    // LOGICA:
    const paint = async () => {
        if (stateReadJson.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                //utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
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

    // EFFECT:
    useEffect(() => {
        h_readJsonSetCanvas(state.canvas);
        if (stateReadJson.active) {
            paint();
        }
    }, [state.canvas]);

    useEffect(() => {
        stateReadJson.active ? paint():'';
    }, [state.mathBoardsReadJson]);
}


export default PaintReadJson;