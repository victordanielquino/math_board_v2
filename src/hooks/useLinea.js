import { useState } from 'react';
const initialStateLinea = {
	active: false,
	color: 'black',
	grosor: 2,
	id: 0,
	historiaLinea: [],
};

const useLinea = () => {
	const [stateLinea, setStateLinea] = useState(initialStateLinea);

	const updateLineaActive = (valor) => {
		setStateLinea({
			...stateLinea,
			active: valor,
		});
	};
	const updateLineaColor = (valor) => {
		console.log('color util:', valor);
		setStateLinea({
			...stateLinea,
			color: valor,
		});
		console.log('color:', stateLinea);
	};
	const updateLineaGrosor = (valor) => {
		setStateLinea({
			...stateLinea,
			grosor: valor,
		});
	};
	const add_historiaLinea = (valor) => {
		setStateLinea({
			...stateLinea,
			historiaLinea: [...stateLinea.historiaLinea, valor],
		});
	};
	const add_historiaLinea_id = (valor, id) => {
		setStateLinea({
			...stateLinea,
			id: id,
			historiaLinea: [...stateLinea.historiaLinea, valor],
		});
	};
	const updateLineaColorGrosor = (valor1, valor2) => {
		setStateLinea({
			...stateLinea,
			color: valor1,
			grosor: valor2,
		});
	};
	const s_lineaUpdateH = (array) => {
		setStateLinea({
			...setStateLinea,
			historiaLinea: array,
		});
	};

	return {
		stateLinea,
		updateLineaActive,
		updateLineaColor,
		updateLineaGrosor,
		add_historiaLinea,
		add_historiaLinea_id,
		updateLineaColorGrosor,
		s_lineaUpdateH,
	};
};

export default useLinea;
