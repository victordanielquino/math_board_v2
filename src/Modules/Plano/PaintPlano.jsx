import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextPlano from '../../context/AppContextPlano';

// utils:

import draw from '../Draw/Draw'

const PaintPlano = (id_canvas) => {
	// useContext:
	const { state, h_addH } = useContext(AppContext);
	const { stateCanvas } = useContext(AppContextGrid);
	const { statePlano, s_planoAddHId, h_planoSetCanvas } = useContext(AppContextPlano);

	// LOGICA:
	const paint = async () => {
		if (statePlano.active){
			console.log('PaintPlano');
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateCanvas);
			} catch (e) {
				console.log(e.message);
			}
		}
	}
	let canvas = '';
	let context = '';
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
		edit: true,
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
		x_min: -3,
		y_max: 3,
		salto: statePlano.salto,
		types: 'plano',
		canvas: statePlano.canvas,
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
	};
	// 1:
	const mouseDownPlano = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
	};
	// 2:
	const mouseMovePlano = (e) => {};
	// 3:
	let mouseUpPlano = async (e) => {
		captura_Pos_Posprev(e);
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			let xMin = plano.x_min;
			let yMax = plano.y_max;
			let width = -xMin * plano.width_cuadricula + plano.width_cuadricula;
			let height = yMax * plano.width_cuadricula + plano.width_cuadricula;
			plano.x_ini = mouse.pos.x - width;
			plano.y_ini = mouse.pos.y - height;
			plano.x_fin = mouse.pos.x + width;
			plano.y_fin = mouse.pos.y + height;
			plano.h = mouse.pos.x;
			plano.k = mouse.pos.y;
			//s_planoAddHId(plano, statePlano.id + 1);
			plano.id = state.id;
			h_addH(plano);
			//uPlano_graficaCuadradoConEjes(context, plano);
			//await paint();
		}
		mouseReinicia();
	};
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
	const eventDraw = () => {
		console.log('ue PaintPlano.jsx');
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		update_canvasPlanoDatos();
		if (state.historia.length > 0) paint();
	}

	// EFFECT:
	useEffect(() => {
		if (statePlano.active) {
			eventDraw();
			canvas.addEventListener('mousedown', mouseDownPlano);
			canvas.addEventListener('mousemove', mouseMovePlano);
			canvas.addEventListener('mouseup', mouseUpPlano);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownPlano);
				canvas.removeEventListener('mousemove', mouseMovePlano);
				canvas.removeEventListener('mouseup', mouseUpPlano);
			};
		}
	}, [statePlano, state.historia]);

	useEffect(() => {
		statePlano.active ? paint():'';
	}, [statePlano.active]);

	useEffect(() => {
		h_planoSetCanvas(state.canvas);
		if (statePlano.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintPlano;
