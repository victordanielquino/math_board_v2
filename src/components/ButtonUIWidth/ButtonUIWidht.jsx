import React              from 'react';
import {Button}           from "@mui/material";

const ButtonUIWidth = ({color, variant, width, onclick}) => {
    // LOGICA:
    const widthBtn = '35px';
    const heightBtn = '28px';
    const widthSvg = '24';
    const heightSvg = '20';
    const line = {
        x : '1',
        y : '5',
        widthLine : '22',
        heightLine : '10'
    }
    switch (width) {
        case '1':
            line.x = '1'; line.y = '9'; line.widthLine = '22'; line.heightLine = '2';
            break;
        case '2':
            line.x = '1'; line.y = '8'; line.widthLine = '22'; line.heightLine = '4';
            break;
        case '4':
            line.x = '1'; line.y = '7'; line.widthLine = '22'; line.heightLine = '6';
            break;
        case '6':
            line.x = '1'; line.y = '6'; line.widthLine = '22'; line.heightLine = '8';
            break;
        case '10':
            line.x = '1'; line.y = '5'; line.widthLine = '22'; line.heightLine = '10';
            break;
    }

    return (
        <>
            <Button
                size='small'
                variant={variant}
                style={{maxWidth: widthBtn, maxHeight: heightBtn, minWidth: widthBtn, minHeight: heightBtn, padding:0}}
                onClick={() => onclick(width)}
            >
                <svg width={widthSvg} height={heightSvg} style={{}}>
                    <rect x={line.x} y={line.y} width={line.widthLine} height={line.heightLine} style={{fill:color}}/>
                </svg>
            </Button>
        </>
    )
}

export default ButtonUIWidth;