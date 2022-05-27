import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextPlano from '../../context/AppContextPlano';

// utils:

import draw                                from '../Draw/Draw'
import {u_planoAbscisas, u_planoOrdenadas} from "./UtilsPlano";
import {u_canvasAutoSize}                  from "../../utils/utils";

const PaintPlano = (id_canvas) => {
	// useContext:
	const { state, h_addH, h_deleteIndexH } = useContext(AppContext);
	const { stateGrid } = useContext(AppContextGrid);
	const { statePlano, h_planoSetCanvas } = useContext(AppContextPlano);

	// LOGICA:
	const paint = async () => {
		if (statePlano.active){
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateGrid);
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

		x_cordenada: [],
		x_value: [],
		y_cordenada: [],
		y_value: [],
		drawGA:[],
	};
	let canvasPlanoDatos = {top: 0, left: 0, width: 0, height: 0,};
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
		if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
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
			u_planoAbscisas(plano);
			u_planoOrdenadas(plano);

			plano.id = state.id;
			h_addH(plano);
			//uPlano_graficaCuadradoConEjes(context, plano);
			//await paint();
		}
		mouseReinicia();
	};
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
				state.historia.forEach((elm, index) => elm.canvas === statePlano.canvas ? indexdDelete = index:'');
				indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
			}
		}
	}

	// EFFECT:
	useEffect(() => {
		if (statePlano.active) {
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			canvasPlanoDatos = u_canvasAutoSize(canvas, canvasPlanoDatos);
			paint();

			canvas.addEventListener('mousedown', mouseDownPlano);
			canvas.addEventListener('mousemove', mouseMovePlano);
			canvas.addEventListener('mouseup', mouseUpPlano);
			document.addEventListener('keydown', keyDown);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownPlano);
				canvas.removeEventListener('mousemove', mouseMovePlano);
				canvas.removeEventListener('mouseup', mouseUpPlano);
				document.removeEventListener('keydown', keyDown);
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
