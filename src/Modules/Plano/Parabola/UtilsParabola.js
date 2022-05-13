import {u_parabolaEcuacionCononica, u_parabolaSearchVPFD, u_parabolaSearchXY} from "../../../utils/geometriaAnalitica";

export const u_parabolaConverPtoReal = (plano, p) => {
    // p: {x, y}
    let x = plano.h + (p.x) * plano.width_cuadricula;
    let y = plano.k + (- p.y) * plano.width_cuadricula;
    return {x, y};
}
const u_parabolaDrawLine = (context, p1, p2, color, segment, lineWidth = 1) => {
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

export const u_parabolaDrawCanonica = (context, plano, parabola, lineWidth) => {
    let v = { h:parabola.par.h, k:parabola.par.k };
    let p = parabola.par.p;
    let eje = parabola.par.eje;

    // v: {h, k};   p: 2;   eje: 'x' o 'y'
    let ptoReal = u_parabolaConverPtoReal(plano, {x:v.h, y:v.k});
    let incremento = 0.2;
    if (plano.x_ini < ptoReal.x && ptoReal.x < plano.x_fin && plano.y_ini < ptoReal.y && ptoReal.y < plano.y_fin && p !== 0) {
        let ecuParabola = u_parabolaEcuacionCononica(v, p, eje);
        let xMin = plano.x_value[0];
        let xMay = plano.x_value[plano.x_value.length - 1];
        let yMin = - plano.y_value[plano.y_value.length - 1];
        let yMay = - plano.y_value[0];
        let vertex1 = [{x:v.h, y:v.k}];
        let vertex2 = [{x:v.h, y:v.k}];
        let vertex1Real = [];
        let vertex2Real = [];
        if (p < 0) {
            incremento *= -1;
        }
        if (eje === 'x') {
            for (let i = v.h + incremento; i <= xMay && xMin <= i; i = i + incremento) {
                let resp = u_parabolaSearchXY(ecuParabola, eje, i);
                if (yMin < resp.x1 && yMin < resp.x2 && resp.x1 < yMay && resp.x2 < yMay) {
                    if (resp.x1 > resp.x2) {
                        vertex1.push({x:i, y:resp.x1});
                        vertex2.push({x:i, y:resp.x2});
                    } else {
                        vertex1.push({x:i, y:resp.x2});
                        vertex2.push({x:i, y:resp.x1});
                    }
                } else { break }
            }
            vertex1.forEach(elm => vertex1Real.push(u_parabolaConverPtoReal(plano, elm)));
            vertex2.forEach(elm => vertex2Real.push(u_parabolaConverPtoReal(plano, elm)));
            vertex1Real.forEach(
                (elm, index) => index !== 0
                        ? u_parabolaDrawLine(context, vertex1Real[index-1], elm, parabola.color, false, lineWidth):''
            );
            vertex2Real.forEach(
                (elm, index) => index !== 0
                    ? u_parabolaDrawLine(context, vertex2Real[index-1], elm, parabola.color, false, lineWidth):''
            );
        } else {
            if (eje === 'y') {
                for (let i = v.k + incremento; i <= yMay && yMin <= i; i = i + incremento) {
                    let resp = u_parabolaSearchXY(ecuParabola, eje, i);
                    if (xMin < resp.x1 && xMin < resp.x2 && resp.x1 < xMay && resp.x2 < xMay) {
                        if (resp.x1 > resp.x2) {
                            vertex1.push({x:resp.x1, y:i});
                            vertex2.push({x:resp.x2, y:i});
                        } else {
                            vertex1.push({x:resp.x2, y:i});
                            vertex2.push({x:resp.x1, y:i});
                        }
                    } else { break }
                }

                vertex1.forEach(elm => vertex1Real.push(u_parabolaConverPtoReal(plano, elm)));
                vertex2.forEach(elm => vertex2Real.push(u_parabolaConverPtoReal(plano, elm)));
                vertex1Real.forEach(
                    (elm, index) => index !== 0
                        ? u_parabolaDrawLine(context, vertex1Real[index-1], elm, parabola.color, false, lineWidth):''
                );
                vertex2Real.forEach(
                    (elm, index) => index !== 0
                        ? u_parabolaDrawLine(context, vertex2Real[index-1], elm, parabola.color, false, lineWidth):''
                );
            }
        }
    }
}
// PARABOLA: Ecuacion General
export const u_parabolaDrawEcuacionGeneral = (context, parabola) => {
    let resp = u_parabolaSearchVPFD(parabola.ecuParabola, parabola.eje);
    let elm = {
        par: {
            h: resp.vertice.h,
            k: resp.vertice.k,
            eje: parabola.eje,
            p: resp.p,
        },
        foco: resp.foco,
        directriz: resp.directriz,
        color: parabola.color,
    }
    return elm;
}