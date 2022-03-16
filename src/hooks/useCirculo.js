import { useState } from 'react';
const initialStateCirculo = {
	active: false,
	id: 0,
	bordeEstado: true, // si tendra borde
	bordeGrosor: 5,
	bordeColor: 'yellow',
	fondoEstado: true, // si tendra fondo
	fondoColor: 'black',
	radioX: 50,
	radioY: 50,
	h: 0,
	k: 0,
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
	const s_circuloUpdateFondoColorEstado = (color, estado) => {
		setStateCirculo({
			...stateCirculo,
			fondoColor: color,
			fondoEstado: estado,
		});
	};
	const s_circuloUpdateAll = (
		colorBorde,
		colorFondo,
		bordeGrosor,
		bordeEstadoIn,
		fondoEstadoIn
	) => {
		setStateCirculo({
			...stateCirculo,
			bordeColor: colorBorde,
			fondoColor: colorFondo,
			bordeGrosor: bordeGrosor,
			bordeEstado: bordeEstadoIn,
			fondoEstado: fondoEstadoIn,
		});
	};
	const s_circuloAddHId = (circulo, id) => {
		setStateCirculo({
			...stateCirculo,
			id: id,
			historiaCirculo: [...stateCirculo.historiaCirculo, circulo],
		});
	};
	const s_circuloUpdateRadio = (valor) => {
		setStateCirculo({
			...stateCirculo,
			radioX: valor,
			radioY: valor,
		});
	};
	const h_circuloSetH = (newHistoria) => {
		setStateCirculo({
			...stateCirculo,
			historiaCirculo: newHistoria,
		});
	};

	return {
		stateCirculo,
		updateCirculoActive,
		s_circuloUpdateBordeGrosor,
		s_circuloUpdateBordeColorEstado,
		s_circuloUpdateFondoColorEstado,
		s_circuloUpdateAll,
		s_circuloAddHId,
		s_circuloUpdateRadio,
		h_circuloSetH
	};
};

export default useCirculo;
