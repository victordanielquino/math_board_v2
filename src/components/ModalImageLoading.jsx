import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles  = makeStyles({
    container: {
        //outline: '1px solid blue',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
        // justifyContent: "space-between"
    },
});

const ModalImageLoading = () => {
    const props = {
        /*fontSize: '1em',
        height: 30,
        width: 30,*/
    }
    const classes = useStyles(props);
    return (
        <div className={classes.container}>
            <h3 className='loader__title'>loadding...</h3>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
}
export default ModalImageLoading;