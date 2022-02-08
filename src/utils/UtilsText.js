// TEXTO: GRAFICA
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "./UtilsCirculo";

const u_textGrafica = (context, obj) => {
	context.fillStyle = obj.color;
	context.font = `${obj.tamano}px arial`;
	context.beginPath();
	context.fillText(obj.texto, obj.x_ini, obj.y_fin);
	context.stroke(); // quit
	context.closePath();
};
// TEXTO: GRAFICA HISORIA
const u_textGraficaH = (context, array) => {
	array.forEach((element) => {
		if (element.visible) {
			u_textGrafica(context, element);
		}
	});
};
// TEXTO: GET
const u_getText = (array, x, y) => {
	let resp = '';
	array.forEach((texto) => {
		let x1 = texto.x_ini;
		let x2 = x1 + 100;
		let y1 = texto.y_ini - 50;
		let y2 = texto.y_ini;
		if (texto.visible) {
			x1 < x && x < x2 && y1 < y && y < y2 ? (resp = texto) : '';
		}
	});
	return resp;
};
// TEXTO: MOVER
const u_textMover = (texto, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	texto.x_ini = texto.x_ini + recorrido_x;
	texto.x_fin = texto.x_fin + recorrido_x;
	texto.y_ini = texto.y_ini + recorrido_y;
	texto.y_fin = texto.y_fin + recorrido_y;
	return texto;
};
// TEXTO: DELETE POR ID
const u_textDeleteById = (array, id) => {
	array.forEach((element) => {
		element.id == id ? (element.visible = false) : '';
	});
};
// TEXT: GET
const u_textGetClick = (array, x, y) => {
	let resp = '';
	array.forEach((text) => {
		(text.visible && (text.x_ini < x && x < text.x_fin && text.y_ini < y && y < text.y_fin))
		? resp = text:'';
	});
	return resp;
};
// LAPIZ: SI SE HIZO CLICK SOBRE UN LAPIZ, PODREMOS MOVER
const u_textClickSobreText = (textSelect, mouse) => {
	(textSelect) ? mouse.text_mover = true : mouse.text_mover = false;
}
// TEXT: BUSCA TEXT PARA PODER MOVERLO O EDITAR SU TAMANO
const u_textOpera = (textSelect, array, mouse) => {
	textSelect = u_textGetClick(array, mouse.pos.x, mouse.pos.y);
	u_textClickSobreText(textSelect, mouse);
	return textSelect;
}
const u_textBordeSegmentado = (context, text) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	context.beginPath();
	context.moveTo(text.x_ini, text.y_ini); // (x_ini, y_ini)
	context.lineTo(text.x_fin, text.y_ini); // (x_fin, y_ini)
	context.lineTo(text.x_fin, text.y_fin); // (x_fin, y_fin)
	context.lineTo(text.x_ini, text.y_fin); // (x_ini, y_fin)
	context.lineTo(text.x_ini, text.y_ini); // (x_ini, y_ini)
	context.stroke();
	context.closePath();
};
export {
	u_textGraficaH,
	u_textGrafica,
	u_getText,
	u_textMover,
	u_textDeleteById,
	u_textOpera,
	u_textBordeSegmentado
};
