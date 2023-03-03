import checkStoredUrl from './checkStoredUrl.js';
import addNavbarListeners from './listeners/navbar.js';
import Modal from './modals/Modal.js';
import SettingsModal from './modals/SettingsModal.js';
import buildSite from './buildSite.js';

const updateData = checkStoredUrl();

// Only start building the site if the DOM is ready.
document.readyState !== 'loading' ? initSite() : window.addEventListener('DOMContentLoaded', initSite);

function initSite() {
	addNavbarListeners();

	// Create Modals and add event listeners to buttons.
	const settingsModal = new SettingsModal(document.getElementById('settingsmodal'));

	// Show something the user can interact with as soon as possible.
	showSomething(settingsModal);

	document.getElementById('settingsbutton').addEventListener('click', () => settingsModal.show(true));

	const helpModal = new Modal(document.getElementById('helpmodal'));
	document.getElementById('helpbutton').addEventListener('click', () => helpModal.show(true));
}

async function showSomething(settingsModal) {
	(await updateData).success ? buildSite((await updateData).data) : settingsModal.show(false, (await updateData).data);
}
