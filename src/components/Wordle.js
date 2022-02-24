import WORDS_GAME from '../assets/words.json';

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
  'Z'
]
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
    .messages{

      display:none;
    }
    `;

  }

  gameStart() {
    const numRamdom = Math.floor(Math.random() * WORDS_GAME.length);
    this.wordSecret = WORDS_GAME[numRamdom];
    this.game_Over = false;

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

  errorEmpty() {
    this.shadowRoot.querySelector('.messages').style.display = 'block';
  }

  checkWord() {
    const wordEmpty = this.wordCurrent.isEmpty();
    wordEmpty && this.errorEmpty();
  }


  connectedCallback() {
    this.render();
    this.wordCurrent = this.shadowRoot.querySelector('word-game[current]');
    document.addEventListener('keyup', e => this.letterPush(e.key));
    // d 
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
            <div class='messages'>
                la palabra como minimo es de 5 letras 
            </div>
     </div>
    `;
  }
}
customElements.define('wordle-render', Wordle);
