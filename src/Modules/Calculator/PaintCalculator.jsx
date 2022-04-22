import React, {useContext, useEffect} from 'react';

// CONTEXT
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCalculator from "../../context/AppContextCalculator";

import draw from '../Draw/Draw';

const PaintCalculator = (id_canvas) => {
    // CONTEXT:
    const { state } = useContext(AppContext);
    const { stateCanvas } = useContext(AppContextGrid);
    const { stateCalculator, h_calculatorSetCanvas } = useContext(AppContextCalculator);

    // LOGICA:
    const paint = async () => {
        if (stateCalculator.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                //utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
                await draw(context, state.historia, state.canvas, stateCanvas);
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
        h_calculatorSetCanvas(state.canvas);
        if (stateCalculator.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintCalculator;