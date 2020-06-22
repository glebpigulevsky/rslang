// import { WordsApi } from '../../services/services.methods';

import { WordsApi } from '../../../services/services.methods';

const wordsGetter = new WordsApi();


class dataGetter {
    constructor () {
        this.group = 0;
        this.page = 0;
        this.round = 1;
        this.word = 0;
        this.currentWord;
        this.wordsArray = [];
    }

    getData () {
        document.querySelector('main').classList.add('audio-call-wrapper');
        document.querySelector('.words-block').insertAdjacentHTML('beforeend', ``);
        console.log('GROUP', this.page)
        // wordsGetter.getWordsCollection({ group: 0, page: 0 })
        //   .then((res) => {
        //     // console.log(res);
        //     this.wordsArray = [...this.wordsArray, ...res];
        //     this.page += 1;
        //     console.log('GROUP', this.page)
        //   })
        //   .then(res =>  console.log('GROUP1', this.page))
        //   .then(wordsGetter.getWordsCollection({ group: 0, page: this.page })
        //   .then((res) => {
        //     // console.log(res);
        //     this.wordsArray = [...this.wordsArray, ...res];
        //     this.renderData(res);
        //   }))

        //   while(this.page < 5) {
        //     wordsGetter.getWordsCollection({ group: 0, page: this.page })
        //     .then((res) => {
        //       // console.log(res);
        //       this.wordsArray = [...this.wordsArray, ...res];
        //       console.log('GROUP', this.page)
        //     })
        //     .then(() => {

                
        //       }
        //     )
        //     this.page += 1;
        //     if (this.page == 5) {
        //         console.log('ЗАШЛИ В ИФ')
        //         this.renderData(this.wordsArray);
        //     }
        //   }

        wordsGetter.getWordsCollection({ group: 0, page: this.page })
            .then((res) => {
              // console.log(res);
              this.wordsArray = [...this.wordsArray, ...res];
              console.log('GROUP', this.page)
              this.renderData(this.wordsArray);
            })

    }

    renderData (res) {
        console.log('WORDSARR', res);
        for (let i = 0; i < 5; i++) {
            document.querySelector('.words-block').insertAdjacentHTML('beforeend', `<div class="word ${i}"><span class="number">${i + 1}</span><span class="${i}">${res[this.word].wordTranslate}</span></div>`);
            this.word += 1;
        }
        document.querySelectorAll('.word').forEach( (el) => {
            el.addEventListener('click', (event) => {
                console.log(event.currentTarget);
                if(event.currentTarget.classList.contains(`${this.currentWord}`)) {
                    alert('угадал')
                } else {
                    alert('не угадал');
                }
            })
        })
        this.currentWord = Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1)) - 1;
        console.log(this.currentWord)
        let audio = new Audio(res[this.currentWord].audio);
          audio.play();

    }
}

export default new dataGetter();