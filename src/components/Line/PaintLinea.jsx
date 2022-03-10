import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextCanvas from '../../context/AppContextCanvas';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextImagen from "../../context/AppContextImagen";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../Grid/UtilsCuadricula';
import { u_cuadradoGraficaH } from '../Square/UtilsCuadrado';
import { u_lineaGrafica, u_lineaGraficaH, u_lineaVector } from './UtilsLinea';
import { u_circuloGraficaH } from "../Circle/UtilsCirculo";
import { u_lapizGraficaH } from '../Pencil/UtilsLapiz';
import { u_planoGraficaH } from '../Plano/UtilsPlano';
import { u_textGraficaH } from '../../utils/UtilsText';
import { u_trianguloGraficaH } from "../Triangle/UtilsTriangulo";
import { u_imagenGraficaH } from "../../utils/UtilsImagen";

const PaintLinea = (id_canvas) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea, s_lineaAddHId } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);
	const { stateCirculo} = useContext(AppContextCirculo);
	const { stateTriangulo } = useContext(AppContextTriangulo);
	const { stateImagen } = useContext(AppContextImagen);

	// LOGICA:
	const paint = async () => {
		console.log('PaintLinea');
		try {
			utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
			u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
			await u_imagenGraficaH(context, stateImagen.historiaImagen);
			u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
			u_circuloGraficaH(context, stateCirculo.historiaCirculo);
			u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
			u_lineaGraficaH(context, stateLinea.historiaLinea);
			u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
			u_textGraficaH(context, stateText.historiaText);
		} catch (e) {
			console.log(e.message);
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
	const mouseReinicia = () => {
		mouse.click = false;
		mouse.move = false;
		mouse.pos.x = 0;
		mouse.pos_prev.x = 0;
		mouse.pos.y = 0;
		mouse.pos_prev.y = 0;
	};
	const Linea = {
		id: stateLinea.id,
		visible: true,
		edit: true,
		grosor: stateLinea.grosor,
		color: stateLinea.color,
		type: stateLinea.type,
		segment: stateLinea.segment,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
		x_1:0,
		y_1: 0,
		x_2:0,
		y_2: 0,

		cdc_xmin: 0,
		cdc_ymin: 0,
		cdc_xmax: 0,
		cdc_ymax: 0,
		cdc_pto_x1: 0,
		cdc_pto_y1: 0,
		cdc_pto_x2: 0,
		cdc_pto_y2: 0,

		vtr_pto_x1:0,
		vtr_pto_y1:0,
		vtr_pto_x2:0,
		vtr_pto_y2:0,
	};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const x_real = x - canvasLineaDatos.left;
		const y_real = y - canvasLineaDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	const isCuadratic = (cuadratic) => {
		let horizontal = Math.abs(cuadratic.x_fin - cuadratic.x_ini); // -------
		let vertical = Math.abs(cuadratic.y_fin - cuadratic.y_ini); //  ||||||
		if (horizontal > vertical){
			cuadratic.x_1 = cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini) / 2;
			cuadratic.y_1 = (cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini) / 2 )+ (cuadratic.x_fin - cuadratic.x_ini) / 2;
		} else {
			cuadratic.x_1 = (cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini) / 2) + (cuadratic.y_fin - cuadratic.y_ini) / 2;
			cuadratic.y_1 = cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini) / 2;
		}
	}
	const isBezier = (bezier) => {
		let horizontal = Math.abs(bezier.x_fin - bezier.x_ini); // -------
		let vertical = Math.abs(bezier.y_fin - bezier.y_ini); //  ||||||

		if (horizontal > vertical){
			bezier.x_1 = bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3;
			bezier.y_1 = (bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3 ) + (bezier.x_fin - bezier.x_ini) / 2;

			bezier.x_2 = bezier.x_1 + (bezier.x_fin - bezier.x_ini) / 3;
			bezier.y_2 = (bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3 ) - (bezier.x_fin - bezier.x_ini) / 2;
		} else {
			bezier.x_1 = (bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3) + (bezier.y_fin - bezier.y_ini) / 2;
			bezier.y_1 = bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3;

			bezier.x_2 = (bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3) - (bezier.y_fin - bezier.y_ini) / 2;
			bezier.y_2 = bezier.y_1 + (bezier.y_fin - bezier.y_ini) / 3;
		}
	}
	const cuadratic_cdc_pto = (cuadratic) => {
		cuadratic.cdc_pto_x1 = cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini)/2;
		cuadratic.cdc_pto_y1 = cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini)/2;

		cuadratic.cdc_pto_x2 = cuadratic.cdc_pto_x1 + (cuadratic.x_1 - cuadratic.cdc_pto_x1)/2;
		cuadratic.cdc_pto_y2 = cuadratic.cdc_pto_y1 + (cuadratic.y_1 - cuadratic.cdc_pto_y1)/2;

		cuadratic.cdc_xmin = Math.min(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymin = Math.min(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);

		cuadratic.cdc_xmax = Math.max(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymax = Math.max(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);
	}
	const isVector = (vector) => {
		u_lineaVector(vector);
	}
	// 1
	const mouseDownLinea = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
		Linea.x_ini = mouse.pos.x;
		Linea.y_ini = mouse.pos.y;
	};
	// 2
	const mouseMoveLinea = async (e) => {
		if (mouse.click) {
			mouse.move = true;
			captura_Pos_Posprev(e);

			Linea.x_fin = mouse.pos.x;
			Linea.y_fin = mouse.pos.y;

			switch (Linea.type){
				case 'cuadratic':
					isCuadratic(Linea);
					break;
				case 'bezier':
					isBezier(Linea);
					break;
				case 'vector':
					isVector(Linea);
					break;
				default:
					break;
			}
			await paint();
			u_lineaGrafica(context, Linea); // utilsPaint_graficaLinea
		}
	};
	// 3
	const mouseUpLinea = () => {
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			switch (Linea.type){
				case 'cuadratic':
					cuadratic_cdc_pto(Linea);
					break;
				case 'bezier':
					//isBezier(Linea);
					break;
				case 'vector':
					isVector(Linea);
					break;
				default:
					break;
			}
			s_lineaAddHId(Linea, stateLinea.id + 1);
			//rectaCircunferencia(0, 7, 7, 0, 0, 0, 13);
		}
		mouseReinicia();
	};
	const canvasLineaDatos = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	};
	const update_canvasLineaDatos = () => {
		canvasLineaDatos.top = canvas.getBoundingClientRect().top;
		canvasLineaDatos.left = canvas.getBoundingClientRect().left;
		canvasLineaDatos.width = canvas.getBoundingClientRect().width;
		canvasLineaDatos.height = canvas.getBoundingClientRect().height;
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		console.log('ue PaintLinea.jsx');
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		if (stateLinea.active) {
			update_canvasLineaDatos();
			canvas.addEventListener('mousedown', mouseDownLinea);
			canvas.addEventListener('mousemove', mouseMoveLinea);
			canvas.addEventListener('mouseup', mouseUpLinea);
		}
		return () => {
			canvas.removeEventListener('mousedown', mouseDownLinea);
			canvas.removeEventListener('mousemove', mouseMoveLinea);
			canvas.removeEventListener('mouseup', mouseUpLinea);
		};
	}, [stateLinea]);

	useEffect(async () => {
		stateLinea.historiaLinea.length > 0 ? await paint():'';
	}, [stateLinea.historiaLinea]);
};

export default PaintLinea;
