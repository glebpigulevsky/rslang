// import GameSprint from './game';

// const sprint = new GameSprint();
export default class Timer {
  constructor() {
    const COLOR_CODES = {
      info: {
        color: 'green',
      },
      warning: {
        color: 'orange',
        threshold: 10,
      },
      alert: {
        color: 'red',
        threshold: 5,
      },
    };
    this.FULL_DASH_ARRAY = 283;
    this.TIME_LIMIT = 59;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.remainingPathColor = COLOR_CODES.info.color;
    this.warning = COLOR_CODES.warning.color;
    this.alert = COLOR_CODES.alert.color;
    this.info = COLOR_CODES.info.color;
  }

  addTemplateTimer() {
    const temp = `<div class="base-timer time">
    <svg class="base-timer__svg" viewBox="0 0 100 100" >
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${this.remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
    ${this.formatTimeLeft(this.timeLeft)}  </span>  </div>  `;
    document.querySelector('.game-sprint__timer').insertAdjacentHTML('afterbegin', temp);
  }

  formatTimeLeft(time) {
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${seconds}`;
  }

  startTimer() {
    this.addTemplateTimer();
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      document.getElementById('base-timer-label').innerHTML = this.formatTimeLeft(this.timeLeft);
      if (this.timeLeft === 0) {
        this.stopTime();
      }
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);
    }, 1000);
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
  }

  setRemainingPathColor(timeLeft) {
    if (timeLeft <= 5) {
      document.getElementById('base-timer-path-remaining').classList.remove(this.warning);
      document.getElementById('base-timer-path-remaining').classList.add(this.alert);
    } else if (timeLeft <= 10) {
      document.getElementById('base-timer-path-remaining').classList.remove(this.info);
      document.getElementById('base-timer-path-remaining').classList.add(this.warning);
    }
  }

  stopTime() {
    clearInterval(this.timerInterval);
  }
}
