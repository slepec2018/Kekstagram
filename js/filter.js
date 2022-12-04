import { pointFillPicOtherUsers, countImg } from './data.js';
import { fillPicturesOtherUsers } from './miniatures.js';
import { getFullPost } from './full_post.js';
import { getRandomNumber } from './util.js'

const imgCatalogFilter = document.querySelector('.img-filters');
const catalogFilterButtons = document.querySelector('.img-filters__form').querySelectorAll('.img-filters__button');
const filButtonDef = imgCatalogFilter.querySelector('#filter-default');
const filButtonRan = imgCatalogFilter.querySelector('#filter-random');
const filButtonDis = imgCatalogFilter.querySelector('#filter-discussed');

// The function of cleaning the catalog from posts
const cleanCatalogPic = () => {
	const imgArrCatalog = pointFillPicOtherUsers.querySelectorAll('.picture');

	for (let item of imgArrCatalog) {
		item.remove();
	}
};

// Active Filter Button Assignment Function
const selectActivButton = (button) => {
	for (let item of catalogFilterButtons) {
		item.classList.remove('img-filters__button--active');
	}

	button.classList.add('img-filters__button--active');
};

// The function to start displaying the default post catalog, a list from the server
const getPicAfterFilButtonDef = (data) => {
	cleanCatalogPic();

	pointFillPicOtherUsers.append(fillPicturesOtherUsers(data, getFullPost));

	selectActivButton(filButtonDef);
};

// The function of launching the display of the catalog of posts with a random location and the number of posts
const getPicAfterFilButtonRan = (data) => {
	cleanCatalogPic();

	const deepData = JSON.parse(JSON.stringify(data));
	const newData = [];

	for (let i = 0; i < countImg; i++) {
		const number = getRandomNumber(0, deepData.length - 1);
		newData.push(deepData[number]);
		deepData.splice(number, 1);
	}

	pointFillPicOtherUsers.append(fillPicturesOtherUsers(newData, getFullPost));

	selectActivButton(filButtonRan);
};

// The function of launching the display of the catalog of posts by the number of comments, descending
const getPicAfterFilButtonDis = (data) => {
	cleanCatalogPic();

	const deepData = JSON.parse(JSON.stringify(data));

	deepData.sort(function (a, b) {
		if (a.comments.length > b.comments.length) {
			return -1;
		}
		if (a.comments.length < b.comments.length) {
			return 1;
		}
		return 0;
	});

	pointFillPicOtherUsers.append(fillPicturesOtherUsers(deepData, getFullPost));

	selectActivButton(filButtonDis);
};

// Sort call function
const manageData = (data) => {
	pointFillPicOtherUsers.append(fillPicturesOtherUsers(data, getFullPost));

	filButtonDef.addEventListener('click', () => {
		getPicAfterFilButtonDef(data);
	});
	filButtonRan.addEventListener('click', () => {
		getPicAfterFilButtonRan(data)
	});
	filButtonDis.addEventListener('click', () => {
		getPicAfterFilButtonDis(data)
	});
};

export { imgCatalogFilter, getPicAfterFilButtonDef, getPicAfterFilButtonRan, getPicAfterFilButtonDis, filButtonDef, filButtonRan, filButtonDis, manageData }
