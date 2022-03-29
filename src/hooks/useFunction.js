import { useState } from 'react';

const initialStateFunction = {
    active: false,
    id: 0,
    x_ini: 0,
    y_ini: 0,
    x_fin: 0,
    y_fin: 0,
    color: 'black',
    background: 'white',
    positionCursor: 0,
    text: '',
    historiaFunction: [],

    alfabetoMay: [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKLÑ'.split(''),
        'ZXCVBNM'.split(''),
    ],
    alfabetoMin: [
        'qwertyuiop'.split(''),
        'asdfghjklñ'.split(''),
        'zxcvbnm'.split(''),
    ]
};
const useFunction = () => {
    const [stateFunction, setStateFunction] = useState(initialStateFunction);

    const s_functionToLower = () => {
        const auxArray = state.alfabetoMin;
        stateFunction({
            ...stateFunction,
            alfabeto: auxArray,
        });
    };

    const s_functionToUpper = () => {
        const auxArray = state.alfabetoMay;
        stateFunction({
            ...stateFunction,
            alfabeto: auxArray,
        });
    };

    const s_functionSetActive = (valor) => {
        setStateFunction({
            ...stateFunction,
            active: valor,
        })
    };
    const s_functionAddHId = (functions, id) => {
        setStateFunction({
            ...stateFunction,
            id: id,
            historiaFunction: [...stateFunction.historiaFunction, functions],
        });
    };
    const h_functionSetH = (newHistoria) => {
        setStateFunction({
            ...stateFunction,
            historiaFunction: newHistoria,
        });
    };
    const h_functionSetPositionCursor = (position) => {
        setStateFunction({
            ...stateFunction,
            positionCursor: position
        })
    };
    const h_functionSetText = (text) => {
        setStateFunction({
            ...stateFunction,
            text: text,
        })
    }
    const h_functionSetCharPositionCursor = (char, positionCursor) => {
        setStateFunction({
            ...stateFunction,
            text: stateFunction.text + char,
            positionCursor: positionCursor
        })
    }
    const h_functionSetTextPositionCursor = (text, positionCursor) => {
        setStateFunction({
            ...stateFunction,
            text: text,
            positionCursor: positionCursor
        })
    }
    const h_functionSetColor = (color) => {
        setStateFunction({
            ...stateFunction,
            color: color,
        })
    }
    const h_functionSetBackground = (background) => {
        setStateFunction({
            ...stateFunction,
            background: background,
        })
    }
    return {
        stateFunction,
        s_functionToLower,
        s_functionToUpper,
        s_functionSetActive,
        s_functionAddHId,
        h_functionSetH,
        h_functionSetPositionCursor,
        h_functionSetText,
        h_functionSetCharPositionCursor,
        h_functionSetTextPositionCursor,
        h_functionSetColor,
        h_functionSetBackground
    }
}
export default useFunction;