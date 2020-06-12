import './scss/slider.scss';

export default class Slider {
  constructor() {
    this.currentSlide = 0;
    this.isSliceEnabled = true;
    this.slides = [];

    this.slider = null;
    this.controlButtons = {
      previousSlide: null,
      nextSlide: null,
    };
  }

  changeCurrentSlide(index) {
    const { slides } = this;

    this.currentSlide = (index + slides.length) % slides.length;
  }

  hideItem(direction) {
    const { slides, currentSlide } = this;
    const slide = slides[currentSlide];

    this.isSliceEnabled = false;
    slide.classList.add(direction);
    slide.addEventListener('animationend', () => {
      slide.classList.remove('slider__active', direction);
    });
  }

  showItem(direction) {
    const { slides, currentSlide } = this;
    const slide = slides[currentSlide];

    slide.classList.add('slider__next', direction);
    slide.addEventListener('animationend', () => {
      slide.classList.remove('slider__next', direction);
      slide.classList.add('slider__active');
      this.isSliceEnabled = true;
    });
  }

  nextItem(index) {
    this.hideItem('to-left');
    this.changeCurrentSlide(index + 1);
    this.showItem('from-right');
  }

  previousItem(index) {
    this.hideItem('to-right');
    this.changeCurrentSlide(index - 1);
    this.showItem('from-left');
  }

  sliderButtonClickHandler(callBack) {
    if (this.slides.length === 1) return;
    if (this.isSliceEnabled) {
      callBack(this.currentSlide);
    }
  }

  addHandlers() {
    const { previousSlide, nextSlide } = this.controlButtons;
    const { previousItem, nextItem } = this;

    previousSlide.addEventListener('click', () => {
      this.sliderButtonClickHandler(previousItem.bind(this));
    });
    nextSlide.addEventListener('click', () => {
      this.sliderButtonClickHandler(nextItem.bind(this));
    });
  }

  init() {
    this.slider = document.querySelector('.slider__wrapper');
    this.slides = this.slider.querySelectorAll('.slider__item');
    this.controlButtons.previousSlide = this.slider.querySelector('.slider__button_previous');
    this.controlButtons.nextSlide = this.slider.querySelector('.slider__button_next');

    this.addHandlers();
  }
}
