import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCuadrado from '../../context/AppContextCuadrado';

// utils:
import {
	u_cuadradoValidaPosicion,
	u_squareDraw, u_squareSetIniitalRotate,
}                         from './UtilsCuadrado';
import draw               from '../Draw/Draw';
import {u_canvasAutoSize} from "../../utils/utils";

const PaintCuadrado = (id_canvas) => {
	// CONTEXT:
	const { state, h_addH } = useContext(AppContext);
	const { stateGrid } = useContext(AppContextGrid);
	const { stateCuadrado, h_squareSetCanvas } = useContext(AppContextCuadrado);

	// LOGICA:
	const paint = async () => {
		if (stateCuadrado.active) {
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
	let cuadrado = {
		id: stateCuadrado.id,
		visible: true,
		edit: true,
		bordeEstado: stateCuadrado.bordeEstado,
		bordeGrosor: stateCuadrado.bordeGrosor,
		bordeColor: stateCuadrado.bordeColor,
		fondoEstado: stateCuadrado.fondoEstado,
		fondoColor: stateCuadrado.fondoColor,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
		canvas: stateCuadrado.canvas,
		types: 'square',

		h: 0,
		k: 0,
		angulo: 0,
		radio: 0,
		radioX: 0,
		radioY: 0,
		deg: 0,
		degPrev: 0,
		pts: [],
		vertex: [
			{x:0, y:0},
			{x:0, y:0},
			{x:0, y:0},
			{x:0, y:0},
		],
		move: false,
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

	let canvasCuadradoDatos = {top: 0, left: 0, width: 0, height: 0};
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
		cuadrado.vertex[0] = {x:mouse.pos.x, y:mouse.pos.y, pto:0};
	};
	// 2
	const mouseMoveCuadrado = async (e) => {
		if (mouse.click) {
			mouse.move = true;
			captura_Pos_Posprev(e);
			cuadrado.x_fin = mouse.pos.x;
			cuadrado.y_fin = mouse.pos.y;
			cuadrado.vertex[2] = {x:mouse.pos.x, y:mouse.pos.y, pto:2};
			cuadrado.vertex[1] = {x:cuadrado.vertex[2].x, y:cuadrado.vertex[0].y, pto:1};
			cuadrado.vertex[3] = {x:cuadrado.vertex[0].x, y:cuadrado.vertex[2].y, pto:3};
			await paint();
			u_squareDraw(context, cuadrado);
		}
	};
	// 3
	const mouseUpCuadrado = () => {
		if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
			cuadrado = u_cuadradoValidaPosicion(cuadrado);
			cuadrado.id = state.id;
			cuadrado = u_squareSetIniitalRotate(cuadrado);
			h_addH(cuadrado);
		}
		mouseReinicia();
	};

	// useEffect:
	useEffect(() => {
		if (stateCuadrado.active) {
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			canvasCuadradoDatos = u_canvasAutoSize(canvas, canvasCuadradoDatos);
			if (state.historia.length > 0) paint();
			canvas.addEventListener('mousedown', mouseDownCuadrado);
			canvas.addEventListener('mousemove', mouseMoveCuadrado);
			canvas.addEventListener('mouseup', mouseUpCuadrado);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownCuadrado);
				canvas.removeEventListener('mousemove', mouseMoveCuadrado);
				canvas.removeEventListener('mouseup', mouseUpCuadrado);
			};

		}
	}, [stateCuadrado, state.historia]);

	useEffect(() => {
		if (stateCuadrado.active) paint();
	}, [stateCuadrado.active]);

	useEffect(() => {
		h_squareSetCanvas(state.canvas);
		if (stateCuadrado.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintCuadrado;
