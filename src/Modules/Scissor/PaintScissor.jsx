import React, {useContext, useEffect, useState} from 'react';
import draw                                     from "../Draw/Draw";
import AppContext                      from "../../context/AppContext";
import AppContextGrid                  from "../../context/AppContextGrid";
import AppContextScissor               from "../../context/AppContextScissor";
import {
    u_scissorDrawRectangulo,
    u_scissorMove,
    u_scissorPtsResize,
    u_scissorResizePto,
    u_scissorResizePtoGet
}                                        from "./UtilsScissor";
import {isObjectEmpty, u_canvasAutoSize} from "../../utils/utils";

const PaintScissor = (id_canvas) => {
    // useContext:
    const { state, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateScissor, h_scissorSetCanvas, h_scissorSetScissor } = useContext(AppContextScissor);

    // STATE:

    // LOGICA:
    const paint = async () => {
        if (stateScissor.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        }
    }
    let canvas = '';
    let context = '';
    let canvasScissorDatos = {top: 0, left: 0, width: 0, height: 0,};
    let mouse = {
        click: false,
        move: false,
        primerClick: false,
        pos: { x: 0, y: 0 },
        pos_prev: { x: 0, y: 0 },
    };
    let scissor = {
        x_ini: 0,
        y_ini: 0,
        x_fin: 0,
        y_fin: 0,
        vertex: [],
        vertexSize: 5,
        valid: false,
        resizePto:-1,
    }

    const mouseReinicia = () => {
        mouse.click = false;
        mouse.move = false;
        mouse.primerClick = false;
        mouse.pos.x = 0;
        mouse.pos_prev.x = 0;
        mouse.pos.y = 0;
        mouse.pos_prev.y = 0;
    };
    let captura_Pos_Posprev = (e) => {
        let x = e.clientX;
        let y = e.clientY;
        let x_real = x - canvasScissorDatos.left;
        let y_real = y - canvasScissorDatos.top;
        mouse.pos_prev.x = mouse.pos.x;
        mouse.pos_prev.y = mouse.pos.y;
        mouse.pos.x = x_real;
        mouse.pos.y = y_real;
    };

    // 1:
    const mouseDownScissor = (e) => {
        captura_Pos_Posprev(e);
        mouse.click = true;
        if (isObjectEmpty(stateScissor.scissor)) {
            scissor.x_ini = mouse.pos.x;
            scissor.y_ini = mouse.pos.y;
        } else {
            stateScissor.scissor.resizePto = u_scissorResizePtoGet(stateScissor.scissor.vertex, mouse.pos.x, mouse.pos.y);
        }
    };
    // 2:
    const mouseMoveScissor = async (e) => {
        if (mouse.click) {
            captura_Pos_Posprev(e);
            mouse.move = true;
            if (isObjectEmpty(stateScissor.scissor)) {
                scissor.x_fin = mouse.pos.x;
                scissor.y_fin = mouse.pos.y;
            } else {
                (stateScissor.scissor.resizePto !== -1)
                    ? u_scissorResizePto(stateScissor.scissor, stateScissor.scissor.resizePto, mouse)
                    : u_scissorMove(stateScissor.scissor, mouse);
            }
            await paint();
            isObjectEmpty(stateScissor.scissor)
                ? u_scissorDrawRectangulo(context, scissor)
                : u_scissorDrawRectangulo(context, stateScissor.scissor);
        }
    };
    // 3:
    let mouseUpScissor = async (e) => {
        captura_Pos_Posprev(e);
        if (mouse.click && mouse.pos_prev.x != 0 && mouse.pos_prev.y != 0) {
            scissor.x_fin = mouse.pos.x;
            scissor.y_fin = mouse.pos.y;
            if (scissor.x_ini !== scissor.x_fin && scissor.y_ini !== scissor.y_fin) {
                if (isObjectEmpty(stateScissor.scissor)) {
                    if (scissor.x_ini > scissor.x_fin) {
                        let aux = scissor.x_ini;
                        scissor.x_ini = scissor.x_fin;
                        scissor.x_fin = aux;
                    }
                    if (scissor.y_ini > scissor.y_fin) {
                        let aux = scissor.y_ini;
                        scissor.y_ini = scissor.y_fin;
                        scissor.y_fin = aux;
                    }
                    scissor.vertex = u_scissorPtsResize(scissor);
                    paint();
                    h_scissorSetScissor(scissor);
                } else {
                    if (stateScissor.scissor.x_ini > stateScissor.scissor.x_fin) {
                        let aux = stateScissor.scissor.x_ini;
                        stateScissor.scissor.x_ini = stateScissor.scissor.x_fin;
                        stateScissor.scissor.x_fin = aux;
                    }
                    if (stateScissor.scissor.y_ini > stateScissor.scissor.y_fin) {
                        let aux = stateScissor.scissor.y_ini;
                        stateScissor.scissor.y_ini = stateScissor.scissor.y_fin;
                        stateScissor.scissor.y_fin = aux;
                    }
                    stateScissor.scissor.vertex = u_scissorPtsResize(stateScissor.scissor);
                    paint();
                    u_scissorDrawRectangulo(context, stateScissor.scissor);
                }
            }
        }
        mouseReinicia();
    };
    // 4:
    const keyDown = (e) => {
        if (state.historia.length > 0){
            // console.log(e);
            // console.log(e.key);
            // console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 90 && ctrl) {
                //console.log("Ctrl+Z is pressed.");
                let indexdDelete = -1;
                state.historia.forEach((elm, index) => elm.canvas === stateScissor.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }
    /*const update_canvasScissorDatos = () => {
        canvasScissorDatos.top = canvas.getBoundingClientRect().top;
        canvasScissorDatos.left = canvas.getBoundingClientRect().left;
        canvasScissorDatos.width = canvas.getBoundingClientRect().width;
        canvasScissorDatos.height = canvas.getBoundingClientRect().height;
    };
    const eventDraw = () => {
        canvas = document.getElementById(id_canvas);
        context = canvas.getContext('2d');
        update_canvasScissorDatos();
        if (state.historia.length > 0) paint();
        if (!isObjectEmpty(stateScissor.scissor)) {
            u_scissorDrawRectangulo(context, stateScissor.scissor);
        }
    }*/

    // EFFECT:
    useEffect(() => {
        if (stateScissor.active) {
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            canvasScissorDatos = u_canvasAutoSize(canvas, canvasScissorDatos);
            paint();
            if (!isObjectEmpty(stateScissor.scissor)) {
                u_scissorDrawRectangulo(context, stateScissor.scissor);
            }

            canvas.addEventListener('mousedown', mouseDownScissor);
            canvas.addEventListener('mousemove', mouseMoveScissor);
            canvas.addEventListener('mouseup', mouseUpScissor);
            document.addEventListener('keydown', keyDown);
            return () => {
                canvas.removeEventListener('mousedown', mouseDownScissor);
                canvas.removeEventListener('mousemove', mouseMoveScissor);
                canvas.removeEventListener('mouseup', mouseUpScissor);
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateScissor, state.historia, stateScissor.scissor]);

    useEffect(() => {
        paint();
        h_scissorSetScissor({});
    }, [stateScissor.active]);

    useEffect(() => {
        h_scissorSetCanvas(state.canvas);
        if (stateScissor.active) {
            paint();
            h_scissorSetScissor({});
        }
    }, [state.canvas]);
}

export default PaintScissor;