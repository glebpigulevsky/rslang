export default class ErrorInput {
  constructor() {
    this.span = null;
    this.container = null;
    this.input = null;
    this.errorSpans = null;
    this.onInputChangeHandlerBinded = this.onInputChangeHandler.bind(this);
    this.onContainerClickHandlerBinded = this.onContainerClickHandler.bind(this);
  }

  init() {
    this.span = document.querySelector('.background');
    this.container = document.querySelector('.input-container');
    this.input = document.querySelector('.answer-input');
    this.watch();
  }

  close() {
    this.input.removeEventListener('change', this.onInputChangeHandlerBinded);
  }

  watch() {
    this.errorSpans = Array.from(this.span.querySelectorAll('.errors'));
    console.log(this.errorSpans);
    this.input.addEventListener('change', this.onInputChangeHandlerBinded);
  }

  onInputChangeHandler(event) {
    const inputLetters = event.target.value.split('');
    this.input.value = '';
    this.errorSpans.map((errorSpan, index) => {
      if (errorSpan.textContent === inputLetters[index]) {
        errorSpan.classList.add('green');
      } else {
        errorSpan.classList.add('red');
      }
      event.target.classList.add('visually-hidden');
      this.errorSpans.map((errorSpan) => {
        errorSpan.classList.add('opacity');
      });
      errorSpan.classList.remove('opacity-hidden');
    });
    this.input.blur();
    this.container.addEventListener('click', this.onContainerClickHandlerBinded);
  }

  onContainerClickHandler() {
    this.errorSpans.map((errorSpan) => {
      errorSpan.classList.remove('green', 'red', 'opacity');
    });
    this.input.classList.remove('visually-hidden');
    this.container.removeEventListener('click', this.onContainerClickHandlerBinded);
    this.input.removeEventListener('change', this.onInputChangeHandlerBinded);
  }
}
