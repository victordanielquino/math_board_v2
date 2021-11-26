import React, { useEffect, useContext } from 'react';

// useContext:
import AppContextLapiz from '../context/AppContextLapiz';

// UTILS:
import { u_lapizGraficaLinea } from '../utils/UtilsLapiz';

const PaintLapiz = (id_canvas) => {
	// useContext:
	const { stateLapiz, s_lapizAddHId } = useContext(AppContextLapiz);

	// LOGICA:
	let canvas = '';
	let context = '';
	const lapizNew = {
		id: stateLapiz.id,
		visible: true,
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
		historiaLinea: [],
		x_min: 2000,
		x_may: 0,
		y_min: 2000,
		y_may: 0,
	};
	let linea = {
		grosor: stateLapiz.grosor,
		color: stateLapiz.color,
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
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			s_lapizAddHId(lapizNew, stateLapiz.id + 1);
		}
		mouse.click = false;
	};
	const canvasLapizDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const update_canvasLapizDatos = () => {
		canvasLapizDatos.top = canvas.getBoundingClientRect().top;
		canvasLapizDatos.left = canvas.getBoundingClientRect().left;
		canvasLapizDatos.width = canvas.getBoundingClientRect().width;
		canvasLapizDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');

		if (stateLapiz.active) {
			update_canvasLapizDatos();
			canvas.addEventListener('mousedown', mouseDownLapiz);
			canvas.addEventListener('mousemove', mouseMoveLapiz);
			canvas.addEventListener('mouseup', mouseUpLapiz);
		}
		return () => {
			//canvasLapiz.removeEventListener('click', saludar);
			canvas.removeEventListener('mousedown', mouseDownLapiz);
			canvas.removeEventListener('mousemove', mouseMoveLapiz);
			canvas.removeEventListener('mouseup', mouseUpLapiz);
		};
	}, [stateLapiz]);
	// return console.log('hola soy lapiz');
};

export default PaintLapiz;
