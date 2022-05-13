import React                   from 'react';
import {TextField, Typography} from "@mui/material";
import useStylesPunto  from "./PuntoStyle";

const Punto = ({p = {x:0, y:0}}) => {
    // STATE:

    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesPunto(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        componente === 'x' ? p.x = value : p.y = value;
    }

    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                P (X:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p.x}
                size="small"
                style={{width:'50px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'x')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                , Y
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p.y}
                size="small"
                style={{width:'50px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'y')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                )
            </Typography>
        </article>
    )
}

export default Punto;