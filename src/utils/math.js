// ISNAN: verifa que un dato sea numero o no, returna true o false
export const isNumericValue = (value) => {
    return !isNaN(value);
}

// ISINTEGER: Verifica que un numero sea o no de tipo entero, return true o false:
export const isIntegerValue = (value) => {
    return Number.isInteger(value);
}

// PARSEINT: Convierte a integer un string: return integer o NaN si no es numero
export const converInteger = (value) => {
    return parseInt(value);
}

// PARSEFLOAT: Convierte a FLOAT un string: return float o NaN si no es decimal
export const converFloat = (value) => {
    return parseFloat(value);
}

// MULTIPLICACION:
export const multiplicacion = (a, b) => {
    return a * b;
}

// DIVISION:
export const division = (a, b) => {
    return a / b;
}

// SUMA:
export const suma = (a, b) => {
    return a + b;
}

// RESTA:
export const resta = (a, b) => {
    return a - b;
}

// RAIZ CUADRADA:
export const raiz = (radicando, indice = 2) => {
    if (indice === 2) return Math.sqrt(radicando);
    else return Math.pow(radicando, 1/indice);
}

// POTENCIA:
export const potencia = (base, exponente) => {
    return Math.pow(base, exponente);
}

// PARTE ENTERA:
export const getParteEntera = (decimal) => {
    return Math.trunc(decimal);
}
// PARTE DECIMAL
export const getParteDecimal = (decimal) => {
    let entero = Math.trunc(decimal);
    entero < 0 ? entero = -entero: '';
    return decimal - entero;
}

export const sinX = (x) => {
    // let radianes = Math.sin(x);
    let angulo = Number((Math.sin(x * Math.PI / 180)).toFixed(10));
    return angulo;
};
export const arcoSinX = (x) => {
    let radianes = Math.asin(x);
    let angulo = Number((radianes / (Math.PI / 180)).toFixed(10));
    return angulo;
};
export const cosX = (x) => {
    let angulo = Number((Math.cos(x * Math.PI / 180)).toFixed(10));
    return angulo;
};
export const arcoCosX = (x) => {
    // console.log('acos:', x);
    let radianes = Math.acos(x);
    let angulo = Number((radianes / (Math.PI / 180)).toFixed(10));
    return angulo;
};
export const tanX = (x) => {
    // console.log('tan:', x);
    let angulo = Number((Math.tan(x * Math.PI / 180)).toFixed(10));
    angulo = Number(angulo.toFixed(10));
    return angulo;
};
export const arcoTanX = (x) => {
    // console.log('atan:', x);
    let radianes = Math.atan(x);
    let angulo = Number((radianes / (Math.PI / 180)).toFixed(10));
    return angulo;
};
export const convertirRadianesGrados = (radian) => {
    return radian * (180 / Math.PI);
};
export const convertirGradosRadianes = (grado) => {
    return (grado * Math.PI) / 180;
};
export const redondeo1Dec = (x) => {
    return x.toFixed(1) * 1;
};
export const redondeo2Dec = (x) => {
    return x.toFixed(2) * 1;
};
export const redondeo3Dec = (x) => {
    return x.toFixed(3) * 1;
};


export const convierteDecimal_GMS = (decimal) => {
    let resp = {
        grado: 0,
        minuto: 0,
        segundo: 0,
        decimal: decimal,
    };
    let grados = getParteEntera(decimal);
    let deci = getParteDecimal(decimal);
    deci = deci * 60;

    let minutos = getParteEntera(deci);
    deci = getParteDecimal(deci);
    deci = deci * 60;

    let segundos = deci.toFixed(2);

    resp.grado = grados;
    resp.minuto = minutos;
    resp.segundo = segundos;
    return resp;
}