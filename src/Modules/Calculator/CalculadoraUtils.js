import {
    converFloat,
    multiplicacion,
    division,
    isNumericValue,
    suma,
    resta,
    raiz,
    potencia,
    sinX, tanX, cosX, arcoSinX, arcoCosX, arcoTanX
} from "../../utils/math";
import {
    addELmEnd,
    addElmFirst, addElmIndex, deleteElmEnd,
    deleteElmIndex,
    existElm,
    getElmPosition,
    getElmPositionIndex, getTrozo, repeatElm,
    validateOpenBreak,
    convertTextInArray,
    repeatPositionOpenBreak, deleteElmFirst, juntaArrays, validateOperations
} from "../../utils/arrays";

export const formatInput = (textIn, positionCursor, value) => {
    let resp = {
        text:'',
        c: 0,
    }
    let array = Array.from(textIn);
    switch (value){
        case 'del':
            value = '';
            if (array.length > 0) {
                resp.c = -2;
                array.splice(array.length - 1, 1);
            }
            break;
        case 'ac':
            value = '';
            resp.c = - array.length - 1;
            array = [];
            break;
        case '{a}/{b}':
            resp.c = 7
            break;
        case '√{':
            resp.c = 1
            break;
        default:
            break;
    }
    (value.length > 0) ? array.splice(array.length, 0, value):'';
    resp.txt = array.join('');
    return resp;
}
const searchOperationBasic = (array, option = '+') => {
    let arrayNew = array;
    let arrayIndex = repeatElm(array, option);
    if (arrayIndex.length > 0) {
        arrayIndex.forEach(index => {
            if (isNumericValue(arrayNew[index-1]) && isNumericValue(arrayNew[index+1])){
                switch (option) {
                    case "+":
                        arrayNew[index-1] = suma(arrayNew[index-1], arrayNew[index+1]);
                        break;
                    case "-":
                        arrayNew[index-1] = resta(arrayNew[index-1], arrayNew[index+1]);
                        break;
                    case "*":
                        arrayNew[index-1] = multiplicacion(arrayNew[index-1], arrayNew[index+1]);
                        break;
                    case "÷":
                        arrayNew[index-1] = division(arrayNew[index-1], arrayNew[index+1]);
                        break;
                    case "^":
                        arrayNew[index-1] = potencia(arrayNew[index-1], arrayNew[index+1]);
                        break;
                }
                deleteElmIndex(arrayNew, index, 2);
            }
        });
    }
    return arrayNew;
}
const searchFraction = (array, option) => {
    let arrayNew = array;
    let arrayIndex = repeatElm(array, option);
    if (arrayIndex.length > 0) {
        arrayIndex.forEach(index => {
            // { a } / { b } => r
            if (array[index-3] === '{'
                && isNumericValue(arrayNew[index-2])
                && array[index-1] === '}'
                && array[index+1] === '{'
                && isNumericValue(arrayNew[index+2])
                && array[index+3] === '}'
            ){
                arrayNew[index-3] = division(arrayNew[index-2], arrayNew[index+2]);
                deleteElmIndex(arrayNew, index-2, 6);
            }
        });
    }
    return arrayNew;
}
const searchRaiz = (array, option) => {
    let arrayNew = array;
    let arrayIndex = repeatElm(array, option);
    if (arrayIndex.length > 0) {
        arrayIndex.forEach(index => {
            if (isNumericValue(array[index + 1])){
                array[index] = raiz(array[index+1]);
                deleteElmIndex(array, index+1, 1);
            } else {
                if (array[index+1] === '{' && isNumericValue(array[index + 2]) && array[index +3] === '}'){
                    array[index] = raiz(array[index+2]);
                    deleteElmIndex(array, index+1, 3);
                } else {
                    if (array[index+1] === '[' && isNumericValue(array[index + 2]) && array[index +3] === ']'
                        && array[index+4] === '{' && isNumericValue(array[index + 5]) && array[index +6] === '}'){
                        array[index] = raiz(array[index+5], array[index+2]);
                        deleteElmIndex(array, index+1, 6);
                    }
                }
            }
        });
    }
    return arrayNew;
}
const searchTrigonometria = (array, option) => {
    let arrayNew = array;
    let arrayIndex = repeatElm(array, option);
    if (arrayIndex.length > 0) {
        arrayIndex.forEach(index => {
            if (isNumericValue(array[index + 1])){
                switch (array[index]){
                    case 'sin':
                        array[index] = sinX(array[index+1]);
                        break;
                    case 'cos':
                        array[index] = cosX(array[index+1]);
                        break;
                    case 'tan':
                        array[index] = tanX(array[index+1]);
                        break;
                }
                deleteElmIndex(array, index+1, 1);
            } else {
                if (array[index+1] === '^' && isNumericValue(array[index + 2]) && isNumericValue(array[index + 3])){
                    switch (array[index]){
                        case 'sin':
                            array[index] = arcoSinX(array[index+3]);
                            break;
                        case 'cos':
                            array[index] = arcoCosX(array[index+3]);
                            break;
                        case 'tan':
                            array[index] = arcoTanX(array[index+3]);
                            break;
                    }
                    deleteElmIndex(array, index+1, 3);
                }
            }
        });
    }
    return arrayNew;
}

const operaArrayTrozo = (array) => {
    // ['(', '+ - * ÷', x, ')'] => ['(', x, ')']
    let op = array[1];
    if ((op === '+' || op === '-' || op === '*' || op === '÷') && isNumericValue(array[2])) {
        array[1] = array[2];
        deleteElmIndex(array, 1, 1);
    }
    op = array[array.length-2];
    // ['(', x, '+ - * ÷', ')'] => ['(', x, ')']
    if ((op === '+' || op === '-' || op === '*' || op === '÷')) {
        array[array.length-2] = array[array.length-1];
        deleteElmIndex(array, array.length-1, 1);
    }
    if (array[0] === '('){
        deleteElmFirst(array);
        deleteElmEnd(array)
    }

    // sin:
    if (existElm(array,'sin')) {
        array = searchTrigonometria(array, 'sin');
        //console.log('sin:',array);
    }
    // cos:
    if (existElm(array,'cos')) {
        array = searchTrigonometria(array, 'cos');
        //console.log('cos:',array);
    }
    // tan:
    if (existElm(array,'tan')) {
        array = searchTrigonometria(array, 'tan');
        //console.log('tan:',array);
    }

    // 4to: Raiz:
    if (existElm(array,'√')) {
        array = searchRaiz(array, '√');
        //console.log('raiz:',array);
    }
    // 4to: Fraction:
    if (existElm(array,'/')) {
        array = searchFraction(array, '/');
        //console.log('fraction:',array);
    }
    // 4to: Potencia:
    if (existElm(array,'^')) {
        array = searchOperationBasic(array, '^');
        //console.log('potencia:',array);
    }
    // 1ro: divisiones:
    if (existElm(array,'÷')) {
        array = searchOperationBasic(array, '÷');
        //console.log('division:',array);
    }
    // 2do: multiplicaciones:
    if (existElm(array,'*')) {
        array = searchOperationBasic(array, '*');
        //console.log('multiplicacin:',array);
    }
    // 3ro: sumas:
    if (existElm(array,'+')) {
        array = searchOperationBasic(array, '+');
        //console.log('suma:',array);
    }
    return array;
}
export const pressIgual = (text) => {
    let llaves = [{opens: '[', breaks:']'}, {opens: '{', breaks:'}'}, {opens: '(', breaks:')'}];
    text = '(' + text + ')';
    let array = convertTextInArray(text);
    array = validateOperations(array);
    let arrayAux = array;
    //console.log(array);
    if (validateOpenBreak(array)){
        let n = llaves.length;
        let i = 0;
        while (i < n) {
            let llave = llaves[i];
            let arrayIndex = repeatPositionOpenBreak(arrayAux, llave.opens, llave.breaks);
            //console.log('arrayAux:', arrayAux);
            //console.log('arrayIndex: ', arrayIndex);
            //console.log('llave:', llave)
            for (let index of arrayIndex) {
                //console.log('index:', index);
                let arrayFirst = getTrozo(arrayAux, 0, index.lefth -1);
                let arrayTrozo = getTrozo(arrayAux, index.lefth, index.right);
                //console.log('trozo', arrayTrozo);
                let l1 = arrayTrozo.length;
                let arrayEnd = getTrozo(arrayAux, index.right+1, arrayAux.length-1);

                let arrayResp = operaArrayTrozo(arrayTrozo);
                let l2 = arrayResp.length;
                //console.log(l1, l2);
                arrayAux = juntaArrays(arrayFirst, arrayResp);
                arrayAux = juntaArrays(arrayAux, arrayEnd);

                for(let indexAux of arrayIndex){
                    if (index.lefth < indexAux.lefth)
                        indexAux.lefth = indexAux.lefth - (l1-l2);
                    if (index.right < indexAux.right)
                        indexAux.right = indexAux.right - (l1-l2);
                }
                //console.log('new:', arrayAux);
            }
            i++;
        }
    }
    return arrayAux[0];
}