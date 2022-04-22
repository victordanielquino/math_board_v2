import { useState } from 'react';
const initialStateScissor = {
    active: false,
    x_ini: 0,
    y_ini: 0,
    x_fin: 0,
    y_fin: 0,
    canvas: '',
    scissor: {},
};

const useScissor = () => {
    const [stateScissor, setStateScissor] = useState(initialStateScissor);

    const h_scissorSetActive = (value) => {
        setStateScissor({
            ...stateScissor,
            active: value,
        });
    };

    const h_scissorSetCanvas = (value) => {
        setStateScissor({
            ...stateScissor,
            canvas: value,
        });
    };
    const h_scissorSetXYIniFin = (x_ini, y_ini, x_fin, y_fin) => {
        setStateScissor({
            ...stateScissor,
            x_ini: x_ini,
            y_ini: y_ini,
            x_fin: x_fin,
            y_fin: y_fin,
        })
    }
    const h_scissorSetScissor = (scissor) => {
        setStateScissor({
            ...stateScissor,
            scissor: scissor,
        })
    }

    return {
        stateScissor,
        h_scissorSetActive,
        h_scissorSetCanvas,
        h_scissorSetXYIniFin,
        h_scissorSetScissor,
    }
}

export default useScissor;