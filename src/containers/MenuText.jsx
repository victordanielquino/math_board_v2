import React, { useContext, useEffect } from 'react';

import AppContextText from '../context/AppContextText';

import '../styles/MenuText.scss';

import { u_textGrafica } from '../utils/UtilsText';

const MenuText = () => {
	// useContext:
	const { s_textUpdateColor, stateText, s_textUpdateTamano, s_textAddHId } =
		useContext(AppContextText);

	// LOGICA
	let canvas = '';
	let context = '';
	const textoNew = {
		id: stateText.id,
		tamano: 11,
		texto: 'new text',
		x_ini: 400,
		y_ini: 400,
		color: stateText.color,
		visible: true,
	};
	const arrayColorLinea = [
		{ colorLine: 'black', id: 'colorBlackText' },
		{ colorLine: 'red', id: 'colorRedText' },
		{ colorLine: 'green', id: 'colorGreenText' },
		{ colorLine: 'blue', id: 'colorBlueText' },
		{ colorLine: 'yellow', id: 'colorYellowText' },
	];
	const graficaTexto = (context, obj) => {
		context.fillStyle = 'red'; //color de relleno
		context.font = `${obj.tamano}px arial`; //estilo de texto
		context.beginPath(); //iniciar ruta
		context.fillText(obj.texto, obj.x_ini, obj.y_ini); //texto con método stroke
		context.closePath();
	};
	const graficaTexto2 = () => {
		canvas = document.getElementById('canvas-1');
		context = canvas.getContext('2d');
		context.fillStyle = textoNew.color; //color de relleno
		context.font = `${textoNew.tamano}px arial`; //estilo de texto
		context.beginPath(); //iniciar ruta
		context.fillText(textoNew.texto, textoNew.x_ini, textoNew.y_ini); //texto con método stroke
		context.closePath();
	};
	const updatePaletaColor = (color) => {
		const array = document.querySelectorAll('.activeColorText');
		for (let i = 0; i < array.length; i++) {
			array[i].classList.remove('activeColorText');
		}
		let elem = arrayColorLinea.find((elem) => elem.colorLine == color);
		let x = document.getElementById(elem.id);
		x.classList.add('activeColorText');
		textoNew.color = color;
	};
	const updatePaletaSize = (size) => {
		document.getElementById('t_inputTamano').value = size;
	};
	const updatePaletaTexto = (txt) => {
		document.getElementById('t_inputTexto').value = txt;
	};
	const handleColor = (color) => {
		updatePaletaColor(color);
		s_textUpdateColor(color); // CONTEXT
	};
	const handleAdd = () => {
		let tamano = document.getElementById('t_inputTamano').value;
		let texto = document.getElementById('t_inputTexto').value;
		let color = stateText.color;
		textoNew.texto = texto;
		textoNew.color = color;
		textoNew.tamano = tamano;
		graficaTexto2();
		//u_textGrafica(context, textoNew);
		s_textAddHId(textoNew, stateText.id + 1);
	};
	const handleSize = (op) => {
		let tamano = parseInt(document.getElementById('t_inputTamano').value);
		if (op == '+') tamano++;
		else tamano--;
		document.getElementById('t_inputTamano').value = tamano;
		s_textUpdateTamano(tamano);
	};

	// LOGICA END
	useEffect(() => {
		canvas = document.getElementById('canvas-1');
		context = canvas.getContext('2d');
		updatePaletaColor(stateText.color);
		updatePaletaSize(stateText.tamano);
		updatePaletaTexto(stateText.texto);
	}, []);
	return (
		<article className="article__menuText">
			<div className="article__menuText__tamano">
				<span htmlFor="">TAMAÑO: </span>
				<input type="text" defaultValue="11" id="t_inputTamano" />
				<input type="button" value="-" onClick={() => handleSize('-')} />
				<input type="button" value="+" onClick={() => handleSize('+')} />
			</div>
			<div>
				<input type="text" defaultValue="hola daniel" id="t_inputTexto" />
				<input type="button" value="ADD" onClick={() => handleAdd()} />
			</div>
			<div className="article__menuText__paletaColor">
				<div>
					<span>COLOR: </span>
				</div>
				<div className="article__menuText__paletaColor__container">
					{arrayColorLinea.map((elem) => (
						<div
							className={`color activeColorText ${elem.colorLine}`}
							id={elem.id}
							key={elem.id}
							onClick={() => handleColor(elem.colorLine)}
						></div>
					))}
				</div>
			</div>
		</article>
	);
};

export default MenuText;
