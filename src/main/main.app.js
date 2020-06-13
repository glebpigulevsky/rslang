import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
  }

  sayHello() {
    console.log(this.logoContent);

    this.logoElement.textContent = this.logoContent;
  }

  init() {
    this.logoElement = document.querySelector('.main__logo');
    this.logoContent = 'Hello from Main';
  }
}

export default new Main();