import React, {useEffect, useState} from 'react';
import EquationEditor from "equation-editor-react";

const EquationEditorReact = () => {
    // URL:https://www.npmjs.com/package/equation-editor-react
    const [equation, setEquation] = useState("y=x");
    console.log(equation);
    return (
        <>
            <EquationEditor
                value={equation}
                onChange={setEquation}
                autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                autoOperatorNames="sin cos tan"
                id='xxx'
            />
        </>
    )
}

export default EquationEditorReact;