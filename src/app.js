import main from './components/main/main.app';
import speakit from './components/speakit/speakit.app';

window.onload = () => {
  main.init();
  speakit.init();

  main.sayHello();
  speakit.sayHello();
};
