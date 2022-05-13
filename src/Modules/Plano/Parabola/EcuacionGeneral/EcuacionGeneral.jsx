import React                     from 'react';
import {TextField, Typography}   from "@mui/material";
import useStylesEcuacionGeneral  from './EcuacionGeneralStyle';

const EcuacionGeneral = ({ecuParabola = {a:1, b:1, c:1, d:1}, eje = 'x'}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesEcuacionGeneral(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        switch (componente) {
            case 'a':
                ecuParabola.a = value;
                break;
            case 'b':
                ecuParabola.b = value;
                break;
            case 'c':
                ecuParabola.c = value;
                break;
            case 'd':
                ecuParabola.d = value;
                break;
        }
    }
    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                A:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={1}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'a')}
                type='number'
                disabled
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                {eje === 'x' ? 'Y' : 'X'}^2 + B:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={ecuParabola.b}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'b')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                {eje === 'x' ? 'Y' : 'X'} + C:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={ecuParabola.c}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'c')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                {eje === 'x' ? 'X' : 'Y'} + D:
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={ecuParabola.d}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'd')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                = 0
            </Typography>
        </article>
    )
}

export default EcuacionGeneral;