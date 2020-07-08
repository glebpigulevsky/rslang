export default class Rating {
  constructor() {
    this.elem = null;
  }

  addImageRating(elem) {
    this.ratingField = document.getElementById('rating');
    this.header = document.getElementById('header');
    this.inform = document.getElementById('text');
    if (elem === 4) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img class="img__mark"src="./assets/main/img/icon/mark.svg" alt="logo">');
      this.inform.insertAdjacentHTML('afterbegin', '<span>+20 points per word</span>');
      this.header.classList.remove('level__four');
      this.header.classList.add('level__two');
    } else if (elem === 8) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
      this.inform.innerHTML = '';
      this.inform.insertAdjacentHTML('afterbegin', '<span>+40 points per word</span>');
      this.header.classList.remove('level__two');
      this.header.classList.add('level__three');
    } else if (elem === 12) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
      this.inform.innerHTML = '';
      this.inform.insertAdjacentHTML('afterbegin', '<span>+80 points per word</span>');
      this.header.classList.remove('level__three');
      this.header.classList.add('level__four');
    }
  }
}
