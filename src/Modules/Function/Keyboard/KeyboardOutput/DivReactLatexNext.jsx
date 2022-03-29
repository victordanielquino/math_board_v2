import React, {useState} from 'react';
import Latex from 'react-latex-next';
import "katex/dist/katex.min.css";
//const Latex = require('react-la');

const DivReactLatex = () => {
    const [t, set_t] = useState(0);
    const R = 10000;
    const C = 1 * 10 ** -6;
    const T = R * C;
    const Vs = 10;
    const vc_latex = "$V_c = V_s(1 - 10^{-\\frac{t}{T}})$";
    const Vc = Vs * (1 - 10 ** (t / T));
    const fraccion = "$\\frac{1}{2}$";
    return (
        <div>
            <h1>Calc a</h1>
            <div>R = {R}</div>
            <div>C = {C.toExponential()}</div>
            <div>
                <Latex>$V_s$</Latex> = {Vs}
            </div>
            <div>T = RC = {T}</div>
            <div>
                t = <input onChange={(e) => set_t(e.target.value)} value={t} />
            </div>
            <div>
                <Latex>{vc_latex}</Latex> = {Vc.toExponential(2)}
            </div>
            <div>
                <Latex>{fraccion}</Latex>
            </div>
        </div>
    )
}

export default DivReactLatex;