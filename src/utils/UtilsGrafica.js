const graficaHistoriaLapiz = (historia, id) => {
	console.log('GRAFICA - HISTORIA - LAPIZ', historia);
	console.log('GRAFICA - HISTORIA - LAPIZ', historia[0]);
	const canvas = document.getElementById(id);
	const context = canvas.getContext('2d');
	historia.map((array) => {
		array.map((elem) => {
			context.beginPath();
			context.moveTo(elem[0], elem[1]);
			context.lineTo(elem[2], elem[3]);
			context.strokeStyle = 'black';
			context.lineWidth = 2;
			context.stroke();
			context.closePath();
		});
	});
};

export { graficaHistoriaLapiz };
