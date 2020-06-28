export const mainHeaderNavigation = {
  render: () => `
  <div class="wrapper">
  <nav class="main-header__navigation">
    <div class="hamburger-menu__button">
      <div class="hamburger-menu__line first"></div>
      <div class="hamburger-menu__line second"></div>
      <div class="hamburger-menu__line third"></div>
    </div>

    <ul class="navigation__list">
      <li class="navigation__item"><a href="#" class="navigation__link active">
          <img src="./assets/main/img/icon/home_icon 1.png" class="icon">Main</a></li>
      <li class="navigation__item"><a href="#/learn" class="navigation__link">
          <img src="./assets/main/img/icon/graduation.png" class="icon">Learn</a></li>
      <li class="navigation__item"><a href="#/dictionary" class="navigation__link">
          <img src="./assets/main/img/icon/book.png" class="icon">Dictionary</a></li>
      <li class="navigation__item"><a href="#/games" class="navigation__link">
          <img src="./assets/main/img/icon/games.png" class="icon">Games</a></li>
      <li class="navigation__item"><a href="#/statisticks" class="navigation__link">
          <img src="./assets/main/img/icon/stat.png" class="icon">Statistics</a></li>
      <li class="navigation__item"><a href="#/team" class="navigation__link">
          <img src="./assets/main/img/icon/team.png" class="icon">Team</a></li>
      <li class="navigation__item"><a href="#/settings" class="navigation__link">
          <img src="./assets/main/img/icon/set.png" class="icon">Settings</a></li>
    </ul>
  </nav>
</div>`,
};
