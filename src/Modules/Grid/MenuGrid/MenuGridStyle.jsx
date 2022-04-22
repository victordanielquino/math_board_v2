import {makeStyles} from "@mui/styles";

const useStylesMenuGrid  = makeStyles({
    article: {
        outline: '1px solid black',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: '5px 25px',
        marginRight: '20px',
    },
    button: {
        marginRight: '10px',
    },
    a: {
        display: 'none',
    }
});

export default useStylesMenuGrid;