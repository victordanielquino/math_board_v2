import React, {useContext, useEffect, useState} from 'react';
import { MathComponent } from "mathjax-react";
import AppContextFunction from "../../../../context/AppContextFunction";
import {makeStyles} from "@mui/styles";

const useStyles  = makeStyles(theme => ({
    container: {
        //outline: '1px solid red',
        padding: '0 5px',
        //margin: '10px 5px',
        background: props => props.background,
        color: props => props.color,
    },
}));

const DivMathjaxReact = ({color, background, divImgRef}) => {
    // ejemplos: https://codesandbox.io/s/bq3k1?file=/src/App.js:393-445

    // CONTEXT:
    const { stateFunction } = useContext(AppContextFunction);

    // STATE:
    const [tex, setTex] = useState('');

    // LOGICA:
    const props = {
        fontSize: '2.2em',
        color: color,
        background: background,
    }
    const classes = useStyles(props);
    const buscaFraccion = (array, indices) => {
        let arrayNew = [];
        let k = indices;
        let k_ini = -1;
        let k_fin = -1;
        if (k >= 2) {
            let booleanLefth = false;
            let keyOpen = 0;
            let keyBreak = 0;
            for (let j = k - 2 ; j >= 0 && !booleanLefth ; j--){
                let aux = array[j];
                if (aux === '{') {
                    if (keyOpen === keyBreak){
                        booleanLefth = true;
                        k_ini = j;
                    } else keyOpen++;
                } else {
                    if (aux === '}') keyBreak++;
                }
            }
            let booleanRight = false;
            keyOpen = 0;
            keyBreak = 0;
            for (let j = k + 2 ; j < array.length && !booleanRight && booleanLefth ; j++){
                let aux = array[j];
                if (aux === '}') {
                    if (keyOpen === keyBreak){
                        booleanRight = true;
                        k_fin = j;
                    } else keyBreak++;
                } else {
                    if (aux === '{') keyOpen++;
                }
            }
            if (booleanRight && booleanLefth) {
                let arrayLefth = array.slice(k_ini, k);
                let arrayRight = array.slice(k + 1, k_fin + 1);
                let arrayRes = arrayLefth.concat(arrayRight);
                arrayRes.unshift('\\frac');
                (k_fin < array.length -1) ? arrayRight = array.slice(k_fin + 1, array.length): arrayRight = [];
                (k_ini > 0) ? arrayLefth = array.slice(0, k_ini): arrayLefth = [];
                arrayNew = arrayNew.concat(arrayLefth);
                arrayNew = arrayNew.concat(arrayRes);
                arrayNew = arrayNew.concat(arrayRight);
            }
        } else {
            arrayNew = array;
        }
        return arrayNew;
    }
    const buscaSumatoria = (array, indices) => {
        let arrayNew = array;
        if (array[indices + 1] !== '_' && array[indices + 1] !== '^'){
            arrayNew[indices] = '\\sum\\ ';
        } else {
            arrayNew[indices] = '\\sum';
        }
        return arrayNew;
    }
    const changeErrorSuccess = () => {
        //console.log('ok');
    }
    const updateDiv = () => {
        if (stateFunction.text.length > 0) {
            let array = Array.from(stateFunction.text);
            // PARENTESIS:
            let idx = array.indexOf('(');
            while (idx !== -1) {
                array[idx] = ' \\left( ';
                idx = array.indexOf('(', idx + 1);
            }
            idx = array.indexOf(')');
            while (idx !== -1) {
                array[idx] = ' \\right) ';
                idx = array.indexOf(')', idx + 1);
            }
            // CORCHETES:
            /*idx = array.indexOf('[');
            while (idx !== -1) {
                array[idx] = ' \\left[ ';
                idx = array.indexOf('[', idx + 1);
            }
            idx = array.indexOf(']');
            while (idx !== -1) {
                array[idx] = ' \\right] ';
                idx = array.indexOf(']', idx + 1);
            }*/
            // FRACCION:
            idx = array.indexOf('/');
            while (idx !== -1) {
                array = buscaFraccion(array, idx);
                idx = array.indexOf('/', idx + 1);
            }
            // DIVISION:
            idx = array.indexOf('÷');
            while (idx !== -1) {
                array[idx] = '\\div';
                idx = array.indexOf('÷', idx + 1);
            }
            // ±:
            idx = array.indexOf('±');
            while (idx !== -1) {
                array[idx] = ' \\pm ';
                idx = array.indexOf('±', idx + 1);
            }
            // RAIZ:
            idx = array.indexOf('√');
            while (idx !== -1) {
                array[idx] = '\\sqrt';
                idx = array.indexOf('√', idx + 1);
            }
            // SUMATORIA:
            idx = array.indexOf('∑');
            while (idx !== -1) {
                array = buscaSumatoria(array, idx);
                idx = array.indexOf('∑', idx);
            }
            // LIMITE:
            idx = array.indexOf('l');
            while (idx !== -1) {
                if (array[idx] === 'l' && array[idx + 1] === 'i' && array[idx + 2] === 'm'){
                    array[idx] = '\\l';
                    if (array[idx + 3] !== '_') array[idx + 2] = 'm\\ '
                }
                idx = array.indexOf('l', idx + 2);
            }
            // DERIVADA:
            idx = array.indexOf('∂');
            while (idx !== -1) {
                array[idx] = '\\partial\\ ';
                idx = array.indexOf('∂', idx);
            }
            // INTEGRAL:
            idx = array.indexOf('∫');
            while (idx !== -1) {
                array[idx] = '\\int ';
                idx = array.indexOf('∫', idx);
            }
            let aux = array.join('');
            setTex(aux)
        } else setTex('')
    }

    // EFFECT:
    useEffect(() => {
        updateDiv();
    }, [stateFunction.text]);

    return (
        <div>
            <div className={classes.container} ref={divImgRef}>
                {/*<MathComponent
                tex={String.raw`\sum_0^1 x^2\ dx \frac{1}{2} \sqrt[4]{\frac{n}{n+1}} \div(a)+(b) ±`}
                onError={(e) => console.log('error', e)}
                onSuccess={() => console.log('ok')}
            />*/}
                <MathComponent
                    tex={tex}
                    onError={(e) => changeErrorSuccess('red', e)}
                    onSuccess={() => changeErrorSuccess()}

                />
            </div>
        </div>
    )
}

export default DivMathjaxReact;