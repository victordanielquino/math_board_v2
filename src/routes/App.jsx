import React, {useContext}              from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CONTEXT:
import AppContext from '../context/AppContext';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextMover from '../context/AppContextMover';
import AppContextGrid from '../context/AppContextGrid';
import AppContextLinea from '../context/AppContextLinea';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";
import AppContextTriangulo from "../context/AppContextTriangulo";
import AppContextImagen from "../context/AppContextImagen";
import AppContextFunction from '../context/AppContextFunction';
import AppContextSesion     from "../context/AppContextSesion";
import AppContextCalculator from "../context/AppContextCalculator";
import AppContextGeometric  from "../context/AppContextGeometric";

// HOOKS:
import useInitialState from '../hooks/useInitialState';
import useMover from '../hooks/useMover';
import useLapiz from '../hooks/useLapiz';
import useBorrador from '../hooks/useBorrador';
import useCuadrado from '../hooks/useCuadrado';
import useGrid from '../hooks/useGrid';
import useLinea from '../hooks/useLinea';
import usePlano from '../hooks/usePlano';
import useText from '../hooks/useText';
import useCirculo from "../hooks/useCirculo";
import useTriangulo from "../hooks/useTriangulo";
import useImagen from "../hooks/useImagen";
import useFunction from "../hooks/useFunction";
import useSesion     from "../hooks/useSesion";
import useCalculator from "../hooks/useCalculator";
import useGeometric  from "../hooks/useGeometric";

import Layout             from '../Layout/Layout';
import Home               from '../Layout/Home/Home';
import '../styles/global.css';
import useScissor         from "../hooks/useScissor";
import AppContextScissor  from "../context/AppContextScissor";
import useReadJson        from "../hooks/useReadJson";
import AppContextReadJson from "../context/AppContextReadJson";

const App = () => {
	const initialState = useInitialState();
	const initialStateMover = useMover();
	const initialStateLapiz = useLapiz();
	const initialStateBorrador = useBorrador();
	const initialStateCuadrado = useCuadrado();
	const initialStateCanvas = useGrid();
	const initialStateLinea = useLinea();
	const initialStatePlano = usePlano();
	const initialStateText = useText();
	const initialStateCirculo = useCirculo();
	const initialStateTriangulo = useTriangulo();
	const initialStateImagen = useImagen();
	const initialStateFunction = useFunction();
	const initialStateSesion = useSesion();
	const initialStateCalculator = useCalculator();
	const initialStateGeometric = useGeometric();
	const initialStateScissor = useScissor();
	const initialStateReadJson = useReadJson();

	return (
		<AppContext.Provider value={initialState}>
			<AppContextMover.Provider value={initialStateMover}>
			<AppContextGrid.Provider value={initialStateCanvas}>

					<AppContextLapiz.Provider value={initialStateLapiz}>
						<AppContextBorrador.Provider value={initialStateBorrador}>
							<AppContextCuadrado.Provider value={initialStateCuadrado}>
								<AppContextLinea.Provider value={initialStateLinea}>
									<AppContextPlano.Provider value={initialStatePlano}>
										<AppContextText.Provider value={initialStateText}>
											<AppContextCirculo.Provider value={initialStateCirculo}>
												<AppContextTriangulo.Provider value={initialStateTriangulo}>
													<AppContextImagen.Provider value={initialStateImagen}>
														<AppContextFunction.Provider value={initialStateFunction}>
															<AppContextSesion.Provider value={initialStateSesion}>
																<AppContextCalculator.Provider value={initialStateCalculator}>
																	<AppContextGeometric.Provider value={initialStateGeometric}>
																		<AppContextScissor.Provider value={initialStateScissor}>
																			<AppContextReadJson.Provider value={initialStateReadJson}>
																				<BrowserRouter>
																					<Layout>
																						{/*<Routes>
																				<Route exact path="/" element={<Home />} />
																			</Routes>*/}
																					</Layout>
																				</BrowserRouter>
																			</AppContextReadJson.Provider>
																		</AppContextScissor.Provider>
																	</AppContextGeometric.Provider>
																</AppContextCalculator.Provider>
															</AppContextSesion.Provider>
														</AppContextFunction.Provider>
													</AppContextImagen.Provider>
												</AppContextTriangulo.Provider>
											</AppContextCirculo.Provider>
										</AppContextText.Provider>
									</AppContextPlano.Provider>
								</AppContextLinea.Provider>
							</AppContextCuadrado.Provider>
						</AppContextBorrador.Provider>
					</AppContextLapiz.Provider>

			</AppContextGrid.Provider>
			</AppContextMover.Provider>
		</AppContext.Provider>
	);
};

export default App;
