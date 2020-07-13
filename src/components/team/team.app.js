// import './scss/team-block.scss';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';

// class TeamPage {
//   constructor() {
//     this.team = [{
//       name: 'Aleh Serhiyenia',
//       role: 'Mentor',
//       photo: './src/Serhiyenia.jpg',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: 'Igor Musmen',
//       role: 'Team-lead',
//       photo: './src/Musmen.jpg',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: 'Hleb Pihuleuski',
//       role: 'Front-End/DevOps',
//       photo: './src/Pihuleuski.jpg',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: 'Asiliia Tikhonycheva',
//       role: 'Front-End Developer',
//       photo: './src/Tikhonycheva.jpg',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: '123',
//       role: 'Front-End Developer',
//       photo: '',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: 'Ivan Radivilov',
//       role: 'Front-End Developer',
//       photo: './src/Radivilov.jpg',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     {
//       name: 'Maxim Shelepen',
//       role: 'Front-End Developer',
//       photo: './src/Shelepen.png',
//       website: 'https://githu',
//       email: '@gmail.com',
//       linkedin: 'https://',
//     },
//     ];
//   }

//   addTeam() {
//     const owl = $('.owl-carousel');

//     function slider() {
//       owl.owlCarousel({
//         loop: false,
//         // margin:10,
//         nav: true,
//         responsive: {
//           0: {
//             items: 1,
//           },
//           550: {
//             items: 2,
//           },
//           900: {
//             items: 3,
//           },
//           1199: {
//             items: 4,
//           },
//         },
//       });
//     }

//     slider();

//     document.querySelector('.team-page-block').innerHTML = `
//     <div class="owl-carousel owl-theme"></div>
//     `;
//     for (let i = 0; i < this.team.length; i++) {
//       /* Variables for the team */
//       const { name } = this.team[i];
//       const { role } = this.team[i];
//       const { photo } = this.team[i];
//       const { website } = this.team[i];
//       const { email } = this.team[i];
//       const { linkedin } = this.team[i];

//       /* Template for the Team Cards */
//       const template = `
//         <div class="team-card">
//               <div class="team-header">

//               </div>
//               <div class="team-content">
//                   <div class="team-content-header">

//                   <h3 class="team-name">${name}</h3>

//                   </div>
//                   <div class="team-info">
//                       <div class="info-section">
//                           <p></p>
//                           <p></p>
//                       </div>

//                       <div class="info-section">
//                       <p></p>
//                       <p></p>
//                       </div>
//                   </div>
//               </div>
//               </div>
//             `;

//       $('.owl-carousel').owlCarousel('add', template).owlCarousel('update');
//     }
//   }
// }

// const RSlangTeamPage = new TeamPage();

// const teamPageStartScreen = () => {
//   RSlangTeamPage.addTeam();
// };

// export { teamPageStartScreen };
