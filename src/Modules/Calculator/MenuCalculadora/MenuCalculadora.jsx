import React, {useContext, useEffect, useState} from 'react';
import {Button, Typography}                     from "@mui/material";
import {makeStyles}                             from "@mui/styles";
import CalculateIcon                            from '@mui/icons-material/Calculate';
import ModalUI                                  from '../../../components/ModalUI/ModalUI';
import Calculadora                              from '../Calculadora';

const useStyles  = makeStyles({
    container: {
        //outline: '1px solid black'
        background: 'white',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px'
    },
});
const MenuCalculadora = () => {
    // STATE:
    const [open, setOpen] = useState(false)

    // LOGICA:
    const props = {}
    const classes = useStyles(props);

    return (
        <>
            <div className={classes.container}>
                <Typography  variant='h7' color='primary' style={{ padding: '0 10px'}}>
                    Calculadora:
                </Typography>
                <Button
                    variant='outlined'
                    startIcon={<CalculateIcon/>}
                    style={{marginRight: '10px'}}
                    onClick={() => setOpen(true)}
                    size='small'
                >Open</Button>
            </div>
            <ModalUI open={open} setOpen={setOpen} title='Calculadora' booleanFooter={false}>
                <Calculadora/>
            </ModalUI>
        </>
    );
};

export default MenuCalculadora;