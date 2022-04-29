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
	const h_pencilSetColor = (valor) => {
		setStateLapiz({
			...stateLapiz,
			color: valor,
		});
	};
	const h_pencilSetGrosor = (valor) => {
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
	const h_pencilSetColorGrosor = (color, grosor) => {
		setStateLapiz({
			...stateLapiz,
			color: color,
			grosor: grosor,
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
		h_pencilSetColor ,
		h_pencilSetGrosor,
		h_pencilSetColorGrosor,
		s_lapizAddHId,
		h_lapizSetH,
		h_lapizSetCanvas,
	};
};

export default useLapiz;
