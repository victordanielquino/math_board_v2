import {addELmEnd} from "../../utils/arrays";
import {
    anguloEntreDosRectasCaso1,
    circunferenciaConCentroRadio, u_distanciaEntreDosPtos, interseccionRectaCircunferencia, rectaPerpendicular,
    rectaQuePasaPorDosPtos
} from "../../utils/geometriaAnalitica";

export const u_searchVertex = (n, v1, centro, radio) => {
    // n: nro de vertices;  v1: {x, y}; centro:{h, k}
    // ======== VERTICES DEL BORDE SEGMENTADO:
    let v1A = {};
    let e_rec1A = rectaQuePasaPorDosPtos(
        {x:centro.h, y:centro.k},
        {x:v1.x, y:v1.y}
    );
    let e_cir1A = circunferenciaConCentroRadio({h:centro.h, k:centro.k}, radio+5);  // ecuacion de la circunferencia
    let resp1A = interseccionRectaCircunferencia(e_rec1A, e_cir1A); // resp1A = {x1, y1, x2, y2}
    let d1A = u_distanciaEntreDosPtos({x:v1.x, y:v1.y}, {x: resp1A.x1, y: resp1A.y1});
    let d2A = u_distanciaEntreDosPtos({x:v1.x, y:v1.y}, {x: resp1A.x2, y: resp1A.y2});
    if (d1A < d2A) {
        v1A = {x: resp1A.x1, y: resp1A.y1}
    } else {
        v1A = {x: resp1A.x2, y: resp1A.y2};
    }
    let arrayA = [];
    // ======== VERTICES DE LA FIGURA GEOMETRICA:
    let e_cir1 = circunferenciaConCentroRadio({h:centro.h, k:centro.k}, radio);  // ecuacion de la circunferencia
    let v = v1;
    let angulo = 360 / n;
    let array = [];
    for (let i = 0; i < n; i++) {
        array.push(v);
        arrayA.push(v1A);
        // VERTICES DE LA FIGURA:
        let e_rec1 = rectaQuePasaPorDosPtos(
            {x:centro.h, y:centro.k},
            {x:v.x, y:v.y}
        );
        let e_rec2 = anguloEntreDosRectasCaso1(e_rec1, angulo, {x: centro.h, y: centro.k});
        let resp = interseccionRectaCircunferencia(e_rec2, e_cir1); // resp = {x1, y1, x2, y2}
        let d1 = u_distanciaEntreDosPtos({x: v.x, y: v.y}, {x: resp.x1, y: resp.y1});
        let d2 = u_distanciaEntreDosPtos({x: v.x, y: v.y}, {x: resp.x2, y: resp.y2});
        if (d1 < d2) {
            v = {x: resp.x1, y: resp.y1}
        } else {
            v = {x: resp.x2, y: resp.y2};
        }
        // VERTICES DEL BORDE SEGMENTADO DE LA FIGURA:
        resp = interseccionRectaCircunferencia(e_rec2, e_cir1A); // resp = {x1, y1, x2, y2}
        d1 = u_distanciaEntreDosPtos({x: v1A.x, y: v1A.y}, {x: resp.x1, y: resp.y1});
        d2 = u_distanciaEntreDosPtos({x: v1A.x, y: v1A.y}, {x: resp.x2, y: resp.y2});
        if (d1 < d2) {
            v1A = {x: resp.x1, y: resp.y1}
        } else {
            v1A = {x: resp.x2, y: resp.y2};
        }
    }
    return [array, arrayA];
}

export const u_geometricDraw = (context, geometricFig, bordeBool) => {
    context.lineWidth = geometricFig.bordeGrosor;
    context.strokeStyle = geometricFig.bordeColor;
    context.fillStyle = geometricFig.fondoColor;
    context.setLineDash([0, 0]);

    context.beginPath();
    geometricFig.arrayVertex.forEach((vertex, index) => {
            (index === 0)
                ? context.moveTo(vertex.x, vertex.y)
                : context.lineTo(vertex.x, vertex.y);
        }
    );
    context.lineTo(geometricFig.arrayVertex[0].x, geometricFig.arrayVertex[0].y);
    (geometricFig.fondoColor != 'white') ? context.fill(): '';
    (geometricFig.bordeColor != 'white') ? context.stroke(): '';
    context.closePath();

    bordeBool ? u_geometricDrawCircleWithRadioSegment(context, geometricFig):'';
}
// GEOMETRIC: Grafica borde segmentado para mover
export const u_geometricDrawBorderSegment = (context, geometricFig) => {
    let array = geometricFig.arrayVertexSegment;
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.setLineDash([5, 5]);

    context.beginPath();
    array.forEach((vertex, index) => {
            (index === 0)
                ? context.moveTo(vertex.x, vertex.y)
                : context.lineTo(vertex.x, vertex.y);
        }
    );
    context.lineTo(array[0].x, array[0].y);
    context.stroke();
    context.closePath();

    context.fillStyle = 'red';
    context.beginPath();
    // punto en el centro:
    context.arc(geometricFig.h, geometricFig.k, 3, 0, 2*Math.PI, true);
    // punto en el extremo del radio:
    context.arc(geometricFig.radioX, geometricFig.radioY, 10, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
    // radio:
    context.beginPath();
    context.moveTo(geometricFig.h, geometricFig.k);
    context.lineTo(geometricFig.radioX, geometricFig.radioY);
    context.stroke();
    context.closePath();
}
// GEOMETRIC: circulo segmentado sin fondo con radio
export const u_geometricDrawCircleWithRadioSegment = (context, geometricFig) => {
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.setLineDash([10, 5]);
    // circulo segmentado:
    /*context.beginPath();
    context.arc(geometricFig.h, geometricFig.k, geometricFig.radio, 0, 2*Math.PI, true);
    context.stroke();
    context.closePath();*/
    // radio:
    context.beginPath();
    context.moveTo(geometricFig.h, geometricFig.k);
    context.lineTo(geometricFig.radioX, geometricFig.radioY);
    context.stroke();
    context.closePath();

    context.fillStyle = 'red';
    context.beginPath();
    // punto en el centro:
    context.arc(geometricFig.h, geometricFig.k, 5, 0, 2*Math.PI, true);
    // punto en el extremo del radio:
    context.arc(geometricFig.radioX, geometricFig.radioY, 7, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
}

export const u_geometricDrawLine = (context, p1, p2) =>{
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.setLineDash([10, 5]);

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
}
export const u_geometricSearchPtoResize = (x, y, geometricFig) => {
    // radio = 10; geometricFig.radioX, geometricFig.radioY
    let d = u_distanciaEntreDosPtos({x:x, y:y}, {x:geometricFig.radioX, y:geometricFig.radioY});
    if (d < 10) return 'ini'; else return '';
}
// GEOMETRIC: RESIZE
export const u_geometricResize = (geometricFig, mouse) => {
    console.log('resize');
    geometricFig.radioX = mouse.pos.x;
    geometricFig.radioY = mouse.pos.y;
    geometricFig.radio = u_distanciaEntreDosPtos(
        {x: geometricFig.h, y:geometricFig.k},
        {x: geometricFig.radioX, y:geometricFig.radioY}
    );
    let resp = u_searchVertex(
        geometricFig.nroVertex,
        {x: mouse.pos.x, y: mouse.pos.y},
        {h:geometricFig.h, k:geometricFig.k},
        geometricFig.radio
    );
    geometricFig.arrayVertex = resp[0];
    geometricFig.arrayVertexSegment = resp[1];
    return geometricFig;
}

// GEOMETRIC: BUSCA GEOMETRIC PARA PODER MOVERLO O EDITAR SU TAMANO
export const u_geometricOpera = (geometricSelect, elm, mouse) => {
    if (mouse.geometric_selection_pts){
        mouse.geometric_pto = u_geometricSearchPtoResize(mouse.pos.x, mouse.pos.y, geometricSelect);
        console.log('je:', mouse.geometric_pto);
        if (mouse.geometric_pto != '') {
            mouse.geometric_mover = false;
            mouse.geometric_mover_pts = true;
        } else {
            mouse.geometric_mover = false;
            mouse.geometric_mover_pts = false;
            mouse.geometric_selection_pts = false;
        }
    }
    if (!mouse.geometric_selection_pts) {
        geometricSelect = u_geometricGetClick(elm, mouse.pos.x, mouse.pos.y)
        u_geometricClickSobreGeometric(geometricSelect, mouse);
    }
    return geometricSelect;
}
export const u_geometricClickSobreGeometric = (geometricSelect, mouse) => {
    if (geometricSelect) {
        mouse.geometric_mover = true;
        mouse.geometric_mover_pts = false;
        mouse.geometric_selection_pts = true;
    } else{
        mouse.geometric_mover = false;
        mouse.geometric_mover_pts = false;
        mouse.geometric_selection_pts = false;
    }
}
// GEOMETRIC: GET
export const u_geometricGetClick = (geometricFig, x, y) => {
    let resp = '';
    let distaciaCentroPto = u_distanciaEntreDosPtos(
        {x:geometricFig.h, y:geometricFig.k},
        {x:x, y:y}
    );
    if (distaciaCentroPto < geometricFig.radio)
        resp = geometricFig
    return resp;
};

// GEOMETRIC: MOVER
export const u_geometricMove = (geometric, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;

    geometric.arrayVertex.forEach((elm, index) => {
        elm.x = elm.x + recorrido_x;
        elm.y = elm.y + recorrido_y;
        geometric.arrayVertexSegment[index].x += recorrido_x;
        geometric.arrayVertexSegment[index].y += recorrido_y;
    });
    geometric.h = geometric.h + recorrido_x;
    geometric.k = geometric.k + recorrido_y;
    geometric.radioX = geometric.radioX + recorrido_x;
    geometric.radioY = geometric.radioY + recorrido_y;
    geometric.radioX_ = geometric.radioX_ + recorrido_x;
    geometric.radioY_ = geometric.radioY_ + recorrido_y;
    return geometric;
};
// GET
export const u_geometricClickTrue = (geometricFig, x, y) => {
    let d = u_distanciaEntreDosPtos({x:x, y:y}, {x:geometricFig.h, y:geometricFig.k});
    return (d < geometricFig.radio);
};