import { useState } from 'react';
const initialStateCuadrado = {
	active: false,
	edit: true,
	id: 0,
	bordeEstado: true, // si tendra borde
	bordeGrosor: 5,
	bordeColor: 'yellow',
	fondoEstado: true, // si tendra fondo
	fondoColor: 'black',
	x_ini: 0,
	y_ini: 0,
	width: 10,
	height: 10,
	historiaCuadrado: [],
	canvas: '',
};

const useCuadrado = () => {
	const [stateCuadrado, setStateCuadrado] = useState(initialStateCuadrado);

	const updateCuadradoActive = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			active: valor,
		});
	};
	// UPDATE GENERAL(HEADER - PALETA):
	const h_squareSetBordegrosor = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeGrosor: valor,
		});
	};
	const updateCuadradoBordeEstado = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeEstado: valor,
		});
	};
	const h_squareSetBordecolorBordeestado = (color, estado) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeColor: color,
			bordeEstado: estado,
		});
	};
	const updateCuadradoFondoEstado = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			fondoEstado: valor,
		});
	};
	const h_squareSetFondocolorFondoestado = (color, estado) => {
		setStateCuadrado({
			...stateCuadrado,
			fondoColor: color,
			fondoEstado: estado,
		});
	};
	// CREATE: ADD_IN:	historiaCuadrado[]
	const add_cuadrado_en_historia = (cuadrado) => {
		setStateCuadrado({
			...stateCuadrado,
			historiaCuadrado: [...stateCuadrado.historiaCuadrado, cuadrado],
		});
	};
	const s_cuadradoAddH = (cuadrado) => {
		setStateCuadrado({
			...stateCuadrado,
			historiaCuadrado: [...stateCuadrado.historiaCuadrado, cuadrado],
		});
	};
	const s_cuadradoAddHId = (cuadrado, id) => {
		setStateCuadrado({
			...stateCuadrado,
			id: id,
			historiaCuadrado: [...stateCuadrado.historiaCuadrado, cuadrado],
		});
	};
	// DELETE: DELETE_IN:	historiaCuadrado[]
	// UPDATE: UPDATE_IN:	historiaCuadrado[]
	const update_cuadrado_en_historia = (array) => {
		setStateCuadrado({
			...stateCuadrado,
			historiaCuadrado: array,
		});
	};
	const update_cuadradoH = (array) => {
		setStateCuadrado({
			...stateCuadrado,
			historiaCuadrado: array,
		});
	};
	const h_squareSetAll = (
		colorBorde,
		colorFondo,
		bordeGrosor,
		bordeEstadoIn,
		fondoEstadoIn
	) => {
		setStateCuadrado({
			...stateCuadrado,
			bordeColor: colorBorde,
			fondoColor: colorFondo,
			bordeGrosor: bordeGrosor,
			bordeEstado: bordeEstadoIn,
			fondoEstado: fondoEstadoIn,
		});
	};
	const h_cuadradoSetH = (newHistoria) => {
		setStateCuadrado({
			...stateCuadrado,
			historiaCuadrado: newHistoria,
		});
	};
	const h_squareSetCanvas = (valor) => {
		setStateCuadrado({
			...stateCuadrado,
			canvas: valor,
		});
	};

	return {
		stateCuadrado,
		updateCuadradoActive,
		h_squareSetBordegrosor,
		updateCuadradoBordeEstado,
		h_squareSetBordecolorBordeestado,
		updateCuadradoFondoEstado,
		h_squareSetFondocolorFondoestado,
		add_cuadrado_en_historia,
		update_cuadrado_en_historia,
		h_squareSetAll,
		update_cuadradoH, // new
		s_cuadradoAddH,
		s_cuadradoAddHId,
		h_cuadradoSetH,
		h_squareSetCanvas,
	};
};

export default useCuadrado;
