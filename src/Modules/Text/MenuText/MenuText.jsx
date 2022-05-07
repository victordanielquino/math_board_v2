import React, { useContext, useEffect, useState } from 'react';

import AppContextText from '../../../context/AppContextText';

import './MenuText.scss';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {Button, ButtonGroup, FormControl, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";

import ButtonUIColor      from "../../../components/ButtonUIColor/ButtonUIColor";

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
	const handleFormats = (value) => {
		switch (value) {
			case 'bold': stateText.fontBold === 'bold' ? h_textSetBold('') : h_textSetBold('bold');
				break;
			case 'italic': stateText.fontItalic === 'italic' ? h_textSetItalic('') : h_textSetItalic('italic');
				break;
			case 'underlined': stateText.fontUnderL === 'underlined' ? h_textSetUnderL('') : h_textSetUnderL('underlined');
				break;
		}
	}
	const handleCLickColor = (color) => {
		h_textSetColor(color);
	}

	return (
		<>
			<article style={{display:'flex', justifyContent:'center', alignItems:'center', background:'white', padding:'5px 25px', borderRadius:'10px'}}>
					<div style={{display:'flex', marginRight:'20px'}}>
						<ButtonUIColor color={'black'} variant={stateText.fontColor === "black" ? 'contained':'outlined'} border={'3px'} onclick={handleCLickColor} />
						<ButtonUIColor color={'red'} variant={stateText.fontColor === "red" ? 'contained':'outlined'} border={'3px'} onclick={handleCLickColor}/>
						<ButtonUIColor color={'yellow'} variant={stateText.fontColor === "yellow" ? 'contained':'outlined'} border={'3px'} onclick={handleCLickColor}/>
						<ButtonUIColor color={'green'} variant={stateText.fontColor === "green" ? 'contained':'outlined'} border={'3px'} onclick={handleCLickColor}/>
						<ButtonUIColor color={'blue'} variant={stateText.fontColor === "blue" ? 'contained':'outlined'} border={'3px'} onclick={handleCLickColor}/>
					</div>
					<FormControl sx={{ m: 0}} style={{marginRight:'20px'}}>
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
					<FormControl sx={{ m: 0, minWidth: 150 }} size='small' style={{marginRight:'20px'}}>
						<Select
							value={stateText.fontTypografia}
							onChange={handleChangeText}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
							id="demo-simple-select-error"
							style={{ height: '1.8em', color:'#1976d2'}}
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
							style={{ height: '1.8em', color:'#1976d2'}}
						>
							{textSizeArray.map((size) => ( <MenuItem key={size} value={size}>{size}</MenuItem>))}
						</Select>
					</FormControl>
			</article>
		</>
	);
};

export default MenuText;
