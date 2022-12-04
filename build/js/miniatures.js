// Post template variable
const templatePicOtherUsers = document.querySelector('#picture').content.querySelector('.picture');

// Function to create a post from a template
const fillPicturesOtherUsers = (generatedData, getFullPost) => {
	const fragment = new DocumentFragment();

	for (const item of generatedData) {
		const { url, likes, comments: { length } } = item;
		const clone = templatePicOtherUsers.cloneNode(true);

		clone.querySelector('.picture__img').setAttribute('src', url);
		clone.querySelector('.picture__likes').textContent = likes;
		clone.querySelector('.picture__comments').textContent = length;

		getFullPost(item, clone);

		fragment.append(clone);
	}

	return fragment;
};

export {fillPicturesOtherUsers}

