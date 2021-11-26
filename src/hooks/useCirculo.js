import { useState } from 'react';
const initialStateCirculo = {
	active: false,
	id: 0,
	bordeEstado: true, // si tendra borde
	bordeGrosor: 5,
	bordeColor: 'yellow',
	fondoEstado: true, // si tendra fondo
	fondoColor: 'black',
	radio: 20,
	x_ini: 0,
	y_ini: 0,
	width: 10,
	height: 10,
	historiaCirculo: [],
};

const useCirculo = () => {
	const [stateCirculo, setStateCirculo] = useState(initialStateCirculo);

	const updateCirculoActive = (valor) => {
		setStateCirculo({
			...stateCirculo,
			active: valor,
		});
	};
	// UPDATE GENERAL(HEADER - PALETA):
	const s_circuloUpdateBordeGrosor = (valor) => {
		setStateCirculo({
			...stateCirculo,
			bordeGrosor: valor,
		});
	};
	const s_circuloUpdateBordeEstado = (valor) => {
		setStateCirculo({
			...stateCirculo,
			bordeEstado: valor,
		});
	};
	const s_circuloUpdateBordeColorEstado = (color, estado) => {
		setStateCirculo({
			...stateCirculo,
			bordeColor: color,
			bordeEstado: estado,
		});
	};
	const s_ciruloFondoEstado = (valor) => {
		setStateCirculo({
			...stateCirculo,
			fondoEstado: valor,
		});
	};
	const s_circuloUpdateFondoColorEstado = (color, estado) => {
		setStateCirculo({
			...stateCirculo,
			fondoColor: color,
			fondoEstado: estado,
		});
	};
	// CREATE: ADD_IN:	historiaCuadrado[]
	const s_ciruloAddH = (circulo) => {
		setStateCirculo({
			...stateCirculo,
			historiaCirculo: [...stateCirculo.historiaCirculo, circulo],
		});
	};

	const s_ciruloUpdateH = (array) => {
		setStateCuirculo({
			...stateCuirculo,
			historiaCuirculo: array,
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

export default useCirculo;
