import React, {useContext, useEffect, useRef} from 'react';

// CONTEXT:
import AppContext from "../../../context/AppContext";
import AppContextGeometric from "../../../context/AppContextGeometric";

// components:
import PaletaGrosor     from '../../PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde from '../../PaletaColor/PaletaColor';
import PaletaColorFondo from '../../PaletaColor/PaletaColor';

// styles:
import './MenuGeometric.scss';
import {converInteger}  from "../../../utils/math";

const MenuGeometric = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const {
		stateGeometric,
		h_geometricSetAll,
		h_geometricSetBordecolorBordeestado,
		h_geometricSetFondocolorFondoestado,
		h_geometricSetBordeGrosor,
		h_geometricSetVertices,
	} = useContext(AppContextGeometric);

	// REF:
	const verticesRef = useRef(null);

	// LOGICA:
	const handleVertices = (value) => {
		(verticesRef.current.value > 5 && value === '-')
			? verticesRef.current.value = verticesRef.current.value - 1
			: (value === '+') ? verticesRef.current.value = verticesRef.current.value - (-1):'';
		h_geometricSetVertices(converInteger(verticesRef.current.value));
	}

	// EFFECT:
	useEffect(() => {
		h_geometricSetBordecolorBordeestado(state.color, state.color !== 'white');
	}, [state.color]);

	useEffect(() => {
		h_geometricSetFondocolorFondoestado(state.colorFondo, state.colorFondo !== 'white');
	}, [state.colorFondo]);

	useEffect(() => {
		h_geometricSetBordeGrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		h_geometricSetAll(
			state.color,
			state.colorFondo,
			state.grosor,
			state.color !== 'white',
			state.colorFondo !== 'white'
		);
	}, []);

	return (
		<article className="article__menuCirculo">
			<div className="article__menuCirculo__radio">
				<span>VERTICES:</span>
				<span>
					<input
						className="text"
						type="text"
						defaultValue={stateGeometric.vertices}
						ref={verticesRef}
						//onChange={() => onChangeInputRadio()}
						disabled
					/>
				</span>
				<span>
					<input type="button" value="-" onClick={() => handleVertices('-')} />
				</span>
				<span>
					<input type="button" value="+" onClick={() => handleVertices('+')} />
				</span>
			</div>
			{<PaletaGrosor title="BORDE" />}
			{<PaletaColorBorde tipo="linea" title="Borde" />}
			{<PaletaColorFondo tipo="fondo" title="Fondo" />}
		</article>
	);
};

export default MenuGeometric;
