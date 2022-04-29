import React, { useEffect, useContext } from 'react';
// context
import AppContext                       from '../../../context/AppContext';
import AppContextTriangulo              from "../../../context/AppContextTriangulo";
// styles:
import '../../Circle/MenuCircle/MenuCirculo.scss';
// components:
import PaletaGrosor                     from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';
import PaletaColorBorde                 from '../../../components/PaletaColor/PaletaColor';
import PaletaColorFondo                 from '../../../components/PaletaColor/PaletaColor';
import PaletaColor                      from "../../../components/PaletaColor/PaletaColorSinTitle";
import {u_convertColorToRGBA}           from "../../../utils/utils";

const MenuTriangulo = () => {
    // CONTEXT:
    const { state } = useContext(AppContext);
    const {
        s_trianguloUpdateBordeGrosor,
        s_trianguloUpdateBordeColorEstado,
        s_trianguloUpdateFondoColorEstado,
        s_trianguloUpdateAll,
    } = useContext(AppContextTriangulo);

    // LOGICA:

    // EFFECT:
    useEffect(() => {
        let rgba = u_convertColorToRGBA(state.color, state.colorBlur);
        s_trianguloUpdateBordeColorEstado(rgba, state.color !== 'white');
    }, [state.color, state.colorBlur]);

    useEffect(() => {
        let rgba = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
        s_trianguloUpdateFondoColorEstado(rgba, state.colorFondo !== 'white');
    }, [state.colorFondo, state.colorFondoBlur]);

    useEffect(() => {
        s_trianguloUpdateBordeGrosor(state.grosor);
    }, [state.grosor]);

    useEffect(() => {
        let color = u_convertColorToRGBA(state.color, state.colorBlur);
        let colorFondo = u_convertColorToRGBA(state.colorFondo, state.colorFondoBlur);
        s_trianguloUpdateAll(
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

export default MenuTriangulo;