import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextCuadrado from '../../../context/AppContextCuadrado';

// styles:
import './MenuCuadrado.scss';

// components:
import PaletaGrosor from '../../PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde from '../../PaletaColor/PaletaColor';
import PaletaColorFondo from '../../PaletaColor/PaletaColor';

const MenuCuadrado = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const {
		stateCuadrado,
		updateCuadradoBordeGrosor,
		updateCuadradoBorde_ColorEstado,
		updateCuadradoFondo_ColorEstado,
		update_all,
	} = useContext(AppContextCuadrado);

	// LOGICA:
	// LOGICA END

	// useEffect:
	useEffect(() => {
		// se ejecuta cada vez que se modifica el state.color
		updateCuadradoBorde_ColorEstado(state.color, state.color != 'white');
	}, [state.color]);

	useEffect(() => {
		// se ejecuta cada vez que se modifica el state
		updateCuadradoFondo_ColorEstado(
			state.colorFondo,
			state.colorFondo != 'white'
		);
	}, [state.colorFondo]);

	useEffect(() => {
		updateCuadradoBordeGrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		update_all(
			state.color,
			state.colorFondo,
			state.grosor,
			state.color != 'white',
			state.colorFondo != 'white'
		);
	}, []);
	return (
		<article className="article__menuCuadrado">
			{<PaletaGrosor title="BORDE" />}
			{<PaletaColorBorde tipo="linea" title="BORDE" />}
			{<PaletaColorFondo tipo="fondo" title="FONDO" />}
		</article>
	);
};

export default MenuCuadrado;
