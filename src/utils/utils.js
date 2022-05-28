// OBJETO VACIO: Return true si esta vacio y false si no;
export const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};
// CONVIERT COLOTO TO RGBA
export const u_convertColorToRGBA = (color, colorBlur) => {
	let rgba = '';
	switch (color) {
		case 'black':
			colorBlur ? (rgba = 'rgba(0, 0, 0, 0.2)') : (rgba = 'rgba(0, 0, 0, 1)');
			break;
		case 'red':
			colorBlur
				? (rgba = 'rgba(255, 0, 0, 0.2)')
				: (rgba = 'rgba(255, 0, 0, 1)');
			break;
		case 'green':
			colorBlur
				? (rgba = 'rgba(0, 255, 0, 0.2)')
				: (rgba = 'rgba(0, 255, 0, 1)');
			break;
		case 'blue':
			colorBlur
				? (rgba = 'rgba(0, 0, 255, 0.2)')
				: (rgba = 'rgba(0, 0, 255, 1)');
			break;
		case 'yellow':
			colorBlur
				? (rgba = 'rgba(255, 255, 0, 0.3)')
				: (rgba = 'rgba(255, 255, 0, 1)');
			break;
		case 'white':
			colorBlur
				? (rgba = 'rgba(255, 255, 255, 0.2)')
				: (rgba = 'rgba(255, 255, 255, 1)');
			break;
		default:
			rgba = 'rgba(0, 0, 0, 1)';
			break;
	}
	return rgba;
};

export const u_canvasAutoSize = (canvas, canvasDatos) => {
	canvasDatos.top = canvas.getBoundingClientRect().top;
	canvasDatos.left = canvas.getBoundingClientRect().left;
	canvasDatos.width = canvas.getBoundingClientRect().width;
	canvasDatos.height = canvas.getBoundingClientRect().height;
	return canvasDatos;
};

// FECHA:
export const u_getFecha = () => {
	let date = new Date().toLocaleDateString();
	let time = new Date().toLocaleTimeString();
	let array1 = date.split('/');
	let array2 = time.split(':');
	let arrayAux = [];
	array1.forEach((elm) =>
		elm.length === 1 ? arrayAux.push('0' + elm) : arrayAux.push(elm)
	);
	let fecha = {
		date: {
			d: arrayAux[0],
			m: arrayAux[1],
			a: arrayAux[2],
		},
		dateText: arrayAux[2] + '-' + arrayAux[1] + '-' + arrayAux[0],
		time: {
			h: array2[0],
			m: array2[1],
			s: array2[2],
		},
		timeText: array2[0] + ':' + array2[1],
	};
	return fecha;
};
