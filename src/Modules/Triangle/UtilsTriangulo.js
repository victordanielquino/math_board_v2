// TRIANGULO: GRAFICA
const u_trianguloGrafica = (context, triangulo) => {
    context.strokeStyle = triangulo.bordeColor; // bordeColor
    context.fillStyle = triangulo.fondoColor; // fondoColor
    context.lineWidth = triangulo.bordeGrosor; // bordeGrosor
    context.setLineDash([0, 0]); // lineas no segmentadas

    context.beginPath();
    context.moveTo(triangulo.x1, triangulo.y1); // (x_ini, y_ini)
    context.lineTo(triangulo.x2, triangulo.y2); // (x_fin, y_ini)
    context.lineTo(triangulo.x3, triangulo.y3); // (x_fin, y_fin)
    context.lineTo(triangulo.x1, triangulo.y1); // (x_ini, y_fin)

    triangulo.fondoEstado ? context.fill() : ''; // fondoColor = true
    triangulo.bordeEstado ? context.stroke() : ''; // bordeColor = true
    context.closePath();
};
const u_triangleDraw = (context, triangulo) => {
    context.strokeStyle = triangulo.bordeColor; // bordeColor
    context.fillStyle = triangulo.fondoColor; // fondoColor
    context.lineWidth = triangulo.bordeGrosor; // bordeGrosor
    context.setLineDash([0, 0]); // lineas no segmentadas

    context.beginPath();
    context.moveTo(triangulo.x1, triangulo.y1); // (x_ini, y_ini)
    context.lineTo(triangulo.x2, triangulo.y2); // (x_fin, y_ini)
    context.lineTo(triangulo.x3, triangulo.y3); // (x_fin, y_fin)
    context.lineTo(triangulo.x1, triangulo.y1); // (x_ini, y_fin)

    triangulo.fondoEstado ? context.fill() : ''; // fondoColor = true
    triangulo.bordeEstado ? context.stroke() : ''; // bordeColor = true
    context.closePath();
};
// TRIANGULO: GRAFICA HISTORIA
const u_trianguloGraficaH = (context, array) => {
    array.forEach((element) => u_trianguloGrafica(context, element));
};
// TRIANGULO: CLICK DENTRO DEL TRIANGULO
const u_trianguloProductoCruz_UxV = (p1, p2, p3) => {
    /*
    u = P1P2 = P2 -P1 = (X2, Y2) - (X1, Y1) = (X2-X1, Y2-Y1)
    V = P1P3 = P3 -P1 = (X3, Y3) - (X1, Y1) = (X3-X1, Y3-Y1)
            |  i        j    k|
    u x v = |x2-x1    y2-y1  0| = (0, 0, (x2-x1)(y3-y1) - (y2-y1)(x3-x1))
            |x3-x1    y3-y1  0|
    * */
    return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);
}
// TRIANGULO: CUADRADOS PEQUEÑOS PARA MODIFICAR EL TAMANO DEL TRIANGULO:
const u_trianguloGetPtsRedimencion = (triangulo) => {
    let width_p = 5;
    let vectorPuntosCuadrado = [
        {
            x1: triangulo.x1 - width_p,
            y1: triangulo.y1 - width_p,
            x2: triangulo.x1 + width_p,
            y2: triangulo.y1 + width_p,
        },
        {
            x1: triangulo.x2 - width_p,
            y1: triangulo.y2 - width_p,
            x2: triangulo.x2 + width_p,
            y2: triangulo.y2 + width_p,
        },
        {
            x1: triangulo.x3 - width_p,
            y1: triangulo.y3 - width_p,
            x2: triangulo.x3 + width_p,
            y2: triangulo.y3 + width_p,
        }
    ];
    return vectorPuntosCuadrado;
};
// TRIANGULO: CUADRADO SEGMENTADO ALREDEDOR DEL TRIANGULO SELECCIONADO
const u_trianguloBordeSegmentado = (context, triangulo) => {
    context.strokeStyle = '#1976d2'; // borde Color
    context.lineWidth = 2; // borde grosor de linea
    context.setLineDash([5, 5]); // lineas segmentadas

    context.beginPath();
    context.moveTo(triangulo.x1, triangulo.y1); // (x_ini, y_ini)
    context.lineTo(triangulo.x2, triangulo.y2); // (x_fin, y_ini)
    context.lineTo(triangulo.x3, triangulo.y3); // (x_fin, y_fin)
    context.lineTo(triangulo.x1, triangulo.y1); // (x_ini, y_fin)
    context.stroke();
    context.closePath();

    context.strokeStyle = '#1976d2'; // borde Color
    context.fillStyle = 'white'; // borde Color
    context.setLineDash([0, 0]); // lineas segmentadas

    let array = u_trianguloGetPtsRedimencion(triangulo);
    array.forEach((elem) => {
        context.beginPath();
        context.moveTo(elem.x1, elem.y1); // (x_ini, y_ini)
        context.lineTo(elem.x2, elem.y1); // (x_fin, y_ini)
        context.lineTo(elem.x2, elem.y2); // (x_fin, y_fin)
        context.lineTo(elem.x1, elem.y2); // (x_ini, y_fin)
        context.lineTo(elem.x1, elem.y1); // (x_ini, y_ini)
        context.fill();
        context.stroke();
        context.closePath();
    });
};
// CIRCULO: GET - CLICK
const u_trianguloGetClick = (context, array, x, y) => {
    let resp = '';
    array.forEach((triangulo) => {
        if (triangulo.visible) {
            let p0 = { x: x,y: y };
            let p1 = { x: triangulo.x1, y:triangulo.y1 };
            let p2 = { x: triangulo.x2, y:triangulo.y2 };
            let p3 = { x: triangulo.x3, y:triangulo.y3 };
            (
                (
                    u_trianguloProductoCruz_UxV(p0, p1, p2) < 0 &&
                    u_trianguloProductoCruz_UxV(p0, p2, p3) < 0 &&
                    u_trianguloProductoCruz_UxV(p0, p3, p1) < 0
                ) ||
                (
                    u_trianguloProductoCruz_UxV(p0, p1, p2) > 0 &&
                    u_trianguloProductoCruz_UxV(p0, p2, p3) > 0 &&
                    u_trianguloProductoCruz_UxV(p0, p3, p1) > 0
                )
            ) ? resp = triangulo : '';
        }
    });
    //resp ? u_trianguloBordeSegmentado(context, resp):'';
    return resp;
};
// TRIANGLE: GET - ID
const u_trianguloGetId = (array, x, y) => {
    let resp = '';
    let id =  -1;
    array.forEach((triangulo) => {
        if (triangulo.visible && triangulo.edit) {
            let p0 = { x: x,y: y };
            let p1 = { x: triangulo.x1, y:triangulo.y1 };
            let p2 = { x: triangulo.x2, y:triangulo.y2 };
            let p3 = { x: triangulo.x3, y:triangulo.y3 };
            (
                (
                    u_trianguloProductoCruz_UxV(p0,p1,p2) < 0 &&
                    u_trianguloProductoCruz_UxV(p0, p2, p3) < 0 &&
                    u_trianguloProductoCruz_UxV(p0, p3, p1) < 0
                ) ||
                (
                    u_trianguloProductoCruz_UxV(p0,p1,p2) > 0 &&
                    u_trianguloProductoCruz_UxV(p0, p2, p3) > 0 &&
                    u_trianguloProductoCruz_UxV(p0, p3, p1) > 0
                )
            ) ? resp = triangulo : '';
        }
    });
    //resp ? u_trianguloBordeSegmentado(context, resp):'';
    resp !== '' ? id = resp.id:'';
    return id;
};
const u_triangleClickTrue = (triangulo, x, y) => {
    let p0 = { x: x, y: y };
    let p1 = { x: triangulo.x1, y:triangulo.y1 };
    let p2 = { x: triangulo.x2, y:triangulo.y2 };
    let p3 = { x: triangulo.x3, y:triangulo.y3 };
    return ((
            u_trianguloProductoCruz_UxV(p0, p1, p2) < 0 &&
            u_trianguloProductoCruz_UxV(p0, p2, p3) < 0 &&
            u_trianguloProductoCruz_UxV(p0, p3, p1) < 0
        ) ||
        (
            u_trianguloProductoCruz_UxV(p0, p1, p2) > 0 &&
            u_trianguloProductoCruz_UxV(p0, p2, p3) > 0 &&
            u_trianguloProductoCruz_UxV(p0, p3, p1) > 0
        ));
};
// TRIANGULO: DELETE POR ID
const u_trianguloDeleteById = (array, id) => {
    let newArray = [];
    for(let elm of array)
        elm.id !== id ? newArray.push(elm):'';
    return newArray;
};
// CIRCULO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CIRCULO
const u_trianguloBuscaPtoClickParaRedimencionar = (x, y, triangulo) => {
    let array = u_trianguloGetPtsRedimencion(triangulo);
    let resp = '';
    if (
        array[0].x1 < x &&
        x < array[0].x2 &&
        array[0].y1 < y &&
        y < array[0].y2
    )
        resp = 'P1';
    else if (
        array[1].x1 < x &&
        x < array[1].x2 &&
        array[1].y1 < y &&
        y < array[1].y2
    )
        resp = 'P2';
    else if (
        array[2].x1 < x &&
        x < array[2].x2 &&
        array[2].y1 < y &&
        y < array[2].y2
    )
        resp = 'P3';
    return resp;
};
// CIRCULO: SI SE HIZO CLICK SOBRE UN CIRCULO, PODREMOS EDITAR ZISE U MOVER
const u_trianguloClickSobreTriangulo = (trianguloSelect, mouse) => {
    if (trianguloSelect) {
        mouse.triangulo_mover = true;
        mouse.triangulo_mover_pts = false;
        mouse.triangulo_seleccionar_pts = true;
    } else{
        mouse.triangulo_mover = false;
        mouse.triangulo_mover_pts = false;
        mouse.triangulo_seleccionar_pts =false;
    }
}
// TRIANGULO: BUSCA TRIANGULO PARA PODER MOVERLO O EDITAR SU TAMANO
const u_trianguloOpera = (context, trianguloSelect, array, mouse) => {
    if (mouse.triangulo_seleccionar_pts){
        mouse.triangulo_pto = u_trianguloBuscaPtoClickParaRedimencionar(
            mouse.pos.x, mouse.pos.y, trianguloSelect
        );
        if(mouse.triangulo_pto != '') {
            mouse.triangulo_mover = false;
            mouse.triangulo_mover_pts = true;
        } else {
            mouse.triangulo_mover = false;
            mouse.triangulo_mover_pts = false; // move_size
            mouse.triangulo_seleccionar_pts = false;
        }
    }
    if (!mouse.triangulo_seleccionar_pts){
        trianguloSelect = u_trianguloGetClick(context, array, mouse.pos.x, mouse.pos.y);
        u_trianguloClickSobreTriangulo(trianguloSelect, mouse);
    }
    return trianguloSelect;
}
// TRIANGULO: MOVER
const u_trianguloMover = (triangulo, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    triangulo.x1 = triangulo.x1 + recorrido_x;
    triangulo.y1 = triangulo.y1 + recorrido_y;
    triangulo.x2 = triangulo.x2 + recorrido_x;
    triangulo.y2 = triangulo.y2 + recorrido_y;
    triangulo.x3 = triangulo.x3 + recorrido_x;
    triangulo.y3 = triangulo.y3 + recorrido_y;
    return triangulo;
};
// TRIANGULO: UPDATE ZISE
const u_trianguloUpdateZise = (triangulo, mouse) => {
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    switch (mouse.triangulo_pto) {
        case 'P1':
            triangulo.x1 = triangulo.x1 + recorrido_x;
            triangulo.y1 = triangulo.y1 + recorrido_y;
            break;
        case 'P2':
            triangulo.x2 = triangulo.x2 + recorrido_x;
            triangulo.y2 = triangulo.y2 + recorrido_y;
            break;
        case 'P3':
            triangulo.x3 = triangulo.x3 + recorrido_x;
            triangulo.y3 = triangulo.y3 + recorrido_y;
            break;
        default:
            console.log('ocurrio un error: u_trianguloUpdateZise');
            break;
    }
    return triangulo;
};
export {
    u_trianguloGraficaH,
    u_trianguloOpera,
    u_trianguloMover,
    u_trianguloBordeSegmentado,
    u_trianguloUpdateZise,
    u_trianguloGrafica,
    u_trianguloGetId,
    u_trianguloDeleteById,
    u_triangleDraw,
    u_triangleClickTrue
}