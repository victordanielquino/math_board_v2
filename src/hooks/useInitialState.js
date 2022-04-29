import { useState } from 'react';

const initialState = {
	active: '',
	activePrev: '',
	color: 'red',
	colorBlur: false,
	colorFondo: 'yellow',
	colorFondoBlur: false,
	grosor: 2,
	elmSelect: false,
	canvas: '',
	historia: [],
	mathBoards: [],
	mathBoardsIndexSelec: -1,
	mathBoardsReadJson:false,
	id: 0,
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
			case 'scissorIcon':
				setState({
					...state,
					active: 'scissorIcon',
				});
				break;
			case 'readJsonIcon':
				setState({
					...state,
					active: 'readJsonIcon',
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
	const h_setCanvas = (canvas) => {
		setState({
			...state,
			canvas: canvas,
		});
	}
	const h_addH = (elm) => {
		setState({
			...state,
			historia: [...state.historia, elm],
			id: state.id + 1,
		});
	};
	const h_deleteByIndex = (indexIn) => {
		let newArray = [];
		state.historia.forEach((elm, index) => {
			index !== indexIn
				? newArray.push(elm):'';
		});
		setState({
			...state,
			historia: newArray,
		})
	}
	const h_deleteById = (id) => {
		let newArray = [];
		state.historia.forEach((elm) => {
			elm.id !== id
				? newArray.push(elm):'';
		});
		setState({
			...state,
			historia: newArray,
		})
	}
	const h_updateH = (newArray) => {
		setState({
			...state,
			historia: newArray,
		})
	}
	const h_addMathboards = (mathBoard) => {
		setState({
			...state,
			mathBoards: [...state.mathBoards, mathBoard],
		});
	};
	const h_setMathboardsJson = (json) => {
		setState({
			...state,
			mathBoards: json,
		});
	};
	const h_setMathboardsJsonIndex = (json, index) => {
		setState({
			...state,
			mathBoards: json,
			mathBoardsIndexSelec: index,
		});
	};
	const h_setMathboardsIndexSelect = (indexSelect) => {
		setState({
			...state,
			mathBoardsIndexSelec: indexSelect,
		});
	};
	const h_setReadJsonAll = (mathBoards, indexSelect, readJsonBoolean, historia, id=0) => {
		setState({
			...state,
			mathBoards: mathBoards,
			mathBoardsIndexSelec: indexSelect,
			mathBoardsReadJson: readJsonBoolean,
			historia: historia,
			id: id,
		});
	};
	const h_setColorblur = (boolean) => {
		setState({
			...state,
			colorBlur: boolean,
		});
	};
	const h_setColorfondoblur = (boolean) => {
		setState({
			...state,
			colorFondoBlur: boolean,
		});
	};

	return {
		state,
		updateCanvasPaleta,
		updateColor,
		updateColorFondo,
		updateGrosor,
		setElmSelect,
		s_setActiveActivePrev,
		h_setCanvas,
		h_addH,
		h_deleteByIndex,
		h_deleteById,
		h_updateH,
		h_addMathboards,
		h_setMathboardsJson,
		h_setMathboardsIndexSelect,
		h_setReadJsonAll,
		h_setColorblur,
		h_setColorfondoblur,
		h_setMathboardsJsonIndex
	};
};

export default useInitialState;
