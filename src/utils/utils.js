// OBJETO VACIO: Return true si esta vacio y false si no;
export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}
// CONVIERT COLOTO TO RGBA
export const u_convertColorToRGBA = (color, colorBlur) => {
    let rgba = '';
    switch (color) {
        case 'black':
            colorBlur ? rgba = 'rgba(0, 0, 0, 0.2)' : rgba = 'rgba(0, 0, 0, 1)';
            break;
        case 'red':
            colorBlur ? rgba = 'rgba(255, 0, 0, 0.2)' : rgba = 'rgba(255, 0, 0, 1)';
            break;
        case 'green':
            colorBlur ? rgba = 'rgba(0, 255, 0, 0.2)' : rgba = 'rgba(0, 255, 0, 1)';
            break;
        case 'blue':
            colorBlur ? rgba = 'rgba(0, 0, 255, 0.2)' : rgba = 'rgba(0, 0, 255, 1)';
            break;
        case 'yellow':
            colorBlur ? rgba = 'rgba(255, 255, 0, 0.2)' : rgba = 'rgba(255, 255, 0, 1)';
            break;
        case 'white':
            colorBlur ? rgba = 'rgba(255, 255, 255, 0.2)' : rgba = 'rgba(255, 255, 255, 1)';
            break;
        default:
            rgba = 'rgba(0, 0, 0, 1)';
            break;
    }
    return rgba;
}