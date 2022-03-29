import React, { useState, useContext } from 'react';

import AppContextFunction from '../../../context/AppContextFunction';

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {makeStyles} from "@mui/styles";
import Button from "@mui/material/Button";

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
		width: 30,
	},
}))

const KeyIcon = ({children, element, variant}) => {
	const [toggleShift, setToggleShift] = useState(false);
	// STATE:

	// LOGICA:
	const classes = useStyles();

	const { s_functionToLower, s_functionToUpper } = useContext(AppContextFunction);

	const handleClick = (option) => {
	};

	return (
		/*<input
			type="button"
			value=""
			className={`keySvg ${svg.element}`}
			id={svg.element}
			onClick={() => handleClick(svg.element)}
		/>*/
		<ThemeProvider theme={theme}>
			<Button
				variant='contained'
				color='primary'
				onClick={() => handleClick(element)}
				className={classes.editButton}
				sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0.3 }}
			>{children}</Button>
			{/*<IconButton aria-label="fingerprint" color="secondary" sx={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0.3 }}>
				<BackspaceIcon />
			</IconButton>*/}
		</ThemeProvider>
	);
};

export default KeyIcon;
