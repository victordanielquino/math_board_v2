import React, { useState, useEffect, useContext } from 'react';

// context:
import AppContextGrid from '../../context/AppContextGrid';

// styles:
import './Canvas.scss';

// components:
import PaintMover from '../../Modules/Move/PaintMover';
import PainLapiz       from '../../Modules/Pencil/PaintLapiz';
import PaintBorrador   from '../../Modules/Eraser/PaintBorrador';
import PaintLinea      from '../../Modules/Line/PaintLinea';
import PaintCuadrado   from '../../Modules/Square/PaintCuadrado';
import PaintGrid       from '../../Modules/Grid/PaintGrid';
import PaintPlano      from '../../Modules/Plano/PaintPlano';
import PaintCirculo    from '../../Modules/Circle/PaintCirculo';
import PaintTriangulo  from '../../Modules/Triangle/PaintTriangulo';
import PaintImagen     from "../../Modules/Image/PaintImagen";
import PaintText       from "../../Modules/Text/PaintText";
import PaintCalculator from "../../Modules/Calculator/PaintCalculator";
import PaintGeometric  from "../../Modules/Geometric/PaintGeometric";

const Canvas = ({canvasRef}) => {
	// CONTEXT:
	const { update_width_height } = useContext(AppContextGrid);

	// STATE:
	const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 60);
	const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 115);

	// LOGICA:
	PaintGrid('canvas-1');
	PaintMover('canvas-1');
	PainLapiz('canvas-1');
	PaintBorrador('canvas-1');
	PaintCuadrado('canvas-1');
	PaintLinea('canvas-1');
	PaintPlano('canvas-1');
	PaintCirculo('canvas-1');
	PaintTriangulo('canvas-1');
	PaintImagen('canvas-1');
	PaintText('canvas-1');
	PaintCalculator('canvas-1');
	PaintGeometric('canvas-1');

	const updateCanvasWidth = () => setCanvasWidth(window.innerWidth - 60);
	const updateCanvasHeight = () => setCanvasHeight(window.innerHeight - 115);

	// EFFECT:
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
			ref={canvasRef}
		/>
	);
};

export default Canvas;
