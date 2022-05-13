import React                       from 'react';
import {TextField, Typography} from "@mui/material";
import useStylesCircunferencia from "./CircunferenciaStyle";

const Circunferencia = ({cir= {h:0, k:0, r:1}}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesCircunferencia(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        switch (componente) {
            case 'h':
                cir.h = value;
                break;
            case 'k':
                cir.k = value;
                break;
            case 'r':
                cir.r = value;
                break;
        }
    }

    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                Centro ( h :
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={cir.h}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'h')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                , k :
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={cir.k}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'k')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                ); Radio ( r :
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={cir.r}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'r')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                )
            </Typography>
        </article>
    )
}

export default Circunferencia;