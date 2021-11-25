import React from 'react';

import '../styles/Key.scss';

const Key = (valor) => {
	const handleClick = (key) => {
		console.log(key);
	};

	return (
		<input
			type="button"
			value={valor.element}
			className={`key ${valor.element}`}
			onClick={() => handleClick(valor.element)}
		/>
	);
};

export default Key;
