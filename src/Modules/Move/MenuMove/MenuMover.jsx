import React, {useContext, useEffect, useState} from 'react';

import AppContext from "../../../context/AppContext";
import AppContextMover from "../../../context/AppContextMover";

import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import {Button} from "@mui/material";

const MenuMover = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);
	const { stateMover } = useContext(AppContextMover);

	// STATE:
	const [variantEditNot, setVariantEditNot] = useState('outlined');
	const [variantEditYes, setVariantEditYes] = useState('outlined');

	// LOGICA:
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
			<div className='article__menuLinea__btns'>
				<Button variant={variantEditNot} onClick={() => handleEdit(false)} color='error' size='small'><GppGoodIcon fontSize='small'/></Button>
				<Button variant={variantEditYes} onClick={() => handleEdit(true)} color='success' size='small'><GppBadIcon fontSize='small'/></Button>
			</div>
		</div>
	)
};

export default MenuMover;
