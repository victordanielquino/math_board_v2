import { useState } from 'react';
const initialStateLinea = {
	active: false,
	color: 'black',
	grosor: 2,
	id: 0,
	type: 'line',
	segment: false,
	historiaLinea: [],
	canvas: ''
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
	const h_lineaSetColor = (valor) => {
		setStateLinea({
			...stateLinea,
			color: valor,
		});
	};
	const updateLineaGrosor = (valor) => {
		setStateLinea({
			...stateLinea,
			grosor: valor,
		});
	};
	const h_lineaSetGrosor = (valor) => {
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

	const s_lineaAddHId = (valor, id) => {
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
	const h_lineaSetColorGrosor = (valor1, valor2) => {
		console.log(valor1, valor2)
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
	const s_lineSetType = (lineType) => {
		setStateLinea({
			...stateLinea,
			type: lineType,
		});
	};
	const s_lineSetSegment = (boolean) => {
		setStateLinea({
			...stateLinea,
			segment: boolean,
		});
	};
	const h_lineSetH = (newHistoria) => {
		setStateLinea({
			...stateLinea,
			historiaLinea: newHistoria,
		});
	};
	const h_lineSetCanvas = (value) => {
		setStateLinea({
			...stateLinea,
			canvas: value,
		});
	};

	return {
		stateLinea,
		updateLineaActive,
		updateLineaColor,
		updateLineaGrosor,
		add_historiaLinea,
		//add_historiaLinea_id,
		updateLineaColorGrosor,
		s_lineaUpdateH,
		s_lineaAddHId,
		s_lineSetType,
		s_lineSetSegment,
		h_lineSetH,
		h_lineaSetColorGrosor,
		h_lineaSetColor,
		h_lineaSetGrosor,
		h_lineSetCanvas
	};
};

export default useLinea;
