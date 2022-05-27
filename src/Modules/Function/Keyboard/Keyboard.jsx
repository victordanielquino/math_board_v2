import React, {useState, useContext, useEffect} from 'react';

import KeyboardSymbols    from './KeyboardSymbols';
import KeyboardAlphabet   from "./KeyboardAlphabet";
import KeyboardOutput     from "./KeyboardOutput/KeyboardOutput";
import './Keyboard.scss';
import Paper              from "@mui/material/Paper";
import {makeStyles}       from "@mui/styles";
import PaletaColor        from "../../../components/PaletaColor/PaletaColorSinTitle";
import {Button}           from "@mui/material";
import FileUploadIcon     from "@mui/icons-material/FileUpload";
import AppContextFunction from "../../../context/AppContextFunction";
import AppContext         from "../../../context/AppContext";

const useStyles  = makeStyles(theme => ({
	keyboard: {
		display: "flex",
		padding: '10px',
		alignItems:'center',
		justifyContent:'space-between',
		marginTop: '10px',
	},
	keyboardOutput: {
		// outline:'1px solid red',
		display: "flex",
		padding: '10px',
		marginTop: '10px'
	},
}));

const Keyboard = ({successClick, objFunction = {}}) => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const {
		h_functionSetColor,
		h_functionSetBackground,
		h_functionSetColorBackground,
	} = useContext(AppContextFunction);

	// STATE:
	const [char, setChar] = useState('');
	const [text, setText] = useState('');
	const [uploadCLick, setUploadClick] = useState(0);

	// LOGICA:
	const props = {
		/*fontSize: '1em',
        height: 30,
        width: 30,*/
	}
	const classes = useStyles(props);
	const handleUpload = () => {
		//console.log('upload...')
		setUploadClick(uploadCLick + 1);
	}

	// EFFECT:
	useEffect(() => {
		h_functionSetColorBackground(state.color, state.colorFondo);
	}, []);

	useEffect(() => {
		h_functionSetColor(state.color);
	}, [state.color]);

	useEffect(() => {
		h_functionSetBackground(state.colorFondo);
	}, [state.colorFondo]);

	return (
		<>
			<article style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
				{<div style={{marginRight:'20px'}}><PaletaColor tipo='linea' title='TEXTO' boolSwitch={false} /></div>}
				{<div style={{marginRight:'0px'}}><PaletaColor tipo='fondo' title='FONDO' boolSwitch={false} /></div>}
				<Button
					variant="outlined"
					size='small'
					startIcon={<FileUploadIcon/>}
					onClick={() => handleUpload()}
				>GUARDAR EN LA NUBE</Button>
			</article>
			<Paper  elevation={3} className={classes.keyboardOutput}>
				<KeyboardOutput successClick={successClick} uploadClick={uploadCLick} objFunction={objFunction}/>
			</Paper>
			<Paper  elevation={3} className={classes.keyboard}>
				<KeyboardAlphabet setChar={setChar} text={text} setText={setText} />
				<KeyboardSymbols setCharacter={setChar}/>
			</Paper>
		</>
	);
};

export default Keyboard;
