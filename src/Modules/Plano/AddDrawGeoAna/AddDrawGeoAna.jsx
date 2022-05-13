import React, {useContext, useEffect, useState}            from 'react';
import {Button, FormControl, MenuItem, Select, Typography} from "@mui/material";
import useStylesAddDrawGeoAna                              from "./AddDrawGeoAnaStyle";
import AddIcon                                             from '@mui/icons-material/Add';
import TableScrollMUI                                      from "../TableScrollMUI/TableScrollMUI";
import AppContextMover                                     from "../../../context/AppContextMover";
import PaletaColor                                         from "../../../components/PaletaColor/PaletaColorSinTitle";
import AppContext                                          from "../../../context/AppContext";
import {getElmPosition}                                    from "../../../utils/arrays";

const AddDrawGeoAna = () => {
    // CONTEXT:
    const { state } = useContext(AppContext);
    const { stateMover } = useContext(AppContextMover);

    // STATE:
    const [selectGA, setSelectGA] = useState('PUNTO');
    const [rowsTable, setRowsTable] = useState(stateMover.obj.drawGA);

    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesAddDrawGeoAna(props);
    const drawGeoAna = [
        'PUNTO',
        'DISTANCIA ENTRE 2 PUNTOS',
        'RECTA: QUE PASA POR 2 PUNTOS',
        'RECTA: ECUACION CANONICA',
        'RECTA: ECUACION GENERAL',
        'RECTA: PUNTO PENDIENTE',
        'CIRCUNFERENCIA: CENTRO, RADIO',
        'PARABOLA: ECUACION CANONICA EJE X',
        'PARABOLA: ECUACION CANONICA EJE Y',
        'PARABOLA: ECUACION GENERAL EJE X',
        'PARABOLA: ECUACION GENERAL EJE Y',
    ];
    const drawGeoAnaType = ['punto', 'distancia', 'recC1','recC2', 'recC3', 'recC4', 'cirC1', 'parC1', 'parC2', 'parC3', 'parC4'];

    const handleChangeMathboard = (event) => {
        setSelectGA(event.target.value);
    };
    const handleAdd = () => {
        let index = getElmPosition(drawGeoAna, selectGA);
        let type = drawGeoAnaType[index];
        let elm = {};
        switch (selectGA) {
            case 'PUNTO':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'PUNTO',
                    type: type,
                    p: {
                        x: 1,
                        y: 1,
                    },
                    cuadrante: 0,
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'DISTANCIA ENTRE 2 PUNTOS':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'DISTANCIA ENTRE 2 PUNTOS',
                    type: type,
                    p1: {
                        x: -2,
                        y: 2,
                    },
                    p2: {
                        x: 3,
                        y: -2,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'RECTA: QUE PASA POR 2 PUNTOS':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'RECTA: QUE PASA POR 2 PUNTOS',
                    type: type,
                    p1: {
                        x: -2,
                        y: 2,
                    },
                    p2: {
                        x: 3,
                        y: -2,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'RECTA: ECUACION CANONICA':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'RECTA: ECUACION CANONICA',
                    type: type,
                    p: {
                        a: 2,
                        b: 2
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'RECTA: ECUACION GENERAL':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'RECTA: ECUACION GENERAL',
                    type: type,
                    rec: {
                        a: 1,
                        b: 1,
                        c: 1,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'RECTA: PUNTO PENDIENTE':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title:'RECTA: PUNTO PENDIENTE',
                    type: type,
                    p: {
                        x: 2,
                        y: -1,
                    },
                    m: {
                        num: -2,
                        den: 5,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'CIRCUNFERENCIA: CENTRO, RADIO':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title:'CIRCUNFERENCIA: CENTRO, RADIO',
                    type: type,
                    cir: {
                        h: 2,
                        k: -1,
                        r: 1,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'PARABOLA: ECUACION CANONICA EJE X':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'PARABOLA: ECUACION CANONICA EJE X',
                    type: type,
                    par: {
                        h: 0,
                        k: 0,
                        eje: 'x',
                        p: 1,
                    },
                    foco: {
                        x: 1,
                        y: 0,
                    },
                    directriz: {
                        x:-1,
                        y:0,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'PARABOLA: ECUACION CANONICA EJE Y':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'PARABOLA: ECUACION CANONICA EJE Y',
                    type: type,
                    par: {
                        h: 0,
                        k: 0,
                        eje: 'y',
                        p: 1,
                    },
                    foco: {
                        x: 0,
                        y: 1,
                    },
                    directriz: {
                        x:0,
                        y:-1,
                    },
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'PARABOLA: ECUACION GENERAL EJE X':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'PARABOLA: ECUACION GENERAL EJE X',
                    type: type,
                    ecuParabola: {
                        a: 1,
                        b: -2,
                        c: -4,
                        d: 5,
                    },
                    eje: 'x',
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            case 'PARABOLA: ECUACION GENERAL EJE Y':
                elm = {
                    id: stateMover.obj.drawGA.length === 0 ? 0: stateMover.obj.drawGA[stateMover.obj.drawGA.length - 1].id + 1,
                    title: 'PARABOLA: ECUACION GENERAL EJE Y',
                    type: type,
                    ecuParabola: {
                        a: 1,
                        b: -6,
                        c: -8,
                        d: -7,
                    },
                    eje: 'y',
                    color:state.color,
                }
                setRowsTable([...rowsTable, elm]);
                break;
            default:
                console.log('nada...');
                break;
        }
    }
    const handleDelete = (elmDelete) => {
        let copy = [...rowsTable];
        let arrayNew = [];
        copy.forEach((elm) => elm.id !== elmDelete.id ? arrayNew.push(elm):'');
        setRowsTable(arrayNew);
    }

    // EFFECT:
    useEffect(() => {
        stateMover.obj.drawGA = rowsTable;
    }, [rowsTable]);

    return (
        <>
            <article className={classes.article}>
                <Typography color={'primary'} style={{marginRight:'5px', userSelect:'none', fontSize:'0.9em'}}>
                    TIPO DE GRAFICO:
                </Typography>
                <FormControl sx={{ m: 0, minWidth: 350 }} size='small' color='primary'>
                    {
                        <Select
                            value={selectGA}
                            onChange={handleChangeMathboard}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size='small'
                            id="demo-simple-select-error"
                            style={{ height: '2em', color:'#1976d2'}}
                            //color='primary'
                        >
                            {drawGeoAna.map(elm => (<MenuItem key={elm} value={elm} style={{color:'#1976d2'}}>{elm}</MenuItem>))}
                        </Select>
                    }
                </FormControl>
                <div style={{marginLeft:'10px'}}><PaletaColor tipo="linea" boolSwitch={false} boolWhite={false}/></div>
                <Button
                    variant='contained'
                    onClick={() => handleAdd()}
                    size='small'
                    startIcon={<AddIcon/>}
                    style={{marginLeft:'15px'}}
                >
                    AGREGAR
                </Button>
            </article>
            <TableScrollMUI rows={rowsTable} onclick={handleDelete}/>
        </>
    )
}

export default AddDrawGeoAna;