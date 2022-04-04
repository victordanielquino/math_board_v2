import { useEffect, useContext } from 'react';

// CONTEXT:
import AppContextGrid from '../../context/AppContextGrid';
// utils:
import draw from '../Draw/Draw';
import AppContext from "../../context/AppContext";

const PaintGrid = (canvasId) => {
	// useContext:
	const { state } = useContext(AppContext);
	const { stateCanvas } = useContext(AppContextGrid);

	// LOGICA:
	let context = '';
	let primeraVez = true;
	const paint = async () => {
		if (stateCanvas.active || primeraVez){
			primeraVez = false;
			console.log('PaintGrid.jsx');
			context = document.getElementById(canvasId).getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateCanvas);
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
		stateCanvas.width,
		stateCanvas.height,
		stateCanvas.tipoCuadricula,
		stateCanvas.cuadriculaWidth,
	]);

	useEffect(() => {
		if (stateCanvas.active) paint();
	}, [state.canvas]);

	useEffect(() => {
		paint();
	}, []);
};
//const saludar = () => console.log('hola daniel');

export default PaintGrid;
