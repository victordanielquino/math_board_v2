import React, { useContext, useEffect } from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextLapiz from '../../../context/AppContextLapiz';

// components:
import PaletaColor from '../../PaletaColor/PaletaColorSinTitle';
import PaletaGrosor from '../../PaletaGrosor/PaletaGrosorSinTitle';

// styles:
import './MenuLapiz.scss';

const MenuLapiz = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const { updateLapizColorGrosor } = useContext(AppContextLapiz);

	// LOGICA:

	// EFFECT:
	useEffect(() => {
		//console.log('ue MenuLapiz.jsx');
		updateLapizColorGrosor(state.color, state.grosor);
	}, [state]);

	return (
		<article className="article__menuLapiz">
			{<PaletaGrosor title="LINEA" />}
			{<PaletaColor tipo="linea"/>}
		</article>
	);
};

export default MenuLapiz;
