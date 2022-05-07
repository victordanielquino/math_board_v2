import {getPorcion} from "../../utils/arrays";

export const u_moveUpElement = (array, id) => {
    /*let array = [];
    arrayIn.forEach( elm => array.push(elm));*/
    let sw = false;
    let k = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            k = i;
            break;
        }
    }
    if (k !== -1 && k < array.length-1) {
        let j = -1;
        let obj = array[k];
        for (let i = k+1; i < array.length; i++) {
            if (array[i].canvas === obj.canvas){
                j = i;
                break;
            }
        }
        if (j !== -1) {
            let aux = array[j];
            array[j] = array[k];
            array[k] = aux;
            sw = true;
        }
    }
    return sw;
}

export const u_moveDownElement = (array, id) => {
    /*let array = [];
    arrayIn.forEach( elm => array.push(elm));*/
    let sw = false;
    let k = -1;
    for (let i = array.length-1; i >= 0; i--) {
        if (array[i].id === id) {
            k = i;
            break;
        }
    }
    if (k !== -1 && k > 0) {
        let j = -1;
        let obj = array[k];
        for (let i = k-1; i >= 0; i--) {
            if (array[i].canvas === obj.canvas){
                j = i;
                break;
            }
        }
        if (j !== -1) {
            let aux = array[j];
            array[j] = array[k];
            array[k] = aux;
            sw = true;
        }
    }
    return sw;
}
// MUEVE LAPIZ DUPLICATE:
export const u_moveDuplicatePencil = (pencil, recorrido_x, recorrido_y) => {
    let arrayAux = [];
    let lapizNew = {};
    pencil.historiaLinea.forEach(elm => arrayAux.push(
        [elm[0]+recorrido_x, elm[1]+recorrido_y, elm[2]+recorrido_x, elm[3]+recorrido_y]
    ));
    lapizNew = {
        id: pencil.id,
        visible: pencil.visible,
        edit: pencil.edit,
        grosor: pencil.grosor,
        color: pencil.color,
        historiaLinea: arrayAux,
        x_min: pencil.x_min,
        x_may: pencil.x_may,
        y_min: pencil.y_min,
        y_may: pencil.y_may,
        canvas: pencil.canvas,
        types: pencil.types,
    };
    /*lapizNew.historiaLinea.forEach((linea) => {
        linea[0] = linea[0] + recorrido_x;
        linea[1] = linea[1] + recorrido_y;
        linea[2] = linea[2] + recorrido_x;
        linea[3] = linea[3] + recorrido_y;
    });*/
    lapizNew.x_min = lapizNew.x_min + recorrido_x;
    lapizNew.x_may = lapizNew.x_may + recorrido_x;
    lapizNew.y_min = lapizNew.y_min + recorrido_y;
    lapizNew.y_may = lapizNew.y_may + recorrido_y;
    return lapizNew;
};
// MOVE: Text duplicate:
export const u_moveDuplicateText = (textIn, recorrido_x, recorrido_y) => {
    let text = {
        id: textIn.id,
        x_ini: textIn.x_ini + recorrido_x,
        y_ini: textIn.y_ini + recorrido_y,
        x_fin: textIn.x_fin + recorrido_x,
        y_fin: textIn.y_fin + recorrido_y,
        visible: textIn.visible,
        edit: textIn.edit,

        fontAlign: textIn.fontAlign,	// startr, end
        fontBaseline: textIn.fontBaseline,
        fontColor: textIn.fontColor,
        fontBold: textIn.fontBold,
        fontItalic: textIn.fontItalic,
        fontUnderL: textIn.fontUnderL,
        fontTypografia: textIn.fontTypografia,
        fontSize: textIn.fontSize,
        fontText: textIn.fontText,
        fontFocus: false,
        canvas: textIn.canvas,
        types: 'text',
        cursor: textIn.cursor,
        line:{
            x_ini: textIn.line.x_ini + recorrido_x,
            y_ini: textIn.line.y_ini + recorrido_y,
            x_fin: textIn.line.x_fin + recorrido_x,
            y_fin: textIn.line.y_fin + recorrido_y,
        },

        vertex: [
            {x:textIn.vertex[0].x + recorrido_x, y:textIn.vertex[0].y + recorrido_y, pto:0},
            {x:textIn.vertex[1].x + recorrido_x, y:textIn.vertex[1].y + recorrido_y, pto:1},
            {x:textIn.vertex[2].x + recorrido_x, y:textIn.vertex[2].y + recorrido_y, pto:2},
            {x:textIn.vertex[3].x + recorrido_x, y:textIn.vertex[3].y + recorrido_y, pto:3},
        ],
        select: false,
        rotateDeg: textIn.rotateDeg,
        rotateDegPrev: textIn.rotateDegPrev,
        angulo: textIn.angulo,
        radio: textIn.radio,
        h: textIn.h + recorrido_x,
        k: textIn.k + recorrido_y,
        width: textIn.width,
        height: textIn.height,
    };

    return text;
}
// MOVE: Line duplicate
export const u_moveDuplicateLine = (lineIn, recorrido_x, recorrido_y) => {
    let line = {
        id: lineIn.id,
        visible: lineIn.visible,
        edit: lineIn.edit,
        grosor: lineIn.grosor,
        color: lineIn.color,
        type: lineIn.type,
        segment: lineIn.segment,
        x_ini: lineIn.x_ini,
        y_ini: lineIn.y_ini,
        x_fin: lineIn.x_fin,
        y_fin: lineIn.y_fin,
        x_1: lineIn.x_1,
        y_1: lineIn.y_1,
        x_2: lineIn.x_2,
        y_2: lineIn.y_2,

        cdc_xmin:lineIn.cdc_xmin,
        cdc_ymin: lineIn.cdc_ymin,
        cdc_xmax: lineIn.cdc_xmax,
        cdc_ymax: lineIn.cdc_ymax,
        cdc_pto_x1: lineIn.cdc_pto_x1,
        cdc_pto_y1: lineIn.cdc_pto_y1,
        cdc_pto_x2: lineIn.cdc_pto_x2,
        cdc_pto_y2: lineIn.cdc_pto_y2,

        vtr_pto_x1:lineIn.vtr_pto_x1,
        vtr_pto_y1:lineIn.vtr_pto_y1,
        vtr_pto_x2:lineIn.vtr_pto_x2,
        vtr_pto_y2:lineIn.vtr_pto_y2,

        canvas: lineIn.canvas,
        types: 'line',
    };

    switch (line.type) {
        case 'line':
            line.x_ini = line.x_ini + recorrido_x;
            line.y_ini = line.y_ini + recorrido_y;
            line.x_fin = line.x_fin + recorrido_x;
            line.y_fin = line.y_fin + recorrido_y;
            break;
        case 'vector':
            line.x_ini = line.x_ini + recorrido_x;
            line.y_ini = line.y_ini + recorrido_y;
            line.x_fin = line.x_fin + recorrido_x;
            line.y_fin = line.y_fin + recorrido_y;
            line.vtr_pto_x1 = line.vtr_pto_x1 + recorrido_x;
            line.vtr_pto_x2 = line.vtr_pto_x2 + recorrido_x;
            line.vtr_pto_y1 = line.vtr_pto_y1 + recorrido_y;
            line.vtr_pto_y2 = line.vtr_pto_y2 + recorrido_y;
            break;
        case 'bezier':
            break;
        case 'cuadratic':
            line.x_ini = line.x_ini + recorrido_x;
            line.y_ini = line.y_ini + recorrido_y;

            line.x_fin = line.x_fin + recorrido_x;
            line.y_fin = line.y_fin + recorrido_y;

            line.x_1 = line.x_1 + recorrido_x;
            line.y_1 = line.y_1 + recorrido_y;

            line.cdc_xmin = line.cdc_xmin + recorrido_x;
            line.cdc_ymin = line.cdc_ymin + recorrido_y;

            line.cdc_xmax = line.cdc_xmax + recorrido_x;
            line.cdc_ymax = line.cdc_ymax + recorrido_y;

            line.cdc_pto_x1 = line.cdc_pto_x1 + recorrido_x;
            line.cdc_pto_y1 = line.cdc_pto_y1 + recorrido_y;

            line.cdc_pto_x2 = line.cdc_pto_x2 + recorrido_x;
            line.cdc_pto_y2 = line.cdc_pto_y2 + recorrido_y;
            break;
        default:
            break;
    }
    return line;
}
// MOVE: Square duplicate
export const u_moveDuplicateSquare = (squareIn, recorrido_x, recorrido_y) => {
    let square = {
        id: squareIn.id,
        visible: squareIn.visible,
        edit: squareIn.edit,
        bordeEstado: squareIn.bordeEstado,
        bordeGrosor: squareIn.bordeGrosor,
        bordeColor: squareIn.bordeColor,
        fondoEstado: squareIn.fondoEstado,
        fondoColor: squareIn.fondoColor,
        x_ini: squareIn.x_ini + recorrido_x,
        y_ini: squareIn.y_ini + recorrido_y,
        x_fin: squareIn.x_fin + recorrido_x,
        y_fin: squareIn.y_fin + recorrido_y,
        canvas: squareIn.canvas,
        types: 'square',

        h: squareIn.h + recorrido_x,
        k: squareIn.k + recorrido_y,
        angulo: squareIn.angulo,
        radio: squareIn.radio,
        radioX: squareIn.radioX,
        radioY: squareIn.radioY,
        deg: squareIn.deg,
        degPrev: squareIn.degPrev,
        pts: [],
        vertex: [
            {x:squareIn.vertex[0].x + recorrido_x, y:squareIn.vertex[0].y + recorrido_y, pto: 0},
            {x:squareIn.vertex[1].x + recorrido_x, y:squareIn.vertex[1].y + recorrido_y, pto: 1},
            {x:squareIn.vertex[2].x + recorrido_x, y:squareIn.vertex[2].y + recorrido_y, pto: 2},
            {x:squareIn.vertex[3].x + recorrido_x, y:squareIn.vertex[3].y + recorrido_y, pto: 3},
            {x:squareIn.vertex[4].x + recorrido_x, y:squareIn.vertex[4].y + recorrido_y, pto: 4},
            {x:squareIn.vertex[5].x + recorrido_x, y:squareIn.vertex[5].y + recorrido_y, pto: 5},
            {x:squareIn.vertex[6].x + recorrido_x, y:squareIn.vertex[6].y + recorrido_y, pto: 6},
            {x:squareIn.vertex[7].x + recorrido_x, y:squareIn.vertex[7].y + recorrido_y, pto: 7},
        ],
        move: false,
    };

    return square;
}
// MOVE: Circle duplicate
export const u_moveDuplicateCircle = (circleIn, recorrido_x, recorrido_y) => {
    let circle = {
        id: circleIn.id,
        visible: circleIn.visible,
        edit: circleIn.edit,
        bordeEstado: circleIn.bordeEstado,
        bordeGrosor: circleIn.bordeGrosor,
        bordeColor: circleIn.bordeColor,
        fondoEstado: circleIn.fondoEstado,
        fondoColor: circleIn.fondoColor,
        x_ini: circleIn.x_ini,
        y_ini: circleIn.y_ini,
        x_fin: circleIn.x_fin,
        y_fin: circleIn.y_fin,
        radioX: circleIn.radioX,
        radioY: circleIn.radioY,
        h: circleIn.h,
        k: circleIn.k,
        types: 'circle',
        canvas: circleIn.canvas,
    };

    circle.x_ini = circle.x_ini + recorrido_x;
    circle.y_ini = circle.y_ini + recorrido_y;
    circle.x_fin = circle.x_fin + recorrido_x;
    circle.y_fin = circle.y_fin + recorrido_y;
    circle.h = circle.h + recorrido_x;
    circle.k = circle.k + recorrido_y;
    return circle;
}
// MOVE: Triangle duplicate
export const u_moveDuplicateTriangle = (triangleIn, recorrido_x, recorrido_y) => {
    let triangle = {
        id: triangleIn.id,
        visible: triangleIn.visible,
        edit: triangleIn.edit,
        bordeEstado: triangleIn.bordeEstado,
        bordeGrosor: triangleIn.bordeGrosor,
        bordeColor: triangleIn.bordeColor,
        fondoEstado: triangleIn.fondoEstado,
        fondoColor: triangleIn.fondoColor,
        x1: triangleIn.x1,
        y1: triangleIn.y1,
        x2: triangleIn.x2,
        y2: triangleIn.y2,
        x3: triangleIn.x3,
        y3: triangleIn.y3,
        canvas: triangleIn.canvas,
        types: 'triangle',
    };

    triangle.x1 = triangle.x1 + recorrido_x;
    triangle.y1 = triangle.y1 + recorrido_y;
    triangle.x2 = triangle.x2 + recorrido_x;
    triangle.y2 = triangle.y2 + recorrido_y;
    triangle.x3 = triangle.x3 + recorrido_x;
    triangle.y3 = triangle.y3 + recorrido_y;
    return triangle;
}
// MOVE: Geometric duplicate
export const u_moveDuplicateGeometric = (geometricIn, recorrido_x, recorrido_y) => {
    let geometric = {
        id: geometricIn.id,
        visible: geometricIn.visible,
        edit: geometricIn.edit,
        bordeEstado: geometricIn.bordeEstado,
        bordeGrosor: geometricIn.bordeGrosor,
        bordeColor: geometricIn.bordeColor,
        fondoEstado: geometricIn.fondoEstado,
        fondoColor: geometricIn.fondoColor,
        x_ini: geometricIn.x_ini,
        y_ini: geometricIn.y_ini,
        x_fin: geometricIn.x_fin,
        y_fin: geometricIn.y_fin,
        radioX: geometricIn.radioX,
        radioY: geometricIn.radioY,
        radioX_: geometricIn.radioX_,
        radioY_: geometricIn.radioY_,
        radio: geometricIn.radio,
        h: geometricIn.h,
        k: geometricIn.k,
        types: 'geometric',
        canvas: geometricIn.canvas,
        arrayVertex: [],
        arrayVertexSegment: [],
        nroVertex: geometricIn.nroVertex,
    };
    geometricIn.arrayVertex.forEach(elm => geometric.arrayVertex.push({
        x:elm.x + recorrido_x,
        y:elm.y + recorrido_y
    }));
    geometricIn.arrayVertexSegment.forEach(elm => geometric.arrayVertexSegment.push({
        x:elm.x + recorrido_x,
        y:elm.y + recorrido_y
    }));

    geometric.h = geometric.h + recorrido_x;
    geometric.k = geometric.k + recorrido_y;
    geometric.radioX = geometric.radioX + recorrido_x;
    geometric.radioY = geometric.radioY + recorrido_y;
    geometric.radioX_ = geometric.radioX_ + recorrido_x;
    geometric.radioY_ = geometric.radioY_ + recorrido_y;
    return geometric;
}
// MOVE: Image duplicate
export const u_moveDuplicateImage = (imageIn, recorrido_x, recorrido_y) => {
    const image = {
        id: imageIn.id,
        edit: imageIn.edit,
        visible: imageIn.visible,
        fileId: imageIn.fileId,
        filePropietario: imageIn.filePropietario,
        fileSrc: imageIn.fileSrc,
        fileNombre: imageIn.fileNombre,
        fileAutor: imageIn.fileAutor,
        x_ini: imageIn.x_ini,
        y_ini: imageIn.y_ini,
        x_fin: imageIn.x_fin,
        y_fin: imageIn.y_fin,
        dataImagen:imageIn.dataImagen,
        dataUse: imageIn.dataUse,
        types: 'image',
        canvas: imageIn.canvas,
    };

    image.x_ini = image.x_ini + recorrido_x;
    image.y_ini = image.y_ini + recorrido_y;
    image.x_fin = image.x_fin + recorrido_x;
    image.y_fin = image.y_fin + recorrido_y;
    return image;
}
// MOVE: Plano duplicate
export const u_moveDuplicatePlano = (planoIn, recorrido_x, recorrido_y) => {
    let plano = {
        id: planoIn.id,
        visible: planoIn.visible,
        edit: planoIn.edit,
        bordeEstado: planoIn.bordeEstado,
        bordeGrosor: planoIn.bordeGrosor,
        bordeColor: planoIn.bordeColor,
        fondoEstado: planoIn.fondoEstado,
        fondoColor: planoIn.fondoColor,
        width_cuadricula: planoIn.width_cuadricula,
        x_ini: planoIn.x_ini,
        y_ini: planoIn.y_ini,
        x_fin: planoIn.x_fin,
        y_fin: planoIn.y_fin,
        x_min: planoIn.x_min,
        y_max: planoIn.y_max,
        salto: planoIn.salto,
        types: 'plano',
        canvas: planoIn.canvas,
        h: planoIn.h,
        k: planoIn.k,
    };
    plano.x_ini = plano.x_ini + recorrido_x;
    plano.y_ini = plano.y_ini + recorrido_y;
    plano.x_fin = plano.x_fin + recorrido_x;
    plano.y_fin = plano.y_fin + recorrido_y;
    plano.h = plano.h + recorrido_x;
    plano.k = plano.k + recorrido_y;
    return plano;
}