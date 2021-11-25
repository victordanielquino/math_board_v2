const canvas = {
	width: 10,
};
const valoresInicialesCanvas = (id) => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const canvas = document.getElementById(id);
	canvas.width = width - 75;
	canvas.height = height - 90;
};

const utilsGraficaCuadricula = (id) => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const canvas = document.getElementById(id);
	canvas.width = width - 75;
	canvas.height = height - 90;
};

export { valoresInicialesCanvas, utilsGraficaCuadricula };
