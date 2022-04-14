import React, { useEffect, useContext } from 'react';
// context
import AppContext from '../../../context/AppContext';
import AppContextCirculo from "../../../context/AppContextCirculo";

// styles:
import './MenuCirculo.scss';

// components:
import PaletaGrosor from '../../PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde from '../../PaletaColor/PaletaColor';
import PaletaColorFondo from '../../PaletaColor/PaletaColor';

const MenuCirculo = () => {
    // useContext:
    const { state } = useContext(AppContext);
    const {
        stateCirculo,
        s_circuloUpdateBordeGrosor,
        s_circuloUpdateBordeColorEstado,
        s_circuloUpdateFondoColorEstado,
        s_circuloUpdateAll,
    } = useContext(AppContextCirculo);

    // LOGICA:

    // EFFECT:
    useEffect(() => {
        s_circuloUpdateBordeColorEstado(state.color, state.color !== 'white');
    }, [state.color]);

    useEffect(() => {
        s_circuloUpdateFondoColorEstado(state.colorFondo, state.colorFondo !== 'white');
    }, [state.colorFondo]);

    useEffect(() => {
        s_circuloUpdateBordeGrosor(state.grosor);
    }, [state.grosor]);

    useEffect(() => {
        s_circuloUpdateAll(
            state.color,
            state.colorFondo,
            state.grosor,
            state.color !== 'white',
            state.colorFondo !== 'white'
        );
    }, []);

    return (
        <article className="article__menuCirculo">
            {<PaletaGrosor title="BORDE" />}
            {<PaletaColorBorde tipo="linea" title="Borde" />}
            {<PaletaColorFondo tipo="fondo" title="Fondo" />}
        </article>
    );
};

export default MenuCirculo;