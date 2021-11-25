import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
} from '../utils/UtilsCuadrado';
import { utilsLinea_graficaLineaHistoria } from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import { uPlano_graficaCuadradoHistoriaConEjes } from '../utils/UtilsPlano';
import { u_textGraficaH } from '../utils/UtilsText';

const PaintCuadrado = (id_canvas) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado, add_cuadrado_en_historia } =
		useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);

	// LOGICA:
	let canvas = '';
	let context = '';
	const cuadrado = {
		id: stateCuadrado.id,
		visible: true,
		bordeEstado: stateCuadrado.bordeEstado,
		bordeGrosor: stateCuadrado.bordeGrosor,
		bordeColor: stateCuadrado.bordeColor,
		fondoEstado: stateCuadrado.fondoEstado,
		fondoColor: stateCuadrado.fondoColor,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	const mouse = {
		click: false,
		move: false,
		primerClick: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const mouseReinicia = () => {
		mouse.click = false;
		mouse.move = false;
		mouse.primerClick = false;
		mouse.pos.x = 0;
		mouse.pos_prev.x = 0;
		mouse.pos.y = 0;
		mouse.pos_prev.y = 0;
	};

	const canvasCuadradoDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const x_real = x - canvasCuadradoDatos.left;
		const y_real = y - canvasCuadradoDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;

		if (mouse.primerClick) {
			cuadrado.x_ini = mouse.pos_prev.x;
			cuadrado.y_ini = mouse.pos_prev.y;
			mouse.primerClick = false;
		}
		cuadrado.x_fin = mouse.pos.x;
		cuadrado.y_fin = mouse.pos.y;
	};
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		uPlano_graficaCuadradoHistoriaConEjes(context, statePlano.historiaPlano); // plano cartesiano
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		u_textGraficaH(context, stateText.historiaText);
	};
	const mouseDownCuadrado = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
	};
	const mouseMoveCuadrado = (e) => {
		if (mouse.click) {
			if (!mouse.move) {
				mouse.primerClick = true;
				mouse.move = true;
			}
			captura_Pos_Posprev(e);
			paint();
			utilsCuadrado_graficaCuadrado(context, cuadrado);
		}
	};
	const mouseUpCuadrado = (e) => {
		//captura_Pos_Posprev(e);
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			cuadrado.id = stateCuadrado.historiaCuadrado.length;
			if (cuadrado.x_ini > cuadrado.x_fin) {
				let aux = cuadrado.x_ini;
				cuadrado.x_ini = cuadrado.x_fin;
				cuadrado.x_fin = aux;
			}
			if (cuadrado.y_ini > cuadrado.y_fin) {
				let aux = cuadrado.y_ini;
				cuadrado.y_ini = cuadrado.y_fin;
				cuadrado.y_fin = aux;
			}
			paint();
			add_cuadrado_en_historia(cuadrado);
			utilsCuadrado_graficaCuadrado(context, cuadrado);
		}
		mouseReinicia();
	};
	const update_canvasCuadradoDatos = () => {
		canvasCuadradoDatos.top = canvas.getBoundingClientRect().top;
		canvasCuadradoDatos.left = canvas.getBoundingClientRect().left;
		canvasCuadradoDatos.width = canvas.getBoundingClientRect().width;
		canvasCuadradoDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');

		if (stateCuadrado.active) {
			update_canvasCuadradoDatos();

			canvas.addEventListener('mousedown', mouseDownCuadrado);
			canvas.addEventListener('mousemove', mouseMoveCuadrado);
			canvas.addEventListener('mouseup', mouseUpCuadrado);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownCuadrado);
			canvas.removeEventListener('mousemove', mouseMoveCuadrado);
			canvas.removeEventListener('mouseup', mouseUpCuadrado);
		};
	}, [stateCuadrado]);
	useEffect(() => {
		// console.log(stateCuadrado);
	}, [add_cuadrado_en_historia]);

	// return console.log('soy el paintCuadrado');
};

export default PaintCuadrado;
