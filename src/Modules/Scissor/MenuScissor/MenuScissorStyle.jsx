import {makeStyles} from "@mui/styles";

const useStylesMenuScissor  = makeStyles({
    article: {
        outline: '1px solid black',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 25px',
    },
    button: {
        marginRight: '10px',
    },
    a: {
        display: 'none',
    }
});

export default useStylesMenuScissor;