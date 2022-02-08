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
import AppContextTriangulo from "../context/AppContextTriangulo";

// utils:
import { utilsCuadricula_graficaCuadricula } from '../utils/UtilsCuadricula';
import {
	u_planoGraficaH,
	u_planoMover,
	u_planoUpdateZise,
	u_planoOpera,
	u_planoBordeSegmentado
} from '../utils/UtilsPlano';
import {
	u_cuadradoGraficaH,
	u_cuadradoMover,
	u_cuadradoUpdateZise,
	u_cuadradoValidaPosicion,
	u_cuadradoOpera,
	u_cuadradoBordeSegmentado
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
	u_trianguloGraficaH,
	u_trianguloOpera,
	u_trianguloMover,
	u_trianguloBordeSegmentado,
	u_trianguloUpdateZise
} from "../utils/UtilsTriangulo";
import {
	u_lineaGraficaH,
	u_lineaMover,
	u_lineaUpdateZise,
	u_lineaOpera,
	u_lineaBordeSegmentado
} from '../utils/UtilsLinea';
import {
	u_lapizGraficaH,
	u_lapizBordeSegmentado
} from '../utils/UtilsLapiz';
//import {paint} from '../utils/UtilsMover';
import {
	u_lapizMover,
	u_lapizOpera
} from '../utils/UtilsLapiz';
import {
	u_textGraficaH,
	u_textMover,
	u_textOpera,
	u_textBordeSegmentado,
} from '../utils/UtilsText';

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
	const { stateTriangulo } = useContext(AppContextTriangulo);

	// LOGICA:
	const paint = () => {
		utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
		u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
		u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
		u_circuloGraficaH(context, stateCirculo.historiaCirculo);
		u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
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
	let trianguloSelect = {};

	const mouse = {
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
		click: false,
		elementSelect:'',
		// CUADRADO
		cuadrado_mover: false,
		cuadrado_mover_pts: false,
		cuadrado_seleccionar_pts: false,
		cuadrado_pto: '',
		// LINEA
		linea_mover: false,
		linea_mover_pts: false,
		linea_seleccionar_pts: false,
		linea_pto: '',
		// LAPIZ
		lapiz_mover: false,
		// PLANO:
		plano_mover: false,
		plano_mover_pts: false,
		plano_seleccionar_pts: false,
		plano_pto: '',
		// TEXTO
		text_mover: false,
		// CIRCULO
		circulo_mover: false,
		circulo_mover_pts: false,
		circulo_seleccionar_pts: false,
		circulo_pto: '',
		// TRIANGULO
		triangulo_mover: false,
		triangulo_mover_pts: false,
		triangulo_seleccionar_pts: false,
		triangulo_pto: '',
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
	const prioridad_objetos = ['lapiz', 'text', 'linea','triangulo', 'circulo', 'cuadrado','plano','paint'];
	// 1:
	const mouseDownMover = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
		let sw = true;
		for(let elem of prioridad_objetos){
			switch (elem) {
				case 'triangulo':
					trianguloSelect = u_trianguloOpera(context, trianguloSelect, stateTriangulo.historiaTriangulo, mouse);
					if (trianguloSelect){
						sw = false;
						paint();
						u_trianguloBordeSegmentado(context, trianguloSelect);
					}
					break;
				case 'circulo':
					circuloSelect = u_circuloOpera(context, circuloSelect, stateCirculo.historiaCirculo, mouse);
					if (circuloSelect){
						sw = false;
						paint();
						u_circuloBordeSegmentado(context, circuloSelect);
					}
					break;
				case 'cuadrado':
					cuadradoSelect = u_cuadradoOpera(context, cuadradoSelect, stateCuadrado.historiaCuadrado, mouse);
					if (cuadradoSelect){
						sw = false;
						paint();
						u_cuadradoBordeSegmentado(context, cuadradoSelect);
					}
					break;
				case 'plano':
					planoSelect = u_planoOpera(context, planoSelect, statePlano.historiaPlano, mouse);
					if (planoSelect){
						sw = false;
						paint();
						u_planoBordeSegmentado(context, planoSelect);
					}
					break;
				case 'lapiz':
					lapizSelect = u_lapizOpera(lapizSelect, stateLapiz.historiaLapiz, mouse);
					if (lapizSelect){
						sw = false;
						paint();
						u_lapizBordeSegmentado(context, lapizSelect);
					}
					break;
				case 'linea':
					lineaSelect = u_lineaOpera(lineaSelect, stateLinea.historiaLinea, mouse);
					if (lineaSelect){
						sw = false;
						paint();
						u_lineaBordeSegmentado(context, lineaSelect);
					}
					break;
				case 'text':
					textSelect = u_textOpera(textSelect, stateText.historiaText, mouse);
					if (textSelect){
						sw = false;
						paint();
						u_textBordeSegmentado(context, textSelect);
					}
					break;
				case 'paint':
					paint();
					break;
				default:
					console.log('no selecciono nada');
					break;
			}
			if(!sw) {
				mouse.elementSelect = elem;
				break;
			}
		}
	};
	// 2:
	const mouseMoveMover = (e) => {
		if (mouse.click){
			captura_Pos_Posprev(e);
			switch (mouse.elementSelect){
				case 'text':
					//if (mouse.text_mover) {
						textSelect = u_textMover(textSelect, mouse);
						paint()
						u_textBordeSegmentado(context, textSelect);
					//}
					break;
				case 'cuadrado':
					//if (mouse.cuadrado_mover || mouse.cuadrado_mover_pts) {
						mouse.cuadrado_mover
							? cuadradoSelect = u_cuadradoMover(cuadradoSelect, mouse)
							: mouse.cuadrado_mover_pts ? cuadradoSelect = u_cuadradoUpdateZise(cuadradoSelect, mouse):'';
						paint();
						u_cuadradoBordeSegmentado(context, cuadradoSelect);
					//}
					break;
				case 'linea':
					//if (mouse.linea_mover || mouse.linea_mover_pts) {
						mouse.linea_mover
							? lineaSelect = u_lineaMover(lineaSelect, mouse)
							: mouse.linea_mover_pts ? lineaSelect = u_lineaUpdateZise(lineaSelect, mouse):'';
						paint();
						u_lineaBordeSegmentado(context, lineaSelect);
					//}
					break;
				case 'lapiz':
					//if (mouse.lapiz_mover) {
						lapizSelect = u_lapizMover(lapizSelect, mouse);
						paint();
						u_lapizBordeSegmentado(context, lapizSelect);
					//}
					break;
				case 'plano':
					//if (mouse.plano_mover || mouse.plano_mover_pts) {
						mouse.plano_mover
							? planoSelect = u_planoMover(planoSelect, mouse)
							: mouse.plano_mover_pts ? planoSelect = u_planoUpdateZise(planoSelect, mouse): '';
						paint();
						u_planoBordeSegmentado(context, planoSelect);
					//}
					break;
				case 'circulo':
					//if(mouse.circulo_mover || mouse.circulo_mover_pts){
						mouse.circulo_mover
							? circuloSelect = u_circuloMover(circuloSelect, mouse)
							: mouse.circulo_mover_pts ? circuloSelect = u_circuloUpdateZise(circuloSelect, mouse):'';
						paint();
						u_circuloBordeSegmentado(context, circuloSelect);
					//}
					break;
				case 'triangulo':
					//if (mouse.triangulo_mover || mouse.triangulo_mover_pts) {
						mouse.triangulo_mover
							? trianguloSelect = u_trianguloMover(trianguloSelect, mouse)
							: mouse.triangulo_mover_pts ? trianguloSelect = u_trianguloUpdateZise(trianguloSelect, mouse):'';
						paint();
						u_trianguloBordeSegmentado(context, trianguloSelect);
					//}
					break;
				default:
					break;
			}
		}
	}
	// 3:
	const mouseUpMover = (e) => {
		mouse.cuadrado_mover_pts ? cuadradoSelect = u_cuadradoValidaPosicion(cuadradoSelect): '';
		mouse.circulo_mover_pts ? circuloSelect = u_circuloValidaPosicion(circuloSelect): '';

		mouse.click = false;
		mouse.elementSelect = '';
		// CUADRADO:
		mouse.cuadrado_mover = false;
		mouse.cuadrado_mover_pts = false;
		mouse.cuadrado_pto = '';
		// LINEA:
		mouse.linea_mover = false;
		mouse.linea_mover_pts = false;
		mouse.linea_pto = '';
		// LAPIZ:
		mouse.lapiz_mover = false;
		// PLANO:
		mouse.plano_mover = false;
		mouse.plano_mover_pts = false;
		mouse.plano_pto = '';
		// TEXTO:
		mouse.text_mover = false;
		// CIRCULO:
		mouse.circulo_mover = false;
		mouse.circulo_mover_pts = false;
		mouse.circulo_pto = '';
		// TRIANGULO:
		mouse.triangulo_mover = false;
		mouse.triangulo_mover_pts = false;
		mouse.triangulo_pto = '';
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
