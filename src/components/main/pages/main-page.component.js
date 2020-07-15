import menu from '../components/menu/menu';

export const mainPageComponent = {
  init: menu.init,
  render: () => `
    <div class="wrapper">
      <div class="main__game">
        <h1 class="main__title main__title-without-paddings">Learn anytime and anywhere</h1>
        <p class="main__subtitle">You will find a fascinating and interesting way.<br>
          Together with RSlang you will learn more than 3600 words</p>
        <div class="main-button">
          <button class="main-button__start" id="js-main-button"><img src="./assets/main/img/icon/rocket.svg" alt="get started">get
            started</button>
        </div>
        <h2 class="main__title main__title-without-paddings">Spaced repetitions logic</h2>
        <p class="main__subtitle main__description">
          <b>Spaced repetition</b> is an evidence-based learning technique that is usually performed
          with flashcards. Newly introduced and more difficult flashcards are shown more frequently
          while older and less difficult flashcards are shown less frequently in order to exploit
          the psychological spacing effect. The use of spaced repetition has been shown to increase rate of learning
        </p>
        <p class="main__subtitle main__description">
          In this application used <b>The Leitner system</b>, where cards are reviewed at increasing intervals.
          In this method flashcards are sorted into groups according to how well the learner knows each
          one in learning set. 
        </p>
        <p class="main__subtitle main__description"> 
          There are <b>5 main groups: "new", "hard", "normal", "good", "excellent"</b>.<br>
          All <b>new words</b> are set to group <b>"not learned"</b>
        </p>
        <img class="main__picture" src="./assets/main/img/repetitions.svg" alt="spaced repetitions picture">
        <p class="main__subtitle main__description">
          The learners try to guess the learning word. If they succeed, the card sends to the next group.
          If they fail, it sands back to the first group ("new").
          Each succeeding group has a longer period of time before the learner is required to revisit the cards.
        </p>
        <p class="main__subtitle main__description">
          Recommended periods are: "new" - 5 seconds, "hard" - 25 seconds, "normal" - 2 minutes, "good" - 10 minutes and "excellent" - 1 hour.
          But these are approximate intervals, they depend on other conditions and may vary.
          Priority is learning new words planned for the day.
        </p>
      </div>
    </div>
    `,
};
