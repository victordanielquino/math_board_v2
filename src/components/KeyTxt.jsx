import React from 'react';

import '../styles/KeySvg.scss';

const KeyTxt = (txt) => {
	const handleClick = (option) => {
		console.log(option);
	};

	return (
		<input
			type="button"
			value={txt.element}
			className={`keySvg ${txt.element}`}
			id={txt.element}
			onClick={() => handleClick(txt.element)}
		/>
	);
};

export default KeyTxt;
