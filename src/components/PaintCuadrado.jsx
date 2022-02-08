import React, { useContext, useEffect } from 'react';

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
import { u_lineaGraficaH } from '../utils/UtilsLinea';
import { u_lapizGraficaH } from '../utils/UtilsLapiz';
import { u_planoGraficaH } from '../utils/UtilsPlano';
import { u_textGraficaH } from '../utils/UtilsText';
import { u_circuloGraficaH } from "../utils/UtilsCirculo";
import { u_trianguloGraficaH} from "../utils/UtilsTriangulo";
import {
	u_cuadradoGrafica,
	u_cuadradoGraficaH,
	u_cuadradoValidaPosicion,
} from '../utils/UtilsCuadrado';

const PaintCuadrado = (id_canvas) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);
	const { stateCirculo } = useContext(AppContextCirculo);
	const { stateTriangulo } = useContext(AppContextTriangulo);
	const { stateCuadrado, s_cuadradoAddHId } = useContext(AppContextCuadrado);

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
		u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
		u_circuloGraficaH(context, stateCirculo.historiaCirculo);
		u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
		u_lineaGraficaH(context, stateLinea.historiaLinea);
		u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		u_textGraficaH(context, stateText.historiaText);
	};
	let canvas = '';
	let context = '';
	let cuadrado = {
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
	};
	// 1
	const mouseDownCuadrado = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
		cuadrado.x_ini = mouse.pos.x;
		cuadrado.y_ini = mouse.pos.y;
	};
	// 2
	const mouseMoveCuadrado = (e) => {
		if (mouse.click) {
			mouse.move = true;
			captura_Pos_Posprev(e);
			cuadrado.x_fin = mouse.pos.x;
			cuadrado.y_fin = mouse.pos.y;
			paint();
			u_cuadradoGrafica(context, cuadrado);
		}
	};
	// 3
	const mouseUpCuadrado = () => {
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			cuadrado = u_cuadradoValidaPosicion(cuadrado);
			s_cuadradoAddHId(cuadrado);
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
		paint();
	}, [stateCuadrado.historiaCuadrado]);
};

export default PaintCuadrado;
