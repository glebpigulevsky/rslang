export default class Rating {
  constructor() {
    this.elem = null;
  }

  addImageRating(elem) {
    this.ratingField = document.getElementById('rating');
    if (elem === 4) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img class="img__mark"src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 8) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 12) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
  }
}
