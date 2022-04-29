import React, {useContext, useEffect, useRef} from 'react';
import AppContext                             from "../../../context/AppContext";
import {Button}        from "@mui/material";
import useStylesMenuReadJson       from "./MenuReadJsonStyle";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import fileJson from '../../../Data/mathboard.json';
import FolderZipIcon from '@mui/icons-material/FolderZip';

const MenuReadJson = () => {
    // CONTEXT:
    const {state, h_setReadJsonAll} = useContext(AppContext);

    // REF:
    const inputRef = useRef(null);

    // LOGICA:
    const props = {}
    const classes = useStylesMenuReadJson(props);

    // FUNCTIONS:
    const searchIdMax = (array) => {
        let id = -1;
        array.forEach((elm, index) => {
            elm.id > id ? id = elm.id:'';
        })
        return id;
    }
    const readJson = (jsonIn) => {
        let arrayMathBoardsBtns = jsonIn[0].mathboards;	// mathboards = [{},{},{}...]
        let indexSelect = jsonIn[1].mathboardSelect.index;
        let historia = jsonIn[2].historia;
        console.log(historia);

        // BUTTONS MATHBOARDS:
        arrayMathBoardsBtns[indexSelect].variant = 'contained';
        let id = searchIdMax(historia);
        h_setReadJsonAll(arrayMathBoardsBtns, indexSelect, !state.mathBoardsReadJson, historia, id + 1);
        console.log('id New:', id);
    }
    const onchangeFile = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const data = await file.text();
            //console.log('data:', data);
            const jsonAux = JSON.parse(data);
            readJson(jsonAux);
        }
    }
    const handleLoad = () => {
        inputRef.current.click();
    }
    const handleSave = () => {
        let mathboards = {mathboards:state.mathBoards};
        let mathboardSelect = { mathboardSelect: {index:state.mathBoardsIndexSelec} };
        let historiaNew = [];
        for (let i = 0; i < state.historia.length; i++) {
            let elm = state.historia[i];
            if (elm.types === 'image') {
                elm.dataImagen = null;
                elm.dataUse = false;
            }
            historiaNew.push(elm);
        }
        let historia = { historia:historiaNew };
        //console.log(historia)
        let array = [mathboards, mathboardSelect, historia];
        //console.log('array:', array);
        let jsonContent = JSON.stringify(array);
        //console.log(jsonContent);

        const a = document.createElement("a");
        const archivo = new Blob([jsonContent], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = "mathboard.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    // EFFECT:

  return (
      <article className={classes.article} style={{ color:'primary'}}>
          <input type='file' name='file' accept='.json' ref={inputRef} onChange={onchangeFile} className={classes.inputFile}/>
          <Button
              variant="outlined"
              size='small'
              startIcon={<FolderZipIcon/>}
              style={{ marginRight:'20px'}}
              onClick={() => handleLoad()}
          >OPEN FILE</Button>
          <Button
              variant="outlined"
              size='small'
              startIcon={<SaveAltIcon/>}
              onClick={() => handleSave()}
          >SAVE FILE</Button>
      </article>
  )
}

export default MenuReadJson;