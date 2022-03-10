import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CONTEXT:
import AppContext from '../context/AppContext';
import AppContextLapiz from '../context/AppContextLapiz';
import AppContextBorrador from '../context/AppContextBorrador';
import AppContextCuadrado from '../context/AppContextCuadrado';
import AppContextMover from '../context/AppContextMover';
import AppContextCanvas from '../context/AppContextCanvas';
import AppContextLinea from '../context/AppContextLinea';
import AppContextPlano from '../context/AppContextPlano';
import AppContextText from '../context/AppContextText';
import AppContextCirculo from "../context/AppContextCirculo";
import AppContextTriangulo from "../context/AppContextTriangulo";
import AppContextImagen from "../context/AppContextImagen";

// HOOKS:
import useInitialState from '../hooks/useInitialState';
import useMover from '../hooks/useMover';
import useLapiz from '../hooks/useLapiz';
import useBorrador from '../hooks/useBorrador';
import useCuadrado from '../hooks/useCuadrado';
import useCanvas from '../hooks/useCanvas';
import useLinea from '../hooks/useLinea';
import usePlano from '../hooks/usePlano';
import useText from '../hooks/useText';
import useCirculo from "../hooks/useCirculo";
import useTriangulo from "../hooks/useTriangulo";
import useImagen from "../hooks/useImagen";

import Layout from '../containers/Layout';
import Home from '../pages/Home';
import '../styles/global.css';

const App = () => {
	const initialState = useInitialState();
	const initialStateMover = useMover();
	const initialStateLapiz = useLapiz();
	const initialStateBorrador = useBorrador();
	const initialStateCuadrado = useCuadrado();
	const initialStateCanvas = useCanvas();
	const initialStateLinea = useLinea();
	const initialStatePlano = usePlano();
	const initialStateText = useText();
	const initialStateCirculo = useCirculo();
	const initialStateTriangulo = useTriangulo();
	const initialStateImagen = useImagen();

	return (
		<AppContext.Provider value={initialState}>
			<AppContextMover.Provider value={initialStateMover}>
			<AppContextCanvas.Provider value={initialStateCanvas}>

					<AppContextLapiz.Provider value={initialStateLapiz}>
						<AppContextBorrador.Provider value={initialStateBorrador}>
							<AppContextCuadrado.Provider value={initialStateCuadrado}>
								<AppContextLinea.Provider value={initialStateLinea}>
									<AppContextPlano.Provider value={initialStatePlano}>
										<AppContextText.Provider value={initialStateText}>
											<AppContextCirculo.Provider value={initialStateCirculo}>
												<AppContextTriangulo.Provider value={initialStateTriangulo}>
													<AppContextImagen.Provider value={initialStateImagen}>

															<BrowserRouter>
																<Layout>
																	{/* <Routes>
																	<Route exact path="/" element={<Home />} />
																</Routes> */}
																</Layout>
															</BrowserRouter>

													</AppContextImagen.Provider>
												</AppContextTriangulo.Provider>
											</AppContextCirculo.Provider>
										</AppContextText.Provider>
									</AppContextPlano.Provider>
								</AppContextLinea.Provider>
							</AppContextCuadrado.Provider>
						</AppContextBorrador.Provider>
					</AppContextLapiz.Provider>

			</AppContextCanvas.Provider>
			</AppContextMover.Provider>
		</AppContext.Provider>
	);
};

export default App;
