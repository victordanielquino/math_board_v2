import {addELmEnd} from "../../utils/arrays";
import {
    anguloEntreDosRectasCaso1,
    circunferenciaConCentroRadio, u_distanciaEntreDosPtos, interseccionRectaCircunferencia, rectaPerpendicular,
    rectaQuePasaPorDosPtos
} from "../../utils/geometriaAnalitica";

export const u_searchVertex = (n, v1, centro, radio, context) => {
    console.log('n:', n, v1, centro, radio);
    // n: nro de vertices;  v1: {x, y}; centro:{h, k}
    let e_cir = circunferenciaConCentroRadio({h:centro.h, k:centro.k}, radio);  // ecuacion de la circunferencia
    let arrayVertex = [];
    let v = v1;
    let angulo = 360 / n;
    if (angulo === 90) {
        let e_rec1 = rectaQuePasaPorDosPtos(
            {x:centro.h, y:centro.k},
            {x:v.x, y:v.y}
        );
        let e_rec2 = rectaPerpendicular(e_rec1, {x: centro.h, y: centro.k});
        let resp = interseccionRectaCircunferencia(e_rec2, e_cir); // resp = {x1, y1, x2, y2}
        addELmEnd(arrayVertex, v1);
        addELmEnd(arrayVertex, {x: resp.x1, y: resp.y1});
        addELmEnd(arrayVertex, {x: centro.h - (v1.x - centro.h), y: centro.k - (v1.y - centro.k) });
        addELmEnd(arrayVertex, {x: resp.x2, y: resp.y2});
    } else {
        for (let i = 0; i < n; i++) {
            addELmEnd(arrayVertex, v);
            let e_rec1 = rectaQuePasaPorDosPtos(
                {x:centro.h, y:centro.k},
                {x:v.x, y:v.y}
            );
            let e_rec2 = anguloEntreDosRectasCaso1(e_rec1, angulo, {x: centro.h, y: centro.k});
            let resp = interseccionRectaCircunferencia(e_rec2, e_cir); // resp = {x1, y1, x2, y2}
            let d1 = u_distanciaEntreDosPtos({x: v.x, y: v.y}, {x: resp.x1, y: resp.y1});
            let d2 = u_distanciaEntreDosPtos({x: v.x, y: v.y}, {x: resp.x2, y: resp.y2});
            if (angulo > 90) {
                if (d1 > d2) {
                    v = {x: resp.x1, y: resp.y1}
                } else {
                    v = {x: resp.x2, y: resp.y2};
                }
            } else {
                if (d1 < d2) {
                    v = {x: resp.x1, y: resp.y1}
                } else {
                    v = {x: resp.x2, y: resp.y2};
                }
            }
        }
    }
    console.log('arrayVertex:', arrayVertex)
    return arrayVertex;
}

export const u_geometricDraw = (context, geometricFig, bordeBool) => {
    if (geometricFig.arrayVertex.length >= 3) {
        addELmEnd(geometricFig.arrayVertex, geometricFig.arrayVertex[0]);
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
        (geometricFig.fondoColor != 'white') ? context.fill(): '';
        (geometricFig.bordeColor != 'white') ? context.stroke(): '';
        context.closePath();

        bordeBool ? u_geometricDrawCircleWithRadioSegment(context, geometricFig):'';
    }
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

// GEOMETRIC: BUSCA GEOMETRIC PARA PODER MOVERLO O EDITAR SU TAMANO
export const u_geometricOpera = (geometricSelect, elm, mouse) => {
    geometricSelect = u_textGetClick(elm, mouse.pos.x, mouse.pos.y);
    u_textClickSobreText(geometricSelect, mouse);
    return geometricSelect;
}
// GEOMETRIC: GET
const u_geomtricGetClick = (geometricFig, x, y) => {
    let resp = '';

    /*(elm.x_ini < x && x < elm.x_fin && elm.y_ini < y && y < elm.y_fin)
        ? resp = elm:'';*/
    return resp;
};