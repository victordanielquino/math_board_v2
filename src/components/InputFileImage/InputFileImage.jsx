import React, {useContext, useEffect, useState, useRef} from 'react';

import fileUpload from '../../assets/img/file-upload.jpeg';

import './InputFileImage.scss';

import {makeStyles} from "@mui/styles";
import Paper from "@mui/material/Paper";

const useStyles  = makeStyles({
    paper: {
        //height: 100,
        padding: '0px',
        display: 'flex',
        width: '400px',
        height: '250px',
        marginBottom:'0.5em'
    },
    imageContainer: {
        //outline: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
        flexDirection: 'column',
    },
    imagePreview: {
        //outline: '1px solid black'
        //border: '2px dashed green',
        //borderRadius: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        width: '380px',
        '&:hover': {
            background: 'var(--greiTipo1_1)',
        }
    },
    imageName: {
        fontSize: '1em',
        marginTop: '10px',
    },
    imageFile: {
        display: 'none'
    },
    imageMessage: {
        fontSize: '0.9em',
    },
    image_: {
        outline: '1px solid green',
        height: '150px',
        width: '450px',
        objectFit: 'contain', // fill, contain, cover
    },
    image: {
        // outline: '1px solid red',
        maxWidth: '380px',
        maxHeight: '230px',
        margin: '0px'
    },
});

const InputFileImage = ({ setFile, setFileReader, setWidthImage, setHeightImage, imageBase64 = '' }) => {
    // STATE:
    const [errorImage, setErrorImage] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [image, setImage] = useState(fileUpload);
    const [imageName, setImageName] = useState('File...');

    // REF::
    const refInputFile = useRef(null);

    // LOGICA
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStyles(props);
    const typeImages = ['image/png', 'image/jpeg', 'image/jpg'];

    const isImageValid = (file) => {
        if (file && typeImages.includes(file.type)) {
            setErrorImage(false);
            return true;
        } else {
            setErrorImage(true);
            setMessageError('Archivo incorrecto');
            return false;
        }
    }
    const showImage = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', (e) => {
            setImage(e.target.result);
            //console.log('image:',e.target.result)
        });
        setImageName(file.name);
        setFile(file);
        setFileReader(fileReader);
    }
    const onclickImage = () => {
        refInputFile.current.click();
    }
    const ondropImage = (e) => {
        e.preventDefault();
        refInputFile.current.files = e.dataTransfer.files;
        const files = refInputFile.current.files;
        const file = files[0];
        if (isImageValid(file))
            showImage(file);
        else {
            setImage(fileUpload);
            setImageName('File...')
            setFile(null);
        }
    }
    const onchangeImage = (e) => {
        const files = e.target.files;
        const file = files[0];

        if (isImageValid(file))
            showImage(file);
        else {
            setImage(fileUpload);
            setImageName('File...')
            setFile(null);
        }
    }
    // LOGICA END

    // USEEFFECT:
    useEffect(() => {
        let elm = document.getElementById('inputFileImageId');
        setWidthImage(elm.clientWidth);
        setHeightImage(elm.clientHeight);
    }, [image]);

    return (
        <>
            <Paper  className={classes.paper} elevation={3}>
                <div className={classes.imageContainer}>
                    <input type='file' className={classes.imageFile} id='drag_fileId' accept='.png, .jpg, .jpeg' ref={refInputFile} onChange={onchangeImage}/>
                    <div className={classes.imagePreview}
                         onDragOver={(e) => {
                             e.preventDefault();
                         }}
                         onDragLeave={(e) => {
                             e.preventDefault();
                         }}
                         onClick={onclickImage}
                         onDrop={ondropImage}
                    >
                        <img src={image} className={classes.image} alt='' id='inputFileImageId'  />
                    </div>
                </div>
            </Paper>
            <center>
                <span className={classes.imageMessage}>Haga click o arrastre una imagen aqui.</span>
            </center>
        </>
    );
}

export default InputFileImage;