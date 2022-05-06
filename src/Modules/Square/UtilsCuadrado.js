// cuadrado segmentado:
import {
	anguloEntreDosRectasCaso1,
	anguloEntreDosRectasCaso2,
	circunferenciaConCentroRadio,
	interseccionRectaCircunferencia,
	rectaQuePasaPorDosPtos,
	u_distanciaEntreDosPtos,
	u_estaPtoInTriangle,
	u_intersectionnToTwoRects,
	u_ptoMedio,
	u_rectaParalela,
	u_rectToPerpendicular
} from "../../utils/geometriaAnalitica";
import {convertDegToRadians, cosX, sinX} from "../../utils/math";

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

const u_squareClickTrue = (elem, x, y) => {
	return (elem.x_ini < x && x < elem.x_fin && elem.y_ini < y && y < elem.y_fin);
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
const u_squareDraw = (context, cuadrado) => {
	context.strokeStyle = cuadrado.bordeColor; // bordeColor
	context.fillStyle = cuadrado.fondoColor; // fondoColor
	context.lineWidth = cuadrado.bordeGrosor; // bordeGrosor
	context.setLineDash([0, 0]); // lineas no segmentadas

	context.beginPath();
	context.moveTo(cuadrado.vertex[0].x, cuadrado.vertex[0].y); // (x_ini, y_ini)
	context.lineTo(cuadrado.vertex[1].x, cuadrado.vertex[1].y); // (x_fin, y_ini)
	context.lineTo(cuadrado.vertex[2].x, cuadrado.vertex[2].y); // (x_fin, y_fin)
	context.lineTo(cuadrado.vertex[3].x, cuadrado.vertex[3].y); // (x_ini, y_fin)
	context.lineTo(cuadrado.vertex[0].x, cuadrado.vertex[0].y); // (x_ini, y_ini)

	cuadrado.fondoEstado ? context.fill() : ''; // fondoColor = true
	cuadrado.bordeEstado ? context.stroke() : ''; // bordeColor = true
	context.closePath();
};
const u_cuadradoGraficaH = (context, array) => {
	array.forEach((element) => u_squareDraw(context, element));
};

// CUADRADO: MOVER
const u_cuadradoMover = (cuadrado, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	// vertex:
	cuadrado.vertex[0].x += recorrido_x; cuadrado.vertex[0].y += recorrido_y;
	cuadrado.vertex[1].x += recorrido_x; cuadrado.vertex[1].y += recorrido_y;
	cuadrado.vertex[2].x += recorrido_x; cuadrado.vertex[2].y += recorrido_y;
	cuadrado.vertex[3].x += recorrido_x; cuadrado.vertex[3].y += recorrido_y;
	cuadrado.vertex[4].x += recorrido_x; cuadrado.vertex[4].y += recorrido_y;
	cuadrado.vertex[5].x += recorrido_x; cuadrado.vertex[5].y += recorrido_y;
	cuadrado.vertex[6].x += recorrido_x; cuadrado.vertex[6].y += recorrido_y;
	cuadrado.vertex[7].x += recorrido_x; cuadrado.vertex[7].y += recorrido_y;
	// pts:
	cuadrado.pts[0].x_ini += recorrido_x; cuadrado.pts[0].y_ini += recorrido_y;
	cuadrado.pts[0].x_fin += recorrido_x; cuadrado.pts[0].y_fin += recorrido_y;
	cuadrado.pts[1].x_ini += recorrido_x; cuadrado.pts[1].y_ini += recorrido_y;
	cuadrado.pts[1].x_fin += recorrido_x; cuadrado.pts[1].y_fin += recorrido_y;
	cuadrado.pts[2].x_ini += recorrido_x; cuadrado.pts[2].y_ini += recorrido_y;
	cuadrado.pts[2].x_fin += recorrido_x; cuadrado.pts[2].y_fin += recorrido_y;
	cuadrado.pts[3].x_ini += recorrido_x; cuadrado.pts[3].y_ini += recorrido_y;
	cuadrado.pts[3].x_fin += recorrido_x; cuadrado.pts[3].y_fin += recorrido_y;
	cuadrado.pts[4].x_ini += recorrido_x; cuadrado.pts[4].y_ini += recorrido_y;
	cuadrado.pts[4].x_fin += recorrido_x; cuadrado.pts[4].y_fin += recorrido_y;
	// h,k:
	cuadrado.h += recorrido_x; cuadrado.k += recorrido_y;
	// radioX, radioY:
	cuadrado.radioX += recorrido_x; cuadrado.radioY += recorrido_y;
	return cuadrado;
};
// UPDATE ZISE CUADRADO SELECT:
const u_cuadradoUpdateZise = (square, mouse) => {
	let rec1, rec2, rec3, pto1, pto2, recParalalela, ptoMedio, recCentro, recPerpendicular1, recPerpendicular2;
	switch (mouse.cuadrado_pto) {
		case 0:
			let cir = circunferenciaConCentroRadio({h:square.h, k: square.k}, u_distanciaEntreDosPtos(square.vertex[0], {x:square.h, y:square.k}));
			let recRadio = rectaQuePasaPorDosPtos({x:mouse.pos.x, y:mouse.pos.y}, {x:square.h, y:square.k});
			let resp = interseccionRectaCircunferencia(recRadio, cir);
			let d1 = u_distanciaEntreDosPtos(square.vertex[0], {x:resp.x1, y:resp.y1});
			let d2 = u_distanciaEntreDosPtos(square.vertex[0], {x:resp.x2, y:resp.y2});
			if (d1 < d2) {
				square.vertex[0].x = resp.x1;
				square.vertex[0].y = resp.y1;
				square.vertex[2].x = resp.x2;
				square.vertex[2].y = resp.y2;
			} else {
				square.vertex[0].x = resp.x2;
				square.vertex[0].y = resp.y2;
				square.vertex[2].x = resp.x1;
				square.vertex[2].y = resp.y1;
			}
			// 2da recta: vertices 1 y 3
			rec1 = rectaQuePasaPorDosPtos(square.vertex[0], square.vertex[2]);
			rec2 = anguloEntreDosRectasCaso1(rec1, 180 - square.angulo, {x:square.h, y:square.k});
			let resp2 = interseccionRectaCircunferencia(rec2, cir);
			if (square.angulo < 90) {
				d1 = u_distanciaEntreDosPtos(square.vertex[0], {x:resp2.x1, y:resp2.y1});
				d2 = u_distanciaEntreDosPtos(square.vertex[0], {x:resp2.x2, y:resp2.y2});
				if (d1 < d2) {
					square.vertex[3].x = resp2.x1;
					square.vertex[3].y = resp2.y1;
					square.vertex[1].x = resp2.x2;
					square.vertex[1].y = resp2.y2;
				} else {
					square.vertex[3].x = resp2.x2;
					square.vertex[3].y = resp2.y2;
					square.vertex[1].x = resp2.x1;
					square.vertex[1].y = resp2.y1;
				}
			}
			// pto: 4
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[1]);
			square.vertex[4].x = ptoMedio.x;
			square.vertex[4].y = ptoMedio.y;
			// pto: 5
			ptoMedio = u_ptoMedio(square.vertex[1], square.vertex[2]);
			square.vertex[5].x = ptoMedio.x;
			square.vertex[5].y = ptoMedio.y;
			// pto: 6
			ptoMedio = u_ptoMedio(square.vertex[2], square.vertex[3]);
			square.vertex[6].x = ptoMedio.x;
			square.vertex[6].y = ptoMedio.y;
			// pto: 7
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[3]);
			square.vertex[7].x = ptoMedio.x;
			square.vertex[7].y = ptoMedio.y;

			break;
		case 4:
			// recta que pasa por el centro
			recCentro = rectaQuePasaPorDosPtos(
				{x:square.vertex[5].x, y:square.vertex[5].y},
				{x:square.vertex[7].x, y:square.vertex[7].y},
			)
			// recta paralela a la recta que pasa por el centro:
			recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
			// rectas perpendiculares
			recPerpendicular1 = u_rectToPerpendicular(recCentro, square.vertex[7]);
			recPerpendicular2 = u_rectToPerpendicular(recCentro, square.vertex[5]);
			pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
			pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

			square.vertex[0].x = pto1.x;
			square.vertex[0].y = pto1.y;
			square.vertex[1].x = pto2.x;
			square.vertex[1].y = pto2.y;
			// pto: 4
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[1]);
			square.vertex[4].x = ptoMedio.x;
			square.vertex[4].y = ptoMedio.y;
			// pto: 5
			ptoMedio = u_ptoMedio(square.vertex[1], square.vertex[2]);
			square.vertex[5].x = ptoMedio.x;
			square.vertex[5].y = ptoMedio.y;
			// pto: 7
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[3]);
			square.vertex[7].x = ptoMedio.x;
			square.vertex[7].y = ptoMedio.y;
			// h, k
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[2]);
			square.h = ptoMedio.x;
			square.k = ptoMedio.y;
			// angulo:
			rec1 = rectaQuePasaPorDosPtos(square.vertex[0], {x:square.h, y:square.k});
			rec2 = rectaQuePasaPorDosPtos(square.vertex[3], {x:square.h, y:square.k});
			square.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
			break;
		case 5:
			recCentro = rectaQuePasaPorDosPtos(
				{x:square.vertex[4].x, y:square.vertex[4].y},
				{x:square.vertex[6].x, y:square.vertex[6].y},
			)
			recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
			// rectas perpendiculares
			recPerpendicular1 = u_rectToPerpendicular(recCentro, square.vertex[4]);
			recPerpendicular2 = u_rectToPerpendicular(recCentro, square.vertex[6]);
			pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
			pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

			square.vertex[1].x = pto1.x;
			square.vertex[1].y = pto1.y;
			square.vertex[2].x = pto2.x;
			square.vertex[2].y = pto2.y;

			// pto: 4
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[1]);
			square.vertex[4].x = ptoMedio.x;
			square.vertex[4].y = ptoMedio.y;
			// pto: 5
			ptoMedio = u_ptoMedio(square.vertex[1], square.vertex[2]);
			square.vertex[5].x = ptoMedio.x;
			square.vertex[5].y = ptoMedio.y;
			// pto: 6
			ptoMedio = u_ptoMedio(square.vertex[2], square.vertex[3]);
			square.vertex[6].x = ptoMedio.x;
			square.vertex[6].y = ptoMedio.y;
			// h, k
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[2]);
			square.h = ptoMedio.x;
			square.k = ptoMedio.y;
			// angulo:
			rec1 = rectaQuePasaPorDosPtos(square.vertex[0], {x:square.h, y:square.k});
			rec2 = rectaQuePasaPorDosPtos(square.vertex[3], {x:square.h, y:square.k});
			square.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
			break;
		case 6:
			recCentro = rectaQuePasaPorDosPtos(
				{x:square.vertex[5].x, y:square.vertex[5].y},
				{x:square.vertex[7].x, y:square.vertex[7].y},
			)
			recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
			// rectas perpendiculares
			recPerpendicular1 = u_rectToPerpendicular(recCentro, square.vertex[7]);
			recPerpendicular2 = u_rectToPerpendicular(recCentro, square.vertex[5]);
			pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
			pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

			square.vertex[3].x = pto1.x;
			square.vertex[3].y = pto1.y;
			square.vertex[2].x = pto2.x;
			square.vertex[2].y = pto2.y;
			//square.vertex[6] = u_ptoMedio(square.vertex[2], square.vertex[3]);
			// pto: 6
			ptoMedio = u_ptoMedio(square.vertex[2], square.vertex[3]);
			square.vertex[6].x = ptoMedio.x;
			square.vertex[6].y = ptoMedio.y;
			// pto: 5
			ptoMedio = u_ptoMedio(square.vertex[1], square.vertex[2]);
			square.vertex[5].x = ptoMedio.x;
			square.vertex[5].y = ptoMedio.y;
			// pto: 7
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[3]);
			square.vertex[7].x = ptoMedio.x;
			square.vertex[7].y = ptoMedio.y;
			// h, k
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[2]);
			square.h = ptoMedio.x;
			square.k = ptoMedio.y;
			// angulo:
			let r1 = rectaQuePasaPorDosPtos(square.vertex[0], {x:square.h, y:square.k});
			let r2 = rectaQuePasaPorDosPtos(square.vertex[3], {x:square.h, y:square.k});
			square.angulo = anguloEntreDosRectasCaso2(r1, r2);
			break;
		case 7:
			recCentro = rectaQuePasaPorDosPtos(
				{x:square.vertex[4].x, y:square.vertex[4].y},
				{x:square.vertex[6].x, y:square.vertex[6].y},
			)
			recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
			recPerpendicular1 = u_rectToPerpendicular(recCentro, square.vertex[4]);
			recPerpendicular2 = u_rectToPerpendicular(recCentro, square.vertex[6]);
			pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
			pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

			square.vertex[0].x = pto1.x;
			square.vertex[0].y = pto1.y;
			square.vertex[3].x = pto2.x;
			square.vertex[3].y = pto2.y;
			// pto: 4
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[1]);
			square.vertex[4].x = ptoMedio.x;
			square.vertex[4].y = ptoMedio.y;
			// pto: 6
			ptoMedio = u_ptoMedio(square.vertex[2], square.vertex[3]);
			square.vertex[6].x = ptoMedio.x;
			square.vertex[6].y = ptoMedio.y;
			// pto: 7
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[3]);
			square.vertex[7].x = ptoMedio.x;
			square.vertex[7].y = ptoMedio.y;
			// h, k
			ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[2]);
			square.h = ptoMedio.x;
			square.k = ptoMedio.y;
			// angulo:
			rec1 = rectaQuePasaPorDosPtos(square.vertex[0], {x:square.h, y:square.k});
			rec2 = rectaQuePasaPorDosPtos(square.vertex[3], {x:square.h, y:square.k});
			square.angulo = anguloEntreDosRectasCaso2(rec1, rec2);

			break;
		default:
			console.log('ocurrio un error');
			break;
	}
	return square;
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
const u_squareSearcVertexSize = (x, y, square) => {
	let resp = -1;
	let i = 0;
	let elm;
	while (i < 8) {
		elm = square.vertex[i];
		if (elm.x - 5 < x && x < elm.x + 5 && elm.y - 5 < y && y < elm.y + 5) {
			resp = elm.pto;
			break;
		}
		(i === 0) ? i = 3:'';
		i++;
	}
	return resp;
};
// CIRCULO: GET - CLICK
const u_cuadradoGetClick = (square, x, y) => {
	let resp = '';
	if (u_estaPtoInTriangle(
		{x:x, y:y},
		{
			x1:square.vertex[0].x, y1:square.vertex[0].y,
			x2:square.vertex[1].x, y2:square.vertex[1].y,
			x3:square.vertex[2].x, y3:square.vertex[2].y
		}) ||
		u_estaPtoInTriangle(
			{x:x, y:y},
			{
				x1:square.vertex[0].x, y1:square.vertex[0].y,
				x2:square.vertex[2].x, y2:square.vertex[2].y,
				x3:square.vertex[3].x, y3:square.vertex[3].y
			})
	) {
		square.move = true;
		resp = square;
	}
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
// SQUARE: Cuadrados pequnos:
const u_squareDrawPto = (context, square, colorFondo, colorBorde) => {
	context.setLineDash([0, 0]); // lineas segmentadas
	context.strokeStyle = colorBorde; // borde Color
	context.fillStyle = colorFondo; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.beginPath();
	/*context.moveTo(square.x_ini, square.y_ini); // (x_ini, y_ini)
	context.lineTo(square.x_fin, square.y_ini); // (x_fin, y_ini)
	context.lineTo(square.x_fin, square.y_fin); // (x_fin, y_fin)
	context.lineTo(square.x_ini, square.y_fin); // (x_ini, y_fin)
	context.lineTo(square.x_ini, square.y_ini); // (x_ini, y_ini)*/
	context.moveTo(square.x - 5, square.y - 5); // (x_ini, y_ini)
	context.lineTo(square.x + 5, square.y - 5); // (x_fin, y_ini)
	context.lineTo(square.x + 5, square.y + 5); // (x_fin, y_fin)
	context.lineTo(square.x - 5, square.y + 5); // (x_ini, y_fin)
	context.lineTo(square.x - 5, square.y - 5); // (x_ini, y_ini)
	context.fill();
	context.stroke();
	context.closePath();
}
// CUADRADO: CUADRADO SEGMENTADO ALREDEDOR DEL CIRCULO SELECCIONADO
const u_cuadradoBordeSegmentado = (context, cuadrado) => {
	context.strokeStyle = '#1976d2'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([5, 5]); // lineas segmentadas
	let margin = 0;
	context.beginPath();
	context.moveTo(cuadrado.vertex[0].x, cuadrado.vertex[0].y);
	context.lineTo(cuadrado.vertex[1].x, cuadrado.vertex[1].y);
	context.lineTo(cuadrado.vertex[2].x, cuadrado.vertex[2].y);
	context.lineTo(cuadrado.vertex[3].x, cuadrado.vertex[3].y);
	context.lineTo(cuadrado.vertex[0].x, cuadrado.vertex[0].y);
	context.stroke();
	context.closePath();

	context.strokeStyle = '#1976d2'; // borde Color
	context.fillStyle = 'white'; // borde Color
	context.setLineDash([0, 0]); // lineas segmentadas
	/*for (let elm of cuadrado.pts) {
		u_squareDrawPto(context, elm, 'white', '#1976d2')
	}*/
	u_squareDrawPto(context, cuadrado.vertex[0], 'white', '#1976d2')
	for (let i = 4; i < 8; i++) {
		u_squareDrawPto(context, cuadrado.vertex[i], 'white', '#1976d2')
	}
};
// CUADRADO: BUSCA CUADRADO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_cuadradoOpera = (cuadradoSelect, array, mouse) => {
	if (mouse.cuadrado_seleccionar_pts){
		mouse.cuadrado_pto = u_squareSearcVertexSize(
			mouse.pos.x, mouse.pos.y, cuadradoSelect
		);
		if(mouse.cuadrado_pto !== -1) {
			mouse.cuadrado_mover = false;
			mouse.cuadrado_mover_pts = true;
		} else {
			mouse.cuadrado_mover = false;
			mouse.cuadrado_mover_pts = false; // move_size
			mouse.cuadrado_seleccionar_pts = false;
		}
	}
	if (!mouse.cuadrado_seleccionar_pts){
		cuadradoSelect = u_cuadradoGetClick(array[0], mouse.pos.x, mouse.pos.y);
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
// SQUARE: set valores para rotar:
const u_squareSetIniitalRotate = (square) => {
	square.h = square.x_ini + (square.x_fin - square.x_ini) / 2;
	square.k = square.y_ini + (square.y_fin - square.y_ini) / 2;
	square.radioX = square.x_ini;
	square.radioY = square.y_ini;
	square.radio = u_distanciaEntreDosPtos({x:square.x_ini, y:square.y_ini}, {x:square.h, y:square.k});
	// angulo:
	let r1 = rectaQuePasaPorDosPtos({x:square.x_ini, y:square.y_ini}, {x:square.h, y:square.k});
	let r2 = rectaQuePasaPorDosPtos({x:square.x_ini, y:square.y_fin}, {x:square.h, y:square.k});
	square.angulo = anguloEntreDosRectasCaso2(r1, r2);
	// vertex:
	square.vertex = [
		{x:square.x_ini, y:square.y_ini, pto:0}, // 0
		{x:square.x_fin, y:square.y_ini, pto:1}, // 1
		{x:square.x_fin, y:square.y_fin, pto:2}, // 2
		{x:square.x_ini, y:square.y_fin, pto:3}, // 3
	]
	// pto:
	square.pts[0] = {pto: 0, x_ini:square.vertex[0].x - 5, y_ini:square.vertex[0].y - 5, x_fin:square.vertex[0].x + 5, y_fin:square.vertex[0].y + 5};

	let ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[1]);
	square.vertex.push({x:ptoMedio.x, y:ptoMedio.y, pto:4}); // 4
	square.pts[1] = {pto: 1, ptoMedio: ptoMedio, x_ini:ptoMedio.x - 5, y_ini:ptoMedio.y - 5, x_fin:ptoMedio.x + 5, y_fin:ptoMedio.y + 5};

	ptoMedio = u_ptoMedio(square.vertex[1], square.vertex[2]);
	square.vertex.push({x:ptoMedio.x, y:ptoMedio.y, pto:5}); // 5
	square.pts[2] = {pto: 2, ptoMedio: ptoMedio, x_ini:ptoMedio.x - 5, y_ini:ptoMedio.y - 5, x_fin:ptoMedio.x + 5, y_fin:ptoMedio.y + 5};

	ptoMedio = u_ptoMedio(square.vertex[2], square.vertex[3]);
	square.vertex.push({x:ptoMedio.x, y:ptoMedio.y, pto:6}); // 6
	square.pts[3] = {pto: 3, ptoMedio: ptoMedio, x_ini:ptoMedio.x - 5, y_ini:ptoMedio.y - 5, x_fin:ptoMedio.x + 5, y_fin:ptoMedio.y + 5};

	ptoMedio = u_ptoMedio(square.vertex[0], square.vertex[3]);
	square.vertex.push({x:ptoMedio.x, y:ptoMedio.y, pto:7}); // 7
	square.pts[4] = {pto: 4, ptoMedio: ptoMedio, x_ini:ptoMedio.x - 5, y_ini:ptoMedio.y - 5, x_fin:ptoMedio.x + 5, y_fin:ptoMedio.y + 5};

	return square;
}
export {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
	u_cuadradoGraficaH,
	u_cuadradoValidaPosicion,
	u_cuadradoMover,
	u_cuadradoGetPtsRedimencion,
	u_cuadradoUpdateZise,
	u_cuadradoOpera,
	u_cuadradoBordeSegmentado,
	u_squareDraw,
	u_squareClickTrue,
	u_squareDrawBorderSegment,
	u_squareSetIniitalRotate
};
