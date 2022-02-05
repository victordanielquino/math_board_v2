import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextMover from '../context/AppContextMover';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import {
	u_planoGraficaH,
	u_planoGet,
	u_planoSegmentado,
	u_planoMover,
	u_planoGetPtsRedimencion,
	u_planoUpdateZise,
} from '../utils/UtilsPlano';
import {
	u_cuadradoGraficaH,
	u_cuadradoGet,
	u_cuadradoMover,
	u_cuadradoSegmentado,
	u_cuadradoGetPtsRedimencion,
	u_cuadradoUpdateZise,
	u_cuadradoValidaPosicion
} from '../utils/UtilsCuadrado';
import {
	u_circuloGraficaH,
	u_circuloMover,
	u_circuloBordeSegmentado,
	u_circuloUpdateZise,
	u_circuloOpera,
	u_circuloValidaPosicion
} from "../utils/UtilsCirculo";
import {
	u_lineaGraficaH,
	u_lineaGet,
	u_lineaSegmentado,
	u_lineaMover,
	u_lineaGetPtsRedimencion,
	u_lineaUpdateZise,
} from '../utils/UtilsLinea';
import { u_lapizGraficaH } from '../utils/UtilsLapiz';
import {} from '../utils/UtilsMover';
import {
	u_lapizGet,
	u_lapizSegmentado,
	u_lapizMover,
} from '../utils/UtilsLapiz';
import { u_textGraficaH, u_getText, u_textMover } from '../utils/UtilsText';

const PaintMover = (id_canvas) => {
	// useContext
	const { stateMover } = useContext(AppContextMover);
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);
	const { stateCirculo } = useContext(AppContextCirculo);

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
		u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
		u_circuloGraficaH(context, stateCirculo.historiaCirculo);
		u_lineaGraficaH(context, stateLinea.historiaLinea);
		u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		u_textGraficaH(context, stateText.historiaText);
	};
	let canvas = '';
	let context = '';
	let cuadradoSelect = {};
	let lineaSelect = {};
	let lapizSelect = {};
	let planoSelect = {};
	let textSelect = {};
	let circuloSelect = {};

	const mouse = {
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
		click: false,
		// CUADRADO
		mover_cuadrado: false,
		seleccionar_cuadrado_pts: false,
		cuadrado_punto_mover: false,
		cuadrado_pto: '',
		// LINEA
		mover_linea: false,
		seleccionar_linea_pts: false,
		linea_punto_mover: false,
		linea_pto: '',
		// LAPIZ
		active: true,
		mover_lapiz: false,
		// PLANO:
		plano_mover: false,
		plano_mover_pto: false,
		plano_seleccionar_pts: false,
		plano_pto: '',
		// TEXTO
		texo_active: true,
		texto_mover: false,
		// CIRCULO
		circulo_mover: false,
		circulo_mover_pts: false,
		circulo_seleccionar_pts: false,
		circulo_pto: '',
	};
	const canvasMoverDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const x_real = x - canvasMoverDatos.left;
		const y_real = y - canvasMoverDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	const busca_cuadrado_ptoClick = (x, y, array) => {
		let resp = '';
		if (
			array[0].x1 < x &&
			x < array[0].x2 &&
			array[0].y1 < y &&
			y < array[0].y2
		)
			resp = 'top';
		else if (
			array[1].x1 < x &&
			x < array[1].x2 &&
			array[1].y1 < y &&
			y < array[1].y2
		)
			resp = 'right';
		else if (
			array[2].x1 < x &&
			x < array[2].x2 &&
			array[2].y1 < y &&
			y < array[2].y2
		)
			resp = 'button';
		else if (
			array[3].x1 < x &&
			x < array[3].x2 &&
			array[3].y1 < y &&
			y < array[3].y2
		)
			resp = 'lefth';
		return resp;
	};
	const busca_linea_ptoClick = (x, y, array) => {
		let resp = '';
		if (
			array[0].x1 < x &&
			x < array[0].x2 &&
			array[0].y1 < y &&
			y < array[0].y2
		)
			resp = 'ini';
		else if (
			array[1].x1 < x &&
			x < array[1].x2 &&
			array[1].y1 < y &&
			y < array[1].y2
		)
			resp = 'fin';
		return resp;
	};
	const clickSobreLapiz = () => {
		lapizSelect || cuadradoSelect || lineaSelect ? paint() : '';
		lapizSelect = u_lapizGet(
			stateLapiz.historiaLapiz,
			mouse.pos.x,
			mouse.pos.y
		);
		if (lapizSelect) {
			u_lapizSegmentado(context, lapizSelect);
			mouse.mover_lapiz = true;
		}
	};
	// 1:
	const mouseDownMover = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);

		// LAPIZ:
		clickSobreLapiz();
		if (!lapizSelect) {
			// no se hizo click sobre el lapiz.
			// LINEA:
			if (mouse.seleccionar_linea_pts) {
				// selecciono previamente una linea
				let arrayPts = u_lineaGetPtsRedimencion(lineaSelect);
				mouse.linea_pto = busca_linea_ptoClick(
					mouse.pos.x,
					mouse.pos.y,
					arrayPts
				);
				if (mouse.linea_pto != '') {
					// hizo click sobre uno de los puntos de la linea
					mouse.linea_punto_mover = true;
					mouse.mover_linea = false;
				} else {
					// no hizo click sobre los puntos de la linea
					mouse.linea_punto_mover = false;
					mouse.mover_linea = false;
				}
			}
			if (!mouse.linea_punto_mover) {
				// no tiene seleccionado una linea previamente
				lineaSelect = u_lineaGet(
					stateLinea.historiaLinea,
					mouse.pos.x,
					mouse.pos.y
				);
				if (lineaSelect) {
					// selecciono una linea
					mouse.seleccionar_linea_pts = true;
					mouse.mover_linea = true;
					mouse.linea_punto_mover = false;
					u_lineaSegmentado(context, lineaSelect);
				} else {
					// no selecciono una linea
					mouse.seleccionar_linea_pts = false;
					mouse.mover_linea = false;
					mouse.linea_punto_mover = false;
					//paint();
				}
			}
			if (!lineaSelect) {
				// no hizo click sobre una linea
				// CUADRADO:
				if (mouse.seleccionar_cuadrado_pts) {
					// ya tiene seleccionado un cuadrado previamente
					let arrayPts = u_cuadradoGetPtsRedimencion(cuadradoSelect);
					mouse.cuadrado_pto = busca_cuadrado_ptoClick(
						mouse.pos.x,
						mouse.pos.y,
						arrayPts
					);
					if (mouse.cuadrado_pto != '') {
						console.log(mouse.cuadrado_pto);
						mouse.cuadrado_punto_mover = true; // se movera el lado seleccionado
						mouse.mover_cuadrado = false; // no se movera el cuadrado
					} else {
						mouse.cuadrado_punto_mover = false; // move_size
						mouse.mover_cuadrado = false;
					}
				}
				if (!mouse.cuadrado_punto_mover) {
					// no tiene seleccionando un cuadrado aun
					cuadradoSelect = u_cuadradoGet(
						stateCuadrado.historiaCuadrado,
						mouse.pos.x,
						mouse.pos.y
					);
					if (cuadradoSelect) {
						// encontro un cuadrado donde hizo click
						mouse.seleccionar_cuadrado_pts = true;
						mouse.mover_cuadrado = true;
						mouse.cuadrado_punto_mover = false;
						u_cuadradoSegmentado(context, cuadradoSelect);
					} else {
						// no encontro un cuadrado donde hizo click
						mouse.seleccionar_cuadrado_pts = false;
						mouse.mover_cuadrado = false;
						mouse.cuadrado_punto_mover = false;
						//paint();
					}
				}
				if (!cuadradoSelect) {
					// no hizo click sobre un cuadrado.
					// PLANO:
					if (mouse.plano_seleccionar_pts) {
						console.log('selection plano preview');
						// ya tiene seleccionado un plano previamente
						let arrayPts = u_planoGetPtsRedimencion(planoSelect);
						mouse.plano_pto = busca_cuadrado_ptoClick(
							mouse.pos.x,
							mouse.pos.y,
							arrayPts
						);
						if (mouse.plano_pto != '') {
							mouse.plano_mover = false; // no se movera el cuadrado
							mouse.plano_mover_pto = true; // se movera el lado seleccionado
						} else {
							mouse.plano_mover = false;
							mouse.plano_mover_pto = false; // move_size
							mouse.plano_seleccionar_pts = false;
						}
					}
					if (!mouse.plano_seleccionar_pts) {
						// no tiene seleccionado un plano aun
						planoSelect = u_planoGet(
							statePlano.historiaPlano,
							mouse.pos.x,
							mouse.pos.y
						);
						if (planoSelect) {
							console.log('1 selection plano');
							// hizo click sobre un plano
							mouse.plano_mover = true;
							mouse.plano_mover_pto = false;
							mouse.plano_seleccionar_pts = true;
							u_planoSegmentado(context, planoSelect);
						} else {
							// TEXTO
							console.log('busca texto');
							textSelect = u_getText(
								stateText.historiaText,
								mouse.pos.x,
								mouse.pos.y
							);
							if (textSelect) {
								console.log('selection texto');
								// hizo click sobre un plano
								mouse.texto_mover = true;
								//mouse.plano_pto_mover = false;
								//u_planoSegmentado(context, planoSelect);
							} else {
								// CIRCULO PUNTOS:
								circuloSelect = u_circuloOpera(context, circuloSelect, stateCirculo.historiaCirculo, mouse);
							}
						}
					}
				}
			}
		}

		if (!lapizSelect && !lineaSelect && !cuadradoSelect && !planoSelect && !circuloSelect) {
			console.log('paint');
			paint();
		}
	};
	// 2:
	const mouseMoveMover = (e) => {
		if (mouse.click) {
			captura_Pos_Posprev(e);
			if (mouse.mover_cuadrado) {
				// CUADRADO:
				cuadradoSelect = u_cuadradoMover(cuadradoSelect, mouse);
				paint();
				u_cuadradoSegmentado(context, cuadradoSelect);
			} else {
				// CUADRADO PTOS:
				if (mouse.cuadrado_punto_mover) {
					cuadradoSelect = u_cuadradoUpdateZise(cuadradoSelect, mouse);
					paint();
					u_cuadradoSegmentado(context, cuadradoSelect);
				} else {
					// LINEA:
					if (mouse.mover_linea) {
						lineaSelect = u_lineaMover(lineaSelect, mouse);
						paint();
						u_lineaSegmentado(context, lineaSelect);
					} else {
						// LINEA PTOS:
						if (mouse.linea_punto_mover) {
							lineaSelect = u_lineaUpdateZise(lineaSelect, mouse);
							paint();
							u_lineaSegmentado(context, lineaSelect);
						} else {
							// LAPIZ:
							if (mouse.mover_lapiz) {
								lapizSelect = u_lapizMover(lapizSelect, mouse);
								paint();
								u_lapizSegmentado(context, lapizSelect);
							} else {
								// PLANO:
								if (mouse.plano_mover) {
									planoSelect = u_planoMover(planoSelect, mouse);
									paint();
									u_planoSegmentado(context, planoSelect);
								} else {
									// PLANO PTOS:
									if (mouse.plano_mover_pto) {
										planoSelect = u_planoUpdateZise(planoSelect, mouse);
										paint();
										u_planoSegmentado(context, planoSelect);
									} else {
										// TEXTO
										if (mouse.texto_mover) {
											textSelect = u_textMover(textSelect, mouse);
											paint();
										} else {
											if(mouse.circulo_mover){
												// CIRCULO MOVER:
												circuloSelect = u_circuloMover(circuloSelect, mouse);
												paint();
												u_circuloBordeSegmentado(context, circuloSelect);
											} else {
												// CIRCULO MOVER PTS REDIMENCION:
												if (mouse.circulo_mover_pts) {
													circuloSelect = u_circuloUpdateZise(circuloSelect, mouse);
													paint();
													u_circuloBordeSegmentado(context, circuloSelect);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	// 3:
	const mouseUpMover = (e) => {
		mouse.cuadrado_punto_mover ? cuadradoSelect = u_cuadradoValidaPosicion(cuadradoSelect): '';
		mouse.circulo_mover_pts ? circuloSelect = u_circuloValidaPosicion(circuloSelect): '';

		mouse.click = false;
		// CUADRADO:
		mouse.mover_cuadrado = false;
		mouse.cuadrado_punto_mover = false;
		mouse.cuadrado_pto = '';
		// LINEA:
		mouse.mover_linea = false;
		mouse.linea_punto_mover = false;
		mouse.linea_pto = '';
		// LAPIZ:
		mouse.mover_lapiz = false;
		// PLANO:
		mouse.plano_mover = false;
		mouse.plano_mover_pto = false;
		mouse.plano_pto = '';
		// TEXTO:
		mouse.texto_mover = false;
		// CIRCULO:
		mouse.circulo_mover = false;
		mouse.circulo_mover_pts = false;
		mouse.circulo_pto = '';
	};
	const update_canvasMoverDatos = () => {
		canvasMoverDatos.top = canvas.getBoundingClientRect().top;
		canvasMoverDatos.left = canvas.getBoundingClientRect().left;
		canvasMoverDatos.width = canvas.getBoundingClientRect().width;
		canvasMoverDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		if (stateMover.active) {
			update_canvasMoverDatos();
			canvas.addEventListener('mousedown', mouseDownMover);
			canvas.addEventListener('mousemove', mouseMoveMover);
			canvas.addEventListener('mouseup', mouseUpMover);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownMover);
			canvas.removeEventListener('mousemove', mouseMoveMover);
			canvas.removeEventListener('mouseup', mouseUpMover);
		};
	}, [stateCuadrado, stateLinea]);

	// RENDER:
	// return console.log('paint mover');
};

export default PaintMover;
