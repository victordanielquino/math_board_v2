import React, {useContext, useEffect, useState} from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import AppContextFunction from "../../../../context/AppContextFunction";

const DivBetterReactMathjax = () => {
    // CONTEXT:
    const { stateFunction } = useContext(AppContextFunction);

    // STATE:
    const [mathjax, setMathjax] = useState("`frac(10)(4x) approx 2^(12),       sqrt[4]{123`");

    // LOGICA:
    console.log("`frac(10)(4x) approx 2^(12),       sqrt[4]{123`");
    const x = '(a)/(b)'
    const config = {
        loader: { load: ["input/asciimath"] },
        // loader: { load: ["input/asciimath", 'output/chtml'] },
        //asciimath: { displaystyle: false }
    };
    const updateDiv = () => {
        if (stateFunction.text.length > 0) {
            try {
                let array = Array.from(stateFunction.text);
                let text = 'a/b';
                console.log('jejeje:',text)
                setMathjax(text);
                var equacion = '`' + `${text}` + '`';
                document.getElementById('new_div').innerHTML = equacion;
            } catch (e) {
                console.log('erro:', e)
            }
        }
    }

    // EFECT:
    useEffect(() => {
        console.log('text:',stateFunction.text);
        updateDiv();
    }, [stateFunction.text]);

    return (
        <MathJaxContext config={config}>
            <MathJax>{"`frac(10)(4x) approx 2^(12),       sqrt[4]{123`"}</MathJax>
            <br/>
            <MathJax><div id='new_div'/></MathJax>
        </MathJaxContext>
    )
}

export default DivBetterReactMathjax;