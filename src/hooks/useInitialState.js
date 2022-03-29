import { useState } from 'react';

const initialState = {
	active: '',
	activePrev: '',
	color: 'red',
	colorFondo: 'yellow',
	grosor: 2,
	elmSelect: false,
};
const useInitialState = () => {
	const [state, setState] = useState(initialState);

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
			case 'circuloIcon':
				setState({
					...state,
					active: 'circuloIcon',
				});
				break;
			case 'trianguloIcon':
				setState({
					...state,
					active: 'trianguloIcon',
				});
				break;
			case 'imagenIcon':
				setState({
					...state,
					active: 'imagenIcon',
				});
				break;
			case 'functionIcon':
				setState({
					...state,
					active: 'functionIcon',
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
	const setElmSelect = (boolean) => {
		setState({
			...state,
			elmSelect: boolean
		});
	}
	const s_setActiveActivePrev = (optionIcon, optionIconPrev) => {
		setState({
			...state,
			active: optionIcon,
			activePrev: optionIconPrev,
		});
	}


	return {
		state,
		updateCanvasPaleta,
		updateColor,
		updateColorFondo,
		updateGrosor,
		setElmSelect,
		s_setActiveActivePrev,
	};
};

export default useInitialState;
