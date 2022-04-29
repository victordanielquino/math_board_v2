import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextCuadrado from '../../../context/AppContextCuadrado';

// styles:

// components:
import PaletaGrosor           from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde       from '../../../components/PaletaColor/PaletaColor';
import PaletaColorFondo       from '../../../components/PaletaColor/PaletaColor';
import PaletaColor            from "../../../components/PaletaColor/PaletaColorSinTitle";
import {u_convertColorToRGBA} from "../../../utils/utils";

const MenuCuadrado = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const {
		h_squareSetBordegrosor,
		h_squareSetBordecolorBordeestado,
		h_squareSetFondocolorFondoestado,
		h_squareSetAll,
	} = useContext(AppContextCuadrado);

	// LOGICA:

	// EFFECT:
	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.color, state.colorBlur);
		h_squareSetBordecolorBordeestado(rgba, state.color !== 'white');
	}, [state.color, state.colorBlur]);

	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
		h_squareSetFondocolorFondoestado(rgba, state.colorFondo !== 'white');
	}, [state.colorFondo, state.colorFondoBlur]);

	useEffect(() => {
		h_squareSetBordegrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		let color = u_convertColorToRGBA(state.color, state.colorBlur);
		let colorFondo = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
		h_squareSetAll(
			color,
			colorFondo,
			state.grosor,
			state.color !== 'white',
			state.colorFondo !== 'white'
		);
	}, []);
	return (
		<article style={{display:'flex', justifyContent:'center', alignItems:'center', background:'white', padding:'5px 25px', borderRadius:'10px'}}>
			{<div style={{marginRight:'20px'}}><PaletaGrosor /></div>}
			{<div style={{marginRight:'20px'}}><PaletaColor tipo='linea' title='BORDE' /></div>}
			{<div style={{marginRight:'0px'}}><PaletaColor tipo='fondo' title='FONDO' /></div>}
		</article>
	);
};

export default MenuCuadrado;
