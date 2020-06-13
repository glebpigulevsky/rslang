import './scss/speakit.styles.scss';

class Speakit {
  constructor() {
    this.logo = null;
  }

  sayHello() {
    console.log(this.logo);
    
    const speakitLogo = document.createElement('h2');
    speakitLogo.className = 'speakit__logo logo';
    speakitLogo.textContent = this.logo;

    document.querySelector('.main__logo').after(speakitLogo);
  }

  init() {
    this.logo = 'Hello from Speakit';
  }
}

export default new Speakit();