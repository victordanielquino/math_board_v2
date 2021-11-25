import React, { useEffect, useContext } from 'react';

// context
import AppContextCanvas from '../context/AppContextCanvas';

// styles:
import '../styles/MenuCuadricula.scss';
import iconCuadricula from '../assets/icons/cuadricula.svg';
import iconCuadriculaSin from '../assets/icons/cuadriculaSin.svg';
import iconCuadriculaNone from '../assets/icons/lineaNone.svg';

const MenuCuadricula = () => {
	// useContext:
	const { stateCanvas, updateTipoCuadricula, updateCuadriculaWidth } =
		useContext(AppContextCanvas);

	// LOGICA:
	const arrayIconCuadricula = [
		{
			iconCuadricula: iconCuadricula,
			tipo: 'cuadricula',
			id: 'iconCuadricula',
		},
		{
			iconCuadricula: iconCuadriculaSin,
			tipo: 'linea',
			id: 'iconCuadriculaSin',
		},
		{
			iconCuadricula: iconCuadriculaNone,
			tipo: 'ninguno',
			id: 'iconCuadriculaNone',
		},
	];
	const updatePaleta_tipoCuadricula = (tipo) => {
		const array = document.querySelectorAll('.activeIconCuadricula');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeIconCuadricula');
		}
		let elem = arrayIconCuadricula.find((elem) => elem.tipo == tipo);
		document.getElementById(elem.id).classList.add('activeIconCuadricula');
	};
	const handleCuadriculaTipo = (tipo) => {
		updatePaleta_tipoCuadricula(tipo);
		updateTipoCuadricula(tipo);
	};
	const handleBtnAncho = (op) => {
		op == '-' && stateCanvas.cuadriculaWidth > 10
			? updateCuadriculaWidth(stateCanvas.cuadriculaWidth - 10)
			: '';
		op == '+' ? updateCuadriculaWidth(stateCanvas.cuadriculaWidth + 10) : '';
	};
	// LOGICA END.

	// useEffect
	useEffect(() => {
		updatePaleta_tipoCuadricula(stateCanvas.tipoCuadricula);
	}, []);

	return (
		<article className="article__menuCuadricula">
			<div className="article__menuCuadricula__paletaTipo">
				<div>
					<span>Cuadricula: </span>
				</div>
				<div className="article__menuCuadricula__paletaTipo__icons">
					{arrayIconCuadricula.map((elem) => (
						<img
							className="article__menuCuadricula__paletaTipo__icons__icon "
							src={elem.iconCuadricula}
							id={elem.id}
							key={`key-${elem.id}`}
							onClick={() => handleCuadriculaTipo(elem.tipo)}
						/>
					))}
				</div>
			</div>
			<div className="article__menuCuadricula__paletaAncho">
				<div>
					<span>Tamaño: </span>
				</div>
				<div className="inputButton">
					<input type="button" value="-" onClick={() => handleBtnAncho('-')} />
				</div>
				<div className="inputButton">
					<input type="button" value="+" onClick={() => handleBtnAncho('+')} />
				</div>
			</div>
		</article>
	);
};

export default MenuCuadricula;
