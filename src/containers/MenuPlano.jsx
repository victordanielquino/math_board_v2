import React, { useContext, useEffect } from 'react';

import '../styles/MenuPlano.scss';

// CONTEXT:
import AppContextPlano from '../context/AppContextPlano';

const MenuPlano = () => {
	// useContext:
	const { statePlano } = useContext(AppContextPlano);

	// LOGICA
	const handleAdd = () => {
		console.log('press add');
	};
	// LOGICA END.

	// useEffect
	useEffect(() => {}, []);
	return (
		<article className="article__menuPlano">
			<div className="article__menuPlano__limites">
				<div className="article__menuPlano__limites__minMay">
					<span>X_MIN: </span>
					<span>
						<input
							className="text"
							type="text"
							defaultValue={statePlano.x_min}
						/>
					</span>
					<span>
						<input type="button" value="-" />
					</span>
					<span>
						<input type="button" value="+" />
					</span>
				</div>
				<div className="article__menuPlano__limites__minMay">
					<span>Y_MAY:</span>
					<span>
						<input
							className="text"
							type="text"
							defaultValue={statePlano.y_max}
						/>
					</span>
					<span>
						<input type="button" value="-" />
					</span>
					<span>
						<input type="button" value="+" />
					</span>
				</div>
			</div>
			<div className="article__menuPlano__salto">
				<div className="article__menuPlano__salto__minMay">
					<span>PRESS:</span>
					<span>
						<input
							className="text"
							type="button"
							defaultValue="ADD"
							onClick={() => handleAdd()}
						/>
					</span>
				</div>
			</div>
		</article>
	);
};

export default MenuPlano;
