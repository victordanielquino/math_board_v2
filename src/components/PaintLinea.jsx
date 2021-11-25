import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import { utilsCuadrado_graficaCuadradoHistoria } from '../utils/UtilsCuadrado';
import {
	utilsLinea_graficaLinea,
	utilsLinea_graficaLineaHistoria,
} from '../utils/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../utils/UtilsLapiz';
import { uPlano_graficaCuadradoHistoriaConEjes } from '../utils/UtilsPlano';
import { u_textGraficaH } from '../utils/UtilsText';

const PaintLinea = (id_canvas) => {
	// useContext:
	const { stateCanvas } = useContext(AppContextCanvas);
	const { stateCuadrado } = useContext(AppContextCuadrado);
	const { stateLinea, add_historiaLinea_id } = useContext(AppContextLinea);
	const { stateLapiz } = useContext(AppContextLapiz);
	const { statePlano } = useContext(AppContextPlano);
	const { stateText } = useContext(AppContextText);

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		uPlano_graficaCuadradoHistoriaConEjes(context, statePlano.historiaPlano); // plano cartesiano
		utilsCuadrado_graficaCuadradoHistoria(
			context,
			stateCuadrado.historiaCuadrado
		);
		utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
		utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
		u_textGraficaH(context, stateText.historiaText);
	};
	let canvas = '';
	let context = '';

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

	const mouse = {
		click: false,
		move: false,
		primerClick: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const mouseReinicia = () => {
		mouse.click = false;
		mouse.move = false;
		mouse.primerClick = false;
		mouse.pos.x = 0;
		mouse.pos_prev.x = 0;
		mouse.pos.y = 0;
		mouse.pos_prev.y = 0;
	};
	const Linea = {
		id: stateLinea.id,
		visible: true,
		grosor: stateLinea.grosor,
		color: stateLinea.color,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
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

		if (mouse.primerClick) {
			Linea.x_ini = mouse.pos_prev.x;
			Linea.y_ini = mouse.pos_prev.y;
			mouse.primerClick = false;
		}
		Linea.x_fin = mouse.pos.x;
		Linea.y_fin = mouse.pos.y;
	};
	const mouseDownLinea = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
	};
	const mouseMoveLinea = (e) => {
		if (mouse.click) {
			if (!mouse.move) {
				mouse.primerClick = true;
				mouse.move = true;
			}
			captura_Pos_Posprev(e);
			paint();
			utilsLinea_graficaLinea(context, Linea); // utilsPaint_graficaLinea
		}
	};
	const mouseUpLinea = () => {
		if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
			Linea.id = stateLinea.id;
			paint();
			add_historiaLinea_id(Linea, stateLinea.id + 1);
			utilsLinea_graficaLinea(context, Linea);
		}
		mouseReinicia();
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
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
};

export default PaintLinea;
