export default class StartScreenClass {
  constructor(zeroStartScreen, startGameClickHandler, container) {
    this.zeroStartScreen = zeroStartScreen;
    this.startGameClickHandler = startGameClickHandler;
    this.container = container;
  }

  render() {
    // this.zeroStartScreen
    document.querySelector('.main__game').innerHTML = `
        <div class="start-screen">
            <p class="game-name">Mini-game "Audio-call"</p>
            <div class="select-round">
            <div class="level-block">
            <p class="level">Select level:</p>
              <select class="group">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
            <div class="round-block">
            <p class="round">Select round:</p>
              <select class="page">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>  
              
            </div>
            <div class="start-game">
              <button class="main-button__start start">START</button>
            </div>
            <div class="game-description">
              <p class="game-name">
                Select level and round.
                Listen to the word for one time and then choose the correct 
                answer or click "Don't know" button. Have a good English practice!</p>
            </div>
          </div> 
      `;

    document.querySelector('.start').addEventListener('click', this.startGameClickHandler);
  }
}
