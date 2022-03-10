import React, { useContext, useEffect, useState } from 'react';

import AppContextText from '../../context/AppContextText';

import './MenuText.scss';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SendIcon from '@mui/icons-material/Send';
import {Button, Fab, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";
import TextField from '@mui/material/TextField';


// COMPONENTES:
import Modal from '../../components/Modal/Modal';

import { u_textGrafica } from '../../utils/UtilsText';

import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
	root: {
		backgroundColor: 'red',
		color: (props) => props.color,
		fontSize: props => props.fontSize,
	},
	rootTextField: {
	},
	rootTextFieldInput: {
		color: (props) => props.fontColor,
		lineHeight: (props) => props.lineHeight,
		fontSize: (props) => props.fontSize,
		fontFamily: (props) => props.fontFamily,
		fontWeight: props => props.fontWeight,
		fontStyle: props => props.fontStyle,
		textDecoration: props => props.fontUnderL
	}
});


const MenuText = () => {
	// useContext:
	const { s_textUpdateColor, stateText, s_textUpdateTamano, s_textAddHId } =
		useContext(AppContextText);

	// STATE:
	const [toggleModal, setToggleModal] = useState(false);
	const [title, setTitle] = useState('');

	const [formats, setFormats] = useState([]);
	const [textColor, setTextColor] = useState('black');
	const [textBold, setTextBold] = useState('');
	const [textItalic, setTextItalic] = useState('');
	const [textUnderL, setTextUnderL] = useState('');
	const [textTypografia, setTextTipografia] = useState('helvatica');
	const [textZise, setTextZise] = useState(20);



	// LOGICA
	const props = {
		fontColor: textColor,
		fontSize: textZise+'px',
		lineHeight: (textZise + 5) +'px',
		fontFamily: textTypografia,
		fontWeight: textBold,
		fontStyle: textItalic,
		fontUnderL: textUnderL,
	}
	const classes = useStyles(props);

	let canvas = '';
	let context = '';
	const textNew = {
		id: stateText.id,
		tamano: 11,
		texto: 'new text',
		x_ini: 50,
		y_ini: 50,
		x_fin:0,
		y_fin:0,
		color: stateText.color,
		visible: true,
		edit: true,
		fontAlign: 'start',	// startr, end
		fontBaseline: 'top',
		fontColor: textColor,
		fontBold: textBold,
		fontItalic: textItalic,
		fontUnderL: textUnderL,
		fontTypografia: textTypografia,
		fontSize: textZise,
		fontText: '',
	};

	const textTamano = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50, 60];
	const graficaTexto = () => {
		canvas = document.getElementById('canvas-1');
		context = canvas.getContext('2d');

		context.fillStyle = textNew.fontColor; //color de relleno
		context.textAlign = textNew.fontAlign;
		context.textBaseline = textNew.fontBaseline;
		context.font = `${textNew.fontBold} ${textNew.fontItalic} ${textNew.fontSize}px ${textNew.fontTypografia}`; //estilo de texto
		context.beginPath(); //iniciar ruta
		context.fillText(textNew.fontText, textNew.x_ini, textNew.y_ini); //texto con método stroke
		context.closePath();

		let dimensiones = context.measureText(textNew.fontText);
		textNew.x_fin = textNew.x_ini + dimensiones.width;
		textNew.y_fin = textNew.y_ini + textNew.fontSize;

		context.beginPath(); //iniciar ruta
		context.lineWidth = 2;
		context.strokeStyle = textNew.fontColor;
		context.moveTo(textNew.x_ini, textNew.y_fin+1);
		context.lineTo(textNew.x_fin, textNew.y_fin+1);
		context.stroke();
		context.closePath();
	};

	const handleAdd = () => {
		s_textAddHId(textNew, stateText.id + 1);
	};

	const handleModalOpen = () => {
		setToggleModal(true);
		setTitle('TEXTO:');
	}
	const handleSend = () => {
		let elm = document.getElementById('tf_texto');
		textNew.fontText = elm.value;
		//textoNew.fontText = elm.valueOf().value;
		console.log('texto:', textNew)
		graficaTexto();
	}
	const handleChangeText = (event) => {
		setTextTipografia(event.target.value);
	};
	const handleChangeZise = (event) => {
		setTextZise(event.target.value);
	};
	const handleFormat = (event, newFormats) => {
		setFormats(newFormats);
	};
	const handleColors = (color) => {
		textColor !== color ? setTextColor(color):'';
	}

	// LOGICA END
	useEffect(() => {
		canvas = document.getElementById('canvas-1');
		context = canvas.getContext('2d');
	}, []);

	useEffect(()=>{
		console.log('text:', stateText.historiaText);
	}, [stateText.historiaText]);

	useEffect(() => {
		//console.log('size:', textZise)
	}, [textZise]);

	useEffect(() => {
		formats.indexOf('bold') > -1 ? setTextBold('bold'): setTextBold('');
		formats.indexOf('italic') > -1 ? setTextItalic('italic'): setTextItalic('');
		formats.indexOf('underlined') > -1 ? setTextUnderL('underline'): setTextUnderL('');
	}, [formats])

	return (
		<>
			<article className="article__menuText">
				<div>
					<input type="button" value="ADD" onClick={() => handleAdd()} />
					<input type="button" value="MODAL" onClick={() => handleModalOpen()} />
				</div>

			</article>

			<Modal estado={toggleModal} setEstado={setToggleModal} titulo={title}>
				<div className='textChild'>
					<div className='textChild__header'>
						<div className='textChild__header__selectorColor'>
							<div className='textChild__header__selectorColor__black' onClick={() => handleColors('black')} style={textColor === 'black' ? {backgroundColor:'black'} : {backgroundColor:'white'} }/>
							<div className='textChild__header__selectorColor__red' onClick={() => handleColors('red')} style={textColor === 'red' ? {backgroundColor:'red'} : {backgroundColor:'white'} }/>
							<div className='textChild__header__selectorColor__blue' onClick={() => handleColors('blue')} style={textColor === 'blue' ? {backgroundColor:'blue'} : {backgroundColor:'white'} }/>
							<div className='textChild__header__selectorColor__green' onClick={() => handleColors('green')} style={textColor === 'green' ? {backgroundColor:'green'} : {backgroundColor:'white'} }/>
						</div>
						<FormControl sx={{ m: 0}}>
							<ToggleButtonGroup
								value={formats}
								onChange={handleFormat}
								aria-label="text formatting"
								size='small'
							>
								<ToggleButton value="bold" aria-label="bold">
									<FormatBoldIcon />
								</ToggleButton>
								<ToggleButton value="italic" aria-label="italic">
									<FormatItalicIcon />
								</ToggleButton>
								<ToggleButton value="underlined" aria-label="underlined">
									<FormatUnderlinedIcon />
								</ToggleButton>
							</ToggleButtonGroup>
						</FormControl>
						<FormControl sx={{ m: 0, minWidth: 150 }} size='small'>
							<Select
								value={textTypografia}
								onChange={handleChangeText}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem value={'helvatica'}>Helvatica</MenuItem>
								<MenuItem value={'verdana'}>Verdana</MenuItem>
								<MenuItem value={'arial'}>Arial</MenuItem>
								<MenuItem value={'sans-serif'}>Sans-serif</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ m: 0 }} size='small'>
							<Select
								value={textZise}
								onChange={handleChangeZise}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								{
									textTamano.map((size) => (
											<MenuItem key={size} value={size}>{size}</MenuItem>
										)
									)
								}
							</Select>
						</FormControl>
						<FormControl  sx={{ m: 0 }} size='small'>
							<Fab color="primary" aria-label="add" size='small'>
								<SendIcon onClick={() => handleSend()}/>
							</Fab>
						</FormControl>

					</div>
					<div className='textChild__body' >
						<TextField
							label='texto in'
							multiline
							rows={4}
							size='small'
							fullWidth
							id='tf_texto'
							className={classes.rootTextField}
							inputProps={{
								className: classes.rootTextFieldInput
							}}
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default MenuText;
