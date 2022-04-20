import React, {useContext, useEffect, useState} from 'react';

import AppContextMover from "../../../context/AppContextMover";
import AppContext from '../../../context/AppContext';

import GppGoodIcon          from '@mui/icons-material/GppGood';
import GppBadIcon                        from '@mui/icons-material/GppBad';
import {Button, ButtonGroup, Typography} from "@mui/material";
import {makeStyles}                      from "@mui/styles";
import MoveDownIcon         from '@mui/icons-material/MoveDown';
import MoveUpIcon           from '@mui/icons-material/MoveUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './MenuMover.scss';
import {isObjectEmpty} from "../../../utils/utils";
import {
	u_moveDownElement,
	u_moveUpElement,
	u_moveDuplicatePencil,
	u_moveDuplicateText,
	u_moveDuplicateLine,
	u_moveDuplicateSquare,
	u_moveDuplicateCircle,
	u_moveDuplicateTriangle,
	u_moveDuplicateGeometric,
	u_moveDuplicateImage, u_moveDuplicatePlano
} from "../UtilsMove";

const useStyles  = makeStyles({
	container: {
		borderRadius: '10px',
		borderBottom: '1px solid var(--very-light-pink)',
		backgroundColor: 'white',
		display: 'flex',
		padding: '5px',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '170px',
		color: 'black',
		marginLeft: '1em',
	}
});

const MenuMover = () => {
	// CONTEXT:
	const { state, h_updateH, h_addH } = useContext(AppContext);
	const { stateMover } = useContext(AppContextMover);

	// STATE:
	const [variantEditNot, setVariantEditNot] = useState('outlined');
	const [variantEditYes, setVariantEditYes] = useState('outlined');
	const [disabledUpDown, setDisabledUpDown] = useState(true);

	// LOGICA:
	const props = {
		/*fontSize: '1em',
        height: 30,
        width: 30,*/
	}
	const classes = useStyles(props);
	const handleEdit = (boolean) => {
		if(stateMover.selectElm) {
			switch (boolean) {
				case false:
					setVariantEditNot('contained');
					setVariantEditYes('outlined');
					stateMover.obj.edit = false;
					break;
				case true:
					setVariantEditNot('outlined');
					setVariantEditYes('contained');
					stateMover.obj.edit = true;
					break;
				default:
					setVariantEditNot('outlined');
					setVariantEditYes('outlined');
					break;
			}
		} else {
			setVariantEditNot('outlined');
			setVariantEditYes('outlined');
		}
	}
	const handleUpDown = (value) => {
		let arrayNew = [];
		let sw = false;
		state.historia.forEach( elm => arrayNew.push(elm));
		if (value === 'up') {
			sw = u_moveUpElement(arrayNew, stateMover.obj.id);
		} else {
			if (value === 'down') {
				sw = u_moveDownElement(arrayNew, stateMover.obj.id);
			}
		}
		sw ? h_updateH(arrayNew):'';
	}
	const handleDuplicate = () => {
		switch (stateMover.obj.types) {
			case 'pencil':
				let pencil = {};
				pencil = u_moveDuplicatePencil(stateMover.obj, 20, 20);
				pencil.id = state.id;
				h_addH(pencil);
				break;
			case 'text':
				let text = {};
				text = u_moveDuplicateText(stateMover.obj, 20, 20);
				text.id = state.id;
				h_addH(text);
				break;
			case 'line':
				let line = {};
				line = u_moveDuplicateLine(stateMover.obj, 20, 20);
				line.id = state.id;
				h_addH(line);
				break;
			case 'square':
				let square = u_moveDuplicateSquare(stateMover.obj, 20, 20);
				square.id = state.id;
				h_addH(square);
				break;
			case 'circle':
				let circle = u_moveDuplicateCircle(stateMover.obj, 20, 20);
				circle.id = state.id;
				h_addH(circle);
				break;
			case 'triangle':
				let triangle = u_moveDuplicateTriangle(stateMover.obj, 20, 20);
				triangle.id = state.id;
				h_addH(triangle);
				break;
			case 'geometric':
				let geometric = u_moveDuplicateGeometric(stateMover.obj, 20, 20);
				geometric.id = state.id;
				h_addH(geometric);
				break;
			case 'image':
				let image = u_moveDuplicateImage(stateMover.obj, 20, 20);
				image.id = state.id;
				h_addH(image);
				break;
			case 'plano':
				let plano = u_moveDuplicatePlano(stateMover.obj, 20, 20);
				plano.id = state.id;
				h_addH(plano);
				break;
			default:
				break;
		}
	}
	const updatePaletaEdit = () => {
		if(stateMover.selectElm) {
			switch (stateMover.obj.edit) {
				case false:
					setVariantEditNot('contained');
					setVariantEditYes('outlined');
					stateMover.obj.edit = false;
					break;
				case true:
					setVariantEditNot('outlined');
					setVariantEditYes('contained');
					stateMover.obj.edit = true;
					break;
				default:
					setVariantEditNot('outlined');
					setVariantEditYes('outlined');
					break;
			}
		} else {
			setVariantEditNot('outlined');
			setVariantEditYes('outlined');
		}
	}
	const updatePaletaPosition = () => {
		if (!isObjectEmpty(stateMover.obj)){
			setDisabledUpDown(false);
		} else {
			setDisabledUpDown(true);
		}
	}

	// EFECT:
	useEffect(() => {
		updatePaletaEdit();
		updatePaletaPosition();
	}, [stateMover.obj]);


	return (
		<div style={{display:'flex'}}>
			<div className={classes.container}>
				<Typography variant='h6' color='primary' >Editar:</Typography>
				<ButtonGroup>
					<Button variant={variantEditNot} onClick={() => handleEdit(false)} color='error' size='small'><GppGoodIcon fontSize='small'/></Button>
					<Button variant={variantEditYes} onClick={() => handleEdit(true)} color='success' size='small'><GppBadIcon fontSize='small'/></Button>
				</ButtonGroup>
			</div>

			<div className={classes.container}>
				<Typography variant='h6' color='primary' >Position:</Typography>
				<ButtonGroup>
					<Button
						variant='outlined'
						onClick={() => handleUpDown('down')}
						disabled={disabledUpDown}
						size='small'
					>
						<MoveDownIcon fontSize='small'/>
					</Button>
					<Button
						variant='outlined'
						onClick={() => handleUpDown('up')}
						disabled={disabledUpDown}
						size='small'
					>
						<MoveUpIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</div>

			<div className={classes.container}>
				<Typography variant='h6' color='primary' >Duplicate:</Typography>
				<ButtonGroup>
					<Button
						variant='outlined'
						onClick={() => handleDuplicate()}
						disabled={disabledUpDown}
						size='small'
					>
						<ContentCopyIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
};

export default MenuMover;
