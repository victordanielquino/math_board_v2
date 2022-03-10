import React, {useContext, useEffect, useState} from 'react';

// context
import AppContext from '../context/AppContext';
import AppContextLinea from '../context/AppContextLinea';

// components:
import PaletaColor from '../components/PaletaColor/PaletaColor';
import PaletaGrosor from '../components/PaletaGrosor/PaletaGrosor';

// styles:
import '../styles/MenuLinea.scss';
import CallMadeIcon from '@mui/icons-material/CallMade';

import OpenInFullIcon from '@mui/icons-material/OpenInFull';

import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import LooksIcon from '@mui/icons-material/Looks';

import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import CableIcon from '@mui/icons-material/Cable';
import EarbudsIcon from '@mui/icons-material/Earbuds';

import RemoveIcon from '@mui/icons-material/Remove';
import PowerInputIcon from '@mui/icons-material/PowerInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {Button} from "@mui/material";

const MenuLinea = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const { updateLineaColorGrosor , s_lineSetType, s_lineSetSegment, stateLinea} = useContext(AppContextLinea);

	// USESTATE:
	const [variantLine, setVariantLine] = useState('outlined'); // variant: outlined, contained
	const [variantCuadratic, setVariantCuadratic] = useState('outlined'); // variant: outlined, contained
	const [variantBeziel, setVariantBeziel] = useState('outlined'); // variant: outlined, contained
	const [variantVector, setVariantVector] = useState('outlined'); // variant: outlined, contained

	const [variantSegmentFalse, setVariantSegmentFalse] = useState('outlined'); // variant: outlined, contained
	const [variantSegmentTrue, setVariantSegmentTrue] = useState('outlined'); // variant: outlined, contained

	// LOGICA:
	const iniciaBtnTypeLine = (value) => {
		setVariantLine('outlined');
		setVariantCuadratic('outlined');
		setVariantBeziel('outlined');
		setVariantVector('outlined');
		switch (value){
			case 'line':
				setVariantLine('contained');
				break;
			case 'cuadratic':
				setVariantCuadratic('contained');
				break;
			case 'bezier':
				setVariantBeziel('contained');
				break;
			case 'vector':
				setVariantVector('contained');
				break;
			default:
				break;
		}
	}
	const iniciaBtnSegmentLine = (boolean) => {
		setVariantSegmentTrue('outlined');
		setVariantSegmentFalse('outlined');
		switch (boolean) {
			case false:
				setVariantSegmentFalse('contained');
				break;
			case true:
				setVariantSegmentTrue('contained');
				break;
			default:
				break;
		}
	}
	const handleBtnTypeLine = (value) => {
		s_lineSetType(value);

		setVariantLine('outlined');
		setVariantCuadratic('outlined');
		setVariantBeziel('outlined');
		setVariantVector('outlined')
		switch (value){
			case 'line':
				setVariantLine('contained');
				break;
			case 'cuadratic':
				setVariantCuadratic('contained');
				break;
			case 'bezier':
				setVariantBeziel('contained');
				break;
			case 'vector':
				setVariantVector('contained');
				break;
			default:
				break;
		}
	}
	const handleBtnSegmentLine = (boolean) => {
		s_lineSetSegment(boolean);

		setVariantSegmentTrue('outlined');
		setVariantSegmentFalse('outlined');
		switch (boolean) {
			case false:
				setVariantSegmentFalse('contained');
				break;
			case true:
				setVariantSegmentTrue('contained');
				break;
			default:
				break;
		}
	}
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		//console.log('ue MenuLinea.jsx');
		updateLineaColorGrosor(state.color, state.grosor);
	}, [stateLinea.active]);

	useEffect(() => {
		iniciaBtnTypeLine(stateLinea.type);
		iniciaBtnSegmentLine(stateLinea.segment);
	}, []);

	return (
		<article className="article__menuLinea">
			{<PaletaGrosor title="LINEA" />}
			<div className='article__menuLinea__btns'>
				<Button variant={variantLine} size='small' onClick={() => handleBtnTypeLine('line')}><OpenInFullIcon fontSize='small'/></Button>
				<Button variant={variantCuadratic} size='small' onClick={() => handleBtnTypeLine('cuadratic')}><UTurnRightIcon fontSize='small'/></Button>
				<Button variant={variantBeziel} size='small' onClick={() => handleBtnTypeLine('bezier')}><SwapCallsIcon fontSize='small'/></Button>
				<Button variant={variantVector} size='small' onClick={() => handleBtnTypeLine('vector')}><CallMadeIcon fontSize='small'/></Button>
			</div>
			<div className='article__menuLinea__segment'>
				<Button variant={variantSegmentFalse} color='success' size='small' onClick={() => handleBtnSegmentLine(false)}><HorizontalRuleIcon fontSize='small'/></Button>
				<Button variant={variantSegmentTrue} color='success' size='small' onClick={() => handleBtnSegmentLine(true)}><MoreHorizIcon fontSize='small'/></Button>
			</div>
			{<PaletaColor tipo="linea" title="Color" />}
		</article>
	);
};

export default MenuLinea;
