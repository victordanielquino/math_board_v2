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

const MenuGrid = () => {
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
				<div className={classes.subArticle} style={{marginRight:'20px'}}>
					<Typography color='primary'>
						TYPE GRID:
					</Typography>;
					<ButtonGroup>
						<Button
							variant={stateGrid.tipoCuadricula === 'cuadricula' ? 'contained': 'outlined'}
							size='small'
							onClick={() => h_gridTipo('cuadricula')}
						>
							<GridOnIcon fontSize='small'/>
						</Button>
						<Button
							variant={stateGrid.tipoCuadricula === 'linea' ? 'contained': 'outlined'}
							size='small'
							onClick={() => h_gridTipo('linea')}
						>
							<DensitySmallIcon fontSize='small'/>
						</Button>
						<Button
							variant={stateGrid.tipoCuadricula === 'ninguno' ? 'contained': 'outlined'}
							size='small'
							onClick={() => h_gridTipo('ninguno')}
						>
							<BlurOffIcon fontSize='small'/>
						</Button>
					</ButtonGroup>
				</div>
				<div className={classes.subArticle}>
					<Typography color='primary'>
						WIDTH:
					</Typography>;
						<Button
							variant='contained'
							size='small'
							onClick={() => handleBtnAncho('-')}
							style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px', marginRight:'5px'}}
						>
							<RemoveIcon fontSize='small'/>
						</Button>
						<Button
							variant='contained'
							size='small'
							onClick={() => handleBtnAncho('+')}
							style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px', marginRight:'5px'}}
						>
							<AddIcon fontSize='small'/>
						</Button>
				</div>
			</article>
		</div>
	);
};

export default MenuGrid;
