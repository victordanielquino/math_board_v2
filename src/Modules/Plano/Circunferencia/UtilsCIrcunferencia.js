const u_circunferenciaDrawArc = (context, circulo, color, segment, lineWidth = 1) => {
    context.lineWidth = lineWidth;
    context.strokeStyle = (color === 'yellow') ? 'orange' : color;
    segment
        ? context.setLineDash([5, 5])
        : context.setLineDash([0, 0]);
    context.beginPath();
    context.arc(circulo.h, circulo.k, circulo.r, 0, 2*Math.PI, true);
    context.stroke();
    context.closePath();
}
export const u_circunferenciaConverPtoReal = (plano, p) => {
    // p: {x, y}
    let x = plano.h + (p.x) * plano.width_cuadricula;
    let y = plano.k + (- p.y) * plano.width_cuadricula;
    return {x, y};
}
export const u_circunferenciaDraw = (context, plano, elm, width = 2) => {
    // verificamos que los puntos a buscar esten dentro del plano
    let ptoReal1 = u_circunferenciaConverPtoReal(plano, {x:elm.cir.h, y:elm.cir.k});
    if (plano.x_ini < ptoReal1.x && ptoReal1.x < plano.x_fin && plano.y_ini < ptoReal1.y && ptoReal1.y < plano.y_fin) {
        let circunferencia = {
            h: ptoReal1.x,
            k: ptoReal1.y,
            r: elm.cir.r * plano.width_cuadricula,
        }
        u_circunferenciaDrawArc(context, circunferencia, elm.color, false, width);
    }
}