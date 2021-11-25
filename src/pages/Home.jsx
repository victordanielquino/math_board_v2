import React from 'react';
import Canvas from '../components/Canvas';

import '../styles/Home.scss';

const Home = () => {
	// const heightPantalla = screen.height - 180;
	// const widthPantalla = screen.width - 55;
	return (
		<div className="home">
			<Canvas />
		</div>
	);
};

export default Home;
