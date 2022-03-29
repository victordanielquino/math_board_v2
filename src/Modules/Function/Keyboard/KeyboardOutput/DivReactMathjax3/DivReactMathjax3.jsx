import React, {useContext, useEffect, useState} from 'react';
import MathJax from 'react-mathjax3';

const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

const DivReactLatex = () => {
    console.log('hola')
    // URL: https://github.com/ggunti/react-mathjax3
    // CONTEXT:

    // STATE:

    // LOGICA:

    // EFECT:


    return (
        <div>
            <MathJax.Context input='tex'>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    )
}

export default DivReactLatex;