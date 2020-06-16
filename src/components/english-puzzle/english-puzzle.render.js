// const englishPuzzleRender = () => {
//   document.querySelector('body').innerHTML = '';
//   document.querySelector('body').insertAdjacentHTML('afterbegin', `
//     <div class="body overflow-hidden">
//       <div class="centralizer hidden">
//         <header class="header">
//           <nav class="navigation">
//             <div class="navigation__box navigation__box_left">
//               <span class="navigation__description level__description">Level</span>
//               <!-- <select class="navigation__level level select" name="level">
//                 <option value="0">1</option>
//                 <option value="1">2</option>
//                 <option value="2">3</option>
//                 <option value="3">4</option>
//                 <option value="4">5</option>
//                 <option value="5">6</option>
//               </select> -->
//             </div>
//             <div class="navigation__box navigation__box_right">
//               <span class="navigation__description round__description">Round</span>
//               <!-- <select class="navigation__round round select" name="round">
//                 <option value="0">1</option>
//                 <option value="1">2</option>
//                 <option value="2">3</option>
//                 <option value="3">4</option>
//                 <option value="4">5</option>
//                 <option value="5">6</option>
//                 <option value="6">7</option>
//                 <option value="7">8</option>
//                 <option value="8">9</option>
//                 <option value="9">10</option>
//               </select> -->
//             </div>
//           </nav>
//         </header>

//         <main class="main">
//           <div class="game__controls">
//             <div class="buttons__wrapper">
//               <div class="difficulties">
//                 <span class="difficult__description">Level:</span>
//                 <button class="game__difficult game__difficult-1 button-rounded active">1</button>
//                 <button class="game__difficult game__difficult-2 button-rounded">2</button>
//                 <button class="game__difficult game__difficult-3 button-rounded">3</button>
//                 <button class="game__difficult game__difficult-4 button-rounded">4</button>
//                 <button class="game__difficult game__difficult-5 button-rounded">5</button>
//                 <button class="game__difficult game__difficult-6 button-rounded">6</button>
//               </div>
//               <div class="button__container">
//                 <button class="game__button game__button-new button-rounded">New game</button>
//                 <button class="game__button game__button-start button-rounded">Start game</button>
//                 <button class="game__button game__button-stop button-rounded">Stop game</button>
//                 <button class="game__button game__button-results button-rounded">Results</button>
//               </div>
//             </div>
//             <p class="status-bar"></p>
//           </div>

//           <div class="main-card">
//             <div>
//               <p class="main-card__translation"></p>
//               <input class="main-card__speech-input input" type="text" readonly> <!-- readonly -->
//             </div>
//             <div class="picture__container">
//               <img class="main-card__picture" alt="current word picture">
//             </div>
//           </div>

//           <div class="cards__container">
//           </div>

//           <div class="game__field">
//             <div class="field__container game__field_container">
//               <div class="drop__place sentence"></div>
//             </div>

//             <div class="data__container game__field_container">
//               <div class="drop__place sentence">
//                 <!-- <span class="dragable d1">1</span>
//                 <span class="dragable d2">2</span>
//                 <span class="dragable d3">3</span>
//                 <span class="dragable d4">4</span>
//                 <span class="dragable d5">5</span> -->
//               </div>
//             </div>
//           </div>

//           <div class="results__container">
//             <div class="button__container-results">
//               <button class="game__button game__button-results_return button-rounded">Return</button>
//               <button class="game__button game__button-results_new button-rounded">New game</button>
//             </div>

//             <div class="slider__wrapper wrapper">
//               <div class="button__container-slider button__container_left">
//                 <button class="slider__button slider__button_previous">
//                   <span class="slider__button-icon"></span>
//                 </button>
//               </div>
//               <div class="button__container-slider button__container_right">
//                 <button class="slider__button slider__button_next">
//                   <span class="slider__button-icon"></span>
//                 </button>
//               </div>

//               <div class="gallery">
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <div class="spinner hidden">
//         <div class="spinner__gear">
//           <div class="spinner__inner">
//             <div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         </div>
//         <span class="spinner__description">loading...</span>
//       </div>

//       <div class="introduction">
//         <div class="introduction__container">
//           <button class="introduction__button button-rounded">start</button>
//         </div>
//       </div>

//       <template class="slider__item-template">
//         <div class="slider__item">
//           <p class="time"></p>
//           <div class="results__correct">
//             <p class="correct__title">
//               <span class="correct__lead">Guessed:
//                 <span class="correct"></span>
//               </span>
//             </p>
//           </div>
//           <div class="results__errors">
//             <p class="errors__title">
//               <span class="errors__lead">Errors:
//                 <span class="errors"></span>
//               </span>
//             </p>
//           </div>
//         </div>
//       </template>
//     </div>
//   `);
// };

// export default englishPuzzleRender;
