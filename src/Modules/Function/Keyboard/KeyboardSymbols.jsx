import React, {useEffect, useState} from 'react';
import {
    IconButton,
    Typography
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import potencia1 from "../../../assets/simbolos/potencia1.png";
import potencia2 from "../../../assets/simbolos/potencia2.png";
import potencia3 from "../../../assets/simbolos/potencia3.png";
import raiz1 from "../../../assets/simbolos/raiz1.png";
import raiz2 from "../../../assets/simbolos/raiz2.png";
import raiz3 from "../../../assets/simbolos/raiz3.png";
import indice from "../../../assets/simbolos/indice1.png";
import integral from "../../../assets/simbolos/integral2.png";
import log_  from "../../../assets/simbolos/log_.png";
import log  from "../../../assets/simbolos/log.png";
import x10  from "../../../assets/simbolos/x10.png";
import ex  from "../../../assets/simbolos/ex.png";


import KeyImage from "./KeyImage";
import Key from "./Key";

import './KeyboardSymbols.scss';


const KeyboardSymbols = ({setCharacter}) => {
    // STATE:
    const [pages, setPages] = useState([]); // array separado en objetos con el contenido de cada pagina.// l
    const [pag, setPag] = useState([]); // pagina que se muestra en la tabla
    const [pageMax, setPageMax] = useState(1);  // ultima pagina
    const [pageCurrent, setPageCurrent] = useState(1);  // pagina actua

    // LOGICA:
    const propsBtn = {
        fontSize: '1.2em',
        height: 30,
        width: 30,
    }
    const simbols = [
        {
            id: 0,
            type: 'key',
            array: ['+','-','×','/','÷','=','(',')','[',']','{','}']
        },
        {
            id: 1,
            type: 'key',
            array: ['±','∣∣','∆','≡','∴','≠', 'π','e', '∇', '°', '|', ':' ]
        },
        {
            id: 2,
            type: 'key',
            array: ['∀','∃','∄','∈','∉','!', '∑','lim','∂','∫','∮','∏']
        },
        {
            id: 3,
            type: 'keyImage',
            array: [
                {key: '^2', img: potencia1},
                {key: '^3', img: potencia2},
                {key: '^{n}', img: potencia3},
                {key: '√{}', img: raiz1},
                {key: '√[3]{}', img: raiz2},
                {key: '√[n]{}', img: raiz3},
                {key: '_{i}', img: indice},
                {key: '∫_{0}^{∞}xdx', img: integral},
                {key: 'log_{a}{b}', img: log_},
                {key: 'log', img: log},
                {key: '*10^{n}', img: x10},
                {key: 'e', img: ex},
            ]
        },
        {
            id: 4,
            type: 'key',
            array: ['≈', '≉', '≅', '≇', '℧', 'α', 'β', '∅', 'ϕ', '℘', '∞', '↓']
        },
        {
            id: 5,
            type: 'key',
            array: ['ℕ', 'ℤ', 'ℚ', '𝕀', 'ℝ', 'ℂ', '⇔', '⇒', '→', '←', '⇐', '⇄']
        },
        {
            id: 6,
            type: 'key',
            array: ['⊂', '⊆', '⊄', '⊈', '⊃', '⊇', '⊅', '⊉','∩', '∪', '∼']
        },
        {
            id: 7,
            type: 'key',
            array: ['>', '<', '≥', '≤', '≯', '≮', '≰', '≱', '∨', '∧', '¬']
        },
    ]
    const nroItemsXPagina = 4;
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

    const updateContainer = () => {
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

    // EFFECT:
    useEffect(() => {
        pages.length > 0 ? updateContainer() : '';
    }, [pages]);

    useEffect(() => {
        pages.length > 0 ? updateContainer() : '';
    }, [pageCurrent])

    useEffect(() => {
        paginacionUpdate(simbols);
    }, [])

    return (
        <div className='simbols'>
            <div className='simbols__container'>
                {
                    pag.map((obj) => (
                        <div className="simbols__container__flex" key={`key-${obj.id}`}>
                            {
                                (obj.type === 'key')
                                    ? obj.array.map((elm) => (<Key element={elm} variant={'outlined'} key={`key-${elm}`}
                                                               setCharacter={setCharacter} props={propsBtn}/>))
                                    : obj.array.map((elm) => (
                                    <KeyImage element={elm.key} variant={'outlined'} key={`key-${elm.key}`}
                                              setCharacter={setCharacter} Image={elm.img}/>))
                            }
                        </div>
                    ))
                }
            </div>
            <div className='simbols__pagination'>
                <IconButton color='primary' aria-label="delete" size="small" onClick={() => lefthPag()}>
                    <ChevronLeftIcon fontSize="inherit"/>
                </IconButton>
                <Typography variant='body2' color='initial'>{pageCurrent} / {pageMax}</Typography>
                <IconButton color='primary' aria-label="delete" size="small" onClick={() => rightPag()}>
                    <ChevronRightIcon fontSize="inherit"/>
                </IconButton>
            </div>
        </div>
    )
}

export default KeyboardSymbols;