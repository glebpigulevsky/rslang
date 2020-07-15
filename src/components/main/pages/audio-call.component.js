import { audioCallStartScreen, audioCallUnmount } from '../../audio-call/audio-call.app';

export const audioCallComponent = {
  init: audioCallStartScreen,
  render: () => `
  <div class="main__game audio-game-wrapper"></div>
  `,
  unmount: audioCallUnmount,
};
