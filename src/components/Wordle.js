import WORDS_GAME from '../assets/words.json';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const ALL_LETEER = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'Ñ',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
class Wordle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.gameStart();
  }

  static get styles() {
    return /*css*/ `
        :host{

    }
    .containerGame{
      min-height: 100vh;
    }
    h1 {
      margin:0;
      padding:0;
      text-align:center;
      letter-spacing: 1rem;
      text-transform:uppercase;
      border-bottom:1px solid #115173;
    }
    .renderWords{
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 550px;
    } 

    .containerMessages{
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding:1rem;

    }
    .messages{
      box-shadow: 0 0 10px #000;
      width:300px;
      padding:1rem;
      border-radius:1rem;
      text-align:center;
      color:#ECB365;
    }

    `;
  }

  gameStart() {
    const numRamdom = Math.floor(Math.random() * WORDS_GAME.length);
    this.wordSecret = WORDS_GAME[numRamdom];
    this.game_Over = false;
    console.log(this.wordSecret);
  }

  letterPush(letter) {
    if (this.game_Over) return;
    const keyLetter = letter.toUpperCase();

    const keyBack = keyLetter === 'BACKSPACE';

    const keyEnter = keyLetter === 'ENTER';

    keyEnter && this.checkWord();
    keyBack && this.wordCurrent.letterRemove();

    if (this.wordCurrent.isEmpty() && ALL_LETEER.includes(keyLetter)) {
      this.wordCurrent.pushLetter(keyLetter);
    }
  }

  disconnectMessages() {
    setInterval(() => {
      this.shadowRoot.querySelector('.messages').innerHTML = '';
    }, 5000);
  }

  errorEmpty() {
    this.shadowRoot.querySelector('.messages').innerHTML =
      'la palabra esta vacia  o   no existe en el diccionario';
    return this.disconnectMessages();
  }

  checkWord() {
    const wordEmpty = this.wordCurrent.isEmpty();
    if (wordEmpty) {
      this.errorEmpty();
      return;
    }
    const word = this.wordCurrent.toString().toLowerCase();
    const correctWord = WORDS_GAME.includes(word);
    console.log(correctWord);

    if (!correctWord) {
      this.errorEmpty();
      return;
    }

    const isCorrectWord = this.correctWord();

    if (!isCorrectWord) {
      this.nextTry();
      return;
    }

    return this.winGame();
  }

  correctWord() {
    const word = this.wordCurrent.toString().toLowerCase();
    const letterIncludes = word.toLowerCase().split('');
    const letterSecret = this.wordSecret.toLowerCase().split('');

    letterIncludes.forEach((letter, index) => {
      const isExactLetter = letter === this.wordSecret[index];
      isExactLetter && this.wordCurrent.setExactLetter(index);
    });

    letterIncludes.forEach((letter, index) => {
      const exactLetter = letterSecret.includes(letter);
      if (exactLetter) {
        this.wordCurrent.setExistLetter(index);
        const positionLetter = letterSecret.findIndex(
          (lett) => lett === letter
        );
        letterSecret[positionLetter] = ' ';
      }
    });

    this.wordCurrent.setWrongLetter();

    this.wordCurrent.classList.add('env');
    return this.wordCurrent.isSolved();
  }
  nextTry() {
    this.wordCurrent = this.shadowRoot.querySelector('word-game[current]');
    const nextry = this.wordCurrent.nextElementSibling;
    if (nextry) {
      nextry.setAttribute('current', ' ');
      this.wordCurrent.removeAttribute('current');
      this.wordCurrent = nextry;
    }
    return this.loseGame();
  }

  winGame() {
    this.shadowRoot.querySelector('.messages').innerHTML = 'ganaste :)';
    this.disconnectMessages();
    confetti();
    return (this.game_Over = true);
  }

  loseGame() {
    this.shadowRoot.querySelector('.messages').innerHTML =
      'fallaste :( sigue intentado';
    return this.disconnectMessages();
  }

  connectedCallback() {
    this.render();
    this.wordCurrent = this.shadowRoot.querySelector('word-game[current]');
    document.addEventListener('keyup', (e) => this.letterPush(e.key));
    // d
    console.log(this.wordSecret);
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${Wordle.styles}</style>
     <div class='containerGame'>
            <h1>
                Wordle  
            </h1>
            <div class="renderWords">
                <word-game current ></word-game>
                <word-game ></word-game>
                <word-game ></word-game>
                <word-game ></word-game>
                <word-game ></word-game>
            </div>
            <div class="containerMessages">
              <div class='messages'>
             
             </div>
            </div>
     </div>
    `;
  }
}
customElements.define('wordle-render', Wordle);
