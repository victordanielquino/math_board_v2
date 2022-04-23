import React, { useContext, useEffect } from 'react';

// CONTEXT:
import AppContextPlano                                           from '../../../context/AppContextPlano';
import {Button, ButtonGroup, FormControl, TextField, Typography} from "@mui/material";
import RemoveIcon                                                from "@mui/icons-material/Remove";
import AddIcon                                      from "@mui/icons-material/Add";
import useStylesMenuPlano                           from "./MenuPlanoStyle";
import {converInteger}                              from "../../../utils/math";

const MenuPlano = () => {
	// useContext:
	const { statePlano, s_planoUpdateWidthCuadricula } = useContext(AppContextPlano);

	// LOGICA
	const props = {}
	const classes = useStylesMenuPlano(props);
	const handleWidth = (op) => {
		let valor = converInteger(statePlano.width_cuadricula);
		switch (op) {
			case '+': (valor + 10 !== 60) ? s_planoUpdateWidthCuadricula(valor + 10):'';break;
			case '-': (valor - 10 !== 20) ? s_planoUpdateWidthCuadricula(valor - 10):'';break;
		}
	};
	// LOGICA END.

	// useEffect
	return (
		<>
			<article className={classes.article}>
				<Typography color='primary'>
					WIDTH:
				</Typography>
				<ButtonGroup style={{margin:'0 10px'}}>
					<Button
						variant='outlined'
						size='small'
						disabled
					>
						<Typography style={{height:'20px'}} color='primary'>
							{statePlano.width_cuadricula}
						</Typography>
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleWidth('-')}
					>
						<RemoveIcon fontSize='small'/>
					</Button>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleWidth('+')}
					>
						<AddIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</article>
		</>
	);
};

export default MenuPlano;
