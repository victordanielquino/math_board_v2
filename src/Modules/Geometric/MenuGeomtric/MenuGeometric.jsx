import React, {useContext, useEffect, useRef} from 'react';

// CONTEXT:
import AppContext from "../../../context/AppContext";
import AppContextGeometric from "../../../context/AppContextGeometric";

// components:
import PaletaGrosor     from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde                  from '../../../components/PaletaColor/PaletaColor';
import PaletaColorFondo                  from '../../../components/PaletaColor/PaletaColor';

// styles:
import './MenuGeometric.scss';
import {converInteger}                   from "../../../utils/math";
import {Button, ButtonGroup, Typography} from "@mui/material";
import RemoveIcon                        from "@mui/icons-material/Remove";
import AddIcon                           from "@mui/icons-material/Add";
import useStylesMenuGeometric            from "./MenuGeometricStyle";
import PaletaColor                       from "../../../components/PaletaColor/PaletaColorSinTitle";
import {u_convertColorToRGBA}            from "../../../utils/utils";

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

	// LOGICA:
	const props = {}
	const classes = useStylesMenuGeometric(props);
	const handleVertices = (value) => {
		let valor = converInteger(stateGeometric.vertices);
		switch (value) {
			case '+': (valor + 1 < 15) ? h_geometricSetVertices(converInteger(valor + 1)):'';break;
			case '-': (valor - 1 > 4) ? h_geometricSetVertices(converInteger(valor - 1)):'';break;
		}
	}
	const widthBtn = '35px';
	const heightBtn = '28px';

	// EFFECT:
	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.color, state.colorBlur);
		h_geometricSetBordecolorBordeestado(rgba, state.color !== 'white');
	}, [state.color, state.colorBlur]);

	useEffect(() => {
		let rgba = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
		h_geometricSetFondocolorFondoestado(rgba, state.colorFondo !== 'white');
	}, [state.colorFondo, state.colorFondoBlur]);

	useEffect(() => {
		h_geometricSetBordeGrosor(state.grosor);
	}, [state.grosor]);

	useEffect(() => {
		let color = u_convertColorToRGBA(state.color, state.colorBlur);
		let colorFondo = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
		h_geometricSetAll(
			color,
			colorFondo,
			state.grosor,
			state.color !== 'white',
			state.colorFondo !== 'white'
		);
	}, []);

	return (
		<div style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'white', borderRadius:'10px', padding:'5px 20px'}}>
			<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
				<Typography color='primary'>
					V:
				</Typography>
				<ButtonGroup style={{margin:'0 3px'}}>
					<Button
						variant='outlined'
						size='small'
						disabled
					>
						<Typography style={{height:'20px', fontSize:'1.2em', margin:0, padding:0}} color='primary'>
							{stateGeometric.vertices}
						</Typography>
					</Button>
				</ButtonGroup>
					<Button
						variant='contained'
						size='small'
						onClick={() => handleVertices('-')}
						style={{maxWidth: widthBtn, maxHeight: heightBtn, minWidth: widthBtn, minHeight: heightBtn, padding:0, marginRight:'3px'}}
					>
						<RemoveIcon fontSize='small'/>
					</Button>
					<Button
						variant='contained'
						size='small'
						onClick={() => handleVertices('+')}
						style={{maxWidth: widthBtn, maxHeight: heightBtn, minWidth: widthBtn, minHeight: heightBtn, padding:0, marginRight:'25px'}}
					>
						<AddIcon fontSize='small'/>
					</Button>
			</div>
			{<div style={{marginRight:'20px'}}><PaletaGrosor /></div>}
			{<div style={{marginRight:'20px'}}><PaletaColor tipo='linea' title='BORDE' /></div>}
			{<div style={{marginRight:'0px'}}><PaletaColor tipo='fondo' title='FONDO' /></div>}
		</div>
	);
};

export default MenuGeometric;
