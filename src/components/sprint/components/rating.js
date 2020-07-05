export default class Rating {
  constructor() {
    this.elem = null;
  }

  addImageRating(elem) {
    this.ratingField = document.getElementById('rating');
    if (elem <= 4) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 5) {
      this.ratingField.innerHTML = '';
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem > 5 && elem < 9) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 9) {
      this.ratingField.innerHTML = '';
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem > 9 && elem < 13) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 13) {
      this.ratingField.innerHTML = '';
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem > 13 && elem < 17) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (elem === 17) {
      this.ratingField.innerHTML = '';
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
    if (elem > 17) {
      this.ratingField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
  }
}
