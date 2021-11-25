import { useState } from 'react';
const initialStateBorrador = {
	active: false,
	color: 'white',
	grosor: 10,
	historialBorrador: [],
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

	return {
		stateBorrador,
		updateBorradorActive,
		updateBorradorColor,
		updateBorradorGrosor,
	};
};

export default useBorrador;
