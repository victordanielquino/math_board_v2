// TEXTO: GRAFICA
const u_textGrafica = (context, obj) => {
	context.fillStyle = obj.color;
	context.font = `${obj.tamano}px arial`;
	context.beginPath();
	context.fillText(obj.texto, obj.x_ini, obj.y_ini);
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
	console.log(array, x, y);
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
	console.log('resp:', resp);
	return resp;
};
// TEXTO: MOVER
const u_textMover = (texto, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	texto.x_ini = texto.x_ini + recorrido_x;
	texto.y_ini = texto.y_ini + recorrido_y;
	return texto;
};
// TEXTO: DELETE POR ID
const u_textDeleteById = (array, id) => {
	array.forEach((element) => {
		element.id == id ? (element.visible = false) : '';
	});
};
export {
	u_textGraficaH,
	u_textGrafica,
	u_getText,
	u_textMover,
	u_textDeleteById,
};
