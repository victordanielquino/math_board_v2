import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextGrid from '../../context/AppContextGrid';

// UTILS:
import { utilsCuadricula_graficaCuadricula } from '../Grid/UtilsCuadricula';
import {u_squareClickTrue} from '../Square/UtilsCuadrado';
import {u_pencilClickTrue} from '../Pencil/UtilsLapiz';
import {u_lineClickTrue,} from '../Line/UtilsLinea';
import {u_planoClickTrue} from '../Plano/UtilsPlano';
import {u_textClickTrue,} from '../Text/UtilsText';
import {u_imageClickTrue} from "../Image/UtilsImagen";
import {u_circcleClickTrue } from "../Circle/UtilsCirculo";
import {u_triangleClickTrue } from "../Triangle/UtilsTriangulo";

import draw from '../Draw/Draw';

const PaintBorrador = (id_canvas) => {
	// useContext:
	const  { state, h_deleteHId } = useContext(AppContext);
	const { stateBorrador, h_eraserSetCanvas } = useContext(AppContextBorrador);
	const { stateCanvas } = useContext(AppContextGrid);

	// LOGICA:
	const paint = async () => {
		if (stateBorrador.active) {
			console.log('PaintBorrador.jsx');
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			try {
				//utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
				await draw(context, state.historia, stateBorrador.canvas, stateCanvas);
			} catch (e) {
				console.log('error: PaintBorrador.jsx',e.message);
			}
		}
	}

	let canvas = '';
	let context = '';
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const capturaPosPosprev = (e) => {
		let x = e.clientX;
		let y = e.clientY;
		let x_real = x - canvasBorradorDatos.left;
		let y_real = y - canvasBorradorDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	let sw = false;
	const deleteElement = () => {
		for (let i = state.historia.length -1; i >= 0 && !sw; i--) {
			let elm = state.historia[i];
			if (elm.canvas === stateBorrador.canvas && elm.visible && elm.edit) {
				switch (elm.types) {
					case 'pencil': (u_pencilClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'text': (u_textClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'line': (u_lineClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'triangle': (u_triangleClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'circle': (u_circcleClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'square': (u_squareClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'plano': (u_planoClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					case 'image': (u_imageClickTrue(elm, mouse.pos.x, mouse.pos.y))? sw = true: ''; break;
					default: break;
				}
			}
			sw ? h_deleteHId(i):'';
		}
	}
	// :1
	const mouseDownBorrador = (e) => {
		capturaPosPosprev(e);
		deleteElement();
	};
	const canvasBorradorDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const update_canvasBorradorDatos = () => {
		canvasBorradorDatos.top = canvas.getBoundingClientRect().top;
		canvasBorradorDatos.left = canvas.getBoundingClientRect().left;
		canvasBorradorDatos.width = canvas.getBoundingClientRect().width;
		canvasBorradorDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		if (stateBorrador.active) {
			console.log('ue PaintBorrador.jsx');
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			paint();
			update_canvasBorradorDatos();
			canvas.addEventListener('mousedown', mouseDownBorrador);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownBorrador);
			};
		}
	}, [ stateBorrador, state.historia ]);

	useEffect(() => {
		h_eraserSetCanvas(state.canvas);
	}, [state.canvas]);
};

export default PaintBorrador;
