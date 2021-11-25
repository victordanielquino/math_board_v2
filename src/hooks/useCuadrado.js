import { useState } from 'react';
const initialStateCuadrado = {
	active: false,
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
	const updateCuadradoBordeGrosor = (valor) => {
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
	const updateCuadradoBorde_ColorEstado = (color, estado) => {
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
	const updateCuadradoFondo_ColorEstado = (color, estado) => {
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
	const update_all = (
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

	return {
		stateCuadrado,
		updateCuadradoActive,
		updateCuadradoBordeGrosor,
		updateCuadradoBordeEstado,
		updateCuadradoBorde_ColorEstado,
		updateCuadradoFondoEstado,
		updateCuadradoFondo_ColorEstado,
		add_cuadrado_en_historia,
		update_cuadrado_en_historia,
		update_all,
		update_cuadradoH, // new
		s_cuadradoAddH,
	};
};

export default useCuadrado;
