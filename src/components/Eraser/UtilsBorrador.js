const borrador = (id) => {
	const canvas = document.getElementById(id);
	const context = canvas.getContext('2d');
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const canvasDatos = {
		top: canvas.getBoundingClientRect().top,
		left: canvas.getBoundingClientRect().left,
		width: canvas.getBoundingClientRect().width,
		height: canvas.getBoundingClientRect().height,
	};
	const click = {
		x: 0,
		y: 0,
	};
	const clickReal = {
		x: 0,
		y: 0,
	};

	const capturaPosPosprev = (e) => {
		click.x = e.clientX;
		click.y = e.clientY;

		clickReal.x = click.x - canvasDatos.left;
		clickReal.y = click.y - canvasDatos.top;

		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = clickReal.x;
		mouse.pos.y = clickReal.y;
	};

	const graficaLapiz = () => {
		context.beginPath();
		context.moveTo(mouse.pos_prev.x, mouse.pos_prev.y);
		context.lineTo(mouse.pos.x, mouse.pos.y);
		context.strokeStyle = 'white';
		context.lineWidth = 5;
		context.stroke();
		context.closePath();
	};

	canvas.addEventListener('mousedown', (e) => {
		mouse.click = true;
		console.log('hizo click');

		capturaPosPosprev(e);
		console.log('mouse:', mouse);
	});
	canvas.addEventListener('mousemove', (e) => {
		if (mouse.click) {
			console.log('mueve click');
			capturaPosPosprev(e);
			graficaLapiz();
		}
	});
	canvas.addEventListener('mouseup', (e) => {
		graficaLapiz();
		mouse.click = false;
		console.log('dejo click');
	});
};

export { borrador };
//document.addEventListener('DOMContentLoaded', init);
