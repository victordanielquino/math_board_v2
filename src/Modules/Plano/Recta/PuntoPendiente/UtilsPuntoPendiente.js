import {u_rectaEcuacionPuntoPendiente, u_rectSearchX, u_rectSearchY} from "../../../../utils/geometriaAnalitica";

const u_puntoPendienteDrawLine = (context, p1, p2, color, segment, lineWidth = 1) => {
    context.lineWidth = lineWidth;
    context.strokeStyle = (color === 'yellow') ? 'orange' : color;
    segment
        ? context.setLineDash([5, 5])
        : context.setLineDash([0, 0]);
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
}
export const u_puntoPendienteConverPtoReal = (plano, p) => {
    // p: {x, y}
    let x = plano.h + (p.x) * plano.width_cuadricula;
    let y = plano.k + (- p.y) * plano.width_cuadricula;
    return {x, y};
}
export const u_rectaDrawEcuacionPuntoPendiente = (context, plano, elm, width = 2) => {
    // verificamos que los puntos a buscar esten dentro del plano
    let ptoReal1 = {}, ptoReal2 = {};
    let xMin = plano.x_value[0];
    let xMay = plano.x_value[plano.x_value.length - 1];
    let yMin = - plano.y_value[plano.y_value.length - 1];
    let yMay = - plano.y_value[0];
    let rec = u_rectaEcuacionPuntoPendiente(elm.p, elm.m);
    if (rec.a !== 0 && rec.b !== 0) {
        // rectas validas
        let x = xMin;
        let y = u_rectSearchY(rec, xMin);
        if (y < yMin) {
            y = yMin;
            x = u_rectSearchX(rec, yMin);
        } else {
            if (y > yMay) {
                y = yMay;
                x = u_rectSearchX(rec, yMay);
            }
        }
        let pto1 = {x: x, y: y};

        x = xMay;
        y = u_rectSearchY(rec, xMay);
        if (y < yMin) {
            y = yMin;
            x = u_rectSearchX(rec, yMin);
        } else {
            if (y > yMay) {
                y = yMay;
                x = u_rectSearchX(rec, yMay);
            }
        }
        let pto2 = {x: x, y: y};
        ptoReal1 = u_puntoPendienteConverPtoReal(plano, pto1);
        ptoReal2 = u_puntoPendienteConverPtoReal(plano, pto2);
        u_puntoPendienteDrawLine(context, ptoReal1, ptoReal2, elm.color, false, width);
    } else {
        if (rec.a === 0 && rec.b !== 0) {
            // recta paralela al eje x
            let x = xMin;
            let y = 0;
            let pto1 = {x: x, y: y};

            x = xMay;
            y = 0;
            let pto2 = {x: x, y: y};
            ptoReal1 = u_puntoPendienteConverPtoReal(plano, pto1);
            ptoReal2 = u_puntoPendienteConverPtoReal(plano, pto2);
            u_puntoPendienteDrawLine(context, ptoReal1, ptoReal2, elm.color, false, width);
        } else {
            if (rec.a !== 0 && rec.b === 0) {
                // recta paralela al eje y:
                let x = 0;
                let y = yMin;
                let pto1 = {x: x, y: y};

                x = 0;
                y = yMay;
                let pto2 = {x: x, y: y};
                ptoReal1 = u_puntoPendienteConverPtoReal(plano, pto1);
                ptoReal2 = u_puntoPendienteConverPtoReal(plano, pto2);
                u_puntoPendienteDrawLine(context, ptoReal1, ptoReal2, elm.color, false, width);
            }
        }
    }
}