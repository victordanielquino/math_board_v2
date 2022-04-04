import { useState } from 'react';
const initialStateTriangulo = {
    active: false,
    id: 0,
    bordeEstado: true, // si tendra borde
    bordeGrosor: 5,
    bordeColor: 'yellow',
    fondoEstado: true, // si tendra fondo
    fondoColor: 'black',
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    historiaTriangulo: [],
    canvas: '',
};
const useTriangulo = () => {
    const [stateTriangulo, setStateTriangulo] = useState(initialStateTriangulo);

    const s_trianguloUpdateActive = (valor) => {
        setStateTriangulo({
            ...stateTriangulo,
            active: valor,
        });
    };

    const s_trianguloUpdateAll = (
        bordeColor,
        fondoColor,
        bordeGrosor,
        bordeEstadoIn,
        fondoEstadoIn
    ) => {
        setStateTriangulo({
            ...stateTriangulo,
            bordeColor: bordeColor,
            fondoColor: fondoColor,
            bordeGrosor: bordeGrosor,
            bordeEstado: bordeEstadoIn,
            fondoEstado: fondoEstadoIn,
        });
    };

    const s_trianguloAddHId = (triangulo, id) => {
        setStateTriangulo({
            ...stateTriangulo,
            id: id,
            historiaTriangulo: [...stateTriangulo.historiaTriangulo, triangulo],
        });
    };

    const s_trianguloUpdateBordeColorEstado = (color, estado) => {
        setStateTriangulo({
            ...stateTriangulo,
            bordeColor: color,
            bordeEstado: estado,
        });
    };

    const s_trianguloUpdateFondoColorEstado = (color, estado) => {
        setStateTriangulo({
            ...stateTriangulo,
            fondoColor: color,
            fondoEstado: estado,
        });
    };

    const s_trianguloUpdateBordeGrosor = (valor) => {
        setStateTriangulo({
            ...stateTriangulo,
            bordeGrosor: valor,
        });
    };
    const h_trianguloSetH = (newHistoria) => {
        setStateTriangulo({
            ...stateTriangulo,
            historiaTriangulo: newHistoria,
        });
    };
    const h_triangleSetCanvas = (value) => {
        setStateTriangulo({
            ...stateTriangulo,
            canvas: value,
        });
    };

    return {
        stateTriangulo,
        s_trianguloUpdateActive,
        s_trianguloUpdateBordeColorEstado,
        s_trianguloUpdateFondoColorEstado,
        s_trianguloUpdateBordeGrosor,
        s_trianguloUpdateAll,
        s_trianguloAddHId,
        h_trianguloSetH,
        h_triangleSetCanvas
    }
}
export default useTriangulo;