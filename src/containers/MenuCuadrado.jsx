import React, { useEffect, useContext } from 'react';

// context
import AppContext from '../context/AppContext';
import AppContextCuadrado from '../context/AppContextCuadrado';

// styles:
import '../styles/MenuCuadrado.scss';

// components:
import PaletaGrosor from '../components/PaletaGrosor';
import PaletaColorBorde from '../components/PaletaColor';
import PaletaColorFondo from '../components/PaletaColor';

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
		// solo 1 vez al cargar el componente:
	}, []);
	useEffect(() => {
		// solo cuando se modifica [stateCuadrado]:
	}, [stateCuadrado]);

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
			{<PaletaColorBorde tipo="linea" title="Borde" />}
			{<PaletaColorFondo tipo="fondo" title="Fondo" />}
		</article>
	);
};

export default MenuCuadrado;
