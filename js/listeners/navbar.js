export default async function addNavbarListeners() {
	const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	if (navbarBurgers.length) {
		navbarBurgers.forEach(navbarBurger => {
			navbarBurger.addEventListener('click', () => {
				const targetId = navbarBurger.dataset.target;
				const target = document.getElementById(targetId);

				navbarBurger.classList.toggle('is-active');
				target.classList.toggle('is-active');
			});
		});
	}
}
