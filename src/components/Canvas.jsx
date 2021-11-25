import React, { useState, useEffect, useContext } from 'react';

// context:
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextCanvas from '../context/AppContextCanvas';

// styles:
import '../styles/Canvas.scss';

// components:
import PaintMover from './PaintMover';
import PainLapiz from '../components/PaintLapiz';
import PaintBorrador from './PaintBorrador';
import PaintLinea from './PaintLinea';
import PaintCuadrado from './PaintCuadrado';
import PaintCuadricula from './PaintCuadricula';
import PaintPlano from './PaintPlano';

const Canvas = () => {
	// useContext:
	const { update_width_height } = useContext(AppContextCanvas);

	// useState:
	const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 75);
	const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 90);

	// LOGICA:
	// update_width_height;

	PaintCuadricula('canvas-1');
	PaintMover('canvas-1');
	PainLapiz('canvas-1');
	PaintBorrador('canvas-1');
	PaintCuadrado('canvas-1');
	PaintLinea('canvas-1');
	PaintPlano('canvas-1');

	const updateCanvasWidth = () => setCanvasWidth(window.innerWidth - 75);
	const updateCanvasHeight = () => setCanvasHeight(window.innerHeight - 90);
	// LOGICA END.

	// useEfect:
	useEffect(() => {
		// redimencionamos el canvas la primera vez:
		window.addEventListener('resize', updateCanvasWidth);
		window.addEventListener('resize', updateCanvasHeight);

		return () => {
			window.removeEventListener('resize', updateCanvasWidth);
			window.removeEventListener('resize', updateCanvasHeight);
		};
	}, []);

	useEffect(() => {
		update_width_height(canvasWidth, canvasHeight);
	}, [canvasWidth, canvasHeight]);

	return (
		<canvas
			className="canvas"
			width={canvasWidth}
			height={canvasHeight}
			id="canvas-1"
		></canvas>
	);
};

export default Canvas;
