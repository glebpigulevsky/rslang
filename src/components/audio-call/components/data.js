// import { WordsApi } from '../../services/services.methods';

import { WordsApi } from '../../../services/services.methods';
import { audioCallInit } from '../audio-call.app'

const wordsGetter = new WordsApi();


class dataGetter {
    constructor () {
        this.group = 0;
        this.page = 0;
        this.round = 0;
        this.word = 0;
        this.currentWord;
        this.globalWord;
        this.wordsArray = [];
    }

    getData () {
        document.querySelector('main').classList.add('audio-call-wrapper');
        wordsGetter.getWordsCollection({ group: 0, page: this.page })
            .then((res) => {
            //   console.log(res);
              this.page += 1;
              this.wordsArray = [...this.wordsArray, ...res];
              this.renderData(this.wordsArray);
            })

    }

    getNewData () {
        wordsGetter.getWordsCollection({ group: 0, page: this.page })
            .then((res) => {
              this.page += 1;
              this.wordsArray = [...this.wordsArray, ...res];
            })
    }

    renderData (res) {
        if (this.round < 10) {
            document.querySelector('.words-block').innerHTML = '';
            for (let i = 0; i < 5; i++) {
                document.querySelector('.words-block').insertAdjacentHTML('beforeend', `
                <div class="word word-${i}"><span class="number">${i + 1}</span><span class="${i}">${res[this.word].wordTranslate}</span></div>
                `);
                this.word += 1;
            }
            document.querySelectorAll('.word').forEach( (el) => {
                el.addEventListener('click', (event) => {
                this.currentWord = this.globalWord - (this.round - 1) * 5;
                if(event.currentTarget.classList.contains(`word-${this.currentWord}`)) {
                    document.querySelector('.img-block').insertAdjacentHTML('beforeend', `<img class="answer-image" src="${this.wordsArray[this.globalWord].image}" alt="answer">`);
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
                    document.querySelector('.dont-know').addEventListener('click', () => {
                    document.querySelector('.audio-call-container').classList.add('move');
                    setTimeout(() => {
                        audioCallInit.init();
                        this.renderData(this.wordsArray);
                    }, 1500)
                    });
                    
                } else {
                    audio.play();
                }
            })
        })
        
        this.globalWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1 + this.round * 5;
        this.round += 1;
        if (this.round % 3 == 0 && this.round < 9) {
            this.getNewData();
        }
        let audio = new Audio(res[this.globalWord].audio);
        document.querySelector('.speaker-block').classList.add('speaker-block-active')
        audio.play();
        audio.onended = function() {
        document.querySelector('.speaker-block').classList.remove('speaker-block-active');             
        };
        }
        
    }

}

export default new dataGetter();