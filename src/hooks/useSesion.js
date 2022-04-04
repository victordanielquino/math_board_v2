import { useState } from 'react';
const initialStateSesion = {
	active: false,
	school: 'Sergio Almaraz',
	teacher: 'Victor Rene Quisbert Surco',
	level: '1ro Sec. A',
	theme:'Ecuaciones 2do grado',
	imageBase64: ''
};

const useSesion = () => {
	const [stateSesion, setStateSesion] = useState(initialStateSesion);

	const h_sesionSetSchool = (value) => {
		setStateSesion({
			...stateSesion,
			school: value,
		});
	};
	const h_sesionSetTeacher = (value) => {
		setStateSesion({
			...stateSesion,
			teacher: value,
		});
	};
	const h_sesionSetLevel = (value) => {
		setStateSesion({
			...stateSesion,
			level: value,
		});
	};
	const h_sesionSetTheme = (value) => {
		setStateSesion({
			...stateSesion,
			theme: value,
		});
	};
	const h_sesionSetImageBase64 = (value) => {
		setStateSesion({
			...stateSesion,
			imageBase64: value,
		});
	};

	return {
		stateSesion,
		h_sesionSetSchool,
		h_sesionSetTeacher,
		h_sesionSetLevel,
		h_sesionSetTheme,
		h_sesionSetImageBase64,
	};
};

export default useSesion;
