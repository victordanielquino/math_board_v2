import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

import '../styles/KeySvg.scss';

const KeySvg = (svg) => {
	const [toggleShift, setToggleShift] = useState(false);

	const { toLowerCase, toUpperCase } = useContext(AppContext);

	const handleClick = (option) => {
		switch (option) {
			case 'shift-fill':
				console.log(option);
				setToggleShift(!toggleShift);
				toggleShift ? toUpperCase() : toLowerCase();
				break;
			case 'DEL':
				console.log(option);
				break;
			case 'caret-left':
				console.log(option);
				break;
			case 'caret-right':
				console.log(option);
				break;
			case 'backspace':
				console.log(option);
				break;
			default:
				break;
		}
	};

	return (
		<input
			type="button"
			value=""
			className={`keySvg ${svg.element}`}
			id={svg.element}
			onClick={() => handleClick(svg.element)}
		/>
	);
};

export default KeySvg;
