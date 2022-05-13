import React                    from 'react';
import {TextField, Typography} from "@mui/material";
import useStylesPuntoPendiente from "./PuntoPendienteStyle";

const PuntoPendiente = ({p={x:1, y:1}, m = {num:1, den:1}}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesPuntoPendiente(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        switch (componente) {
            case 'x':
                p.x = value;
                break;
            case 'y':
                p.y = value;
                break;
            case 'num':
                m.num = value;
                break;
            case 'den':
                m.den = value;
                break;
            default:
                break;
        }
    }
    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                ( Y -
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p.y}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'y')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
               ) =
            </Typography>
            <div className={classes.divFraction}>
                <TextField
                    id="outlined-size-small"
                    defaultValue={m.num}
                    size="small"
                    style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                    inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                    onChange={(e) => onchangeTF1(e, 'num')}
                    type='number'
                />
                <TextField
                    id="outlined-size-small"
                    defaultValue={m.den}
                    size="small"
                    style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                    inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                    onChange={(e) => onchangeTF1(e, 'den')}
                    type='number'
                />
            </div>
            <Typography color='primary' style={{margin:0, padding:0}}>
                ( X -
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={p.x}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'x')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                )
            </Typography>
        </article>
    )
}

export default PuntoPendiente;