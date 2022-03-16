import React, { useContext, useEffect } from 'react';

import './MenuPlano.scss';

// CONTEXT:
import AppContextPlano from '../../context/AppContextPlano';

const MenuPlano = () => {
	// useContext:
	const {
		statePlano,
		s_planoUpdateWidthCuadricula,
	} = useContext(AppContextPlano);

	// LOGICA
	const handleWidth = (op) => {
		let valor = parseInt(document.getElementById('plano_width').value);
		op == '+' ? (valor = valor + 10) : (valor = valor - 10);
		if (valor < 10) {
			valor = 10;
		} else {
			if (valor > 50) {
				valor = 50;
			} else {
				document.getElementById('plano_width').value = valor;
				s_planoUpdateWidthCuadricula(valor);
			}
		}
	};
	const updatePaletaInicio = () => {
		document.getElementById('plano_width').value = statePlano.width_cuadricula;
	};
	// LOGICA END.

	// useEffect
	useEffect(() => {
		updatePaletaInicio();
	}, []);
	return (
		<article className="article__menuPlano">
			<div className="article__menuPlano__width">
				<span>WIDTH:</span>
				<span>
					<input
						className="text"
						type="text"
						defaultValue="10"
						id="plano_width"
						disabled
					/>
				</span>
				<span>
					<input type="button" value="-" onClick={() => handleWidth('-')} />
				</span>
				<span>
					<input type="button" value="+" onClick={() => handleWidth('+')} />
				</span>
			</div>
		</article>
	);
};

export default MenuPlano;
