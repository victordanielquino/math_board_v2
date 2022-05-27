import React, {useContext, useEffect, useState} from 'react';

// context:


// style:
import './MenuFunction.scss';
import ModalUI               from "../../../components/ModalUI/ModalUI_";
import useStylesMenuFunction from "./MenuFunctionStyle";
import {Button}              from "@mui/material";
import KeyboardIcon          from '@mui/icons-material/Keyboard';
import Keyboard              from "../Keyboard/Keyboard";

const MenuFunction = () => {
	// CONTEXT:

	// STATE:
	const [open, setOpen] = useState(false);
	const [successClick, setSuccessClick] = useState(0);

	// LOGICA:
	const props = {}
	const classes = useStylesMenuFunction(props);
	const handleSuccess = () => {
		setSuccessClick(successClick + 1);
		setOpen(false);
	}

	return (
		<>
			<article className={classes.article}>
				<Button
					variant="contained"
					size='small'
					startIcon={<KeyboardIcon/>}
					onClick={() => setOpen(true)}
				>ABRIR TECLADO VIRTUAL</Button>
			</article>
			<ModalUI open={open} setOpen={setOpen} handleSuccess={handleSuccess} maxWidth={'md'} title={'Teclado Virtual:'} booleanFooter={true} >
				<Keyboard successClick={successClick} setSuccessClick={setSuccessClick}/>
			</ModalUI>
		</>
	);
};

export default MenuFunction;
