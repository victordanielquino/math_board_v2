import React, { useEffect, useContext, useState } from 'react';

// estilos:
import '../styles/Header.scss';

// containers:
import Menu1 from '../containers/Menu1';
import MenuPlano from '../containers/MenuPlano';
import MenuMover from '../containers/MenuMover';
import MenuLapiz from '../containers/MenuLapiz';
import MenuBorrador from '../containers/MenuBorrador';
import MenuCuadrado from '../containers/MenuCuadrado';
import MenuCuadricula from '../containers/MenuCuadricula';
import MenuLinea from '../containers/MenuLinea';

// context:
import AppContext from '../context/AppContext';

// iconos:

const Header = () => {
	// useContext:
	const { state } = useContext(AppContext);

	// useState:
	const [toggleMenu1, setToggleMenu1] = useState(false);
	//const [toggleMenu2, setToggleMenu2] = useState(false);
	const [toggleMenuMover, setToggleMenuMover] = useState(false);
	const [toggleMenuLapiz, setToggleMenuLapiz] = useState(false);
	const [toggleMenuBorrador, setToggleMenuBorrador] = useState(false);
	const [toggleMenuCuadrado, setToggleMenuCuadrado] = useState(false);
	const [toggleMenuCuadricula, setToggleMenuCuadricula] = useState(false);
	const [toggleMenuLinea, setToggleMenuLinea] = useState(false);
	const [toggleMenuPlano, setToggleMenuPlano] = useState(false);

	// useEffect:
	useEffect(() => {
		switch (state.active) {
			case 'moverIcon':
				setToggleMenu1(false);
				setToggleMenuMover(true);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
			case 'lapizIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(true);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
			case 'borradorIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(true);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
			case 'cuadradoIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(true);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
			case 'lineaIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(true);
				setToggleMenuPlano(false);
				break;
			case 'planoIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(true);
				break;
			case 'cuadriculaIcon':
				setToggleMenu1(false);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(true);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
			default:
				setToggleMenu1(true);
				setToggleMenuMover(false);
				setToggleMenuLapiz(false);
				setToggleMenuBorrador(false);
				setToggleMenuCuadrado(false);
				setToggleMenuCuadricula(false);
				setToggleMenuLinea(false);
				setToggleMenuPlano(false);
				break;
		}
	}, [state]);
	return (
		<nav className="header__nav">
			<div className="navbar-left">
				<ul>
					<li>
						<a href="/">MathBoard</a>
					</li>
				</ul>
			</div>
			<div className="navbar-central">
				{toggleMenu1 && <Menu1 />}
				{toggleMenuPlano && <MenuPlano />}
				{toggleMenuMover && <MenuMover />}
				{toggleMenuLapiz && <MenuLapiz />}
				{toggleMenuBorrador && <MenuBorrador />}
				{toggleMenuCuadrado && <MenuCuadrado />}
				{toggleMenuCuadricula && <MenuCuadricula />}
				{toggleMenuLinea && <MenuLinea />}
			</div>
			<div className="navbar-right">
				<ul>
					<li className="navbar-email">UMSA / INFORMÁTICA</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
