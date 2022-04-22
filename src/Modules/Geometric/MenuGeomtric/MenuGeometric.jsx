import React, {useContext, useEffect, useRef} from 'react';

// CONTEXT:
import AppContext from "../../../context/AppContext";
import AppContextGeometric from "../../../context/AppContextGeometric";

// components:
import PaletaGrosor                      from '../../PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde                  from '../../PaletaColor/PaletaColor';
import PaletaColorFondo                  from '../../PaletaColor/PaletaColor';

// styles:
import './MenuGeometric.scss';
import {converInteger}                   from "../../../utils/math";
import {Button, ButtonGroup, Typography} from "@mui/material";
import RemoveIcon                        from "@mui/icons-material/Remove";
import AddIcon                           from "@mui/icons-material/Add";
import useStylesMenuGeometric            from "./MenuGeometricStyle";

const MenuGeometric = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const {
		stateGeometric,
		h_geometricSetAll,
		h_geometricSetBordecolorBordeestado,
		h_geometricSetFondocolorFondoestado,
		h_geometricSetBordeGrosor,
		h_geometricSetVertices,
	} = useContext(AppContextGeometric);

	// REF:
	const verticesRef = useRef(null);

	// LOGICA:
	const props = {}
	const classes = useStylesMenuGeometric(props);
	const handleVertices = (value) => {
		(verticesRef.current.value > 5 && value === '-')
			? verticesRef.current.value = verticesRef.current.value - 1
			: (value === '+') ? verticesRef.current.value = verticesRef.current.value - (-1):'';
		h_geometricSetVertices(converInteger(verticesRef.current.value));
	}

	// EFFECT:
	useEffect(() => {
		h_geometricSetBordecolorBordeestado(state.color, state.color !== 'white');
	}, [state.color]);

	useEffect(() => {
		h_geometricSetFondocolorFondoestado(state.colorFondo, state.colorFondo !== 'white');
	}, [state.colorFondo]);

	useEffect(() => {
		h_geometricSetBordeGrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		h_geometricSetAll(
			state.color,
			state.colorFondo,
			state.grosor,
			state.color !== 'white',
			state.colorFondo !== 'white'
		);
	}, []);

	return (
		<div style={{display:'flex'}}>
			<article className={classes.article}>
				<Typography color='primary'>
					V:
				</Typography>
				<ButtonGroup style={{margin:'0 10px'}}>
					<Button
						variant='outlined'
						size='small'
						disabled
					>
						<Typography color='primary'>
							{stateGeometric.vertices}
						</Typography>
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleVertices('-')}
					>
						<RemoveIcon fontSize='small'/>
					</Button>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleVertices('+')}
					>
						<AddIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</article>
			<article className="article__menuCirculo">
				{<PaletaGrosor title="BORDE" />}
				{<PaletaColorBorde tipo="linea" title="Borde" />}
				{<PaletaColorFondo tipo="fondo" title="Fondo" />}
			</article>
		</div>
	);
};

export default MenuGeometric;
