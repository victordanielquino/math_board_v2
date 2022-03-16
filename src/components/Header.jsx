import React, { useEffect, useContext, useState } from 'react';

// estilos:
import '../styles/Header.scss';

// containers:
import Menu1 from '../containers/Menu1';
import MenuPlano from '../containers/MenuPlano/MenuPlano';
import MenuMover from '../containers/MenuMover';
import MenuLapiz from '../containers/MenuLapiz';
import MenuBorrador from '../containers/MenuBorrador';
import MenuCuadrado from '../containers/MenuCuadrado';
import MenuCuadricula from '../containers/MenuCuadricula';
import MenuLinea from '../containers/MenuLinea';
import MenuText from '../containers/MenuText/MenuText';
import MenuCirculo from "../containers/MenuCirculo";
import MenuTriangulo from "../containers/MenuTriangulo";
import MenuImagen from "../containers/MenuImagen";

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
	const [toggleMenuText, setToggleMenuText] = useState(false);
	const [toggleMenuCirculo, setToggleMenuCirculo] = useState(false);
	const [toggleMenuTriangulo, setToggleMenuTriangulo] = useState(false);
	const [toggleMenuImagen, setToggleMenuImagen] = useState(false);

	// useEffect:
	useEffect(() => {
		setToggleMenu1(false);
		setToggleMenuMover(false);
		setToggleMenuLapiz(false);
		setToggleMenuBorrador(false);
		setToggleMenuCuadrado(false);
		setToggleMenuCuadricula(false);
		setToggleMenuLinea(false);
		setToggleMenuPlano(false);
		setToggleMenuText(false);
		setToggleMenuCirculo(false);
		setToggleMenuTriangulo(false);
		setToggleMenuImagen(false);
		switch (state.active) {
			case 'moverIcon':
				setToggleMenuMover(true);
				break;
			case 'lapizIcon':
				setToggleMenuLapiz(true);
				break;
			case 'borradorIcon':
				setToggleMenuBorrador(true);
				break;
			case 'cuadradoIcon':
				setToggleMenuCuadrado(true);
				break;
			case 'lineaIcon':
				setToggleMenuLinea(true);
				break;
			case 'planoIcon':
				setToggleMenuPlano(true);
				break;
			case 'cuadriculaIcon':
				setToggleMenuCuadricula(true);
				break;
			case 'textIcon':
				setToggleMenuText(true);
				break;
			case 'circuloIcon':
				setToggleMenuCirculo(true);
				break;
			case 'trianguloIcon':
				setToggleMenuTriangulo(true);
				break;
			case 'imagenIcon':
				setToggleMenuImagen(true);
				break;
			default:
				setToggleMenu1(true);
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
				{toggleMenuText && <MenuText />}
				{toggleMenuCirculo && <MenuCirculo />}
				{toggleMenuTriangulo && <MenuTriangulo />}
				{toggleMenuImagen && <MenuImagen />}
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
