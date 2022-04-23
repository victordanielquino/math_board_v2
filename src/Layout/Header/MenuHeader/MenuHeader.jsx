import React from 'react';
import {Typography}                             from "@mui/material";
import useStylesMenuHeader                              from "./MenuHeaderStyle";

const MenuHeader = () => {
	// CONTEXT:

	// STATE:

	// REF:

	// LOGICA:
	const props = {}
	const classes = useStylesMenuHeader(props);

	// FUNCTIONS:

	// EFFECT:
	return (
		<article className={classes.article} style={{ color:'primary'}}>
			<Typography  variant='h7' color='primary'>
				PIZARRA DIGITAL WEB
			</Typography>
		</article>
	);
};

export default MenuHeader;
