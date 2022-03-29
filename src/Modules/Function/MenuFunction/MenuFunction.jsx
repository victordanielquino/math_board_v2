import React, {useContext, useEffect, useState} from 'react';

// context:


// style:
import './MenuFunction.scss';
import AppContextFunction from "../../../context/AppContextFunction";

const MenuFunction = () => {
	// CONTEXT:
	const {
		stateFunction,
		h_functionSetColor,
		h_functionSetBackground
	} = useContext(AppContextFunction)

	// STATE:
	const [textColor, setTextColor] = useState('');
	const [textBackground, setTextBackground] = useState('');

	// LOGICA:
	const handleColors = (color) => {
		textColor !== color ? setTextColor(color):'';
		textColor !== color ? h_functionSetColor(color):'';
	}
	const handleBackground = (color) => {
		textBackground !== color ? setTextBackground(color):'';
		textBackground !== color ? h_functionSetBackground(color):'';
	}
	// LOGICA END.

	// EFFECT:
	useEffect(() => {
		setTextColor(stateFunction.color);
		setTextBackground(stateFunction.background);
	}, [])

	return (
		<article className="article__menuFunction">
			<div className="article__menuFunction__container">
				<div className='article__menuFunction__container__selectorColor'>
					<label>TEXT:</label>
					<div className='article__menuFunction__container__black' onClick={() => handleColors('black')} style={textColor === 'black' ? {backgroundColor:'black'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__red' onClick={() => handleColors('red')} style={textColor === 'red' ? {backgroundColor:'red'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__blue' onClick={() => handleColors('blue')} style={textColor === 'blue' ? {backgroundColor:'blue'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__green' onClick={() => handleColors('green')} style={textColor === 'green' ? {backgroundColor:'green'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__yellow' onClick={() => handleColors('yellow')} style={textColor === 'yellow' ? {backgroundColor:'yellow'} : {backgroundColor:'white'} }/>
				</div>
				<div className='article__menuFunction__container__selectorBackground'>
					<label>FONDO:</label>
					<div className='article__menuFunction__container__white' onClick={() => handleBackground('white')} style={textBackground === 'white' ? {backgroundColor:'white'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__red' onClick={() => handleBackground('red')} style={textBackground === 'red' ? {backgroundColor:'red'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__blue' onClick={() => handleBackground('blue')} style={textBackground === 'blue' ? {backgroundColor:'blue'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__green' onClick={() => handleBackground('green')} style={textBackground === 'green' ? {backgroundColor:'green'} : {backgroundColor:'white'} }/>
					<div className='article__menuFunction__container__yellow' onClick={() => handleBackground('yellow')} style={textBackground === 'yellow' ? {backgroundColor:'yellow'} : {backgroundColor:'white'} }/>
				</div>
			</div>
		</article>
	);
};

export default MenuFunction;
