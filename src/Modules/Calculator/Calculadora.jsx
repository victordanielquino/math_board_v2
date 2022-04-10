import React, {useContext, useEffect, useRef, useState} from 'react';

import ModalUI from '../../components/ModalUI/ModalUI'
import {Box, Button, Paper, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import cero from '../../assets/imgCalculadora/0.png';
import punto from '../../assets/imgCalculadora/punto.png';
import x10 from '../../assets/imgCalculadora/x10.png';
import ans from '../../assets/imgCalculadora/ans.png';
import igual from '../../assets/imgCalculadora/=.png';
//import  from '../../assets/imgCalculadora/';
import uno from '../../assets/imgCalculadora/1.png';
import dos from '../../assets/imgCalculadora/2.png';
import tres from '../../assets/imgCalculadora/3.png';
import cuatro from '../../assets/imgCalculadora/4.png';
import cinco from '../../assets/imgCalculadora/5.png';
import seis from '../../assets/imgCalculadora/6.png';
import siete from '../../assets/imgCalculadora/7.png';
import ocho from '../../assets/imgCalculadora/8.png';
import nueve from '../../assets/imgCalculadora/9.png';
import mas from '../../assets/imgCalculadora/+.png';
import menos from '../../assets/imgCalculadora/-.png';
import por from '../../assets/imgCalculadora/x.png';
import div from '../../assets/imgCalculadora/ncr.png';
import ac from '../../assets/imgCalculadora/ac.png';
import del from '../../assets/imgCalculadora/del.png';
import eng from '../../assets/imgCalculadora/eng.png';
import rcl from '../../assets/imgCalculadora/rcl.png';
import parOpen from '../../assets/imgCalculadora/(.png';
import parClosed from '../../assets/imgCalculadora/).png';
import sd from '../../assets/imgCalculadora/s-d.png';
import mMax from '../../assets/imgCalculadora/m+.png';
import parOpenClosed from '../../assets/imgCalculadora/(-).png';
import grados from '../../assets/imgCalculadora/grado.png';
import hyp from '../../assets/imgCalculadora/hyp.png';
import sin from '../../assets/imgCalculadora/sin.png';
import cos from '../../assets/imgCalculadora/cos.png';
import tan from '../../assets/imgCalculadora/tan.png';
import frac from '../../assets/imgCalculadora/frac.png';
import raiz from '../../assets/imgCalculadora/raiz.png';
import x2 from '../../assets/imgCalculadora/x_2.png';
import xn from '../../assets/imgCalculadora/x_n.png';
import log from '../../assets/imgCalculadora/log.png';
import ln from '../../assets/imgCalculadora/ln.png';
import shift                       from '../../assets/imgCalculadora/shift.png';
import alpha                       from '../../assets/imgCalculadora/alpha.png';
import mode                        from '../../assets/imgCalculadora/mode.png';
import on                          from '../../assets/imgCalculadora/on.png';
import abs                         from '../../assets/imgCalculadora/abs.png';
import x3                          from '../../assets/imgCalculadora/x_3.png';
import x1                          from '../../assets/imgCalculadora/x_1.png';
import log_                        from '../../assets/imgCalculadora/log_x.png';
import DivMathjaxReact             from "../Function/Keyboard/KeyboardOutput/DivMathjaxReact";
import AppContextFunction          from "../../context/AppContextFunction";
import { formatInput, pressIgual } from "./CalculadoraUtils";
import {convierteDecimal_GMS}      from "../../utils/math";

const useStyles  = makeStyles({
    container: {
        //outline: '1px solid black',
        backgroundColor: 'rgba(76, 76, 138, 0.9)',
        //backgroundColor: 'rgba(218, 247, 166, 1)',

        borderRadius: '5px',
        padding: '10px 10px 5px 10px',
    },
    pantalla: {
        backgroundColor: 'rgb(211, 238, 231)',
        height: '120px',
    },
    label: {
        outline: '1px solid red'
    },
    box: {
        //outline:'1px solid white',
        display: "flex",
        justifyContent: "space-between",
        marginBottom: '7px'
    },
    btnNumber: {
        '&:hover': {
            backgroundColor: 'rgb(7, 177, 77, 0.42)'
        }
    },
    mathJaxReact: {
        backgroundColor: 'rgb(211, 238, 231)',
        color: 'black',
    },
    function: {
        //outline: '1px solid red',
        //alignContent: 'center',
        display: 'flex',
        //justifyContent: 'center',
        alignItems: "center",
        marginTop: '0 5px',
        height: '60%',
        padding: '0',
    },
});
const Calculadora = () => {
    // CONTEXT:
    const { stateFunction, h_functionSetTextPositionCursor } = useContext(AppContextFunction);
    // STATE:
    const [input, setInput] = useState('');
    const [ansValue, setAnsValue] = useState(0);
    const [btnShift, setBtnShift] = useState('');
    const [btnAlpha, setBtnAlpha] = useState('');
    const [btnGrado, setBtnGrado] = useState(false);
    // REF:
    const imgRef = useRef(null);

    // LOGICA:
    const props = {}
    const classes = useStyles(props);
    const arrayBtnsAll = [
        [
            {disabled:false, type: 't1', width: '50px', height:'30px', src: shift, value1:'S', value2:'S'},
            {disabled:false, type: 't1', width: '50px', height:'30px', src: alpha, value1:'A', value2:'A'},
            {disabled:false, type: 't3', width: '50px', height:'30px', src: '[', value1:'[', value2:'['},
            {disabled:false, type: 't3', width: '50px', height:'30px', src: ']', value1:']', value2:']'},
            {disabled:true, type: 't1', width: '50px', height:'30px', src: mode, value1:'', value2:''},
            {disabled:true, type: 't1', width: '50px', height:'30px', src: on, value1:'', value2:''},
        ],
        [
            {disabled:true, type: 't1', width: '50px', height:'30px', src: abs, value1:'', value2:''},
            {disabled:false, type: 't1', width: '50px', height:'30px', src: x3, value1:'^3', value2:''},
            {disabled:false, type: 't3', width: '50px', height:'30px', src: '{', value1:'{', value2:'{'},
            {disabled:false, type: 't3', width: '50px', height:'30px', src: '}', value1:'}', value2:'}'},
            {disabled:true, type: 't1', width: '50px', height:'30px', src: x1, value1:'', value2:''},
            {disabled:true, type: 't1', width: '50px', height:'30px', src: log_, value1:'log_(', value2:''},
        ],
        [
            {disabled:false, type: 't1', width: '50px', height:'40px', src: frac, value1:'/', value2:'/'},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: raiz, value1:'√', value2:'√[3]{'},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: x2, value1:'^2', value2:'^2'},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: xn, value1:'^(', value2:'√['},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: log, value1:'log(', value2:'10^('},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: ln, value1:'ln(', value2:'e^('},
        ],
        [
            {disabled:true, type: 't1', width: '50px', height:'40px', src: parOpenClosed, value1:'', value2:''},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: grados, value1:'g', value2:'g'},
            {disabled:true, type: 't1', width: '50px', height:'40px', src: hyp, value1:'', value2:''},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: sin, value1:'sin(', value2:'sin^(-1)('},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: cos, value1:'cos(', value2:'cos^(-1)('},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: tan, value1:'tan(', value2:'tan^(-1)('},
        ],
        [
            {disabled:true, type: 't1', width: '50px', height:'40px', src: eng, value1:'', value2:''},
            {disabled:true, type: 't1', width: '50px', height:'40px', src: rcl, value1:'', value2:''},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: parOpen, value1:'(', value2:')'},
            {disabled:false, type: 't1', width: '50px', height:'40px', src: parClosed, value1:')', value2:')'},
            {disabled:true, type: 't1', width: '50px', height:'40px', src: sd, value1:'sd', value2:''},
            {disabled:true, type: 't1', width: '50px', height:'40px', src: mMax, value1:'mMax', value2:''},
        ],
        [
            {disabled:false, type: 't1', width: '60px', height:'40px', src: siete, value1:'7', value2:'7'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: ocho, value1:'8', value2:'8'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: nueve, value1:'9', value2:'9'},
            {disabled:false, type: 't2', width: '60px', height:'40px', src: del, value1:'del', value2:'del'},
            {disabled:false, type: 't2', width: '60px', height:'40px', src: ac, value1:'ac', value2:'ac'},
        ],
        [
            {disabled:false, type: 't1', width: '60px', height:'40px', src: cuatro, value1:'4', value2:'4'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: cinco, value1:'5', value2:'5'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: seis, value1:'6', value2:'6'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: por, value1:'*', value2:'*'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: div, value1:'÷', value2:'÷'},
        ],
        [
            {disabled:false, type: 't1', width: '60px', height:'40px', src: uno, value1:'1', value2:'1'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: dos, value1:'2', value2:'2'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: tres, value1:'3', value2:'3'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: mas, value1:'+', value2:'+'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: menos, value1:'-', value2:'-'},
        ],
        [
            {disabled:false, type: 't1', width: '60px', height:'40px', src: cero, value1:'0', value2:'0'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: punto, value1:'.', value2:'.'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: x10, value1:'*10^(', value2:'π'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: ans, value1:'ans', value2:'ans'},
            {disabled:false, type: 't1', width: '60px', height:'40px', src: igual, value1:'=', value2:'='},
        ]
    ]
    const handleClick = (value1, value2) => {
        let value = value1;
        if (btnShift === 'S') {
            value = value2;
            setBtnShift('');
        }
        else if (btnAlpha === 'A') {
            value = value2;
            setBtnAlpha('');
        }
        // console.log(value);
        if (value === 'S' || value === 'A' || value === '=' || value === 'g'){
            switch (value) {
                case 'S':
                    if (btnShift === ''){
                        setBtnShift('S');
                        if (btnAlpha === 'A') setBtnAlpha('');
                    } else setBtnShift('')
                    break
                case 'A':
                    if (btnAlpha === ''){
                        setBtnAlpha('A');
                        if (btnShift === 'S') setBtnShift('');
                    } else setBtnAlpha('');
                    break;
                case '=':
                    let resp = pressIgual(input);
                    setAnsValue(resp);
                    (btnGrado) ? setBtnGrado(false):'';
                    break;
                case 'g':
                    setBtnGrado(!btnGrado);
                    break;
            }
        } else {
            let resp = formatInput(stateFunction.text, stateFunction.positionCursor, value);
            setInput(resp.txt)
            h_functionSetTextPositionCursor(resp.txt, stateFunction.positionCursor + 1 + resp.c);
            value === 'ac' ? setAnsValue(0): '';
        }
    }

    // EFFECT:
    useEffect(() => {
        if(btnGrado) {
            let r = convierteDecimal_GMS(ansValue);
            setAnsValue(r.grado +"° "+ r.minuto +"' "+ r.segundo + '"');
        } else {
            let resp = pressIgual(input);
            setAnsValue(resp);
        }
    }, [btnGrado]);

    return (
        <>
            <TextField
                label="Entrada..."
                id="outlined-size-small"
                size="small"
                fullWidth
                disabled
                value={input}
                style={{backgroundColor: 'white', margin:'0 0 5px 0'}}
            />
            <div elevation={3} className={classes.container}>
                <Box style={{ padding: '2px 10px', marginBottom:'10px'}} className={classes.pantalla}>
                    <label style={{fontSize:'0.7em', marginRight:'10px'}}>{btnShift}</label>
                    <label style={{fontSize:'0.7em'}}>{btnAlpha}</label>
                    <Box variant="outlined"  className={classes.function}>
                        <DivMathjaxReact color={'black'} background={'rgb(211, 238, 231)'} divImgRef={imgRef}/>
                    </Box>
                    <Box style={{fontSize:'1.7em', display:"flex", justifyContent:"right"}}>
                        <label style={{}}>{ansValue}</label>
                    </Box>
                </Box>
                {arrayBtnsAll.map((array, index) => (
                    <Box key={`key-arrayBtnAll-${index}`} className={classes.box}>
                        {array.map(elm => (
                            <Button
                                key={`key-${elm.src}`}
                                size='small'
                                color={(elm.type === 't1') ? 'primary': (elm.type === 't2') ? 'error': 'primary'}
                                variant='outlined'
                                style={{
                                    maxWidth: elm.width,
                                    maxHeight: elm.height,
                                    minWidth: elm.width,
                                    minHeight: elm.height,
                                    padding: 0,
                                    margin: 0,
                                    backgroundImage: (elm.type !== 't3') ? `url(${elm.src})`: "none",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100% 100%',
                                    fontSize:'1.6em',
                                    color:'white'
                                }}
                                className={classes.btnNumber}
                                onClick={() => handleClick(elm.value1, elm.value2)}
                                disabled={elm.disabled}
                            >{(elm.type === 't3') ? elm.src: ''}</Button>
                        ))}
                    </Box>
                ))}
            </div>
        </>
    )
}
export default Calculadora;