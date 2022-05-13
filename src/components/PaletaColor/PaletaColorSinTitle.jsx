import React, {useEffect, useContext, useState} from 'react';

// context
import AppContext    from '../../context/AppContext';

import {Switch, Typography} from "@mui/material";
import BlockIcon     from '@mui/icons-material/Block';
import ButtonUIColor from "../ButtonUIColor/ButtonUIColor";

const PaletaColor = ({tipo, title = '', boolSwitch = true, boolWhite = true}) => {
	// useContext:
	const { state, updateColor, updateColorFondo, h_setColorblur, h_setColorfondoblur } = useContext(AppContext);

	// STATE:
	const [color, setColor] = useState('white');
	const [switchChequed, setSwitchChequed] = useState(false);

	// LOGICA:
	const handleClickColor = (color) => {
		tipo === 'linea'
			? updateColor(color) // CONTEXT COLOR
			: updateColorFondo(color); // CONTEXT colorFondo
		setColor(color);
	};
	const changeSwitch = (e) => {
		//setSwitchChequed(e.target.checked);
		tipo === 'linea'
			? h_setColorblur(!state.colorBlur)
			: h_setColorfondoblur(!state.colorFondoBlur);
	}

	// EFFECT:
	useEffect(() => {
		if (tipo === 'linea') {
			setColor(state.color);
			setSwitchChequed(state.colorBlur);
		} else {
			setColor(state.colorFondo);
			setSwitchChequed(state.colorFondoBlur);
		}
	}, []);

	useEffect(() => {
		if (switchChequed && state.colorBlur){}
	}, [switchChequed]);

	return (
		<>
			<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
				{ (title !== '') &&
				<Typography color='primary' style={{marginRight: '5px', userSelect: 'none', fontSize: '1em'}}>
					{title}:
				</Typography>
				}
				<ButtonUIColor color={'black'} variant={color === "black" ? 'contained':'outlined'} border={'2px'} onclick={handleClickColor} />
				<ButtonUIColor color={'red'} variant={color === "red" ? 'contained':'outlined'} border={'2px'} onclick={handleClickColor}/>
				<ButtonUIColor color={'yellow'} variant={color === "yellow" ? 'contained':'outlined'} border={'2px'} onclick={handleClickColor}/>
				<ButtonUIColor color={'green'} variant={color === "green" ? 'contained':'outlined'} border={'2px'} onclick={handleClickColor}/>
				<ButtonUIColor color={'blue'} variant={color === "blue" ? 'contained':'outlined'} border={'2px'} onclick={handleClickColor}/>
				{
					boolWhite &&
					<ButtonUIColor
						color={'white'}
						variant={color === "white" ? 'contained' : 'outlined'}
						border={'2px'}
						onclick={handleClickColor}
						elm={<BlockIcon fontSize='small' color='secondary'/>}
					/>
				}
				{
					boolSwitch &&
					<Switch
						checked={tipo === 'linea' ? state.colorBlur : state.colorFondoBlur}
						onChange={changeSwitch}
						size='small'
					/>
				}
			</div>
		</>
	);
};

export default PaletaColor;
