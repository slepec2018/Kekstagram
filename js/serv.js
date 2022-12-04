import { generateFotos } from './data.js';
import {form, imgUploadPrev, scaleVal, loadImgOverlay, effectSlider} from './form.js'
import { showMesConfirm } from './messages.js';
import { closeModal } from './util.js';

// The function of collecting post cards data from the server
const takeData = () => {

	return fetch('https://raw.githubusercontent.com/slepec2018/Kekstagram/master/data.json')
		.then((response) => {
			if (response.status !== 200) {
				alert('Looks like there was a problem. Status Code: ' + response.status);
				// Emergency filling of the container with post mocks
				return generateFotos();
			}
			return response.json();
		})
		.catch((err) => {
			alert(err);
			// Emergency filling of the container with post mocks
			return generateFotos();
		});
};

// The function of sending data of a new post uploaded by the user
const sendData = (formData) => {
	fetch('https://27.javascript.pages.academy/kekstagram', {
		method: 'POST',
		body: formData,
	})
		.then(({ ok }) => {
			if (ok) {
				showMesConfirm();

				form.reset();
				imgUploadPrev.style.transform = 'scale(1)';
				scaleVal.val = 100;
				imgUploadPrev.style.filter = 'none';
				effectSlider.style.display = 'none';

				closeModal(loadImgOverlay);
			} else {
				alert('Problems');
			}
		})
		.catch((err) => {
			alert(err);
		});
};

export { takeData, sendData};
