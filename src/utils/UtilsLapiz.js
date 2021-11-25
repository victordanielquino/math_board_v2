// LAPIZ: GRAFICA
const utilsLapiz_graficaLapiz = (context, lapiz) => {
	if (lapiz.visible) {
		context.lineWidth = lapiz.grosor;
		context.strokeStyle = lapiz.color;
		context.setLineDash([0, 0]);
		context.beginPath();
		let sw = true;
		lapiz.historiaLinea.forEach((element) => {
			sw ? context.moveTo(element[0], element[1]) : '';
			sw = false;
			context.lineTo(element[2], element[3]);
		});
		context.stroke();
		context.closePath();
	}
};
// LAPIZ: GRAFICA HISORIA:
const utilsLapiz_graficaLapizHistoria = (context, array) => {
	array.forEach((element) => utilsLapiz_graficaLapiz(context, element));
};

// LAPIZ: GET
const u_lapizGet = (array, x, y) => {
	let resp = '';
	array.forEach((lapiz) => {
		if (lapiz.visible) {
			let x1 = lapiz.x_min;
			let y1 = lapiz.y_min;
			let x2 = lapiz.x_may;
			let y2 = lapiz.y_may;
			if (x1 - 20 < x && x < x2 + 20 && y1 - 20 < y && y < y2 + 20) {
				resp = lapiz;
			}
		}
	});
	return resp;
};
// LAPIZ: ELIMINA LAPIZ POR ID
const u_lapizDeleteById = (array, lapiz_id) => {
	array.forEach((element) => {
		element.id == lapiz_id ? (element.visible = false) : '';
	});
};
const u_lapizGraficaH = (context, array) => {
	array.forEach((element) => utilsLapiz_graficaLapiz(context, element));
};

export {
	utilsLapiz_graficaLapiz,
	utilsLapiz_graficaLapizHistoria,
	u_lapizGet,
	u_lapizDeleteById,
	u_lapizGraficaH,
};
