import React, {useEffect, useRef, useState} from 'react';
import Latex from "react-latex-next";

const MathInput = ({ onChange, ...rest }) => {
    const ref = useRef();
    useEffect(() => {
        Guppy.use_osk(new GuppyOSK({ goto_tab: "arithmetic", attach: "focus" }));
        const guppy = new Guppy(ref.current);
        guppy.event("change", onChange);
    }, []);
    return <div ref={ref} {...rest} />;
};

const MathInputReact = () => {
    // URL: https://codesandbox.io/s/math-editor-and-viewer-example-forked-yd2yf9?file=/src/index.js
    const [expression, setExpression] = useState(" ");
    return (
        <div>
            <h1>Math Editor and Viewer Example</h1>
            <MathInput onChange={(ev) => setExpression(ev.target.latex())} />
            <div style={{ margin: 40 }} />
            <Latex>{`View: $${expression}$`}</Latex>
        </div>
    )
}

export default MathInputReact;