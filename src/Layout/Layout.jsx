import React from 'react';
import Header from '../components/Header/Header';
import NavIzq from './NavIzq';
import Home from '../pages/Home';

const Layout = ({ children }) => {
	return (
		<div className="Layout">
			<Header />
			<NavIzq />
			<Home />
			{children}
		</div>
	);
};

export default Layout;
