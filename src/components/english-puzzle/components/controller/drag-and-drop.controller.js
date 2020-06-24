import view from '../view/view';
import gameController from './game.controller';

import { EVENTS } from '../../common/english-puzzle.helper';

class DragAndDropController {
  constructor() {
    // todo описать структуру this

    this.onFieldMouseDownHandlerBinded = this.onFieldMouseDownHandler.bind(this);
    this.onCloneCellMouseMoveHandlerBinded = this.onCloneCellMouseMoveHandler.bind(this);
    this.onCloneCellMouseUpHandlerBinded = this.onCloneCellMouseUpHandler.bind(this);
    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);
  }

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

    const dropAbleBelow = belowElement && belowElement.closest('.drop-place');

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

    if (!this.isDropAble && this.isDragging) {
      this.targetCell.classList.remove('hidden'); // TODO повтор, смотри ниже
      this.cloneCell.remove();
      this.cloneCell = null;
      this.isDragging = false;
      return;
    }

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
    } else {
      view.hideCheckButton();
      view.showIDontKnowButton();
    }
  }

  moveAt(element, newX, newY, shiftX, shiftY) {
    const movedElement = element;

    movedElement.style.left = `${newX - shiftX}px`;
    movedElement.style.top = `${newY - shiftY}px`;
  }

  onFieldMouseDownHandler(evt) {
    if (!evt.target.classList.contains('dragable') || !evt.target.closest('.drop-place')) return;

    view.resetPuzzlesStates(
      gameController.currentSentence,
      gameController.getCanvasElement({
        currentSentence: gameController.currentSentence,
        isImage: gameController.hints.isBgImage,
        isRegular: true,
      }),
    );

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
    this.moveAt(
      this.cloneCell,
      this.coordinates.startX + 8,
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

    newContainer.querySelector('.drop-place').append(this.targetCell);

    this.targetCell.classList.remove('hidden'); // TODO повтор, смотри ниже
    this.cloneCell.remove();
    this.cloneCell = null;
    this.isDragging = false;

    if (!view.getCountElementsInDataDropZone()) { // todo повторение метода
      view.showCheckButton();
      view.hideIDontKnowButton();
    } else {
      view.hideCheckButton();
      view.showIDontKnowButton();
    }
  }

  beforeUnloadHandler() {
    // if (this.isGameStarts) model.saveResults(this.guessedList); // todo
    document.querySelector('.game__field').removeEventListener('mousedown', this.onFieldMouseDownHandlerBinded);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  init() {
    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
    document.querySelector('.game__field').addEventListener('mousedown', this.onFieldMouseDownHandlerBinded);
  }
}

export default new DragAndDropController();
