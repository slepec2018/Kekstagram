import { openModal, closeModal } from './util.js';
import { EFFECT_DATA, SCALE_PORTION } from './data.js';

//  Popup variables for uploading a new image to the site
const form = document.querySelector('.img-upload__form');
const formloadImg = form.querySelector('.img-upload__input');
const loadImgOverlay = form.querySelector('.img-upload__overlay');
const formLoadClose = form.querySelector('.img-upload__cancel');

// Variable fields for filling in hashtags and comments of a new image on the site
const formTextHashtags = form.querySelector('.text__hashtags');
const formTextDescription = form.querySelector('.text__description');

// Image Zoom Field Variables
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlVal = form.querySelector('.scale__control--value');
const imgUploadPrev = form.querySelector('.img-upload__preview img');
const scaleVal = { val: 100};

// Binding the popup opening event of uploading a new image to the site
const loadUserImg = () => {
	formloadImg.addEventListener('change', () => {
		openModal(loadImgOverlay);
	});
};

// function to reset scaling data, filters to default
const cleanAllValue = () => {
	imgUploadPrev.style.transform = 'scale(1)';
	scaleVal.val = 100;
	imgUploadPrev.style.filter = 'none';
	scaleControlVal.value = `${scaleVal.val}%`;
	effectSlider.style.display = 'none';
};

// Popup closing event of loading a new image on the site
formLoadClose.addEventListener('click', () => {
	form.reset();

	cleanAllValue();

	closeModal(loadImgOverlay);
});

// Checking the focus of the fields to close the popup on ESC
let checkBeforeEsc = false;
formTextHashtags.addEventListener('focus', () => {
	checkBeforeEsc = true;
});
formTextHashtags.addEventListener('blur', () => {
	checkBeforeEsc = false;
});
formTextDescription.addEventListener('focus', () => {
	checkBeforeEsc = true;
});
formTextDescription.addEventListener('blur', () => {
	checkBeforeEsc = false;
});

// The event of closing the popup of loading a new image on the site with the ESC key
document.addEventListener('keydown', (event) => {
	const errorLabel = document.querySelector('.error_label');

	if (event.code === 'Escape' && !loadImgOverlay.classList.contains('hidden') && errorLabel === null) {
		if (checkBeforeEsc) {
			event.stopPropagation();
		} else {
			form.reset();

			cleanAllValue();

			closeModal(loadImgOverlay);
		}
	}
});

// Zoom Out Button Event
scaleControlSmaller.addEventListener('click', (event) => {
	if (scaleVal.val === SCALE_PORTION) {
		event.stopPropagation();
	} else {
		scaleVal.val -= SCALE_PORTION;
		scaleControlVal.value = `${scaleVal.val}%`;
		imgUploadPrev.style.transform = `scale(${scaleVal.val === 100 ? 1 : 0}.${scaleVal.val === 100 ? 0 : scaleVal.val})`;
	}
});

// Zoom button event
scaleControlBigger.addEventListener('click', (event) => {
	if (scaleVal.val === 100) {
		event.stopPropagation();
	} else {
		scaleVal.val += SCALE_PORTION;
		scaleControlVal.value = `${scaleVal.val}%`;
		imgUploadPrev.style.transform = `scale(${scaleVal.val === 100 ? 1 : 0}.${scaleVal.val === 100 ? 0 : scaleVal.val})`;
	}
});

// Image view filters work variables
const effects = form.querySelectorAll('.effects__radio');
const effectSlider = form.querySelector('.img-upload__effect-level');
const effectInput = effectSlider.querySelector('.effect-level__value');
const stepSlider = document.getElementById('slider-step');

// slider data template function
const createSliderOption = (eff) => {
	return {
		start: [(EFFECT_DATA[eff].max - EFFECT_DATA[eff].min) / 2 + EFFECT_DATA[eff].min],
		step: EFFECT_DATA[eff].step,
		range: {
			'min': [EFFECT_DATA[eff].min],
			'max': [EFFECT_DATA[eff].max],
		},
	}
};

// Creating a filter slider using the noUiSlider library
noUiSlider.create(stepSlider, createSliderOption('chrome'));

effectSlider.style.display = 'none';

// Binding filter style change event to buttons
let currentEffect = 'none';

// Template function for styling filters
const updateHandler = function ([value]) {
	if (!EFFECT_DATA[currentEffect]) {
		return;
	}

	const { filter, unit } = EFFECT_DATA[currentEffect];
	imgUploadPrev.style.filter = `${filter}(${value}${unit})`;
	effectInput.value = value;
};

// Update default data and slider
stepSlider.noUiSlider.on('update', updateHandler);

// Assigning an event to image filter buttons
for (let effect of effects) {
	effect.addEventListener('click', (evt) => {
		[, currentEffect] = evt.currentTarget.id.split('-');

		// Resetting these filters to default
		imgUploadPrev.style.filter = '';
		imgUploadPrev.removeAttribute('class');
		effectInput.setAttribute('value', '100');

		if (!EFFECT_DATA[currentEffect]) {
			effectSlider.style.display = 'none';
		} else {
			effectSlider.style.display = 'block';
			imgUploadPrev.classList.add(EFFECT_DATA[currentEffect].style);

			stepSlider.noUiSlider.updateOptions(createSliderOption(currentEffect));
		}
	});
}

// Loaded image preview function event
formloadImg.addEventListener('change', () => {
	const [file] = formloadImg.files;

	imgUploadPrev.setAttribute('src', `${URL.createObjectURL(file)}`);
});

export { loadUserImg, form, formTextHashtags, imgUploadPrev, scaleVal, loadImgOverlay, effectSlider };
