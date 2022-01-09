export default async function getUpdateData(updateDataUrl, predl = true) {
	console.log(`Getting update data with${predl ? '' : 'out'} pre-downloads`);

	if (!updateDataUrl) {
		return {
			success: false,
			data: 'No link provided.'
		};
	}

	let responseJson;

	try {
		responseJson = await fetch(updateDataUrl, {
			credentials: 'omit',
			referrerPolicy: 'no-referrer'
		});

		if (!responseJson.ok) {
			return {
				success: false,
				data: 'Response is not OK. Check if the entered link is valid.'
			};
		}
	} catch (error) {
		return {
			success: false,
			data: 'Fetching failed. Check if the entered link contains update data and if you have a working internet connection.'
		};
	}

	try {
		const response = await responseJson.json();
		const predldata = response.data.pre_download_game;

		console.log(`Pre-download data${predldata ? '' : ' not'} found`);

		return {
			success: true,
			data: predl && predldata ? predldata : response.data.game
		};
	} catch (error) {
		return {
			success: false,
			data: 'JSON parsing failed. Check if the entered link contains update data.'
		};
	}
}
