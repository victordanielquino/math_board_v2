import React, {useState, useContext, useEffect} from 'react';

import KeyboardSymbols from './KeyboardSymbols';
import KeyboardAlphabet from "./KeyboardAlphabet";
import KeyboardOutput from "./KeyboardOutput/KeyboardOutput";
import EquationEditorReact from "./EquationEditorReact/EquationEditorReact";
import MathInputReact from "./MathInputReact/MathInputReact";

import './Keyboard.scss';
import DivReactMathjax from "./KeyboardOutput/DivReactMathjax3/DivReactMathjax3";

const Keyboard = () => {
	// CONTEXT:

	// STATE:
	const [char, setChar] = useState('');
	const [text, setText] = useState('');


	// LOGICA:

	// EFFECT:

	return (
		<aside className="keyboard">
			<div className='keyboard__alfaNumerico'>
				<KeyboardAlphabet setChar={setChar} text={text} setText={setText} />
			</div>
			<div className='keyboard__simbolos'>
				<KeyboardSymbols setCharacter={setChar}/>
			</div>
			<div className='keyboard__output'>
				<KeyboardOutput />
				{/*<EquationEditorReact />*/}
				{/*<MathInputReact/>*/}
			</div>
		</aside>
	);
};

export default Keyboard;
