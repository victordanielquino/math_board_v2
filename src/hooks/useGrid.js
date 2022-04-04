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
	canvas: '',
};

const useGrid = () => {
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
	const h_gridSetCanvas = (value) => {
		setStateCanvas({
			...stateCanvas,
			canvas: value,
		});
	};

	return {
		stateCanvas,
		updateCuadriculaActive,
		updateCuadriculaWidth,
		update_width_height,
		updateTipoCuadricula,
		h_gridSetCanvas,
	};
};

export default useGrid;
