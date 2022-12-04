import { getScrollbarWidth } from './util.js';
import { loadUserImg } from './form.js';
import { takeData } from './serv.js';
import { imgCatalogFilter, manageData } from './filter.js';
import './form_valid.js';
import './messages.js';

// Passing an array from the server to the module with catalog filters for displaying photo cards
takeData().then(manageData);

// Fix container blinking when opening popups
// Opening the photo catalog filter panel
window.addEventListener('load', () => {
	document.body.style.setProperty('--scroll-width', getScrollbarWidth());
	imgCatalogFilter.classList.remove('img-filters--inactive');
});

// Binding the popup opening event of uploading a new image to the site
loadUserImg();
