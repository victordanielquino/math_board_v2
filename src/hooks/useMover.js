import { useState } from 'react';
const initialStateMover = {
	active: false,
	selectElm: false,
	obj: {},
};

const useMover = () => {
	const [stateMover, setStateMover] = useState(initialStateMover);

	const updateMoverActive = (valor) => {
		setStateMover({
			...stateMover,
			active: valor,
		});
	};
	const setSelectElm = (boolean) => {
		setStateMover({
			...stateMover,
			selectElm: boolean,
		});
	}
	const setObj = (obj) => {
		setStateMover({
			...stateMover,
			obj: obj,
		});
	}
	const setSelectElmObj = (boolean, obj) => {
		setStateMover({
			...stateMover,
			selectElm: boolean,
			obj: obj,
		});
	}

	return {
		stateMover,
		updateMoverActive,
		setSelectElm,
		setObj,
		setSelectElmObj,
	};
};

export default useMover;
