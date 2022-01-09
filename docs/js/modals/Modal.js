export default class Modal {
	// Private variable and method declarations
	#isShown;
	#background;
	#closeButton;
	#escHandler;

	constructor(modalElement) {
		this.#isShown       =   false;
		this.modal          =   modalElement;

		this.hide           =   this.hide.bind(this);
		this.#escHandler    =   () => this.#hideOnEsc();

		this.#closeButton   =   this.modal.getElementsByClassName('modal-close')[0];
		this.#background    =   this.modal.getElementsByClassName('modal-background')[0];

		this.#background.addEventListener('click', this.hide);
		this.#closeButton.addEventListener('click', this.hide);
	}

	// Methods
	show(closeable) {
		if (!this.#isShown) {
			this.#isShown = true;

			if (!closeable) {
				this.#background.removeEventListener('click', this.hide);
				this.#closeButton.classList.add('is-hidden');
			}

			document.documentElement.classList.add('is-clipped');
			this.modal.classList.add('is-active');

			if (closeable) document.addEventListener('keydown', this.#escHandler);
		} else {
			throw 'attempt to show Modal while it was already shown';
		}
	}

	hide() {
		document.removeEventListener('keydown', this.#escHandler);
		this.modal.classList.remove('is-active');
		this.#closeButton.classList.remove('is-hidden');
		this.#background.addEventListener('click', this.hide);
		document.documentElement.classList.remove('is-clipped');
		this.#isShown = false;
	}

	#hideOnEsc(event) {
		const e = event || window.event;
		if (e.keyCode === 27) { this.hide(); }
	}
}
