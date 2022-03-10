import React, {useContext, useEffect, useState} from 'react';

import ModalImageLoading from "../components/ModalImageLoading";

import '../styles/ModalImageGalery.scss';
import image from '../assets/img/file-download.png';
import {
    Button, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DownloadIcon from '@mui/icons-material/Download';
import AppContextImagen from "../context/AppContextImagen";

import { firestoreGetDocs } from '../firebase/services/firestore.services';

const ModalImageGalery = ({
                              estadoModalImage,
                              setEstadoModalImage
}) => {
    // USESTATE:
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);
    const [toggleModalImageLoading, setToggleModalImageLoading] = useState(false);
    const [toggleClassImagePreview, setToggleClasesImagePreview] = useState('galery__contenedor__image__preview');
    const [errorImage, setErrorImage] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState('');
    const [imagePreviewSrc, setImagePreviewSrc] = useState(image);

    // PAGINACION:
    const [docs, setDocs] = useState([]);   // documentos recibidos de firestore
    const [arrayDocs, setArrayDocs] = useState([]); // documetos llevados a un array
    const [pages, setPages] = useState([]); // array separado en objetos con el contenido de cada pagina.
    const [pag, setPag] = useState([]); // pagina que se muestra en la tabla
    const [pageMax, setPageMax] = useState(1);  // ultima pagina
    const [pageCurrent, setPageCurrent] = useState(1);  // pagina actual
    const [imageSelect, setImageSelect] = useState(null);

    // LOGICA
    const nroItemsXPagina = 5;
    const imageNew = {
        id: 0,
        edit: true,
        visible: true,
        filePropietario: '',
        fileId: '',
        fileSrc: '',
        fileNombre: '',
        fileAutor: '',
        x_ini: 100,
        y_ini: 100,
        x_fin: 400,
        y_fin: 400,
        dataImagen:[],
        dataUse: false,
    };
    const downloadDocs = () => {
        firestoreGetDocs('galeria')
            .then(docsFb => {
                setDocs(docsFb);
            });
    }
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
    const paginacionUpdate = (array) => {
        let l = array.length;
        let n = parseInt(l / nroItemsXPagina);
        let mod = (l % nroItemsXPagina);
        mod !== 0 ? n = n+1 : '';
        setPageMax( n);

        let pagesAux = [];
        for (let i = 0 ; i < n ; i++) {
            let aux = array.slice(i * nroItemsXPagina, nroItemsXPagina + (i * nroItemsXPagina));
            pagesAux.push(aux);
        }
        (pagesAux.length > 0) ? setPages(pagesAux) : '';
    }
    const updateTable = () => {
        setPag(pages[pageCurrent-1])
    }
    const lefthPag = () => {
        (pageCurrent - 1 >= 1)
            ? setPageCurrent(pageCurrent - 1)
            : '';
    }
    const rightPag = () => {
        (pageCurrent + 1 <= pageMax)
            ? setPageCurrent(pageCurrent + 1)
            : '';
    }
    const handleBtnImgPrev = (data) => {
        setImageSelect(data);
        setToggleClasesImagePreview('galery__contenedor__image__preview desactive');
        setToggleModalImageLoading(true);
        setImagePreviewSrc(data.srcFile);
    }
    const onLoadFin = () => {
        setToggleClasesImagePreview('galery__contenedor__image__preview');
        setToggleModalImageLoading(false);
    }
    const handleDownload = () => {
        if (imageSelect === null) {
            setErrorImage(true);
            setErrorImageMessage('Debe seleccionar imagen');
        } else {
            // VERDAD:
            imageNew.id = stateImagen.id;
            imageNew.fileId = imageSelect.id;
            imageNew.fileSrc = imageSelect.srcFile;
            imageNew.fileNombre = imageSelect.nameFile;
            imageNew.fileAutor = imageSelect.autorFile;

            s_imagenAddHId(imageNew, stateImagen.id + 1);
            setToggleClasesImagePreview('galery__contenedor__image__preview desactive');
            setToggleModalImageLoading(false);

            setEstadoModalImage(false);
        }
    }
    /// LOGICA END

    // USEEFFECT:
    useEffect(() => {
        downloadDocs();
    }, []);

    useEffect(() => {
        setArrayDocs(convertDocsArray(docs));
    }, [docs]);

    useEffect(() => {
        arrayDocs.length > 0 ? paginacionUpdate(arrayDocs):'';
    }, [arrayDocs]);

    useEffect(() => {
        pages.length > 0 ? updateTable() : '';
    }, [pages]);

    useEffect(() => {
        setTimeout(() => {
            setErrorImage(false);
            setErrorImageMessage('');
        }, 5000)
    },[errorImage]);

    useEffect(() => {
        pages.length > 0 ? updateTable() : '';
    }, [pageCurrent])

    return (
        <>
            {   estadoModalImage &&
                <div className='galery'>
                    <div className='galery__contenedor'>
                        <div className='galery__contenedor__image'>
                            {errorImage && <div className='galery__contenedor__image__error'>{errorImageMessage}</div>}
                            {toggleModalImageLoading && <ModalImageLoading/>}
                            <img
                                src={imagePreviewSrc}
                                width='200px'
                                height='200px'
                                alt=''
                                className={toggleClassImagePreview}
                                onLoad={() => onLoadFin()}
                            />
                            <Button
                                variant="outlined"
                                size='small'
                                startIcon={<DownloadIcon/>}
                                onClick={handleDownload}
                            >DOWNLOAD</Button>
                        </div>
                        <div className='galery__contenedor__lista'>
                            <TableContainer component={Paper} sx={{minHeight: 220}}
                                            className='galery__contenedor__lista__table'>
                                <Table sx={{minWidth: 200}} aria-label="simple table" size='small'>
                                    <TableHead>
                                        <TableRow className='galery__contenedor__lista__table__row'>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pag.map((row) => (
                                            <TableRow key={row.id} className='galery__contenedor__lista__table__row' sm={3}>
                                                <TableCell align='right'
                                                           className='galery__contenedor__lista__table__row__cell-lefth'
                                                           padding='none'>
                                                    {row.nameFile}
                                                </TableCell>
                                                <TableCell align='center'
                                                           className='galery__contenedor__lista__table__row__cell-right'>
                                                    <Button variant="outlined" size='small'
                                                            onClick={() => handleBtnImgPrev(row)}
                                                    >Preview</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='galery__contenedor__lista__pagination'>
                                <IconButton color='primary' aria-label="delete" size="small" onClick={() => lefthPag()}>
                                    <ChevronLeftIcon fontSize="inherit"/>
                                </IconButton>
                                <Typography variant='body2' color='initial'>{pageCurrent} / {pageMax}</Typography>
                                <IconButton color='primary' aria-label="delete" size="small" onClick={() => rightPag()}>
                                    <ChevronRightIcon fontSize="inherit"/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalImageGalery;