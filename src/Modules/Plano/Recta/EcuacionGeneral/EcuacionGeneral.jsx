import React                     from 'react';
import {TextField, Typography}  from "@mui/material";
import useStylesEcuacionGeneral from "./EcuacionGeneralStyle";

const EcuacionGeneral = ({rec = {a:1, b:1, c:1}}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesEcuacionGeneral(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        componente === 'a' ? rec.a = value : componente === 'b' ? rec.b = value : rec.c = value;
    }
    return (
        <article className={classes.containedPto}>
            <TextField
                id="outlined-size-small"
                defaultValue={rec.a}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'a')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                X +
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={rec.b}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'b')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                Y +
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={rec.c}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'c')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                = 0
            </Typography>
        </article>
    )
}

export default EcuacionGeneral;