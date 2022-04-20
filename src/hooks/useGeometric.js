import { useState } from 'react';
const initialStateGeometric = {
    active: false,
    bordeEstado: true, // si tendra borde
    bordeGrosor: 3,
    bordeColor: 'yellow',
    fondoEstado: true, // si tendra fondo
    fondoColor: 'black',
    vertices: 5,
    canvas: '',
};

const useGeometric = () => {
    const [stateGeometric, setStateGeometric] = useState(initialStateGeometric);

    const h_geometricSetActive = (valor) => {
        setStateGeometric({
            ...stateGeometric,
            active: valor,
        });
    };
    const h_geometricSetCanvas = (value) => {
        setStateGeometric({
            ...stateGeometric,
            canvas: value,
        });
    };
    const h_geometricSetVertices = (value) => {
        setStateGeometric({
            ...stateGeometric,
            vertices: value,
        });
    };
    const h_geometricSetBordecolorBordeestado = (color, estado) => {
        setStateGeometric({
            ...stateGeometric,
            bordeColor: color,
            bordeEstado: estado,
        });
    };
    const h_geometricSetFondocolorFondoestado = (color, estado) => {
        setStateGeometric({
            ...stateGeometric,
            fondoColor: color,
            fondoEstado: estado,
        });
    };
    const h_geometricSetBordeGrosor = (valor) => {
        setStateGeometric({
            ...stateGeometric,
            bordeGrosor: valor,
        });
    };
    const h_geometricSetAll = (
        colorBorde,
        colorFondo,
        bordeGrosor,
        bordeEstadoIn,
        fondoEstadoIn
    ) => {
        setStateGeometric({
            ...stateGeometric,
            bordeColor: colorBorde,
            fondoColor: colorFondo,
            bordeGrosor: bordeGrosor,
            bordeEstado: bordeEstadoIn,
            fondoEstado: fondoEstadoIn,
        });
    };

    return {
        stateGeometric,
        h_geometricSetActive,
        h_geometricSetCanvas,
        h_geometricSetVertices,
        h_geometricSetBordecolorBordeestado,
        h_geometricSetFondocolorFondoestado,
        h_geometricSetBordeGrosor,
        h_geometricSetAll,
    }
}

export default useGeometric;