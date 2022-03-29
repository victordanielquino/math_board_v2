import React, { useState, useContext, useEffect } from 'react';

import AppContext from '../context/AppContext';
import AppContextMover from '../context/AppContextMover';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextLinea from '../context/AppContextLinea';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextCuadricula from '../context/AppContextCanvas';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";
import AppContextTriangulo from "../context/AppContextTriangulo";
import AppContextImagen from "../context/AppContextImagen";
import AppContextFunction from "../context/AppContextFunction";

import Keyboard from '../Modules/Function/Keyboard/Keyboard';

import './NavIzq.scss';
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
import sumatoriaIcon from '../assets/icons/sumatoria1.svg';
import imagenIcon from '../assets/icons/image1.svg';
import circuloIcon from '../assets/icons/circle.svg';
import cuadriculaIcon from '../assets/icons/cuadricula.svg';
import keyboardIcon from '../assets/icons/keyboard1.svg';
import trianguloIcon from '../assets/icons/triangle.svg';
import functionIcon from '../assets/icons/function1.svg';

const NavIzq = () => {
	// useContext:
	const { state, updateCanvasPaleta , s_setActiveActivePrev} = useContext(AppContext);
	const { updateMoverActive } = useContext(AppContextMover);
	const { updateLapizActive } = useContext(AppContextLapiz);
	const { updateBorradorActive } = useContext(AppContextBorrador);
	const { updateCuadradoActive } = useContext(AppContextCuadrado);
	const { updateCuadriculaActive } = useContext(AppContextCuadricula);
	const { updateLineaActive } = useContext(AppContextLinea);
	const { updatePlanoActive } = useContext(AppContextPlano);
	const { updateTextActive, h_textSetReset } = useContext(AppContextText);
	const { updateCirculoActive } = useContext(AppContextCirculo);
	const { s_trianguloUpdateActive } = useContext(AppContextTriangulo);
	const { s_imagenUpdateActive } = useContext(AppContextImagen);
	const { s_functionSetActive } = useContext(AppContextFunction);

	// useState:
	const [toggleKeyboard, setToggleKeyboard] = useState(false);

	const iconosPaleta = [
		[moverIcon, 'moverIcon'],
		[lapizIcon, 'lapizIcon'],
		[textIcon, 'textIcon'],
		// [sumatoriaIcon, 'sumatoriaIcon'],
		[lineaIcon, 'lineaIcon'],
		[cuadradoIcon, 'cuadradoIcon'],
		[circuloIcon, 'circuloIcon'],
		// [calculadoraIcon, 'calculadoraIcon'],
		[trianguloIcon, 'trianguloIcon'],
		[imagenIcon, 'imagenIcon'],
		// [zoomInIcon, 'zoomInIcon'],
		// [zoomOutIcon, 'zoomOutIcon'],
		[planoIcon, 'planoIcon'],
		[cuadriculaIcon, 'cuadriculaIcon'],
		[borradorIcon, 'borradorIcon'],
		[functionIcon, 'functionIcon'],
	];

	const updateIcon = (icon, boolean) => {
		switch (icon) {
			case 'moverIcon':
				updateMoverActive(boolean);
				break;
			case 'lapizIcon':
				updateLapizActive(boolean);
				break;
			case 'borradorIcon':
				updateBorradorActive(boolean);
				break;
			case 'lineaIcon':
				updateLineaActive(boolean);
				break;
			case 'cuadradoIcon':
				updateCuadradoActive(boolean);
				break;
			case 'planoIcon':
				updatePlanoActive(boolean);
				break;
			case 'cuadriculaIcon':
				updateCuadriculaActive(boolean);
				break;
			case 'textIcon':
				updateTextActive(boolean);
				break;
			case 'circuloIcon':
				updateCirculoActive(boolean);
				break;
			case 'trianguloIcon':
				s_trianguloUpdateActive(boolean);
				break;
			case 'imagenIcon':
				s_imagenUpdateActive(boolean);
				break;
			case 'functionIcon':
				s_functionSetActive(boolean);
				setToggleKeyboard(boolean);
				break;
			default:
				console.log('Opcion no registrada!!!');
				break;
		}
	};
	const handleIcon2 = (icon) => {
		let activePrev = state.active;
		let active = icon;
		s_setActiveActivePrev(active, activePrev);
	}

	// useEffect:
	useEffect(() => {
		//console.log('useEffect: [state]');
		iconosPaleta.map((elem) => {
			if (state.active === elem[1]) {
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

	useEffect(() => {
		updateIcon(state.activePrev, false);
		updateIcon(state.active, true);
	}, [state.active])

	return (
		<nav className="navIzq__nav">
			<div className="navIzq__nav__top">
				{iconosPaleta.map((elem) => (
					<img
						src={elem[0]}
						onClick={() => handleIcon2(elem[1])}
						key={elem[1]}
						id={elem[1]}
					/>
				))}
			</div>
			{/*<div className="navIzq__nav__botton">
				<img
					className="navIzq__nav__div__keyboard"
					src={keyboardIcon}
					onClick={() => setToggleKeyboard(!toggleKeyboard)}
				/>
			</div>*/}
			{toggleKeyboard && <Keyboard />}
		</nav>
	);
};

export default NavIzq;