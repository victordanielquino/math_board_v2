import React                     from 'react';
import useStylesEcuacionCanonica from './EcuacionCanonicaStyle';
import {TextField, Typography}   from "@mui/material";

const EcuacionCanonica = ({p = {a:1, b:1}}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesEcuacionCanonica(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        componente === 'a' ? p.a = value : p.b = value;
    }

    return (
        <article className={classes.containedPto}>
            <div className={classes.divFraction}>
                <Typography color='primary' style={{margin:0, padding:0}}>
                    X
                </Typography>
                <TextField
                    id="outlined-size-small"
                    defaultValue={p.a}
                    size="small"
                    style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                    inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                    onChange={(e) => onchangeTF1(e, 'a')}
                    type='number'
                />
            </div>
            <Typography color='primary' style={{margin:0, padding:0}}>
                +
            </Typography>
            <div className={classes.divFraction}>
                <Typography color='primary' style={{margin:0, padding:0}}>
                    Y
                </Typography>
                <TextField
                    id="outlined-size-small"
                    defaultValue={p.b}
                    size="small"
                    style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                    inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                    onChange={(e) => onchangeTF1(e, 'b')}
                    type='number'
                />
            </div>
            <Typography color='primary' style={{margin:0, padding:0}}>
                = 1
            </Typography>
        </article>
    )
}

export default EcuacionCanonica;