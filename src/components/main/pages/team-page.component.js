import '../../team/scss/team.styles.scss';
import workflowImg from '../../team/assets/team_workflow.png';

export const teamPageComponent = {
  render: () => `
  <div class="xteam__row">

  <div class="xteam__column">
    <div class="xteam__card">
      <img src="https://avatars2.githubusercontent.com/u/30927000?s=460&u=efd4485c38e4409a1ef99a8663b43ec6ff66b84f&v=4" alt="Jane" style="width:100%">
      <div class="xteam__container">
        <h2>Aleh Serhiyenia</h2>
        <p class="xteam__title">Mentor <a href="https://github.com/pulya10c" target="_blank"><button class="xteam__button">Github</button></a></p>
        <p>Mentoring the team.</p>
      </div>
    </div>
  </div>

  <div class="xteam__column">
    <div class="xteam__card">
      <img src="https://avatars2.githubusercontent.com/u/50077360?s=460&u=dfa2cb20ebd2870a64b32d76974c1a1551f94946&v=4" alt="Mike" style="width:100%">
      <div class="xteam__container">
        <h2>Igor Musmen</h2>
        <p class="xteam__title">Student / Teamlead <a href="https://github.com/Musmen" target="_blank"><button class="xteam__button">Github</button></a></p>
        <p>Project structure,  environment setup, games 'SpeakIt', 'English-puzzle', 'Main game (Linguist)', spaced repetitions logic, vocabulary and statistics pages, common loader, 
        general methods for long-term statistics.</p>
      </div>
    </div>
  </div>

  <div class="xteam__column">
    <div class="xteam__card">
      <img src="https://avatars3.githubusercontent.com/u/40052037?s=460&u=a1197b12e0654838e9166fb8757c5da01f3d0cf1&v=4" alt="John" style="width:100%">
      <div class="xteam__container">
        <h2>Vanya Radivilov</h2>
        <p class="xteam__title">Student <a href="https://github.com/nixon2105" target="_blank"><button class="xteam__button">Github</button></a></p>
        <p>Design, markup (main app pages), main menu, routing, game 'Sprint', own game ('Drop').</p>
      </div>
    </div>
  </div>

  <div class="xteam__column">
    <div class="xteam__card">
      <img src="https://avatars2.githubusercontent.com/u/51196040?s=460&u=725fafe209c2dc69b906bb8ca180bd6b5054f2a8&v=4" alt="John" style="width:100%">
      <div class="xteam__container">
        <h2>Asiliia Tikhonycheva</h2>
        <p class="xteam__title">Student <a href="https://github.com/Asiliia" target="_blank"><button class="xteam__button">Github</button></a></p>
        <p>Services for API endpoints and Jest tests, game 'Savanna', login/logout UI and functionality, token validation, common error popup, team page.</p>
      </div>
    </div>
  </div>

<div class="xteam__column">
  <div class="xteam__card">
    <img src="https://avatars3.githubusercontent.com/u/39918932?s=460&u=3a3344f94e9422e6760279d1592a7677b178314b&v=4" alt="John" style="width:100%">
    <div class="xteam__container">
      <h2>Max Shelepen</h2>
      <p class="xteam__title">Student <a href="https://github.com/MaxShelepen" target="_blank"><button class="xteam__button">Github</button></a></p>
      <p>Promo page, design, markup, game 'Sprint'.</p>
    </div>
  </div>
</div>

<div class="xteam__column">
  <div class="xteam__card">
    <img src="https://avatars0.githubusercontent.com/u/56892495?s=460&u=4c572bd97137c3c1ff8d7634b8ff6c3144ec6acf&v=4" alt="John" style="width:100%">
    <div class="xteam__container">
      <h2>Hleb Pihuleuski</h2>
      <p class="xteam__title">Student <a href="https://github.com/CasperCarver" target="_blank"><button class="xteam__button">Github</button></a></p>
      <p>Environment setup, settings page, main intro page.</p>
    </div>
  </div>
</div>

<div class="xteam__column">
  <div class="xteam__card">
    <img src="https://avatars1.githubusercontent.com/u/59864226?s=460&u=dd800b1118a99d54beb08aad445d1ffd71781839&v=4" alt="John" style="width:100%">
    <div class="xteam__container">
      <h2>Misha Shiryakov</h2>
      <p class="xteam__title">Student <a href="https://github.com/mishashiryakov" target="_blank"><button class="xteam__button">Github</button></a></p>
      <p>Game 'Audiocall'.</p>
    </div>
  </div>
</div>

</div>
<div class="xteam__workflow">
  <img src=${workflowImg}>
<div>
    `,
};
