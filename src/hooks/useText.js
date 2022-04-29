import { useState } from 'react';
const initialStateText = {
	active: false,
	id: 0,
	x_ini: 0,
	y_ini: 0,
	x_fin: 0,
	y_fin: 0,
	fontAlign: 'start',	// startr, end
	fontBaseline: 'top', // top, bottom
	fontColor: 'black',
	fontBold: '', // bold
	fontItalic: '', // italic
	fontUnderL: '', // underL
	fontTypografia: 'helvatica',
	fontSize: 20,
	fontText: 'new text',
	fontFocus: false,
	textSelect: {},
	historiaText: [],
	canvas: '',
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
	const s_textAddHId = (text, id) => {
		setStateText({
			...stateText,
			id: id,
			historiaText: [...stateText.historiaText, text],
		});
	};

	const h_textSetColor = (color) => {
		setStateText({
			...stateText,
			fontColor: color,
		});
	};
	const h_textSetBold = (bold) => {
		setStateText({
			...stateText,
			fontBold: bold,
		});
	};
	const h_textSetItalic = (italic) => {
		setStateText({
			...stateText,
			fontItalic: italic,
		});
	};
	const h_textSetUnderL = (underL) => {
		setStateText({
			...stateText,
			fontUnderL: underL,
		});
	};
	const h_textSetTypografia = (typografia) => {
		setStateText({
			...stateText,
			fontTypografia: typografia,
		});
	};
	const h_textSetSize = (size) => {
		setStateText({
			...stateText,
			fontSize: size,
		});
	};
	const h_textSetText = (text) => {
		setStateText({
			...stateText,
			fontText: text,
		});
	};
	const h_textSetFocus = (focus) => {
		setStateText({
			...stateText,
			fontFocus: focus,
		});
	};
	const h_textSetAll = (
		x_ini, y_ini, color, focus, text
	) => {
		setStateText({
			...stateText,
			x_ini: x_ini,
			y_ini: y_ini,
			fontColor: color,
			fontFocus: focus,
			fontText: text,
		});
	}
	const h_textAddHIdFocus = (text, id, boolean) => {
		setStateText({
			...stateText,
			historiaText: [...stateText.historiaText, text],
			id: id,
			fontFocus: boolean,
		});
	};
	const h_textSetH = (newHistoria) => {
		setStateText({
			...stateText,
			historiaText: newHistoria,
		});
	};
	const h_textDeleteId = (id) => {
		let newArray = [];
		for (let elm of stateText.historiaText)
			elm.id !== id ? newArray.push(elm):'';
		setStateText({
			...stateText,
			historiaText: newArray,
		});
	};
	const h_textSetReset = () => {
		setStateText({
			...stateText,
			active: false,
			//fontColor: 'black',
			//fontBold: '',
			//fontItalic: '',
			//fontUnderL: '',
			//fontTypografia: 'helvatica',
			//fontSize: 20,
			fontText: '',
			fontFocus: false,
			textSelect: {},
		});
	}
	const h_textSetAllTextselect = (color, bold, italic, underL, typografi, size) => {
		setStateText({
			...stateText,
			fontColor: color,
			fontBold: bold,
			fontItalic: italic,
			fontUnderL: underL,
			fontTypografia: typografi,
			fontSize: size,
		});
	}
	const h_textSetTextselect = (text) => {
		setStateText({
			...stateText,
			textSelect: text
		});
	}
	const h_textSetCanvas = (canvas) => {
		setStateText({
			...stateText,
			canvas: canvas,
		});
	}

	return {
		stateText,
		updateTextActive,
		s_textAddH,
		s_textAddHId,

		h_textSetColor,
		h_textSetBold,
		h_textSetItalic,
		h_textSetUnderL,
		h_textSetTypografia,
		h_textSetSize,
		h_textSetText,
		h_textSetFocus,
		h_textSetAll,
		h_textAddHIdFocus,
		h_textSetReset,
		h_textSetH,
		h_textDeleteId,
		h_textSetCanvas,
		h_textSetTextselect,
		h_textSetAllTextselect,
	};
};

export default useText;
