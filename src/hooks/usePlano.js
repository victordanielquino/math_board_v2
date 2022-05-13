import { useState } from 'react';
const initialStatePlano = {
	active: false,
	visible: true,
	edit: true,
	id: 0,
	x_min: 0,
	y_max: 0,
	salto: 1,
	h: 0,
	k: 0,
	color_cuadricula: '#abb2b9',
	width_cuadricula: 30,
	historiaPlano: [],
	canvas: '',
};

const usePlano = () => {
	const [statePlano, setStatePlano] = useState(initialStatePlano);

	const updatePlanoActive = (valor) => {
		setStatePlano({
			...statePlano,
			active: valor,
		});
	};
	const add_plano_en_historia = (valor) => {
		setStatePlano({
			...statePlano,
			historiaPlano: [...statePlano.historiaPlano, valor],
		});
	};
	const s_planoAddHId = (valor, id) => {
		setStatePlano({
			...statePlano,
			id: id,
			historiaPlano: [...statePlano.historiaPlano, valor],
		});
	};
	const s_planoUpdateXmin = (valor) => {
		setStatePlano({
			...statePlano,
			x_min: valor,
		});
	};
	const s_planoUpdateYmax = (valor) => {
		setStatePlano({
			...statePlano,
			y_max: valor,
		});
	};
	const s_planoUpdateWidthCuadricula = (valor) => {
		setStatePlano({
			...statePlano,
			width_cuadricula: valor,
		});
	};
	const h_planoSetH = (newHistoria) => {
		setStatePlano({
			...statePlano,
			historiaPlano: newHistoria,
		});
	};
	const h_planoSetCanvas = (value) => {
		setStatePlano({
			...statePlano,
			canvas: value,
		});
	};

	return {
		statePlano,
		updatePlanoActive,
		//add_plano_en_historia,
		s_planoAddHId,
		s_planoUpdateXmin,
		s_planoUpdateYmax,
		s_planoUpdateWidthCuadricula,
		h_planoSetH,
		h_planoSetCanvas,
	};
};

export default usePlano;
