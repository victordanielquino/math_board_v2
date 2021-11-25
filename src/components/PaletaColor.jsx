import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../context/AppContext';

// styles:
import '../styles/PaletaColor.scss';
import iconLineaNone from '../assets/icons/lineaNone.svg';

const PaletaColor = (value) => {
	// useContext:
	const { state, updateColor, updateColorFondo } = useContext(AppContext);

	// LOGICA:
	const arrayPaletaColor = [
		{ colorLine: 'white', id: `colorNone-${value.tipo}` },
		{ colorLine: 'black', id: `colorBlack-${value.tipo}` },
		{ colorLine: 'red', id: `colorRed-${value.tipo}` },
		{ colorLine: 'green', id: `colorGreen-${value.tipo}` },
		{ colorLine: 'blue', id: `colorBlue-${value.tipo}` },
		{ colorLine: 'yellow', id: `colorYellow-${value.tipo}` },
	];
	const updatePaletaColor = (color) => {
		arrayPaletaColor.forEach((dato) =>
			document.getElementById(dato.id).classList.remove('activePaletaColor')
		);
		let elem = arrayPaletaColor.find((elem) => elem.colorLine == color);
		document.getElementById(elem.id).classList.add('activePaletaColor');
	};
	const handlePaletaColor = (color) => {
		updatePaletaColor(color);
		value.tipo == 'linea'
			? updateColor(color) // CONTEXT COLOR
			: updateColorFondo(color); // CONTEXT colorFondo
	};
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		// se ejecuta solo la 1ra vez que se carga el componente.
		value.tipo == 'linea'
			? updatePaletaColor(state.color)
			: updatePaletaColor(state.colorFondo);
	}, [updateColor, updateColorFondo]);

	return (
		<div className="article__menuLapiz__paletaColor">
			<div>
				<span>{value.title}: </span>
			</div>
			<div className="article__menuLapiz__paletaColor__container">
				{arrayPaletaColor.map((elem) => (
					<div
						className={`color activePaletaColor ${elem.colorLine}`}
						id={elem.id}
						onClick={() => handleColor('colorNegro')}
						key={elem.id}
						onClick={() => handlePaletaColor(elem.colorLine)}
					>
						{elem.colorLine == 'white' && <img src={iconLineaNone} />}
					</div>
				))}
			</div>
		</div>
	);
};

export default PaletaColor;
