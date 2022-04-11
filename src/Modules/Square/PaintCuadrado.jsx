import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCuadrado from '../../context/AppContextCuadrado';

// utils:
import {
	u_cuadradoValidaPosicion,
	u_squareDraw,
} from './UtilsCuadrado';
import draw from '../Draw/Draw';

const PaintCuadrado = (id_canvas) => {
	// CONTEXT:
	const { state, h_addH } = useContext(AppContext);
	const { stateCanvas } = useContext(AppContextGrid);
	const { stateCuadrado, h_squareSetCanvas } = useContext(AppContextCuadrado);

	// LOGICA:
	const paint = async () => {
		console.log('PaintCuadrado');
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		try {
			await draw(context, state.historia, state.canvas, stateCanvas);
		} catch (e) {
			console.log(e.message);
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
	const mouseMoveCuadrado = async (e) => {
		if (mouse.click) {
			mouse.move = true;
			captura_Pos_Posprev(e);
			cuadrado.x_fin = mouse.pos.x;
			cuadrado.y_fin = mouse.pos.y;
			await paint();
			u_squareDraw(context, cuadrado);
		}
	};
	// 3
	const mouseUpCuadrado = () => {
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			cuadrado = u_cuadradoValidaPosicion(cuadrado);
			//s_cuadradoAddHId(cuadrado);
			cuadrado.id = state.id;
			h_addH(cuadrado);
		}
		mouseReinicia();
	};
	const update_canvasCuadradoDatos = () => {
		canvasCuadradoDatos.top = canvas.getBoundingClientRect().top;
		canvasCuadradoDatos.left = canvas.getBoundingClientRect().left;
		canvasCuadradoDatos.width = canvas.getBoundingClientRect().width;
		canvasCuadradoDatos.height = canvas.getBoundingClientRect().height;
	};
	const eventDraw = () => {
		console.log('ue PaintTCuadrado.jsx');
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		update_canvasCuadradoDatos();
		if (state.historia.length > 0) paint();
	}

	// useEffect:
	useEffect(() => {
		if (stateCuadrado.active) {
			eventDraw();
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
		if (stateCuadrado.active){
			console.log('stateCuadrado: active');
			paint();
		} else {
			console.log('no active');
		}
	}, [stateCuadrado.active]);

	useEffect(() => {
		h_squareSetCanvas(state.canvas);
		if (stateCuadrado.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintCuadrado;
