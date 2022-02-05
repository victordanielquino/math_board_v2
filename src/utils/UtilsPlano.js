const Texto = {
	texto: 'Hola mundo', //texto de prueba
	texto_color: 'black', //color externo
	texto_fondo: 'black', //color de relleno
	texto_font: 'bold 20px arial', //estilo de texto
};
const generaRango = (start, stop, step) =>
	Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
// ej. let array = generaRango(inicio, fin, salto);

const utilsPlano_graficaCuadricula = (context, plano, array_x, array_y) => {
	context.lineWidth = 1; // lineaGrosor
	context.strokeStyle = '#d5dbdb'; // lineaColor
	context.setLineDash([0, 0]);
	// EJE X:
	context.beginPath();
	array_x.forEach(data => {
		context.moveTo(data, plano.y_ini); // (x_ini, y_ini)
		context.lineTo(data, plano.y_fin); // (x_fin, y_ini)
		context.stroke(); // bordeColor = true
	});
	// EJE Y:
	array_y.forEach(data => {
		context.moveTo(plano.x_ini, data); // (x_ini, y_ini)
		context.lineTo(plano.x_fin, data); // (x_fin, y_ini)
		context.stroke(); // bordeColor = true
	});
	context.closePath();
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
	context.beginPath();
	context.fillStyle = 'black';
	context.moveTo(plano.x_fin, plano.k);
	context.lineTo(plano.x_fin-5, plano.k-5);
	context.lineTo(plano.x_fin-5, plano.k+5);
	context.closePath();
	context.stroke();
	context.fill();

	context.beginPath();
	context.fillStyle = 'black';
	context.moveTo(plano.h, plano.y_ini);
	context.lineTo(plano.h-5, plano.y_ini+5);
	context.lineTo(plano.h+5, plano.y_ini+5);
	context.closePath();
	context.stroke();
	context.fill();
};
const ejeCordenadaX = (context, plano) => {
	let Linea = {
		id: 0,
		grosor: 1,
		color: 'black',
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	Linea.x_ini = plano.h;
	Linea.x_fin = plano.h;
	Linea.y_ini = plano.y_ini;
	Linea.y_fin = plano.y_fin;
	utilsLinea_graficaLinea(context, Linea); // HORIZONTAL
}
const ejeCordenadaY = (context, plano) => {
	let Linea = {
		id: 0,
		grosor: 1,
		color: 'black',
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
	};
	Linea.x_ini = plano.x_ini;
	Linea.x_fin = plano.x_fin;
	Linea.y_ini = plano.k;
	Linea.y_fin = plano.k;
	utilsLinea_graficaLinea(context, Linea); // VERTICAL
}
const uPlano_graficaNumeros = (context, plano, array_x, array_y, array_x_num, array_y_num) => {
	// NUMEROS EN EJE X y Y:
	context.fillStyle = 'black'; //color de relleno
	context.font = '11px arial'; //estilo de texto
	context.beginPath(); //iniciar ruta
	for(let i = 0; i< array_x.length; i++){
		(array_x_num[i] != 0) ?
			context.fillText(array_x_num[i], array_x[i]-3, plano.k+12):
			context.fillText(array_x_num[i], array_x[i]-10, plano.k+12);
	}
	for(let i = 0; i< array_y.length; i++){
		(array_y_num[i] != 0) ?
			context.fillText(array_y_num[i]* -1, plano.h-12, array_y[i]+3):
			'';
	}
	context.closePath();

	context.textAlign = 'start';
	context.beginPath(); //iniciar ruta
	context.fillText('Y', plano.h + 5, plano.y_ini+15);
	context.fillText('X', plano.x_fin-15, plano.k-3);
	context.closePath();
};
const uPlano_graficaCuadradoConEjes = (context, plano) => {
	if (plano.visible) {
		context.strokeStyle = plano.bordeColor; // bordeColor
		context.fillStyle = plano.fondoColor; // fondoColor
		context.lineWidth = plano.bordeGrosor; // bordeGrosor
		context.setLineDash([0, 0]); // lineas no segmentadas
		// CONTORNO DEL PLANO
		context.beginPath();
		context.moveTo(plano.x_ini, plano.y_ini); // (x_ini, y_ini)
		context.lineTo(plano.x_fin, plano.y_ini); // (x_fin, y_ini)
		context.lineTo(plano.x_fin, plano.y_fin); // (x_fin, y_fin)
		context.lineTo(plano.x_ini, plano.y_fin); // (x_ini, y_fin)
		context.lineTo(plano.x_ini, plano.y_ini); // (x_ini, y_ini)
		plano.fondoEstado ? context.fill() : ''; // fondoColor = true
		plano.bordeEstado ? context.stroke() : ''; // bordeColor = true
		context.closePath();
		// CONTORNO DEL PLANO END
		// EJE X:
		let array_x = [];
		let array_x_num = [];

		for (let i = plano.h - plano.width_cuadricula; i > plano.x_ini; i = i - plano.width_cuadricula) {
			array_x.push(i);
		}
		let l = array_x.length * (-1);
		for (let i = plano.h + plano.width_cuadricula; i < plano.x_fin; i = i + plano.width_cuadricula) {
			array_x.push(i);
		}
		array_x.push(plano.h);
		array_x.sort(function(a,b) {return a -b});
		for(let i = 0; i < array_x.length; i++){
			array_x_num.push(l);
			l++;
		}
		// EJE Y:
		let array_y = [];
		let array_y_num = [];
		for (let i = plano.k - plano.width_cuadricula; i > plano.y_ini; i = i - plano.width_cuadricula) {
			array_y.push(i);
		}
		l = array_y.length * (-1);
		for (let i = plano.k + plano.width_cuadricula; i < plano.y_fin; i = i + plano.width_cuadricula) {
			array_y.push(i);
		}
		array_y.push(plano.k);
		array_y.sort(function(a,b) {return a -b});
		for(let i = 0; i < array_y.length; i++){
			array_y_num.push(l);
			l++;
		}
		utilsPlano_graficaCuadricula(context, plano, array_x, array_y);
		ejeCordenadaX(context, plano);
		ejeCordenadaY(context, plano);
		utilsPlano_graficaTriangulo(context, plano);
		uPlano_graficaNumeros(context, plano, array_x, array_y, array_x_num, array_y_num);
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
	console.log('mueve plano')
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	plano.x_ini = plano.x_ini + recorrido_x;
	plano.y_ini = plano.y_ini + recorrido_y;
	plano.x_fin = plano.x_fin + recorrido_x;
	plano.y_fin = plano.y_fin + recorrido_y;
	plano.h = plano.h + recorrido_x;
	plano.k = plano.k + recorrido_y;
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
			console.log('ocurrio un error: u_planoUpdateZise');
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
