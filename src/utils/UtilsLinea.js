// LINEA:
const utilsLinea_graficaLinea = (context, linea) => {
	if (linea.visible) {
		context.lineWidth = linea.grosor;
		context.strokeStyle = linea.color;
		context.setLineDash([0, 0]);

		context.beginPath();
		context.moveTo(linea.x_ini, linea.y_ini);
		context.lineTo(linea.x_fin, linea.y_fin);
		context.stroke();
		context.closePath();
	}
};

// LAPIZ - HISORIA:
const utilsLinea_graficaLineaHistoria = (context, array) => {
	array.forEach((element) => {
		utilsLinea_graficaLinea(context, element);
	});
};
// LINEA: GET
const u_lineaGet = (array, x, y) => {
	let resp = '';
	array.forEach((elem) => {
		if (elem.visible) {
			let p = {
				x1: elem.x_ini,
				y1: elem.y_ini,
				x2: elem.x_fin,
				y2: elem.y_fin,
			};
			let a = p.y1 - p.y2;
			let b = p.x2 - p.x1;
			let c = p.y1 * (p.x1 - p.x2) - p.x1 * (p.y1 - p.y2);
			let dnum = a * x + b * y + c;
			dnum < 0 ? (dnum = dnum * -1) : '';
			let dden = Math.sqrt(a * a + b * b);
			let d = dnum / dden;
			if (d < 20) resp = elem;
		}
	});
	return resp;
};
// LINEA: GRAFICA HISOTORIA
const u_lineaGraficaH = (context, array) => {
	array.forEach((element) => {
		utilsLinea_graficaLinea(context, element);
	});
};
// LINEA: DELETE POR ID
const u_lineaDeleteById = (array, linea_id) => {
	array.forEach((element) => {
		element.id == linea_id ? (element.visible = false) : '';
	});
	return array;
};

export {
	utilsLinea_graficaLinea,
	utilsLinea_graficaLineaHistoria,
	u_lineaDeleteById,
	u_lineaGraficaH,
	u_lineaGet,
};
