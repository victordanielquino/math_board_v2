import React, { useState, useContext, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faArrowsUpDownLeftRight, faHouse, faPencil, faFont, faSquare,
} from '@fortawesome/free-solid-svg-icons'; // fa-regular
import {} from '@fortawesome/free-brands-svg-icons'; // fa-brands

import AppContext from '../../context/AppContext';
import AppContextMover from '../../context/AppContextMover';
import AppContextLapiz from '../../context/AppContextLapiz';
import AppContextBorrador from '../../context/AppContextBorrador';
import AppContextLinea from '../../context/AppContextLinea';
import AppContextCuadrado from '../../context/AppContextCuadrado';
import AppContextCuadricula from '../../context/AppContextGrid';
import AppContextPlano from '../../context/AppContextPlano';
import AppContextText from '../../context/AppContextText';
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextImagen from "../../context/AppContextImagen";
import AppContextFunction from "../../context/AppContextFunction";

import Keyboard from '../../Modules/Function/Keyboard/Keyboard';

import './NavIzq.scss';
import moverIcon from '../../assets/icons/move1.svg';
import lapizIcon from '../../assets/icons/pen1.svg';
import borradorIcon from '../../assets/icons/eraser1.svg';
import calculadoraIcon from '../../assets/icons/calculator.svg';
import planoIcon from '../../assets/icons/graph-up.svg';
import plusIcon from '../../assets/icons/plus-square.svg';
import textIcon from '../../assets/icons/textarea.svg';
import zoomInIcon from '../../assets/icons/zoom-in.svg';
import zoomOutIcon from '../../assets/icons/zoom-out.svg';
import cuadradoIcon from '../../assets/icons/square.svg';
import lineaIcon from '../../assets/icons/linea.svg';
import sumatoriaIcon from '../../assets/icons/sumatoria1.svg';
import imagenIcon from '../../assets/icons/image1.svg';
import circuloIcon from '../../assets/icons/circle.svg';
import cuadriculaIcon from '../../assets/icons/cuadricula.svg';
import keyboardIcon from '../../assets/icons/keyboard1.svg';
import trianguloIcon from '../../assets/icons/triangle.svg';
import functionIcon from '../../assets/icons/function1.svg';
import {Button, ButtonGroup, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {makeStyles} from "@mui/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500]
		}
	},
})
const useStyles  = makeStyles(theme => ({
	awesomeIcon : {
		fontSize: '1.5em',
		margin:0,
		padding:'7px'
	},
}))
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

	// STATE:
	const [navHeight, setNavHeight] = useState(window.innerHeight - 112);
	const [toggleKeyboard, setToggleKeyboard] = useState(false);
	const [select, setSelect] = useState('homeIcon');

	const iconosPaleta = [
		[moverIcon, 'moverIcon'],
		[lapizIcon, 'lapizIcon'],
		[textIcon, 'textIcon'],
		// [sumatoriaIcon, 'sumatoriaIcon'],
		[lineaIcon, 'lineaIcon'],
		[cuadradoIcon, 'cuadradoIcon'],
		[circuloIcon, 'circuloIcon'],
		[trianguloIcon, 'trianguloIcon'],
		[imagenIcon, 'imagenIcon'],
		// [zoomInIcon, 'zoomInIcon'],
		// [zoomOutIcon, 'zoomOutIcon'],
		[planoIcon, 'planoIcon'],
		[cuadriculaIcon, 'cuadriculaIcon'],
		[borradorIcon, 'borradorIcon'],
		[functionIcon, 'functionIcon'],
		[calculadoraIcon, 'calculadoraIcon'],
	];
	const awesomeIcons = [
		{ name: 'homeIcon', icon: faHouse },
		{ name: 'moverIcon', icon: faHouse },
		{ name: 'lapizIcon', icon: faHouse },
		{ name: 'textIcon', icon: faHouse },
		{ name: 'lineaIcon', icon: faHouse },
		{ name: 'cuadradoIcon', icon: faHouse },
		{ name: 'circuloIcon', icon: faHouse },
		{ name: 'trianguloIcon', icon: faHouse },
		{ name: 'imagenIcon', icon: faHouse },
		{ name: 'planoIcon', icon: faHouse },
		{ name: 'cuadriculaIcon', icon: faHouse },
		{ name: 'borradorIcon', icon: faHouse },
		{ name: 'functionIcon', icon: faHouse },
		{ name: 'calculadoraIcon', icon: faHouse },
	]

	// LOGICA:
	const props = {
		/*fontSize: '1em',
		height: 30,
		width: 30,*/
	}
	const classes = useStyles(props);
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
			case 'calculadoraIcon':
				s_functionSetActive(boolean);
				setToggleKeyboard(boolean);
				break;
			default:
				console.log('Opcion no registrada!!!');
				break;
		}
	};
	const handleIcon2 = (icon) => {
		console.log(icon)
		let activePrev = state.active;
		let active = icon;
		s_setActiveActivePrev(active, activePrev);
	}
	const updateNavHeight = () => setNavHeight(window.innerHeight - 112);


	const handleSelect = (value) => {
		setSelect(value);
		handleIcon2(value);
	};

	// useEffect:
	useEffect(() => {
		/*iconosPaleta.map((elem) => {
			if (state.active === elem[1]) {
				document.getElementById(elem[1]).classList.add('navIzq__nav__active');
			} else {
				document
					.getElementById(elem[1])
					.classList.remove('navIzq__nav__active');
			}
		});*/
	}, [state]);

	useEffect(() => {
		updateIcon(state.activePrev, false);
		updateIcon(state.active, true);
	}, [state.active]);

	useEffect(() => {
		window.addEventListener('resize', updateNavHeight);
		return () => {
			window.removeEventListener('resize', updateNavHeight);
		};
	}, []);

	return (
		<nav className="navIzq__nav" style={{height: navHeight+'px'}}>
			<div className="navIzq__nav__top">
				{/*{iconosPaleta.map((elem) => (
					<img
						src={elem[0]}
						onClick={() => handleIcon2(elem[1])}
						key={elem[1]}
						id={elem[1]}
					/>
				))}*/}
			</div>
			<ButtonGroup orientation='vertical'>
				{awesomeIcons.map((elem) => (
					<Button onClick={() => handleSelect(elem.name)} size='small' variant={select === elem.name ? 'contained':'outlined'} className={classes.awesomeIcon}>
						<FontAwesomeIcon icon={elem.icon}/>
					</Button>
				))}
			</ButtonGroup>
			<ButtonGroup orientation='vertical'>
				<Button onClick={() => handleSelect('homeIcon')} size='small' variant={select === 'homeIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faHouse}/>
				</Button>
				<Button onClick={() => handleSelect('lapizIcon')} size='small' variant={select === 'lapizIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faPencil}/>
				</Button>
				<Button onClick={() => handleSelect('bellIcon')} size='small' variant={select === 'bellIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faBell}/>
				</Button>
				<Button onClick={() => handleSelect('moveIcon')} size='small' variant={select === 'moveIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faArrowsUpDownLeftRight}/>
				</Button>
				<Button onClick={() => handleSelect('textIcon')} size='small' variant={select === 'textIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faFont}/>
				</Button>
				<Button onClick={() => handleSelect('squareIcon')} size='small' variant={select === 'squareIcon' ? 'contained':'outlined'} className={classes.awesomeIcon}>
					<FontAwesomeIcon icon={faSquare}/>
				</Button>
			</ButtonGroup>
			{/*<ToggleButtonGroup
				value={alignment}
				exclusive
				onChange={handleAlignment}
				aria-label="text alignment"
				orientation='vertical'
				color='primary'
				size='small'
			>
				<ToggleButton value="uno" aria-label="left aligned">
					<HomeIcon />
				</ToggleButton>
				<ToggleButton value="dos" aria-label="centered">
					<HomeIcon />
				</ToggleButton>
				<ToggleButton value="tres" aria-label="right aligned">
					<HomeIcon />
				</ToggleButton>
			</ToggleButtonGroup>*/}
			{toggleKeyboard && <Keyboard />}
		</nav>
	);
};

export default NavIzq;
