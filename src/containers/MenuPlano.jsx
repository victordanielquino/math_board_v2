import React, { useContext, useEffect } from 'react';

import '../styles/MenuPlano.scss';

// CONTEXT:
import AppContextPlano from '../context/AppContextPlano';

const MenuPlano = () => {
	// useContext:
	const {
		statePlano,
		s_planoUpdateXmin,
		s_planoUpdateYmax,
		s_planoUpdateWidthCuadricula,
	} = useContext(AppContextPlano);

	// LOGICA
	const handleAdd = () => {
		console.log('press add');
	};
	const handleXmin = (op) => {
		let valor = parseInt(document.getElementById('plano_x_min').value);
		op == '+' ? valor++ : valor--;
		if (valor > -1) {
			valor = -1;
		} else {
			document.getElementById('plano_x_min').value = valor;
			s_planoUpdateXmin(valor);
		}
	};
	const handleYmax = (op) => {
		let valor = parseInt(document.getElementById('plano_y_max').value);
		op == '+' ? valor++ : valor--;
		if (valor < 1) {
			valor = 1;
		} else {
			document.getElementById('plano_y_max').value = valor;
			s_planoUpdateYmax(valor);
		}
	};
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
		document.getElementById('plano_y_max').value = statePlano.y_max;
		document.getElementById('plano_x_min').value = statePlano.x_min;
		document.getElementById('plano_width').value = statePlano.width_cuadricula;
	};
	// LOGICA END.

	// useEffect
	useEffect(() => {
		updatePaletaInicio();
	}, []);
	return (
		<article className="article__menuPlano">
			<div className="article__menuPlano__limiteXY">
				<span>- X: </span>
				<span>
					<input
						className="text"
						type="text"
						defaultValue="-10"
						id="plano_x_min"
						disabled
					/>
				</span>
				<span>
					<input type="button" value="-" onClick={() => handleXmin('-')} />
				</span>
				<span>
					<input type="button" value="+" onClick={() => handleXmin('+')} />
				</span>
			</div>
			<div className="article__menuPlano__limiteXY">
				<span>+ Y:</span>
				<span>
					<input
						className="text"
						type="text"
						defaultValue="10"
						id="plano_y_max"
						disabled
					/>
				</span>
				<span>
					<input type="button" value="-" onClick={() => handleYmax('-')} />
				</span>
				<span>
					<input type="button" value="+" onClick={() => handleYmax('+')} />
				</span>
			</div>
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
