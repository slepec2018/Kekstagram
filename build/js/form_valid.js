import { fromStringToArray, arHasDuplicate } from './util.js';
import { form, formTextHashtags } from './form.js';
import { sendData } from './serv.js';
import { VALID_AMOUNT_HASHTAG, pagRulValid, lengtHashtag } from './data.js';

// Launching the Pristine Library
const pristine = new Pristine(form);

// Field validation for filling in a new image on the site through the Pristine library
pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	for (let item of convert) {
		if (item[0] !== '#') {
			return false;
		}
	}
	return true;
}, 'At the beginning of the hashtag must be #', pagRulValid.fifth, false);

pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	for (let item of convert) {
		if (!/^#[a-zа-яё0-9_]{1,19}$/i.test(item)) {
			return false;
		}
	}
	return true;
}, 'Hashtag can only contain letters and numbers', pagRulValid.fourth, false);

pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	for (let item of convert) {
		if (item.length === 1) {
			return false;
		}
	}
	return true;
}, 'A hashtag cannot consist of only one hash', pagRulValid.third, false);

pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	for (let item of convert) {
		if (item.length > lengtHashtag) {
			return false;
		}
	}
	return true;
}, 'Hashtag length cannot exceed 20 characters', pagRulValid.second, false);

pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	if (arHasDuplicate(convert)) {
		return true;
	}
	return false;
}, 'Hashtag must be unique', pagRulValid.first, false);

pristine.addValidator(formTextHashtags, function (value) {
	if (value === '') {
		return true;
	}

	const convert = fromStringToArray(value);

	if (convert.length > VALID_AMOUNT_HASHTAG) {
		return false;
	}
	return true;
}, 'More than 5 hashtags', pagRulValid.zero, false);

form.addEventListener('submit', (e) => {
	const valid = pristine.validate();

	e.preventDefault();

	if (valid) {
		let formData = new FormData(form);

		sendData(formData);
	}
});
