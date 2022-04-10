// IS ARRAY?: return true o flalse
import {converFloat, isNumericValue} from "./math";

export const isArray = (array) => {
	return Array.isArray(array);
}

// PUSH: add elm end position and return lenght the array
export const addELmEnd = (array, elm) => {
	return array.push(elm);
}

// UNSHIFTH: add elm first position and return lenght
export const addElmFirst = (array, elm) => {
	return array.unshift(elm);
}

// POP: elimina ultimo elemento del array y devuelve ese elemento
export const deleteElmEnd = (array) => {
	return array.pop();
}

// SHIFT: Elimina el primer elemento del array y devuelve ese elemento:
export const deleteElmFirst = (array) => {
	return array.shift();
}

// SLICE: Devuelve una porcion del array en un nuevo array: (la posicion fin no cuenta)
export const getPorcion = (array, ini, fin) => {
	return array.slice(ini, fin);
}

// SPLICE: Elimina n elementos desde la posicion i-esima, se modifica el arryIn pero retorna los elem eliminados
export const deleteElmIndex = (array, index, n) => {
	return array.splice(index, n);
}
// SLICE: Get trozo de array: arr.slice( [inicio, [fin), el inicio es incluido en el nuevo array, pero el fin no
export const getTrozo = (array, inicio, fin) => {
	return array.slice(inicio, fin + 1);
}

// SPLICE: Add elemento en la posicion i-esima
export const addElmIndex = (array, index, elm) => {
	return array.splice(index, 0, elm);
}

// INDEXOF: Devuelve la 1ra posiscion del elemento buscado (del principio al final), si no hay devuelve -1
export const getElmPosition = (array, elm) => {
	return array.indexOf(elm);
};
// INDEXOF: Devuelve la 1ra posiscion del elemento buscado (busca desde la posicion i-esima hasta el final), si no hay devuelve -1
export const getElmPositionIndex = (array, elm, index) => {
	return array.indexOf(elm, index);
};

// INCLUDES: Devuelve true o false si es que el elemento esta en el array
export const existElm = (array, elm) => {
	return array.includes(elm);
}

// FILTER: Crea un nuevo array con todos los elms que cumplen la condicion
export const filtro = (array) => {
	return array.filter( elm => {
		return elm.length > 5;
	})
}

// FIND: Crea un nuevo array con los primeros elementos hasta que se cumpla la condicion por primera vez, si no se cumple la condicion devuelve undefined
export const find = (array) => {
	return array.find((elm) => {
		return elm === 'prueba';
	})
}

// CONCAT: Junta 1er array al segundo
export const juntaArrays = (array1, array2) => {
	return array1.concat(array2);
}

// LENGHT: Devuelve el ultimo elemento de un arrray:
export const getEndELm = (array) => {
	return array[array.length-1];
}

// REPETICION: Retorna una array con las posiciones en las que se repite el elemento buscado:
export const repeatElm = (array, elm) => {
	let arrayIndex = [];
	let index = getElmPosition(array, elm);
	if (index !== -1) {
		do {
			addElmFirst(arrayIndex, index);
			index = getElmPositionIndex(array, elm, index+1);
		} while (index !== -1);
	}
	return arrayIndex;
}

// SPLIT, return array
export const convertTextInArray = (text, condition = '') => {
	return text.split(condition);
}

////////////////// metodos ajustados //////////////////////

// VALIDACION: ordena sumas incorrectas
const formaSuma = (array, i) => {
	// array [i] = +
	let signos = ['(', '[', '{', '*', '÷', ]
	let signosBreak = [')', ']', '}', '*', '÷', ]
	// [ '(' , '+', 3 ] => [ '(' , 3 ]
	if (existElm(signos, array[i-1]) && isNumericValue(array[i+1])) {
		array[i] = array[i+1];
		deleteElmIndex(array, i + 1, 1);
	} else {
		// [ -, +, numero ] => [ +, -numero ]
		if (array[i-1] === '-' && isNumericValue(array[i+1])) {
			array[i-1] = '+';
			array[i] = -array[i+1];
			deleteElmIndex(array, i + 1, 1);
		} else {
			// [ +, ) ] => [ ) ]
			if (existElm(signosBreak,array[i+1])) {
				array[i] = array[i+1];
				deleteElmIndex(array, i + 1, 1);
			}
		}
	}
}
// VALIDACION: ordena restas incorrectas
const formaResta = (array, i) => {
	// array[i] = '-'
	let signos = ['(', '[', '{', '*', '÷', ];
	let signosOpen = ['(', '[', '{'];
	let signosBreak = [')', ']', '}', '*', '÷', ];
	// [ '(' , '-', 3 ] => [ '(' , -3 ]
	if (existElm(signos, array[i-1]) && isNumericValue(array[i+1])) {
		array[i] = -array[i+1];
		deleteElmIndex(array, i + 1, 1);
	} else {
		// [ numero, -, numero ] => [ numero, +, -numero ]
		if (isNumericValue(array[i-1]) && isNumericValue(array[i+1])) {
			array[i] = '+';
			array[i+1] = -array[i+1];
		} else {
			// [ -, ) ] => [ ) ]
			if (existElm(signosBreak,array[i+1])) {
				array[i] = array[i+1];
				deleteElmIndex(array, i + 1, 1);
			} else {
				// [ -, ( ] => [ +, -1, *, ( ]
				if (existElm(signosOpen,array[i+1]) || array[i+1] === '√') {
					array[i] = '+';
					addElmIndex(array, i+1, -1);
					addElmIndex(array, i+2, '*');
				}
			}
		}
	}
}
// VALIDACION: forma numeros y valida su posicion
const formaNumero = (array, i, elm) => {
	elm = array[i] + elm;
	if (elm.length > 1){
		array[i] = elm;
		deleteElmIndex(array, i+1, 1);
	}
	return elm;
}
// VALIDACION: forma trigonometria:
const formaTrigonometria = (array, option='s') => {
	let arrayIndex = repeatElm(array, option);
	let signosBreak = [')', ']', '}'];
	let boolTrigonometria = false;
	if (arrayIndex.length > 0) {
		for (let index of arrayIndex){
			if (array[index] === 's' && array[index+1] === 'i' && array[index+2] === 'n') {
				array[index] = 'sin';
				boolTrigonometria = true;
			}
			else if (array[index] === 'c' && array[index+1] === 'o' && array[index+2] === 's') {
				array[index] = 'cos';
				boolTrigonometria = true;
			}
			else if (array[index] === 't' && array[index+1] === 'a' && array[index+2] === 'n') {
				array[index] = 'tan';
				boolTrigonometria = true;
			}
			boolTrigonometria ? deleteElmIndex(array, index+1, 2): '';
			boolTrigonometria = false;
			// numero, sin, numero => numero, '*', sin, numero
			if (isNumericValue(array[index-1]) || existElm(signosBreak, array[index-1]))
				addElmIndex(array, index, '*');
		}
	}
	//console.log('trigonometria:',array)
	return array;
}
export const validateOperations = (array) => {
	let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	let i = array.length -1; //  <-
	let x = '';
	while (i >= 0) {
		let elm = array[i];
		if (existElm(numeros, elm)) elm = 'num';
		else if (x.length > 0) {
			array[i + 1] = converFloat(array[i + 1]);
			x = '';
			// numero, '{ [ (' => numero, '*', '{ [ ('
			if (array[i+2] === '{' || array[i+2] === '[' || array[i+2] === '(' || array[i+2] === '√') {
				addElmIndex(array, i+2, '*');
			}
		}
		switch (elm){
			case 'num':
				x = formaNumero(array, i, x);
				break;
			case '+':
				formaSuma(array, i);
				break;
			case '-':
				formaResta(array, i);
				break;
			default:
				break;
		}
		i--;
	}
	//console.log('array:', array)
	array = formaTrigonometria(array, 's');
	array = formaTrigonometria(array, 'c');
	array = formaTrigonometria(array, 't');
	return array;
}


// VALIDACION: Verifica si es que todos los parentesis, llaves y corchetes se cierran correctamente. return true false
const isOpen = (character) => {
	return existElm(['(', '[', '{'], character);
}
const closes = (characterA, characterB) => {
	let pairs = {'(':')', '[':']', '{':'}'};
	return pairs[characterA] === characterB;
}
export const validateOpenBreak = (array) => {
	let pila = [];
	for(let elm of array){
		if (elm === '(' || elm === ')' || elm === '{' || elm === '}' || elm === '[' || elm === ']') {
			if (isOpen(elm)) {
				addELmEnd(pila, elm);
			}
			else {
				let topElm = deleteElmEnd(pila);
				if (!closes(topElm, elm)) return false;
			}
		}
	};
	return length === 0;
}

// REPETICION CON POSICION: Devuelce un array con la posicion donde abren y cierran los parentesis, llaves...
export const repeatPositionOpenBreak = (array, opens, breaks) => {
	//console.log('================================================');
	let arrayIndex = [];
	let pila = [];
	let pilaIndex = [];
	for(let i = 0; i < array.length; i++){
		let elm = array[i];
		if (elm === opens || elm === breaks) {
			if (isOpen(elm)) {
				addELmEnd(pila, elm);
				addELmEnd(pilaIndex, i);
			}
			else {
				let topElm = deleteElmEnd(pila);
				let topElmIndex = deleteElmEnd(pilaIndex);
				addELmEnd(arrayIndex, {lefth: topElmIndex, right: i});
			}
		}
	};
	return arrayIndex;
}
