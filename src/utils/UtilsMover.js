// SELECT CUADRADO DE HISTORIA:
const u_getCuadrado = (array, x, y) => {
	let resp = '';
	array.forEach((elem) => {
		if (elem.visible) {
			elem.x_ini < x && x < elem.x_fin && elem.y_ini < y && y < elem.y_fin
				? (resp = elem)
				: '';
		}
	});
	return resp;
};
// MUEVE CUADRADO SELECT:
const u_moverCuadrado = (cuadrado, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	cuadrado.x_ini = cuadrado.x_ini + recorrido_x;
	cuadrado.y_ini = cuadrado.y_ini + recorrido_y;
	cuadrado.x_fin = cuadrado.x_fin + recorrido_x;
	cuadrado.y_fin = cuadrado.y_fin + recorrido_y;
	return cuadrado;
};
// UPDATE ZISE CUADRADO SELECT:
const u_updateZiseCuadrado = (cuadrado, mouse) => {
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	switch (mouse.cuadrado_pto) {
		case 'top':
			cuadrado.y_ini = cuadrado.y_ini + recorrido_y;
			break;
		case 'right':
			cuadrado.x_fin = cuadrado.x_fin + recorrido_x;
			break;
		case 'button':
			cuadrado.y_fin = cuadrado.y_fin + recorrido_y;
			break;
		case 'lefth':
			cuadrado.x_ini = cuadrado.x_ini + recorrido_x;
			break;
		default:
			console.log('ocurrio un error');
			break;
	}
	return cuadrado;
};
// CUADRADOS PEQUEÑOS PAR UPDATE DEL CUADRADO:
const get_pts_redimencion = (cuadrado) => {
	let width_p = 10;
	let width_c = 2;

	let x_ini = cuadrado.x_ini - width_c;
	let y_ini = cuadrado.y_ini - width_c;
	let x_fin = cuadrado.x_fin + width_c;
	let y_fin = cuadrado.y_fin + width_c;

	let vectorPuntosCuadrado = [
		{
			x1: x_ini + (x_fin - x_ini) / width_c - width_p,
			y1: y_ini - width_p,
			x2: x_ini + (x_fin - x_ini) / width_c + width_p,
			y2: y_ini + width_p,
		},
		{
			x1: x_fin - width_p,
			y1: y_ini + (y_fin - y_ini) / width_c - width_p,
			x2: x_fin + width_p,
			y2: y_ini + (y_fin - y_ini) / width_c + width_p,
		},
		{
			x1: x_ini + (x_fin - x_ini) / width_c - width_p,
			y1: y_fin - width_p,
			x2: x_ini + (x_fin - x_ini) / width_c + width_p,
			y2: y_fin + width_p,
		},
		{
			x1: x_ini - width_p,
			y1: y_ini + (y_fin - y_ini) / width_c - width_p,
			x2: x_ini + width_p,
			y2: y_ini + (y_fin - y_ini) / width_c + width_p,
		},
	];
	return vectorPuntosCuadrado;
};
// CUADRADO SEGMENTADO:
const u_cuadradoSegmentado = (context, cuadrado) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 2; // borde grosor de linea
	context.setLineDash([14, 4]); // lineas segmentadas

	let x_ini = cuadrado.x_ini - 2;
	let y_ini = cuadrado.y_ini - 2;
	let x_fin = cuadrado.x_fin + 2;
	let y_fin = cuadrado.y_fin + 2;

	context.beginPath();
	context.moveTo(x_ini, y_ini); // (x_ini, y_ini)
	context.lineTo(x_fin, y_ini); // (x_fin, y_ini)
	context.lineTo(x_fin, y_fin); // (x_fin, y_fin)
	context.lineTo(x_ini, y_fin); // (x_ini, y_fin)
	context.lineTo(x_ini, y_ini); // (x_ini, y_ini)
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([14, 4]); // lineas segmentadas

	let array = get_pts_redimencion(cuadrado);
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

// SELECT LINEA DE HISTORIA:
const u_getLinea = (array, x, y) => {
	let resp = '';
	array.forEach((elem) => {
		if (elem.visible) {
			let p = {
				x1: elem.x_ini,
				y1: elem.y_ini,
				x2: elem.x_fin,
				y2: elem.y_fin,
			};
			let a = p.y1 - p.y2;
			let b = p.x2 - p.x1;
			let c = p.y1 * (p.x1 - p.x2) - p.x1 * (p.y1 - p.y2);
			let dnum = a * x + b * y + c;
			dnum < 0 ? (dnum = dnum * -1) : '';
			let dden = Math.sqrt(a * a + b * b);
			let d = dnum / dden;
			if (d < 20) resp = elem;
		}
	});
	return resp;
};
// CUADRADOS PARA UPDATE LINEA:
const get_pts_redimencion_linea = (linea) => {
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
// LINEA SEGMENTADO:
const u_lineaSegmentado = (context, linea) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	let x_ini = linea.x_ini;
	let y_ini = linea.y_ini;
	let x_fin = linea.x_fin;
	let y_fin = linea.y_fin;

	let inc = 20;

	context.beginPath();
	context.moveTo(x_ini - inc, y_ini); // (x_ini, y_ini)
	context.lineTo(x_ini + inc, y_ini); // (x_fin, y_ini)
	context.lineTo(x_fin + inc, y_fin); // (x_fin, y_fin)
	context.lineTo(x_fin - inc, y_fin); // (x_ini, y_fin)
	context.lineTo(x_ini - inc, y_ini); // (x_ini, y_ini)
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([10, 4]); // lineas segmentadas

	let array = get_pts_redimencion_linea(linea);
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
// MUEVE LINEA SELECT:
const u_moverLinea = (linea, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	linea.x_ini = linea.x_ini + recorrido_x;
	linea.y_ini = linea.y_ini + recorrido_y;
	linea.x_fin = linea.x_fin + recorrido_x;
	linea.y_fin = linea.y_fin + recorrido_y;
	return linea;
};
// UPDATE ZISE LINEA SELECT:
const u_updateZiseLinea = (linea, mouse) => {
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

// PLANO:
const u_getPlano = (array, x, y) => {
	let resp = '';
	array.forEach((plano) => {
		if (plano.visible) {
			plano.x_ini < x && x < plano.x_fin && plano.y_ini < y && y < plano.y_fin
				? (resp = plano)
				: '';
		}
	});
	return resp;
};
// PLANO SEGMENTADO:
const u_planoSegmentado = (context, cuadrado) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 2; // borde grosor de linea
	context.setLineDash([14, 4]); // lineas segmentadas

	let x_ini = cuadrado.x_ini - 2;
	let y_ini = cuadrado.y_ini - 2;
	let x_fin = cuadrado.x_fin + 2;
	let y_fin = cuadrado.y_fin + 2;

	context.beginPath();
	context.moveTo(x_ini, y_ini); // (x_ini, y_ini)
	context.lineTo(x_fin, y_ini); // (x_fin, y_ini)
	context.lineTo(x_fin, y_fin); // (x_fin, y_fin)
	context.lineTo(x_ini, y_fin); // (x_ini, y_fin)
	context.lineTo(x_ini, y_ini); // (x_ini, y_ini)
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([14, 4]); // lineas segmentadas

	let array = get_pts_redimencion(cuadrado);
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
// MUEVE PLANO SELECT:
const u_moverPlano = (plano, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	plano.x_ini = plano.x_ini + recorrido_x;
	plano.y_ini = plano.y_ini + recorrido_y;
	plano.x_fin = plano.x_fin + recorrido_x;
	plano.y_fin = plano.y_fin + recorrido_y;
	return plano;
};
// CUADRADOS PEQUEÑOS PAR UPDATE DEL PLANO:
const get_pts_redimencion_plano = (cuadrado) => {
	let width_p = 10;
	let width_c = 2;

	let x_ini = cuadrado.x_ini - width_c;
	let y_ini = cuadrado.y_ini - width_c;
	let x_fin = cuadrado.x_fin + width_c;
	let y_fin = cuadrado.y_fin + width_c;

	let vectorPuntosCuadrado = [
		{
			x1: x_ini + (x_fin - x_ini) / width_c - width_p,
			y1: y_ini - width_p,
			x2: x_ini + (x_fin - x_ini) / width_c + width_p,
			y2: y_ini + width_p,
		},
		{
			x1: x_fin - width_p,
			y1: y_ini + (y_fin - y_ini) / width_c - width_p,
			x2: x_fin + width_p,
			y2: y_ini + (y_fin - y_ini) / width_c + width_p,
		},
		{
			x1: x_ini + (x_fin - x_ini) / width_c - width_p,
			y1: y_fin - width_p,
			x2: x_ini + (x_fin - x_ini) / width_c + width_p,
			y2: y_fin + width_p,
		},
		{
			x1: x_ini - width_p,
			y1: y_ini + (y_fin - y_ini) / width_c - width_p,
			x2: x_ini + width_p,
			y2: y_ini + (y_fin - y_ini) / width_c + width_p,
		},
	];
	return vectorPuntosCuadrado;
};
// UPDATE ZISE CUADRADO SELECT:
const u_updateZisePlano = (plano, mouse) => {
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	switch (mouse.plano_pto) {
		case 'top':
			plano.y_ini = plano.y_ini + recorrido_y;
			break;
		case 'right':
			plano.x_fin = plano.x_fin + recorrido_x;
			break;
		case 'button':
			plano.y_fin = plano.y_fin + recorrido_y;
			break;
		case 'lefth':
			plano.x_ini = plano.x_ini + recorrido_x;
			break;
		default:
			console.log('ocurrio un error');
			break;
	}
	return plano;
};
export {
	u_getCuadrado,
	u_moverCuadrado,
	u_cuadradoSegmentado,
	get_pts_redimencion,
	u_updateZiseCuadrado,
	u_getLinea,
	u_lineaSegmentado,
	u_moverLinea,
	get_pts_redimencion_linea,
	u_updateZiseLinea,
	u_getPlano,
	u_planoSegmentado,
	u_moverPlano,
	get_pts_redimencion_plano,
	u_updateZisePlano,
};
