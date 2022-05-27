import React, { useEffect, useContext } from 'react';

// useContext:
import AppContextLapiz from '../../context/AppContextLapiz';

// UTILS:
import AppContext from "../../context/AppContext";
import AppContextGrid from "../../context/AppContextGrid";

import { u_lapizGraficaLinea } from './UtilsLapiz';

import draw                                    from '../Draw/Draw'
import {u_canvasAutoSize}                      from "../../utils/utils";
import {u_textPositionCursor, u_textValidChar} from "../Text/UtilsText";

const PaintLapiz = (id_canvas) => {
	// useContext:
	const { state, h_addH, h_deleteIndexH } = useContext(AppContext);
	const { stateGrid } = useContext(AppContextGrid);
	const { stateLapiz, s_lapizAddHId, h_lapizSetCanvas } = useContext(AppContextLapiz);

	// LOGICA:
	const paint = async () => {
		if (stateLapiz.active){
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
	const lapizNew = {
		id: stateLapiz.id,
		visible: true,
		edit: true,
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
		colorBlur: stateLapiz.colorBlur,
		historiaLinea: [],
		x_min: 2000,
		x_may: 0,
		y_min: 2000,
		y_may: 0,
		canvas: stateLapiz.canvas,
		types: 'pencil',
	};
	let linea = {
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	let canvasLapizDatos = {top: 0, left: 0, width: 0, height: 0};
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};

	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const x_real = x - canvasLapizDatos.left;
		const y_real = y - canvasLapizDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
		linea.x_ini = mouse.pos_prev.x;
		linea.y_ini = mouse.pos_prev.y;
		linea.x_fin = mouse.pos.x;
		linea.y_fin = mouse.pos.y;
	};
	// 1
	const mouseDownLapiz = (e) => {
		stateLapiz.grosor > 0
			? (mouse.click = true)
			: console.log('el grosor es 0.');
		captura_Pos_Posprev(e);
	};
	// 2
	const mouseMoveLapiz = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			//graficaLinea(linea);
			linea = u_lapizGraficaLinea(context, linea, lapizNew);
			lapizNew.historiaLinea.push([
				linea.x_ini,
				linea.y_ini,
				linea.x_fin,
				linea.y_fin,
			]);
		}
	};
	// 3
	const mouseUpLapiz = (e) => {
		if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
			s_lapizAddHId(lapizNew, stateLapiz.id + 1);
			lapizNew.id = state.id;
			h_addH(lapizNew);
		}
		mouse.click = false;
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
				state.historia.forEach((elm, index) => elm.canvas === stateLapiz.canvas ? indexdDelete = index:'');
				indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
			}
		}
	}

	// EFFECT:
	useEffect(() => {
		if (stateLapiz.active){
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			canvasLapizDatos = u_canvasAutoSize(canvas, canvasLapizDatos);
			paint();

			canvas.addEventListener('mousedown', mouseDownLapiz);
			canvas.addEventListener('mousemove', mouseMoveLapiz);
			canvas.addEventListener('mouseup', mouseUpLapiz);
			document.addEventListener('keydown', keyDown);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownLapiz);
				canvas.removeEventListener('mousemove', mouseMoveLapiz);
				canvas.removeEventListener('mouseup', mouseUpLapiz);
				document.removeEventListener('keydown', keyDown);
			};
		}
	}, [stateLapiz, state.historia]);

	useEffect(() => {
		h_lapizSetCanvas(state.canvas);
		if (stateLapiz.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintLapiz;
