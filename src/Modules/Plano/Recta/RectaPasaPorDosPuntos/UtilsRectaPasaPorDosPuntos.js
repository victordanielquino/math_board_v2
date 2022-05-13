import {rectaQuePasaPorDosPtos, u_rectSearchX, u_rectSearchY} from "../../../../utils/geometriaAnalitica";
const u_rectaDrawLine = (context, p1, p2, color, segment, lineWidth = 1) => {
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
export const u_rectaConverPtoReal = (plano, p) => {
    // p: {x, y}
    let x = plano.h + (p.x) * plano.width_cuadricula;
    let y = plano.k + (- p.y) * plano.width_cuadricula;
    return {x, y};
}
export const u_rectaDrawRectaQuePasaPorDosPuntos = (context, plano, elm, width = 2, segment = false) => {
    // verificamos que los puntos a buscar esten dentro del plano
    let ptoReal1 = u_rectaConverPtoReal(plano, elm.p1);
    let ptoReal2 = u_rectaConverPtoReal(plano, elm.p2);
    if (plano.x_ini < ptoReal1.x && ptoReal1.x < plano.x_fin && plano.y_ini < ptoReal1.y && ptoReal1.y < plano.y_fin
    && plano.x_ini < ptoReal2.x && ptoReal2.x < plano.x_fin && plano.y_ini < ptoReal2.y && ptoReal2.y < plano.y_fin) {
        let xMin = plano.x_value[0];
        let xMay = plano.x_value[plano.x_value.length - 1];
        let yMin = - plano.y_value[plano.y_value.length - 1];
        let yMay = - plano.y_value[0];
        /*console.log('X:',xMin, xMay)
        console.log('Y:',yMin, yMay)*/
        let rec = rectaQuePasaPorDosPtos(elm.p1, elm.p2);
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
            ptoReal1 = u_rectaConverPtoReal(plano, pto1);
            ptoReal2 = u_rectaConverPtoReal(plano, pto2);
            u_rectaDrawLine(context, ptoReal1, ptoReal2, elm.color, segment, width);
        } else {
            if (rec.a === 0 && rec.b !== 0) {
                // recta paralela al eje x
                let x = xMin;
                let y = elm.p1.y;
                let pto1 = {x: x, y: y};

                x = xMay;
                y = elm.p2.y;
                let pto2 = {x: x, y: y};
                ptoReal1 = u_rectaConverPtoReal(plano, pto1);
                ptoReal2 = u_rectaConverPtoReal(plano, pto2);
                u_rectaDrawLine(context, ptoReal1, ptoReal2, elm.color, segment, width);
            } else {
                if (rec.a !== 0 && rec.b === 0) {
                    // recta paralela al eje y:
                    let x = elm.p1.x;
                    let y = yMin;
                    let pto1 = {x: x, y: y};

                    x = elm.p2.x;
                    y = yMay;
                    let pto2 = {x: x, y: y};
                    ptoReal1 = u_rectaConverPtoReal(plano, pto1);
                    ptoReal2 = u_rectaConverPtoReal(plano, pto2);
                    u_rectaDrawLine(context, ptoReal1, ptoReal2, elm.color, segment, width);
                }
            }
        }
    }
}