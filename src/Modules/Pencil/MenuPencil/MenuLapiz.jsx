import React, { useContext, useEffect } from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextLapiz from '../../../context/AppContextLapiz';

// components:
import PaletaColor from '../../PaletaColor/PaletaColor';
import PaletaGrosor from '../../PaletaGrosor/PaletaGrosor';

// styles:
import './MenuLapiz.scss';

const MenuLapiz = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const { updateLapizColorGrosor, stateLapiz } = useContext(AppContextLapiz);

	// LOGICA:

	// LOGICA END.

	// useEffect:
	useEffect(() => {
		//console.log('ue MenuLapiz.jsx');
		updateLapizColorGrosor(state.color, state.grosor);
	}, [state]);

	return (
		<article className="article__menuLapiz">
			{<PaletaGrosor title="LINEA" />}
			{<PaletaColor tipo="linea" title="Color" />}
		</article>
	);
};

export default MenuLapiz;