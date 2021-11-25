import { useState } from 'react';

const initialStateCanvas = {
	active: false,
	id: 0,
	width: 0,
	height: 0,
	cuadriculaWidth: 30,
	fondoColor: 'white',
	lineaColor: '#d5dbdb',
	lineaGrosor: 1,
	tipoCuadricula: 'cuadricula', // cuadricula, linea, ninguno
};

const useCanvas = () => {
	const [stateCanvas, setStateCanvas] = useState(initialStateCanvas);

	const updateCuadriculaActive = (valor) => {
		setStateCanvas({
			...stateCanvas,
			active: valor,
		});
	};
	const updateCuadriculaWidth = (valor) => {
		setStateCanvas({
			...stateCanvas,
			cuadriculaWidth: valor,
		});
	};
	const update_width_height = (width, height) => {
		setStateCanvas({
			...stateCanvas,
			width: width,
			height: height,
		});
	};
	const updateTipoCuadricula = (valor) => {
		setStateCanvas({
			...stateCanvas,
			tipoCuadricula: valor,
		});
	};

	return {
		stateCanvas,
		updateCuadriculaActive,
		updateCuadriculaWidth,
		update_width_height,
		updateTipoCuadricula,
	};
};

export default useCanvas;
