import React from 'react';

import ModalUI from '../../components/ModalUI/ModalUI'

const Calculadora = ({open, setOpen}) => {
    return (
        <>
            <ModalUI open={open} setOpen={setOpen} title='CALCULADORA' successDisabled={true} >
                saludos
            </ModalUI>
        </>
    )
}
export default Calculadora;