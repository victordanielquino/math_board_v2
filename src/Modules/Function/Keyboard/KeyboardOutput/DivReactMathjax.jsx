import React, {useContext, useEffect, useState} from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import AppContextFunction from "../../../../context/AppContextFunction";

//import "katex/dist/katex.min.css";
const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
        packages: { "[+]": ["html"] },
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
        ]
    }
};

const DivReactLatex = () => {
    // CONTEXT:
    const { stateFunction } = useContext(AppContextFunction);

    // STATE:
    const [mathjax, setMathjax] = useState('');

    // LOGICA:
    const raiz = `\\(x\\) or \\(\\frac{25x}{10} = 2^{10}\\) \\[\\sum_{n = 100}^{1000}\\left[\\frac{10\\sqrt[5]{\\frac{1}{n+1}}}{n}\\right]\\]`;
    const updateDiv = () => {
        if (stateFunction.text.length > 0) {
            try {
                let array = Array.from(stateFunction.text);
                setMathjax(`\\(${stateFunction.text}\\)`)
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
        <div>
            <MathJaxContext version={3} config={config}>
                <MathJax hideUntilTypeset={"first"}>
                    {`Inside a MathJax block element, one might use both Latex inline math, such
          as \\(x\\) or \\(\\frac{25x}{10} = 2^{10}\\), but then also switch
          to Latex display math, like
          \\[\\sum_{n = 100}^{1000}\\left(\\frac{10\\sqrt[5]{n+1}}{n}\\right)\\]
          ... and then continue with inline math.`}
                </MathJax>
                <MathJax>
                    {mathjax}
                </MathJax>
            </MathJaxContext>
        </div>
    )
}

export default DivReactLatex;