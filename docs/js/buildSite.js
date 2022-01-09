function $(id) { return document.getElementById(id); }

const voiceLanguages = {
	'zh-cn': 'Chinese',
	'en-us': 'English',
	'ja-jp': 'Japanese',
	'ko-kr': 'Korean'
};

function translateVoiceLanguage(language) { return language in voiceLanguages ? voiceLanguages[language] : language; }

function buildDownloadButton(updatePath, highlighted = false, label = 'Download') {
	const downloadIcon = document.createElement('i');
	downloadIcon.classList.add('fas', 'fa-download');

	const iconSpan = document.createElement('span');
	iconSpan.classList.add('icon');
	iconSpan.appendChild(downloadIcon);

	const buttonTextStrong = document.createElement('strong');
	buttonTextStrong.appendChild(document.createTextNode(label));

	const downloadButton = document.createElement('a');
	downloadButton.href = updatePath;
	downloadButton.classList.add('button', 'is-success');
	if (!highlighted) downloadButton.classList.add('is-outlined');
	downloadButton.appendChild(iconSpan);
	downloadButton.appendChild(buttonTextStrong);

	return downloadButton;
}

function buildHashText(hash, prefix = 'MD5: ', margin = 0) {
	const hashParagraph = document.createElement('p');
	hashParagraph.classList.add(`mt-${margin}`, 'is-family-monospace');
	hashParagraph.appendChild(document.createTextNode(`${prefix}${hash}`));

	return hashParagraph;
}

function buildBox(update, title) {
	const titleParagraph = document.createElement('p');
	titleParagraph.classList.add('title', 'is-4');
	titleParagraph.appendChild(document.createTextNode(title));

	let dividerHorizontalRule, voiceFilesParagraph, buttonsDiv, hashesSubtitle;
	if (update.voice_packs?.length) {
		dividerHorizontalRule = document.createElement('hr');
		dividerHorizontalRule.classList.add('divider');

		voiceFilesParagraph = document.createElement('p');
		voiceFilesParagraph.classList.add('subtitle', 'mb-3');
		voiceFilesParagraph.appendChild(document.createTextNode('Voice-over files'));

		buttonsDiv = document.createElement('div');
		buttonsDiv.classList.add('buttons', 'has-addons');

		hashesSubtitle = document.createElement('p');
		hashesSubtitle.classList.add('subtitle', 'is-6', 'mb-3');
		hashesSubtitle.appendChild(document.createTextNode('MD5 hashes'));
	}

	const thisBox = document.createElement('div');
	thisBox.classList.add('box');
	thisBox.appendChild(titleParagraph);
	thisBox.appendChild(buildDownloadButton(update.path, true));
	thisBox.appendChild(buildHashText(update.md5, undefined, 3));

	if (update.voice_packs?.length) {
		thisBox.appendChild(dividerHorizontalRule);
		thisBox.appendChild(voiceFilesParagraph);
		thisBox.appendChild(buttonsDiv);
		thisBox.appendChild(hashesSubtitle);

		for (const voice_pack of update.voice_packs) {
			buttonsDiv.appendChild(buildDownloadButton(voice_pack.path, false, translateVoiceLanguage(voice_pack.language)));
			thisBox.appendChild(buildHashText(voice_pack.md5, `${translateVoiceLanguage(voice_pack.language)}: `, 0));
		}
	}

	const thisColumn = document.createElement('div');
	thisColumn.classList.add('column', 'is-full', 'is-half-widescreen');
	thisColumn.appendChild(thisBox);

	return thisColumn;
}

function buildBoxes(updates, container, prefix = '', startFrom = 0, showVersion = true) {
	if (updates) {
		if (Array.isArray(updates)) {
			if (updates.length) {
				for (let i = startFrom; i < updates.length; i++) {
					container.appendChild(buildBox(updates[i], `${prefix}${showVersion && updates[i].version ? updates[i].version : ''}`));
				}
				return true;
			}
		} else {
			container.appendChild(buildBox(updates, `${prefix}${showVersion && updates.version ? updates.version : ''}`));
			return true;
		}
	}
	return false;
}

export default function buildSite(updateData) {
	let gotLatestVersion = false;

	let versionTextNode;
	if (updateData.latest?.version) {
		versionTextNode = document.createTextNode(updateData.latest.version);
		$('versiontext').appendChild(versionTextNode);
		gotLatestVersion = true;
	}

	if (updateData.diffs?.[0]) {
		$('lastversiontext').appendChild(document.createTextNode(updateData.diffs[0].version));
	} else {
		$('lastversiontext').appendChild(document.createTextNode('the last version'));
	}

	const gotLatestDiff = buildBoxes(updateData.diffs?.[0], $('recboxes'), `Update to ${updateData.latest?.version ? updateData.latest.version : 'the latest version'}`, undefined, false);
	const gotFull = buildBoxes(updateData.latest, $('recboxes'), 'Get full ');
	const gotOlderDiffs = buildBoxes(updateData.diffs, $('oldboxes'), 'From ', 1);

	if (gotLatestVersion) $('versionbox').classList.remove('is-hidden');
	if (gotLatestDiff || gotFull) $('reccolumn').classList.remove('is-hidden');
	if (gotOlderDiffs) $('oldcolumn').classList.remove('is-hidden');
	$('progressbar').classList.add('is-hidden');
	if (gotLatestDiff || gotFull || gotOlderDiffs) $('maincolumn').classList.remove('is-hidden');
}
