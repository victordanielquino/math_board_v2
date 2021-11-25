import React, { useContext, useEffect } from 'react';

// context
import AppContext from '../context/AppContext';
import AppContextLapiz from '../context/AppContextLapiz';

// components:
import PaletaColor from '../components/PaletaColor';
import PaletaGrosor from '../components/PaletaGrosor';

// styles:
import '../styles/MenuLapiz.scss';

const MenuLapiz = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const { updateLapizColorGrosor } = useContext(AppContextLapiz);

	// LOGICA:

	// LOGICA END.

	// useEffect:
	useEffect(() => {
		updateLapizColorGrosor(state.color, state.grosor);
	}, [state]);
	useEffect(() => {
		//console.log('STATE LAPIZ:', stateLapiz);
	}, []);

	return (
		<article className="article__menuLapiz">
			{<PaletaGrosor title="LINEA" />}
			{<PaletaColor tipo="linea" title="Color" />}
		</article>
	);
};

export default MenuLapiz;
