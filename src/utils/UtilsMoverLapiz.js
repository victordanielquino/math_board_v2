const u_getLapiz = (array, x, y) => {
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
// CUADRADO SEGMENTADO:
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
const u_moverLapiz = (lapiz, mouse) => {
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

export { u_getLapiz, u_lapizSegmentado, u_moverLapiz };
