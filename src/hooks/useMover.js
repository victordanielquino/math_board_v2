import { useState } from 'react';
const initialStateMover = {
	active: false,
};

const useMover = () => {
	const [stateMover, setStateMover] = useState(initialStateMover);

	const updateMoverActive = (valor) => {
		setStateMover({
			...stateMover,
			active: valor,
		});
	};
	return {
		stateMover,
		updateMoverActive,
	};
};

export default useMover;
