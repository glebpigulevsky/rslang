import './scss/spinner.scss';

const CLASS__NAMES = {
  MAIN: 'spinner',
  HIDDEN: 'display-none',
};

export class Spinner {
  constructor(container, additionalClass = '') {
    this.container = container;
    this.additionalClass = additionalClass;
    this.spinner = null;

    this._create();
  }

  _create() {
    this.spinner = document.createElement('div');
    this.spinner.className = `${CLASS__NAMES.MAIN} ${CLASS__NAMES.HIDDEN} ${this.additionalClass}`;
    this.spinner.insertAdjacentHTML('beforeend', `
      <div class="spinner__gear">
        <div class="spinner__inner">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <span class="spinner__description">loading...</span>
    `);
  }

  render() {
    if (this.container && this.spinner) this.container.append(this.spinner);
    this.show();
  }

  remove() {
    if (this.spinner) this.spinner.remove();
  }

  show() {
    if (this.spinner) this.spinner.classList.remove(CLASS__NAMES.HIDDEN);
  }

  hide() {
    if (this.spinner) this.spinner.classList.add(CLASS__NAMES.HIDDEN);
  }

  toggle() {
    if (this.spinner) this.spinner.classList.toggle(CLASS__NAMES.HIDDEN);
  }

  init() {
    this.render();
    this.hide();
  }
}
