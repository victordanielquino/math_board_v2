import React from 'react';
import Header from './Header/Header';
import NavIzq from './NavIzq/NavIzq';
import Home from './Home/Home';

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
