import getUpdateData from './getUpdateData.js';

export default async function checkStoredUrl() {
	const updateDataUrl = localStorage.getItem('url');

	// Check if there is an update data URL (with key: "url") stored in LocalStorage.
	if (updateDataUrl) {
		return await getUpdateData(updateDataUrl, JSON.parse(localStorage.getItem('predl') ?? true));
	} else {
		return {
			success: false,
			data: false // Returning false here as we don't want to display an error message
							// if the settings modal was shown beause there was no URL stored.
		};
	}
}
