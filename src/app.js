import main from './main/main.app';
import speakit from './speakit/speakit.app';

console.log('Hello from app');

window.onload = () => {
  main.init();
  speakit.init();

  main.sayHello();
  speakit.sayHello();
}