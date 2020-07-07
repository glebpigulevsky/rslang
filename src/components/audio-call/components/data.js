import { WordsApi } from '../../../services/services.methods';
import { audioCallInit } from '../audio-call.app';


const wordsGetter = new WordsApi();

export default class dataGetter {
    constructor (group, page) {
        this.group = group - 1;
        this.page = page - 1;
        this.round = 0;
        this.word = 0;
        this.currentWord;
        this.globalWord;
        this.wordsArray = [];
        this.resultsCorrectArray = [];
        this.resultsWrongArray = [];
        this.resultsDontKnowArray = [];
        this.progress = 0;
        this.wordsClickHandlerBinded = this.wordsClickHandler.bind(this);
        this.dontKnowButtonBinded = this.dontKnowButton.bind(this);
        this.enterCount = 0;
        this.keyCount = 0;
        this.roundState = 'game';
    }

    getData () {
        window.localStorage.setItem('group', this.group);
        window.localStorage.setItem('page', this.page);
        wordsGetter.getWordsCollection({ group: this.group, page: this.page })
            .then((res) => {
              this.page += 1;
              this.wordsArray = [...this.wordsArray, ...res];
              this.renderData(this.wordsArray);
            });
        this.addEventListenerToKeyboard();
    }

    getNewData () {
        wordsGetter.getWordsCollection({ group: this.group, page: this.page })
            .then((res) => {
              this.page += 1;
              this.wordsArray = [...this.wordsArray, ...res];
            })
    }

    renderData (res) {
        if (this.round < 10) { 
            this.playRound(res);
        } else {
            this.showStats();
        }
    }

    wordsClickHandler () {
        if(event.currentTarget.classList.contains(`word-${this.currentWord}`)) {
            this.correctAnswerClick();
        } else {
            this.wrongAnswerClick();
        }
    }


    addEventListenerToKeyboard () {

        const chooseWordByKey = (event) => {

            const playKeys = ['1', '2', '3', '4', '5', 'Enter'];

            if (!playKeys.includes(event.key)) {
                return;
            }

            if (event.key == 'Enter') {
                this.enterCount += 1;
                if (document.querySelector('.dont-know').innerHTML == '<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">') {
                    this.enterCount += 2;
                    document.querySelector('.audio-call-container').classList.add('move');
                    setTimeout(() => {
                        audioCallInit.init();
                        this.renderData(this.wordsArray);
                    }, 1500);
                }
                if (this.enterCount == 1) {
                    document.removeEventListener('keydown', chooseWordByKey.bind(this));
                    this.dontKnowButtonBinded();
                }
            }  
                   
            
            if(+event.key == this.currentWord + 1 && this.roundState == 'game' && this.keyCount == 0) {
                this.keyCount += 1;
                this.correctAnswerKeyBoard(event.key);
            } 
            
            if (+event.key != this.currentWord + 1 && this.roundState == 'game' && this.keyCount == 0 && event.key != 'Enter') {
                this.keyCount += 1;
                this.wrongAnswerKeyBoard(+event.key);
            }

        };

        document.addEventListener('keydown', chooseWordByKey.bind(this));
    }

    correctAnswerClick () {
        document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded); 
        document.querySelectorAll('.word').forEach( (el) => {
            el.removeEventListener('click', this.wordsClickHandlerBinded)
        });
        this.resultsCorrectArray.push(this.wordsArray[this.globalWord]);
        document.querySelector('.img-block').insertAdjacentHTML('beforeend', `
        <img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">
        `);
        document.querySelector('.speaker-block').classList.add('speaker-block-answer');
        document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;
                            
        for (let i = 0; i < 5; i++) {
            if (i == this.currentWord) {
                continue;
            }
            document.querySelector(`.word-${i}`).classList.add('wrong-answer');
        }
        event.currentTarget.firstChild.innerHTML = 
        ``;
        event.currentTarget.firstChild.insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
        document.querySelector('.dont-know').innerHTML = `<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">`;
        this.clickArrowStartNextRound();
    }

    clickArrowStartNextRound () {
        document.querySelector('.dont-know').addEventListener('click', () => {
            document.querySelector('.audio-call-container').classList.add('move');
            setTimeout(() => {
                audioCallInit.init();
                this.renderData(this.wordsArray);
            }, 1500)
        });
    }

    wrongAnswerClick () {
        document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded); 
        document.querySelectorAll('.word').forEach( (el) => {
            el.removeEventListener('click', this.wordsClickHandlerBinded)
        })
        this.resultsWrongArray.push(this.wordsArray[this.globalWord]);
        event.currentTarget.lastChild.classList.add('wrong-main-answer');
        document.querySelector('.img-block').insertAdjacentHTML('beforeend', `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`);
        document.querySelector('.speaker-block').classList.add('speaker-block-answer');
        document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;
                            
        for (let i = 0; i < 5; i++) {
            if (i == this.currentWord) {
                continue;
            }
            document.querySelector(`.word-${i}`).classList.add('wrong-answer');
        }
        document.querySelector('.dont-know').innerHTML = `<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">`;
        this.clickArrowStartNextRound();
    }

    correctAnswerKeyBoard(event) {
        document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded); 
        document.querySelectorAll('.word').forEach( (el) => {
            el.removeEventListener('click', this.wordsClickHandlerBinded)
        })
        this.resultsCorrectArray.push(this.wordsArray[this.globalWord]);
        document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
        document.querySelector('.speaker-block').classList.add('speaker-block-answer');
        document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;
                            
        for (let i = 0; i < 5; i++) {
            if (i == this.currentWord) {
                continue;
            }
            document.querySelector(`.word-${i}`).classList.add('wrong-answer');
        }
        document.querySelector(`.number-${event}`).innerHTML = 
        ``;
        document.querySelector(`.number-${event}`).insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
        document.querySelector('.dont-know').innerHTML = `<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">`;
        document.querySelector('.dont-know').addEventListener('click', () => {
        document.querySelector('.audio-call-container').classList.add('move');
        setTimeout(() => {
            audioCallInit.init();
            this.renderData(this.wordsArray);
        }, 1500)
        });
    }

    wrongAnswerKeyBoard(event) {
        document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded); 
        document.querySelectorAll('.word').forEach( (el) => {
            el.removeEventListener('click', this.wordsClickHandlerBinded)
        })
        this.resultsWrongArray.push(this.wordsArray[this.globalWord]);
        document.querySelector(`.rus-word-${event - 1}`).classList.add('wrong-main-answer');
        document.querySelector('.img-block').innerHTML = `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`;
        document.querySelector('.speaker-block').classList.add('speaker-block-answer');
        document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;
                            
        for (let i = 0; i < 5; i++) {
            if (i == this.currentWord) {
                continue;
            }
            document.querySelector(`.word-${i}`).classList.add('wrong-answer');
        }
        document.querySelector('.dont-know').innerHTML = `<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">`;
        document.querySelector('.dont-know').addEventListener('click', () => {
        document.querySelector('.audio-call-container').classList.add('move');
        setTimeout(() => {
            audioCallInit.init();
            this.renderData(this.wordsArray);
        }, 1500)
        });
    }

    dontKnowButton() {
        document.querySelectorAll('.word').forEach( (el) => {
            el.removeEventListener('click', this.wordsClickHandlerBinded)
        })
        this.resultsDontKnowArray.push(this.wordsArray[this.globalWord]);
        document.querySelector('.img-block').insertAdjacentHTML('beforeend', `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`);
        document.querySelector('.speaker-block').classList.add('speaker-block-answer');
        document.querySelector('.answer-word-eng').innerHTML = `${this.wordsArray[this.globalWord].word}`;
                            
        for (let i = 0; i < 5; i++) {
            if (i == this.currentWord) {
                continue;
            }
            document.querySelector(`.word-${i}`).classList.add('wrong-answer');
        }
        document.querySelector(`.number-${this.currentWord + 1}`).innerHTML = 
        ``;
        document.querySelector(`.number-${this.currentWord + 1}`).insertAdjacentHTML('beforeend', `
        <img class="correct-icon" src="./assets/main/img/correct-icon.png" alt="correct">
        `);
        document.querySelector('.dont-know').innerHTML = `<img class="arrow" src="./assets/main/img/arrow.png" alt="arrow">`;
        document.querySelector('.dont-know').removeEventListener('click', this.dontKnowButtonBinded); 
        document.querySelector('.dont-know').addEventListener('click', () => {
        document.querySelector('.audio-call-container').classList.add('move');
        setTimeout(() => {
            audioCallInit.init();
            this.renderData(this.wordsArray);
        }, 1500)
        });
    }

    showStats () {
        audioCallInit.showShortStats();
            document.querySelector('.main-button__start').addEventListener('click', () => {
                audioCallInit.startScreen();
            });
            document.querySelector('.correct-count').innerHTML = `${this.resultsCorrectArray.length}`;
            document.querySelector('.mistakes-count').innerHTML = `${this.resultsWrongArray.length}`;
            document.querySelector('.dont-know-count').innerHTML = `${this.resultsDontKnowArray.length}`;
            for (let i = 0; i < this.resultsWrongArray.length; i++) {
                document.querySelector('.mistakes-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsWrongArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsWrongArray[i].wordTranslate}</span></li>
                `);
                let audioWrong = new Audio(this.resultsWrongArray[i].audio);
                document.querySelector(`.speaker-small-${i}`).addEventListener('click', () => {
                    audioWrong.play();
                });
            }

            for (let i = 0; i < this.resultsCorrectArray.length; i++) {
                document.querySelector('.correct-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i + 10}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsCorrectArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsCorrectArray[i].wordTranslate}</span></li>
                `);
                let audioCorrect = new Audio(this.resultsCorrectArray[i].audio);
                document.querySelector(`.speaker-small-${i + 10}`).addEventListener('click', () => {
                    audioCorrect.play();
                });
            }

            for (let i = 0; i < this.resultsDontKnowArray.length; i++) {
                document.querySelector('.dont-know-list').insertAdjacentHTML('beforeend', `
                <li><img class="speaker-small-${i + 20}" src="./assets/main/img/speakersmall.png" alt="small speaker"><span class="results-eng-word">${this.resultsDontKnowArray[i].word}</span><div style="width: 20px;"></div><span class="results-ru-word">${this.resultsDontKnowArray[i].wordTranslate}</span></li>
                `);
                let audioCorrect = new Audio(this.resultsDontKnowArray[i].audio);
                document.querySelector(`.speaker-small-${i + 20}`).addEventListener('click', () => {
                    audioCorrect.play();
                });
            }
    }

    playRound (res) {
        this.roundState = 'game';
            this.enterCount = 0;
            this.keyCount = 0;
            this.progress += 10;
            document.querySelector('.progress-bar').style.width = `${this.progress}%`;
            document.querySelector('.words-block').innerHTML = '';
            for (let i = 0; i < 5; i++) {
                document.querySelector('.words-block').insertAdjacentHTML('beforeend', `
                <div class="word word-${i}"><span class="number number-${i+1}">${i + 1}</span><span class="rus-word-${i}">${res[this.word].wordTranslate}</span></div>
                `);
                this.word += 1;
            }
            document.querySelectorAll('.word').forEach( (el) => {
                el.addEventListener('click', this.wordsClickHandlerBinded)
            })
        document.querySelector('.dont-know').addEventListener('click', this.dontKnowButtonBinded); 
        this.globalWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1 + this.round * 5;
        this.round += 1;
        this.currentWord = this.globalWord - (this.round - 1) * 5;
        if (this.round % 3 == 0 && this.round < 9) {
            this.getNewData();
        }
        let audio = new Audio(res[this.globalWord].audio);
        document.querySelector('.speaker-block').classList.add('speaker-block-active')
        audio.play();
        audio.onended = function() {
            document.querySelector('.speaker-block').classList.remove('speaker-block-active');            
            document.querySelector('.dont-know').addEventListener('click', this.dontKnowButton); 
        };
    }

}