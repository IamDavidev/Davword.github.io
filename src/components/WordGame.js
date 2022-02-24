const MAX_LETTER = 5;

class WordGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    static get styles() {
        return /*css*/ `
        :host{      
            --color: #f1d00a;
          }
        .containerWord{
            display: flex;
        }
        .letter{
           border:1px solid var(--color);; 
           padding:1rem;
           margin:3px; 
        }
    `;
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
        this.word = this.getAttribute('word');
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