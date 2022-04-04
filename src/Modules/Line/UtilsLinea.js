// LINEA:
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "../Circle/UtilsCirculo";

// DISTANCIA ENTRE 2 PUNTOS
const distancia_p1_p2 = (x1, y1, x2, y2) => {
	let dp = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	return dp;
};
// RECTA Y CIRCUNFERENCIA:
const u_lineaVector = (vector) => {
	let p1x = vector.x_ini;
	let p1y = vector.y_ini;
	let p2x = vector.x_fin;
	let p2y = vector.y_fin;
	let h = vector.x_fin;
	let k = vector.y_fin;
	let r = 10;
	// recta:
	let a = p2y - p1y;
	let b = p1x - p2x;
	let c = (p2x * p1y) - (p1x * p2y);
	let x1 = 0;
	let x2 = 0;
	let y1 = 0;
	let y2 = 0;
	if (a !== 0 && b !== 0) {
		// circunferencia:
		let d = - 2 * h;
		let e = - 2 * k;
		let f = (h * h) + (k * k) - (r * r);
		// sistema de ecuaciones:
		let a_ = (a * a) + (b * b);
		let b_ = (2 * b * c) - (a * b * d) + (a * a * e);
		let c_ = (c * c) - (a * c * d) + (a * a * f);
		let discriminante = (b_ * b_) - (4 * a_ * c_);

		y1 = (- b_ + Math.sqrt(discriminante)) / (2 * a_);
		y2 = (- b_ - Math.sqrt(discriminante)) / (2 * a_);
		x1 = ((-b * y1) - c) / a;
		x2 = ((-b * y2) - c) / a;
	} else {
		if (a === 0) {
			y1 = p1y;
			y2 = p1y;
			x1 = p2x - 10;
			x2 = p2x + 10;
		} else {
			if (b === 0) {
				y1 = p2y - 10;
				y2 = p2y + 10;
				x1 = p1x;
				x2 = p1x;
			}
		}
	}
	let pto = {
		x:0,
		y:0,
	}
	// p1 * ------------------- * p2
	if (b === 0) {
		if ( p1y < p2y) {
			if (p1y < y1 && y1 < p2y) {
				pto.x = x1;
				pto.y = y1;
			} else {
				pto.x = x2;
				pto.y = y2;
			}
		} else {
			if (p2y < y1 && y1 < p1y) {
				pto.x = x1;
				pto.y = y1;
			} else {
				pto.x = x2;
				pto.y = y2;
			}
		}
	} else {
		if (p1x < p2x) {
			if (p1x < x1 && x1 < p2x) {
				pto.x = x1;
				pto.y = y1;
			} else {
				pto.x = x2;
				pto.y = y2;
			}
		} else {
			if (p2x < x1 && x1 < p1x) {
				pto.x = x1;
				pto.y = y1;
			} else {
				pto.x = x2;
				pto.y = y2;
			}
		}
	}

	// recta perpendicular al pto:
	let a2 = b;
	let b2 = -a;
	let c2 = (a * pto.y) - (b * pto.x);
	// circunferencia:
	r = r - 5;
	h = pto.x;
	k = pto.y;
	let d = - 2 * h;
	let e = - 2 * k;
	let f = (h * h) + (k * k) - (r * r);
	// sistema de ecuaciones:
	let a_ = (a2 * a2) + (b2 * b2);
	let b_ = (2 * b2 * c2) - (a2 * b2 * d) + (a2 * a2 * e);
	let c_ = (c2 * c2) - (a2 * c2 * d) + (a2 * a2 * f);
	let discriminante = (b_ * b_) - (4 * a_ * c_);
	y1 = (- b_ + Math.sqrt(discriminante)) / (2 * a_);
	y2 = (- b_ - Math.sqrt(discriminante)) / (2 * a_);
	if (discriminante !== 0) {
		x1 = ((-b2 * y1) - c2) / a2;
		x2 = ((-b2 * y2) - c2) / a2;
	} else {
		x1 = p1x - r;
		x2 = p1x + r;
	}

	let ptos = {
		x1:x1,
		y1:y1,
		x2:x2,
		y2:y2
	}

	vector.vtr_pto_x1 = ptos.x1;
	vector.vtr_pto_y1 = ptos.y1;
	vector.vtr_pto_x2 = ptos.x2;
	vector.vtr_pto_y2 = ptos.y2;
}
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
const u_lineaDeleteById = (array, id) => {
	/*array.forEach((element) => {
		element.id == linea_id ? (element.visible = false) : '';
	});
	return array;*/
	let newArray = [];
	for(let elm of array)
		elm.id !== id ? newArray.push(elm):'';
	return newArray;
};
const u_drawLinea = (context, line) => {
	context.lineWidth = line.grosor;
	context.strokeStyle = line.color;
	line.segment
		? context.setLineDash([10, 5])
		: context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(line.x_ini, line.y_ini);
	context.lineTo(line.x_fin, line.y_fin);
	context.stroke();
	context.closePath();
}
const u_drawCuadraticExtra = (context, cuadratic) => {
	let ptoMedio = {
		xm1: cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini)/2,
		ym1: cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini)/2,
		xm2: cuadratic.x_1,
		ym2: cuadratic.y_1,
	}
	ptoMedio.xm2 = ptoMedio.xm1 + (ptoMedio.xm2 - ptoMedio.xm1) / 2;
	ptoMedio.ym2 = ptoMedio.ym1 + (ptoMedio.ym2 - ptoMedio.ym1) / 2;

	context.lineWidth = 1;
	context.strokeStyle = "red"
	context.beginPath();
	context.moveTo(cuadratic.x_ini,cuadratic.y_ini);
	context.lineTo(cuadratic.x_1,cuadratic.y_1);
	context.lineTo(cuadratic.x_fin,cuadratic.y_fin);
	context.stroke();
	context.closePath();

	context.lineWidth = 1;
	context.strokeStyle = "green"
	context.beginPath();
	context.moveTo(ptoMedio.xm1,ptoMedio.ym1);
	context.lineTo(ptoMedio.xm2, ptoMedio.ym2);
	context.stroke();
	context.closePath();
}
const u_drawCuadratic = (context, cuadratic) => {
	context.lineWidth = cuadratic.grosor;
	context.strokeStyle = cuadratic.color;
	cuadratic.segment
		? context.setLineDash([10, 5])
		: context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(cuadratic.x_ini, cuadratic.y_ini);
	context.quadraticCurveTo(cuadratic.x_1, cuadratic.y_1, cuadratic.x_fin, cuadratic.y_fin);
	context.stroke();
	context.closePath();

	/*context.lineWidth = 1;
	context.strokeStyle = "green"
	context.beginPath();
	context.moveTo(cuadratic.cdc_pto_x1, cuadratic.cdc_pto_y1);
	context.lineTo(cuadratic.cdc_pto_x2, cuadratic.cdc_pto_y2);
	context.stroke();
	context.closePath();*/

	//u_drawCuadraticExtra(context, cuadratic);
}
const u_drawBezierExtra = (context, bezier) => {
	context.lineWidth = 1;
	context.strokeStyle = "red"
	context.beginPath();
	context.moveTo(bezier.x_ini,bezier.y_ini);
	context.lineTo(bezier.x_1,bezier.y_1);
	context.lineTo(bezier.x_2,bezier.y_2);
	context.lineTo(bezier.x_fin,bezier.y_fin);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.moveTo(bezier.x_ini,bezier.y_ini);
	context.lineTo(bezier.x_fin,bezier.y_fin);
	context.stroke();
	context.closePath();
}
const u_drawBezier = (context, bezier) => {
	context.lineWidth = bezier.grosor;
	context.strokeStyle = bezier.color;
	bezier.segment
		? context.setLineDash([10, 5])
		: context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(bezier.x_ini,bezier.y_ini);
	context.bezierCurveTo(bezier.x_1,bezier.y_1, bezier.x_2, bezier.y_2, bezier.x_fin, bezier.y_fin);
	context.stroke();
	context.closePath();

	u_drawBezierExtra(context, bezier);
}
const u_drawVector = (context, vector) => {
	context.lineWidth = vector.grosor;
	context.strokeStyle = vector.color;
	vector.segment
		? context.setLineDash([10, 5])
		: context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(vector.x_ini, vector.y_ini);
	context.lineTo(vector.x_fin, vector.y_fin);
	context.stroke();
	context.closePath();

	context.setLineDash([0, 0]);
	context.fillStyle = vector.color;
	context.beginPath();
	context.moveTo(vector.x_fin, vector.y_fin);
	context.lineTo(vector.vtr_pto_x1, vector.vtr_pto_y1);
	context.lineTo(vector.vtr_pto_x2, vector.vtr_pto_y2);
	context.lineTo(vector.x_fin, vector.y_fin);
	context.fill();
	context.stroke();
	context.closePath();
}
// LINEA: GRAFICA
const u_lineaGrafica = (context, line) => {
	if (line.visible) {
		switch (line.type){
			case 'line':
				u_drawLinea(context, line);
				break;
			case 'cuadratic':
				u_drawCuadratic(context, line);
				break;
			case 'bezier':
				u_drawBezier(context, line);
				break;
			case 'vector':
				u_drawVector(context, line);
				break;
			default:
				break;
		}
	}
};
const u_lineDraw = (context, line) => {
	if (line.visible) {
		switch (line.type){
			case 'line':
				u_drawLinea(context, line);
				break;
			case 'cuadratic':
				u_drawCuadratic(context, line);
				break;
			case 'bezier':
				u_drawBezier(context, line);
				break;
			case 'vector':
				u_drawVector(context, line);
				break;
			default:
				break;
		}
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
	let vectorPuntosLinea = [];
	vectorPuntosLinea = [
		{
			x1: linea.x_ini - width_p,
			y1: linea.y_ini - width_p,
			x2: linea.x_ini + width_p,
			y2: linea.y_ini + width_p,
		},
		{
			x1: linea.x_fin - width_p,
			y1: linea.y_fin - width_p,
			x2: linea.x_fin + width_p,
			y2: linea.y_fin + width_p,
		},
	];
	switch (linea.type){
		case 'line':
			break;
		case 'vector':
			break;
		case 'bezier':
			break;
		case 'cuadratic':
			let aux = {
				x1: linea.cdc_pto_x2 - width_p,
				y1: linea.cdc_pto_y2 - width_p,
				x2: linea.cdc_pto_x2 + width_p,
				y2: linea.cdc_pto_y2 + width_p,
			}
			vectorPuntosLinea.push(aux);
			break;
		default:
			break;
	}
	return vectorPuntosLinea;
};
// LINEA: MOVER
const u_lineaMover = (linea, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	switch (linea.type) {
		case 'line':
			linea.x_ini = linea.x_ini + recorrido_x;
			linea.y_ini = linea.y_ini + recorrido_y;
			linea.x_fin = linea.x_fin + recorrido_x;
			linea.y_fin = linea.y_fin + recorrido_y;
			break;
		case 'vector':
			linea.x_ini = linea.x_ini + recorrido_x;
			linea.y_ini = linea.y_ini + recorrido_y;
			linea.x_fin = linea.x_fin + recorrido_x;
			linea.y_fin = linea.y_fin + recorrido_y;
			linea.vtr_pto_x1 = linea.vtr_pto_x1 + recorrido_x;
			linea.vtr_pto_x2 = linea.vtr_pto_x2 + recorrido_x;
			linea.vtr_pto_y1 = linea.vtr_pto_y1 + recorrido_y;
			linea.vtr_pto_y2 = linea.vtr_pto_y2 + recorrido_y;
			break;
		case 'bezier':
			break;
		case 'cuadratic':
			linea.x_ini = linea.x_ini + recorrido_x;
			linea.y_ini = linea.y_ini + recorrido_y;

			linea.x_fin = linea.x_fin + recorrido_x;
			linea.y_fin = linea.y_fin + recorrido_y;

			linea.x_1 = linea.x_1 + recorrido_x;
			linea.y_1 = linea.y_1 + recorrido_y;

			linea.cdc_xmin = linea.cdc_xmin + recorrido_x;
			linea.cdc_ymin = linea.cdc_ymin + recorrido_y;

			linea.cdc_xmax = linea.cdc_xmax + recorrido_x;
			linea.cdc_ymax = linea.cdc_ymax + recorrido_y;

			linea.cdc_pto_x1 = linea.cdc_pto_x1 + recorrido_x;
			linea.cdc_pto_y1 = linea.cdc_pto_y1 + recorrido_y;

			linea.cdc_pto_x2 = linea.cdc_pto_x2 + recorrido_x;
			linea.cdc_pto_y2 = linea.cdc_pto_y2 + recorrido_y;
			break;
		default:
			console.log('error: u_lineaGetClick()');
			break;
	}
	return linea;
};
// LINEA: UPDATE ZIZE LINE:
const updateZiseLine = (linea, recorrido_x, recorrido_y, linea_pto) => {
	switch (linea_pto) {
		case 'ini':
			linea.x_ini = linea.x_ini + recorrido_x;
			linea.y_ini = linea.y_ini + recorrido_y;
			break;
		case 'fin':
			linea.x_fin = linea.x_fin + recorrido_x;
			linea.y_fin = linea.y_fin + recorrido_y;
			break;
		default:
			console.log('ocurrio un error updateZiseLine');
			break;
	}
	return linea;
}
// LINEA: UPDATE ZIZE VECTOR:
const updateZiseVector = (vector, recorrido_x, recorrido_y, linea_pto) => {
	switch (linea_pto) {
		case 'ini':
			vector.x_ini = vector.x_ini + recorrido_x;
			vector.y_ini = vector.y_ini + recorrido_y;
			break;
		case 'fin':
			vector.x_fin = vector.x_fin + recorrido_x;
			vector.y_fin = vector.y_fin + recorrido_y;
			break;
		default:
			console.log('ocurrio un error updateZiseVector');
			break;
	}
	u_lineaVector(vector)
	return vector;
}
// LINEA: UPDATE ZIZE CUADRATIC:
const updateZiseCuadratic = (cuadratic, recorrido_x, recorrido_y, linea_pto) => {
	let sw = false;
	switch (linea_pto) {
		case 'ini':
			cuadratic.x_ini = cuadratic.x_ini + recorrido_x;
			cuadratic.y_ini = cuadratic.y_ini + recorrido_y;
			sw = true;
			break;
		case 'fin':
			cuadratic.x_fin = cuadratic.x_fin + recorrido_x;
			cuadratic.y_fin = cuadratic.y_fin + recorrido_y;
			sw = true;
			break;
		case 'mid':
			cuadratic.x_1 = cuadratic.x_1 + recorrido_x + recorrido_x;
			cuadratic.y_1 = cuadratic.y_1 + recorrido_y + recorrido_y;
			sw = true;
			break;
		default:
			console.log('ocurrio un error');
			break;
	}
	if (sw) {
		cuadratic.cdc_pto_x1 = cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini)/2;
		cuadratic.cdc_pto_y1 = cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini)/2;

		cuadratic.cdc_pto_x2 = cuadratic.cdc_pto_x1 + (cuadratic.x_1 - cuadratic.cdc_pto_x1)/2;
		cuadratic.cdc_pto_y2 = cuadratic.cdc_pto_y1 + (cuadratic.y_1 - cuadratic.cdc_pto_y1)/2;

		cuadratic.cdc_xmin = Math.min(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymin = Math.min(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);

		cuadratic.cdc_xmax = Math.max(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymax = Math.max(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);
	}
	return cuadratic;
}
// LINEA: UPDATE ZISE
const u_lineaUpdateZise = (line, mouse) => {
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	switch (line.type){
		case 'line':
			line = updateZiseLine(line, recorrido_x, recorrido_y, mouse.linea_pto);
			break;
		case 'vector':
			line = updateZiseVector(line, recorrido_x, recorrido_y, mouse.linea_pto);
			break;
		case 'cuadratic':
			line = updateZiseCuadratic(line, recorrido_x, recorrido_y, mouse.linea_pto);
			break;
		case 'bezier':
			break;
		default:
			break;
	}
	return line;
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
	if (resp === '') {
		switch (lineaSelect.type) {
			case 'line':
				break;
			case 'cuadratic':
				if (array[2].x1 < x && x < array[2].x2 && array[2].y1 < y && y < array[2].y2)
					resp = 'mid';
				break;
			case 'bezier':
				break;
			default:
				break;
		}
	}
	return resp;
};
const searchLine = (line, x, y) => {
	let resp = '';
	let x1 = line.x_ini;
	let y1 = line.y_ini;
	let x2 = line.x_fin;
	let y2 = line.y_fin;
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
	if (d < 20 && dis < dis_valido) resp = line;
	return resp;
}
const searchVector = (vector, x, y) => {
	let resp = '';
	let x1 = vector.x_ini;
	let y1 = vector.y_ini;
	let x2 = vector.x_fin;
	let y2 = vector.y_fin;
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
	if (d < 20 && dis < dis_valido) resp = vector;
	return resp;
}
const searchCuadratic = (cuadratic, x, y) => {
	let resp = '';
	if (cuadratic.cdc_xmin < x && x < cuadratic.cdc_xmax && cuadratic.cdc_ymin < y && y < cuadratic.cdc_ymax)
		resp = cuadratic;
	return resp;
}
// LINEA: BUSCA LINEA AL HACER CLICK IN CANVAS
const u_lineaGetClick = (array, x, y) => {
	let resp = '';
	let sw = true;
	for(let i = 0; (i < array.length) && sw ; i++) {
		let line = array[i];
		if (line.visible) {
			switch (line.type) {
				case 'line':
					resp = searchLine(line, x, y);
					break;
				case 'bezier':
					break;
				case 'cuadratic':
					resp = searchCuadratic(line, x, y);
					break;
				case 'vector':
					resp = searchVector(line, x, y);
					break;
				default:
					console.log('error: u_lineaGetClick()');
					break;
			}
		}
		if(resp != '') sw = false;
	}
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
		mouse.linea_pto = u_lineaBuscaPtoClickParaRedimencionar(mouse.pos.x, mouse.pos.y, lineaSelect);
		if(mouse.linea_pto !== '') {
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
// LINEA: BORDE LINEA
const bordeSegmentadoLine = (context, linea) => {
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
		context.lineTo(x_ini, y_ini - inc);
	}
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([0, 0]); // lineas segmentadas

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
}
// LINEA: BORDE LINEA
const bordeSegmentadoVector = (context, vector) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas
	let x_ini = vector.x_ini;
	let y_ini = vector.y_ini;
	let x_fin = vector.x_fin;
	let y_fin = vector.y_fin;
	let inc = 20;
	// ANGULO DE INCLINACION:
	let x1 = vector.x_ini;
	let y1 = vector.y_ini;
	let x2 = vector.x_fin;
	let y2 = vector.y_fin;
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
		context.lineTo(x_ini, y_ini - inc);
	}
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([0, 0]); // lineas segmentadas

	let array = u_lineaGetPtsRedimencion(vector);
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
}
// CUADRATIC: BORDE SEGMENTADO
const bordeSegmentadoCuadratic = (context, cuadratic) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	context.beginPath();
	context.moveTo(cuadratic.cdc_xmin, cuadratic.cdc_ymin);
	context.lineTo(cuadratic.cdc_xmax, cuadratic.cdc_ymin);
	context.lineTo(cuadratic.cdc_xmax, cuadratic.cdc_ymax);
	context.lineTo(cuadratic.cdc_xmin, cuadratic.cdc_ymax);
	context.lineTo(cuadratic.cdc_xmin, cuadratic.cdc_ymin);
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color

	context.beginPath();
	context.fillRect(cuadratic.x_ini-10, cuadratic.y_ini-10, 20, 20);
	context.fillRect(cuadratic.x_fin-10, cuadratic.y_fin-10, 20, 20);
	context.fillRect(cuadratic.cdc_pto_x2-10, cuadratic.cdc_pto_y2-10, 20, 20);
	context.fill();
	context.closePath();
}
// LINEA SEGMENTADO:
const u_lineaBordeSegmentado = (context, line) => {
	switch (line.type) {
		case 'line':
			bordeSegmentadoLine(context, line);
			break;
		case 'bezier':
			break;
		case 'cuadratic':
			bordeSegmentadoCuadratic(context, line);
			break;
		case 'vector':
			bordeSegmentadoVector(context, line);
			break;
		default:
			console.log('error: u_lineaGetClick()');
			break;
	}
};
// LINEA: BUSCA LINEA AL HACER CLICK IN CANVAS
const u_lineaGetId = (array, x, y) => {
	let resp = '';
	let id = -1;
	let sw = true;
	for(let i = array.length - 1; (i >= 0) && sw ; i--) {
		let line = array[i];
		if (line.visible && line.edit) {
			switch (line.type) {
				case 'line':
					resp = searchLine(line, x, y);
					break;
				case 'bezier':
					break;
				case 'cuadratic':
					resp = searchCuadratic(line, x, y);
					break;
				case 'vector':
					resp = searchVector(line, x, y);
					break;
				default:
					console.log('error: u_lineaGetClick()');
					break;
			}
		}
		if(resp !== '') {
			sw = false;
			id = resp.id;
		}
	}
	return id;
};
const u_lineClickTrue = (line, x, y) => {
	let resp = '';
	switch (line.type) {
		case 'line':
			resp = searchLine(line, x, y);
			break;
		case 'bezier':
			break;
		case 'cuadratic':
			resp = searchCuadratic(line, x, y);
			break;
		case 'vector':
			resp = searchVector(line, x, y);
			break;
		default:
			console.log('error: u_lineaGetClick()');
			break;
	}
	return resp !== '';
};
export {
	u_lineaDeleteById,
	u_lineaGetId,
	u_lineaGraficaH,
	u_lineaGet,
	u_lineaGrafica,
	u_lineaGetPtsRedimencion,
	u_lineaMover,
	u_lineaUpdateZise,
	u_lineaOpera,
	u_lineaBordeSegmentado,
	u_lineaVector,
	u_lineDraw,
	u_lineClickTrue
};
