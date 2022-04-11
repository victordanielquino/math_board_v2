import { useState } from 'react';
const initialStateCalculator = {
    active: false,
    canvas: '',
};

const useCalculator = () => {
    const [stateCalculator, setStateCalculator] = useState(initialStateCalculator);

    const h_calculatorSetActive = (valor) => {
        setStateCalculator({
            ...stateCalculator,
            active: valor,
        });
    };
    const h_calculatorSetCanvas = (value) => {
        setStateCalculator({
            ...stateCalculator,
            canvas: value,
        });
    };

    return {
        stateCalculator,
        h_calculatorSetActive,
        h_calculatorSetCanvas,
    }
}

export default useCalculator;