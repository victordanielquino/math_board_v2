import React, { useEffect, useContext } from 'react';

// useContext:
import AppContextLapiz from '../context/AppContextLapiz';

const PaintLapiz = (id_canvas) => {
	// useContext:
	const { stateLapiz, add_historiaLapizId } = useContext(AppContextLapiz);

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
	const lapizLinea = {
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
	const canvasLapizDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
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

		lapizLinea.x_ini = mouse.pos_prev.x;
		lapizLinea.y_ini = mouse.pos_prev.y;
		lapizLinea.x_fin = mouse.pos.x;
		lapizLinea.y_fin = mouse.pos.y;
	};

	const graficaLinea = (linea) => {
		context.strokeStyle = linea.color;
		context.lineWidth = linea.grosor;
		context.setLineDash([0, 0]);
		context.beginPath();
		context.moveTo(linea.x_ini, linea.y_ini);
		context.lineTo(linea.x_fin, linea.y_fin);
		context.stroke();
		context.closePath();
		// busca cotas minimas X:
		linea.x_ini < lapizNew.x_min ? (lapizNew.x_min = linea.x_ini) : '';
		linea.x_fin < lapizNew.x_min ? (lapizNew.x_min = linea.x_fin) : '';
		// busca cotas maximas X:
		linea.x_ini > lapizNew.x_may ? (lapizNew.x_may = linea.x_ini) : '';
		linea.x_fin > lapizNew.x_may ? (lapizNew.x_may = linea.x_fin) : '';
		// busca cotas minimas Y:
		linea.y_ini < lapizNew.y_min ? (lapizNew.y_min = linea.y_ini) : '';
		linea.y_fin < lapizNew.y_min ? (lapizNew.y_min = linea.y_fin) : '';
		// busca cotas maximas Y:
		linea.y_ini > lapizNew.y_may ? (lapizNew.y_may = linea.y_ini) : '';
		linea.y_fin > lapizNew.y_may ? (lapizNew.y_may = linea.y_fin) : '';
	};
	const mouseDownLapiz = (e) => {
		stateLapiz.grosor > 0
			? (mouse.click = true)
			: console.log('el grosor es 0.');
		captura_Pos_Posprev(e);
	};
	const mouseMoveLapiz = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			graficaLinea(lapizLinea);
			lapizNew.historiaLinea.push([
				lapizLinea.x_ini,
				lapizLinea.y_ini,
				lapizLinea.x_fin,
				lapizLinea.y_fin,
			]);
		}
	};
	const mouseUpLapiz = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			graficaLinea(lapizLinea);
			lapizNew.historiaLinea.push([
				lapizLinea.x_ini,
				lapizLinea.y_ini,
				lapizLinea.x_fin,
				lapizLinea.y_fin,
			]);
			//lapizNew.id = stateLapiz.id;
			add_historiaLapizId(lapizNew, stateLapiz.id + 1);
		}
		mouse.click = false;
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
