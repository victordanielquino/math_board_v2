import React                   from 'react';
import {TextField, Typography}   from "@mui/material";
import useStylesEcuacionCanonica from "./EcuacionCanonicaStyle";

const EcuacionCanonica = ({
                              par = {h:0, k:0, eje:'x', p:1},
                              foco= {x:0, y:0},
                              directriz = {x:0, y:0}
}) => {
    // LOGICA:
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStylesEcuacionCanonica(props);
    const onchangeTF1 = (e, componente) => {
        let value = parseFloat(e.target.value);
        switch (componente) {
            case 'h':
                par.h = value;
                break;
            case 'k':
                par.k = value;
                break;
            case 'p':
                par.p = value;
                break;
        }
        if (par.eje === 'x') {
            if (par.p > 0) {
                foco.x = par.h + par.p;
                foco.y = par.k;
                directriz.x = par.h - par.p;
                directriz.y = par.k;
            } else {
                if (par.p < 0) {
                    foco.x = par.h + par.p;
                    foco.y = par.k;
                    directriz.x = par.h - par.p;
                    directriz.y = par.k;
                }
            }
        } else {
            if (par.eje === 'y') {
                if (par.p > 0) {
                    foco.x = par.h;
                    foco.y = par.k + par.p;
                    directriz.x = par.h;
                    directriz.y = par.k - par.p;
                } else {
                    if (par.p < 0) {
                        foco.x = par.h;
                        foco.y = par.k + par.p;
                        directriz.x = par.h;
                        directriz.y = par.k - par.p;
                    }
                }
            }
        }
    }
    return (
        <article className={classes.containedPto}>
            <Typography color='primary' style={{margin:0, padding:0}}>
                ( {par.eje === 'x' ? 'Y' : 'X'} +
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={par.eje === 'x' ? par.k : par.h}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, par.eje === 'x' ? 'k': 'h')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                ) 2 = 4 *
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={par.p}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, 'p')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                ( {par.eje === 'x' ? 'X' : 'Y'} +
            </Typography>
            <TextField
                id="outlined-size-small"
                defaultValue={par.eje === 'x' ? par.h : par.k}
                size="small"
                style={{width:'60px', height:'22px', fontSize:'1em', margin:'0 5px', padding:0}}
                inputProps={{style:{margin:'0 10px 0 0', padding:0, textAlign:'right'}}}
                onChange={(e) => onchangeTF1(e, par.eje === 'x' ? 'h': 'k')}
                type='number'
            />
            <Typography color='primary' style={{margin:0, padding:0}}>
                )
            </Typography>
        </article>
    )
}

export default EcuacionCanonica;