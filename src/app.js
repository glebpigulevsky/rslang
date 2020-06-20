import main from './components/main/main.app';
import speakIt from './components/speakit/speakit.app';

window.onload = () => {
  main.init();
  speakIt.init();

  main.sayHello();
  speakIt.sayHello();
};
