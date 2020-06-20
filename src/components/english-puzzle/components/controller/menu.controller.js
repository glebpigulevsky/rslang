import controller from './controller';
import model from '../model/model';
import view from '../view/view';

import createCanvasElements from '../../common/english-puzzle.utils';

import imageSrc from '../../assets/img/9th_wave.jpg';

import {
  showSpinner,
  hideSpinner,
} from '../data/utils';

class MenuController {
  constructor() {
    this.currentLevel = null;
    this.currentRound = null;
    this.maxRoundInLevel = null;

    this.currentSentence = null;
    this.isPictureShown = null;

    this.completedRoundsByLevels = [];

    this.onLevelChangeHandlerBinded = this.onLevelChangeHandler.bind(this);
    this.onRoundChangeHandlerBinded = this.onRoundChangeHandler.bind(this);
  }

  setCurrentLevel(level) {
    // this.currentLevel = level < 5 ? level : 0;
    this.currentLevel = level % 6;
  }

  setCurrentRound(round = 0) {
    if (round >= this.maxRoundInLevel) {
      this.setCurrentLevel(this.currentLevel + 1);
      this.currentRound = 0;

      if (view.menu.elements.selectors.level) {
        view.menu.elements.selectors.level.remove();
        view.menu.renderLevelSelector(this.currentLevel);
      }

      if (view.menu.elements.selectors.round) {
        view.menu.elements.selectors.round.remove();
        view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);
      }

      return;
    }

    this.currentRound = round;
  }

  async onLevelChangeHandler(evt) {
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentLevel(+evt.target.value);
    this.setCurrentRound();

    showSpinner(); //* кандидаты в отдельную функцию
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    // this.maxRoundInLevel = 40;
    view.menu.elements.selectors.round.remove(); //*
    this.setCurrentRound(0);
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]); //*
    this.newRound(this.currentLevel, this.currentRound); //*
  }

  onRoundChangeHandler(evt) {
    showSpinner();
    // const newLevel = view.menu.elements.selector.level.value;
    this.setCurrentRound(+evt.target.value);
    console.log('New round: ', this.currentRound);
    this.newRound(this.currentLevel, this.currentRound);
  }

  getCanvasElement({
    currentSentence,
    isImage = false,
    isRegular = true,
    isCorrect = false,
  }) {
    if (isImage) {
      if (isRegular) return this.canvasElements.withImage.regular[currentSentence];
      if (isCorrect) return this.canvasElements.withImage.correct[currentSentence];
      return this.canvasElements.withImage.error[currentSentence];
    }
    if (isRegular) return this.canvasElements.withOutImage.regular[currentSentence];
    if (isCorrect) return this.canvasElements.withOutImage.correct[currentSentence];
    return this.canvasElements.withOutImage.error[currentSentence];
  }

  async newRound(currentLevel, currentRound) {
    showSpinner();

    view.hidePicture();
    view.clearImageDescription();

    view.clearGameField();
    view.clearDropZones();

    view.showIDontKnowButton();
    view.hideCheckButton();
    view.hideContinueButton();

    // try {
    this.fetchedRoundData = await model.fetchCardsPage(currentLevel, currentRound);
    // } catch (err) {
    // this.fetchedRoundData = JSON.parse(localStorage.getItem('data'));
    // }
    localStorage.setItem('data', JSON.stringify(this.fetchedRoundData));

    const sentences = this.fetchedRoundData.map((wordData) => wordData.textExample);

    // const sentences = [
    //   'The students agree they have too much homework',
    //   'I a`m going to study',
    //   'It is difficult situation for me',
    //   'The are a lot of interesting things',
    //   'We are going to do it together',
    //   'It is very hot summer',
    //   'This situation is not very good',
    //   'Every morning he does his physical exercises',
    //   'It is nine sentence',
    //   'First level and first round',
    // ];

    this.fetchedPictureData = model.getCurrentPictureDescription(currentLevel, currentRound);
    const preloadedPicture = await model.getPreloadedCurrentPicture(currentLevel, currentRound);

    // this.canvasElements = createCanvasElements({
    //   img: preloadeImg,
    //   wordsList: sentences,
    // });

    this.canvasElements = {
      withImage: {
        regular: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'gray',
        }),
        correct: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'green',
        }),
        error: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'red',
        }),
      },
      withOutImage: {
        regular: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'gray',
          fillColor: 'brown',
        }),
        correct: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'green',
          fillColor: 'brown',
        }),
        error: createCanvasElements({
          img: preloadedPicture,
          wordsList: sentences,
          colorBorder: 'red',
          fillColor: 'brown',
        }),
      },
      finalImage: createCanvasElements({
        img: preloadedPicture,
        wordsList: sentences,
        colorBorder: 'transparent',
        hasText: false,
      }),
    };

    // this.canvasElements = createCanvasElements({
    //   img: preloadeImg,
    //   wordsList: sentences,
    // });

    this.currentSentence = 0;
    // view.renderInputSentence(this.canvasElements[this.currentSentence]);
    view.renderInputSentence(this.getCanvasElement({
      currentSentence: this.currentSentence,
      isImage: controller.isBgImage,
      isRegular: true,
    }));

    view.menu.elements.selectors.round.remove(); //*
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);

    if (controller.isTranslationEnabled) {
      view.showTranslation(this.fetchedRoundData[this.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }

    if (controller.isAutoSpellingEnabled && controller.isSpellingEnabled) {
      view.playSentenceSpelling(this.fetchedRoundData[this.currentSentence].audioExample);
    }

    hideSpinner();
  }

  nextRound() {
    view.resetPuzzlesStates(
      this.currentSentence,
      this.getCanvasElement({
        currentSentence: this.currentSentence,
        isImage: true,
        isRegular: true,
      }),
    );
    view.hideCheckButton();

    if (this.currentSentence === 9) {
      // view.clearGameField();
      if (!this.isPictureShown) {
        if (!this.completedRoundsByLevels[this.currentLevel].includes(this.currentRound)) this.completedRoundsByLevels[this.currentLevel].push(this.currentRound);
        // todo тут надо записывать на бек пройденный раунд
        view.menu.elements.selectors.round.remove(); //* кандидаты на отдельную функцию
        view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[[this.currentLevel]]);

        const completedRoundsData = {
          completedRoundsByLevels: this.completedRoundsByLevels,
          lastLevelWithLastCompletedRound: this.currentLevel,
          lastCompletedRound: this.currentRound,
        };
        localStorage.setItem('completedRoundsData', JSON.stringify(completedRoundsData));

        this.isPictureShown = true;
        view.showPicture(this.canvasElements.finalImage.flat(Infinity));
        view.showImageDescription(`Author: ${this.fetchedPictureData.author.replace(',', ' ')}, Name: ${this.fetchedPictureData.name}, Date: ${this.fetchedPictureData.year}`);
        view.hideTranslation();
        return;
      }

      view.hidePicture();
      view.clearImageDescription();
      this.isPictureShown = false;
      this.setCurrentRound(this.currentRound + 1);
      this.newRound(this.currentLevel, this.currentRound);
      return;
    }

    view.showIDontKnowButton();
    view.hideContinueButton();
    this.currentSentence += 1;
    view.renderNextResultDropZone();
    view.renderInputSentence(this.getCanvasElement({
      currentSentence: this.currentSentence,
      isImage: controller.isBgImage,
      isRegular: true,
    }));

    if (controller.isTranslationEnabled) {
      view.showTranslation(this.fetchedRoundData[this.currentSentence].textExampleTranslate);
    } else {
      view.hideTranslation();
    }

    if (controller.isAutoSpellingEnabled && controller.isSpellingEnabled) {
      view.playSentenceSpelling(this.fetchedRoundData[this.currentSentence].audioExample);
    }
  }

  loadCompletedRoundsByLevels() {
    return JSON.parse(localStorage.getItem('completedRoundsData'));
  }

  async init(startLevel = 0, startRound = 0) {
    view.initMenu(this.onLevelChangeHandlerBinded, this.onRoundChangeHandlerBinded);

    const completedRoundsData = this.loadCompletedRoundsByLevels();
    this.completedRoundsByLevels = (completedRoundsData && completedRoundsData.completedRoundsByLevels) || new Array(6).fill('').map(() => []);

    showSpinner(); //* кандидаты в отдельную функцию
    // try {
    this.setCurrentLevel((completedRoundsData && completedRoundsData.lastLevelWithLastCompletedRound) || startLevel);
    this.maxRoundInLevel = await model.fetchMaxPagesInDifficultCategory(this.currentLevel);
    // } catch (err) {
    // this.maxRoundInLevel = 40;
    // }
    this.setCurrentRound((completedRoundsData && completedRoundsData.lastCompletedRound + 1) || startRound);

    view.menu.renderLevelSelector(this.currentLevel);
    view.menu.renderRoundSelector(this.maxRoundInLevel, this.currentRound, this.completedRoundsByLevels[this.currentLevel]);
    this.newRound(this.currentLevel, this.currentRound);
  }
}

export default new MenuController();
