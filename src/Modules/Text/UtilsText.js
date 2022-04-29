// TEXTO: GRAFICA
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "../Circle/UtilsCirculo";
import {convertDegToRadians}                                                                    from "../../utils/math";
import {
	anguloEntreDosRectasCaso1,
	anguloEntreDosRectasCaso2, circunferenciaConCentroRadio, interseccionRectaCircunferencia,
	rectaQuePasaPorDosPtos,
	u_distanciaEntreDosPtos, u_estaPtoInTriangle
} from "../../utils/geometriaAnalitica";

const u_textPositionCursor = (text) => {
	let line = {x_ini:text.x_ini, y_ini:text.y_ini - 3, x_fin:text.x_ini, y_fin:text.y_fin+3};
	if (text.fontText.length > 0) {
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
		let x = text.fontText.slice(0, text.cursor);

		context.fillStyle = text.fontColor; //color de relleno
		context.textAlign = text.fontAlign;
		context.textBaseline = text.fontBaseline;
		context.font = `${text.fontBold} ${text.fontItalic} ${text.fontSize}px ${text.fontTypografia}`; //estilo de texto
		context.beginPath(); //iniciar ruta
		context.fillText(x, text.x_ini, text.y_ini); //texto con método stroke
		context.closePath();
		let dimensiones = context.measureText(x);
		line.x_ini = text.x_ini + dimensiones.width;
		line.x_fin = line.x_ini;
		line.y_ini = text.y_ini - 3;
		line.y_fin = text.y_ini + text.fontSize + 3;
		//line.y_fin = line.y_ini + text.fontSize;
	}
	return line;
}
const u_textLineAnimation = (context, line, colorLineAnimation) => {
	// Linea:
	context.lineWidth = 2;
	context.strokeStyle = colorLineAnimation;
	context.setLineDash([0, 0]);
	context.beginPath();
	context.moveTo(line.x_ini, line.y_ini);
	context.lineTo(line.x_fin, line.y_fin);
	context.stroke();
	context.closePath();
}

const u_textGraficaFontEdit = (context, text, boolean) => {
	context.fillStyle = text.fontColor; //color de relleno
	context.textAlign = text.fontAlign;
	context.textBaseline = text.fontBaseline;
	context.font = `${text.fontBold} ${text.fontItalic} ${text.fontSize}px ${text.fontTypografia}`; //estilo de texto
	context.beginPath(); //iniciar ruta
	context.fillText(text.fontText, text.x_ini, text.y_ini); //texto con método stroke
	context.closePath();

	let dimensiones = context.measureText(text.fontText);
	text.x_fin = text.x_ini + dimensiones.width;
	text.y_fin = text.y_ini + text.fontSize;

	//text.vertex = {x_ini:text.x_fin + 5, y_ini:text.y_ini - 15, x_fin:text.x_fin + 15, y_fin:text.y_ini-5};
	text.pto = {x_ini:text.x_ini - 5, y_ini:text.y_ini - 5, x_fin:text.x_ini + 5, y_fin:text.y_ini + 5};
	text.vertex = [
		{ x : text.x_ini, y : text.y_ini },
		{ x : text.x_fin, y : text.y_ini},
		{ x : text.x_fin, y : text.y_fin},
		{ x : text.x_ini, y : text.y_fin},
	];

	// UNDERLINE: Texto Sub-rayado
	if(text.fontUnderL === 'underlined'){
		context.beginPath(); //iniciar ruta
		context.lineWidth = 2;
		context.strokeStyle = text.fontColor;
		context.moveTo(text.x_ini, text.y_fin+1);
		context.lineTo(text.x_fin, text.y_fin+1);
		context.stroke();
		context.closePath();
	}

	// BORDE:
	if (boolean) {
		context.beginPath(); //iniciar ruta
		context.lineJoin = "miter";
		context.strokeStyle = "rgb(174, 214, 241)";
		context.setLineDash([5, 5]);
		context.lineWidth = 3;
		//context.strokeRect(text.x_ini - 10,text.y_ini - 10,text.x_fin - text.x_ini + 20,text.y_fin - text.y_ini + 20);
		context.strokeRect(text.x_ini - 15,text.y_ini - 15,text.x_fin - text.x_ini + 30,text.y_fin - text.y_ini + 30);
		context.stroke();
		context.closePath();

		context.beginPath();
		context.setLineDash([0, 0]);
		context.strokeStyle="rgba(174, 214, 241,0.3)";
		context.lineWidth = 10;
		context.strokeRect(text.x_ini - 10,text.y_ini - 10,text.x_fin - text.x_ini + 20,text.y_fin - text.y_ini + 20);
		context.stroke();
		context.closePath();

		context.beginPath();
		context.setLineDash([0, 0]);
		context.strokeStyle="rgba(174, 214, 241,0.3)";
		context.lineWidth = 10;
		context.strokeRect(text.x_ini - 10,text.y_ini - 10,text.x_fin - text.x_ini + 20,text.y_fin - text.y_ini + 20);
		context.stroke();
		context.closePath();
	}
};
const u_textGrafica = (context, text) => {
	if (text.rotateDeg === 0) {
		context.fillStyle = text.fontColor; //color de relleno
		context.textAlign = text.fontAlign;
		context.textBaseline = text.fontBaseline;
		context.font = `${text.fontBold} ${text.fontItalic} ${text.fontSize}px ${text.fontTypografia}`; //estilo de texto
		context.beginPath(); //iniciar ruta
		context.fillText(text.fontText, text.x_ini, text.y_ini); //texto con método stroke
		context.closePath();

		// UNDERLINE:
		if(text.fontUnderL === 'underlined'){
			context.beginPath(); //iniciar ruta
			context.lineWidth = 2;
			context.strokeStyle = text.fontColor;
			context.moveTo(text.x_ini, text.y_fin+1);
			context.lineTo(text.x_fin, text.y_fin+1);
			context.stroke();
			context.closePath();
		}
	} else {
		context.fillStyle = text.fontColor; //color de relleno
		context.textAlign = text.fontAlign;
		context.textBaseline = text.fontBaseline;
		context.font = `${text.fontBold} ${text.fontItalic} ${text.fontSize}px ${text.fontTypografia}`; //estilo de texto

		context.beginPath(); //iniciar ruta
		context.save();
		context.translate(text.h,text.k);
		context.rotate(convertDegToRadians(text.rotateDeg));
		context.fillText(text.fontText, -text.width/2, -text.height/2); //texto con método stroke
		context.restore();
		context.closePath();

		// UNDERLINE:
		if(text.fontUnderL === 'underlined') {
			context.beginPath(); //iniciar ruta
			context.lineWidth = 2;
			context.strokeStyle = text.fontColor;
			context.moveTo(text.vertex[3].x, text.vertex[3].y + 1);
			context.lineTo(text.vertex[2].x, text.vertex[2].y + 1);
			context.stroke();
			context.closePath();
		}
	}
};
const u_textGrafica_ = (context, text) => {
	context.fillStyle = text.fontColor; //color de relleno
	context.textAlign = text.fontAlign;
	context.textBaseline = text.fontBaseline;
	context.font = `${text.fontBold} ${text.fontItalic} ${text.fontSize}px ${text.fontTypografia}`; //estilo de texto
	context.beginPath(); //iniciar ruta
	context.fillText(text.fontText, text.x_ini, text.y_ini); //texto con método stroke
	context.closePath();

	// UNDERLINE:
	if(text.fontUnderL === 'underlined'){
		context.beginPath(); //iniciar ruta
		context.lineWidth = 2;
		context.strokeStyle = text.fontColor;
		context.moveTo(text.x_ini, text.y_fin+1);
		context.lineTo(text.x_fin, text.y_fin+1);
		context.stroke();
		context.closePath();
	}
};
// TEXTO: GRAFICA HISORIA
const u_textGraficaH = (context, array) => {
	array.forEach((element) => {
		if (element.visible) {
			u_textGrafica(context, element);
		}
	});
};
// TEXTO: GRAFICA HISORIA
const u_textGraficaH2 = (context, array) => {
	for (let i = 0; i < array.length; i++){
		let elm = array[i];
		(i === array.length -1)
			? u_textGraficaFontEdit(context, elm, true)
			: u_textGraficaFontEdit(context, elm, false);
	}
};
// TEXTO: GET
const u_getTextId = (array, x, y) => {
	let id = -1;
	array.forEach((text) => {
		(text.visible && text.edit)
			? ((text.x_ini < x && x < text.x_fin && text.y_ini < y && y < text.y_fin) ? (id = text.id) : '')
			: '';
	});
	return id;
};
const u_textClickTrue = (text, x, y) => {
	return (text.x_ini < x && x < text.x_fin && text.y_ini < y && y < text.y_fin);
};
// TEXTO: DELETE POR ID
const u_textDeleteById = (array, id) => {
	let newArray = [];
	for(let elm of array)
		elm.id !== id ? newArray.push(elm):'';
	return newArray;
};
// TEXTO: MOVER
const u_textMover = (text, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	text.x_ini = text.x_ini + recorrido_x;
	text.x_fin = text.x_fin + recorrido_x;
	text.y_ini = text.y_ini + recorrido_y;
	text.y_fin = text.y_fin + recorrido_y;
	text.line.x_ini += recorrido_x;
	text.line.x_fin += recorrido_x;
	text.line.y_ini += recorrido_y;
	text.line.y_fin += recorrido_y;

	// CUADRADITO:
	text.pto.x_ini += recorrido_x;
	text.pto.x_fin += recorrido_x;
	text.pto.y_ini += recorrido_y;
	text.pto.y_fin += recorrido_y;

	// VERTICES:
	text.vertex[0] = { x : text.vertex[0].x + recorrido_x, y : text.vertex[0].y + recorrido_y};
	text.vertex[1] = { x : text.vertex[1].x + recorrido_x, y : text.vertex[1].y + recorrido_y};
	text.vertex[2] = { x : text.vertex[2].x + recorrido_x, y : text.vertex[2].y + recorrido_y};
	text.vertex[3] = { x : text.vertex[3].x + recorrido_x, y : text.vertex[3].y + recorrido_y};

	// RADIO X Y
	text.radioX += recorrido_x;
	text.radioY += recorrido_y;

	// CENTRO:
	text.h += recorrido_x;
	text.k += recorrido_y;

	return text;
};
// TEXT: GET
const u_textGetClick = (array, x, y) => {
	let resp = '';
	let resp1 = false;
	let resp2 = false;
	array.forEach((text) => {
		let p = {x: x, y: y};
		let tri1 = {
			x1:text.vertex[0].x, y1:text.vertex[0].y,
			x2:text.vertex[1].x, y2:text.vertex[1].y,
			x3:text.vertex[2].x, y3:text.vertex[2].y,
		};
		let tri2 = {
			x1:text.vertex[0].x, y1:text.vertex[0].y,
			x2:text.vertex[2].x, y2:text.vertex[2].y,
			x3:text.vertex[3].x, y3:text.vertex[3].y,
		};
		resp1 = u_estaPtoInTriangle(p, tri1);
		resp2 = u_estaPtoInTriangle(p, tri2);
		(resp1 || resp2) ? resp = text:'';
	});
	return resp;
};
// TEXT: SI SE HIZO CLICK SOBRE UN LAPIZ, PODREMOS MOVER
const u_textClickSobreText = (textSelect, mouse) => {
	if (textSelect) {
		mouse.text_mover = true;
		mouse.text_mover_pts = false
		mouse.text_seleccionar_pts = true;
	} else {
		mouse.text_mover = false;
		mouse.text_mover_pts = false
		mouse.text_seleccionar_pts = false;
	}
}

// TEXT: BUSCA TEXT PARA PODER MOVERLO O EDITAR SU TAMANO
const u_textOpera = (textSelect, array, mouse) => {
	if (mouse.text_seleccionar_pts) {
		mouse.text_pto = u_textSearchPtoClickResize(mouse.pos.x, mouse.pos.y, textSelect);
		if (mouse.text_pto !== '') {
			mouse.text_mover = false;
			mouse.text_mover_pts = true;
		} else {
			mouse.text_mover = false;
			mouse.text_mover_pts = false;
			mouse.text_seleccionar_pts = false;
		}
	}
	if (!mouse.text_seleccionar_pts) {
		textSelect = u_textGetClick(array, mouse.pos.x, mouse.pos.y);
		u_textClickSobreText(textSelect, mouse);
	}
	return textSelect;
}
const u_textBordeSegmentado = (context, text) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([5, 5]); // lineas segmentadas

	context.beginPath();
	context.moveTo(text.vertex[0].x, text.vertex[0].y);
	context.lineTo(text.vertex[1].x, text.vertex[1].y);
	context.lineTo(text.vertex[2].x, text.vertex[2].y);
	context.lineTo(text.vertex[3].x, text.vertex[3].y);
	context.lineTo(text.vertex[0].x, text.vertex[0].y);
	context.stroke();
	context.closePath();

	// CUADRADITO PARA ROTAR:
	context.fillStyle = 'red'; // borde Color
	context.beginPath();
	context.moveTo(text.pto.x_ini, text.pto.y_ini); // (x_ini, y_ini)
	context.lineTo(text.pto.x_fin, text.pto.y_ini); // (x_fin, y_ini)
	context.lineTo(text.pto.x_fin, text.pto.y_fin); // (x_fin, y_fin)
	context.lineTo(text.pto.x_ini, text.pto.y_fin); // (x_ini, y_fin)
	context.lineTo(text.pto.x_ini, text.pto.y_ini); // (x_ini, y_ini)
	context.fill();

	// CIRCULO
	/*context.setLineDash([5, 5]);
	context.beginPath();
    context.arc(text.h, text.k, text.radio, 0, 2*Math.PI, true);
    context.stroke();
    context.closePath();*/

	// radio:
	/*context.beginPath();
	context.moveTo(text.h, text.k);
	context.lineTo(text.radioX, text.radioY);
	context.stroke();
	context.closePath();*/
};
// RESIZE:
const u_textSearchPtoClickResize = (x, y, text) => {
	let resp = '';
	if (text.pto.x_ini <= x && x <= text.pto.x_fin && text.pto.y_ini <= y && y <= text.pto.y_fin ) {
		resp = 'ini';
		text.radioX = text.x_ini;
		text.radioY = text.y_ini;
	}
	return resp;
}
// ROTATE:
const u_textRotate = (text, mouse) => {
	// RECTA 1:
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	text.radioX += recorrido_x;
	text.radioY += recorrido_y;
	let rec1 = rectaQuePasaPorDosPtos({x:text.radioX, y:text.radioY}, {x:text.h, y:text.k});
	let cir1 = circunferenciaConCentroRadio({h:text.h, k:text.k}, text.radio);
	let resp1 = interseccionRectaCircunferencia(rec1, cir1);
	let d1_1 = u_distanciaEntreDosPtos({x:resp1.x1, y:resp1.y1}, {x:text.x_ini, y:text.y_ini});
	let d1_2 = u_distanciaEntreDosPtos({x:resp1.x2, y:resp1.y2}, {x:text.x_ini, y:text.y_ini});

	if (d1_1 < d1_2) {
		text.x_ini = resp1.x1;
		text.y_ini = resp1.y1;
		text.pto = {x_ini:text.x_ini - 5, y_ini:text.y_ini - 5, x_fin:text.x_ini + 5, y_fin:text.y_ini + 5};
		text.vertex[0] = { x : resp1.x1, y : resp1.y1 };
		text.vertex[2] = { x : resp1.x2, y : resp1.y2};
	} else {
		text.x_ini = resp1.x2;
		text.y_ini = resp1.y2;
		text.pto = {x_ini:text.x_ini - 5, y_ini:text.y_ini - 5, x_fin:text.x_ini + 5, y_fin:text.y_ini + 5};
		text.vertex[0] = { x : resp1.x2, y : resp1.y2 };
		text.vertex[2] = { x : resp1.x1, y : resp1.y1};
	}
	// RECTA 2:
	let rec2 = anguloEntreDosRectasCaso1(rec1, -text.angulo, {x:text.h, y:text.k});
	let resp2 = interseccionRectaCircunferencia(rec2, cir1);
	let d2_1 = u_distanciaEntreDosPtos({x:resp2.x1, y:resp2.y1}, {x:text.x_ini, y:text.y_ini});
	let d2_2 = u_distanciaEntreDosPtos({x:resp2.x2, y:resp2.y2}, {x:text.x_ini, y:text.y_ini});
	if (d2_1 < d2_2) {
		text.vertex[3] = { x : resp2.x1, y : resp2.y1};
		text.vertex[1] = { x : resp2.x2, y : resp2.y2};
	} else {
		text.vertex[3] = { x : resp2.x2, y : resp2.y2};
		text.vertex[1] = { x : resp2.x1, y : resp2.y1};
	}
	// ROTA TEXT:
	let rec3 = rectaQuePasaPorDosPtos({x:text.x_ini, y:text.y_ini}, {x:text.h, y:text.k});
	let rec4 = rectaQuePasaPorDosPtos({x:text.h - 1, y:text.k}, {x:text.h, y:text.k});
	let angulo = anguloEntreDosRectasCaso2(rec3, rec4);
	text.rotateDeg = angulo - text.rotateDegPrev;

	//text.radioX = text.x_ini;
	//text.radioY = text.y_ini;

	return text;
}

// VALIDA TECLAS ASCCI:
const u_textValidChar = (ascci) => {
	return (32 === ascci) || (65 <= ascci && ascci <= 90) || (48 <= ascci && ascci <= 57) || (186 <= ascci && ascci <= 192) || (219 <= ascci && ascci <= 222);
}

// ANGULO ENTRE DOS RECTAS:
const u_textAngulo = (text) => {
	let h = text.x_ini + (text.x_fin - text.x_ini)/2;
	let k = text.y_ini + (text.y_fin - text.y_ini)/2;
	text.h = h;
	text.k = k;

	let r1 = rectaQuePasaPorDosPtos({x:text.x_ini, y:text.y_ini},{x:text.h, y: text.k});
	let r2 = rectaQuePasaPorDosPtos({x:text.x_ini, y:text.y_fin},{x:text.h, y: text.k});
	let angulo = anguloEntreDosRectasCaso2(r1, r2);
	text.angulo = angulo;

	let radio = u_distanciaEntreDosPtos({x:text.x_ini, y:text.y_ini},{x:text.h, y:text.k});
	text.radio = radio;

	text.width = text.x_fin - text.x_ini;
	text.height = text.y_fin - text.y_ini;

	//console.log('angulo: ', angulo);
	if (text.rotateDegPrev === 0) {
		let rec1 = rectaQuePasaPorDosPtos({x:text.x_ini, y:text.y_ini}, {x:text.h, y:text.k});
		let rec2 = rectaQuePasaPorDosPtos({x:text.h - 1, y:text.k}, {x:text.h, y:text.k});
		let angulo2 = anguloEntreDosRectasCaso2(rec1, rec2);
		text.rotateDegPrev = angulo2;
	}

	return text;
}
export {
	u_textGraficaH,
	u_textGrafica,
	u_getTextId,
	u_textMover,
	u_textDeleteById,
	u_textOpera,
	u_textBordeSegmentado,
	u_textGraficaFontEdit,
	u_textGraficaH2,
	u_textClickTrue,
	u_textLineAnimation,
	u_textValidChar,
	u_textPositionCursor,
	u_textRotate,
	u_textAngulo
};
