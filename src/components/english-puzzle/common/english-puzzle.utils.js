import { CLASS_NAMES, EVENTS } from './english-puzzle.constants';
import DEFAULT_BG_IMAGE from '../assets/img/9th_wave.jpg';

function onSuccessLoadImage() {
  this.resolve(this);
  this.removeEventListener(EVENTS.LOAD, onSuccessLoadImage);
}

function onErrorLoadImage() {
  this.src = DEFAULT_BG_IMAGE;
  this.resolve(this);
  this.removeEventListener(EVENTS.ERROR, onErrorLoadImage);
}

const loadImage = (url) => new Promise((resolve) => {
  const img = new Image();
  img.resolve = resolve;
  img.addEventListener(EVENTS.LOAD, onSuccessLoadImage);
  img.addEventListener(EVENTS.ERROR, onErrorLoadImage);
  img.src = url;
});

export const getPreloadedImage = async (url) => {
  const preloadedImg = await loadImage(url);
  return preloadedImg;
};

export const shuffleArray = (array) => {
  const result = array.slice();

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const setActiveState = (target) => {
  target.classList.add(CLASS_NAMES.ACTIVE);
};

export const togglePageState = (className) => document.body.querySelector('.english-puzzle-body')
  .classList.toggle(className);

export const getClosestLink = ({ target }) => target.closest(`.${CLASS_NAMES.LINK}`);

export const toggleDocumentScroll = () => document.querySelector('.english-puzzle-body')
  .classList.toggle(CLASS_NAMES.OVERFLOW_HIDDEN);

export const hideSpinner = () => document.querySelector('.spinner').classList.add(CLASS_NAMES.DISPLAY_NONE);
export const showSpinner = () => document.querySelector('.spinner').classList.remove(CLASS_NAMES.DISPLAY_NONE);

export const hideElement = (element) => element.classList.add(CLASS_NAMES.DISPLAY_NONE);
export const showElement = (element) => element.classList.remove(CLASS_NAMES.DISPLAY_NONE);

export const getPuzzleIndex = (puzzle) => +puzzle.dataset.item.slice(-2).replace('-', '') - 1;

export const getSentenceWordsArray = (roundData, currentSentence) => roundData[currentSentence]
  .textExample.replace('<b>', '').replace('</b>', '').split(' ');
