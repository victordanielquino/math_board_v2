import React from 'react';
import '../styles/ModalImagen.scss';
import closeIcon from '../assets/icons/x.svg';

const ModalImagen = ({
                         children,
                         estado,
                         setEstado,
                         titulo='Title'
}) => {
    const btnCloseClick = () => {
        setEstado(false);
    }
    return (
        <>
            {
                estado &&
                <article className='overlay'>
                    <div className='overlay__contenedorModal'>
                        <div className='overlay__contenedorModal__encabezadoModal'><h3>{titulo}</h3></div>
                        <button className='overlay__contenedorModal__btnCerrar' onClick={() => btnCloseClick()}>
                            <img src={closeIcon}/>
                        </button>
                        {children}
                    </div>
                </article>
            }
        </>
    );
}

export default ModalImagen;
