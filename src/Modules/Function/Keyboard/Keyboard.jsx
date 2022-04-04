import React, {useState, useContext, useEffect} from 'react';

import KeyboardSymbols from './KeyboardSymbols';
import KeyboardAlphabet from "./KeyboardAlphabet";
import KeyboardOutput from "./KeyboardOutput/KeyboardOutput";
import './Keyboard.scss';
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";

const useStyles  = makeStyles(theme => ({
	keyboard: {
		display: "flex",
		padding: '10px'
	},
}));

const Keyboard = () => {
	// CONTEXT:

	// STATE:
	const [char, setChar] = useState('');
	const [text, setText] = useState('');

	// LOGICA:
	const props = {
		/*fontSize: '1em',
        height: 30,
        width: 30,*/
	}
	const classes = useStyles(props);

	// EFFECT:

	return (
		<>
			<aside className="keyboard">
				<Paper  elevation={3} className={classes.keyboard}>
					<div className='keyboard__alfaNumerico'>
						<KeyboardAlphabet setChar={setChar} text={text} setText={setText} />
					</div>
					<div className='keyboard__simbolos'>
						<KeyboardSymbols setCharacter={setChar}/>
					</div>
					<div className='keyboard__output'>
						<KeyboardOutput />
					</div>
				</Paper>
			</aside>
		</>
	);
};

export default Keyboard;
