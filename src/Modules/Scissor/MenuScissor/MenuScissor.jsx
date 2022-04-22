import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button}                                         from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import useStylesMenuScissor from './MenuScissorStyle';
import AppContextScissor    from "../../../context/AppContextScissor";
import {isObjectEmpty}      from "../../../utils/utils";
import AppContext           from "../../../context/AppContext";

const MenuScissor = () => {
    // CONTEXT:
    const { state, h_addH } = useContext(AppContext);
    const { stateScissor, h_scissorSetScissor } = useContext(AppContextScissor);

    // STATE:
    const [disabled, setDisabled] = useState(true);
    const [img, setImg] = useState('');

    // REF:
    const aRef = useRef(null);

    // LOGICA:
    const props = {}
    const classes = useStylesMenuScissor(props);
    let canvas = '';
    let context = '';

    // FUNCTIONS:
    const convertImagedataToBase64 = (imageData) => {
        let canvas = document.createElement("canvas");
        let w = imageData.width;
        let h = imageData.height;
        canvas.width = w;
        canvas.height = h;
        let ctx = canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);        // synchronous
        var dataURL = canvas.toDataURL();
        //console.log(dataURL);
        return dataURL;
    }
    const handleDuplicateSelect = async () => {
        let image = {
            id: state.id,
            edit: true,
            visible: true,
            fileId: 0,
            filePropietario: 'VRQ',
            fileSrc: '',
            fileNombre: 'duplicate',
            fileAutor: 'all',
            x_ini: 100,
            y_ini: 100,
            x_fin: 400,
            y_fin: 200,
            dataImagen:[],
            dataUse: false,
            types: 'image',
            canvas: stateScissor.canvas,
        };
        canvas = document.getElementById('canvas-1');
        context = canvas.getContext('2d');
        let whidth = stateScissor.scissor.x_fin - stateScissor.scissor.x_ini-2;
        let height = stateScissor.scissor.y_fin - stateScissor.scissor.y_ini-2;
        let imageData = context.getImageData(stateScissor.scissor.x_ini+1, stateScissor.scissor.y_ini+1, whidth, height);
        let base64 = convertImagedataToBase64(imageData);
        image.dataImagen = imageData;
        image.fileSrc = base64;
        image.x_ini = stateScissor.scissor.x_ini + 1 + 20;
        image.y_ini = stateScissor.scissor.y_ini + 1 + 20;
        image.x_fin = stateScissor.scissor.x_fin - 1 + 20;
        image.y_fin = stateScissor.scissor.y_fin - 1 + 20;
        h_addH(image);
        h_scissorSetScissor({});
    }
    const handleDownloadSelect = async () => {
        canvas = document.getElementById('canvas-1');
        context = canvas.getContext('2d');
        let whidth = stateScissor.scissor.x_fin - stateScissor.scissor.x_ini-2;
        let height = stateScissor.scissor.y_fin - stateScissor.scissor.y_ini-2;
        let imageData = context.getImageData(stateScissor.scissor.x_ini+1, stateScissor.scissor.y_ini+1, whidth, height);
        let base64 = convertImagedataToBase64(imageData);
        await setImg(base64);
        aRef.current.click();
        h_scissorSetScissor({});
    }

    // EFFECT:
    useEffect(() => {
        if(isObjectEmpty(stateScissor.scissor)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [stateScissor.scissor]);

    return (
        <>
            <article className={classes.article}>
                <Button
                    variant="outlined"
                    size='small'
                    startIcon={<ContentCopyIcon/>}
                    style={{ marginRight:'20px'}}
                    onClick={() => handleDuplicateSelect()}
                    disabled={disabled}
                >DUPLICATE SELECT</Button>
                <Button
                    variant="outlined"
                    size='small'
                    startIcon={<FileDownloadIcon/>}
                    onClick={() => handleDownloadSelect()}
                    disabled={disabled}
                >DOWNLOAD SELECT</Button>
                <a href={img} download ref={aRef} className={classes.a}></a>
            </article>
        </>
    )
}

export default MenuScissor;