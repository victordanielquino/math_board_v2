import React, {useContext, useEffect, useRef, useState} from 'react';
import Canvas from '../../components/Canvas/Canvas';

import './Home.scss';
import {Button, ButtonGroup, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Paper from "@mui/material/Paper";

// CONTEXT:
import AppContext from "../../context/AppContext";

import {makeStyles} from "@mui/styles";
import NavIzq from "../NavIzq/NavIzq";
import AppContextLapiz from "../../context/AppContextLapiz";
import {PhotoCamera} from "@mui/icons-material";

import ReactToPrint from "react-to-print";
import PdfCanvas from "../../Modules/PdfCanvas/PdfCanvas";

const useStyles  = makeStyles( theme => ({
	divTitle: {
		//outline: '1px solid black'
		display: 'flex',
		justifyContent: 'space-between',
	},
	paperBoradSelect: {
		marginRight: '1px',
		padding: 0,
		display: "flex",
	},
	btnBoardSelect: {
		width: '120px'
	}
}));

const Home = () => {
	// CONTEXT:
	const {state, h_setCanvas } = useContext(AppContext);
	const { h_lapizSetCanvas } = useContext(AppContextLapiz);

	// STATE:
	const [mathBoardSelect, setMathBoardSelect] = useState({title: 'MathBoard-1', canvas: 'canvas-1', variant:'contained'});
	const [arrayBtns, setArrayBtns] = useState([{title: 'MathBoard-1', canvas: 'canvas-1', variant:'contained'}]);
	const [contador, setContador] = useState(1);
	const [toggleModalPdf, setToggleModalPdf] = useState(false);

	// REF:
	const canvasRef = useRef(null);

	// LOGICA:
	const classes = useStyles();
	const handleOnAdd = () => {
		let mathBoard = {
			title: `MathBoard-${contador + 1}`,
			canvas: `canvas-${contador + 1}`,
			variant: 'text',
		}
		setArrayBtns(arrayBtns.concat(mathBoard))
		setContador(contador + 1)
	}
	const handleOnRemove = (index, elm) => {
		if(mathBoardSelect.title !== elm.title){
			const copyRows = [...arrayBtns];
			copyRows.splice(index, 1);
			setArrayBtns(copyRows);
		}
	};
	const updateVariant = (indexIn, mathBoardSelect) => {
		const copyRows = [...arrayBtns];
		let i = -1;
		copyRows.forEach((elm, index) => {
			(elm.title === mathBoardSelect.title) ? i = index: '';
		})
		if (i >= 0 && indexIn >= 0){
			copyRows[indexIn].variant = 'contained';
			copyRows[i].variant = 'text';
			setArrayBtns(copyRows);
		}
	}
	const handleSelect = (index, elm) => {
		if (mathBoardSelect.title !== elm.title) {
			updateVariant(index, mathBoardSelect);
			setMathBoardSelect(elm);
		}
	}
	const handlePhotoCamera = () => {
		console.log('camara', canvasRef.current);
		let context = canvasRef.current.getContext('2d');
		let canvasImagen = canvasRef.current.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
		window.location.href = canvasImagen;
	}

	const handlePdf = () => {
		setToggleModalPdf(true);
	}

	// EFFECT:
	useEffect(() => {
		h_setCanvas(mathBoardSelect.canvas);      
	}, [mathBoardSelect]);

	return (
		<div className="home">
			<div className='home__pizarras'>
				<ButtonGroup size="small" aria-label="small button group">
					{arrayBtns.map((elm, index) => (
						<Paper variant='outlined' color='primary' className={classes.paperBoradSelect} key={`key-paper-${elm.title}`}>
							<ButtonGroup variant="text" aria-label="text button group" size='inherit' key={`key-btnGroup-${elm.title}`}>
								<Button size='small' variant={elm.variant} className={classes.btnBoardSelect}  key={`key-btnTxt-${elm.title}`} onClick={() => handleSelect(index, elm)}>{elm.title}</Button>
								<Button size='small' variant={elm.variant}  key={`key-btnDis-${elm.title}`} onClick={() => handleOnRemove(index, elm)}><CloseIcon fontSize='small'  key={`key-btnClosed-${elm.title}`}/></Button>
							</ButtonGroup>
						</Paper>
					))}
					<IconButton aria-label="delete" size="small" color='primary' onClick={() => handleOnAdd()}>
						<AddIcon fontSize="small" />
					</IconButton>
				</ButtonGroup>
				<ButtonGroup size="small" aria-label="small button group">
					<Button variant="outlined" color='primary' size='small' onClick={() => handlePdf()}>
						<PictureAsPdfIcon />
					</Button>
					<Button variant="outlined" color='primary' size='small' onClick={() => handlePhotoCamera()}>
						<PhotoCamera />
					</Button>
					{/*<ReactToPrint
						trigger={() => <button>Print this out!</button>}
						content={() => canvasRef.current}
					/>*/}
				</ButtonGroup>
			</div>
			<div className='home__canvas'>
				<Canvas canvasRef={canvasRef} />
			</div>
			<PdfCanvas toggleModal={toggleModalPdf} setToggleModal={setToggleModalPdf} canvasRef={canvasRef}/>
		</div>
	);
};

export default Home;
