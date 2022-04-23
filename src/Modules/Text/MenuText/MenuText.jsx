import React, { useContext, useEffect, useState } from 'react';

import AppContextText from '../../../context/AppContextText';

import './MenuText.scss';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {Button, ButtonGroup, FormControl, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";

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

	// LOGICA
	const textSizeArray = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50, 60];
	const textTypografiaArray = [
		{ typografia: 'helvatica', name: 'helvatica'},
		{ typografia: 'verdana', name: 'Verdana'},
		{ typografia: 'arial', name: 'Arial'},
		{ typografia: 'sans-serif', name: 'Sans-serif'},
	]
	const handleChangeText = (event) => {
		h_textSetTypografia(event.target.value);
	};
	const handleChangeZise = (event) => {
		h_textSetSize(event.target.value);
	};
	const handleColors = (color) => {
		h_textSetColor(color);
	}
	const handleFormats = (value) => {
		switch (value) {
			case 'bold':
				stateText.fontBold === 'bold' ? h_textSetBold('') : h_textSetBold('bold');
				break;
			case 'italic':
				stateText.fontItalic === 'italic' ? h_textSetItalic('') : h_textSetItalic('italic');
				break;
			case 'underlined':
				stateText.fontUnderL === 'underlined' ? h_textSetUnderL('') : h_textSetUnderL('underlined');
				break;
		}
	}

	return (
		<>
			<article className="article__menuText">
				<div className='article__menuText__div'>
					<div className='article__menuText__div__selectorColor'>
						<div
							className='article__menuText__div__selectorColor__black'
							onClick={() => handleColors('black')}
							style={stateText.fontColor === 'black' ? {backgroundColor:'black'} : {backgroundColor:'white'} }/>
						<div
							className='article__menuText__div__selectorColor__red'
							onClick={() => handleColors('red')}
							style={stateText.fontColor === 'red' ? {backgroundColor:'red'} : {backgroundColor:'white'} }/>
						<div
							className='article__menuText__div__selectorColor__blue'
							onClick={() => handleColors('blue')}
							style={stateText.fontColor === 'blue' ? {backgroundColor:'blue'} : {backgroundColor:'white'} }/>
						<div
							className='article__menuText__div__selectorColor__green'
							onClick={() => handleColors('green')}
							style={stateText.fontColor === 'green' ? {backgroundColor:'green'} : {backgroundColor:'white'} }/>
					</div>
					<FormControl sx={{ m: 0}}>
						<ButtonGroup
							aria-label="text formatting"
							size='small'
							color='primary'
						>
							<Button
								size='small'
								style={{ height: '2.1em', marginRight:'2px'}}
								variant={stateText.fontBold === 'bold' ? 'contained': 'outlined'}
								onClick={() => handleFormats('bold')}
							>
								<FormatBoldIcon fontSize='small' />
							</Button>
							<Button
								size='small'
								style={{ height: '2.1em', marginRight:'2px'}}
								variant={stateText.fontItalic === 'italic' ? 'contained': 'outlined'}
								onClick={() => handleFormats('italic')}
							>
								<FormatItalicIcon fontSize='small' />
							</Button>
							<Button
								size='small'
								style={{ height: '2.1em', marginRight:'2px'}}
								variant={stateText.fontUnderL === 'underlined' ? 'contained': 'outlined'}
								onClick={() => handleFormats('underlined')}
							>
								<FormatUnderlinedIcon fontSize='small' />
							</Button>
						</ButtonGroup>
					</FormControl>
					<FormControl sx={{ m: 0, minWidth: 150 }} size='small'>
						<Select
							value={stateText.fontTypografia}
							onChange={handleChangeText}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
							id="demo-simple-select-error"
							style={{ height: '1.8em'}}
						>
							{textTypografiaArray.map(elm => (<MenuItem key={elm.name} value={elm.typografia}>{elm.name}</MenuItem>))}
						</Select>
					</FormControl>
					<FormControl sx={{ m: 0 }} size='small'>
						<Select
							value={stateText.fontSize}
							onChange={handleChangeZise}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
							style={{ height: '1.8em'}}
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
