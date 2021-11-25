import React, { useContext, useEffect } from 'react';

// context:
import AppContextBorrador from '../context/AppContextBorrador';

// style:
import '../styles/MenuBorrador.scss';

const MenuBorrador = () => {
	// useContext:
	const { stateBorrador, updateBorradorGrosor } =
		useContext(AppContextBorrador);

	// LOGICA:
	const updatePaletaGrosor = (grosor) => {
		document.getElementById('grosorBorrador').value = grosor;
	};
	const handleGrosor = (opMatematica) => {
		let valor = parseInt(document.getElementById('grosorBorrador').value);
		let update = true;
		switch (opMatematica) {
			case '+':
				valor + 1 < 20 ? (valor = valor + 1) : (update = false);
				break;
			case '-':
				valor - 1 > 0 ? (valor = valor - 1) : (update = false);
				break;
			default:
				break;
		}
		if (update) {
			document.getElementById('grosorBorrador').value = valor;
			updateBorradorGrosor(valor); // CONTEXT
		} else {
			console.log('limite');
		}
	};
	// LOGICA END.

	// EFFECT:
	useEffect(() => {
		updatePaletaGrosor(stateBorrador.grosor);
	}, [stateBorrador, updateBorradorGrosor]);

	return (
		<article className="article__menuBorrador">
			<div className="article__menuBorrador__tamano">
				<span htmlFor="">TAMAÑO DEL BORRADOR: </span>
				<input
					type="text"
					className="input"
					id="grosorBorrador"
					placeholder="2"
					defaultValue="4"
					disabled
				/>
				<input
					className="button"
					id="button1_txt"
					type="button"
					value="+"
					onClick={() => handleGrosor('+')}
				/>
				<input
					className="button"
					id="button2_txt"
					type="button"
					value="-"
					onClick={() => handleGrosor('-')}
				/>
			</div>
		</article>
	);
};

export default MenuBorrador;
