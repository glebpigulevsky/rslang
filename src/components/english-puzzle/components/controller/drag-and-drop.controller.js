import view from '../view/view';
import gameController from './game.controller';

import {
  EVENTS,
  CLASS_NAMES,
  DEBOUNCING_COORDINATE_DELTA,
  LEFT_MARGIN_PUZZLE_GAP,
} from '../../common/english-puzzle.constants';

class DragAndDropController {
  constructor() {
    this.coordinates = null;

    this.cloneCell = null;
    this.targetCell = null;
    this.belowElement = null;

    this.isDragging = null;
    this.isDropAble = null;

    this.onFieldMouseDownHandlerBinded = this.onFieldMouseDownHandler.bind(this);
    this.onCloneCellMouseMoveHandlerBinded = this.onCloneCellMouseMoveHandler.bind(this);
    this.onCloneCellMouseUpHandlerBinded = this.onCloneCellMouseUpHandler.bind(this);
    this.beforeUnloadHandlerBinded = this.beforeUnloadHandler.bind(this);
  }

  onCloneCellMouseMoveHandler(evt) {
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

    this.cloneCell.classList.add(CLASS_NAMES.HIDDEN);
    const belowElement = document.elementFromPoint(evt.clientX, evt.clientY);
    this.cloneCell.classList.remove(CLASS_NAMES.HIDDEN);

    const dropAbleBelow = belowElement && belowElement.closest(`.${CLASS_NAMES.DROP_PLACE}`);

    if (dropAbleBelow) {
      this.belowElement = dropAbleBelow;
      this.belowElement.classList.add(CLASS_NAMES.SHADOW);
      this.isDropAble = true;
    } else {
      if (this.belowElement) this.belowElement.classList.remove(CLASS_NAMES.SHADOW);
      this.isDropAble = false;
      this.belowElement = null;
    }
  }

  onCloneCellMouseUpHandler(evt) {
    document.removeEventListener(EVENTS.MOUSE_MOVE, this.onCloneCellMouseMoveHandlerBinded);
    document.removeEventListener(EVENTS.MOUSE_UP, this.onCloneCellMouseUpHandlerBinded);

    if (!this.isDragging) {
      this.onCellClick();
      return;
    }

    if (!this.isDropAble && this.isDragging) {
      this.targetCell.classList.remove(CLASS_NAMES.HIDDEN);
      this.cloneCell.remove();
      this.cloneCell = null;
      this.isDragging = false;
      return;
    }

    const droppedCells = Array.from(this.belowElement.querySelectorAll(`.${CLASS_NAMES.DRAGABLE}`));
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

    this.belowElement.classList.remove(CLASS_NAMES.SHADOW);
    this.belowElement = null;

    this.isDropAble = false;

    this.targetCell.classList.remove(CLASS_NAMES.HIDDEN);
    this.cloneCell.remove();
    this.cloneCell = null;
    this.isDragging = false;

    if (!view.getCountElementsInDataDropZone()) {
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
    if (!evt.target.classList.contains(CLASS_NAMES.DRAGABLE) || !evt.target.closest(`.${CLASS_NAMES.DROP_PLACE}`)) return;

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
    this.targetCell.classList.add(CLASS_NAMES.HIDDEN);
    clone.classList.add(CLASS_NAMES.MOVEABLE);
    clone.getContext('2d').drawImage(this.targetCell, 0, 0);
    document.body.append(clone);
    this.cloneCell = document.body.querySelector(`.${CLASS_NAMES.MOVEABLE}`);
    this.moveAt(
      this.cloneCell,
      this.coordinates.startX + LEFT_MARGIN_PUZZLE_GAP,
      this.coordinates.startY,
      this.coordinates.shiftX,
      this.coordinates.shiftY,
    );

    document.addEventListener(EVENTS.MOUSE_MOVE, this.onCloneCellMouseMoveHandlerBinded);
    document.addEventListener(EVENTS.MOUSE_UP, this.onCloneCellMouseUpHandlerBinded);
  }

  onCellClick() {
    const targetContainer = this.targetCell.closest(`.${CLASS_NAMES.GAME_FILED_CONTAINER}`);
    const newContainer = targetContainer.classList.contains(CLASS_NAMES.FIELD_CONTAINER)
      ? document.querySelector(`.${CLASS_NAMES.DATA_CONTAINER}`)
      : document.querySelector(`.${CLASS_NAMES.FIELD_CONTAINER}`);

    newContainer.querySelector(`.${CLASS_NAMES.DROP_PLACE}`).append(this.targetCell);

    this.targetCell.classList.remove(CLASS_NAMES.HIDDEN);
    this.cloneCell.remove();
    this.cloneCell = null;
    this.isDragging = false;

    if (!view.getCountElementsInDataDropZone()) {
      view.showCheckButton();
      view.hideIDontKnowButton();
    } else {
      view.hideCheckButton();
      view.showIDontKnowButton();
    }
  }

  beforeUnloadHandler() {
    document.querySelector(`.${CLASS_NAMES.GAME_FILED}`).removeEventListener(EVENTS.MOUSE_DOWN, this.onFieldMouseDownHandlerBinded);
    window.removeEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
  }

  init() {
    window.addEventListener(EVENTS.BEFORE_UNLOAD, this.beforeUnloadHandler);
    document.querySelector(`.${CLASS_NAMES.GAME_FILED}`).addEventListener(EVENTS.MOUSE_DOWN, this.onFieldMouseDownHandlerBinded);
  }
}

export default new DragAndDropController();
