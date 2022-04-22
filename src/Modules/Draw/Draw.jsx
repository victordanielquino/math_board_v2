import { u_squareDraw }                       from "../Square/UtilsCuadrado";
import {u_textGrafica, u_textGraficaFontEdit} from "../Text/UtilsText";
import { u_pencilDraw }                       from "../Pencil/UtilsLapiz";
import { u_circleDraw }                       from "../Circle/UtilsCirculo";
import { u_triangleDraw }                     from "../Triangle/UtilsTriangulo";
import { u_imageDraw }                        from "../Image/UtilsImagen";
import { u_planoDraw }                        from "../Plano/UtilsPlano";
import { u_lineDraw }                         from "../Line/UtilsLinea";
import { utilsCuadricula_graficaCuadricula }  from '../Grid/UtilsCuadricula';
import {u_geometricDraw}                      from "../Geometric/UtilsGeometric";

const Draw = async (context, array, canvas, stateGrid, focusText= false) => {
    //console.log('Draw.jsx');
    try {
        utilsCuadricula_graficaCuadricula(context, stateGrid); // grafica cuadricula
        await array.forEach((elm, index) => {
            switch (elm.types){
                case 'pencil':
                    (elm.visible && elm.canvas === canvas)
                        ? u_pencilDraw(context, elm) : '';
                    break;
                case 'square':
                    (elm.visible && elm.canvas === canvas)
                        ? u_squareDraw(context, elm) : '';
                    break;
                case 'circle':
                    (elm.visible && elm.canvas === canvas)
                        ? u_circleDraw(context, elm) : '';
                    break;
                case 'triangle':
                    (elm.visible && elm.canvas === canvas)
                        ? u_triangleDraw(context, elm) : '';
                    break;
                case 'image':
                    (elm.visible && elm.canvas === canvas)
                        ? u_imageDraw(context, elm) : '';
                    break;
                case 'plano':
                    (elm.visible && elm.canvas === canvas)
                        ? u_planoDraw(context, elm) : '';
                    break;
                case 'line':
                    (elm.visible && elm.canvas === canvas)
                        ? u_lineDraw(context, elm) : '';
                    break;
                case 'text':
                    if (elm.visible && elm.canvas === canvas) {
                        (focusText && index === array.length - 1)
                            ? u_textGraficaFontEdit(context, elm, true)
                            : u_textGrafica(context, elm);
                    }
                    break;
                case 'geometric':
                    (elm.visible && elm.canvas === canvas)
                        ? u_geometricDraw(context, elm, false) : '';
                    break;
            }
        });
    } catch (e) {
        console.log('error draw: ',e.message);
    }
};

export default Draw;