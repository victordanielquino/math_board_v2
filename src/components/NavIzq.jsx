import React, { useState, useContext, useEffect } from 'react';

import AppContext from '../context/AppContext';
import AppContextMover from '../context/AppContextMover';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextLinea from '../context/AppContextLinea';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextCuadricula from '../context/AppContextCanvas';
import AppContextPlano from '../context/AppContextPlano';

import Keyboard from '../containers/Keyboard';

import '../styles/NavIzq.scss';
import moverIcon from '../assets/icons/move1.svg';
import lapizIcon from '../assets/icons/pen1.svg';
import borradorIcon from '../assets/icons/eraser1.svg';
import calculadoraIcon from '../assets/icons/calculator.svg';
import planoIcon from '../assets/icons/graph-up.svg';
import plusIcon from '../assets/icons/plus-square.svg';
import textIcon from '../assets/icons/textarea.svg';
import zoomInIcon from '../assets/icons/zoom-in.svg';
import zoomOutIcon from '../assets/icons/zoom-out.svg';
import cuadradoIcon from '../assets/icons/square.svg';
import lineaIcon from '../assets/icons/linea.svg';
import funcionIcon from '../assets/icons/function1.svg';
import sumatoriaIcon from '../assets/icons/sumatoria1.svg';
import imageIcon from '../assets/icons/image1.svg';

import cuadriculaIcon from '../assets/icons/cuadricula.svg';
import keyboardIcon from '../assets/icons/keyboard1.svg';

const NavIzq = () => {
	// useContext:
	const { state, updateCanvasPaleta } = useContext(AppContext);
	const { updateMoverActive } = useContext(AppContextMover);
	const { updateLapizActive } = useContext(AppContextLapiz);
	const { updateBorradorActive } = useContext(AppContextBorrador);
	const { updateCuadradoActive } = useContext(AppContextCuadrado);
	const { updateCuadriculaActive } = useContext(AppContextCuadricula);
	const { updateLineaActive } = useContext(AppContextLinea);
	const { updatePlanoActive } = useContext(AppContextPlano);

	// useState:
	const [toggleKeyboard, setToggleKeyboard] = useState(false);

	const iconosPaleta = [
		[moverIcon, 'moverIcon'],
		[lapizIcon, 'lapizIcon'],
		[borradorIcon, 'borradorIcon'],
		// [funcionIcon, 'funcionIcon'],
		// [sumatoriaIcon, 'sumatoriaIcon'],
		// [textIcon, 'textIcon'],
		[lineaIcon, 'lineaIcon'],
		[cuadradoIcon, 'cuadradoIcon'],
		// [calculadoraIcon, 'calculadoraIcon'],
		[planoIcon, 'planoIcon'],
		// [imageIcon, 'imageIcon'],
		// [zoomInIcon, 'zoomInIcon'],
		// [zoomOutIcon, 'zoomOutIcon'],
		[cuadriculaIcon, 'cuadriculaIcon'],
	];

	const handleIcon = (icon) => {
		// HOOKS - useInitialState:
		updateCanvasPaleta(icon);

		// HOOKS - useLapiz:
		switch (icon) {
			case 'moverIcon':
				updateMoverActive(true);
				updateLapizActive(false);
				updateBorradorActive(false);
				updateLineaActive(false);
				updateCuadradoActive(false);
				updatePlanoActive(false);
				updateCuadriculaActive(false);
				break;
			case 'lapizIcon':
				updateMoverActive(false);
				updateLapizActive(true);
				updateBorradorActive(false);
				updateLineaActive(false);
				updateCuadradoActive(false);
				updatePlanoActive(false);
				updateCuadriculaActive(false);
				break;
			case 'borradorIcon':
				updateMoverActive(false);
				updateLapizActive(false);
				updateBorradorActive(true);
				updateLineaActive(false);
				updateCuadradoActive(false);
				updatePlanoActive(false);
				updateCuadriculaActive(false);
				break;
			case 'lineaIcon':
				updateMoverActive(false);
				updateLapizActive(false);
				updateBorradorActive(false);
				updateLineaActive(true);
				updateCuadradoActive(false);
				updatePlanoActive(false);
				updateCuadriculaActive(false);
				break;
			case 'cuadradoIcon':
				updateMoverActive(false);
				updateLapizActive(false);
				updateBorradorActive(false);
				updateLineaActive(false);
				updateCuadradoActive(true);
				updatePlanoActive(false);
				updateCuadriculaActive(false);
				break;
			case 'planoIcon':
				updateMoverActive(false);
				updateLapizActive(false);
				updateBorradorActive(false);
				updateLineaActive(false);
				updateCuadradoActive(false);
				updatePlanoActive(true);
				updateCuadriculaActive(true);
				break;
			case 'cuadriculaIcon':
				updateMoverActive(false);
				updateLapizActive(false);
				updateBorradorActive(false);
				updateLineaActive(false);
				updateCuadradoActive(false);
				updatePlanoActive(false);
				updateCuadriculaActive(true);
				break;
			default:
				console.log('Opcion no registrada!!!');
				break;
		}
	};

	// useEffect:
	useEffect(() => {
		//console.log('useEffect: [state]');
		iconosPaleta.map((elem) => {
			if (state.active == elem[1]) {
				document.getElementById(elem[1]).classList.add('navIzq__nav__active');
			} else {
				document
					.getElementById(elem[1])
					.classList.remove('navIzq__nav__active');
			}
		});
		return () => {
			//console.log('return useEffect: [state]');
		};
	}, [state]);

	return (
		<nav className="navIzq__nav">
			<div className="navIzq__nav__top">
				{iconosPaleta.map((elem) => (
					<img
						src={elem[0]}
						onClick={() => handleIcon(elem[1])}
						key={elem[1]}
						id={elem[1]}
					/>
				))}
			</div>
			<div className="navIzq__nav__botton">
				<img
					className="navIzq__nav__div__keyboard"
					src={keyboardIcon}
					onClick={() => setToggleKeyboard(!toggleKeyboard)}
				/>
			</div>
			{toggleKeyboard && <Keyboard />}
		</nav>
	);
};

export default NavIzq;
