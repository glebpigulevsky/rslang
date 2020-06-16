import main from './components/main/main.app';
import speakit from './components/speakit/speakit.app';

import { APP_GREETINGS } from './common/common.constants';

console.log(APP_GREETINGS);

window.onload = () => {
  main.init();
  speakit.init();

  // main.sayHello();
  // speakit.sayHello();
};
