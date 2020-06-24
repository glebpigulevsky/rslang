const settings = {
  buttons: null,
  init() {
    this.buttons = document.querySelectorAll('.switch-btn');
    this.buttons.forEach(element => {
      element.addEventListener('click', () => {
        element.classList.toggle('switch-on');
      });
    });
  },
};

export default settings;
