import {utilsCuadricula_graficaCuadricula} from "../Grid/UtilsCuadricula";
import {u_planoGraficaH} from "../Plano/UtilsPlano";
import {u_cuadradoGraficaH} from "../Square/UtilsCuadrado";
import {u_circuloGraficaH} from "../Circle/UtilsCirculo";
import {u_trianguloGraficaH} from "../Triangle/UtilsTriangulo";
import {u_lineaGraficaH} from "../Line/UtilsLinea";
import {u_lapizGraficaH} from "../Pencil/UtilsLapiz";
import {u_textGraficaH} from "../../utils/UtilsText";


const paint = (
	context,
	stateCanvas,
	historiaPlano,
	historiaCuadrado,
	historiaCirculo,
	historiaTriangulo,
	historiaLinea,
	historiaLapiz,
	historiaText
	) => {
	utilsCuadricula_graficaCuadricula(context, stateCanvas); // grafica cuadricula
	u_planoGraficaH(context, historiaPlano); // plano cartesiano
	u_cuadradoGraficaH(context, historiaCuadrado);
	u_circuloGraficaH(context, historiaCirculo);
	u_trianguloGraficaH(context, historiaTriangulo);
	u_lineaGraficaH(context, historiaLinea);
	u_lapizGraficaH(context, historiaLapiz);
	u_textGraficaH(context, historiaText);
};
export {paint};
