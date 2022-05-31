import React, {useContext, useEffect, useRef, useState} from 'react';
import Canvas from '../../components/Canvas/Canvas';

import './Home.scss';
import {Button, ButtonGroup, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Paper from "@mui/material/Paper";
import json from '../../Data/mathboard.json';

// CONTEXT:
import AppContext from "../../context/AppContext";

import {makeStyles} from "@mui/styles";
import NavIzq from "../NavIzq/NavIzq";
import {isObjectEmpty} from "../../utils/utils";

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
	const {state, h_setCanvas, h_setMathboardsJson, h_setMathboardsJsonIndex, h_addMathboards, h_setReadJsonAll, h_setMathboardsIndexSelect } = useContext(AppContext);

	// STATE:
	const [mathBoardSelect, setMathBoardSelect] = useState({});
	const [contador, setContador] = useState(1);

	// REF:
	const canvasRef = useRef(null);

	// LOGICA:
	const classes = useStyles();
	const handleOnAdd = () => {
		// ADD BUTTON MATHBOARD
		let mathBoard = {
			title: `MathBoard-${contador}`,
			canvas: `canvas-${contador}`,
			variant: 'text',
			c: contador,
		}
		h_addMathboards(mathBoard);
		setContador(contador + 1)
	}
	const handleOnRemove = (index, elm) => {
		if(mathBoardSelect.title === elm.title){
			if (index === 0 && state.mathBoards.length > 1) {
				const copyRows = [...state.mathBoards];
				copyRows.splice(index, 1);
				copyRows[0].variant = 'contained';
				let elmNew = copyRows[0];
				// indicamos que la pizarra sera otra
				setMathBoardSelect(elmNew);
				h_setMathboardsJsonIndex(copyRows, 0);
			} else {
				if (index > 0 && state.mathBoards.length > 1) {
					const copyRows = [...state.mathBoards];
					copyRows.splice(index, 1);
					copyRows[index - 1].variant = 'contained';
					let elmNew = copyRows[index - 1];
					// indicamos que la pizarra sera otra
					setMathBoardSelect(elmNew);
					h_setMathboardsJsonIndex(copyRows, index-1);
				} else {
					console.log('no se puede eliminar')
				}
			}
		} else {
			const copyRows = [...state.mathBoards];
			copyRows.splice(index, 1);
			h_setMathboardsJson(copyRows);
		}
	};
	const updateVariant = (indexIn, mathBoardSelect) => {
		const copyRows = [...state.mathBoards];
		let i = -1;
		for(let k = 0; k < copyRows.length; k++) {
			if (copyRows[k].title === mathBoardSelect.title) {
				i = k;
				break
			}
		}
		if (i >= 0 && indexIn >= 0){
			copyRows[indexIn].variant = 'contained';
			copyRows[i].variant = 'text';
			h_setMathboardsJson(copyRows);
		}
	}
	const handleSelect = (index, elm) => {
		if (mathBoardSelect.title !== elm.title) {
			updateVariant(index, mathBoardSelect);
			setMathBoardSelect(elm);
			h_setMathboardsIndexSelect(index);
		}
	}
	const readJson = (jsonIn) => {
		let arrayMathBoardsBtns = jsonIn[0].mathboards;	// mathboards = [{},{},{}...]
		let indexSelect = jsonIn[1].mathboardSelect.index;
		let historia = jsonIn[2].historia;

		// BUTTONS MATHBOARDS:
		arrayMathBoardsBtns[indexSelect].variant = 'contained';
		h_setReadJsonAll(arrayMathBoardsBtns, indexSelect, !state.mathBoardsReadJson, historia);
	}

	// EFFECT:
	useEffect(() => {
		if (state.mathBoards.length > 0) {
			// MATHBOARD SELECT:
			let mathboardSelection = state.mathBoards[state.mathBoardsIndexSelec];
			setMathBoardSelect(mathboardSelection);

			let c = state.mathBoards[state.mathBoards.length - 1].c + 1;
			setContador(c);
		}
	}, [state.mathBoardsReadJson]);

	useEffect(() => {
		if (!isObjectEmpty(mathBoardSelect))
			h_setCanvas(mathBoardSelect.canvas);
	}, [mathBoardSelect]);

	useEffect(() => {
		readJson(json);
	}, []);

	return (
		<>
			<div className="home">
				<div className='home__pizarras'>
					{/* BUTTONS MATHBOARDS */}
					<ButtonGroup size="small" aria-label="small button group">
						{state.mathBoards.map((elm, index) => (
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
				</div>
				<div className='home__canvas'>
					<Canvas canvasRef={canvasRef} />
				</div>
			</div>
			<NavIzq />
		</>
	);
};

export default Home;
