import React, {useEffect, useState} from 'react';

import ModalImageLoading from "../components/ModalImageLoading";

import '../styles/ModalImageGalery.scss';
import image from '../assets/img/file-download.png';
import {firestoreGetDocs, firestoreMostrarDocs} from "../firebase/services/firestore.services";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';


const ModalImageGalery = () => {
    // USESTATE:
    const [toggleModalImageLoading, setToggleModalImageLoading] = useState(false);
    const [toggleClassImagePreview, setToggleClasesImagePreview] = useState('galery__contenedor__image__preview');
    const [errorImage, setErrorImage] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState('');
    const [docs, setDocs] = useState([]);
    const [array, setArray] = useState([]);
    const [imagePreview, setImagePreview] = useState(image);

    // LOGICA
    const convertDocsArray = (docs) => {
        let newArray = [];
        docs.forEach(doc => {
            let obj = {
                id: doc.id,
                autorFile: doc.data().autorFile,
                nameFile: doc.data().nameFile,
                srcFile: doc.data().srcFile,
            }
            newArray.push(obj);
        })
        return newArray;
    }
    const handleDownload = () => {
        setErrorImage(true);
        setErrorImageMessage('Debe seleccionar imagen');
    }
    const downloadDocs = () => {
        firestoreGetDocs('galeria')
            .then(array => {
                setDocs(array);
                setArray(convertDocsArray(docs));
            });
    }
    const handleBtnImgPrev = (id, src) => {
        setToggleClasesImagePreview('galery__contenedor__image__preview desactive');
        setToggleModalImageLoading(true);
        setImagePreview(src);
    }
    const prueba = () => {
        //alert('se cargo la imagen');
        setToggleClasesImagePreview('galery__contenedor__image__preview');
        setToggleModalImageLoading(false);
    }
    /// LOGICA END

    // USEEFFECT:
    useEffect(() => {
        downloadDocs();
    }, []);
    useEffect(() => {
        setArray(convertDocsArray(docs));
    }, [docs]);
    useEffect(() => {
        setTimeout(() => {
            setErrorImage(false);
            setErrorImageMessage('');
        }, 5000)
    },[errorImage]);

    const tableHeader = ['Imagen', 'Preview'];

    return (
        <>
            <div className='galery'>
                <div className='galery__contenedor'>
                    <div className='galery__contenedor__image'>
                        {errorImage && <div className='galery__contenedor__image__error'>{errorImageMessage}</div>}
                        <img src={imagePreview} width='200px' height='200px' alt='' className={toggleClassImagePreview} onLoad={() => prueba()}/>
                        <button onClick={ handleDownload }>Download</button>
                        {toggleModalImageLoading && <ModalImageLoading/> }
                    </div>
                    <div className='galery__contenedor__lista'>
                        <TableContainer component={Paper} className='galery__contenedor__lista__table'>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className='galery__contenedor__lista__table__row'>
                                        {
                                            tableHeader.map(title => <TableCell align="center" key={title}>{title}</TableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {array.map((row) => (
                                        <TableRow key={row.id} className='galery__contenedor__lista__table__row'>
                                            <TableCell align='right' className='galery__contenedor__lista__table__row__cell'>
                                                {row.nameFile}
                                            </TableCell>
                                            <TableCell align='center' className='galery__contenedor__lista__table__row__cell'>
                                                <Button variant="outlined" size='small' onClick={() => handleBtnImgPrev(row.id, row.srcFile)}>Preview</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalImageGalery;