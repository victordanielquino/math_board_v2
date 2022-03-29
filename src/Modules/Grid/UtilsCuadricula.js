const utilsCuadricula_graficaCuadricula = (context, canvas) => {
	context.lineWidth = canvas.lineaGrosor; // lineaGrosor
	context.strokeStyle = canvas.lineaColor; // lineaColor
	context.fillStyle = 'white';
	context.setLineDash([0, 0]);

	context.beginPath();
	context.moveTo(0, 0); // (x_ini, y_ini)
	context.lineTo(canvas.width, 0); // (x_fin, y_ini)
	context.lineTo(canvas.width, canvas.height); // (x_fin, y_ini)
	context.lineTo(0, canvas.height); // (x_fin, y_ini)
	context.lineTo(0, 0); // (x_fin, y_ini)
	context.fill();
	context.stroke(); // bordeColor = true
	context.closePath();

	// VERTICAL: |
	if (canvas.tipoCuadricula === 'cuadricula') {
		let nroLineasV = canvas.width / canvas.cuadriculaWidth - 1;
		let incV = canvas.cuadriculaWidth;
		let i = 0;
		for (i = 0; i < nroLineasV; i++) {
			context.beginPath();
			context.moveTo(incV, 0); // (x_ini, y_ini)
			context.lineTo(incV, canvas.height); // (x_fin, y_ini)
			context.stroke(); // bordeColor = true
			incV = incV + canvas.cuadriculaWidth;
		}
	}
	// HORIZONTAL: -
	if (
		canvas.tipoCuadricula == 'cuadricula' ||
		canvas.tipoCuadricula == 'linea'
	) {
		let nroLineasH = canvas.height / canvas.cuadriculaWidth - 1;
		let incH = canvas.cuadriculaWidth;
		let i = 0;
		for (i = 0; i < nroLineasH; i++) {
			context.beginPath();
			context.moveTo(0, incH); // (x_ini, y_ini)
			context.lineTo(canvas.width, incH); // (x_fin, y_ini)
			context.stroke(); // bordeColor = true
			incH = incH + canvas.cuadriculaWidth;
		}
	}
};

export { utilsCuadricula_graficaCuadricula };
