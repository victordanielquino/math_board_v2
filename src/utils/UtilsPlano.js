const Texto = {
	texto: 'Hola mundo', //texto de prueba
	texto_color: 'black', //color externo
	texto_fondo: 'black', //color de relleno
	texto_font: 'bold 20px arial', //estilo de texto
};
const generaRango = (start, stop, step) =>
	Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
// ej. let array = generaRango(inicio, fin, salto);

const uPlano_graficaNumeros = (context, plano) => {
	let arrayX = [];
	let width = plano.x_fin - plano.x_ini;
	let n = parseInt(width / plano.width_cuadricula);
	let x = plano.x_min;
	for (let i = 0; i < n - 1; i++) {
		arrayX.push(x);
		x = x + plano.salto;
	}
	context.fillStyle = 'black'; //color de relleno
	context.font = '11px arial'; //estilo de texto
	context.beginPath(); //iniciar ruta
	let x1 = plano.x_ini + plano.width_cuadricula - 3;
	let y1 = plano.y_ini + (plano.y_max + 1) * plano.width_cuadricula + 11;
	arrayX.forEach((x) => {
		x != 0
			? context.fillText(x, x1, y1) //texto con método stroke
			: context.fillText(x, x1 - 5, y1);
		x1 = x1 + plano.width_cuadricula;
	});
	context.closePath();

	let arrayY = [];
	let heigth = plano.y_fin - plano.y_ini;
	n = parseInt(heigth / plano.width_cuadricula);
	let y = plano.y_max;
	for (let i = 0; i < n; i++) {
		arrayY.push(y);
		y = y - plano.salto;
	}
	x1 = plano.x_ini + (plano.x_min * -1 + 1) * plano.width_cuadricula - 3;
	y1 = plano.y_ini + plano.width_cuadricula + 5;

	context.textAlign = 'end';
	context.beginPath(); //iniciar ruta
	arrayY.forEach((y) => {
		if (y != 0) context.fillText(y, x1, y1); //texto con método stroke
		y1 = y1 + plano.width_cuadricula;
	});
	context.closePath();

	context.textAlign = 'start';
	context.beginPath(); //iniciar ruta
	x1 = plano.x_ini + (plano.x_min * -1 + 1) * plano.width_cuadricula + 8;
	y1 = plano.y_ini + 12;
	context.fillText('Y', x1, y1);
	x1 = plano.x_fin - 12;
	y1 = plano.y_ini + (plano.y_max + 1) * plano.width_cuadricula - 10;
	context.fillText('X', x1, y1);
	context.closePath();
};
const utilsPlano_graficaCuadricula = (context, plano) => {
	context.lineWidth = 1; // lineaGrosor
	//context.strokeStyle = plano.color_cuadricula; // lineaColor
	context.strokeStyle = '#d5dbdb'; // lineaColor
	context.setLineDash([0, 0]);
	let width = plano.x_fin - plano.x_ini;
	let width_cuadricula = plano.width_cuadricula;
	// VERTICAL: |
	let nroLineasV = width / width_cuadricula - 1;
	let incV = width_cuadricula;
	let x1 = plano.x_ini + incV;
	let y1 = plano.y_ini;
	let y2 = plano.y_fin;
	let i = 0;
	for (i = 0; i < nroLineasV; i++) {
		context.beginPath();
		context.moveTo(x1, y1); // (x_ini, y_ini)
		context.lineTo(x1, y2); // (x_fin, y_ini)
		context.stroke(); // bordeColor = true
		x1 = x1 + incV;
	}
	// HORIZONTAL: -
	let height = plano.y_fin - plano.y_ini;
	let nroLineasH = height / width_cuadricula - 1;
	let incH = width_cuadricula;
	x1 = plano.x_ini;
	let x2 = plano.x_fin;
	y1 = plano.y_ini + incH;

	for (i = 0; i < nroLineasH; i++) {
		context.beginPath();
		context.moveTo(x1, y1); // (x_ini, y_ini)
		context.lineTo(x2, y1); // (x_fin, y_ini)
		context.stroke(); // bordeColor = true
		y1 = y1 + incH;
	}
};
// PLANO SIN EJES:
const uPlano_graficaCuadrado = (context, cuadrado) => {
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
// LINEA:
const utilsLinea_graficaLinea = (context, linea) => {
	context.lineWidth = linea.grosor;
	context.strokeStyle = linea.color;
	context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(linea.x_ini, linea.y_ini);
	context.lineTo(linea.x_fin, linea.y_fin);
	context.stroke();
	context.closePath();
};
// TRIANGULO:
const utilsPlano_graficaTriangulo = (context, plano) => {
	let x1 = plano.x_ini + (plano.x_min * -1 + 1) * plano.width_cuadricula;
	let y1 = plano.y_ini + 2;
	let x2 = x1 - 5;
	let y2 = y1 + 5;
	let x3 = x1 + 5;
	let y3 = y1 + 5;
	context.beginPath();
	context.fillStyle = 'black';
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.closePath();
	context.stroke();
	context.fill();

	x1 = plano.x_fin - 2;
	y1 = plano.y_ini + (plano.y_max + 1) * plano.width_cuadricula;
	x2 = x1 - 5;
	y2 = y1 - 5;
	x3 = x1 - 5;
	y3 = y1 + 5;
	context.beginPath();
	context.fillStyle = 'black';
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.closePath();
	context.stroke();
	context.fill();
};
const uPlano_graficaCuadradoConEjes = (context, plano) => {
	if (plano.visible) {
		context.strokeStyle = plano.bordeColor; // bordeColor
		context.fillStyle = plano.fondoColor; // fondoColor
		context.lineWidth = plano.bordeGrosor; // bordeGrosor
		context.setLineDash([0, 0]); // lineas no segmentadas

		context.beginPath();
		context.moveTo(plano.x_ini, plano.y_ini); // (x_ini, y_ini)
		context.lineTo(plano.x_fin, plano.y_ini); // (x_fin, y_ini)
		context.lineTo(plano.x_fin, plano.y_fin); // (x_fin, y_fin)
		context.lineTo(plano.x_ini, plano.y_fin); // (x_ini, y_fin)
		context.lineTo(plano.x_ini, plano.y_ini); // (x_ini, y_ini)

		plano.fondoEstado ? context.fill() : ''; // fondoColor = true
		plano.bordeEstado ? context.stroke() : ''; // bordeColor = true
		context.closePath();

		utilsPlano_graficaCuadricula(context, plano);
		let Linea = {
			id: 0,
			grosor: 1,
			color: 'black',
			x_ini: 0,
			y_ini: 0,
			x_fin: 0,
			y_fin: 0,
		};
		Linea.x_ini = plano.x_ini + (plano.x_min * -1 + 1) * plano.width_cuadricula;
		Linea.x_fin = Linea.x_ini;
		Linea.y_ini = plano.y_ini;
		Linea.y_fin = plano.y_fin;
		utilsLinea_graficaLinea(context, Linea); // VERTICAL
		Linea.x_ini = plano.x_ini;
		Linea.x_fin = plano.x_fin;
		Linea.y_ini = plano.y_ini + (plano.y_max + 1) * plano.width_cuadricula;
		Linea.y_fin = Linea.y_ini;
		utilsLinea_graficaLinea(context, Linea); // HORIZONTAL

		utilsPlano_graficaTriangulo(context, plano);
		// NUMEROS:
		uPlano_graficaNumeros(context, plano);
	}
};

// GRAFICA PLANOS - HISORIA:
const uPlano_graficaCuadradoHistoria = (context, array) => {
	array.forEach((element) => uPlano_graficaCuadrado(context, element));
};
const uPlano_graficaCuadradoHistoriaConEjes = (context, array) => {
	array.forEach((element) => uPlano_graficaCuadradoConEjes(context, element));
};
// PLANO: GET
const u_planoGet = (array, x, y) => {
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
// PLANO: GRAFICA PLANO
const u_planoGraficaH = (context, array) => {
	array.forEach((element) => uPlano_graficaCuadradoConEjes(context, element));
};
// PLANO: DELETE POR ID
const u_planoDeleteById = (array, id) => {
	array.forEach((element) => {
		element.id == id ? (element.visible = false) : '';
	});
};
// PLANO: CUADRADOS PEQUEÑOS REDIMENCIONAR PLANO
const u_planoGetPtsRedimencion = (cuadrado) => {
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
// PLANO: SEGMENTADO:
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

	let array = u_planoGetPtsRedimencion(cuadrado);
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
// PLANO: MOVER
const u_planoMover = (plano, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	plano.x_ini = plano.x_ini + recorrido_x;
	plano.y_ini = plano.y_ini + recorrido_y;
	plano.x_fin = plano.x_fin + recorrido_x;
	plano.y_fin = plano.y_fin + recorrido_y;
	return plano;
};
// PLANO: UPDATE ZISE
const u_planoUpdateZise = (plano, mouse) => {
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
	uPlano_graficaCuadrado,
	uPlano_graficaCuadradoConEjes,
	uPlano_graficaCuadradoHistoria,
	uPlano_graficaCuadradoHistoriaConEjes,
	u_planoGet,
	u_planoGraficaH,
	u_planoDeleteById,
	u_planoSegmentado,
	u_planoMover,
	u_planoGetPtsRedimencion,
	u_planoUpdateZise,
};
