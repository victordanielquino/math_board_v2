import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextGrid from '../../context/AppContextGrid';
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
import { u_textGraficaH } from '../Text/UtilsText';
import { u_circuloGraficaH } from "../Circle/UtilsCirculo";
import { u_trianguloGraficaH } from "../Triangle/UtilsTriangulo";
import { u_imagenGraficaH, getBase64 } from "./UtilsImagen";

const PaintImagen = (id_canvas) => {
    // useContext:
    const { stateCanvas } = useContext(AppContextGrid);
    const { stateCuadrado } = useContext(AppContextCuadrado);
    const { stateLinea } = useContext(AppContextLinea);
    const { stateLapiz } = useContext(AppContextLapiz);
    const { statePlano } = useContext(AppContextPlano);
    const { stateText } = useContext(AppContextText);
    const { stateTriangulo } = useContext(AppContextTriangulo);
    const { stateCirculo } = useContext(AppContextCirculo);
    const { stateImagen } = useContext(AppContextImagen);

    // LOGICA:
    let canvas = '';
    let context = '';
    const paint = async () => {
        console.log('PaintImage.jsx');
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
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

    // useEffect:
    useEffect(() => {
        console.log('ue PaintImage.jsx');
        stateImagen.active ? paint():'';
    }, [stateImagen.active]);

    useEffect(async () => {
        stateImagen.historiaImagen.length > 0 ? await paint():'';
    }, [stateImagen.historiaImagen]);
}

export default PaintImagen;