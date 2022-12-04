import { getRandomNumber, getRandomItemArr, getRandomCommentsArray, generateWords } from './util.js'
// Database
const COMMENT_TEXTS = [
	'Everything is great!',
	'In general, everything is good. But not all.',
	'When you take a photo, it s good to remove your finger from the frame. After all, it s just unprofessional.',
	'My grandmother accidentally sneezed with a camera in her hands and she got a better picture.',
	'I slipped on a banana peel and dropped the camera on the cat and got a better photo.',
	'The faces of the people in the photo are distorted, as if they are being beaten. How could you catch such an unfortunate moment?!',
];
const COMMENT_NAMES = ['Artem', 'Anna', 'Veronica', 'Anton', 'Svetlana', 'Yuri', 'Peter'];
const COUNT_WORDS = 10;
const LikeRange = {
	MIN: 15,
	MAX: 2000,
};
const AmountCommentsRange = {
	MIN: 1,
	MAX: 20,
};
const AvatarRange = {
	MIN: 1,
	MAX: 6,
};
const FOTOS_COUNT = 26;
let ammountCommentID = 1;
const EFFECT_DATA = {
	chrome: {
		filter: 'grayscale',
		min: 0,
		max: 1,
		step: 0.1,
		style: 'effects__preview--chrome',
		unit: '',
	},
	sepia: {
		filter: 'sepia',
		min: 0,
		max: 1,
		step: 0.1,
		style: 'effects__preview--sepia',
		unit: '',
	},
	marvin: {
		filter: 'invert',
		min: 0,
		max: 100,
		step: 1,
		style: 'effects__preview--marvin',
		unit: '%',
	},
	phobos: {
		filter: 'blur',
		min: 0,
		max: 3,
		step: 0.1,
		style: 'effects__preview--phobos',
		unit: 'px',
	},
	heat: {
		filter: 'brightness',
		min: 1,
		max: 3,
		step: 0.1,
		style: 'effects__preview--heat',
		unit: '',
	},
};
const COMMENT_PORTION = 5;
const SCALE_PORTION = 25;
const VALID_AMOUNT_HASHTAG = 5;
const pagRulValid = {
	zero: 0,
	first: 1,
	second: 2,
	third: 3,
	fourth: 4,
	fifth: 5,
};
const lengtHashtag = 20;
const countImg = 10;

// Variable to fill container with posts
const pointFillPicOtherUsers = document.querySelector('.pictures');

// Announcement function
const generateFotoComment = () => {
	return {
		id: ammountCommentID++,
		avatar: `img/avatar-${getRandomNumber(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
		message: getRandomCommentsArray(COMMENT_TEXTS),
		name: getRandomItemArr(COMMENT_NAMES),
	}
};

// The function of forming an array of comments
const generateFotoComments = (length) => {
	return Array.from({ length }, () => generateFotoComment());
};

// Post formation function
const generateFoto = (index) => {
	return {
		id: index,
		url: `photos/${index}.jpg`,
		description: generateWords(COUNT_WORDS),
		likes: getRandomNumber(LikeRange.MIN, LikeRange.MAX),
		comments: generateFotoComments(getRandomNumber(AmountCommentsRange.MIN, AmountCommentsRange.MAX)),
	}
};

// The function of forming an array of posts
const generateFotos = (length = FOTOS_COUNT) => {
	return Array.from({ length }, (_el, i) => generateFoto(i + 1));
};

export { generateFotos, EFFECT_DATA, pointFillPicOtherUsers, COMMENT_PORTION, SCALE_PORTION, VALID_AMOUNT_HASHTAG, pagRulValid, lengtHashtag, countImg }
