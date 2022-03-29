import axios from "axios";
// METODO CANVAS: Convierte una imagen en un array de atos
const u_getImageData = (context, imagen) => {
    return context.getImageData(imagen.x_ini, imagen.y_ini, imagen.x_fin - imagen.x_ini, imagen.y_fin - imagen.y_ini);
}
// METODO CANVAS: Grafica bytes
const u_putImageData = (context, imagen) => {
    //context.putImageData(imagen.dataImagen, 500, 100);//(data, x_ini, y_ini, width, height)
    //context.putImageData(imagen.dataImagen, 500,100, 0, 0, 400, 400);//(data, x_ini, y_ini, width, height)
    context.putImageData(imagen.dataImagen, imagen.x_ini, imagen.y_ini);//(data, x_ini, y_ini, width, height)
}
const u_imagenGraficaSinPromesa = (context, objImagen) => {
    if (objImagen.visible){
        let imagen = new Image();
        imagen.src = objImagen.fileSrc;
        imagen.addEventListener('load', () => {
            context.drawImage(imagen, objImagen.x_ini, objImagen.y_ini, objImagen.x_fin - objImagen.x_ini, objImagen.y_fin - objImagen.y_ini);
            console.log('hola....');
        });
    }
};
const drawImageGoogle = (context, objImagen) => {
    let newPromise = '';
    let imagen = new Image();
    imagen.crossOrigin = "Anonymous";
    imagen.src = objImagen.fileSrc;
    //imagen.setAttribute('crossOrigin', '');
    newPromise = new Promise((aceptado, rechazado) => {
        imagen.addEventListener('load', () => {
            (imagen.src === '') ? rechazado(new Error('drawImageGoogle: no se pudo modificar!!!')): '';
            aceptado(
                context.drawImage(imagen, objImagen.x_ini, objImagen.y_ini, objImagen.x_fin - objImagen.x_ini, objImagen.y_fin - objImagen.y_ini),
                objImagen.dataImagen = u_getImageData(context, objImagen),
                objImagen.dataUse = true,
            )
        })
    });
    return newPromise;
}
const drawImageData = (context, imagen) => {
    let newPromise = '';
    newPromise = new Promise((aceptado, rechazado) => {
        aceptado(u_putImageData(context, imagen))
    });
    return newPromise;
}
const u_imagenGrafica = (context, objImagen) => {
    let newPromise = '';
    if (objImagen.visible){
        (objImagen.dataUse)
            ? newPromise = drawImageData(context, objImagen)
            : newPromise = drawImageGoogle(context, objImagen);
    }
    return newPromise;
};
const u_convertImageBase64 = async(url)=>{
    console.log('getBase64')
    let data = {
        data: '',
        base64: '',
    }
    try {
        let image = await axios.get(url, { responseType: 'arraybuffer' });
        let raw = Buffer.from(image.data).toString('base64');
        data.data = image.headers['content-type'];
        data.base64 = raw;
        console.log('data:',data)
        return data;
    } catch (error) {
        console.log(error)
    }
}
// var image = new Image()
// image.src=getBase64(url)

const u_imagenGraficaH = async (context, array) => {
    let resp = '';
    await array.map( imagen => resp = u_imagenGrafica(context, imagen));
    return resp;
}
// IMAGEN: GET
const u_imagenGetClick = (array, x, y) => {
    let resp = '';
    array.forEach((imagen) => {
        (imagen.visible && (imagen.x_ini < x && x < imagen.x_fin && imagen.y_ini < y && y < imagen.y_fin))
            ? resp = imagen:'';
    });
    return resp;
};
// IMAGEN: GET ID
const u_imagenGetId = (array, x, y) => {
    let resp = '';
    let id = -1;
    array.forEach((imagen) => {
        (imagen.visible && imagen.edit && (imagen.x_ini < x && x < imagen.x_fin && imagen.y_ini < y && y < imagen.y_fin))
            ? resp = imagen:'';
    });
    resp !== '' ? id = resp.id:'';
    return id;
};
// IMAGEN: SI SE HIZO CLICK SOBRE UNA IMAGEN, PODREMOS MOVER
const u_imagenClickSobreImagen = (imagenSelect, mouse) => {
    if (imagenSelect) {
        mouse.imagen_mover = true;
        mouse.imagen_mover_pts = false;
        mouse.imagen_seleccionar_pts = true;
    } else{
        mouse.imagen_mover = false;
        mouse.imagen_mover_pts = false;
        mouse.imagen_seleccionar_pts =false;
    }
}
// CUADRADOS PEQUEÑOS PAR UPDATE DEL CUADRADO:
const u_imagenGetPtsRedimencion = (imagen) => {
    let width_p = 10;
    let width_c = 2;

    let x_ini = imagen.x_ini - width_c;
    let y_ini = imagen.y_ini - width_c;
    let x_fin = imagen.x_fin + width_c;
    let y_fin = imagen.y_fin + width_c;

    let vectorPuntosImagen = [
        {
            x1: x_ini + (x_fin - x_ini) / width_c - width_p,
            y1: y_ini - width_p,
            x2: x_ini + (x_fin - x_ini) / width_c + width_p,
            y2: y_ini + width_p,
        },
        {
            x1: x_fin - width_p,
            y1: y_ini + (y_fin - y_ini) / width_c - width_p,
            x2: x_fin + width_p,
            y2: y_ini + (y_fin - y_ini) / width_c + width_p,
        },
        {
            x1: x_ini + (x_fin - x_ini) / width_c - width_p,
            y1: y_fin - width_p,
            x2: x_ini + (x_fin - x_ini) / width_c + width_p,
            y2: y_fin + width_p,
        },
        {
            x1: x_ini - width_p,
            y1: y_ini + (y_fin - y_ini) / width_c - width_p,
            x2: x_ini + width_p,
            y2: y_ini + (y_fin - y_ini) / width_c + width_p,
        },
    ];
    return vectorPuntosImagen;
};
// CUADRADO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CUADRADO
const u_imagenBuscaPtoClickParaRedimencionar = (x, y, imagen) => {
    let array = u_imagenGetPtsRedimencion(imagen);
    let resp = '';
    if (
        array[0].x1 < x &&
        x < array[0].x2 &&
        array[0].y1 < y &&
        y < array[0].y2
    )
        resp = 'top';
    else if (
        array[1].x1 < x &&
        x < array[1].x2 &&
        array[1].y1 < y &&
        y < array[1].y2
    )
        resp = 'right';
    else if (
        array[2].x1 < x &&
        x < array[2].x2 &&
        array[2].y1 < y &&
        y < array[2].y2
    )
        resp = 'button';
    else if (
        array[3].x1 < x &&
        x < array[3].x2 &&
        array[3].y1 < y &&
        y < array[3].y2
    )
        resp = 'lefth';
    return resp;
};
// IMAGEN: BUSCA IMAGEN PARA PODER MOVERLO O EDITAR SU TAMANO
const u_imagenOpera = (imagenSelect, array, mouse) => {
    if (mouse.imagen_seleccionar_pts){
        mouse.imagen_pto = u_imagenBuscaPtoClickParaRedimencionar(
            mouse.pos.x, mouse.pos.y, imagenSelect
        );
        if(mouse.imagen_pto !== '') {
            mouse.imagen_mover = false;
            mouse.imagen_mover_pts = true;
        } else {
            mouse.imagen_mover = false;
            mouse.imagen_mover_pts = false; // move_size
            mouse.imagen_seleccionar_pts = false;
        }
    }
    if (!mouse.imagen_seleccionar_pts){
        imagenSelect = u_imagenGetClick(array, mouse.pos.x, mouse.pos.y);
        u_imagenClickSobreImagen(imagenSelect, mouse);
    }
    return imagenSelect;
}
// IMAGEN: BORDE SEGMENTADO
const u_imagenBordeSegmentado = (context, imagen) => {
    context.strokeStyle = 'red'; // borde Color
    context.lineWidth = 3; // borde grosor de linea
    context.setLineDash([10, 4]); // lineas segmentadas

    context.beginPath();
    context.moveTo(imagen.x_ini, imagen.y_ini); // (x_ini, y_ini)
    context.lineTo(imagen.x_fin, imagen.y_ini); // (x_fin, y_ini)
    context.lineTo(imagen.x_fin, imagen.y_fin); // (x_fin, y_fin)
    context.lineTo(imagen.x_ini, imagen.y_fin); // (x_ini, y_fin)
    context.lineTo(imagen.x_ini, imagen.y_ini); // (x_ini, y_ini)
    context.stroke();
    context.closePath();

    context.fillStyle = 'red'; // borde Color
    context.setLineDash([0, 0]); // lineas segmentadas

    let array = u_imagenGetPtsRedimencion(imagen);
    array.forEach((elem) => {
        context.beginPath();
        context.moveTo(elem.x1, elem.y1); // (x_ini, y_ini)
        context.lineTo(elem.x2, elem.y1); // (x_fin, y_ini)
        context.lineTo(elem.x2, elem.y2); // (x_fin, y_fin)
        context.lineTo(elem.x1, elem.y2); // (x_ini, y_fin)
        context.lineTo(elem.x1, elem.y1); // (x_ini, y_ini)
        context.fill();
        context.closePath();
    });
};
// IMAGEN: MOVER
const u_imagenMover = (imagen, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    imagen.x_ini = imagen.x_ini + recorrido_x;
    imagen.y_ini = imagen.y_ini + recorrido_y;
    imagen.x_fin = imagen.x_fin + recorrido_x;
    imagen.y_fin = imagen.y_fin + recorrido_y;
    return imagen;
};
// UPDATE ZISE IMAGEN SELECT:
const u_imagenUpdateZise = (imagen, mouse) => {
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    switch (mouse.imagen_pto) {
        case 'top':
            imagen.y_ini = imagen.y_ini + recorrido_y;
            break;
        case 'right':
            imagen.x_fin = imagen.x_fin + recorrido_x;
            break;
        case 'button':
            imagen.y_fin = imagen.y_fin + recorrido_y;
            break;
        case 'lefth':
            imagen.x_ini = imagen.x_ini + recorrido_x;
            break;
        default:
            console.log('ocurrio un error');
            break;
    }
    return imagen;
};
// IMAGEN: DELETE POR ID
const u_imagenDeleteById = (array, id) => {
    /*array.forEach((element) => {
        element.id == id ? (element.visible = false) : '';
    });*/
    let newArray = [];
    for(let elm of array)
        elm.id !== id ? newArray.push(elm):'';
    return newArray;
};
export {
    u_imagenGraficaH,
    u_imagenOpera,
    u_imagenBordeSegmentado,
    u_imagenMover,
    u_imagenUpdateZise,
    u_getImageData,
    u_putImageData,
    u_imagenGetId,
    u_imagenDeleteById,
    u_convertImageBase64
}