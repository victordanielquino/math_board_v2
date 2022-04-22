import React, { useContext, useEffect } from 'react';

// context:
import AppContextBorrador  from '../../../context/AppContextBorrador';

// style:
import useStylesMenuEraser from "./MenuEraserStyle";
import {Typography}        from "@mui/material";

const MenuEraser = () => {
	// useContext:
	const { stateBorrador, updateBorradorGrosor } = useContext(AppContextBorrador);

	// LOGICA:
	const props = {}
	const classes = useStylesMenuEraser(props);

	// EFFECT:

	return (
		<article className={classes.article}>
			<Typography color='primary'>
				ERASER:
			</Typography>;
		</article>
	);
};

export default MenuEraser;
