import React, { useState, useContext, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faBell, faArrowsUpDownLeftRight, faHouse, faPencil, faFont, faSquare, faSlash, faCircle, faImage, faChartLine,
	faEraser, faGrip, faFlorinSign, faSquareRootVariable, faTableCellsLarge, faCalculator, faScissors, faShapes
} from '@fortawesome/free-solid-svg-icons'; // fa-regular
import {} from '@fortawesome/free-brands-svg-icons'; // fa-brands
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

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
import AppContextFunction   from "../../context/AppContextFunction";
import AppContextCalculator from "../../context/AppContextCalculator";

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
	const { h_calculatorSetActive } = useContext(AppContextCalculator);

	// STATE:
	const [navHeight, setNavHeight] = useState(window.innerHeight - 112);
	const [toggleKeyboard, setToggleKeyboard] = useState(false);
	const [select, setSelect] = useState('homeIcon');
	const [toggleCalculadora, setToggleCalculadora] = useState(false);

	const awesomeIcons = [
		{ fontSize:'1.4em', type:'awesome', name: 'homeIcon', icon: <FontAwesomeIcon icon={faHouse} style={{}}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'moverIcon', icon: <FontAwesomeIcon icon={faArrowsUpDownLeftRight} style={{}}/> },
		{ fontSize:'1.4em', type:'awesome', name: 'lapizIcon', icon: <FontAwesomeIcon icon={faPencil} style={{}}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'textIcon', icon: <FontAwesomeIcon icon={faFont} style={{}}/> },
		{ fontSize:'1.2em', type:'awesome', name: 'lineaIcon', icon:<FontAwesomeIcon icon={faSlash} style={{}}/>  },
		{ fontSize:'1.4em', type:'mui', name: 'cuadradoIcon', icon: <CheckBoxOutlineBlankIcon style={{fontSize: '1.3em', margin:0, padding: 0, }}/>  },
		{ fontSize:'1.4em', type:'mui', name: 'circuloIcon', icon: <PanoramaFishEyeIcon style={{fontSize: '1.3em', margin:0, padding: 0, }}/> },
		{ fontSize:'1.4em', type:'mui', name: 'trianguloIcon', icon: <ChangeHistoryIcon style={{fontSize: '1.3em', margin:0, padding: 0, }}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'imagenIcon', icon: <FontAwesomeIcon icon={faImage} style={{}}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'planoIcon', icon: <FontAwesomeIcon icon={faChartLine} style={{}}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'cuadriculaIcon', icon: <FontAwesomeIcon icon={faTableCellsLarge} style={{}}/> },
		{ fontSize:'1.5em', type:'awesome', name: 'borradorIcon', icon: <FontAwesomeIcon icon={faEraser} style={{}}/> },
		{ fontSize:'1.4em', type:'awesome', name: 'functionIcon', icon: <FontAwesomeIcon icon={faFlorinSign} style={{}}/> },
		{ fontSize:'1.4em', type:'awesome', name: 'calculadoraIcon', icon: <FontAwesomeIcon icon={faCalculator} style={{}}/> },
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
				h_calculatorSetActive(boolean);
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
			<ButtonGroup orientation='vertical'>
				{awesomeIcons.map((elem) => (
					<Button key={`key-${elem.name}`} onClick={() => handleSelect(elem.name)} size='small' variant={select === elem.name ? 'contained':'outlined'} className={classes.awesomeIcon} style={{fontSize:elem.fontSize, padding:'5px 0', height:'40px'}}>
						{elem.icon}
					</Button>
				))}
			</ButtonGroup>
			{toggleKeyboard && <Keyboard />}
		</nav>
	);
};

export default NavIzq;
