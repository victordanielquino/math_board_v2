import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextGrid from '../../context/AppContextGrid';
// utils:
import draw from '../Draw/Draw';
import AppContext from "../../context/AppContext";

const PaintGrid = (canvasId) => {
	// useContext:
	const { state } = useContext(AppContext);
	const { stateGrid } = useContext(AppContextGrid);

	// LOGICA:
	let context = '';
	let primeraVez = true;
	const paint = async () => {
		if (stateGrid.active || primeraVez){
			primeraVez = false;
			context = document.getElementById(canvasId).getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateGrid);
			} catch (e) {
				console.log(e.message);
			}
		}
	}
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		context = document.getElementById(canvasId).getContext('2d');
		paint();
	}, [
		stateGrid.width,
		stateGrid.height,
		stateGrid.tipoCuadricula,
		stateGrid.cuadriculaWidth,
	]);

	useEffect(() => {
		if (stateGrid.active) paint();
	}, [state.canvas]);

	useEffect(() => {
		paint();
	}, []);
};
//const saludar = () => console.log('hola daniel');

export default PaintGrid;
