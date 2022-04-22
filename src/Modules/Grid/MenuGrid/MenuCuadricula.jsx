import React, { useEffect, useContext } from 'react';

// context
import AppContextGrid from '../../../context/AppContextGrid';

// styles:

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import GridOnIcon                        from '@mui/icons-material/GridOn';
import {Button, ButtonGroup, Typography} from "@mui/material";
import DensitySmallIcon                  from '@mui/icons-material/DensitySmall';
import BlurOffIcon           from '@mui/icons-material/BlurOff';
import useStylesMenuGrid     from "./MenuGridStyle";

const MenuCuadricula = () => {
	// useContext:
	const { stateGrid, h_gridTipo, updateCuadriculaWidth } = useContext(AppContextGrid);

	// LOGICA:
	const props = {}
	const classes = useStylesMenuGrid(props);
	const handleBtnAncho = (op) => {
		op == '-' && stateGrid.cuadriculaWidth > 10
			? updateCuadriculaWidth(stateGrid.cuadriculaWidth - 10) : '';
		op == '+' ? updateCuadriculaWidth(stateGrid.cuadriculaWidth + 10) : '';
	};
	// LOGICA END.

	// useEffect

	return (
		<div style={{display:'flex'}}>
			<article className={classes.article}>
				<Typography color='primary'>
					TYPE GRID:
				</Typography>;
				<ButtonGroup>
					<Button
						variant={stateGrid.tipoCuadricula === 'cuadricula' ? 'contained': 'outlined'}
						size='small'
						onClick={() => h_gridTipo('cuadricula')}
					>
						<GridOnIcon/>
					</Button>
					<Button
						variant={stateGrid.tipoCuadricula === 'linea' ? 'contained': 'outlined'}
						size='small'
						onClick={() => h_gridTipo('linea')}
					>
						<DensitySmallIcon/>
					</Button>
					<Button
						variant={stateGrid.tipoCuadricula === 'ninguno' ? 'contained': 'outlined'}
						size='small'
						onClick={() => h_gridTipo('ninguno')}
					>
						<BlurOffIcon/>
					</Button>
				</ButtonGroup>
			</article>
			<article className={classes.article}>
				<Typography color='primary'>
					WIDTH:
				</Typography>;
				<ButtonGroup>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleBtnAncho('-')}
					>
						<RemoveIcon fontSize='small'/>
					</Button>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleBtnAncho('+')}
					>
						<AddIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</article>
		</div>
	);
};

export default MenuCuadricula;
