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

  close() {
    document.addEventListener('click', (e) => {
      const toggleButton = document.querySelector('.hamburger-menu__button');
      const navBar = document.querySelector('.main-header__navigation');
      const { target } = e;
      const itsMenu = target === navBar || navBar.contains(target);
      const itsBtnMenu = target === toggleButton;
      const menuIsActive = navBar.classList.contains('toggle');
      if (!itsMenu && !itsBtnMenu && menuIsActive) {
        this.navBar.classList.toggle('toggle');
      }
    });
  }

  init() {
    this.burgerMenuClickHandler();
    this.close();
  }
}
