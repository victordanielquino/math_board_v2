import {makeStyles} from "@mui/styles";

const useStylesMenuReadJson  = makeStyles({
    article: {
        //outline: '1px solid black',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: '5px 25px',
    },
    button: {
        marginRight: '10px',
    },
    a: {
        display: 'none',
    },
    inputFile: {
        display: 'none',
    }
});

export default useStylesMenuReadJson;