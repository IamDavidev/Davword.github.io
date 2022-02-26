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
            --color-correct:#28FFBF;
            --color-exited:#FFF338;
            --color-wrong:#423F3E;

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
        .letter.wrong{
            background-color: var(--color-wrong);
        }
        .letter.exist{
            background: var(--color-exited);
        }
        .containerWord .letter.exact{
            background: var(--color-correct);
        }
    `;
    }

    toString() {
        return this.word.replace(/ /g, "")
    }

    isEmpty() {
        return this.word.includes(' ')
    }



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

    isSolved() {
        const allLetter = Array.from(this.shadowRoot.querySelectorAll('.letter'));
        return allLetter.every(letter => letter.classList.contains('exact'));

    }

    setExactLetter(index) {
        const allLetter = this.shadowRoot.querySelectorAll('.letter');
        allLetter[index].classList.add('exact');
        return allLetter[index].classList.remove('wrog');
    }
    setExistLetter(index) {
        const allLetter = this.shadowRoot.querySelectorAll('.letter');
      
        allLetter[index].classList.add('exist');
        return allLetter[index].classList.remove('wrog');

    }
    
    setWrongLetter(){

        const allLetter = this.shadowRoot.querySelectorAll('.letter');
        allLetter.forEach( letter => {
            const isExactL = letter.classList.contains('exact');
            const isExitL = letter.classList.contains('exist');
            if(!isExactL && !isExitL){
                letter.classList.add('wrong');
            }
        })
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