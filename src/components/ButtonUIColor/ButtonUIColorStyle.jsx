import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    btnOutlined: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: props => props.color,
        color: 'white',
        padding: '0',
        outline: '1px solid black',
        marginRight: '5px',
    },
    btnContained: {
        background: props => props.background,
        border: 0,
        borderRadius: 3,
        color: 'white',
        padding: '0',
        outline: '1px solid black',
        marginRight: '5px',
    }
});


export default useStyles;