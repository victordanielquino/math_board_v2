import { useState } from 'react';

const initialState = {
	alfabetoMay: [
		'QWERTYUIOP'.split(''),
		'ASDFGHJKLÑ'.split(''),
		'ZXCVBNM,'.split(''),
	],
	alfabetoMin: [
		'qwertyuiop'.split(''),
		'asdfghjklñ'.split(''),
		'zxcvbnm.'.split(''),
	],
	alfabeto: [
		'QWERTYUIOP'.split(''),
		'ASDFGHJKLÑ'.split(''),
		'ZXCVBNM,'.split(''),
	],
	active: '',
	color: 'red',
	colorFondo: 'yellow',
	grosor: 1,
};
const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const toLowerCase = () => {
		const auxArray = state.alfabetoMin;
		setState({
			...state,
			alfabeto: auxArray,
		});
	};
	const toUpperCase = () => {
		const auxArray = state.alfabetoMay;
		setState({
			...state,
			alfabeto: auxArray,
		});
	};

	// ACTIVA Y DESACTIVA LA OPCION SELECCIONADA DE LA PALETA DE LA PIZARRA
	const updateCanvasPaleta = (optionIcon) => {
		switch (optionIcon) {
			case 'moverIcon':
				setState({
					...state,
					active: 'moverIcon',
				});
				break;
			case 'lapizIcon':
				setState({
					...state,
					active: 'lapizIcon',
				});
				break;
			case 'borradorIcon':
				setState({
					...state,
					active: 'borradorIcon',
				});
				break;
			case 'lineaIcon':
				setState({
					...state,
					active: 'lineaIcon',
				});
				break;
			case 'cuadradoIcon':
				setState({
					...state,
					active: 'cuadradoIcon',
				});
				break;
			case 'planoIcon':
				setState({
					...state,
					active: 'planoIcon',
				});
				break;
			case 'cuadriculaIcon':
				setState({
					...state,
					active: 'cuadriculaIcon',
				});
				break;
			case 'textIcon':
				setState({
					...state,
					active: 'textIcon',
				});
				break;
			default:
				console.log('Opcion no registrada / useInitialState!!!');
				break;
		}
	};
	const updateColor = (valor) => {
		setState({
			...state,
			color: valor,
		});
	};
	const updateGrosor = (valor) => {
		setState({
			...state,
			grosor: valor,
		});
	};
	const updateColorFondo = (valor) => {
		setState({
			...state,
			colorFondo: valor,
		});
	};

	return {
		state,
		toLowerCase,
		toUpperCase,
		updateCanvasPaleta,
		updateColor,
		updateColorFondo,
		updateGrosor,
	};
};

export default useInitialState;
