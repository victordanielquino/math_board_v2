import React, {useContext, useEffect, useState} from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {blue} from "@mui/material/colors";
import AppContextFunction from "../../../context/AppContextFunction";

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500]
		}
	},
})
const useStyles  = makeStyles(theme => ({
	editButton : {
		//height: 30,
		//width: 30,
		height: props => props.height,
		width: props => props.width,
	},
}))
const Key = ({
				 element,
				 variant,
				 setCharacter,
				 props = {
					fontSize: '1em',
					height: 30,
					width: 30,
				 }
}) => {
	// CONTEXT:
	const { stateFunction , h_functionSetTextPositionCursor } = useContext(AppContextFunction);
	// STATE:

	// LOGICA:
	const propsBtn = {
		/*fontSize: '1em',
		height: 30,
		width: 30,*/
		fontSize: props.fontSize,
		height: props.height,
		width: props.width,
	}
	const classes = useStyles(propsBtn);
	const handleClick = (key) => {
		let c = 0;
		if(key !== '') {
			switch (key) {
				case '/':
					key = '{a}/{b}';
					c = 1;
					break;
				case '∑':
					key = '∑_{i=0}^{n}x';
					c = 11;
					break;
				case 'lim':
					key = 'lim_{x→∞}';
					c = 8;
					break;
			}
			let array = Array.from(stateFunction.text);
			array.splice(stateFunction.positionCursor, 0, key);
			let txt = array.join('');
			h_functionSetTextPositionCursor(txt, stateFunction.positionCursor + 1 + c);
		}
	};

	// EFFECT:
	useEffect(() => {
		if (stateFunction.text.length > 0) {
			document.getElementById('outlined-basic').selectionStart = stateFunction.positionCursor;
			document.getElementById('outlined-basic').selectionEnd = stateFunction.positionCursor;
			document.getElementById('outlined-basic').focus();
		}
	}, [stateFunction.positionCursor]);

	return (
		<ThemeProvider theme={theme}>
			<Button
				variant={variant}
				color='primary'
				onClick={() => handleClick(element)}
				className={classes.editButton}
				sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0.3, fontSize: propsBtn.fontSize, textTransform: 'none' }}
			>{element}</Button>
		</ThemeProvider>
	);
};

export default Key;
