class Menu {
  constructor() {
    this.onCloseClickHandlerBinded = this.onCloseClickHandler.bind(this);
    this.onBurgerIconClickHandlerBinded = this.onBurgerIconClickHandler.bind(this);
    this.onCloseMenuClickHandlerBinded = this.onCloseMenuClickHandler.bind(this);
    this.onLinksActiveClickHandlerBinded = this.onLinksActiveClickHandler.bind(this);
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

  onCloseMenuClickHandler(event) {
    if (event.target.closest('ul li a')) {
      this.navBar.classList.toggle('toggle');
    }
  }

  addCloseMenuClickHandler() {
    this.navigation.addEventListener('click', this.onCloseMenuClickHandlerBinded);
  }

  removeCloseMenuClickHandler() {
    this.navigation.removeEventListener('click', this.onCloseMenuClickHandlerBinded);
  }

  onLinksActiveClickHandler(event) {
    if (event.target.classList.contains('navigation__link')) {
      const clickedTag = event.target;
      const tags = document.querySelectorAll('.navigation__link');
      tags.forEach((tag) => {
        tag.classList.remove('active');
        tag.classList.add('navigation__link');
      });
      clickedTag.classList.add('active');
    } else if (event.target.classList.contains('icon')) {
      const clickedTag = event.target.parentNode;
      const tags = document.querySelectorAll('.navigation__link');
      tags.forEach((tag) => {
        tag.classList.remove('active');
        tag.classList.add('navigation__link');
      });
      clickedTag.classList.add('active');
    }
  }

  addLinksActiveClickHandler() {
    this.navigation.addEventListener('click', this.onLinksActiveClickHandlerBinded);
  }

  removeLinksActiveClickHandler() {
    this.navigation.removeEventListener('click', this.onLinksActiveClickHandlerBinded);
  }

  init() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.navigation = document.querySelector('.navigation__list');

    this.addBurgerIconClickHandler();
    this.addCloseButtonClickHandler();
    this.addCloseMenuClickHandler();
    this.addLinksActiveClickHandler();
  }
}

export default new Menu();
