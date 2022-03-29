import React, {useContext, useEffect} from 'react';

//
import AppContextText from "../../context/AppContextText";
import AppContextCanvas from "../../context/AppContextCanvas";
import AppContextLinea from "../../context/AppContextLinea";
import AppContextLapiz from "../../context/AppContextLapiz";
import AppContextPlano from "../../context/AppContextPlano";
import AppContextCirculo from "../../context/AppContextCirculo";
import AppContextTriangulo from "../../context/AppContextTriangulo";
import AppContextCuadrado from "../../context/AppContextCuadrado";
import AppContextImagen from "../../context/AppContextImagen";

// UTILS:
import {u_lapizGraficaH} from "../Pencil/UtilsLapiz";
import {u_textGraficaFontEdit, u_textGraficaH} from "./UtilsText";
import {utilsCuadricula_graficaCuadricula} from "../Grid/UtilsCuadricula";
import {u_planoGraficaH} from "../Plano/UtilsPlano";
import {u_imagenGraficaH} from "../Image/UtilsImagen";
import {u_cuadradoGraficaH} from "../Square/UtilsCuadrado";
import {u_circuloGraficaH} from "../Circle/UtilsCirculo";
import {u_trianguloGraficaH} from "../Triangle/UtilsTriangulo";
import {u_lineaGraficaH} from "../Line/UtilsLinea";

const PaintText = (id_canvas) => {
    // CONTEXT:
    const { stateCanvas } = useContext(AppContextCanvas);
    const { stateLinea } = useContext(AppContextLinea);
    const { stateLapiz } = useContext(AppContextLapiz);
    const { statePlano } = useContext(AppContextPlano);
    const {
        stateText,
        h_textSetColor,
        h_textSetBold,
        h_textSetItalic,
        h_textSetUnderL,
        h_textSetTypografia,
        h_textSetSize,
        h_textSetText,
        h_textSetFocus
    } = useContext(AppContextText);
    const { stateCirculo } = useContext(AppContextCirculo);
    const { stateTriangulo } = useContext(AppContextTriangulo);
    const { stateCuadrado } = useContext(AppContextCuadrado);
    const { stateImagen } = useContext(AppContextImagen);
    // STATE:

    // LOGICA
    const paint = async () => {
        console.log('PaintCuadrado');
        try {
            utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
            u_planoGraficaH(context, statePlano.historiaPlano); // plano cartesiano
            await u_imagenGraficaH(context, stateImagen.historiaImagen);
            u_cuadradoGraficaH(context, stateCuadrado.historiaCuadrado);
            u_circuloGraficaH(context, stateCirculo.historiaCirculo);
            u_trianguloGraficaH(context, stateTriangulo.historiaTriangulo);
            u_lineaGraficaH(context, stateLinea.historiaLinea);
            u_textGraficaH(context, stateText.historiaText);
            u_lapizGraficaH(context, stateLapiz.historiaLapiz); // grafica historia de lapiz
        } catch (e) {
            console.log(e.message);
        }
    }
    const text = {
        id: stateText.id,
        x_ini: 0,
        y_ini: 0,
        x_fin:0,
        y_fin:0,
        visible: true,
        edit: true,

        fontAlign: 'start',	// startr, end
        fontBaseline: 'top',
        fontColor: stateText.fontColor,
        fontBold: stateText.fontBold,
        fontItalic: stateText.fontItalic,
        fontUnderL: stateText.fontUnderL,
        fontTypografia: stateText.fontTypografia,
        fontSize: stateText.fontSize,
        fontText: 'new text...',
        fontFocus: false,
    };
    let canvas = '';
    let context = '';
    let fontEdit = false;
    const mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: { x: 0, y: 0 },
    };
    const captura_Pos_Posprev = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const x_real = x - canvasTextDatos.left;
        const y_real = y - canvasTextDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
        text.x_ini = mouse.pos_prev.x;
        text.y_ini = mouse.pos_prev.y;
        text.x_fin = mouse.pos.x;
        text.y_fin = mouse.pos.y;
    };
    const drawText = () => {
        u_textGraficaFontEdit(context, text);
        stateText.fontColor = 'red';
    }
    // 1
    const mouseDownText = (e) => {
        console.log('1');
        mouse.click = true;
        //fontEdit = true;
        if(!text.fontFocus){
            //text.fontFocus = true;
            text.fontText = 'new text...';
            captura_Pos_Posprev(e);
        }
    };
    // 2
    const mouseMoveText = (e) => {
        //console.log('2');
    };
    // 3
    const mouseUpText = (e) => {
        if (!text.fontFocus){
            text.fontFocus = true;
            captura_Pos_Posprev(e);
            if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
                console.log('3');
                text.y_ini = text.y_ini - text.fontSize;
                text.y_fin = text.y_fin - text.fontSize;
                u_textGraficaFontEdit(context, text);
            }
        }
    };
    // 4:
    const keyDown = (e) => {
        //if (mouse.click){
        console.log(text)
        if (text.fontFocus){
            console.log(e);
            console.log(e.key);
            console.log(e.keyCode);
            let key = e.key;
            let keyCode = e.keyCode;
            switch (keyCode){
                case 8:
                    key = '';
                    text.fontText.length > 0 ? text.fontText = text.fontText.slice(0,-1): '';
                    break;
            }
            if (fontEdit) {
            //if (text.fontFocus) {
                text.fontText = key;
                fontEdit = false;
            } else {

                text.fontText = text.fontText + key;
            }
            paint();
            drawText();
        }
    }
    const canvasTextDatos = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };
    const update_canvasTextDatos = () => {
        canvasTextDatos.top = canvas.getBoundingClientRect().top;
        canvasTextDatos.left = canvas.getBoundingClientRect().left;
        canvasTextDatos.width = canvas.getBoundingClientRect().width;
        canvasTextDatos.height = canvas.getBoundingClientRect().height;
    };

    // EFECT:
    useEffect(() => {
        console.log(stateText.fontColor);
    }, [stateText.fontColor]);

    useEffect(() => {
        console.log('ue PaintText.jsx');
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        if (stateText.active) {
            update_canvasTextDatos();
            canvas.addEventListener('mousedown', mouseDownText);
            canvas.addEventListener('mousemove', mouseMoveText);
            canvas.addEventListener('mouseup', mouseUpText);
            document.addEventListener('keydown', keyDown);
        }
        return () => {
            //canvasText.removeEventListener('click', saludar);
            canvas.removeEventListener('mousedown', mouseDownText);
            canvas.removeEventListener('mousemove', mouseMoveText);
            canvas.removeEventListener('mouseup', mouseUpText);
            document.removeEventListener('keydown', keyDown);
        };
    }, [stateText]);

};

export default PaintText;