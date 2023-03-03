import Modal            from './Modal.js';
import getUpdateData    from '../getUpdateData.js';

export default class SettingsModal extends Modal {
	// Private variable and method declarations
	#urlControl;
	#urlInput;
	#urlErrorIcon;
	#predlcheckbox;
	#saveButton;
	#urlFailBox;
	#urlFailText;
	#saveHandler;
	#enterHandler;

	constructor(modalElement) {
		super(modalElement);
		this.#urlControl     =   this.modal.getElementsByClassName('urlcontrol')[0];
		this.#urlInput       =   this.modal.getElementsByClassName('urlinput')[0];
		this.#urlErrorIcon   =   this.modal.getElementsByClassName('urlerroricon')[0];
		this.#predlcheckbox  =   this.modal.getElementsByClassName('predlcheckbox')[0];
		this.#saveButton     =   this.modal.getElementsByClassName('savebutton')[0];
		this.#urlFailBox     =   this.modal.getElementsByClassName('urlfailbox')[0];
		this.#urlFailText    =   this.modal.getElementsByClassName('urlfailtext')[0];

		this.#saveHandler    =   async () => await this.#saveButtonClicked();
		this.#enterHandler   =   () => this.#saveOnEnter();

		this.#saveButton.addEventListener('click', this.#saveHandler);
	}

	// Methods
	show(closeable, errorInfo = undefined) {
		this.#predlcheckbox.checked = JSON.parse(localStorage.getItem('predl')) ?? true;
		this.#urlInput.value = localStorage.getItem('url');

		if (errorInfo) this.#setErrorState(true, errorInfo);

		super.show(closeable);

		if (this.#urlInput.value) { this.#urlInput.select(); }
		this.#urlInput.focus();

		document.addEventListener('keydown', this.#enterHandler);
	}

	hide() {
		super.hide();
		document.removeEventListener('keydown', this.#enterHandler);
		this.#setErrorState(false);
	}

	#setLoadingState(isLoading) {
		isLoading ? document.removeEventListener('keydown', this.#enterHandler) : document.addEventListener('keydown', this.#enterHandler);
		this.#urlInput.disabled = isLoading;
		isLoading ? this.#saveButton.classList.add('is-loading') : this.#saveButton.classList.remove('is-loading');
	}

	#setErrorState(isError, errorInfo) {
		if (isError) {
			this.#urlInput.classList.add('is-danger');
			this.#urlControl.classList.add('has-icons-right');
			this.#urlErrorIcon.classList.remove('is-hidden');
			errorInfo ? this.#urlFailText.replaceChildren(document.createTextNode(errorInfo)) : this.#urlFailText.replaceChildren();
			this.#urlFailBox.classList.remove('is-hidden');
		} else {
			this.#urlFailBox.classList.add('is-hidden');
			this.#urlErrorIcon.classList.add('is-hidden');
			this.#urlControl.classList.remove('has-icons-right');
			this.#urlInput.classList.remove('is-danger');
		}
	}

	async #saveButtonClicked() {
		this.#setLoadingState(true);

		const updateData = await getUpdateData(this.#urlInput.value);

		if (updateData.success) {
			localStorage.setItem('predl', this.#predlcheckbox.checked);
			localStorage.setItem('url', this.#urlInput.value);
			location.reload();
		} else {
			this.#setLoadingState(false);
			this.#setErrorState(true, updateData.data);

			if (this.#urlInput.value) { this.#urlInput.select(); }
			this.#urlInput.focus();
		}
	}

	#saveOnEnter(event) {
		const e = event || window.event;
		if (e.keyCode === 13) { this.#saveButtonClicked(); }
	}
}
