import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextMover from '../../context/AppContextMover';
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextImagen from "../../context/AppContextImagen";

// utils:
import {
	u_planoGraficaH,
	u_planoMover,
	u_planoUpdateZise,
	u_planoOpera,
	u_planoBordeSegmentado
} from '../Plano/UtilsPlano';
import {
	u_cuadradoGraficaH,
	u_cuadradoMover,
	u_cuadradoUpdateZise,
	u_cuadradoValidaPosicion,
	u_cuadradoOpera,
	u_cuadradoBordeSegmentado
} from '../Square/UtilsCuadrado';
import {
	u_circuloGraficaH,
	u_circuloMover,
	u_circuloBordeSegmentado,
	u_circuloUpdateZise,
	u_circuloOpera,
	u_circuloValidaPosicion
} from "../Circle/UtilsCirculo";
import {
	u_trianguloGraficaH,
	u_trianguloOpera,
	u_trianguloMover,
	u_trianguloBordeSegmentado,
	u_trianguloUpdateZise
} from "../Triangle/UtilsTriangulo";
import {
	u_lineaGraficaH,
	u_lineaMover,
	u_lineaUpdateZise,
	u_lineaOpera,
	u_lineaBordeSegmentado
} from '../Line/UtilsLinea';
import {
	u_lapizGraficaH,
	u_lapizBordeSegmentado
} from '../Pencil/UtilsLapiz';
//import {paint} from '../utils/UtilsMover';
import {
	u_lapizMover,
	u_lapizOpera
} from '../Pencil/UtilsLapiz';
import {
	u_textGraficaH,
	u_textMover,
	u_textOpera,
	u_textBordeSegmentado,
}                         from '../Text/UtilsText';
import {
	u_imagenGraficaH,
	u_imagenOpera,
	u_imagenBordeSegmentado,
	u_imagenMover,
	u_imagenUpdateZise
}                         from "../Image/UtilsImagen";
import draw                                                                 from '../Draw/Draw'
import {
	u_geometricDrawBorderSegment,
	u_geometricMove,
	u_geometricOpera, u_geometricResize,
	u_geomtricGetClick
} from "../Geometric/UtilsGeometric";

const PaintMover = (id_canvas) => {
	// useContext
	const { state } = useContext(AppContext);
	const { stateMover, setSelectElmObj, h_moveSetCanvas } = useContext(AppContextMover);
	const { stateGrid } = useContext(AppContextGrid);

	// LOGICA:
	const paint = async () => {
		if (stateMover.active) {
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateGrid);
			} catch (e) {
				console.log('error: PaintMover.jsx')
			}

		}
	};
	const mover = {
		selectElm: false,
		selectElmPrev: false,
	}
	let canvas = '';
	let context = '';
	let cuadradoSelect = {};
	let lineaSelect = {};
	let lapizSelect = {};
	let planoSelect = {};
	let textSelect = {};
	let circuloSelect = {};
	let trianguloSelect = {};
	let imagenSelect = {};
	let elmSelectMove = {};
	let geometricSelect = {};

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
		// IMAGEN:
		imagen_mover: false,
		imagen_mover_pts: false,
		imagen_seleccionar_pts:false,
		imagen_pto: '',
		// GEOMETRIC:
		geometric_mover: false,
		geometric_mover_pts: false,
		geometric_selection_pts: false,
		geometric_pto: '',
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
	// 1:
	const mouseDownMover = async (e) => {
		captura_Pos_Posprev(e);
		let sw = false;
		mover.selectElm = false;
		elmSelectMove = {};
		for (let i = state.historia.length -1; i >= 0 && !sw; i--) {
			let elm = state.historia[i];
			if (elm.canvas === state.canvas && elm.visible){
				let array = [elm];
				switch (elm.types) {
					case 'square':
						cuadradoSelect = u_cuadradoOpera(context, cuadradoSelect, array, mouse);
						if (cuadradoSelect){
							sw = true;
							await paint();
							u_cuadradoBordeSegmentado(context, cuadradoSelect);
							mouse.click = true;
							elmSelectMove = cuadradoSelect;
						}
						break;
					case 'circle':
						circuloSelect = u_circuloOpera(context, circuloSelect, array, mouse);
						if (circuloSelect){
							sw = true;
							await paint();
							u_circuloBordeSegmentado(context, circuloSelect);
							mouse.click = true;
							elmSelectMove = circuloSelect;
						}
						break;
					case 'triangle':
						trianguloSelect = u_trianguloOpera(context, trianguloSelect, array, mouse);
						if (trianguloSelect){
							sw = true;
							await paint();
							u_trianguloBordeSegmentado(context, trianguloSelect);
							mouse.click = true;
							elmSelectMove = trianguloSelect;
						}
						break;
					case 'image':
						imagenSelect = u_imagenOpera(imagenSelect, array, mouse);
						if (imagenSelect){
							sw = true;
							await paint();
							u_imagenBordeSegmentado(context, imagenSelect);
							mouse.click = true;
							elmSelectMove = imagenSelect;
						}
						break;
					case 'plano':
						planoSelect = u_planoOpera(context, planoSelect, array, mouse);
						if (planoSelect){
							sw = true;
							await paint();
							u_planoBordeSegmentado(context, planoSelect);
							mouse.click = true;
							elmSelectMove = planoSelect;
						}
						break;
					case 'pencil':
						lapizSelect = u_lapizOpera(lapizSelect, array, mouse);
						if (lapizSelect){
							sw = true;
							await paint();
							u_lapizBordeSegmentado(context, lapizSelect);
							mouse.click = true;
							elmSelectMove = lapizSelect;
						}
						break;
					case 'line':
						lineaSelect = u_lineaOpera(lineaSelect, array, mouse);
						if (lineaSelect){
							sw = true;
							await paint();
							u_lineaBordeSegmentado(context, lineaSelect);
							mouse.click = true;
							elmSelectMove = lineaSelect;
						}
						break;
					case 'text':
						textSelect = u_textOpera(textSelect, array, mouse);
						if (textSelect){
							sw = true;
							await paint();
							u_textBordeSegmentado(context, textSelect);
							mouse.click = true;
							elmSelectMove = textSelect;
						}
						break;
					case 'geometric':
						geometricSelect = u_geometricOpera(geometricSelect, array, mouse);
						if (geometricSelect){
							sw = true;
							await paint();
							u_geometricDrawBorderSegment(context, geometricSelect);
							mouse.click = true;
							elmSelectMove = geometricSelect;
						}
						break;
					default:
						console.log('no se encontro el type:', elm.types);
				}
				if(sw) {
					mouse.elementSelect = elm.types;
					mover.selectElm = true;
					break; // cierra el for
				}
			}
		}
		!sw ? console.log('no elem select!!!!'): '';

		if (mouse.elementSelect !== '' && !sw) {
			paint();
			mouse.elementSelect = '';
		}
		setSelectElmObj(mover.selectElm, elmSelectMove);
	};

	// 2:
	const mouseMoveMover = async (e) => {
		if (mouse.click){
			captura_Pos_Posprev(e);
			switch (mouse.elementSelect){
				case 'text':
					//if (mouse.text_mover) {
					if (textSelect.edit){
						textSelect = u_textMover(textSelect, mouse);
						await paint()
						u_textBordeSegmentado(context, textSelect);
					}
					//}
					break;
				case 'square':
					//if (mouse.cuadrado_mover || mouse.cuadrado_mover_pts) {
					if (cuadradoSelect.edit) {
						mouse.cuadrado_mover
							? cuadradoSelect = u_cuadradoMover(cuadradoSelect, mouse)
							: mouse.cuadrado_mover_pts ? cuadradoSelect = u_cuadradoUpdateZise(cuadradoSelect, mouse):'';
						await paint();
						u_cuadradoBordeSegmentado(context, cuadradoSelect);
					}
					//}
					break;
				case 'pencil':
					//if (mouse.lapiz_mover) {
					if (lapizSelect.edit) {
						lapizSelect = u_lapizMover(lapizSelect, mouse);
						await paint();
						u_lapizBordeSegmentado(context, lapizSelect);
					}
					//}
					break;
				case 'plano':
					//if (mouse.plano_mover || mouse.plano_mover_pts) {
					if (planoSelect.edit) {
						mouse.plano_mover
							? planoSelect = u_planoMover(planoSelect, mouse)
							: mouse.plano_mover_pts ? planoSelect = u_planoUpdateZise(planoSelect, mouse) : '';
						await paint();
						u_planoBordeSegmentado(context, planoSelect);
					}
					//}
					break;
				case 'circle':
					if (circuloSelect.edit) {
						mouse.circulo_mover
							? circuloSelect = u_circuloMover(circuloSelect, mouse)
							: mouse.circulo_mover_pts ? circuloSelect = u_circuloUpdateZise(circuloSelect, mouse) : '';
						await paint();
						u_circuloBordeSegmentado(context, circuloSelect);
					}
					break;
				case 'triangle':
					//if (mouse.triangulo_mover || mouse.triangulo_mover_pts) {
					if (trianguloSelect.edit) {
						mouse.triangulo_mover
							? trianguloSelect = u_trianguloMover(trianguloSelect, mouse)
							: mouse.triangulo_mover_pts ? trianguloSelect = u_trianguloUpdateZise(trianguloSelect, mouse) : '';
						await paint();
						u_trianguloBordeSegmentado(context, trianguloSelect);
					}
					//}
					break;
				case 'image':
					if (imagenSelect.edit) {
						mouse.imagen_mover
							? imagenSelect = u_imagenMover(imagenSelect, mouse)
							: mouse.imagen_mover_pts ? imagenSelect = u_imagenUpdateZise(imagenSelect, mouse) : '';
						await paint();
						u_imagenBordeSegmentado(context, imagenSelect);
					}
					break;
				case 'line':
					//if (mouse.linea_mover || mouse.linea_mover_pts) {
					if (lineaSelect.edit) {
						mouse.linea_mover
							? lineaSelect = u_lineaMover(lineaSelect, mouse)
							: mouse.linea_mover_pts ? lineaSelect = u_lineaUpdateZise(lineaSelect, mouse):'';
						await paint();
						u_lineaBordeSegmentado(context, lineaSelect);
					}
					//}
					break;
				case 'geometric':
					if (geometricSelect.edit) {
						mouse.geometric_mover
							? geometricSelect = u_geometricMove(geometricSelect, mouse)
							: mouse.geometric_mover_pts ? geometricSelect = u_geometricResize(geometricSelect, mouse) : '';
						await paint();
						u_geometricDrawBorderSegment(context, geometricSelect);
					}
					break;
				default:
					break;
			}
		}
	}
	// 3:
	const mouseUpMover = async (e) => {
		mouse.cuadrado_mover_pts ? cuadradoSelect = u_cuadradoValidaPosicion(cuadradoSelect): '';
		mouse.circulo_mover_pts ? circuloSelect = u_circuloValidaPosicion(circuloSelect): '';

		mouse.click = false;
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
		// IMAGEN:
		mouse.imagen_mover = false;
		if (mouse.imagen_mover_pts && imagenSelect.edit){
			imagenSelect.dataUse = false;
			await paint();
			u_imagenBordeSegmentado(context, imagenSelect);
		}
		mouse.imagen_mover_pts = false;
		mouse.imagen_pto = '';
		// GEOMETRIC:
		mouse.geometric_mover = false;
		mouse.geometric_mover_pts = false;
		mouse.geometric_pto = '';
	};
	const update_canvasMoverDatos = () => {
		canvasMoverDatos.top = canvas.getBoundingClientRect().top;
		canvasMoverDatos.left = canvas.getBoundingClientRect().left;
		canvasMoverDatos.width = canvas.getBoundingClientRect().width;
		canvasMoverDatos.height = canvas.getBoundingClientRect().height;
	};
	const eventDraw = () => {
		if (stateMover.selectElm){
			setSelectElmObj(false, {});
		}
		canvas = document.getElementById(id_canvas);
		context = canvas.getContext('2d');
		update_canvasMoverDatos();
		if (state.historia.length > 0) paint();
	}

	// useEffect:
	useEffect( () => {
		if (stateMover.active) {
			eventDraw();
			canvas.addEventListener('mousedown', mouseDownMover);
			canvas.addEventListener('mousemove', mouseMoveMover);
			canvas.addEventListener('mouseup', mouseUpMover);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownMover);
				canvas.removeEventListener('mousemove', mouseMoveMover);
				canvas.removeEventListener('mouseup', mouseUpMover);
			};
		}
	}, [stateMover.active, stateMover.canvas, state.historia]);

	useEffect(() => {
		h_moveSetCanvas(state.canvas);
		if (stateMover.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintMover;
