import React from 'react';
import './Modal.scss';
import closeIcon from '../../assets/icons/x.svg';

const Modal = ({
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

export default Modal;