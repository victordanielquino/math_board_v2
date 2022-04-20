// cuadrado segmentado:
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "../Circle/UtilsCirculo";

const utilsCuadrado_graficaCuadradoSegmentado = (context, cuadrado) => {
	context.strokeStyle = 'red'; // borde Color
	context.fillStyle = 'yellow'; // fondo Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([14, 4]); // lineas segmentadas
	let width = cuadrado.x_fin - cuadrado.x_ini;
	let height = cuadrado.y_fin - cuadrado.y_ini;

	context.beginPath();
	context.strokeRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
	context.fillRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
	context.closePath();
};

// limpia el canvas:
const utilsCuadrado_LimpiaCuadrado = (context, cuadrado) => {
	let width = cuadrado.x_fin - cuadrado.x_ini;
	let height = cuadrado.y_fin - cuadrado.y_ini;
	context.clearRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
};

// cuadrado:
const utilsCuadrado_graficaCuadrado = (context, cuadrado) => {
	context.strokeStyle = cuadrado.bordeColor; // bordeColor
	context.fillStyle = cuadrado.fondoColor; // fondoColor
	context.lineWidth = cuadrado.bordeGrosor; // bordeGrosor
	context.setLineDash([0, 0]); // lineas no segmentadas

	context.beginPath();
	context.moveTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_ini); // (x_fin, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_fin); // (x_fin, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_fin); // (x_ini, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)

	cuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
	cuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
	context.closePath();
};

// GRAFICA CUADRADOS - HISORIA:
const utilsCuadrado_graficaCuadradoHistoria = (context, array) => {
	array.forEach((element) => utilsCuadrado_graficaCuadrado(context, element));
};

// GRAFICA CUADRADOS - HISORIA MENOS EL I-ESIMO id:
const UC_graficaCuadradoHistoria_menosI = (context, array, i) => {
	array.forEach((element) =>
		element.id != i ? utilsCuadrado_graficaCuadrado(context, element) : ''
	);
};

// CUADRADO: GET
const u_cuadradoGet = (array, x, y) => {
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
// CUADRADO: GET
const u_cuadradoGetId = (array, x, y) => {
	let resp = '';
	let id = -1;
	array.forEach((elem) => {
		if (elem.visible) {
			elem.x_ini < x && x < elem.x_fin && elem.y_ini < y && y < elem.y_fin
				? (resp = elem)
				: '';
		}
	});
	resp !== '' ? id = resp.id:'';
	return id;
};
const u_squareClickTrue = (elem, x, y) => {
	return (elem.x_ini < x && x < elem.x_fin && elem.y_ini < y && y < elem.y_fin);
};
// CUADRADO: DELETE POR ID
const u_cuadradoDeleteById = (array, id) => {
	/*console.log('id:', cuadradoId);
	let arrayNew = [];
	array.forEach((element) => {
		element.id != cuadradoId ? arrayNew.push(element) : '';
	});
	return arrayNew;*/
	let newArray = [];
	for(let elm of array)
		elm.id !== id ? newArray.push(elm):'';
	return newArray;
};
// CUADRADO: REPOSICIONA SI EL CUADRADO SE VOLTEA
const u_cuadradoValidaPosicion = (cuadrado) => {
	if (cuadrado.x_ini > cuadrado.x_fin) {
		let aux = cuadrado.x_ini;
		cuadrado.x_ini = cuadrado.x_fin;
		cuadrado.x_fin = aux;
	}
	if (cuadrado.y_ini > cuadrado.y_fin) {
		let aux = cuadrado.y_ini;
		cuadrado.y_ini = cuadrado.y_fin;
		cuadrado.y_fin = aux;
	}
	return cuadrado;
};
// CUADRADO: GRAFICA
const u_cuadradoGrafica = (context, cuadrado) => {
	context.strokeStyle = cuadrado.bordeColor; // bordeColor
	context.fillStyle = cuadrado.fondoColor; // fondoColor
	context.lineWidth = cuadrado.bordeGrosor; // bordeGrosor
	context.setLineDash([0, 0]); // lineas no segmentadas

	context.beginPath();
	context.moveTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_ini); // (x_fin, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_fin); // (x_fin, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_fin); // (x_ini, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)

	cuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
	cuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
	context.closePath();
};
const u_squareDraw = (context, cuadrado) => {
	context.strokeStyle = cuadrado.bordeColor; // bordeColor
	context.fillStyle = cuadrado.fondoColor; // fondoColor
	context.lineWidth = cuadrado.bordeGrosor; // bordeGrosor
	context.setLineDash([0, 0]); // lineas no segmentadas

	context.beginPath();
	context.moveTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_ini); // (x_fin, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_fin); // (x_fin, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_fin); // (x_ini, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)

	cuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
	cuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
	context.closePath();
};
const u_cuadradoGraficaH = (context, array) => {
	array.forEach((element) => u_cuadradoGrafica(context, element));
};

// CUADRADO: MOVER
const u_cuadradoMover = (cuadrado, mouse) => {
	if (cuadrado.edit) {
		const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
		const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
		cuadrado.x_ini = cuadrado.x_ini + recorrido_x;
		cuadrado.y_ini = cuadrado.y_ini + recorrido_y;
		cuadrado.x_fin = cuadrado.x_fin + recorrido_x;
		cuadrado.y_fin = cuadrado.y_fin + recorrido_y;
	}
	return cuadrado;
};

// CUADRADO: GRAFICA BORDE SEGMENTADO
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

	let array = u_cuadradoGetPtsRedimencion(cuadrado);
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
// UPDATE ZISE CUADRADO SELECT:
const u_cuadradoUpdateZise = (cuadrado, mouse) => {
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
const u_cuadradoGetPtsRedimencion = (cuadrado) => {
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
// CUADRADO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CUADRADO
const u_cuadradoBuscaPtoClickParaRedimencionar = (x, y, cuadrado) => {
	let array = u_cuadradoGetPtsRedimencion(cuadrado);
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
// CIRCULO: GET - CLICK
const u_cuadradoGetClick = (context, array, x, y) => {
	let resp = '';
	array.forEach((cuadrado) => {
		if (cuadrado.visible) {
			let x1 = cuadrado.x_ini;
			let y1 = cuadrado.y_ini;
			let x2 = cuadrado.x_fin;
			let y2 = cuadrado.y_fin;
			if (x1 - 20 < x && x < x2 + 20 && y1 - 20 < y && y < y2 + 20) {
				resp = cuadrado;
			}
		}
	});
	//resp ? u_circuloBordeSegmentado(context, resp):'';
	return resp;
};
// CIRCULO: SI SE HIZO CLICK SOBRE UN CIRCULO, PODREMOS EDITAR ZISE U MOVER
const u_cuadradoClickSobreCuadrado = (cuadradoSelect, mouse) => {
	if (cuadradoSelect) {
		mouse.cuadrado_mover = true;
		mouse.cuadrado_mover_pts = false;
		mouse.cuadrado_seleccionar_pts = true;
	} else{
		mouse.cuadrado_mover = false;
		mouse.cuadrado_mover_pts = false;
		mouse.cuadrado_seleccionar_pts =false;
	}
}
// CIRCULO: CUADRADO SEGMENTADO ALREDEDOR DEL CIRCULO SELECCIONADO
const u_cuadradoBordeSegmentado = (context, cuadrado) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	let margin = 5;
	context.beginPath();
	context.moveTo(cuadrado.x_ini-margin, cuadrado.y_ini-margin); // (x_ini, y_ini)
	context.lineTo(cuadrado.x_fin+margin, cuadrado.y_ini-margin); // (x_fin, y_ini)
	context.lineTo(cuadrado.x_fin+margin, cuadrado.y_fin+margin); // (x_fin, y_fin)
	context.lineTo(cuadrado.x_ini-margin, cuadrado.y_fin+margin); // (x_ini, y_fin)
	context.lineTo(cuadrado.x_ini-margin, cuadrado.y_ini-margin); // (x_ini, y_ini)
	context.stroke();
	context.closePath();

	context.fillStyle = 'red'; // borde Color
	context.setLineDash([14, 4]); // lineas segmentadas

	let array = u_cuadradoGetPtsRedimencion(cuadrado);
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
// CUADRADO: BUSCA CUADRADO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_cuadradoOpera = (context, cuadradoSelect, array, mouse) => {
	if (mouse.cuadrado_seleccionar_pts){
		mouse.cuadrado_pto = u_cuadradoBuscaPtoClickParaRedimencionar(
			mouse.pos.x, mouse.pos.y, cuadradoSelect
		);
		if(mouse.cuadrado_pto != '') {
			mouse.cuadrado_mover = false;
			mouse.cuadrado_mover_pts = true;
		} else {
			mouse.cuadrado_mover = false;
			mouse.cuadrado_mover_pts = false; // move_size
			mouse.cuadrado_seleccionar_pts = false;
		}
	}
	if (!mouse.cuadrado_seleccionar_pts){
		cuadradoSelect = u_cuadradoGetClick(context, array, mouse.pos.x, mouse.pos.y);
		u_cuadradoClickSobreCuadrado(cuadradoSelect, mouse);
	}
	return cuadradoSelect;
}
const u_squareDrawBorderSegment = (context, cuadrado) => {
	context.strokeStyle = 'red'; // bordeColor
	context.lineWidth = 1; // bordeGrosor
	context.setLineDash([10, 5]); // lineas no segmentadas

	context.beginPath();
	context.moveTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_ini); // (x_fin, y_ini)
	context.lineTo(cuadrado.x_fin, cuadrado.y_fin); // (x_fin, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_fin); // (x_ini, y_fin)
	context.lineTo(cuadrado.x_ini, cuadrado.y_ini); // (x_ini, y_ini)
	context.stroke(); // bordeColor = true
	context.closePath();
};
export {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
	utilsCuadrado_graficaCuadradoSegmentado,
	utilsCuadrado_LimpiaCuadrado,
	UC_graficaCuadradoHistoria_menosI,
	u_cuadradoGet,
	u_cuadradoGraficaH,
	u_cuadradoValidaPosicion,
	u_cuadradoGrafica,
	u_cuadradoMover,
	u_cuadradoSegmentado,
	u_cuadradoGetPtsRedimencion,
	u_cuadradoUpdateZise,
	u_cuadradoOpera,
	u_cuadradoBordeSegmentado,
	u_cuadradoDeleteById,
	u_cuadradoGetId,
	u_squareDraw,
	u_squareClickTrue,
	u_squareDrawBorderSegment
};
