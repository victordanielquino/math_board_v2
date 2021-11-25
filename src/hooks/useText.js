import { useState } from 'react';
const initialStateText = {
	active: false,
	id: 0,
	tamano: 20,
	texto: 'new text',
	x_ini: 0,
	y_ini: 0,
	salto: 1,
	color: 'black',
	historiaText: [],
};

const useText = () => {
	const [stateText, setStateText] = useState(initialStateText);

	const updateTextActive = (valor) => {
		setStateText({
			...stateText,
			active: valor,
		});
	};
	const s_textAddH = (valor) => {
		setStateText({
			...stateText,
			historiaText: [...stateText.historiaText, valor],
		});
	};
	const s_textUpdateColor = (color) => {
		setStateText({
			...stateText,
			color: color,
		});
	};
	const s_textUpdateTamano = (tamano) => {
		setStateText({
			...stateText,
			tamano: tamano,
		});
	};
	const s_textUpdateText = (txt) => {
		setStateText({
			...stateText,
			texto: txt,
		});
	};
	return {
		stateText,
		updateTextActive,
		s_textAddH,
		s_textUpdateColor,
		s_textUpdateTamano,
		s_textUpdateText,
	};
};

export default useText;
