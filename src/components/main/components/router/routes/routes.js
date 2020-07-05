import { mainPageComponent } from '../../../pages/main-page.component';
import { errorPageComponent } from '../../../pages/error-page.component';
import { learnPageComponent } from '../../../pages/learn-page.component';
import { dictionaryPageComponent } from '../../../pages/dictionary-page.component';
import { gamesPageComponent } from '../../../pages/games-page.component';
import { statisticsPageComponent } from '../../../pages/statistics-page.component';
import { teamPageComponent } from '../../../pages/team-page.component';
import { settingsPageComponent } from '../../../pages/settings-page.component';
import { speakItPageComponent } from '../../../pages/speakit-page.component';
import { englishPuzzleComponent } from '../../../pages/english-puzzle.component';
import { savannahComponent } from '../../../pages/savannah-page.component';

const routes = [
  { path: '/', component: mainPageComponent },
  { path: '/error', component: errorPageComponent },
  { path: '/learn', component: learnPageComponent },
  { path: '/dictionary', component: dictionaryPageComponent },
  { path: '/games', component: gamesPageComponent },
  { path: '/statistics', component: statisticsPageComponent },
  { path: '/team', component: teamPageComponent },
  { path: '/settings', component: settingsPageComponent },
  { path: '/speakit', component: speakItPageComponent },
  { path: '/english-puzzle', component: englishPuzzleComponent },
  { path: '/savannah', component: savannahComponent },
];

export default routes;
