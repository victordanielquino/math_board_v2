const u_puntoDrawArc = (context, centro, radio, color) => {
    context.fillStyle = (color === 'yellow') ? 'orange' : color;
    context.beginPath();
    context.arc(centro.h, centro.k, radio, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
}
const u_puntoDrawLine = (context, p1, p2, color, segment, lineWidth = 1) => {
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
export const u_puntoDraw = (context, plano, elm) => {
    let widthCuadricula = plano.width_cuadricula;
    let x = plano.h + (elm.p.x) * widthCuadricula;
    let y = plano.k + (- elm.p.y) * widthCuadricula;
    if (plano.x_ini < x && x < plano.x_fin && plano.y_ini < y && y < plano.y_fin) {
        // punto:
        u_puntoDrawArc(context, {h: x, k: y}, 5, elm.color);
        // lineas segmentadas:
        if (elm.p.x !== 0 && elm.p.y !== 0) {
            let p1 = {x: x, y: plano.k};
            let p2 = {x: x, y: y}
            u_puntoDrawLine(context, p1, p2, elm.color, true, 2);
            p1 = {x: plano.h, y: y};
            p2 = {x: x, y: y}
            u_puntoDrawLine(context, p1, p2, elm.color, true, 2);
        }
    }
}