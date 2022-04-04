import { useState } from 'react';
const initialStateLapiz = {
	id: 0,
	active: false,
	color: 'black',
	grosor: 4,
	historiaLapiz: [],
	canvas: '',
};

const useLapiz = () => {
	const [stateLapiz, setStateLapiz] = useState(initialStateLapiz);

	const updateLapizActive = (valor) => {
		setStateLapiz({
			...stateLapiz,
			active: valor,
		});
	};
	const updateLapizColor = (valor) => {
		console.log('color util:', valor);
		setStateLapiz({
			...stateLapiz,
			color: valor,
		});
		console.log('color:', stateLapiz);
	};
	const updateLapizGrosor = (valor) => {
		setStateLapiz({
			...stateLapiz,
			grosor: valor,
		});
	};
	const s_lapizAddHId = (lapiz, id) => {
		setStateLapiz({
			...stateLapiz,
			id: id,
			historiaLapiz: [...stateLapiz.historiaLapiz, lapiz],
		});
	};
	const updateLapizColorGrosor = (valor1, valor2) => {
		setStateLapiz({
			...stateLapiz,
			color: valor1,
			grosor: valor2,
		});
	};
	const h_lapizSetH = (newHistoria) => {
		setStateLapiz({
			...stateLapiz,
			historiaLapiz: newHistoria,
		});
	};
	const h_lapizSetCanvas = (canvas) => {
		setStateLapiz({
			...stateLapiz,
			canvas: canvas,
		});
	}

	return {
		stateLapiz,
		updateLapizActive,
		updateLapizColor,
		updateLapizGrosor,
		updateLapizColorGrosor,
		s_lapizAddHId,
		h_lapizSetH,
		h_lapizSetCanvas
	};
};

export default useLapiz;
