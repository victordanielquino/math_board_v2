import React, {useContext, useEffect, useState} from 'react';

import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {makeStyles} from "@mui/styles";
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
		height: 30,
		//width: 30,
	},
}));

const KeyTxt = ({element, variant, setCharacter}) => {
	// CONTEXT:
	const { stateFunction, h_functionSetPositionCursor, h_functionSetTextPositionCursor, h_functionSetText } = useContext(AppContextFunction);

	// STATE:
	const [del, setDel] = useState(0);

	// LOGICA:
	const classes = useStyles();
	const handleClick = (key) => {
		switch (key) {
			case 'INI':
				(stateFunction.positionCursor > 0)
					? h_functionSetPositionCursor(0)
					:'';
				break;
			case 'FIN':
				(stateFunction.positionCursor < stateFunction.text.length)
					? h_functionSetPositionCursor(stateFunction.text.length)
					:'';
				break;
			case 'DEL':
				if (stateFunction.positionCursor < stateFunction.text.length) {
					let array = Array.from(stateFunction.text);
					array.splice(stateFunction.positionCursor, 1);
					let txt = array.join('');
					h_functionSetText(txt);
					setDel(del + 1);
				}
				break;
			case 'ESPACIO':
				let array = Array.from(stateFunction.text);
				array.splice(stateFunction.positionCursor, 0, ' ');
				let txt = array.join('');
				h_functionSetTextPositionCursor(txt, stateFunction.positionCursor + 1);
				break;
			case 'AC':
				h_functionSetTextPositionCursor('', 0);
				break;
			default:
				break;

		}
	};

	// EFFECT:
	useEffect(() => {
		if (del > 0){
			document.getElementById('outlined-basic').selectionStart = stateFunction.positionCursor;
			document.getElementById('outlined-basic').selectionEnd = stateFunction.positionCursor;
			document.getElementById('outlined-basic').focus();
		}
	}, [del]);

	return (
		<ThemeProvider theme={theme}>
			<Button
				variant={variant}
				color='primary'
				onClick={() => handleClick(element)}
				className={classes.editButton}
				sx={{ minHeight: 0, minWidth: 0, padding: 0.8, margin: 0.3, fontSize:'15px' }}
			>{element}</Button>
		</ThemeProvider>
	);
};

export default KeyTxt;
