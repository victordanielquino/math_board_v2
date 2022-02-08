import {utilsCuadricula_graficaCuadricula} from "./UtilsCuadricula";
import {u_planoGraficaH} from "./UtilsPlano";
import {u_cuadradoGraficaH} from "./UtilsCuadrado";
import {u_circuloGraficaH} from "./UtilsCirculo";
import {u_trianguloGraficaH} from "./UtilsTriangulo";
import {u_lineaGraficaH} from "./UtilsLinea";
import {u_lapizGraficaH} from "./UtilsLapiz";
import {u_textGraficaH} from "./UtilsText";


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
