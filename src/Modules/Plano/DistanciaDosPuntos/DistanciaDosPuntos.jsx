import React                          from 'react';
import {TextField, Typography}     from "@mui/material";
import useStylesDistanciaDosPuntos from "./DistanciaDosPuntosStyle";

const DistanciaDosPuntos = ({p1 = {x:0, y:0}, p2 = {x:0, y:0}}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesDistanciaDosPuntos(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        componente === 'x' ? p1.x = value : p1.y = value;
    }
    const onchangeTF2 = (e, componente) => {
        let value = parseFloat(e.target.value);
        componente === 'x' ? p2.x = value : p2.y = value;
    }
    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                P1 (X:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p1.x}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'x')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                , Y
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p1.y}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'y')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                ); P2 (X:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p2.x}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF2(e, 'x')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                , Y
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p2.y}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF2(e, 'y')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                )
            </Typography>
        </article>
    )
}

export default DistanciaDosPuntos;