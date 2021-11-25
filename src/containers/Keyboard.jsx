import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

import Key from '../components/key';
import KeySvg from '../components/KeySvg';
import KeyTxt from '../components/KeyTxt';

import '../styles/Keyboard.scss';

const Keyboard = () => {
	const { state } = useContext(AppContext);
	const array = state.alfabeto;

	const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<aside className="keyboard">
			<div className="keyboard__alfaNumerico">
				<div>
					{arrayNumbers.map((element) => (
						<Key element={element} key={`key-${element}`} />
					))}
				</div>
				<div>
					{array[0].map((elm) => (
						<Key element={elm} key={`key-${elm}`} />
					))}
				</div>
				<div>
					{array[1].map((elm) => (
						<Key element={elm} key={`key-${elm}`} />
					))}
				</div>
				<div className="keyboard__alfaNumerico__flex">
					<KeySvg element={'shift-fill'} key={`key-fill`} />
					{array[2].map((elm) => (
						<Key element={elm} key={`key-${elm}`} />
					))}
					<KeySvg element={'backspace'} key={`key-backspace`} />
				</div>
				<div className="keyboard__alfaNumerico__flex">
					<KeyTxt element={'DEL'} key={`key-del`} />
					<Key element={'espacio'} key={`key-espacio`} />
					<KeySvg element={'caret-left'} key={`key-caret-left`} />
					<KeySvg element={'caret-right'} key={`key-caret-right`} />
					<KeyTxt element={'INI'} key={`key-ini`} />
					<KeyTxt element={'FIN'} key={`key-fin`} />
				</div>
			</div>
			<div className="keyboard__simbolos">simbolos</div>
		</aside>
	);
};

export default Keyboard;
