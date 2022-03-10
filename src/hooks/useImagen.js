import { useState } from 'react';

const initialStateImagen = {
    active: false,
    id: 0,
    x_ini: 0,
    y_ini: 0,
    x_fin: 0,
    y_fin: 0,
    historiaImagen: [],
};

const useImagen = () => {
    const [stateImagen, setStateImagen] = useState(initialStateImagen);

    const s_imagenUpdateActive = (valor) => {
        setStateImagen({
            ...stateImagen,
            active: valor,
        })
    };
    const s_imagenAddHId = (imagen, id) => {
        setStateImagen({
            ...stateImagen,
            id: id,
            historiaImagen: [...stateImagen.historiaImagen, imagen],
        });
    };
    return {
        stateImagen,
        s_imagenUpdateActive,
        s_imagenAddHId,
    }
}

export default useImagen;