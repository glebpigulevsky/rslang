export const gamesPageComponent = {
  render: () => `
        <section class="section__games">
        <div class="wrapper">
            <h2 class="dictionary__title">Learn new words while playing</h2>
            <div class="cards__inner">
                <div class="cards__item">
                    <img src="./assets/main/img/spekit.png" class="cards__img" alt="speakit">
                    <p class="cards__name">speakit</p>
                    <button class="cards__btn btn__icon"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
                <div class="cards__item">
                    <img src="./assets/main/img/english-puzzle.png" class="cards__img" alt="english-puzzle">
                    <p class="cards__name">english puzzle</p>
                    <button class="cards__btn btn__icon"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
                <div class="cards__item">
                    <img src="./assets/main/img/savannah.png" class="cards__img" alt="savannah">
                    <p class="cards__name">savannah</p>
                    <button class="cards__btn btn__icon"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
            </div>
            <div class="cards__inner">
                <div class="cards__item">
                    <img src="./assets/main/img/audio-call.png" class="cards__img" alt="audio call">
                    <p class="cards__name">audio call</p>
                    <button class="cards__btn btn__icon"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
                <div class="cards__item">
                    <img src="./assets/main/img/our-game.png" class="cards__img" alt="our-game">
                    <p class="cards__name">our game</p>
                    <button class="cards__btn btn__icon"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
                <div class="cards__item">
                    <img src="./assets/main/img/sprint.png" class="cards__img" alt="sprint">
                    <p class="cards__name">sprint</p>
                    <button class="cards__btn btn__icon" onclick="location.href = '#/sprint'"><img src="./assets/main/img/icon/play.svg" class="icon-btn" alt="play"><span class="btn__title">play</span></button>
                </div>
            </div>
        </div>
    <section>
    `,
};
