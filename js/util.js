// Word base for lorem
const WORDS = [
	'got',
	'ability',
	'shop',
	'recall',
	'fruit',
	'easy',
	'dirty',
	'giant',
	'shaking',
	'ground',
	'weather',
	'lesson',
	'almost',
	'square',
	'forward',
	'bend',
	'cold',
	'broken',
	'distant',
	'adjective',
];

// Variable for the full operation of the function of randomly adding one or two array elements
const RoulleteRange = {
	MIN: 1,
	MAX: 2,
};

// Function of a random number from a given range including boundaries
const getRandomNumber = (min, max) => {
	if (min < 0 || max < 0 || min >= max) {
		return NaN;
	}

	const finMin = Math.ceil(Math.min(min, max));
	const finMax = Math.floor(Math.max(min, max));

	return Math.floor(Math.random() * (finMax - finMin + 1)) + finMin;
};

// Function of a random element from a given array
const getRandomItemArr = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

// Function to randomly add one or two array elements
const getRandomCommentsArray = (arr) => {
	const roulette = getRandomNumber(RoulleteRange.MIN, RoulleteRange.MAX);

	if (roulette === 1) {
		return getRandomItemArr(arr);
	}
	return getRandomItemArr(arr) + getRandomItemArr(arr);
};

// Function to capitalize the first letter of a string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Random word selection function (array element)
const getRandomWord = () => {
	const word = getRandomItemArr(WORDS);
	return word;
};

// lorem creation function
const generateWords = (length) => {
	return capitalize([...Array(length)].map(getRandomWord).join(' ') + '.');
};

// Function to determine the size of the scrollbar
const getScrollbarWidth = () => {
	const scrollbarWidth = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
	return `${scrollbarWidth}px`;
};

// Popup opening function
const openModal = (dot) => {
	dot.classList.remove('hidden');
	document.body.classList.add('modal-open');
};

// Popup closing function
const closeModal = (dot) => {
	document.body.classList.remove('modal-open');
	dot.classList.add('hidden');
};

// Function to convert from string to array with space delimiter
const fromStringToArray = (value) => {
	return value.toLowerCase().split(' ');
};

// Function to check for the presence of duplicates in an array
const arHasDuplicate = (arr) => {
	return new Set(arr).size === arr.length;
};

export { getRandomNumber, getRandomItemArr, getRandomCommentsArray, generateWords, getScrollbarWidth, openModal, closeModal, fromStringToArray, arHasDuplicate };
