import React, {useContext, useEffect, useState} from 'react';
import Latex from 'react-latex';
import { MathComponent } from "mathjax-react";
import AppContextFunction from "../../../../context/AppContextFunction";
//import "katex/dist/katex.min.css";

const DivReactLatex = () => {
    // CONTEXT:
    const { stateFunction } = useContext(AppContextFunction);

    // STATE:

    // LOGICA:
    // ejemplos: https://es.wikipedia.org/wiki/LaTeX
    const potencia = `$$a^3 + b^2 + c^5$$`;
    const fraccion = '$$\\frac{1}{2}$$';
    const raiz = `$$\\sqrt[3]{a+b}$$`;
    const raiz2 = `\\sqrt[3]{a+b}`;
    const sumatoria = `$$e=\\sum_{n=0}^{\\infty} \\frac{1}{n!}$$`;
    const formGrl = `$$x = \\frac{-b \\sqrt[2]{-b^2 -4ac}}{2a}$$`;
    const integral = "$$x_i=\\sqrt[n]{\\frac{a_i}{b_i}}$$";
    const eje1 = "$$\\int_{\\vert x-x_0 \\vert < X_0}\\Phi(x)$$";
    const eje2 = "$$\\sum_{0\\le i\\le m\\\\0<j<n}P(i, j)$$";
    const eje3 = "$${n \\choose r} = \\frac{n!}{r! (n - r)!}$$";
    const eje4 = "$$\\vec{\\mathbf{v}} = a\\hat x + b\\hat y$$";
    const eje5 = "$$C\\xrightarrow{\\;\\;\\;g\\;\\;\\;}D\\end{matrix}$$";


    const updateDiv = () => {
        if (stateFunction.text.length > 0) {

        }
    }

    // EFFECT:
    useEffect(() => {
        updateDiv();
    }, [stateFunction.text])

    return (
        <div>
            <Latex displayMode={true}>$$(3\times 4) \div (5-3)$$</Latex>
            <Latex>
                {
                    "${\\left\\{\\begin{matrix}  & ax+y=4\\\\  & -2x+3y = 2a \\end{matrix}\\right.}$"
                }
            </Latex>
            <br/>
            <Latex>
                {'$$' + raiz2 + '$$'}
            </Latex>
            <br/>
            <Latex>
                {eje3}
            </Latex>
        </div>
    )
}

export default DivReactLatex;