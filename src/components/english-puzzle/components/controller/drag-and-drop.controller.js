import menuController from './menu.controller';
import view from '../view/view';

class DragAndDropController {
  constructor() { // todo описать структуру this
    this.onFieldMouseDownHandlerBinded = this.onFieldMouseDownHandler.bind(this);
    this.onCloneCellMouseMoveHandlerBinded = this.onCloneCellMouseMoveHandler.bind(this);
    this.onCloneCellMouseUpHandlerBinded = this.onCloneCellMouseUpHandler.bind(this);
    // this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  // swapCells(firstValue, secondValue) {
  //   const { field } = this;

  //   const firstIndex = field.indexOf(firstValue);
  //   const secondIndex = field.indexOf(secondValue);
  //   [field[firstIndex], field[secondIndex]] = [field[secondIndex], field[firstIndex]];
  // }

  // animatedSwapCells(firstElement, secondElement) {
  //   const animatedElement = secondElement;

  //   this.isAnimation = true;
  //   animatedElement.classList.add('animated');
  //   animatedElement.style.top = `${firstElement.offsetTop}px`;
  //   animatedElement.style.left = `${firstElement.offsetLeft}px`;

  //   setTimeout(() => {
  //     this.isAnimation = false;
  //     animatedElement.classList.remove('animated');
  //     this.isDropAble = false;
  //     this.isDragging = false;
  //     this.cloneCell.remove();
  //     this.cloneCell = null;

  //     const firstValue = firstElement.innerText;
  //     const secondValue = secondElement.innerText;
  //     this.swapCells(firstValue, secondValue);
  //     this.isWinner();
  //     clearFieldElement(this.fieldElement);
  //     renderField(this.fieldElement, this.field);
  //   }, ANIMATION_DELAY);
  // }

  onCloneCellMouseMoveHandler(evt) {
    const DEBOUNCING_COORDINATE_DELTA = 10; // px

    const {
      startX, startY,
      shiftX, shiftY,
    } = this.coordinates;

    if (!this.isDragging) {
      const moveX = evt.pageX;
      const moveY = evt.pageY;
      const deltaX = Math.abs(moveX - startX);
      const deltaY = Math.abs(moveY - startY);
      if (deltaX < DEBOUNCING_COORDINATE_DELTA
        && deltaY < DEBOUNCING_COORDINATE_DELTA) return;
      this.isDragging = true;
    }

    this.moveAt(this.cloneCell, evt.pageX, evt.pageY, shiftX, shiftY);

    this.cloneCell.classList.add('hidden');
    const belowElement = document.elementFromPoint(evt.clientX, evt.clientY);
    this.cloneCell.classList.remove('hidden');

    const dropAbleBelow = belowElement && belowElement.closest('.drop__place');

    if (dropAbleBelow) {
      this.belowElement = dropAbleBelow;
      this.belowElement.classList.add('shadow');
      this.isDropAble = true;
    } else {
      if (this.belowElement) this.belowElement.classList.remove('shadow');
      this.isDropAble = false;
      this.belowElement = null;
    }
  }

  onCloneCellMouseUpHandler(evt) {
    document.removeEventListener('mousemove', this.onCloneCellMouseMoveHandlerBinded);
    document.removeEventListener('mouseup', this.onCloneCellMouseUpHandlerBinded);

    if (!this.isDragging) {
      this.onCellClick();
      return;
    }

    // const emptyElement = document.body.querySelector('.field__cell_empty');

    if (!this.isDropAble && this.isDragging) {
      this.targetCell.classList.remove('hidden'); // TODO повтор, смотри ниже
      this.cloneCell.remove();
      this.cloneCell = null;
      this.isDragging = false;
      return;
    }

    const targetContainer = this.targetCell.closest('.game__field_container');

    // this.cloneCell.classList.add('hidden');
    // this.belowElement = document.elementFromPoint(evt.clientX, evt.clientY).closest('.drop__place');
    // this.cloneCell.classList.remove('hidden');

    const droppedCells = Array.from(this.belowElement.querySelectorAll('.dragable'));
    if (droppedCells && droppedCells.length) {
      const rightCell = droppedCells
        .find((droppedCell) => (droppedCell.getBoundingClientRect().x
          + droppedCell.getBoundingClientRect().width / 2)
          > evt.clientX);

      if (rightCell) {
        rightCell.before(this.targetCell);
      } else {
        this.belowElement.append(this.targetCell);
      }
    } else {
      this.belowElement.prepend(this.targetCell);
    }

    // this.cloneCell.classList.add('hidden');
    // const belowElement = document.elementFromPoint(evt.clientX, evt.clientY);
    // this.cloneCell.classList.remove('hidden');

    // const startX = document.querySelector('.game__filed').getBoundingClientRect().x;
    // const cellWidth = this.targetCell.getBoundingClientRect().width;
    // const currentX = evt.x;

    // if (currentX - cellWidth <= startX) {
    // belowElement.prepend(this.targetCell);
    // } else {
    // cells[cells.length - 1].after(this.targetCell);
    // }

    // const order = Math.floor((currentX - startX) / cellWidth);
    // const cells = belowElement.closest('.drop__place').querySelectorAll('.dragable');
    // if (order === 0) {
    //   belowElement.closest('.drop__place').prepend(this.targetCell);
    // } else if (cells[order - 1]) {
    //   debugger;
    //   cells[order - 1].after(this.targetCell);
    // } else {
    //   debugger;
    //   belowElement.closest('.drop__place').append(this.targetCell);
    // }

    // if (belowElement.classList.contains('dragable')) {
    //   belowElement.after(this.targetCell);
    // } else {
    //   belowElement.append(this.targetCell);
    // }

    this.belowElement.classList.remove('shadow');
    this.belowElement = null;

    this.isDropAble = false;

    this.targetCell.classList.remove('hidden');
    this.cloneCell.remove();
    this.cloneCell = null;
    this.isDragging = false;

    if (!view.getCountElementsInDataDropZone()) { // todo повторение метода
      view.showCheckButton();
      view.hideIDontKnowButton();
      // menuController.nextRound();
    } else {
      view.hideCheckButton();
      view.showIDontKnowButton();
    }
    // menuController.nextRound();
    // this.animatedSwapCells(emptyElement, this.cloneCell);
  }

  moveAt(element, newX, newY, shiftX, shiftY) {
    const movedElement = element;

    movedElement.style.left = `${newX - shiftX}px`;
    movedElement.style.top = `${newY - shiftY}px`;
  }

  onFieldMouseDownHandler(evt) {
    // if (!isNeighbor(this.field, this.size, evt.target) || this.isAnimation) return;
    if (!evt.target.classList.contains('dragable') || !evt.target.closest('.drop__place')) return;

    this.targetCell = evt.target;
    this.targetCell.ondragstart = () => false;

    this.belowElement = null;

    this.coordinates = {
      startX: evt.pageX,
      startY: evt.pageY,
      shiftX: evt.clientX - this.targetCell.getBoundingClientRect().left,
      shiftY: evt.clientY - this.targetCell.getBoundingClientRect().top,
    };

    const clone = this.targetCell.cloneNode(true);
    this.targetCell.classList.add('hidden');
    clone.classList.add('moveable');
    clone.getContext('2d').drawImage(this.targetCell, 0, 0);
    document.body.append(clone);
    this.cloneCell = document.body.querySelector('.moveable');
    // this.cloneCell.style.width = `${this.targetCell.getBoundingClientRect().width}px`;
    // this.cloneCell.style.width = this.targetCell.width;
    // this.cloneCell.style.height = `${this.targetCell.getBoundingClientRect().height}px`;
    // this.cloneCell.style.height = this.targetCell.height;
    this.moveAt(
      this.cloneCell,
      this.coordinates.startX,
      this.coordinates.startY,
      this.coordinates.shiftX,
      this.coordinates.shiftY,
    );

    document.addEventListener('mousemove', this.onCloneCellMouseMoveHandlerBinded);
    document.addEventListener('mouseup', this.onCloneCellMouseUpHandlerBinded);
  }

  onCellClick() {
    const targetContainer = this.targetCell.closest('.game__field_container');
    const newContainer = targetContainer.classList.contains('field__container')
      ? document.querySelector('.data__container')
      : document.querySelector('.field__container');

    newContainer.querySelector('.drop__place').append(this.targetCell);

    this.targetCell.classList.remove('hidden'); // TODO повтор, смотри ниже
    this.cloneCell.remove();
    this.cloneCell = null;
    this.isDragging = false;

    debugger;
    if (!view.getCountElementsInDataDropZone()) { // todo повторение метода
      view.showCheckButton();
      view.hideIDontKnowButton();
      // menuController.nextRound();
    } else {
      view.hideCheckButton();
      view.showIDontKnowButton();
    }
  }

  // beforeUnloadHandler() {
  //   if (this.isGameStarts) model.saveResults(this.guessedList);
  //   window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  // }

  init() {
    // window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
    document.querySelector('.game__field').addEventListener('mousedown', this.onFieldMouseDownHandlerBinded);
  }
}

export default new DragAndDropController();
