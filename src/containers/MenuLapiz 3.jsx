import React, { useEffect, useContext } from 'react';

// context
import AppContextLapiz from '../context/AppContextLapiz';

// styles:
import '../styles/MenuLapiz.scss';
import iconLineaS from '../assets/icons/lineaS.svg';
import iconLineaM from '../assets/icons/lineaM.svg';
import iconLineaL from '../assets/icons/lineaL.svg';
import iconLineaXL from '../assets/icons/lineaXL.svg';
import iconLineaXXL from '../assets/icons/lineaXXL.svg';

const MenuLapiz = () => {
	const { stateLapiz, updateLapizColor, updateLapizGrosor } =
		useContext(AppContextLapiz);

	const arrayIconLinea = [
		{ iconLine: iconLineaS, grosor: 1, id: 'iconLineaS' },
		{ iconLine: iconLineaM, grosor: 2, id: 'iconLineaM' },
		{ iconLine: iconLineaL, grosor: 4, id: 'iconLineaL' },
		{ iconLine: iconLineaXL, grosor: 6, id: 'iconLineaXL' },
		{ iconLine: iconLineaXXL, grosor: 10, id: 'iconLineaXXL' },
	];
	const arrayColorLinea = [
		{ colorLine: 'black', id: 'colorBlack' },
		{ colorLine: 'red', id: 'colorRed' },
		{ colorLine: 'green', id: 'colorGreen' },
		{ colorLine: 'blue', id: 'colorBlue' },
		{ colorLine: 'yellow', id: 'colorYellow' },
	];

	const updatePaletaGrosor = (grosor) => {
		const array = document.querySelectorAll('.activeIconLinea');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeIconLinea');
		}
		let elem = arrayIconLinea.find((elem) => elem.grosor == grosor);
		document.getElementById(elem.id).classList.add('activeIconLinea');
	};

	const updatePaletaColor = (color) => {
		const array = document.querySelectorAll('.activeColorLinea');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeColorLinea');
		}
		let elem = arrayColorLinea.find((elem) => elem.colorLine == color);
		document.getElementById(elem.id).classList.add('activeColorLinea');
	};

	const handleLineColor = (color) => {
		updatePaletaColor(color);
		updateLapizColor(color); // CONTEXT
	};
	const handleLineaGrosor = (grosor) => {
		updatePaletaGrosor(grosor);
		updateLapizGrosor(grosor); // CONTEXT
	};

	useEffect(() => {
		// se ejecuta solo la 1ra vez que se carga el componente.
		console.log('useEffect / stateLapiz: ', stateLapiz);
		updatePaletaGrosor(stateLapiz.grosor);
		updatePaletaColor(stateLapiz.color);
	}, []);

	return (
		<article className="article__menuLapiz">
			<div className="article__menuLapiz__tamano">
				<span htmlFor="">TAMAÑO: </span>
				<div className="article__menuLapiz__tamano__icons">
					{arrayIconLinea.map((elem) => (
						<img
							className="article__menuLapiz__tamano__icons__icon "
							src={elem.iconLine}
							id={elem.id}
							key={`key-${elem.id}`}
							onClick={() => handleLineaGrosor(elem.grosor)}
						/>
					))}
				</div>
			</div>
			<div className="article__menuLapiz__paletaColor">
				<div>
					<span>COLOR: </span>
				</div>
				<div className="article__menuLapiz__paletaColor__container">
					{arrayColorLinea.map((elem) => (
						<div
							className={`color activeColorLinea ${elem.colorLine}`}
							id={elem.id}
							onClick={() => handleColor('colorNegro')}
							key={elem.id}
							onClick={() => handleLineColor(elem.colorLine)}
						></div>
					))}
				</div>
			</div>
		</article>
	);
};

export default MenuLapiz;
