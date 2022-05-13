import {arcoTanX, division, multiplicacion, potencia, raiz, resta, suma, tanX} from "./math";
import {isObjectEmpty}                                                         from "./utils";

export const u_distanciaEntreDosPtos = (p1, p2) => {
    let d = potencia(p2.x - p1.x, 2) + potencia(p2.y - p1.y, 2);
    d = raiz(d);
    return d;
}

// RECTA: Pendiente de la ecuacion de una recta
export const pendienteToRect = (rec) => {
    // rec: ax + by + c = 0
    // si b = 0, la pendiente es infiinita;
    let pendiente = 0;
    if (rec.b !== 0)
        pendiente = -rec.a/rec.b;
    return pendiente;
}
// RECTA: Pendiente de la recta que pasa por dos puntos
export const pendieteTwoPuntos = (p1, p2) => {
    // p1: (x, y), p2: (x, y)
    // si x2 - x1 = 0, la pendiente es infiinita.
    let pendiente = 0;
    if (p2.x - p1.x !== 0)
        pendiente = (p2.y - p1.y) / (p2.x - p1.x);
    return pendiente;
}
// PENDIENTE: PASA POR 2 PUNTOS
export const pendienteTwoPts = (p1, p2) => {
    let resp = 0;
    if (p1.x - p2.x !== 0) {
        resp = division(resta(p2.y, p1.y), resta(p2.x, p1.x));
    }
    return resp;
}

export const rectaQuePasaPorDosPtos = (p1, p2) => {
    // p1(x, y), p2(x, y)
    // ecuacion: ax + by +c = 0
    let recta = { a:0, b:0, c:0 };
    recta.a = p2.y - p1.y;
    recta.b = p1.x - p2.x;
    //recta.c = p1.y * (p1.x - p2.x) - p1.x * (p1.y - p2.y);
    recta.c = p2.x * p1.y - p1.x * p2.y;
    recta.p1 = p1;
    recta.p2 = p2;
    return recta;
}
export const u_rectaEcuacionPuntoPendiente = (p, m) => {
    // p: {x, y}; m: {num, den};
    let pendiente = m.num / m.den;
    return {
        a: pendiente,
        b: -1,
        c: p.y - pendiente * p.x,
    };
}

export const circunferenciaConCentroRadio = (c, r) => {
    // c(h,k), r = radio
    // ecuacion: (x-h)^2 + (y-k)^2 = r^2
    // x^2 + y^2 + dx + ey + f = 0
    let circunferencia = { d:0, e:0, f:0 };
    circunferencia.d = - 2 * c.h;
    circunferencia.e = - 2 * c.k;
    circunferencia.f = (c.h * c.h) + (c.k * c.k) - (r * r);
    circunferencia.c = c;
    circunferencia.r = r;
    return circunferencia;
}

export const interseccionRectaCircunferencia = (rec, cir) => {
    // rec: recta, {a, b, c}          => ax + by + c = 0
    // cir: circunferencia: {d, e, f} => x^2 + y^2 + dx + ey + f = 0
    let resp = {x1:0, y1:0, x2: 0, y2:0};
    if (rec.a !== 0 && rec.b !== 0) {
        // sistema de ecuaciones:
        let a = (rec.a * rec.a) + (rec.b * rec.b);
        let b = (2 * rec.b * rec.c) - (rec.a * rec.b * cir.d) + (rec.a * rec.a * cir.e);
        let c = (rec.c * rec.c) - (rec.a * rec.c * cir.d) + (rec.a * rec.a * cir.f);
        let discriminante = (b * b) - (4 * a * c);

        resp.y1 = (- b + Math.sqrt(discriminante)) / (2 * a);
        resp.y2 = (- b - Math.sqrt(discriminante)) / (2 * a);
        resp.x1 = ((-rec.b * resp.y1) - rec.c) / rec.a;
        resp.x2 = ((-rec.b * resp.y2) - rec.c) / rec.a;
    } else {
        if (rec.a === 0) {
            // rec: a = 0, b = numeroB, c = numeroC;  ec: y = - numeroC / numeroB
            // sustituimos ec en la ecuacion de la circunferencia:
            let y = - rec.c / rec.b;
            // ecuacion de 2do grado: ax^2 + bx + c = 0
            let ec2g = {
                a: 1,
                b: cir.d,
                c: potencia(y, 2) + multiplicacion(cir.e, y) + cir.f,
            }
            let resultado = ecuacionDe2doGrado(ec2g);
            resp.x1 = resultado.x1;
            resp.x2 = resultado.x2;
            resp.y1 = y;
            resp.y2 = y;
        } else {
            if (rec.b === 0) {
                let x = -rec.c / rec.a;
                // ecuacion de 2do grado: ax^2 + bx + c = 0
                let ec2g = {
                    a: 1,
                    b: cir.e,
                    c: potencia(x, 2) + multiplicacion(cir.d, x) + cir.f,
                }
                let resultado = ecuacionDe2doGrado(ec2g);
                resp.y1 = resultado.x1;
                resp.y2 = resultado.x2;
                resp.x1 = x;
                resp.x2 = x;
            }
        }
    }
    return resp;
}

export const interseccionEntreDosCircunferencias = (c1, c2) => {
    // c1: => x^2 + y^2 + dx + ey + f = 0
    // c2: => x^2 + y^2 + dx + ey + f = 0

    // 1ro: rectaAux = c1 - c2;
    let rectaAux = {a:0, b:0, c:0};
    rectaAux.a = c1.d - c2.d;
    rectaAux.b = c1.e - c2.e;
    rectaAux.c = c1.f - c2.f;

    let resp = interseccionRectaCircunferencia(rectaAux, c1);
    return resp;
}

export const anguloEntreDosRectasCaso1 = (rec2, anguloIn, p) => {
    // rec2: ax + by + c = 0, p1:{x:h, y:k}, p2:{x, y}; angulo: numero, p(x, y);    pendiente(rec2) : m2
    // caso 1: hallar la recta que forma un angulo X con respecto a la recta rec2 y que interseccionan en el punto p.
    let angulo = anguloIn;
    let rec1 = {a:0, b:0, c:0};
    let m2 = 0;
    if (rec2.b === 0) {
        // si b = 0, la pendiente es infinito y la pendiente no esta definido
        // para solucionar este caso crearemos una recta constante en la horizontal
        angulo = angulo - 90;
    } else {
        m2 = -rec2.a / rec2.b;
    }
    // m1 = -a / b;  a = m2 + w;  b = w*m2 - 1
    let w = tanX(angulo);
    rec1.a = m2 + w;
    rec1.b = w * m2 - 1;
    rec1.c = -(rec1.a * p.x) - (rec1.b * p.y);
    return rec1;
}
export const anguloEntreDosRectasCaso2 = (rec1, rec2) => {
    // rec1: ax + by + c = 0
    // rec2: ax + by + c = 0

    let angulo = 0;
    let m1 = pendienteToRect(rec1);
    let m2 = pendienteToRect(rec2);
    // CASO 1: NINGUNA DE LAS RECTAS PASAN POR LOS EJES X E Y
    if (m1 !== 0 && m2 !== 0) {
        angulo = arcoTanX(division(resta(m1,m2), suma(1, multiplicacion(m1, m2))));
    } else {
        // m1 es infinito y paralelo al eje Y
        if (m1 === 0 && m2 !== 0) {
            angulo = arcoTanX(m2);
        } else {
            // m2 es infinito y paralelo al eje Y
            if (m1 !== 0 && m2 === 0) {
                angulo = arcoTanX(m1);
            } else {
                if (m1 === 0 && m2 === 0)
                    angulo = 0;
            }
        }
    }
    return angulo;
}

export const rectaPerpendicular = (rec1, p) => {
    // rec1: ax + by + c = 0, p(x, y);
    let rec2 = {
        a: rec1.b,
        b: - rec1.a,
        c: (rec1.a * p.y) - (rec1.b * p.x)
    }
    return rec2;
}

export const ecuacionDe2doGrado = (ec) => {
    // ec: a, b, c: ax^2 + by + c;
    let res = {x1:0, x2:0};
    let discriminante = (ec.b * ec.b) - (4 * ec.a * ec.c);
    res.x1 = (- ec.b + Math.sqrt(discriminante)) / (2 * ec.a);
    res.x2 = (- ec.b - Math.sqrt(discriminante)) / (2 * ec.a);
    return res;
}

// TRIANGULO: CLICK DENTRO DEL TRIANGULO
export const u_productoCruz_UxV = (p1, p2, p3) => {
    /*
    u = P1P2 = P2 -P1 = (X2, Y2) - (X1, Y1) = (X2-X1, Y2-Y1)
    V = P1P3 = P3 -P1 = (X3, Y3) - (X1, Y1) = (X3-X1, Y3-Y1)
            |  i        j    k|
    u x v = |x2-x1    y2-y1  0| = (0, 0, (x2-x1)(y3-y1) - (y2-y1)(x3-x1))
            |x3-x1    y3-y1  0|
    * */
    return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);
}
export const u_estaPtoInTriangle = (p, triangle) => {
    // p : { x, y };   triangle: { x1, y1, x2, y2, x3, y3 }
    let resp = false;
    let p0 = { x: p.x,y: p.y };
    let p1 = { x: triangle.x1, y:triangle.y1 };
    let p2 = { x: triangle.x2, y:triangle.y2 };
    let p3 = { x: triangle.x3, y:triangle.y3 };
    (
        (
            u_productoCruz_UxV(p0, p1, p2) < 0 &&
            u_productoCruz_UxV(p0, p2, p3) < 0 &&
            u_productoCruz_UxV(p0, p3, p1) < 0
        ) ||
        (
            u_productoCruz_UxV(p0, p1, p2) > 0 &&
            u_productoCruz_UxV(p0, p2, p3) > 0 &&
            u_productoCruz_UxV(p0, p3, p1) > 0
        )
    ) ? resp = true : '';
    return resp;
}

// PUTNO MEDIO ENTRE DOS PUNTOS:
export const u_ptoMedio = (p1, p2) => {
    // p1: (x, y)     p2: (x, y)
    return {x:(p1.x + p2.x)/2, y:(p1.y + p2.y)/2};
}

// RECTA: Reta paralela a "rec" y que pasa por el punto "p"
export const u_rectaParalela = (rec, p) => {
    if (rec.b === 0) {
        // la recta 'rec' es paralela al eje 'Y':
        return rectaQuePasaPorDosPtos(p, {x:p.x, y:p.y+1});
    } else {
        let m = pendienteToRect(rec);
        return {
            a: m,
            b: - 1,
            c: -(m * p.x) + p.y
        }
    }
}
// RECTA: Interseccion entre dos rectas:
export const u_intersectionnToTwoRects = (rec1, rec2) => {
    // rec1 : { a, b, c}     rec2 : { a, b, c}
    let pto = {x:-1, y:-1};

    if (rec1.b !== 0) {
        // X:
        let numerador = resta(multiplicacion(rec2.b, rec1.c), multiplicacion(rec1.b, rec2.c));
        let denominador = resta(multiplicacion(rec2.a, rec1.b), multiplicacion(rec1.a, rec2.b));
        denominador !== 0 ? pto.x = division(numerador, denominador) : pto.x = 0;
        // Y:
        numerador = - (rec1.a * pto.x) - rec1.c;
        denominador = rec1.b;
        pto.y = division(numerador, denominador);
    } else {
        if (rec1.b === 0) {
            // la recta 'rec1' es paralela al eje 'Y'
            pto.x = -rec1.c / rec1.a;
            let numerador = - (rec2.a * pto.x) - rec2.c;
            let denominador = rec2.b;
            pto.y = division(numerador, denominador);
        } else {
            console.log('caso no contemplado');
        }
    }

    return pto;
}
export const u_intersectionToTwoRects = (rec1, rec2) => {
    // rec1 : { a, b, c}     rec2 : { a, b, c}
    let pto = {x:-1, y:-1};

    if (rec1.a !== 0 && rec1.b !== 0 && rec2.a !== 0 && rec2.b !== 0) {
        let numerador = resta(multiplicacion(rec2.a, rec1.c), multiplicacion(rec1.a, rec2.c));
        let denominador = resta(multiplicacion(rec1.a, rec2.b), multiplicacion(rec2.a, rec1.b));
        denominador !== 0 ? pto.y = division(numerador, denominador) : pto.y = 0;

        numerador = - (rec1.b * pto.y) - rec1.c;
        denominador = rec1.a;
        pto.x = division(numerador, denominador);
    } else {
        if (rec1.a === 0 && rec1.b !== 0) {
            pto.y = -rec1.c / rec1.b;
            let numerador = - (rec2.b * pto.y) - rec2.c;
            let denominador = rec2.a;
            pto.x = division(numerador, denominador);
        } else {
            if (rec1.a !== 0 && rec1.b === 0) {
                pto.x = -rec1.c / rec1.a;
                let numerador = - (rec2.a * pto.x) - rec2.c;
                let denominador = rec2.b;
                pto.y = division(numerador, denominador);
            }
        }
    }

    return pto;
}
// RECTA: Angulo de inclinacion de la recta con la horizontal:
export const u_rectToDegInclination = (pendiente) => {
    return arcoTanX(pendiente);
}
// RECTA: Recta perpendicular a una recta r y que pasa por el putno p
export const u_rectToPerpendicular = (rec, p) => {
    if (rec.b === 0) {
        // la recta 'r' es paralela al eje 'Y'
        return rectaQuePasaPorDosPtos(p, {x:p.x - 1, y:p.y});
    } else {
        let m = pendienteToRect(rec);
        if (m === 0) {
            // la recta 'r' es parapalela al eje 'X'
            return rectaQuePasaPorDosPtos(p, {x:p.x, y:p.y -1});
        } else {
            let mPerpendicular = division(-1, m);
            return {
                a : mPerpendicular,
                b : -1,
                c : p.y - (mPerpendicular * p.x)
            }
        }
    }

    return '';
}
// RECTA: encutra x si y = a
export const u_rectSearchX = (rect, y) => {
    // rect: {a, b, c}
    let x = -10000;
    if (rect.a !== 0)
        x = ((- rect.b * y) - rect.c) / rect.a;
    return x;
}
// RECTA: encutra xy si x = a
export const u_rectSearchY = (rect, x) => {
    // rect: {a, b, c}
    let y = -10000;
    if (rect.b !== 0)
        y = ((- rect.a * x) - rect.c) / rect.b;
    return y;
}
// -------- PARABOLA --------
// PARABOLA: Ecuacion Canonica
export const u_parabolaEcuacionCononica = (v, p, eje) => {
    // v: {h, k};   p: 2;   eje: 'x' o 'y'
    let resp = {
        a: 1,
        b:0,
        c: - 4 * p,
        d:0,
    }
    if (eje === 'y') {
        // ecuacion: ax^2 + bx + cy + d = 0
        resp.b = - 2 * v.h;
        resp.d = Math.pow(v.h, 2) + 4 * p * v.k;
    } else {
        if (eje === 'x') {
            // ecuacion: ay^2 + by + cx + d = 0
            resp.b = - 2 * v.k;
            resp.d = Math.pow(v.k, 2) + 4 * p * v.h;
        }
    }
    return resp;
}
// PARABOLA:
export const u_parabolaSearchXY = (ecuParabola, eje, x_y) => {
    let ecu2doGrado = {};
    let resp = {};
    if (eje === 'y' || eje === 'x') {
        ecu2doGrado.a = ecuParabola.a;
        ecu2doGrado.b = ecuParabola.b;
        ecu2doGrado.c = (ecuParabola.c * x_y) + ecuParabola.d;
        resp = ecuacionDe2doGrado(ecu2doGrado);
    }
    return resp;
}
// PARABOLA: Encuentra Vertice y P de la ecuacion general
export const u_parabolaSearchVPFD = (ecuParabola, eje) => {
    // ecuParabola: {a, b, c, d};   eje: 'x' o 'y'
    let resp = {};
    if (!isObjectEmpty(ecuParabola)) {
        resp.vertice = {
            h: - ecuParabola.b / 2,
            k: (Math.pow(ecuParabola.b,2) - 4*ecuParabola.d) / (4 * ecuParabola.c),
        };
        resp.p = - ecuParabola.c / 4;
        if (eje === 'x') {
            resp.foco = {
                x: resp.vertice.h + resp.p,
                y: resp.vertice.k
            }
            resp.directriz = {
                x: resp.vertice.h - resp.p,
                y: resp.vertice.k,
            }
        } else {
            if (eje === 'y') {
                resp.foco = {
                    x: resp.vertice.h,
                    y: resp.vertice.k + resp.p,
                }
                resp.directriz = {
                    x: resp.vertice.h,
                    y: resp.vertice.k - resp.p,
                }
            }
        }
    }
    return resp;
}