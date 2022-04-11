import { useState } from 'react';
const initialStateGeometric = {
    active: false,
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

    return {
        stateGeometric,
        h_geometricSetActive,
        h_geometricSetCanvas,
    }
}

export default useGeometric;