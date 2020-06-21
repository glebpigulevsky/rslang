// import { mainPageComponent } from './pages/main-page.component';
// import { learnPageComponent } from './pages/learn-page.component';
// import { dictionaryPageComponent } from './pages/dictionary-page.component';
// import { gamesPageComponent } from './pages/games-page.component';
// import { statisticsPageComponent } from './pages/statistics-page.component';
// import { teamPageComponent } from './pages/team-page.component';
// import { settingsPageComponent } from './pages/settings-page.component';
// import { errorPageComponent } from './pages/error-page.component';

// const appRoutes = [
//   { path: '/', component: mainPageComponent },
//   { path: '/learn', component: learnPageComponent },
//   { path: '/dictionary', component: dictionaryPageComponent },
//   { path: '/games', component: gamesPageComponent },
//   { path: '/statistics', component: statisticsPageComponent },
//   { path: '/team', component: teamPageComponent },
//   { path: '/settings', component: settingsPageComponent },
// ];

// export class Router () {
   
    
// };

// export class Router {
//   constructor() {
//     this.appRoutes = appRoutes;
//   }

//   getUrl() {
//     window.location.hash.slice(1).toLowerCase() || '/';
//   }

//   initRoutes() {
//     console.log('hi');
//   }
// }

// const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';

// const findComponentByPath = (path) => appRoutes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

// const router = () => {
//   const path = parseLocation();
//   const { component = errorPageComponent } = findComponentByPath(path, appRoutes) || {};
//   document.querySelector('main').innerHTML = component.render();
// };

// const initRouter = () => {
//   window.addEventListener('hashchange', router);
//   window.addEventListener('load', router);
// };
