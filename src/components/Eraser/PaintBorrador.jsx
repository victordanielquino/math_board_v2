import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextCanvas from '../../context/AppContextCanvas';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';

// UTILS:
import { utilsCuadricula_graficaCuadricula } from '../Grid/UtilsCuadricula';
import {
	u_cuadradoGet,
	u_cuadradoDeleteById,
	u_cuadradoGraficaH,
} from '../Square/UtilsCuadrado';
import {
	u_lapizGet,
	u_lapizDeleteById,
	u_lapizGraficaH,
} from '../Pencil/UtilsLapiz';
import {
	u_lineaGet,
	u_lineaDeleteById,
	u_lineaGraficaH,
} from '../Line/UtilsLinea';
import {
	u_planoGet,
	u_planoDeleteById,
	u_planoGraficaH,
} from '../Plano/UtilsPlano';
import {
	u_textGraficaH,
	u_textDeleteById,
	u_getText,
} from '../../utils/UtilsText';

const PaintBorrador = (id_canvas) => {
	// useContext:
	const { stateBorrador } = useContext(AppContextBorrador);
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { stateLinea } = useContext(AppContextLinea);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);

	// LOGICA:
	const paint = () => {
		console.log('PaintBorrador');
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		u_planoGraficaH(context, statePlano.historiaPlano);
		u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
		u_lineaGraficaH(context, stateLinea.historiaLinea);
		u_lapizGraficaH(context, stateLapiz.historiaLapiz);
		u_textGraficaH(context, stateText.historiaText);
	};
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
	const cuadradoDelete = () => {
		let res = false;
		let array = stateCuadrado.historiaCuadrado;
		let cuadrado = u_cuadradoGet(array, mouse.pos.x, mouse.pos.y);
		if (cuadrado) {
			stateCuadrado.historiaCuadrado = u_cuadradoDeleteById(array, cuadrado.id);
			// paint();
			res = true;
		}
		return res;
	};
	const lapizDelete = () => {
		let res = false;
		let array = stateLapiz.historiaLapiz;
		let lapiz = u_lapizGet(array, mouse.pos.x, mouse.pos.y);
		if (lapiz) {
			u_lapizDeleteById(array, lapiz.id);
			// paint();
			res = true;
		}
		return res;
	};
	const lineaDelete = () => {
		let res = false;
		let array = stateLinea.historiaLinea;
		let linea = u_lineaGet(array, mouse.pos.x, mouse.pos.y);
		if (linea) {
			u_lineaDeleteById(array, linea.id);
			res = true;
		}
		return res;
	};
	const planoDelete = () => {
		let res = false;
		let array = statePlano.historiaPlano;
		let plano = u_planoGet(array, mouse.pos.x, mouse.pos.y);
		if (plano) {
			u_planoDeleteById(array, plano.id);
			res = true;
		}
		return res;
	};
	const textDelete = () => {
		let res = false;
		let array = stateText.historiaText;
		let text = u_getText(array, mouse.pos.x, mouse.pos.y);
		if (text) {
			u_textDeleteById(array, text.id);
			res = true;
		}
		return res;
	};
	const mouseDownBorrador = (e) => {
		console.log('click borrador');
		capturaPosPosprev(e);
		// TEXTO
		let res = textDelete();
		if (res) {
			paint();
		} else {
			// LAPIZ:
			res = lapizDelete();
			if (res) {
				paint();
			} else {
				// LINEA:
				res = lineaDelete();
				if (res) {
					paint();
				} else {
					// CUADRADO
					res = cuadradoDelete();
					if (res) {
						paint();
					} else {
						// plano
						res = planoDelete();
						if (res) {
							paint();
						}
					}
				}
			}
		}
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
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		if (stateBorrador.active) {
			update_canvasBorradorDatos();
			canvas.addEventListener('mousedown', mouseDownBorrador);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownBorrador);
		};
	}, [stateBorrador]);
	// RENDER:
	// return console.log('hola soy el borrador');
};

export default PaintBorrador;
