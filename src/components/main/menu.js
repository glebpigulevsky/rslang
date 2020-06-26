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

  onCloseMenuClickHandler() {
    const { navigation } = this;
    let countClicks = 0;
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('ul li a')) {
        countClicks = (countClicks + 1) % 2;
        this.navBar.classList.toggle('toggle');
      }
    });
  }

  addLinksClickHandler() {
    const { navigation } = this;
    navigation.addEventListener('click', (e) => {
      if (e.target.classList.contains('navigation__link')) {
        const clickedTag = e.target;
        const tags = document.querySelectorAll('.navigation__link');
        tags.forEach((tag) => {
          tag.classList.remove('active');
          tag.classList.add('navigation__link');
        });
        clickedTag.classList.add('active');
      }
    });
  }

  init() {
    this.toggleButton = document.querySelector('.hamburger-menu__button');
    this.navBar = document.querySelector('.main-header__navigation');
    this.navigation = document.querySelector('.navigation__list');

    this.addBurgerIconClickHandler();
    this.addCloseButtonClickHandler();
    this.onCloseMenuClickHandler();
    this.addLinksClickHandler();
  }
}

export default new Menu();
