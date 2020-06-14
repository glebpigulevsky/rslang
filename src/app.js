import main from './components/main/main.app';
import speakit from './components/speakit/speakit.app';

import { APP_GREETINGS } from './common/common.constants';

console.log(APP_GREETINGS);

window.onload = () => {
  main.init();
  main.sayHello();

  speakit.init();
  speakit.sayHello();
};
