import React, { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextCanvas from '../../context/AppContextCanvas';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextImagen from "../../context/AppContextImagen";

// UTILS:
import { utilsCuadricula_graficaCuadricula } from '../Grid/UtilsCuadricula';
import {
	u_cuadradoGet,
	u_cuadradoDeleteById,
	u_cuadradoGraficaH, u_cuadradoGetId,
} from '../Square/UtilsCuadrado';
import {
	u_lapizGet,
	u_getLapizId,
	u_lapizDeleteById,
	u_lapizGraficaH,
} from '../Pencil/UtilsLapiz';
import {
	u_lineaGet,
	u_lineaGetId,
	u_lineaDeleteById,
	u_lineaGraficaH,
} from '../Line/UtilsLinea';
import {
	u_planoGet,
	u_planoDeleteById,
	u_planoGraficaH, u_planoGetId,
} from '../Plano/UtilsPlano';
import {
	u_textGraficaH,
	u_getTextId,
	u_textDeleteById,
} from '../Text/UtilsText';
import {u_imagenDeleteById, u_imagenGetId, u_imagenGraficaH} from "../Image/UtilsImagen";
import {u_circuloDeleteById, u_circuloGetId, u_circuloGraficaH} from "../Circle/UtilsCirculo";
import {u_trianguloGraficaH, u_trianguloGetId, u_trianguloDeleteById} from "../Triangle/UtilsTriangulo";

const PaintBorrador = (id_canvas) => {
	// useContext:
	const { stateBorrador } = useContext(AppContextBorrador);
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado, h_cuadradoSetH } = useContext(AppContextCuadrado);
	const { stateLinea, h_lineSetH } = useContext(AppContextLinea);
	const { stateLapiz, h_lapizSetH } = useContext(AppContextLapiz);
	const { statePlano, h_planoSetH } = useContext(AppContextPlano);
	const { stateText, h_textDeleteId, h_textSetH } = useContext(AppContextText);
	const { stateCirculo, h_circuloSetH} = useContext(AppContextCirculo);
	const { stateTriangulo, h_trianguloSetH } = useContext(AppContextTriangulo);
	const { stateImagen, h_imagenSetH } = useContext(AppContextImagen);

	// LOGICA:
	const paint = async () => {
		console.log('PaintBorrador.jsx');
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		try {
			utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
			u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
			await u_imagenGraficaH(context, stateImagen.historiaImagen);
			u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
			u_circuloGraficaH(context, stateCirculo.historiaCirculo);
			u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
			u_lineaGraficaH(context, stateLinea.historiaLinea);
			u_textGraficaH(context, stateText.historiaText);
			u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		} catch (e) {
			console.log('error: PaintBorrador.jsx',e.message);
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
	const ordenHerramientas = ['lapiz', 'text', 'linea', 'triangulo', 'circulo', 'cuadrado', 'imagen','plano'];

	let sw = false;
	const deleteX = () => {
		for (let elm of ordenHerramientas) {
			switch (elm) {
				case 'lapiz':
					if (stateLapiz.historiaLapiz.length > 0) {
						let id = u_getLapizId(stateLapiz.historiaLapiz, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_lapizSetH(u_lapizDeleteById(stateLapiz.historiaLapiz, id));
							sw = true;
						}
					}
					break;
				case 'text':
					if (stateText.historiaText.length > 0) {
						let id = u_getTextId(stateText.historiaText, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_textSetH(u_textDeleteById(stateText.historiaText, id));
							sw = true;
						}
					}
					break;
				case 'linea':
					if (stateLinea.historiaLinea.length > 0) {
						let id = u_lineaGetId(stateLinea.historiaLinea, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_lineSetH(u_lineaDeleteById(stateLinea.historiaLinea, id));
							sw = true;
						}
					}
					break;
				case 'triangulo':
					if (stateTriangulo.historiaTriangulo.length > 0) {
						let id = u_trianguloGetId(stateTriangulo.historiaTriangulo, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_trianguloSetH(u_trianguloDeleteById(stateTriangulo.historiaTriangulo, id));
							sw = true;
						}
					}
					break;
				case 'circulo':
					if (stateCirculo.historiaCirculo.length > 0) {
						let id = u_circuloGetId(stateCirculo.historiaCirculo, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_circuloSetH(u_circuloDeleteById(stateCirculo.historiaCirculo, id));
							sw = true;
						}
					}
					break;
				case 'cuadrado':
					if (stateCuadrado.historiaCuadrado.length > 0) {
						let id = u_cuadradoGetId(stateCuadrado.historiaCuadrado, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_cuadradoSetH(u_cuadradoDeleteById(stateCuadrado.historiaCuadrado, id));
							sw = true;
						}
					}
					break;
				case 'plano':
					if (statePlano.historiaPlano.length > 0) {
						let id = u_planoGetId(statePlano.historiaPlano, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_planoSetH(u_planoDeleteById(statePlano.historiaPlano, id));
							sw = true;
						}
					}
					break;
				case 'imagen':
					if (stateImagen.historiaImagen.length > 0) {
						let id = u_imagenGetId(stateImagen.historiaImagen, mouse.pos.x, mouse.pos.y);
						if(id > -1) {
							h_imagenSetH(u_imagenDeleteById(stateImagen.historiaImagen, id));
							sw = true;
						}
					}
					break;
				default:
					break;
			}
			if (sw) break;
		}
	}
	// :1
	const mouseDownBorrador = (e) => {
		capturaPosPosprev(e);
		deleteX();
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
			paint();
			update_canvasBorradorDatos();
			canvas.addEventListener('mousedown', mouseDownBorrador);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownBorrador);
		};
	}, [
		stateBorrador,
		stateText.historiaText,
		stateLapiz.historiaLapiz,
		stateLinea.historiaLinea,
		stateTriangulo.historiaTriangulo,
		stateCirculo.historiaCirculo,
		stateCuadrado.historiaCuadrado,
		statePlano.historiaPlano,
		stateImagen.historiaImagen
	]);
};

export default PaintBorrador;
