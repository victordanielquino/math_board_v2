import React, { useEffect, useContext, useState } from 'react';

// estilos:
import './Header.scss';

// containers:
import MenuHeader from './MenuHeader/MenuHeader';
import MenuPlano from '../../Modules/Plano/MenuPlano/MenuPlano';
import MenuMove  from '../../Modules/Move/MenuMove/MenuMove';
import MenuLapiz from '../../Modules/Pencil/MenuPencil/MenuLapiz';
import MenuEraser   from '../../Modules/Eraser/MenuEraser/MenuEraser';
import MenuCuadrado from '../../Modules/Square/MenuSquare/MenuCuadrado';
import MenuGrid     from '../../Modules/Grid/MenuGrid/MenuGrid';
import MenuLinea    from '../../Modules/Line/MenuLine/MenuLinea';
import MenuText from '../../Modules/Text/MenuText/MenuText';
import MenuCirculo from "../../Modules/Circle/MenuCircle/MenuCirculo";
import MenuTriangulo from "../../Modules/Triangle/MenuTriangle/MenuTriangulo";
import MenuImagen_   from "../../Modules/Image/MenuImage/MenuImagen";
import MenuFunction  from "../../Modules/Function/MenuFunction/MenuFunction";

// context:
import AppContext from '../../context/AppContext';

// iconos:

const Header = () => {
	// useContext:
	const { state } = useContext(AppContext);

	// useState:
	const [toggleMenuHeader, setToggleMenuHeader] = useState(false);
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
	const [toggleMenuFunction, setToggleMenuFunction] = useState(false);

	// useEffect:
	useEffect(() => {
		setToggleMenuHeader(false);
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
		setToggleMenuFunction(false);
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
			case 'functionIcon':
				setToggleMenuFunction(true);
				break;
			default:
				setToggleMenuHeader(true);
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
				{toggleMenuHeader && <MenuHeader />}
				{toggleMenuPlano && <MenuPlano />}
				{toggleMenuMover && <MenuMove />}
				{toggleMenuLapiz && <MenuLapiz />}
				{toggleMenuBorrador && <MenuEraser />}
				{toggleMenuCuadrado && <MenuCuadrado />}
				{toggleMenuCuadricula && <MenuGrid />}
				{toggleMenuLinea && <MenuLinea />}
				{toggleMenuText && <MenuText />}
				{toggleMenuCirculo && <MenuCirculo />}
				{toggleMenuTriangulo && <MenuTriangulo />}
				{toggleMenuImagen && <MenuImagen_ />}
				{toggleMenuFunction && <MenuFunction />}
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
