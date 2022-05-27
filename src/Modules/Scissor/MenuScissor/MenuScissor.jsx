import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button}                                         from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import useStylesMenuScissor from './MenuScissorStyle';
import AppContextScissor    from "../../../context/AppContextScissor";
import {isObjectEmpty}      from "../../../utils/utils";
import AppContext           from "../../../context/AppContext";
import {
    anguloEntreDosRectasCaso2,
    rectaQuePasaPorDosPtos,
    u_distanciaEntreDosPtos,
    u_ptoMedio
}                           from "../../../utils/geometriaAnalitica";

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
            fileNombre: 'duplicate.png',
            fileAutor: 'all',
            x_ini: 100,
            y_ini: 100,
            x_fin: 400,
            y_fin: 200,
            dataImagen:[],
            dataUse: false,
            types: 'image',
            canvas: stateScissor.canvas,

            vertex: [],
            h: 0,
            k: 0,
            angulo: 0,
            radio: 0,
            rotateDeg: 0,
            rotateDegPrev: 0,
            width: 0,
            height: 0,
            imageDraw: '',
            description: '',
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

        //
        image.vertex[0] = {x:image.x_ini, y:image.y_ini, pto:0};
        image.vertex[1] = {x:image.x_fin, y:image.y_ini, pto:1};
        image.vertex[2] = {x:image.x_fin, y:image.y_fin, pto:2};
        image.vertex[3] = {x:image.x_ini, y:image.y_fin, pto:3};
        let resp = u_ptoMedio(image.vertex[0], image.vertex[1]);
        image.vertex[4] = {x:resp.x, y:resp.y, pto:4};
        resp = u_ptoMedio(image.vertex[1], image.vertex[2]);
        image.vertex[5] = {x:resp.x, y:resp.y, pto:5};
        resp = u_ptoMedio(image.vertex[2], image.vertex[3]);
        image.vertex[6] = {x:resp.x, y:resp.y, pto:6};
        resp = u_ptoMedio(image.vertex[3], image.vertex[0]);
        image.vertex[7] = {x:resp.x, y:resp.y, pto:7};
        resp = u_ptoMedio(image.vertex[0], image.vertex[2]);
        image.h = resp.x;
        image.k = resp.y;
        // angulo:
        let rec1 = rectaQuePasaPorDosPtos(image.vertex[0], {x:image.h, y:image.k});
        let rec2 = rectaQuePasaPorDosPtos(image.vertex[3], {x:image.h, y:image.k});
        image.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
        (image.angulo < 0) ? image.angulo = 90 + (90 + image.angulo):'';
        // radio:
        image.radio = u_distanciaEntreDosPtos(image.vertex[0], {x:image.h, y:image.k});
        // rotateDegPrev:
        image.rotateDegPrev = image.angulo / 2;
        // width height:
        image.width = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
        image.height = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);

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