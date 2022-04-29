import React, { useEffect, useContext } from 'react';
// context
import AppContext from '../../../context/AppContext';
import AppContextCirculo from "../../../context/AppContextCirculo";

// styles:
import './MenuCirculo.scss';

// components:
import PaletaGrosor           from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde       from '../../../components/PaletaColor/PaletaColor';
import PaletaColorFondo       from '../../../components/PaletaColor/PaletaColor';
import PaletaColor            from "../../../components/PaletaColor/PaletaColorSinTitle";
import {u_convertColorToRGBA} from "../../../utils/utils";

const MenuCirculo = () => {
    // useContext:
    const { state } = useContext(AppContext);
    const {
        s_circuloUpdateBordeGrosor,
        s_circuloUpdateBordeColorEstado,
        s_circuloUpdateFondoColorEstado,
        s_circuloUpdateAll,
    } = useContext(AppContextCirculo);

    // LOGICA:

    // EFFECT:
    useEffect(() => {
        let rgba = u_convertColorToRGBA(state.color, state.colorBlur);
        s_circuloUpdateBordeColorEstado(rgba, state.color !== 'white');
    }, [state.color, state.colorBlur]);

    useEffect(() => {
        let rgba = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
        s_circuloUpdateFondoColorEstado(rgba, state.colorFondo !== 'white');
    }, [state.colorFondo, state.colorFondoBlur]);

    useEffect(() => {
        s_circuloUpdateBordeGrosor(state.grosor);
    }, [state.grosor]);

    useEffect(() => {
        let color = u_convertColorToRGBA(state.color, state.colorBlur);
        let colorFondo = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
        s_circuloUpdateAll(
            color,
            colorFondo,
            state.grosor,
            state.color !== 'white',
            state.colorFondo !== 'white'
        );
    }, []);

    return (
        <article style={{display:'flex', justifyContent:'center', alignItems:'center', background:'white', padding:'5px 25px', borderRadius:'10px'}}>
            {<div style={{marginRight:'20px'}}><PaletaGrosor /></div>}
            {<div style={{marginRight:'20px'}}><PaletaColor tipo='linea' title='BORDE' /></div>}
            {<div style={{marginRight:'0px'}}><PaletaColor tipo='fondo' title='FONDO' /></div>}
        </article>
    );
};

export default MenuCirculo;