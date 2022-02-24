import WORDS_GAME from '../assets/words.json';

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
    `;
  }

  gameStart() {
    const numRamdom = Math.floor(Math.random() * WORDS_GAME.length);
    this.wordSecret = WORDS_GAME[numRamdom];
    this.gome_Over = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${Wordle.styles}</style>
     <div class='ContainerGame'>
            <h1>
                Wordle game 
            </h1>
            <div className="renderWords">
                <word-game word=${this.wordSecret}></word-game>
                <word-game word=${this.wordSecret}></word-game>
                <word-game word=${this.wordSecret}></word-game>
                <word-game word=${this.wordSecret}></word-game>
                <word-game word=${this.wordSecret}></word-game>
            </div>
     </div>
    `;
  }
}
customElements.define('wordle-render', Wordle);
