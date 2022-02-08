// LINEA:
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "./UtilsCirculo";

// DISTANCIA ENTRE 2 PUNTOS
const distancia_p1_p2 = (x1, y1, x2, y2) => {
	let dp = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	return dp;
};
// LINEA: GET
const u_lineaGet = (array, x, y) => {
	let resp = '';
	array.forEach((elem) => {
		if (elem.visible) {
			let x1 = elem.x_ini;
			let y1 = elem.y_ini;
			let x2 = elem.x_fin;
			let y2 = elem.y_fin;
			// parte 1:
			let a = y1 - y2;
			let b = x2 - x1;
			let c = y1 * (x1 - x2) - x1 * (y1 - y2);
			let dnum = a * x + b * y + c;
			dnum < 0 ? (dnum = dnum * -1) : '';
			let dden = Math.sqrt(a * a + b * b);
			let d = dnum / dden;
			// parte 2:
			let px = x1 + (x2 - x1) / 2;
			let py = y1 + (y2 - y1) / 2;
			let dis_valido = distancia_p1_p2(px, py, x2, y2);
			let dis = distancia_p1_p2(px, py, x, y);
			// sol:
			if (d < 20 && dis < dis_valido) resp = elem;
		}
	});
	return resp;
};

// LINEA: DELETE POR ID
const u_lineaDeleteById = (array, linea_id) => {
	array.forEach((element) => {
		element.id == linea_id ? (element.visible = false) : '';
	});
	return array;
};
// LINEA: GRAFICA
const u_lineaGrafica = (context, linea) => {
	if (linea.visible) {
		context.lineWidth = linea.grosor;
		context.strokeStyle = linea.color;
		context.setLineDash([0, 0]);

		context.beginPath();
		context.moveTo(linea.x_ini, linea.y_ini);
		context.lineTo(linea.x_fin, linea.y_fin);
		context.stroke();
		context.closePath();
	}
};
// LINEA: GRAFICA HISOTORIA
const u_lineaGraficaH = (context, array) => {
	array.forEach((element) => {
		u_lineaGrafica(context, element);
	});
};
// CUADRADOS PARA UPDATE LINEA:
const u_lineaGetPtsRedimencion = (linea) => {
	let width_p = 10;

	let x_ini = linea.x_ini;
	let y_ini = linea.y_ini;
	let x_fin = linea.x_fin;
	let y_fin = linea.y_fin;

	let vectorPuntosLinea = [
		{
			x1: x_ini - width_p,
			y1: y_ini - width_p,
			x2: x_ini + width_p,
			y2: y_ini + width_p,
		},
		{
			x1: x_fin - width_p,
			y1: y_fin - width_p,
			x2: x_fin + width_p,
			y2: y_fin + width_p,
		},
	];
	return vectorPuntosLinea;
};
// LINEA: MOVER
const u_lineaMover = (linea, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	linea.x_ini = linea.x_ini + recorrido_x;
	linea.y_ini = linea.y_ini + recorrido_y;
	linea.x_fin = linea.x_fin + recorrido_x;
	linea.y_fin = linea.y_fin + recorrido_y;
	return linea;
};
// LINEA: UPDATE ZISE
const u_lineaUpdateZise = (linea, mouse) => {
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	switch (mouse.linea_pto) {
		case 'ini':
			linea.x_ini = linea.x_ini + recorrido_x;
			linea.y_ini = linea.y_ini + recorrido_y;
			break;
		case 'fin':
			linea.x_fin = linea.x_fin + recorrido_x;
			linea.y_fin = linea.y_fin + recorrido_y;
			break;
		default:
			console.log('ocurrio un error');
			break;
	}
	return linea;
};
// LINEA: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR LA LINEA
const u_lineaBuscaPtoClickParaRedimencionar= (x, y, lineaSelect) => {
	let array = u_lineaGetPtsRedimencion(lineaSelect);
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
// LINEA: GET
const u_lineaGetClick = (array, x, y) => {
	let resp = '';
	array.forEach((elem) => {
		if (elem.visible) {
			let x1 = elem.x_ini;
			let y1 = elem.y_ini;
			let x2 = elem.x_fin;
			let y2 = elem.y_fin;
			// parte 1:
			let a = y1 - y2;
			let b = x2 - x1;
			let c = y1 * (x1 - x2) - x1 * (y1 - y2);
			let dnum = a * x + b * y + c;
			dnum < 0 ? (dnum = dnum * -1) : '';
			let dden = Math.sqrt(a * a + b * b);
			let d = dnum / dden;
			// parte 2:
			let px = x1 + (x2 - x1) / 2;
			let py = y1 + (y2 - y1) / 2;
			let dis_valido = distancia_p1_p2(px, py, x2, y2);
			let dis = distancia_p1_p2(px, py, x, y);
			// sol:
			if (d < 20 && dis < dis_valido) resp = elem;
		}
	});
	return resp;
};
// LINEA: SI SE HIZO CLICK SOBRE UNA LINEA, PODREMOS EDITAR ZISE U MOVER
const u_lineaClickSobreLinea = (lineaSelect, mouse) => {
	if (lineaSelect) {
		mouse.linea_mover = true;
		mouse.linea_mover_pts = false;
		mouse.linea_seleccionar_pts = true;
	} else{
		mouse.linea_mover = false;
		mouse.linea_mover_pts = false;
		mouse.linea_seleccionar_pts =false;
	}
}
// LINEA: BUSCA LINEA PARA PODER MOVERLO O EDITAR SU TAMANO
const u_lineaOpera = (lineaSelect, array, mouse) => {
	if (mouse.linea_seleccionar_pts){
		mouse.linea_pto = u_lineaBuscaPtoClickParaRedimencionar(
			mouse.pos.x, mouse.pos.y, lineaSelect
		);
		if(mouse.linea_pto != '') {
			mouse.linea_mover = false;
			mouse.linea_mover_pts = true;
		} else {
			mouse.linea_mover = false;
			mouse.linea_mover_pts = false; // move_size
			mouse.linea_seleccionar_pts = false;
		}
	}
	if (!mouse.linea_seleccionar_pts){
		lineaSelect = u_lineaGetClick(array, mouse.pos.x, mouse.pos.y);
		u_lineaClickSobreLinea(lineaSelect, mouse);
	}
	return lineaSelect;
}
// LINEA SEGMENTADO:
const u_lineaBordeSegmentado = (context, linea) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas
	let x_ini = linea.x_ini;
	let y_ini = linea.y_ini;
	let x_fin = linea.x_fin;
	let y_fin = linea.y_fin;
	let inc = 20;
	// ANGULO DE INCLINACION:
	let x1 = linea.x_ini;
	let y1 = linea.y_ini;
	let x2 = linea.x_fin;
	let y2 = linea.y_fin;
	let m = (y2 - y1) / (x2 - x1);
	let alfa = Math.atan(m);

	context.beginPath();
	if ((0.5 < alfa && alfa < 2) || (-2 < alfa && alfa < -0.5)) {
		context.moveTo(x_ini - inc, y_ini);
		context.lineTo(x_ini + inc, y_ini);
		context.lineTo(x_fin + inc, y_fin);
		context.lineTo(x_fin - inc, y_fin);
		context.lineTo(x_ini - inc, y_ini);
	} else {
		context.moveTo(x_ini, y_ini - inc);
		context.lineTo(x_fin, y_fin - inc);
		context.lineTo(x_fin, y_fin + inc);
		context.lineTo(x_ini, y_ini + inc);
		context.lineTo(x_ini, y_ini) - inc;
	}
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([10, 4]); // lineas segmentadas

	let array = u_lineaGetPtsRedimencion(linea);
	array.forEach((elem) => {
		context.beginPath();
		context.moveTo(elem.x1, elem.y1); // (x_ini, y_ini)
		context.lineTo(elem.x2, elem.y1); // (x_fin, y_ini)
		context.lineTo(elem.x2, elem.y2); // (x_fin, y_fin)
		context.lineTo(elem.x1, elem.y2); // (x_ini, y_fin)
		context.lineTo(elem.x1, elem.y1); // (x_ini, y_ini)
		context.fill();
		context.closePath();
	});
};
export {
	u_lineaDeleteById,
	u_lineaGraficaH,
	u_lineaGet,
	u_lineaGrafica,
	u_lineaGetPtsRedimencion,
	u_lineaMover,
	u_lineaUpdateZise,
	u_lineaOpera,
	u_lineaBordeSegmentado
};
