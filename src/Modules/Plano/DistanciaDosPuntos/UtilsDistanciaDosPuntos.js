const u_distanciaDrawLine = (context, p1, p2, color, segment, lineWidth = 1) => {
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
export const u_distanciaConverPtoReal = (plano, p) => {
    // p: {x, y}
    let x = plano.h + (p.x) * plano.width_cuadricula;
    let y = plano.k + (- p.y) * plano.width_cuadricula;
    return {x, y};
}
export const u_distanciaDistanciaEntreDosPuntos = (context, plano, elm, width = 2) => {
    // verificamos que los puntos a buscar esten dentro del plano
    let ptoReal1 = u_distanciaConverPtoReal(plano, elm.p1);
    let ptoReal2 = u_distanciaConverPtoReal(plano, elm.p2);
    if (plano.x_ini < ptoReal1.x && ptoReal1.x < plano.x_fin && plano.y_ini < ptoReal1.y && ptoReal1.y < plano.y_fin
        && plano.x_ini < ptoReal2.x && ptoReal2.x < plano.x_fin && plano.y_ini < ptoReal2.y && ptoReal2.y < plano.y_fin) {
        u_distanciaDrawLine(context, ptoReal1, ptoReal2, elm.color, false, width);
    }
}