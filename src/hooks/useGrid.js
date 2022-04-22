import { useState } from 'react';

const initialStateGrid = {
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
	const [stateGrid, setStateGrid] = useState(initialStateGrid);

	const updateCuadriculaActive = (valor) => {
		setStateGrid({
			...stateGrid,
			active: valor,
		});
	};
	const updateCuadriculaWidth = (valor) => {
		setStateGrid({
			...stateGrid,
			cuadriculaWidth: valor,
		});
	};
	const update_width_height = (width, height) => {
		setStateGrid({
			...stateGrid,
			width: width,
			height: height,
		});
	};
	const h_gridTipo = (valor) => {
		setStateGrid({
			...stateGrid,
			tipoCuadricula: valor,
		});
	};
	const h_gridSetCanvas = (value) => {
		setStateGrid({
			...stateGrid,
			canvas: value,
		});
	};

	return {
		stateGrid,
		updateCuadriculaActive,
		updateCuadriculaWidth,
		update_width_height,
		h_gridTipo,
		h_gridSetCanvas,
	};
};

export default useGrid;
