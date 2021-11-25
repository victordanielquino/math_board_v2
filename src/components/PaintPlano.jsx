import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';
import { utilsLinea_graficaLineaHistoria } from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';

import {
	uPlano_graficaCuadrado,
	uPlano_graficaCuadradoConEjes,
	uPlano_graficaCuadradoHistoria,
	u_planoGraficaH,
} from '../utils/UtilsPlano';

const PaintPlano = (id_canvas) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano, add_plano_en_historiaId } = useContext(AppContextPlano);

	// LOGICA:
	let canvas = '';
	let context = '';
	const canvasPlanoDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const update_canvasPlanoDatos = () => {
		canvasPlanoDatos.top = canvas.getBoundingClientRect().top;
		canvasPlanoDatos.left = canvas.getBoundingClientRect().left;
		canvasPlanoDatos.width = canvas.getBoundingClientRect().width;
		canvasPlanoDatos.height = canvas.getBoundingClientRect().height;
	};
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		// uPlano_graficaCuadradoHistoria(context, statePlano.historiaPlano);
		u_planoGraficaH(context, statePlano.historiaPlano);
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
	};
	let mouse = {
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
	const plano = {
		id: statePlano.id,
		visible: true,
		bordeEstado: true,
		bordeGrosor: 2,
		bordeColor: statePlano.color_cuadricula,
		fondoEstado: true,
		fondoColor: 'white',
		width_cuadricula: statePlano.width_cuadricula,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,

		x_min: statePlano.x_min,
		y_max: statePlano.y_max,
		salto: statePlano.salto,
	};
	let captura_Pos_Posprev = (e) => {
		let x = e.clientX;
		let y = e.clientY;
		let x_real = x - canvasPlanoDatos.left;
		let y_real = y - canvasPlanoDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;

		if (mouse.primerClick) {
			plano.x_ini = mouse.pos_prev.x;
			plano.y_ini = mouse.pos_prev.y;
			mouse.primerClick = false;
		}
		plano.x_fin = mouse.pos.x;
		plano.y_fin = mouse.pos.y;
	};
	// 1:
	const mouseDownPlano = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
		console.log('click');
	};
	// 2:
	const mouseMovePlano = (e) => {
		// if (mouse.click) {
		// 	if (!mouse.move) {
		// 		mouse.primerClick = true;
		// 		mouse.move = true;
		// 	}
		// 	captura_Pos_Posprev(e);
		// 	paint();
		// 	uPlano_graficaCuadrado(context, plano);
		// }
	};
	// 3:
	let mouseUpPlano = (e) => {
		captura_Pos_Posprev(e);
		console.log('solto click');
		console.log(mouse);
		if (mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			console.log('solto click');
			console.log(mouse);
			plano.x_ini = mouse.pos.x - 150;
			plano.y_ini = mouse.pos.y - 150;
			plano.x_fin = mouse.pos.x + 150;
			plano.y_fin = mouse.pos.y + 150;
			paint();
			//uPlano_graficaCuadrado(context, plano);
			//paint();
			//paint();
			uPlano_graficaCuadradoConEjes(context, plano);
			add_plano_en_historiaId(plano, statePlano.id + 1);
		}
		mouseReinicia();
	};
	// LOGICA END.

	// EFFECT:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		if (statePlano.active) {
			update_canvasPlanoDatos();
			canvas.addEventListener('mousedown', mouseDownPlano);
			canvas.addEventListener('mousemove', mouseMovePlano);
			canvas.addEventListener('mouseup', mouseUpPlano);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownPlano);
			canvas.removeEventListener('mousemove', mouseMovePlano);
			canvas.removeEventListener('mouseup', mouseUpPlano);
		};
	}, [statePlano]);
	useEffect(() => {
		//console.log('hola');
	}, []);
};

export default PaintPlano;
