import React, {useContext, useState} from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {blue} from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import AppContextFunction from "../../../context/AppContextFunction";

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500]
		}
	},
})

const useStyles  = makeStyles(theme => ({
	editPaper: {
		//backgroundImage: `url(${Image})`,
		backgroundImage: props => `url(${props.image})`,
		backgroundRepeat: 'no-repeat',
		//backgroundOrigin: 'content-box , padding-box',
		backgroundSize: '80% 80%',
		backgroundPosition: 'center center'
	},
	editButton : {
		// height: 30,
		// width: 30,
		height: props => props.height,
		width: props => props.width,
	},
}))


const Key = ({
				 element,
				 variant,
				 setCharacter,
				 Image,
				 props = {
					 height: 30,
					 width: 30,
				 }
}) => {
	// CONTEXT:
	const { stateFunction , h_functionSetTextPositionCursor } = useContext(AppContextFunction);
	// STATE:

	// LOGICA:
	const propsBtn = {
		image: Image,
		height: props.height,
		width: props.width,
	}
	const classes = useStyles(propsBtn);
	const handleClick = (key) => {
		//console.log(key);
		let c = 0;
		switch (key) {
			case '√{}':
				c = 1;
				break;
			case '√[3]{}':
				c = 4;
				break;
			case '√[n]{}':
				c = 4;
				break;
			case '^2':
				c = 1;
				break;
			case '^3':
				c = 1;
				break;
			case '^{n}':
				c = 2;
				break;
			case '_{i}':
				c = 2;
				break;
			case '∫_{0}^{∞}xdx':
				c = 11;
				break;
			case '*10^{n}':
				c = 6;
				break;
			case 'log_{a}{b}':
				c = 5;
				break;
			case 'log':
				c = 2;
				break;
		}
		let array = Array.from(stateFunction.text);
		array.splice(stateFunction.positionCursor, 0, key);
		let txt = array.join('');
		h_functionSetTextPositionCursor(txt, stateFunction.positionCursor + 1 + c);
	};

	return (
		<ThemeProvider theme={theme}>
			<Paper className={ classes.editPaper}>
				<Button
					variant={variant}
					color='primary'
					onClick={() => handleClick(element)}
					className={classes.editButton}
					sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0.3}}
				/>
			</Paper>
		</ThemeProvider>
	);
};

export default Key;
