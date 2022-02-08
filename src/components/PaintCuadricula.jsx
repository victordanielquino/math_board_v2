import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";
import AppContextTriangulo from "../context/AppContextTriangulo";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { u_cuadradoGraficaH } from '../utils/UtilsCuadrado';
import { u_lineaGraficaH } from '../utils/UtilsLinea';
import { u_lapizGraficaH } from '../utils/UtilsLapiz';
import { u_planoGraficaH } from '../utils/UtilsPlano';
import { u_textGraficaH } from '../utils/UtilsText';
import { u_circuloGraficaH } from "../utils/UtilsCirculo";
import { u_trianguloGraficaH } from "../utils/UtilsTriangulo";

const PaintCuadricula = (canvasId) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);
	const { stateCirculo } = useContext(AppContextCirculo);
	const { stateTriangulo } = useContext(AppContextTriangulo);

	// LOGICA:
	let context = '';
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas);
		u_planoGraficaH(context, statePlano.historiaPlano);
		u_cuadradoGraficaH(
			context,
			stateCuadrado.historiaCuadrado
		);
		u_circuloGraficaH(context, stateCirculo.historiaCirculo);
		u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
		u_lineaGraficaH(context, stateLinea.historiaLinea);
		u_lapizGraficaH(context, stateLapiz.historiaLapiz);
		u_textGraficaH(context, stateText.historiaText);
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		context = document.getElementById(canvasId).getContext('2d');
		paint();
	}, [
		stateCanvas.width,
		stateCanvas.height,
		stateCanvas.tipoCuadricula,
		stateCanvas.cuadriculaWidth,
	]);
};
//const saludar = () => console.log('hola daniel');

export default PaintCuadricula;
