import React, { useEffect, useContext } from 'react';

// context
import AppContext                from '../../context/AppContext';

// styles:
import './PaletaGrosor.scss';
import ButtonUIWidth             from "../ButtonUIWidth/ButtonUIWidht";
import {ButtonGroup, Typography} from "@mui/material";

const PaletaGrosor = ({title=''}) => {
	// useContext:
	const { state, updateGrosor } = useContext(AppContext);

	// LOGICA:
	const colorPrimary = '#1976d2';
	const handleCLickWidth = (width) => {
		updateGrosor(parseInt(width)); // CONTEXT
	}

	return (
		<article style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
			{ (title !== '') &&
				<Typography color='primary' style={{marginRight: '5px', userSelect: 'none', fontSize: '1.2em'}}>
					{title}:
				</Typography>
			}
			<ButtonGroup>
				<ButtonUIWidth
					color={state.grosor === 1 ? 'white': colorPrimary}
					variant={state.grosor === 1 ? 'contained':'outlined'}
					width='1' onclick={handleCLickWidth}
				/>
				<ButtonUIWidth
					color={state.grosor === 2 ? 'white': colorPrimary}
					variant={state.grosor === 2 ? 'contained':'outlined'}
					width='2' onclick={handleCLickWidth}
				/>
				<ButtonUIWidth
					color={state.grosor === 4 ? 'white': colorPrimary}
					variant={state.grosor === 4 ? 'contained':'outlined'}
					width='4' onclick={handleCLickWidth}
				/>
				<ButtonUIWidth
					color={state.grosor === 6 ? 'white': colorPrimary}
					variant={state.grosor === 6 ? 'contained':'outlined'}
					width='6' onclick={handleCLickWidth}
				/>
				<ButtonUIWidth
					color={state.grosor === 10 ? 'white': colorPrimary}
					variant={state.grosor === 10 ? 'contained':'outlined'}
					width='10' onclick={handleCLickWidth}
				/>
			</ButtonGroup>
		</article>
	);
};

export default PaletaGrosor;
