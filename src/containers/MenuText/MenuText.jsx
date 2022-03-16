import React, { useContext, useEffect, useState } from 'react';

import AppContextText from '../../context/AppContextText';

import './MenuText.scss';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { FormControl, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";

const MenuText = () => {
	// CONTEXT:
	const {
		stateText,
		h_textSetColor,
		h_textSetBold,
		h_textSetItalic,
		h_textSetUnderL,
		h_textSetTypografia,
		h_textSetSize,
	} = useContext(AppContextText);

	// STATE:
	const [formats, setFormats] = useState([]);
	const [textColor, setTextColor] = useState('black');
	const [textBold, setTextBold] = useState('');
	const [textItalic, setTextItalic] = useState('');
	const [textUnderL, setTextUnderL] = useState('');
	const [textTypografia, setTextTipografia] = useState('helvatica');
	const [textZise, setTextZise] = useState(10);



	// LOGICA
	const textSizeArray = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50, 60];
	const textTypografiaArray = [
		{ typografia: 'helvatica', name: 'helvatica'},
		{ typografia: 'verdana', name: 'Verdana'},
		{ typografia: 'arial', name: 'Arial'},
		{ typografia: 'sans-serif', name: 'Sans-serif'},
	]
	const handleChangeText = (event) => {
		setTextTipografia(event.target.value);
		h_textSetTypografia(event.target.value);
	};
	const handleChangeZise = (event) => {
		console.log('setSize')
		setTextZise(event.target.value);
		h_textSetSize(event.target.value);
	};
	const handleFormat = (event, newFormatsArray) => {
		setFormats(newFormatsArray);
	};
	const handleColors = (color) => {
		textColor !== color ? setTextColor(color):'';
		textColor !== color ? h_textSetColor(color):'';
	}

	// LOGICA END
	useEffect(() => {
		let bold = '';
		let italic = '';
		let underL = '';
		formats.indexOf('bold') > -1 ? bold = 'bold':'';
		formats.indexOf('italic') > -1 ? italic = 'italic':'';
		formats.indexOf('underlined') > -1 ? underL = 'underlined':'';
		setTextBold(bold);
		setTextItalic(italic);
		setTextUnderL(underL);
	}, [formats]);

	useEffect(() => {
		h_textSetBold(textBold);
	}, [textBold]);

	useEffect(() => {
		h_textSetItalic(textItalic);
	}, [textItalic]);

	useEffect(() => {
		h_textSetUnderL(textUnderL);
	}, [textUnderL]);

	useEffect(() => {
		setTextZise(stateText.fontSize)
		console.log('udate size:',stateText)
	}, [stateText.fontSize])

	return (
		<>
			<article className="article__menuText">
				<div className='article__menuText__div'>
					<div className='article__menuText__div__selectorColor'>
						<div className='article__menuText__div__selectorColor__black' onClick={() => handleColors('black')} style={textColor === 'black' ? {backgroundColor:'black'} : {backgroundColor:'white'} }/>
						<div className='article__menuText__div__selectorColor__red' onClick={() => handleColors('red')} style={textColor === 'red' ? {backgroundColor:'red'} : {backgroundColor:'white'} }/>
						<div className='article__menuText__div__selectorColor__blue' onClick={() => handleColors('blue')} style={textColor === 'blue' ? {backgroundColor:'blue'} : {backgroundColor:'white'} }/>
						<div className='article__menuText__div__selectorColor__green' onClick={() => handleColors('green')} style={textColor === 'green' ? {backgroundColor:'green'} : {backgroundColor:'white'} }/>
					</div>
					<FormControl sx={{ m: 0}}>
						<ToggleButtonGroup
							value={formats}
							onChange={handleFormat}
							aria-label="text formatting"
							size='small'
						>
							<ToggleButton value="bold" aria-label="bold" size='small'>
								<FormatBoldIcon fontSize='small' />
							</ToggleButton>
							<ToggleButton value="italic" aria-label="italic" size='small'>
								<FormatItalicIcon fontSize='small' />
							</ToggleButton>
							<ToggleButton value="underlined" aria-label="underlined" size='small'>
								<FormatUnderlinedIcon fontSize='small' />
							</ToggleButton>
						</ToggleButtonGroup>
					</FormControl>
					<FormControl sx={{ m: 0, minWidth: 150 }} size='small'>
						<Select
							value={textTypografia}
							onChange={handleChangeText}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
							id="demo-simple-select-error"
						>
							{textTypografiaArray.map(elm => (<MenuItem key={elm.name} value={elm.typografia}>{elm.name}</MenuItem>))}
						</Select>
					</FormControl>
					<FormControl sx={{ m: 0 }} size='small'>
						<Select
							value={textZise}
							onChange={handleChangeZise}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
						>
							{textSizeArray.map((size) => ( <MenuItem key={size} value={size}>{size}</MenuItem>))}
						</Select>
					</FormControl>
				</div>
			</article>
		</>
	);
};

export default MenuText;
