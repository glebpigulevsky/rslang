import { CLASS_NAMES, EVENTS } from './speakit.constants';
import DEFAULT_IMAGE from '../assets/img/logo.png';

function onSuccessLoadImage() {
  this.resolve(this);
  this.removeEventListener(EVENTS.LOAD, onSuccessLoadImage);
}

function onErrorLoadImage() {
  this.src = DEFAULT_IMAGE;
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

export const setActiveState = (target) => {
  target.classList.add(CLASS_NAMES.ACTIVE);
};

export const togglePageState = (className) => document.querySelector('.speakit-body').classList.toggle(className);

export const getClosestLink = ({ target }) => target.closest(`.${CLASS_NAMES.LINK}`);

export const toggleDocumentScroll = () => document.querySelector('.speakit-body')
  .classList.toggle(CLASS_NAMES.OVERFLOW_HIDDEN);

export const shuffleArray = (array) => {
  const result = array.slice();
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const createStar = (starSrc) => {
  const starImg = document.createElement('img');
  starImg.alt = CLASS_NAMES.STAR;
  starImg.classList.add(CLASS_NAMES.STAR);
  starImg.src = starSrc;
  return starImg;
};
