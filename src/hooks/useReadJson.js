import { useState } from 'react';
const initialStateReadJson = {
    active: false,
    canvas: '',
};

const useReadJson = () => {
    const [stateReadJson, setStateReadJson] = useState(initialStateReadJson);

    const h_readJsonSetActive = (valor) => {
        setStateReadJson({
            ...stateReadJson,
            active: valor,
        });
    };
    const h_readJsonSetCanvas = (value) => {
        setStateReadJson({
            ...stateReadJson,
            canvas: value,
        });
    };

    return {
        stateReadJson,
        h_readJsonSetActive,
        h_readJsonSetCanvas,
    }
}

export default useReadJson;