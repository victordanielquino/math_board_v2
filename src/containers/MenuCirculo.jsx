import React, { useEffect, useContext } from 'react';
// context
import AppContext from '../context/AppContext';
import AppContextCirculo from "../context/AppContextCirculo";
// styles:
import '../styles/MenuCirculo.scss';
// components:
import PaletaGrosor from '../components/PaletaGrosor';
import PaletaColorBorde from '../components/PaletaColor';
import PaletaColorFondo from '../components/PaletaColor';

const MenuCirculo = () => {
    // useContext:
    const { state } = useContext(AppContext);
    const {
        stateCirculo,
        s_circuloUpdateBordeGrosor,
        s_circuloUpdateBordeColorEstado,
        s_circuloUpdateFondoColorEstado,
        s_circuloUpdateAll,
        s_circuloUpdateRadio
    } = useContext(AppContextCirculo);

    // LOGICA:
    const handleRadio = (op) => {
        let valor = parseInt(document.getElementById('circulo_radio').value);
        op == '+' ? (valor = valor + 5) : (valor = valor - 5);
        if (valor < 5) {
            valor = 5;
        } else {
            if (valor > 200) {
                valor = 200;
            } else {
                document.getElementById('circulo_radio').value = valor;
                s_circuloUpdateRadio(valor);
            }
        }
    };
    const onChangeInputRadio = () => {
        let valor = parseInt(document.getElementById('circulo_radio').value);
        document.getElementById('circulo_radio').value = valor;
        s_circuloUpdateRadio(valor);
    }
    // LOGICA END

    // useEffect:
    useEffect(() => {
        // solo 1 vez al cargar el componente:
    }, []);
    useEffect(() => {
        // solo cuando se modifica [stateCuadrado]:
    }, [stateCirculo]);

    useEffect(() => {
        // se ejecuta cada vez que se modifica el state.color
        s_circuloUpdateBordeColorEstado(state.color, state.color != 'white');
    }, [state.color]);

    useEffect(() => {
        // se ejecuta cada vez que se modifica el state
        s_circuloUpdateFondoColorEstado(
            state.colorFondo,
            state.colorFondo != 'white'
        );
    }, [state.colorFondo]);

    useEffect(() => {
        s_circuloUpdateBordeGrosor(state.grosor);
    }, [state.grosor]);

    useEffect(() => {
        s_circuloUpdateAll(
            state.color,
            state.colorFondo,
            state.grosor,
            state.color != 'white',
            state.colorFondo != 'white'
        );
        document.getElementById('circulo_radio').value = stateCirculo.radioX;
    }, []);
    return (
        <article className="article__menuCirculo">
            <div className="article__menuCirculo__radio">
                <span>RADIO:</span>
                <span>
					<input
                        className="text"
                        type="text"
                        defaultValue="5"
                        id="circulo_radio"
                        onChange={() => onChangeInputRadio()}
                    />
				</span>
                <span>
					<input type="button" value="-" onClick={() => handleRadio('-')} />
				</span>
                <span>
					<input type="button" value="+" onClick={() => handleRadio('+')} />
				</span>
            </div>
            {<PaletaGrosor title="BORDE" />}
            {<PaletaColorBorde tipo="linea" title="Borde" />}
            {<PaletaColorFondo tipo="fondo" title="Fondo" />}
        </article>
    );
};

export default MenuCirculo;