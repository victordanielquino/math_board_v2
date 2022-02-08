import React, { useEffect, useContext } from 'react';
// context
import AppContext from '../context/AppContext';
import AppContextTriangulo from "../context/AppContextTriangulo";
// styles:
import '../styles/MenuCirculo.scss';
// components:
import PaletaGrosor from '../components/PaletaGrosor';
import PaletaColorBorde from '../components/PaletaColor';
import PaletaColorFondo from '../components/PaletaColor';

const MenuTriangulo = () => {
    // useContext:
    const { state } = useContext(AppContext);
    const {
        stateTriangulo,
        s_trianguloUpdateBordeGrosor,
        s_trianguloUpdateBordeColorEstado,
        s_trianguloUpdateFondoColorEstado,
        s_trianguloUpdateAll,
    } = useContext(AppContextTriangulo);

    // LOGICA:
    // LOGICA END

    // useEffect:
    useEffect(() => {
        // se ejecuta cada vez que se modifica el state.color
        s_trianguloUpdateBordeColorEstado(state.color, state.color != 'white');
    }, [state.color]);

    useEffect(() => {
        // se ejecuta cada vez que se modifica el state
        s_trianguloUpdateFondoColorEstado(
            state.colorFondo,
            state.colorFondo != 'white'
        );
    }, [state.colorFondo]);

    useEffect(() => {
        s_trianguloUpdateBordeGrosor(state.grosor);
    }, [state.grosor]);

    useEffect(() => {
        s_trianguloUpdateAll(
            state.color,
            state.colorFondo,
            state.grosor,
            state.color != 'white',
            state.colorFondo != 'white'
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

export default MenuTriangulo;