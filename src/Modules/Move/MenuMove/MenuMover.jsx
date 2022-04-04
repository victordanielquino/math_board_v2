import React, {useContext, useEffect, useState} from 'react';

import AppContextMover from "../../../context/AppContextMover";

import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import {Button, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

import './MenuMover.scss';

const useStyles  = makeStyles({
	container: {
		borderRadius: '10px',
		borderBottom: '1px solid var(--very-light-pink)',
		backgroundColor: 'white',
		display: 'flex',
		padding: '5px',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '250px',
		color: 'black',
	}
});

const MenuMover = () => {
	// CONTEXT:
	const { stateMover } = useContext(AppContextMover);

	// STATE:
	const [variantEditNot, setVariantEditNot] = useState('outlined');
	const [variantEditYes, setVariantEditYes] = useState('outlined');

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

	// EFECT:
	useEffect(() => {
		//console.log('se inicio movimiento');
	}, []);

	useEffect(() => {
		updatePaletaEdit();
	}, [stateMover.obj]);


	return (
		<div>
			<div className={classes.container}>
				<Typography variant='h6' color='primary' >Editar:</Typography>
				<Button variant={variantEditNot} onClick={() => handleEdit(false)} color='error' size='small'><GppGoodIcon fontSize='small'/></Button>
				<Button variant={variantEditYes} onClick={() => handleEdit(true)} color='success' size='small'><GppBadIcon fontSize='small'/></Button>
			</div>
		</div>
	)
};

export default MenuMover;
