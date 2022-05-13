import {u_puntoDraw}                         from "./Punto/UtilsPunto";
import {u_rectaDrawRectaQuePasaPorDosPuntos} from "./Recta/RectaPasaPorDosPuntos/UtilsRectaPasaPorDosPuntos";
import {u_distanciaDistanciaEntreDosPuntos}  from "./DistanciaDosPuntos/UtilsDistanciaDosPuntos";
import {u_canonicaDrawEcuacionCanonica}      from "./Recta/EcuacionCanonica/UtilsEcuacionCanonica";
import {u_generalDrawEcuacionGeneral}        from "./Recta/EcuacionGeneral/UtilsEcuacionGeneral";
import {u_rectaDrawEcuacionPuntoPendiente}   from "./Recta/PuntoPendiente/UtilsPuntoPendiente";
import {u_circunferenciaDraw}                                  from "./Circunferencia/UtilsCIrcunferencia";
import {u_parabolaDrawCanonica, u_parabolaDrawEcuacionGeneral} from "./Parabola/UtilsParabola";

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
	context.font = '12px arial'; //estilo de texto
	context.textAlign = 'start';
	context.textBaseline = 'bottom';
	context.beginPath(); //iniciar ruta
	for(let i = 0; i< array_x.length; i++){
		(array_x_num[i] !== 0)
			? context.fillText(array_x_num[i], array_x[i]-3, plano.k+20)
			: context.fillText(array_x_num[i], array_x[i]-10, plano.k+20);
	}
	context.textAlign = 'end';
	for(let i = 0; i< array_y.length; i++){
		(array_y_num[i] !== 0)
			? context.fillText(array_y_num[i]* -1, plano.h-5, array_y[i]+7)
			: '';
	}
	context.closePath();

	context.textAlign = 'start';
	context.textBaseline = 'bottom';
	context.beginPath(); //iniciar ruta
	context.fillText('Y', plano.h + 10, plano.y_ini+20);
	context.fillText('X', plano.x_fin-20, plano.k-3);
	context.closePath();
};
// PLANO: abscisas X
const u_planoAbscisas = (plano) => {
	// EJE X:
	let x_cordenada = [];
	let x_value = [];

	for (let i = plano.h - plano.width_cuadricula; i > plano.x_ini; i = i - plano.width_cuadricula) {
		x_cordenada.push(i);
	}
	let l = x_cordenada.length * (-1);
	for (let i = plano.h + plano.width_cuadricula; i < plano.x_fin; i = i + plano.width_cuadricula) {
		x_cordenada.push(i);
	}
	x_cordenada.push(plano.h);
	x_cordenada.sort(function(a,b) {return a -b});
	for(let i = 0; i < x_cordenada.length; i++){
		x_value.push(l);
		l++;
	}
	plano.x_cordenada = x_cordenada;
	plano.x_value = x_value;
}
// PLANO: ordenadas Y
const u_planoOrdenadas = (plano) => {
	// EJE Y:
	let y_cordenada = [];
	let y_value = [];
	for (let i = plano.k - plano.width_cuadricula; i > plano.y_ini; i = i - plano.width_cuadricula) {
		y_cordenada.push(i);
	}
	let l = y_cordenada.length * (-1);
	for (let i = plano.k + plano.width_cuadricula; i < plano.y_fin; i = i + plano.width_cuadricula) {
		y_cordenada.push(i);
	}
	y_cordenada.push(plano.k);
	y_cordenada.sort(function(a,b) {return a -b});
	for(let i = 0; i < y_cordenada.length; i++){
		y_value.push(l);
		l++;
	}
	plano.y_cordenada = y_cordenada;
	plano.y_value = y_value;
}
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
const u_planoDraw = (context, plano) => {
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

	utilsPlano_graficaCuadricula(context, plano, plano.x_cordenada, plano.y_cordenada);
	ejeCordenadaX(context, plano);
	ejeCordenadaY(context, plano);
	utilsPlano_graficaTriangulo(context, plano);
	uPlano_graficaNumeros(context, plano, plano.x_cordenada, plano.y_cordenada, plano.x_value, plano.y_value);
	plano.drawGA.forEach(elm => {
		let elm1 = {}, elm2 = {}, parabola = {}, colores = {};
		switch (elm.type) {
			case 'punto':
				u_puntoDraw(context, plano, elm);
				break;
			case 'distancia':
				elm1 = {
					p: elm.p1,
					color: elm.color,
				}
				elm2 = {
					p: elm.p2,
					color: elm.color,
				}
				u_puntoDraw(context, plano, elm1);
				u_puntoDraw(context, plano, elm2);
				u_distanciaDistanciaEntreDosPuntos(context, plano, elm, 3);
				break;
			case 'recC1':
				elm1 = {
					p: elm.p1,
					color: elm.color,
				}
				elm2 = {
					p: elm.p2,
					color: elm.color,
				}
				u_puntoDraw(context, plano, elm1);
				u_puntoDraw(context, plano, elm2);
				u_rectaDrawRectaQuePasaPorDosPuntos(context, plano, elm, 3);
				break;
			case 'recC2':
				elm1 = {
					p: {x:elm.p.a, y:0},
					color: elm.color,
				}
				elm2 = {
					p: {x:0, y:elm.p.b},
					color: elm.color,
				}
				u_puntoDraw(context, plano, elm1);
				u_puntoDraw(context, plano, elm2);
				u_canonicaDrawEcuacionCanonica(context, plano, elm, 3);
				break;
			case 'recC3':
				u_generalDrawEcuacionGeneral(context, plano, elm, 3);
				break;
			case 'recC4':
				u_puntoDraw(context, plano, elm);
				u_rectaDrawEcuacionPuntoPendiente(context, plano, elm, 3);
				break;
			case 'cirC1':
				let aux = {
					p: {
						x: elm.cir.h,
						y: elm.cir.k,
					},
					color: elm.color,
				}
				u_puntoDraw(context, plano, aux);
				u_circunferenciaDraw(context, plano, elm, 3);
				break;
			case 'parC1':
				// ecuacion canonica eje X:
				colores = u_planoGetColores(elm.color);
				u_puntoDraw(context, plano, {p:{x:elm.foco.x, y:elm.foco.y}, color:colores.color3});
				u_puntoDraw(context, plano, {p:{x:elm.par.h, y:elm.par.k}, color:colores.color3});
				u_rectaDrawRectaQuePasaPorDosPuntos(context, plano, {p1:{x:elm.directriz.x, y:elm.directriz.y}, p2:{x:elm.directriz.x, y:elm.directriz.y+1}, color:colores.color4}, 3, false);
				u_parabolaDrawCanonica(context, plano, elm, 3);
				break;
			case 'parC2':
				// ecuacion canonica eje Y:
				colores = u_planoGetColores(elm.color);
				u_puntoDraw(context, plano, {p:{x:elm.foco.x, y:elm.foco.y}, color:colores.color3});
				u_puntoDraw(context, plano, {p:{x:elm.par.h, y:elm.par.k}, color:colores.color3});
				u_rectaDrawRectaQuePasaPorDosPuntos(context, plano, {p1:{x:elm.directriz.x, y:elm.directriz.y}, p2:{x:elm.directriz.x+1, y:elm.directriz.y}, color:colores.color4}, 3, false);
				u_parabolaDrawCanonica(context, plano, elm, 3);
				break;
			case 'parC3':
				// ecuaion general eje X
				colores = u_planoGetColores(elm.color);
				parabola = u_parabolaDrawEcuacionGeneral(context, elm);
				u_puntoDraw(context, plano, {p:{x:parabola.foco.x, y:parabola.foco.y}, color:colores.color3});
				u_puntoDraw(context, plano, {p:{x:parabola.par.h, y:parabola.par.k}, color:colores.color3});
				u_rectaDrawRectaQuePasaPorDosPuntos(context, plano, {p1:{x:parabola.directriz.x, y:parabola.directriz.y}, p2:{x:parabola.directriz.x, y:parabola.directriz.y+1}, color:colores.color4}, 3, false);
				u_parabolaDrawCanonica(context, plano, parabola, 3);
				break;
			case 'parC4':
				// ecuaion general eje Y
				colores = u_planoGetColores(elm.color);
				parabola = u_parabolaDrawEcuacionGeneral(context, elm);
				u_puntoDraw(context, plano, {p:{x:parabola.foco.x, y:parabola.foco.y}, color:colores.color3});
				u_puntoDraw(context, plano, {p:{x:parabola.par.h, y:parabola.par.k}, color:colores.color3});
				u_rectaDrawRectaQuePasaPorDosPuntos(context, plano, {p1:{x:parabola.directriz.x, y:parabola.directriz.y}, p2:{x:parabola.directriz.x+1, y:parabola.directriz.y}, color:colores.color4}, 3, false);
				u_parabolaDrawCanonica(context, plano, parabola, 3);
				break;
			default:
				break;
		}
	})
};
const u_planoClickTrue = (plano, x, y) => {
	return (plano.x_ini < x && x < plano.x_fin && plano.y_ini < y && y < plano.y_fin)
};
// PLANO: GRAFICA PLANO
const u_planoGraficaH = (context, array) => {
	array.forEach((element) => uPlano_graficaCuadradoConEjes(context, element));
};
// PLANO: DELETE POR ID
const u_planoDeleteById = (array, id) => {
	/*array.forEach((element) => {
		element.id == id ? (element.visible = false) : '';
	});*/
	let newArray = [];
	for(let elm of array)
		elm.id !== id ? newArray.push(elm):'';
	return newArray;
};
// PLANO: CUADRADOS PEQUEÑOS REDIMENCIONAR PLANO
const u_planoGetPtsRedimencion = (cuadrado) => {
	let width_p = 5;
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
	plano.h = plano.h + recorrido_x;
	plano.k = plano.k + recorrido_y;
	plano.x_cordenada.forEach((elm, index) => plano.x_cordenada[index] += recorrido_x);
	plano.y_cordenada.forEach((elm, index) => plano.y_cordenada[index] += recorrido_y);
	return plano;
};
// PLANO: UPDATE ZISE
const u_planoUpdateZise = (plano, mouse) => {
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	switch (mouse.plano_pto) {
		case 'top':
			plano.y_ini = plano.y_ini + recorrido_y;
			u_planoOrdenadas(plano);
			break;
		case 'button':
			plano.y_fin = plano.y_fin + recorrido_y;
			u_planoOrdenadas(plano);
			break;
		case 'right':
			plano.x_fin = plano.x_fin + recorrido_x;
			u_planoAbscisas(plano);
			break;
		case 'lefth':
			plano.x_ini = plano.x_ini + recorrido_x;
			u_planoAbscisas(plano);
			break;
		default:
			console.log('ocurrio un error: u_planoUpdateZise');
			break;
	}
	return plano;
};
// CUADRADO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CUADRADO
const u_planoBuscaPtoClickParaRedimencionar = (x, y, plano) => {
	let array = u_planoGetPtsRedimencion(plano);
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
// PLANO: GET
const u_planoGetClick = (array, x, y) => {
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
// PLANO: SI SE HIZO CLICK SOBRE UN PLANO, PODREMOS EDITAR ZISE U MOVER
const u_planoClickSobrePlano = (planoSelect, mouse) => {
	if (planoSelect) {
		mouse.plano_mover = true;
		mouse.plano_mover_pts = false;
		mouse.plano_seleccionar_pts = true;
	} else{
		mouse.plano_mover = false;
		mouse.plano_mover_pts = false;
		mouse.plano_seleccionar_pts =false;
	}
}
// PLANO: BUSCA PLANO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_planoOpera = (context, planoSelect, array, mouse) => {
	if (mouse.plano_seleccionar_pts){
		mouse.plano_pto = u_planoBuscaPtoClickParaRedimencionar(
			mouse.pos.x, mouse.pos.y, planoSelect
		);
		if(mouse.plano_pto != '') {
			mouse.plano_mover = false;
			mouse.plano_mover_pts = true;
		} else {
			mouse.plano_mover = false;
			mouse.plano_mover_pts = false; // move_size
			mouse.plano_seleccionar_pts = false;
		}
	}
	if (!mouse.plano_seleccionar_pts){
		planoSelect = u_planoGetClick(array, mouse.pos.x, mouse.pos.y);
		u_planoClickSobrePlano(planoSelect, mouse);
	}
	return planoSelect;
}
// PLANO: SEGMENTADO:
const u_planoBordeSegmentado = (context, plano) => {
	context.strokeStyle = '#1976d2'; // borde Color
	context.lineWidth = 2; // borde grosor de linea
	context.setLineDash([5, 5]); // lineas segmentadas

	let x_ini = plano.x_ini - 2;
	let y_ini = plano.y_ini - 2;
	let x_fin = plano.x_fin + 2;
	let y_fin = plano.y_fin + 2;

	context.beginPath();
	context.moveTo(x_ini, y_ini); // (x_ini, y_ini)
	context.lineTo(x_fin, y_ini); // (x_fin, y_ini)
	context.lineTo(x_fin, y_fin); // (x_fin, y_fin)
	context.lineTo(x_ini, y_fin); // (x_ini, y_fin)
	context.lineTo(x_ini, y_ini); // (x_ini, y_ini)
	context.stroke();
	context.closePath();

	context.strokeStyle = '#1976d2';
	context.fillStyle = 'white'; // borde Color
	context.setLineDash([0, 0]); // lineas segmentadas

	let array = u_planoGetPtsRedimencion(plano);
	array.forEach((elem) => {
		context.beginPath();
		context.moveTo(elem.x1, elem.y1); // (x_ini, y_ini)
		context.lineTo(elem.x2, elem.y1); // (x_fin, y_ini)
		context.lineTo(elem.x2, elem.y2); // (x_fin, y_fin)
		context.lineTo(elem.x1, elem.y2); // (x_ini, y_fin)
		context.lineTo(elem.x1, elem.y1); // (x_ini, y_ini)
		context.fill();
		context.stroke();
		context.closePath();
	});
};
const u_planoGetColores = (color) => {
	switch (color) {
		case 'black':
			return {
				color1: 'black',
				color2: 'red',
				color3: 'blue',
				color4: 'green',
				color5: 'orange',
			}
			break;
		case 'red':
			return {
				color1: 'red',
				color2: 'black',
				color3: 'blue',
				color4: 'green',
				color5: 'orange',
			}
			break;
		case 'green':
			return {
				color1: 'green',
				color2: 'red',
				color3: 'blue',
				color4: 'black',
				color5: 'orange',
			}
			break;
		case 'blue':
			return {
				color1: 'blue',
				color2: 'red',
				color3: 'black',
				color4: 'green',
				color5: 'orange',
			}
			break;
		case 'yellow':
			return {
				color1: 'orange',
				color2: 'red',
				color3: 'blue',
				color4: 'green',
				color5: 'black',
			}
			break;
	}
}
export {
	uPlano_graficaCuadrado,
	uPlano_graficaCuadradoConEjes,
	u_planoGraficaH,
	u_planoDeleteById,
	u_planoSegmentado,
	u_planoMover,
	u_planoGetPtsRedimencion,
	u_planoUpdateZise,
	u_planoOpera,
	u_planoBordeSegmentado,
	u_planoDraw,
	u_planoClickTrue,
	u_planoOrdenadas,
	u_planoAbscisas
};
