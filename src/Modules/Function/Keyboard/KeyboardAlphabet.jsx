import React, {useState, useContext, useEffect} from 'react';

import AppContextFunction from '../../../context/AppContextFunction';

import BackspaceIcon from '@mui/icons-material/Backspace';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import Key from './Key';
import KeyIcon from './KeyIcon';
import KeyTxt from './KeyTxt';

import './KeyboardAlphabet.scss';

const KeyboardAlphabet = ({setChar, text, setText}) => {
	// CONTEXT:
	const { stateFunction, h_functionSetPositionCursor, h_functionSetTextPositionCursor } = useContext(AppContextFunction);

	// STATE:
	const [alfabeto, setAlfabeto] = useState(stateFunction.alfabetoMay);
	const [alfabetoMayBoolean, setAlfabetoMayBoolean] = useState(true);


	// LOGICA:
	const propsBtn = {
		fontSize: '1.2em',
		height: 30,
		width: 30,
	}
	const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const handleBackspace = () => {
		if (stateFunction.positionCursor - 1 >= 0) {
			let array = Array.from(stateFunction.text);
			array.splice(stateFunction.positionCursor - 1, 1);
			let txt = array.join('');
			h_functionSetTextPositionCursor(txt, stateFunction.positionCursor - 1);
		}
	}
	const handleNavigateNext = () => {
		(stateFunction.positionCursor + 1 <= stateFunction.text.length)
			? h_functionSetPositionCursor(stateFunction.positionCursor + 1)
			: '';
	}
	const handleNavigateBefore = () => {
		(stateFunction.positionCursor - 1 >= 0)
			? h_functionSetPositionCursor(stateFunction.positionCursor - 1)
			: '';
	}

	// EFFECT:
	useEffect(() => {
		alfabetoMayBoolean ? setAlfabeto(stateFunction.alfabetoMay):setAlfabeto(stateFunction.alfabetoMin);
	}, [alfabetoMayBoolean]);

	return (
			<div className="alphabet">
				<div className='alphabet__flex'>
					{arrayNumbers.map((elm) => (
						<Key element={elm} variant={'contained'} key={`key-${elm}`} setCharacter={setChar} props={propsBtn}/>
					))}
				</div>
				<div className='alphabet__flex'>
					{alfabeto[0].map((elm) => (
						<Key element={elm} variant={'outlined'} key={`key-${elm}`} setCharacter={setChar} />
					))}
				</div>
				<div className='alphabet__flex'>
					{alfabeto[1].map((elm) => (
						<Key element={elm} variant={'outlined'} key={`key-${elm}`} setCharacter={setChar} />
					))}
				</div>
				<div className="alphabet__flex">
					<KeyIcon element={'shift-fill'} variant={'contained'} key={`key-fill`}>
						<ArrowUpwardIcon onClick={() => setAlfabetoMayBoolean(!alfabetoMayBoolean)}/>
					</KeyIcon>
					{alfabeto[2].map((elm) => (
						<Key element={elm} variant={'outlined'} key={`key-${elm}`} setCharacter={setChar} />
					))}
					<Key element={'.'} variant={'outlined'} key={`key-.`} setCharacter={setChar} />
					<KeyIcon element={'backspace'} variant={'contained'} key={`key-backspace`} >
						<BackspaceIcon onClick={() => handleBackspace()}/>
					</KeyIcon>
				</div>
				<div className="alphabet__flex">
					<KeyTxt element={'DEL'} variant={'contained'} key={`key-del`} setCharacter={setChar}/>
					<KeyTxt element={'AC'} variant={'contained'} key={`key-ac`} setCharacter={setChar}/>
					<Key element={','} variant={'outlined'} key={`key-,`} setCharacter={setChar} />
					<KeyTxt element={'ESPACIO'} variant={'outlined'} key={`key-espacio`} setCharacter={setChar}/>
					<KeyIcon element={'lefth'} variant={'contained'} key={`key-caret-lefth`}>
						<NavigateBeforeIcon onClick={() => handleNavigateBefore()}/>
					</KeyIcon>
					<KeyIcon element={'right'} variant={'contained'} key={`key-caret-right`}>
						<NavigateNextIcon  onClick={() => handleNavigateNext()}/>
					</KeyIcon>
					<KeyTxt element={'INI'} variant={'contained'}  key={`key-ini`} setCharacter={setChar} />
					<KeyTxt element={'FIN'} variant={'contained'}  key={`key-fin`} setCharacter={setChar}/>
				</div>
			</div>
	);
};

export default KeyboardAlphabet;
