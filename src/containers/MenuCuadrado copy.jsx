import React, { useEffect, useContext } from 'react';

// context
import AppContextCuadrado from '../context/AppContextCuadrado';

// styles:
import '../styles/MenuCuadrado.scss';

const MenuCuadrado = () => {
	// useContext:
	const {
		stateCuadrado,
		updateCuadradoBordeGrosor,
		updateCuadradoBordeEstado,
		updateCuadradoBordeColor,
		updateCuadradoFondoEstado,
		updateCuadradoFondoColor,
	} = useContext(AppContextCuadrado);

	// LOGICA:
	const obj = {
		borde: 2,
		radioColorBorde: 'si',
		radioColorFondo: 'si',
		inputColorBorde: 'black',
		inputColorFondo: 'black',
	};
	const handleGrosor = (opMatematica) => {
		let valor = parseInt(document.getElementById('bordeCuadrado').value);
		let update = true;
		switch (opMatematica) {
			case '+':
				valor + 1 < 10 ? (valor = valor + 1) : (update = false);
				break;
			case '-':
				valor - 1 > 0 ? (valor = valor - 1) : (update = false);
				break;
			default:
				break;
		}
		if (update) {
			document.getElementById('bordeCuadrado').value = valor;
			obj.borde = valor;
			updateCuadradoBordeGrosor(valor); // context
		} else {
			console.log('limite');
		}
	};
	const handleRadioColor = (e) => {
		if (e.target.name == 'radioColorBorde') {
			obj.radioColorBorde = e.target.value;
			e.target.value == 'si'
				? updateCuadradoBordeEstado(true)
				: updateCuadradoBordeEstado(false);
		} else {
			obj.radioColorFondo = e.target.value;
			e.target.value == 'si'
				? updateCuadradoFondoEstado(true)
				: updateCuadradoFondoEstado(false);
		}
	};
	const handleInputColor = (id, color_de_borde_o_fondo) => {
		document.getElementById(id).addEventListener('input', (e) => {
			if (color_de_borde_o_fondo == 'borde') {
				// color del borde del cuadrado:
				obj.inputColorBorde = e.target.value;
				updateCuadradoBordeColor(e.target.value);
			} else {
				// color del fondo del cuadrado:
				obj.inputColorFondo = e.target.value;
				updateCuadradoFondoColor(e.target.value);
			}
		});
	};
	// LOGICA END

	// useEffect:
	useEffect(() => {
		// solo 1 vez al cargar el componente:
	}, []);
	useEffect(() => {
		// solo cuando se modifica [stateCuadrado]:
	}, [stateCuadrado]);

	return (
		<article className="article__menuCuadrado">
			<div className="article__menuCuadrado__tamano">
				<span htmlFor="">BORDE: </span>
				<input
					type="text"
					className="input"
					id="bordeCuadrado"
					placeholder="2"
					defaultValue={stateCuadrado.bordeGrosor}
					disabled
				/>
				<input
					className="button"
					id="button1_txt"
					type="button"
					value="-"
					onClick={() => handleGrosor('-')}
				/>
				<input
					className="button"
					id="button2_txt"
					type="button"
					value="+"
					onClick={() => handleGrosor('+')}
				/>
			</div>
			<div className="article__menuCuadrado__paletaColor">
				<div>
					<span>C.BORDE: </span>
				</div>
				<div className="color">
					<input
						type="color"
						name="colorBorde"
						id="idColorBorde"
						onClick={() => handleInputColor('idColorBorde', 'borde')}
					/>
				</div>
				<div>
					<input
						type="radio"
						value="si"
						name="radioColorBorde"
						defaultChecked={stateCuadrado.bordeEstado}
						onChange={handleRadioColor}
					/>
				</div>
				<div>
					<label>SI</label>
				</div>
				<div>
					<input
						type="radio"
						value="no"
						name="radioColorBorde"
						onChange={handleRadioColor}
						defaultChecked={!stateCuadrado.bordeEstado}
					/>
				</div>
				<div>
					<label>NO</label>
				</div>
			</div>
			<div className="article__menuCuadrado__paletaColor">
				<div>
					<span>C.FONDO: </span>
				</div>
				<div className="color">
					<input
						type="color"
						name="colorFondo"
						id="idColorFondo"
						onClick={() => handleInputColor('idColorFondo', 'fondo')}
					/>
				</div>
				<div>
					<input
						type="radio"
						value="si"
						name="radioColorFondo"
						defaultChecked={stateCuadrado.fondoEstado}
						onChange={handleRadioColor}
					/>
				</div>
				<label>SI</label>
				<div>
					<input
						type="radio"
						value="no"
						name="radioColorFondo"
						defaultChecked={!stateCuadrado.fondoEstado}
						onChange={handleRadioColor}
					/>
				</div>
				<label>NO</label>
			</div>
		</article>
	);
};

export default MenuCuadrado;
