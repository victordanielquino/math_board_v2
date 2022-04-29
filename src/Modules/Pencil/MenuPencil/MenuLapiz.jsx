import React, { useContext, useEffect } from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextLapiz from '../../../context/AppContextLapiz';

// components:
import PaletaColor          from '../../../components/PaletaColor/PaletaColorSinTitle';
import PaletaGrosor         from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';

// styles:
import './MenuLapiz.scss';
import {u_convertColorToRGBA} from "../../../utils/utils";

const MenuLapiz = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const { h_pencilSetColor, h_pencilSetGrosor, h_pencilSetColorGrosor} = useContext(AppContextLapiz);

	// LOGICA:

	// EFFECT:
	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.color, state.colorBlur)
		h_pencilSetColor(rgba);
	}, [state.color, state.colorBlur]);

	useEffect(() => {
		h_pencilSetGrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.color, state.colorBlur);
		h_pencilSetColorGrosor(rgba, state.grosor);
	}, [])

	return (
		<article style={{display:'flex', justifyContent:'center', alignItems:'center', background:'white', padding:'5px 25px', borderRadius:'10px'}}>
			{<div style={{marginRight:'20px'}}><PaletaGrosor /></div>}
			{<PaletaColor tipo='linea' />}
		</article>
	);
};

export default MenuLapiz;
