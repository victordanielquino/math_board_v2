import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextMover from '../context/AppContextMover';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { u_planoGraficaH } from '../utils/UtilsPlano';
import {
	u_cuadradoGraficaH,
	u_cuadradoGet,
	u_cuadradoMover,
	u_cuadradoSegmentado,
	u_cuadradoGetPtsRedimencion,
	u_cuadradoUpdateZise,
} from '../utils/UtilsCuadrado';
import {
	u_lineaGraficaH,
	u_lineaGet,
	u_lineaSegmentado,
	u_lineaMover,
	u_lineaGetPtsRedimencion,
	u_lineaUpdateZise,
} from '../utils/UtilsLinea';
import { u_lapizGraficaH } from '../utils/UtilsLapiz';
import {
	//u_getCuadrado,
	//u_moverCuadrado,
	//u_cuadradoSegmentado,
	//get_pts_redimencion,
	//u_updateZiseCuadrado,
	//u_getLinea, // linea
	//u_lineaSegmentado,
	//u_moverLinea,
	//get_pts_redimencion_linea,
	//u_updateZiseLinea,
	u_getPlano,
	u_planoSegmentado,
	u_moverPlano,
	get_pts_redimencion_plano,
	u_updateZisePlano,
} from '../utils/UtilsMover';
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

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
		u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
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
		plano_seleccionar_pts: false,
		plano_pto_mover: false,
		plano_pto: '',
		// TEXTO
		texo_active: true,
		texto_mover: false,
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
						let arrayPts = get_pts_redimencion_plano(planoSelect);
						mouse.plano_pto = busca_cuadrado_ptoClick(
							mouse.pos.x,
							mouse.pos.y,
							arrayPts
						);
						if (mouse.plano_pto != '') {
							console.log(mouse.plano_pto);
							mouse.plano_pto_mover = true; // se movera el lado seleccionado
							mouse.plano_mover = false; // no se movera el cuadrado
						} else {
							mouse.plano_pto_mover = false; // move_size
							mouse.plano_mover = false;
							mouse.plano_seleccionar_pts = false;
						}
					}
					if (!mouse.plano_seleccionar_pts) {
						// no tiene seleccionado un plano aun
						planoSelect = u_getPlano(
							statePlano.historiaPlano,
							mouse.pos.x,
							mouse.pos.y
						);
						if (planoSelect) {
							console.log('selection plano');
							// hizo click sobre un plano
							mouse.plano_seleccionar_pts = true;
							mouse.plano_mover = true;
							mouse.plano_pto_mover = false;
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
							}
						}
					}
				}
			}
		}

		if (!lapizSelect && !lineaSelect && !cuadradoSelect && !planoSelect) {
			console.log('paint');
			paint();
		}
	};
	// 2:
	const mouseMoveMover = (e) => {
		if (mouse.click) {
			if (mouse.mover_cuadrado) {
				// CUADRADO:
				captura_Pos_Posprev(e);
				cuadradoSelect = u_cuadradoMover(cuadradoSelect, mouse);
				paint();
				u_cuadradoSegmentado(context, cuadradoSelect);
			} else {
				// CUADRADO PTOS:
				if (mouse.cuadrado_punto_mover) {
					captura_Pos_Posprev(e);
					cuadradoSelect = u_cuadradoUpdateZise(cuadradoSelect, mouse);
					paint();
					u_cuadradoSegmentado(context, cuadradoSelect);
				} else {
					// LINEA:
					if (mouse.mover_linea) {
						captura_Pos_Posprev(e);
						lineaSelect = u_lineaMover(lineaSelect, mouse);
						paint();
						u_lineaSegmentado(context, lineaSelect);
					} else {
						// LINEA PTOS:
						if (mouse.linea_punto_mover) {
							captura_Pos_Posprev(e);
							lineaSelect = u_lineaUpdateZise(lineaSelect, mouse);
							paint();
							u_lineaSegmentado(context, lineaSelect);
						} else {
							// LAPIZ:
							if (mouse.mover_lapiz) {
								captura_Pos_Posprev(e);
								lapizSelect = u_lapizMover(lapizSelect, mouse);
								paint();
								u_lapizSegmentado(context, lapizSelect);
							} else {
								// PLANO:
								if (mouse.plano_mover) {
									captura_Pos_Posprev(e);
									planoSelect = u_moverPlano(planoSelect, mouse);
									paint();
									u_planoSegmentado(context, planoSelect);
								} else {
									// PLANO PTOS:
									if (mouse.plano_pto_mover) {
										captura_Pos_Posprev(e);
										planoSelect = u_updateZisePlano(planoSelect, mouse);
										paint();
										u_planoSegmentado(context, planoSelect);
									} else {
										// TEXTO
										if (mouse.texto_mover) {
											captura_Pos_Posprev(e);
											textSelect = u_textMover(textSelect, mouse);
											paint();
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
		if (mouse.cuadrado_punto_mover) {
			if (cuadradoSelect.x_fin < cuadradoSelect.x_ini) {
				let aux = cuadradoSelect.x_fin;
				cuadradoSelect.x_fin = cuadradoSelect.x_ini;
				cuadradoSelect.x_ini = aux;
			}
			if (cuadradoSelect.y_fin < cuadradoSelect.y_ini) {
				let aux = cuadradoSelect.y_fin;
				cuadradoSelect.y_fin = cuadradoSelect.y_ini;
				cuadradoSelect.y_ini = aux;
			}
		}
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
		mouse.plano_pto_mover = false;
		mouse.plano_pto = '';
		mouse.texto_mover = false;
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
