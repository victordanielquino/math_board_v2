// CIRCULO: REPOSICIONA SI EL CIRCULO SE VOLTEA
const u_circuloValidaPosicion = (circulo) => {
    if (circulo.x_ini > circulo.x_fin) {
        let aux = circulo.x_ini;
        circulo.x_ini = circulo.x_fin;
        circulo.x_fin = aux;
    }
    if (circulo.y_ini > circulo.y_fin) {
        let aux = circulo.y_ini;
        circulo.y_ini = circulo.y_fin;
        circulo.y_fin = aux;
    }
    return circulo;
};
// CIRCULO: CONTROLA QUE HAYA RADIOS NEGATIVOS
const u_circuloValidaRadio = (circulo) => {
    if (circulo.radioX < 0) {
        circulo.radioX = circulo.radioX * (-1);
    } else {
        if (circulo.radioY < 0){
            circulo.radioY = circulo.radioY * (-1);
        }
    }
    return circulo;
}
// CIRCULO: GRAFICA UN CIRCULO
const u_circuloGrafica = (context, circulo) => {
    context.lineWidth = circulo.bordeGrosor;
    context.strokeStyle = circulo.bordeColor;
    context.fillStyle = circulo.fondoColor;

    context.setLineDash([0, 0]);
    context.beginPath();
    //context.arc(circulo.h, circulo.k, circulo.radio, 0, 2*Math.PI, true);
    context.ellipse(circulo.h, circulo.k, circulo.radioX, circulo.radioY, 0, 0, 2*Math.PI);
    (circulo.fondoColor != 'white') ? context.fill(): '';
    (circulo.bordeColor != 'white') ? context.stroke(): '';
    context.closePath();
}
const u_circleDraw = (context, circulo) => {
    context.lineWidth = circulo.bordeGrosor;
    context.strokeStyle = circulo.bordeColor;
    context.fillStyle = circulo.fondoColor;

    context.setLineDash([0, 0]);
    context.beginPath();
    //context.arc(circulo.h, circulo.k, circulo.radio, 0, 2*Math.PI, true);
    context.ellipse(circulo.h, circulo.k, circulo.radioX, circulo.radioY, 0, 0, 2*Math.PI);
    (circulo.fondoColor != 'white') ? context.fill(): '';
    (circulo.bordeColor != 'white') ? context.stroke(): '';
    context.closePath();
}
const u_circleDrawWithRadio = (context, circulo) => {
    context.lineWidth = circulo.bordeGrosor;
    context.strokeStyle = circulo.bordeColor;
    context.fillStyle = circulo.fondoColor;

    context.setLineDash([0, 0]);
    context.beginPath();
    context.arc(circulo.h, circulo.k, circulo.radio, 0, 2*Math.PI, true);
    //context.ellipse(circulo.h, circulo.k, circulo.radioX, circulo.radioY, 0, 0, 2*Math.PI);
    (circulo.fondoColor != 'white') ? context.fill(): '';
    (circulo.bordeColor != 'white') ? context.stroke(): '';
    context.closePath();
}
// CIRCULO: GRAFICA ARRAY DE CIRCULOS
const u_circuloGraficaH = (context, array) => {
    array.map(circulo => {
        u_circuloGrafica(context, circulo);
    })
}
// CIRCULO: CUADRADOS PEQUEÑOS PARA MODIFICAR EL TAMANO DEL CIRCULO:
const u_circuloGetPtsRedimencion = (circulo) => {
    let width_p = 10;
    let width_c = 2;

    let x_ini = circulo.x_ini - width_c;
    let y_ini = circulo.y_ini - width_c;
    let x_fin = circulo.x_fin + width_c;
    let y_fin = circulo.y_fin + width_c;

    let vectorPuntosCuadrado = [
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
    return vectorPuntosCuadrado;
};
// CIRCULO: CUADRADO SEGMENTADO ALREDEDOR DEL CIRCULO SELECCIONADO
const u_circuloBordeSegmentado = (context, circulo) => {
    context.strokeStyle = 'red'; // borde Color
    context.lineWidth = 1; // borde grosor de linea
    context.setLineDash([10, 4]); // lineas segmentadas

    context.beginPath();
    context.moveTo(circulo.x_ini, circulo.y_ini); // (x_ini, y_ini)
    context.lineTo(circulo.x_fin, circulo.y_ini); // (x_fin, y_ini)
    context.lineTo(circulo.x_fin, circulo.y_fin); // (x_fin, y_fin)
    context.lineTo(circulo.x_ini, circulo.y_fin); // (x_ini, y_fin)
    context.lineTo(circulo.x_ini, circulo.y_ini); // (x_ini, y_ini)
    context.stroke();
    context.closePath();

    context.fillStyle = 'red'; // borde Color
    context.setLineDash([14, 4]); // lineas segmentadas

    let array = u_circuloGetPtsRedimencion(circulo);
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
// CIRCULO: GET - CLICK
const u_circuloGetClick = (context, array, x, y) => {
    let resp = '';
    array.forEach((circulo) => {
        if (circulo.visible) {
            let x1 = circulo.x_ini;
            let y1 = circulo.y_ini;
            let x2 = circulo.x_fin;
            let y2 = circulo.y_fin;
            if (x1 - 20 < x && x < x2 + 20 && y1 - 20 < y && y < y2 + 20) {
                resp = circulo;
            }
        }
    });
    //resp ? u_circuloBordeSegmentado(context, resp):'';
    return resp;
};
// CIRCULO: MOVER
const u_circuloMover = (circulo, mouse) => {
    //u_circuloValidaPosicion(circulo);
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    circulo.x_ini = circulo.x_ini + recorrido_x;
    circulo.y_ini = circulo.y_ini + recorrido_y;
    circulo.x_fin = circulo.x_fin + recorrido_x;
    circulo.y_fin = circulo.y_fin + recorrido_y;
    circulo.h = circulo.h + recorrido_x;
    circulo.k = circulo.k + recorrido_y;
    return circulo;
};
// CIRCULO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CIRCULO
const u_circuloBuscaPtoClickParaRedimencionar = (x, y, circulo) => {
    let array = u_circuloGetPtsRedimencion(circulo);
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
// CIRCULO: SI SE HIZO CLICK SOBRE UN CIRCULO, PODREMOS EDITAR ZISE U MOVER
const u_circuloClickSobreCirculo = (circuloSelect, mouse) => {
    if (circuloSelect) {
        mouse.circulo_mover = true;
        mouse.circulo_mover_pts = false;
        mouse.circulo_seleccionar_pts = true;
    } else{
        mouse.circulo_mover = false;
        mouse.circulo_mover_pts = false;
        mouse.circulo_seleccionar_pts =false;
    }
}
// CIRCULO: BUSCA CIRCULO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_circuloOpera = (context, circuloSelect, array, mouse) => {
    if (mouse.circulo_seleccionar_pts){
        mouse.circulo_pto = u_circuloBuscaPtoClickParaRedimencionar(
            mouse.pos.x, mouse.pos.y, circuloSelect
        );
        if(mouse.circulo_pto != '') {
            mouse.circulo_mover = false;
            mouse.circulo_mover_pts = true;
        } else {
            mouse.circulo_mover = false;
            mouse.circulo_mover_pts = false; // move_size
            mouse.circulo_seleccionar_pts = false;
        }
    }
    if (!mouse.circulo_seleccionar_pts){
        circuloSelect = u_circuloGetClick(context, array, mouse.pos.x, mouse.pos.y);
        u_circuloClickSobreCirculo(circuloSelect, mouse);
    }
    return circuloSelect;
}
// CIRCULO: UPDATE ZISE
const u_circuloUpdateZise = (circulo, mouse) => {
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    switch (mouse.circulo_pto) {
        case 'top':
            circulo.y_ini = circulo.y_ini + recorrido_y;
            circulo.k = circulo.y_ini + (circulo.y_fin-circulo.y_ini)/2;
            circulo.radioY = circulo.k - circulo.y_ini;
            circulo = u_circuloValidaRadio(circulo);
            break;
        case 'right':
            circulo.x_fin = circulo.x_fin + recorrido_x;
            circulo.h = circulo.x_ini + (circulo.x_fin - circulo.x_ini)/2;
            circulo.radioX = circulo.h - circulo.x_ini;
            circulo = u_circuloValidaRadio(circulo);
            break;
        case 'button':
            circulo.y_fin = circulo.y_fin + recorrido_y;
            circulo.k = circulo.y_ini + (circulo.y_fin-circulo.y_ini)/2;
            circulo.radioY = circulo.k - circulo.y_ini;
            circulo = u_circuloValidaRadio(circulo);
            break;
        case 'lefth':
            circulo.x_ini = circulo.x_ini + recorrido_x;
            circulo.h = circulo.x_ini + (circulo.x_fin - circulo.x_ini)/2;
            circulo.radioX = circulo.h - circulo.x_ini;
            circulo = u_circuloValidaRadio(circulo);
            break;
        default:
            console.log('ocurrio un error: u_circuloUpdateZise');
            break;
    }
    return circulo;
};
// CIRCULO: GET - ID
const u_circuloGetId = (array, x, y) => {
    let resp = '';
    let id = -1;
    array.forEach((circulo) => {
        if (circulo.visible) {
            let x1 = circulo.x_ini;
            let y1 = circulo.y_ini;
            let x2 = circulo.x_fin;
            let y2 = circulo.y_fin;
            if (x1 - 20 < x && x < x2 + 20 && y1 - 20 < y && y < y2 + 20) {
                resp = circulo;
            }
        }
    });
    resp !== '' ? id = resp.id:'';
    return id;
};
const u_circcleClickTrue = (circulo, x, y) => {
    let x1 = circulo.x_ini;
    let y1 = circulo.y_ini;
    let x2 = circulo.x_fin;
    let y2 = circulo.y_fin;
    return (x1 - 20 < x && x < x2 + 20 && y1 - 20 < y && y < y2 + 20);
};
// CIRCULO: DELETE POR ID
const u_circuloDeleteById = (array, id) => {
    let newArray = [];
    for(let elm of array)
        elm.id !== id ? newArray.push(elm):'';
    return newArray;
};
export {
    u_circuloGraficaH,
    u_circuloGetClick,
    u_circuloMover,
    u_circuloBordeSegmentado,
    u_circuloBuscaPtoClickParaRedimencionar,
    u_circuloUpdateZise,
    u_circuloClickSobreCirculo,
    u_circuloOpera,
    u_circuloValidaPosicion,
    u_circuloGrafica,
    u_circuloGetId,
    u_circuloDeleteById,
    u_circleDraw,
    u_circcleClickTrue,
    u_circleDrawWithRadio
}