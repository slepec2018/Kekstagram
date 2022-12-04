const tempMesErr = document.querySelector('#error').content.querySelector('.error');
const projectBody = document.querySelector('body');
const tempMesConfirm = document.querySelector('#success').content.querySelector('.success');

// The function of opening a popup message about problems loading a new post on the server
const showMesErr = () => {
	const clone = tempMesErr.cloneNode(true);
	const errorCloseBut = clone.querySelector('.error__button');
	const activLabel = clone.querySelector('.error__inner');

	activLabel.classList.add('error_label');

	errorCloseBut.addEventListener('click', () => {
		projectBody.lastChild.remove();
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && activLabel !== null) {
			projectBody.lastChild.remove();
		}
	});

	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('error')) {
			projectBody.lastChild.remove();
		}
	});

	projectBody.append(clone);
};

// The function of opening a popup message about the successful upload of a new post to the server
const showMesConfirm = () => {
	const clone = tempMesConfirm.cloneNode(true);
	const confirmCloseBut = clone.querySelector('.success__button');
	const activLabel = clone.querySelector('.success__inner');

	confirmCloseBut.addEventListener('click', () => {
		projectBody.lastChild.remove();
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && activLabel !== null) {
			projectBody.lastChild.remove();
		}
	});

	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('success')) {
			projectBody.lastChild.remove();
		}
	});

	projectBody.append(clone);
};

export { showMesErr, showMesConfirm };
