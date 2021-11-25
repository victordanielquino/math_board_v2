// cuadrado segmentado:
const utilsCuadrado_graficaCuadradoSegmentado = (context, cuadrado) => {
	context.strokeStyle = 'red'; // borde Color
	context.fillStyle = 'yellow'; // fondo Color
	context.lineWidth = 1; // borde grosor de linea
	context.setLineDash([14, 4]); // lineas segmentadas
	let width = cuadrado.x_fin - cuadrado.x_ini;
	let height = cuadrado.y_fin - cuadrado.y_ini;

	context.beginPath();
	context.strokeRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
	context.fillRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
	context.closePath();
};

// limpia el canvas:
const utilsCuadrado_LimpiaCuadrado = (context, cuadrado) => {
	let width = cuadrado.x_fin - cuadrado.x_ini;
	let height = cuadrado.y_fin - cuadrado.y_ini;
	context.clearRect(cuadrado.x_ini, cuadrado.y_ini, width, height);
};

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
const u_cuadradoGraficaH = (context, array) => {
	array.forEach((element) => utilsCuadrado_graficaCuadrado(context, element));
};

// GRAFICA CUADRADOS - HISORIA MENOS EL I-ESIMO id:
const UC_graficaCuadradoHistoria_menosI = (context, array, i) => {
	array.forEach((element) =>
		element.id != i ? utilsCuadrado_graficaCuadrado(context, element) : ''
	);
};

// CUADRADO: GET
const u_cuadradoGet = (array, x, y) => {
	let resp = '';
	array.forEach((elem) =>
		elem.x_ini < x && x < elem.x_fin && elem.y_ini < y && y < elem.y_fin
			? (resp = elem)
			: ''
	);
	return resp;
};
// CUADRADO: DELETE POR ID
const u_cuadradoDeleteById = (array, cuadradoId) => {
	console.log('id:', cuadradoId);
	let arrayNew = [];
	array.forEach((element) => {
		element.id != cuadradoId ? arrayNew.push(element) : '';
	});
	return arrayNew;
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
export {
	utilsCuadrado_graficaCuadrado,
	utilsCuadrado_graficaCuadradoHistoria,
	utilsCuadrado_graficaCuadradoSegmentado,
	utilsCuadrado_LimpiaCuadrado,
	UC_graficaCuadradoHistoria_menosI,
	u_cuadradoGet,
	u_cuadradoDeleteById,
	u_cuadradoGraficaH,
	u_cuadradoValidaPosicion,
};
