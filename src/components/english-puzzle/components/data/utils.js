import {
  CLASS_NAMES,
  ELEMENTS,
  EVENTS,
} from './helper';

export const createCard = ({
  word,
  image,
  audio,
  transcription,
}) => `
  <a class="card__link link" href="#" data-word="${word}" data-audio="${audio.slice(6)}" data-image="${image.slice(6)}">
    <p class="card__word">${word}</p>
    <p class="card__transcription">${transcription}</p>
  </a>
`;

export const createCardWithTranslation = ({
  word,
  image,
  audio,
  transcription,
}, translationsMap) => `
  <a class="card__link link" href="#" data-word="${word}" data-audio="${audio.slice(6)}" data-image="${image.slice(6)}">
    <p class="card__word">${word}</p>
    <p class="card__transcription">${transcription}</p>
    <p class="card__translation">${translationsMap.get(word)}</p>
  </a>
`;

export const setActiveState = (target) => {
  target.classList.add(CLASS_NAMES.ACTIVE);
};

export const toggleHiddenState = (element) => element.classList.toggle(CLASS_NAMES.HIDDEN);

export const togglePageState = (className) => document.body.classList.toggle(className);

export const getClosestLink = ({ target }) => target.closest(`.${CLASS_NAMES.LINK}`);

export const isButtonClicked = ({ target }) => target.closest(`.${CLASS_NAMES.BUTTON_ROUNDED}`);

export const toggleDocumentScroll = () => document.querySelector('.body')
  .classList.toggle(CLASS_NAMES.OVERFLOW_HIDDEN);

export const initIntroButton = (onIntroButtonClick) => document.querySelector('.introduction__button')
  .addEventListener(EVENTS.CLICK, onIntroButtonClick);

export const shuffleArray = (array) => {
  const result = array.slice();

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// export const loadCardsJSON = (difficult, addPageList) => {
//   const randomPage = Math.floor(Math.random() * 30);
//   const url = `${CARDS_API_URL}${difficult}&page=${randomPage}`;
//   fetchData(url, addPageList);
// };

const CARDS_API_URL = 'https://afternoon-falls-25894.herokuapp.com/words';
export const CARDS_API = {
  fetchCardsPage: (difficult, page) => {
    const url = `${CARDS_API_URL}?group=${difficult}&page=${page}`;
    return fetchData(url)
      .then((response) => response.count);
  },
  fetchMaxPagesCountInDifficultCategory: (difficult) => {
    const url = `${CARDS_API_URL}/count?group=${difficult}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
    return fetchData(url)
      .then((response) => response.count);
  },
  fetchCardsPageWithMaxTenWordsSentences: (difficult, page) => {
    const url = `${CARDS_API_URL}?group=${difficult}&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
    return fetchData(url);
  },
};

const TRANSLATION_API = {
  KEY: 'trnsl.1.1.20200421T205036Z.347a36771eccbf86.128e556f05422ed731036b9f43105af4ba3a7352',
  URL: 'https://translate.yandex.net/api/v1.5/tr.json/translate?&lang=en-ru&text=',
};

export const translateWord = (word, callBack) => {
  fetchData(`${TRANSLATION_API.URL}${word}&key=${TRANSLATION_API.KEY}`, callBack);
};

export const createStar = (starSrc) => {
  const starImg = document.createElement('img');
  starImg.alt = CLASS_NAMES.STAR;
  starImg.classList.add(CLASS_NAMES.STAR);
  starImg.src = starSrc;
  return starImg;
};

export const hideSpinner = () => document.querySelector('.spinner').classList.add(CLASS_NAMES.HIDDEN);

export const showSpinner = () => document.querySelector('.spinner').classList.remove(CLASS_NAMES.HIDDEN);

export const hideElement = (element) => element.classList.add(CLASS_NAMES.HIDDEN);
export const showElement = (element) => element.classList.remove(CLASS_NAMES.HIDDEN);
