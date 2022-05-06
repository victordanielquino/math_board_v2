// LAPIZ: GRAFICA
const u_pencilDraw = (context, lapiz) => {
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
};
const utilsLapiz_graficaLapiz = (context, lapiz) => {
	if (lapiz.visible && lapiz) {
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
// LAPIZ: GET ID
const u_getLapizId = (array, x, y) => {
	let id = -1;
	array.forEach((pencil) => {
		(pencil.visible && pencil.edit)
			? ((pencil.x_min < x && x < pencil.x_may && pencil.y_min < y && y < pencil.y_may) ? (id = pencil.id) : '')
			: '';
	});
	return id;
};
const u_pencilClickTrue = (pencil, x, y) => {
	return (pencil.x_min -5 < x && x < pencil.x_may + 5 && pencil.y_min-5 < y && y < pencil.y_may+5);
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
const u_lapizDeleteById = (array, id) => {
	// array.forEach((element) => {
	// 	element.id === lapiz_id ? (element.visible = false) : '';
	// });
	let newArray = [];
	for(let elm of array)
		elm.id !== id ? newArray.push(elm):'';
	return newArray;
};
const u_lapizGraficaH = (context, array) => {
	array.forEach((element) => utilsLapiz_graficaLapiz(context, element));
};
// LAPIZ: GRAFICA LINEA
const u_lapizGraficaLinea = (context, linea, lapiz) => {
	context.strokeStyle = linea.color;
	context.lineWidth = linea.grosor;
	context.setLineDash([0, 0]);
	context.beginPath();
	context.moveTo(linea.x_ini, linea.y_ini);
	context.lineTo(linea.x_fin, linea.y_fin);
	context.stroke();
	context.closePath();
	// busca cotas minimas X:
	linea.x_ini < lapiz.x_min ? (lapiz.x_min = linea.x_ini) : '';
	linea.x_fin < lapiz.x_min ? (lapiz.x_min = linea.x_fin) : '';
	// busca cotas maximas X:
	linea.x_ini > lapiz.x_may ? (lapiz.x_may = linea.x_ini) : '';
	linea.x_fin > lapiz.x_may ? (lapiz.x_may = linea.x_fin) : '';
	// busca cotas minimas Y:
	linea.y_ini < lapiz.y_min ? (lapiz.y_min = linea.y_ini) : '';
	linea.y_fin < lapiz.y_min ? (lapiz.y_min = linea.y_fin) : '';
	// busca cotas maximas Y:
	linea.y_ini > lapiz.y_may ? (lapiz.y_may = linea.y_ini) : '';
	linea.y_fin > lapiz.y_may ? (lapiz.y_may = linea.y_fin) : '';
	return linea;
};
// LAPIZ: SEGMENTADO:
const u_lapizSegmentado = (context, lapiz) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	context.beginPath();
	context.moveTo(lapiz.x_min - 20, lapiz.y_min - 20); // (x_ini, y_ini)
	context.lineTo(lapiz.x_may + 20, lapiz.y_min - 20); // (x_fin, y_ini)
	context.lineTo(lapiz.x_may + 20, lapiz.y_may + 20); // (x_fin, y_fin)
	context.lineTo(lapiz.x_min - 20, lapiz.y_may + 20); // (x_ini, y_fin)
	context.lineTo(lapiz.x_min - 20, lapiz.y_min - 20); // (x_ini, y_ini)
	context.stroke();
	context.closePath();
};
// MUEVE LAPIZ SELECT:
const u_lapizMover = (lapiz, mouse) => {
	const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
	const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
	lapiz.historiaLinea.forEach((linea) => {
		linea[0] = linea[0] + recorrido_x;
		linea[1] = linea[1] + recorrido_y;
		linea[2] = linea[2] + recorrido_x;
		linea[3] = linea[3] + recorrido_y;
	});
	lapiz.x_min = lapiz.x_min + recorrido_x;
	lapiz.x_may = lapiz.x_may + recorrido_x;
	lapiz.y_min = lapiz.y_min + recorrido_y;
	lapiz.y_may = lapiz.y_may + recorrido_y;
	return lapiz;
};
// LAPIZ: GET
const u_lapizGetClick = (array, x, y) => {
	let resp = '';
	array.forEach((lapiz) => {
		if (lapiz.x_min < x && x < lapiz.x_may && lapiz.y_min < y && y < lapiz.y_may) {
			resp = lapiz;
		}
	});
	return resp;
};
// LAPIZ: SI SE HIZO CLICK SOBRE UN LAPIZ, PODREMOS MOVER
const u_lapizClickSobreLapiz = (lapizSelect, mouse) => {
	(lapizSelect) ? mouse.lapiz_mover = true : mouse.lapiz_mover = false;
}
// CIRCULO: BUSCA CIRCULO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_lapizOpera = (lapizSelect, array, mouse) => {
	lapizSelect = u_lapizGetClick(array, mouse.pos.x, mouse.pos.y);
	u_lapizClickSobreLapiz(lapizSelect, mouse);
	return lapizSelect;
}
// LAPIZ: SEGMENTADO:
const u_lapizBordeSegmentado = (context, lapiz) => {
	context.strokeStyle = 'red'; // borde Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([10, 4]); // lineas segmentadas

	context.beginPath();
	context.moveTo(lapiz.x_min - 5, lapiz.y_min - 5); // (x_ini, y_ini)
	context.lineTo(lapiz.x_may + 5, lapiz.y_min - 5); // (x_fin, y_ini)
	context.lineTo(lapiz.x_may + 5, lapiz.y_may + 5); // (x_fin, y_fin)
	context.lineTo(lapiz.x_min - 5, lapiz.y_may + 5); // (x_ini, y_fin)
	context.lineTo(lapiz.x_min - 5, lapiz.y_min - 5); // (x_ini, y_ini)
	context.stroke();
	context.closePath();
};

export {
	utilsLapiz_graficaLapiz,
	utilsLapiz_graficaLapizHistoria,
	u_lapizGet,
	u_lapizDeleteById,
	u_getLapizId,
	u_lapizGraficaH,
	u_lapizGraficaLinea,
	u_lapizSegmentado,
	u_lapizMover,
	u_lapizOpera,
	u_lapizBordeSegmentado,
	u_pencilDraw,
	u_pencilClickTrue,
};
