import { useState } from 'react';
const initialStateBorrador = {
	active: false,
	color: 'white',
	grosor: 10,
	historialBorrador: [],
	canvas: '',
};

const useBorrador = () => {
	const [stateBorrador, setStateBorrador] = useState(initialStateBorrador);

	const updateBorradorActive = (valor) => {
		setStateBorrador({
			...stateBorrador,
			active: valor,
		});
	};
	const updateBorradorColor = (valor) => {
		setStateBorrador({
			...stateBorrador,
			color: valor,
		});
	};
	const updateBorradorGrosor = (valor) => {
		setStateBorrador({
			...stateBorrador,
			grosor: valor,
		});
	};
	const h_eraserSetCanvas = (value) => {
		setStateBorrador({
			...stateBorrador,
			canvas: value,
		});
	};

	return {
		stateBorrador,
		updateBorradorActive,
		updateBorradorColor,
		updateBorradorGrosor,
		h_eraserSetCanvas,
	};
};

export default useBorrador;
