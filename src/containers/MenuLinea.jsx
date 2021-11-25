import React, { useContext, useEffect } from 'react';

// context
import AppContext from '../context/AppContext';
import AppContextLinea from '../context/AppContextLinea';

// components:
import PaletaColor from '../components/PaletaColor';
import PaletaGrosor from '../components/PaletaGrosor';

// styles:
import '../styles/MenuLinea.scss';

const MenuLinea = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const { updateLineaColorGrosor } = useContext(AppContextLinea);

	// LOGICA:

	// LOGICA END.

	// useEffect:
	useEffect(() => {
		updateLineaColorGrosor(state.color, state.grosor);
	}, [state]);
	useEffect(() => {
		//console.log('STATE Linea:', stateLinea);
	}, []);

	return (
		<article className="article__menuLinea">
			{<PaletaGrosor title="LINEA" />}
			{<PaletaColor tipo="linea" title="Color" />}
		</article>
	);
};

export default MenuLinea;
