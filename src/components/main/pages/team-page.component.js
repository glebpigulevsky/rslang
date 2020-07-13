import { teamPageStartScreen } from '../../team/team.app';

export const teamPageComponent = {
  init: teamPageStartScreen,
  render: () => `
    <div class="team-component">
    <div class="team-name-block">
    <p class="team-name">NINJA JS TEAM</p>
    </div>
    <div class="team-page-block">
    </div>
    </div>
    `,
};
