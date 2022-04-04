import { useContext } from 'react';

//import AppContextGrid from '../context/AppContextGrid';
//import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextLinea from '../context/AppContextLinea';
//import AppContextLapiz from '../context/AppContextLapiz';

import { utilsLinea_graficaLineaHistoria } from '../Modules/Line/UtilsLinea';
import { utilsLapiz_graficaLapizHistoria } from '../Modules/Pencil/UtilsLapiz';
import { utilsCuadrado_graficaCuadradoHistoria } from '../Modules/Square/UtilsCuadrado';
//
// const { stateCanvas } = useContext(AppContextGrid);
//
// LINEA:
const utilsPaint_LineaH = (context) => {
	const { stateLinea } = useContext(AppContextLinea);
	utilsLinea_graficaLineaHistoria(context, stateLinea.historiaLinea);
};

// LAPIZ:
// const utilsPain_LapizH = (context) => {
// 	const { stateLapiz } = useContext(AppContextLapiz);
// 	utilsLapiz_graficaLapizHistoria(context, stateLapiz.historiaLapiz);
//};

// LAPIZ - HISORIA:
// const utilsPaint_CuadradoH = (context) => {
// 	const { stateCuadrado } = useContext(AppContextCuadrado);
// 	utilsCuadrado_graficaCuadradoHistoria(
// 		context,
// 		stateCuadrado.historiaCuadrado
// 	);
// };

const utilsPaint_All = (context) => {
	//utilsPaint_CuadradoH(context);
	utilsPaint_LineaH(context);
	//utilsPain_LapizH(context);
};

export { utilsPaint_All };
