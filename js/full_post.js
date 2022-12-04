import { openModal, closeModal } from './util.js';
import { COMMENT_PORTION } from './data.js';
// Popup Post Variables
const bigPicture = document.querySelector('.big-picture');
const pic = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');

// Post comment variables in popup
const socialCommentsEl = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let socialCommentCountItem = bigPicture.querySelector('.social__comment-count-item');

// Comment Accounting Variables
let socialCommentCountItemNumb = COMMENT_PORTION;
socialCommentCountItem.textContent = socialCommentCountItemNumb;
let currentLoaderHandler = null;

// Comment template function
const getItemTemplate = ({avatar, name, message}) => `<li class="social__comment">
<img
class="social__picture"
src="${avatar}"
alt="${name}"
idth="35" height="35">
<p class="social__text">${message}</p>
</li>`;

// Hanging an event opening a popup post
const getFullPost = (data, element) => {
	element.addEventListener('click', () => {
		let socialComments = [];

		// Function to open a popup post
		openModal(bigPicture);

		pic.setAttribute('src', data.url);
		likesCount.textContent = data.likes;
		commentsCount.textContent = data.comments.length;

		let numberMessages = 0;

		if (data.comments.length <= socialCommentCountItemNumb) {
			socialCommentCountItem.textContent = data.comments.length;
			numberMessages = data.comments.length;
			commentsLoader.classList.add('hidden');
		} else {
			socialCommentCountItem.textContent = socialCommentCountItemNumb;
			numberMessages = socialCommentCountItemNumb;
		}

		// The cycle of filling comments
		for (let i = 0; i < numberMessages; i++) {
			socialComments.push(getItemTemplate(data.comments[i]));
		}

		socialCommentsEl.innerHTML = '';
		socialCommentsEl.insertAdjacentHTML('afterbegin', socialComments.join(''));

		socialCaption.textContent = data.description;

		// Resetting events on more comments button
		if (currentLoaderHandler) {
			commentsLoader.removeEventListener('click', currentLoaderHandler);
		}

		currentLoaderHandler = function () {
			if (data.comments.length <= socialCommentCountItemNumb + COMMENT_PORTION) {
				const jump = [];

				for (let i = socialCommentCountItemNumb; i < data.comments.length; i++) {
					jump.push(getItemTemplate(data.comments[i]));
				}

				socialCommentCountItem.textContent = data.comments.length;

				socialCommentsEl.insertAdjacentHTML('afterbegin', jump.join(''));

				commentsLoader.classList.add('hidden');
			} else {
				const jump = [];

				for (let i = socialCommentCountItemNumb; i < socialCommentCountItemNumb + COMMENT_PORTION; i++) {
					jump.push(getItemTemplate(data.comments[i]));
				}

				socialCommentCountItemNumb += COMMENT_PORTION;
				socialCommentCountItem.textContent = socialCommentCountItemNumb;

				socialCommentsEl.insertAdjacentHTML('afterbegin', jump.join(''));
			}
		}

		// More comments button click event
		commentsLoader.addEventListener('click', currentLoaderHandler);
	});
};

// The function of closing the popup post and clearing the values to default
const closeFullPost = () => {
	closeModal(bigPicture);
	socialCommentCountItemNumb = COMMENT_PORTION;
	commentsLoader.classList.remove('hidden');
};

// Popup post close event
bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
	closeFullPost();
});

// Popup post closing event by ESC button
document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape' && !bigPicture.classList.contains('hidden')) {
		closeFullPost();
	}
});

export { getFullPost };
