class Menu {
  constructor() {
    this.onCloseClickHandlerBinded = this.onCloseClickHandler.bind(this);
    this.onBurgerIconClickHandlerBinded = this.onBurgerIconClickHandler.bind(this);
  }

  onBurgerIconClickHandler() {
    this.navBar.classList.toggle('toggle');
  }

  addBurgerIconClickHandler() {
    this.toggleButton.addEventListener('click', this.onBurgerIconClickHandlerBinded);
  }

  removeBurgerIconClickHandler() {
    this.toggleButton.removeEventListener('click', this.onBurgerIconClickHandlerBinded);
  }

  onCloseClickHandler({ target }) {
    const itsMenu = target === this.navBar || this.navBar.contains(target);
    const itsBtnMenu = target === this.toggleButton;
    const menuIsActive = this.navBar.classList.contains('toggle');
    if (!itsMenu && !itsBtnMenu && menuIsActive) {
      this.navBar.classList.toggle('toggle');
    }
  }

  addCloseButtonClickHandler() {
    document.addEventListener('click', this.onCloseClickHandlerBinded);
  }

  removeCloseButtonClickHandler() {
    document.removeEventListener('click', this.onCloseClickHandlerBinded);
  }

  init() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');

    this.addBurgerIconClickHandler();
    this.addCloseButtonClickHandler();
  }
}

export default new Menu();
