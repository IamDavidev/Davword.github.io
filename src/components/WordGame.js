const MAX_LETTER = 5;

class WordGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.word = ' '.repeat(MAX_LETTER);
    }
    static get styles() {
        return /*css*/ `
        :host{      
            --color: #115173;
            --color-text: #29C7AC;
        }
          .containerWord{
                display: flex;
          }
        .letter{
            width: 40px;
            height: 40px;
            border:1px solid var(--color);; 
            padding:1rem;
            margin:3px; 
            border-radius:5px;
            overflow: hidden;
            display:flex;
            justify-content:center;
            color: var(--color-text);
            align-items:center;
        }
    `;
    }

    toString() {
        return this.word.replace(/ /g, "")
    }

    isEmpty() {
        return this.word.includes(' ')
    }

    // checkWord() {
    //     const wordEmpty = this.curren
    // }

    pushLetter(letter) {
        const word = this.toString() + letter;
        this.word = word.padEnd(MAX_LETTER, ' ');
        this.render();
    }

    letterRemove() {
        const word = this.toString().slice(0, -1);
        this.word = word.padEnd(MAX_LETTER, ' ');
        this.render();
    }


    gameWord() {
        return this.word.split('')
            .map(letter => `
                <div class='letter'>
                    <span>
                    ${letter}
                    </span>
                </div>
            `).join('')
    }

    connectedCallback() {
        // this.word = this.getAttribute('word');
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/ `
        <style>${WordGame.styles}</style>
    <div class='containerWord'>
        ${this.gameWord()}
    </div>  
    `;
    }
}
customElements.define('word-game', WordGame);