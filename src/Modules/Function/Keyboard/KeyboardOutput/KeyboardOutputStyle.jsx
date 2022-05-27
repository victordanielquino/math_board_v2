import {makeStyles} from "@mui/styles";

const useStylesKeyboardOutput  = makeStyles({
    container: {
        //outline: '1px solid blue',
        display: "flex",
        flexDirection: 'column',
        height: '100%',
        width:'100%',
    },
    editButton : {
        height: props => props.height,
        width: props => props.width,
        padding: 0,
        //marginLeft: '5px'
    },
    icon: {
        outline: '1px solid red',
        marginRight: '10px',
    },
    editInput : {
        height: 30,
        //width: 100,
    },
    header: {
        display: "flex",
        justifyContent: 'space-between'
    },
    function: {
        // outline: '1px solid green',
        //alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: '0.5em',
        height: '100px',
        padding: '0',
        width: '100%',
    },
    Inputprops: {
        fontSize: '2em',
        letterSpacing: '1em',
        wordSpacing: '1em',
    },
    ImageProps: {
        width: 100,
    },
    paper: {
        //height: 100,
        padding: '0px',
        display: 'flex',
        width: '400px',
        height: '250px'
    },
    paper2: {
        //height: 100,
        background:'red',
        padding: '0px',
        display: 'flex',
        width: '400px',
        height: '250px'
    },
    imageContainer: {
        // outline: '1px solid green',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
        height: '100px'
    },
    image: {
        // outline: '1px solid red',
        maxWidth: '380px',
        maxHeight: '230px',
        margin: '0px'
    },
    errorMessage: {
        // outline: '1px solid red',
        fontSize: '1em',
        color: 'red',
        marginBottom: '10px',
    },
});

export default useStylesKeyboardOutput;