export default class Rating {
  constructor() {
    this.gameResults = null;
  }
  
  addImageRating(add) {
    const rightField = document.getElementById('rating');
    if (add <= 4) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 5) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 5 && add < 9) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 9) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 9 && add < 13) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 13) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add > 13 && add < 17) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    } else if (add === 17) {
      rightField.innerHTML = '';
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
    if (add > 17) {
      rightField.insertAdjacentHTML('afterbegin', '<img src="./assets/main/img/icon/mark.svg" alt="logo">');
    }
  }

}
