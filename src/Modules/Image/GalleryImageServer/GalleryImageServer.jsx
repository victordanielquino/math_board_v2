import React, {useContext, useEffect, useRef, useState} from 'react';

import ModalImageLoading from "../../../components/ModalImageLoading";

import './GalleryImageServer.scss';
import imageDownload from '../../../assets/img/file-download.png';
import imageError from '../../../assets/img/Error.png';
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

import AppContext from "../../../context/AppContext";
import AppContextImagen from "../../../context/AppContextImagen";

import { firestoreGetDocs } from '../../../firebase/services/firestore.services';
import {makeStyles} from "@mui/styles";

const useStyles  = makeStyles({
    container: {
        //outline: '1px solid blue',
        display: "flex",
        justifyContent: "space-between"
    },
    divRight: {
        outline: '1pz solid green'
    },
    divLefth: {
        outline: '1pz solid green'
    },
    paper: {
        //height: 100,
        padding: '0px',
        display: 'flex',
        width: '400px',
        height: '250px'
    },
    imageContainer: {
        // outline: '1px solid green',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
    },
    image: {
        // outline: '1px solid red',
        maxWidth: '380px',
        maxHeight: '230px',
        margin: '0px'
    },
    imageLoading: {
        // outline: '1px solid red',
        maxWidth: '300px',
        maxHeight: '150px',
        margin: '0px'
    },
    errorMessage: {
        // outline: '1px solid red',
        fontSize: '1em',
        color: 'red',
        marginBottom: '10px',
    },
    divPagination: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    divLoading: {
        width: '400px'
    }
});

const GalleryImageServer = ({ setOpen, stateSuccess, setStateSuccess }) => {
    // CONTEXT:
    const { state, h_addH } = useContext(AppContext);
    const { s_imagenAddHId, stateImagen } = useContext(AppContextImagen);

    // USESTATE:
    const [errorImage, setErrorImage] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState('');
    const [imagePreviewSrc, setImagePreviewSrc] = useState(imageDownload);

    // PAGINACION:
    const [docs, setDocs] = useState([]);   // documentos recibidos de firestore
    const [arrayDocs, setArrayDocs] = useState([]); // documetos llevados a un array
    const [pages, setPages] = useState([]); // array separado en objetos con el contenido de cada pagina.
    const [pag, setPag] = useState([]); // pagina que se muestra en la tabla
    const [pageMax, setPageMax] = useState(1);  // ultima pagina
    const [pageCurrent, setPageCurrent] = useState(1);  // pagina actual
    const [file, setFile] = useState(null);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [btnDisbled, setBtnDisabled] = useState(false);

    // REF:
    const imgRef = useRef(null);

    // LOGICA
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStyles(props);
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
        canvas: stateImagen.canvas,
        types: 'image',
    };
    const downloadDocs = () => {
        setLoadingDocs(true);
        firestoreGetDocs('galeria')
            .then(docsFb => {
                setLoadingDocs(false);
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
    const handlePreview = (data) => {
        if (file){
            if (file.id !== data.id){
                setLoadingDownload(true);
                setBtnDisabled(true);
                setFile(data);
                setImagePreviewSrc(data.srcFile);
            }
        } else {
            setLoadingDownload(true);
            setBtnDisabled(true);
            setFile(data);
            setImagePreviewSrc(data.srcFile);
        }
    }
    const onLoadFin = () => {
        setLoadingDownload(false);
        setBtnDisabled(false);
    }
    const parseURI = async(d) => {
        let reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
        reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
        return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
            reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
                res(e.target.result)
            }
        })
    }
    const getDataBlob = async (url) => {
        let res = await fetch(url);
        let blob = await res.blob();
        let uri = await parseURI(blob);
        return uri;
    }
    const handleDownload = async () => {
        if (file === null) {
            setErrorImage(true);
            setErrorImageMessage('Debe seleccionar una imagen...');
            setLoadingDownload(true);
            //setImagePreviewSrc(imageError);
        } else {
            // VERDAD:
            let elm = imgRef.current;
            setLoadingDownload(true);
            imageNew.fileSrc = await getDataBlob(file.srcFile)
            imageNew.id = stateImagen.id;
            imageNew.fileId = file.id;
            imageNew.fileNombre = file.nameFile;
            imageNew.fileAutor = file.autorFile;
            imageNew.x_fin = imageNew.x_ini + elm.clientWidth;
            imageNew.y_fin = imageNew.y_ini + elm.clientHeight;
            //s_imagenAddHId(imageNew, stateImagen.id + 1);
            imageNew.id = state.id;
            h_addH(imageNew);
            setLoadingDownload(false);
            setOpen(false);
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
            setLoadingDownload(false)
            //setImagePreviewSrc(imageDownload);
        }, 5000)
    },[errorImage]);

    useEffect(() => {
        pages.length > 0 ? updateTable() : '';
    }, [pageCurrent]);

    useEffect(() => {
        if(stateSuccess) {
            handleDownload();
            setStateSuccess(false);
        }
    }, [stateSuccess])

    return (
        <div className={classes.container}>
            <div className={classes.divLefth}>
                <Paper  className={classes.paper} elevation={3}>
                    <div className={classes.imageContainer}>
                        {errorImage && <div className={classes.errorMessage}><center>{errorImageMessage}</center></div>}
                        <img
                            src={imagePreviewSrc}
                            className={(!loadingDownload) ? classes.image : classes.imageLoading}
                            alt=''
                            ref={imgRef}
                            onLoad={() => onLoadFin()}
                        />
                        { (loadingDownload) ? <ModalImageLoading/> : '' }
                    </div>
                </Paper>
            </div>
            <div className={classes.divRight}>
                {
                    (!loadingDocs)
                        ?   <TableContainer component={Paper} sx={{minHeight: 220}}
                                            className='galery__contenedor__lista__table'>
                                <Table sx={{minWidth: 400}} aria-label="simple table" size='small'>
                                    <TableHead>
                                        <TableRow className='galery__contenedor__lista__table__row'>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pag.map((elm) => (
                                            <TableRow key={elm.id} className='galery__contenedor__lista__table__row'
                                                      sm={3}>
                                                <TableCell align='right'
                                                           className='galery__contenedor__lista__table__row__cell-lefth'
                                                           padding='none'>
                                                    {elm.nameFile}
                                                </TableCell>
                                                <TableCell align='center'
                                                           className='galery__contenedor__lista__table__row__cell-right'>
                                                    <Button
                                                        variant="outlined"
                                                        size='small'
                                                        id={elm.id}
                                                        disabled={btnDisbled}
                                                        onClick={() => handlePreview(elm)}
                                                    >Preview</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        : <div className={classes.divLoading}><ModalImageLoading/></div>
                }
                <div className={classes.divPagination}>
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
    )
}

export default GalleryImageServer;