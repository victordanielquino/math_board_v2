export const u_scissorDrawRectangulo = (context, scissor) => {
    context.strokeStyle = '#1976d2';
    context.lineWidth = 2; // borde grosor de linea
    context.setLineDash([5, 5]); // lineas segmentadas

    let x_ini = scissor.x_ini;
    let y_ini = scissor.y_ini;
    let x_fin = scissor.x_fin;
    let y_fin = scissor.y_fin;

    context.beginPath();
    context.moveTo(x_ini, y_ini); // (x_ini, y_ini)
    context.lineTo(x_fin, y_ini); // (x_fin, y_ini)
    context.lineTo(x_fin, y_fin); // (x_fin, y_fin)
    context.lineTo(x_ini, y_fin); // (x_ini, y_fin)
    context.lineTo(x_ini, y_ini); // (x_ini, y_ini)
    context.stroke();
    context.closePath();

    if (scissor.vertex.length > 0) {
        context.strokeStyle = '#1976d2';
        context.fillStyle = 'white'; // borde Color
        context.setLineDash([0, 0]); // lineas segmentadas
        scissor.vertex.forEach((elm) => {
            context.beginPath();
            context.moveTo(elm.x_ini, elm.y_ini); // (x_ini, y_ini)
            context.lineTo(elm.x_fin, elm.y_ini); // (x_fin, y_ini)
            context.lineTo(elm.x_fin, elm.y_fin); // (x_fin, y_fin)
            context.lineTo(elm.x_ini, elm.y_fin); // (x_ini, y_fin)
            context.lineTo(elm.x_ini, elm.y_ini); // (x_ini, y_ini)
            context.fill();
            context.stroke();
            context.closePath();
        });
    }
}

export const u_scissorMove = (scissor, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;

    scissor.x_ini = scissor.x_ini + recorrido_x;
    scissor.y_ini = scissor.y_ini + recorrido_y;
    scissor.x_fin = scissor.x_fin + recorrido_x;
    scissor.y_fin = scissor.y_fin + recorrido_y;

    scissor.vertex.forEach((elm) => {
        elm.x_ini += recorrido_x;
        elm.y_ini += recorrido_y;
        elm.x_fin += recorrido_x;
        elm.y_fin += recorrido_y;
    })

    return scissor;
}

export const u_scissorPtsResize = (scissor) => {
    let array = [];
    let pto0 = {
        pto: 0,
        x_ini: (scissor.x_ini + ((scissor.x_fin - scissor.x_ini) / 2)) - scissor.vertexSize,
        y_ini: scissor.y_ini - scissor.vertexSize*2,
        x_fin: (scissor.x_ini + ((scissor.x_fin - scissor.x_ini) / 2)) + scissor.vertexSize,
        y_fin: scissor.y_ini,
    }
    let pto1 = {
        pto: 1,
        x_ini: scissor.x_fin,
        y_ini: (scissor.y_ini + ((scissor.y_fin - scissor.y_ini) / 2)) - scissor.vertexSize,
        x_fin: scissor.x_fin + scissor.vertexSize*2,
        y_fin: (scissor.y_ini + ((scissor.y_fin - scissor.y_ini) / 2)) + scissor.vertexSize,
    }
    let pto2 = {
        pto: 2,
        x_ini: (scissor.x_ini + ((scissor.x_fin - scissor.x_ini) / 2)) - scissor.vertexSize,
        y_ini: scissor.y_fin,
        x_fin: (scissor.x_ini + ((scissor.x_fin - scissor.x_ini) / 2)) + scissor.vertexSize,
        y_fin: scissor.y_fin + scissor.vertexSize*2,
    }
    let pto3 = {
        pto: 3,
        x_ini: scissor.x_ini - scissor.vertexSize*2,
        y_ini: (scissor.y_ini + ((scissor.y_fin - scissor.y_ini) / 2)) - scissor.vertexSize,
        x_fin: scissor.x_ini,
        y_fin: (scissor.y_ini + ((scissor.y_fin - scissor.y_ini) / 2)) + scissor.vertexSize,
    }
    array.push(pto0, pto1, pto2, pto3);
    return array;
}
export const u_scissorResizePtoGet = (array, x, y) => {
    let pto = -1;
    for (let i = 0; i < array.length; i++) {
        let elm = array[i];
        if (elm.x_ini < x && x < elm.x_fin && elm.y_ini < y && y < elm.y_fin) {
            pto = elm.pto;
            break;
        }
    }
    return pto;
}
export const u_scissorResizePto = (scissor, pto, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    switch (pto) {
        case 0:
            scissor.y_ini += recorrido_y;
            scissor.vertex[0].y_ini += recorrido_y;
            scissor.vertex[0].y_fin += recorrido_y;

            scissor.vertex[1].y_ini += (recorrido_y/2);
            scissor.vertex[1].y_fin += (recorrido_y/2);
            scissor.vertex[3].y_ini += (recorrido_y/2);
            scissor.vertex[3].y_fin += (recorrido_y/2);
            break;
        case 1:
            scissor.x_fin += recorrido_x;
            scissor.vertex[1].x_ini += recorrido_x;
            scissor.vertex[1].x_fin += recorrido_x;

            scissor.vertex[0].x_ini += (recorrido_x/2);
            scissor.vertex[0].x_fin += (recorrido_x/2);
            scissor.vertex[2].x_ini += (recorrido_x/2);
            scissor.vertex[2].x_fin += (recorrido_x/2);
            break;
        case 2:
            scissor.y_fin += recorrido_y;
            scissor.vertex[2].y_ini += recorrido_y;
            scissor.vertex[2].y_fin += recorrido_y;

            scissor.vertex[1].y_ini += (recorrido_y/2);
            scissor.vertex[1].y_fin += (recorrido_y/2);
            scissor.vertex[3].y_ini += (recorrido_y/2);
            scissor.vertex[3].y_fin += (recorrido_y/2);
            break;
        case 3:
            scissor.x_ini += recorrido_x;
            scissor.vertex[3].x_ini += recorrido_x;
            scissor.vertex[3].x_fin += recorrido_x;

            scissor.vertex[0].x_ini += (recorrido_x/2);
            scissor.vertex[0].x_fin += (recorrido_x/2);
            scissor.vertex[2].x_ini += (recorrido_x/2);
            scissor.vertex[2].x_fin += (recorrido_x/2);
            break;
        default:
            break;
    }
}