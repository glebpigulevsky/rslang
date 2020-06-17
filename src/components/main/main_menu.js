export default class Menu {
  constructor() {
    this.isOpen = false;
  }

  burgerMenuClickHandler() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.toggleButton.addEventListener('click', () => {
      this.navBar.classList.toggle('toggle');
    });
  }

  init() {
    this.burgerMenuClickHandler();
  }
}
