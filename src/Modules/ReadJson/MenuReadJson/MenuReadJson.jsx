import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext                                         from '../../../context/AppContext';
import { Button, TextField, Typography }                  from '@mui/material';
import useStylesMenuReadJson                              from './MenuReadJsonStyle';
import SaveAltIcon                                        from '@mui/icons-material/SaveAlt';
import FolderZipIcon                                      from '@mui/icons-material/FolderZip';
import ModalUI                                            from '../../../components/ModalUI/ModalUI_';
import { u_getFecha }                                     from '../../../utils/utils';
import {PhotoCamera}                                      from "@mui/icons-material";
import PictureAsPdfIcon                                   from "@mui/icons-material/PictureAsPdf";
import PdfCanvas                                          from "../../PdfCanvas/PdfCanvas";

const MenuReadJson = () => {
	// CONTEXT:
	const { state, h_setReadJsonAll } = useContext(AppContext);

	// STATE:
	const [jsonName, setJsonName] = useState('');
	const [open, setOpen] = useState(false);
	const [toggleModalPdf, setToggleModalPdf] = useState(false);

	// REF:
	const inputRef = useRef(null);

	// LOGICA:
	const props = {};
	const classes = useStylesMenuReadJson(props);

	// FUNCTIONS:
	const searchIdMax = (array) => {
		let id = -1;
		array.forEach((elm, index) => {
			elm.id > id ? (id = elm.id) : '';
		});
		return id;
	};
	const readJson = (jsonIn) => {
		let arrayMathBoardsBtns = jsonIn[0].mathboards; // mathboards = [{},{},{}...]
		let indexSelect = jsonIn[1].mathboardSelect.index;
		let historia = jsonIn[2].historia;

		// BUTTONS MATHBOARDS:
		arrayMathBoardsBtns[indexSelect].variant = 'contained';
		let id = searchIdMax(historia);
		h_setReadJsonAll(
			arrayMathBoardsBtns,
			indexSelect,
			!state.mathBoardsReadJson,
			historia,
			id + 1
		);
	};
	const onchangeFile = async (e) => {
		const files = e.target.files;
		if (files.length > 0) {
			const file = files[0];
			const data = await file.text();
			//console.log('data:', data);
			const jsonAux = JSON.parse(data);
			readJson(jsonAux);
		}
	};
	const handleLoad = () => {
		inputRef.current.click();
	};
	const downloadJson = () => {
		let mathboards = { mathboards: state.mathBoards };
		let mathboardSelect = {
			mathboardSelect: { index: state.mathBoardsIndexSelec },
		};
		let historiaNew = [];
		for (let i = 0; i < state.historia.length; i++) {
			let elm = state.historia[i];
			if (elm.types === 'image') {
				elm.dataImagen = null;
				elm.dataUse = false;
			}
			historiaNew.push(elm);
		}
		let historia = { historia: historiaNew };
		//console.log(historia)
		let array = [mathboards, mathboardSelect, historia];
		//console.log('array:', array);
		let jsonContent = JSON.stringify(array);
		//console.log(jsonContent);

		const a = document.createElement('a');
		const archivo = new Blob([jsonContent], { type: 'text/plain' });
		const url = URL.createObjectURL(archivo);
		a.href = url;
		a.download = `${jsonName}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const handleOpenModalUI = () => {
		let fecha = u_getFecha();
		setJsonName(fecha.dateText + '_');
		setOpen(true);
	};
	const handleSuccess = () => {
		downloadJson();
		setOpen(false);
	};
	const handlePhotoCamera = () => {
		let canvas = document.getElementById('canvas-1');
		let canvasImagen = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
		window.location.href = canvasImagen;
	}
	const handlePdf = () => {
		setToggleModalPdf(true);
	}

	// EFFECT:

	return (
		<>
			<article className={classes.article} style={{ color: 'primary' }}>
				<input
					type="file"
					name="file"
					accept=".json"
					ref={inputRef}
					onChange={onchangeFile}
					className={classes.inputFile}
				/>
				<Button
					variant="outlined"
					size="small"
					startIcon={<FolderZipIcon />}
					style={{ marginRight: '20px' }}
					onClick={() => handleLoad()}
				>
					ABRIR
				</Button>
				<Button
					variant="outlined"
					size="small"
					startIcon={<SaveAltIcon />}
					onClick={() => handleOpenModalUI()}
					style={{ marginRight: '20px' }}
				>
					GUARDAR
				</Button>
				<Button
					variant="outlined"
					color='primary'
					size='small'
					onClick={() => handlePdf()}
					startIcon={<PictureAsPdfIcon />}
					style={{ marginRight: '20px' }}
				>
					GUARDAR EN PDF
				</Button>
				<Button
					variant="outlined"
					color="primary"
					size="small"
					onClick={() => handlePhotoCamera()}
					startIcon={<PhotoCamera />}
					style={{ marginRight: '20px' }}
				>
					Foto
				</Button>
				<Button
					variant="outlined"
					color="primary"
					size="small"
					onClick={() => handlePhotoCamera()}
					startIcon={<PhotoCamera />}
				>
					VER PDF
				</Button>
			</article>
			<ModalUI
				open={open}
				setOpen={setOpen}
				handleSuccess={handleSuccess}
				maxWidth={'md'}
				title={'Guardar  Proyecto:'}
				booleanFooter={true}
				successTitle={'GUARDAR'}
			>
				<TextField
					fullWidth={true}
					id="outlined-basic"
					label="Nombre del Archivo:"
					variant="outlined"
					color="primary"
					size="small"
					value={jsonName}
					InputProps={{ style: { fontSize: '1em' } }}
					onChange={(e) => setJsonName(e.target.value)}
					sx={{
						minHeight: 0,
						minWidth: 0,
						padding: 0,
						margin: '0 0 10px 0',
						textTransform: 'none',
					}}
				/>
				<Typography style={{ fontSize: '0.8em' }}>
					Nota: No usar espacios en blaco !!!
				</Typography>
			</ModalUI>
			<PdfCanvas toggleModal={toggleModalPdf} setToggleModal={setToggleModalPdf}/>
		</>
	);
};

export default MenuReadJson;
