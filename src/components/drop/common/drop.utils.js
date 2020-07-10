export const shuffleArray = (array) => {
  const result = array.slice();

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const hideSpinner = () => document.querySelector('.spinner').classList.add('display-none');
export const showSpinner = () => document.querySelector('.spinner').classList.remove('display-none');

export const hideElement = (element) => element.classList.add('display-none');
export const showElement = (element) => element.classList.remove('display-none');
