import React              from 'react';
import ButtonUIColorStyle from "./ButtonUIColorStyle";
import {Button}           from "@mui/material";

const ButtonUIColor = ({color, variant, border, onclick, elm = null}) => {
    const props1 = {
        size:'small',
    }
    const props = {
        border: border,
        color: 'red',
    }
    switch (color) {
        case 'red':
            props.color = 'inset 0 0 5px 2px rgba(225, 0, 0, 1)';
            props.background = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
            break;
        case 'black':
            props.color = 'inset 0 0 5px 2px rgba(0, 0, 0, 1)';
            props.background = 'linear-gradient(45deg, #212121 30%, #bdbdbd 90%)';
            break;
        case 'blue':
            props.color = 'inset 0 0 5px 2px rgba(30, 144, 255, 1)';
            props.background = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
            break;
        case 'green':
            props.color = 'inset 0 0 5px 2px rgba(0, 199, 43, 1)';
            props.background = 'linear-gradient(45deg, #00c853 30%, #69f0ae 90%)';
            break;
        case 'yellow':
            props.color = 'inset 0 0 5px 2px rgba(255, 215, 0, 1)';
            props.background = 'linear-gradient(45deg, #ffeb3b 30%, #fff59d 90%)';
            break;
        case 'white':
            props.color = 'inset 0 0 5px 2px rgba(255, 255, 255, 1)';
            props.background = 'linear-gradient(45deg, #a7ffeb 30%, #18ffff 90%)';
            break;
    }

    const classes = ButtonUIColorStyle(props);
    return (
        <>
            <Button
                size={props1.size}
                className={variant === 'outlined' ? classes.btnOutlined : classes.btnContained}
                style={{maxWidth: '24px', maxHeight: '24px', minWidth: '24px', minHeight: '24px', outline:'1px solid black', marginRight:'5px'}}
                onClick={() => onclick(color)}
            >
                {elm}
            </Button>
        </>
    )
}

export default ButtonUIColor;