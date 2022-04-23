import React, {useContext, useEffect, useState} from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";

import ModalUI from "../../components/ModalUI/ModalUI";
import InputFileImage from "./InputFileImage/InputFileImage";
import {AccountCircle} from "@mui/icons-material";
import {Box, TextField} from "@mui/material";

import AppContextSesion from "../../context/AppContextSesion";
import AppContext       from "../../context/AppContext";
import AppContextGrid   from "../../context/AppContextGrid";
import draw             from "../Draw/Draw";

import Loading from "../../components/Loading/Loading";

const PdfCanvas = ({toggleModal = false, setToggleModal = false, canvasRef}) => {
    // CONTEXT:
    const { state } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const {
        stateSesion,
        h_sesionSetSchool,
        h_sesionSetTeacher,
        h_sesionSetLevel,
        h_sesionSetTheme,
        h_sesionSetImageBase64
    } = useContext(AppContextSesion);

    // STATE:
    const [stateSuccess, setStateSuccess] = useState(false);
    const [loader, setLoader] = useState(false);

    const [file, setFile] = useState(null);
    const [fileReader, setFileReader] = useState(null);
    const [widthImage, setWidthImage] = useState(0);
    const [heightImage, setHeightImage] = useState(0);

    // LOGICA:
    const handleSave = () => {
        setLoader(true);
        const doc = new jsPDF('p', 'pt', 'a4');
        // TEXT:
        // doc.text('Hello world!', 10, 200);
        // TABLE:
        //autoTable(doc, { html: '#my-table' })
        autoTable(doc,{
            styles: {fontSize: '12', lineColor: ['#3f50b5'], lineWidth: 1},
            columnStyles: {
                0: { halign: 'left', fillColor: ['#3f50b5'], textColor: [255,255,255] , cellWidth: 150} ,
                1: { cellWidth: 250 } ,
            },
            //head: [['Name', 'ap', 'telf']],
            body: [
                ['Unidad Educativa:', stateSesion.school, { content: '', rowSpan: 5 }],
                ['Profesor(ra):', stateSesion.teacher,''],
                ['Curso:', stateSesion.level, ''],
                ['Tema:', stateSesion.theme, ''],
                ['Fecha:', new Date().toISOString(), ''],
            ],
            theme:'plain'
        })
        // NEW CANVAS:
        const paintNewCanvas = async (context, historia, canvasId) => {
            try {
                await draw(context, historia, canvasId, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        }
        const generateNewCanvas = (canvasId) => {
            let canvas = document.createElement("canvas");
            canvas.width = canvasRef.current.width;
            canvas.height = canvasRef.current.height;
            let context = canvas.getContext("2d");
            // await draw(context, state.historia, state.canvas, stateGrid);
            paintNewCanvas(context, state.historia, canvasId);
            return canvas.toDataURL('image/PNG');
        }
        // IMAGE:
        const DATA = canvasRef.current; // canvas
        const options = {
            background: 'white',
            scale: 3
        };
        html2canvas(DATA, options).then((canvas) => {
            // ADD LOGO TO PDF:
            if (file && fileReader) {
                doc.addImage(fileReader.result, 'PNG', 450, 50, 100, 100, undefined, 'FAST');
                h_sesionSetImageBase64(fileReader.result);
            }
            // ADD CANVAS to PDF
            let l = state.mathBoards.length;
            let x_ini = 40;
            let y_ini = 170;
            let inc = 330;
            for (let i = 0; i < l; i++) {
                if (i % 2 === 0 && i !== 0) {
                    doc.addPage('p', 'pt', 'a4');
                    y_ini = 40;
                    inc = 400;
                }
                const img = generateNewCanvas(state.mathBoards[i].canvas);
                const bufferX = x_ini;
                const bufferY = y_ini;
                const imgProps = (doc).getImageProperties(img);
                const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
                const pdfHeight =( (imgProps.height * pdfWidth) / imgProps.width) + 70;
                doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

                y_ini += inc;
            }
            // ADD CANVAS to PDF
            /*const img = canvas.toDataURL('image/PNG');
            const bufferX = 40;
            const bufferY = 170;
            const imgProps = (doc).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight =( (imgProps.height * pdfWidth) / imgProps.width) + 70;
            doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');*/
            return doc;
        }).then((docResult) => {
            docResult.save(`${new Date().toISOString()}_mathboard.pdf`);
            setToggleModal(false);
            setLoader(false);
        });
    }

    // EFFECT:
    useEffect(() => {
        if(stateSuccess) {
            handleSave();
            setStateSuccess(false);
        }
    }, [stateSuccess]);

    return (
        <>
            <ModalUI open={toggleModal} setOpen={setToggleModal} setStateSuccess={setStateSuccess} maxWidth={'md'} title={'SAVE ON THE PDF:'} >
                {   !loader &&
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '50%'}}>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField
                                id="input-with-sx"
                                label="Nombre de la U.E.:"
                                variant="standard"
                                fullWidth
                                value={stateSesion.school}
                                onChange={(e) => h_sesionSetSchool(e.target.value)}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField
                                id="input-with-sx"
                                label="Nombre del Profesor:"
                                variant="standard"
                                fullWidth
                                value={stateSesion.teacher}
                                onChange={(e) => h_sesionSetTeacher(e.target.value)}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField
                                id="input-with-sx"
                                label="Curso:"
                                variant="standard"
                                fullWidth
                                value={stateSesion.level}
                                onChange={(e) => h_sesionSetLevel(e.target.value)}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField
                                id="input-with-sx"
                                label="Thema:"
                                variant="standard"
                                fullWidth
                                value={stateSesion.theme}
                                onChange={(e) => h_sesionSetTheme(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div>
                        <InputFileImage
                            setFile={setFile}
                            setFileReader={setFileReader}
                            setWidthImage={setWidthImage}
                            setHeightImage={setHeightImage}
                            imageBase64={stateSesion.imageBase64}
                        />
                    </div>
                </div>
                }
                {loader && <Loading/>}
            </ModalUI>
        </>
    )
}

export default PdfCanvas;