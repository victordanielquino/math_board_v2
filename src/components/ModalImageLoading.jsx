import React from 'react';

const ModalImageLoading = ({file, setFile, setLoading}) => {
    return (
        <div className='loader'>
            <h3 className='loader__title'>loadding...</h3>
            <div className='loader__progress'>
                <div className='loader__progress-bar'></div>
            </div>
        </div>
    )
}
export default ModalImageLoading;