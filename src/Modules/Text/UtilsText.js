// TEXTO: GRAFICA
import {u_circuloBuscaPtoClickParaRedimencionar, u_circuloClickSobreCirculo, u_circuloGetClick} from "../Circle/UtilsCirculo";

const u_textLineAnimation = (context, text, colorLineAnimation) => {
	// Linea:
	context.lineWidth = 2;
	context.strokeStyle = colorLineAnimation;
	context.setLineDash([0, 0]);
	context.beginPath();
	context.moveTo(text.x_fin+3, text.y_ini-3);
	context.lineTo(text.x_fin+3, text.y_fin+3);
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

	/*let dimensiones = context.measureText(text.fontText);
	text.x_fin = text.x_ini + dimensiones.width;
	text.y_fin = text.y_ini + text.fontSize;*/
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
const u_textMover = (texto, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	texto.x_ini = texto.x_ini + recorrido_x;
	texto.x_fin = texto.x_fin + recorrido_x;
	texto.y_ini = texto.y_ini + recorrido_y;
	texto.y_fin = texto.y_fin + recorrido_y;
	return texto;
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
// TEXT: SI SE HIZO CLICK SOBRE UN LAPIZ, PODREMOS MOVER
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
	u_getTextId,
	u_textMover,
	u_textDeleteById,
	u_textOpera,
	u_textBordeSegmentado,
	u_textGraficaFontEdit,
	u_textGraficaH2,
	u_textClickTrue,
	u_textLineAnimation,
};
