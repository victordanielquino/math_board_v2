import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextImagen from "../../context/AppContextImagen";
import AppContextFunction from "../../context/AppContextFunction";

// utils:

import draw from '../Draw/Draw';

const PaintImagen = (id_canvas) => {
    // useContext:
    const { state } = useContext(AppContext);
    const { stateCanvas } = useContext(AppContextGrid);
    const { stateImagen, h_imageSetCanvas } = useContext(AppContextImagen);
    const { stateFunction } = useContext(AppContextFunction);

    // LOGICA:
    let canvas = '';
    let context = '';
    const paint = async () => {
        if (stateImagen.active || stateFunction.active){
            console.log('PaintImage.jsx');
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

    // useEffect:
    useEffect(() => {
        console.log('ue PaintImage.jsx');
        stateImagen.active ? paint():'';
    }, [stateImagen.active]);

    useEffect(async () => {
        state.historia.length > 0 ? await paint():'';
    }, [state.historia]);

    useEffect(() => {
        h_imageSetCanvas(state.canvas);
        if (stateImagen.active || stateFunction.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintImagen;