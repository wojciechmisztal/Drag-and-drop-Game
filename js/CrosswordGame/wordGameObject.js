class WordGameObject extends GameObject {
    constructor(word, i, lowestSolutionLetter, game) {
        super(game);
        this.wordNumber = i;
        this.word = word.word;
        this.solutionLetter = word.solutionLetter;
        this.lowestSolutionLetter = lowestSolutionLetter;

        this.createWord(this.word, this.wordNumber);
    }

    createWord(word, wordNumber) {
        let letters = word.split('');
        this.object = $('<div>', {id: wordNumber, class: 'word'});
        this.object.on('click', () => {
            this.click();
        });
        this.gameObjects = [];

        for(let i = 0; i < this.solutionLetter - this.lowestSolutionLetter; i++) {
            let emptyHeader = $('<div>', {class: 'empty-letter-space'});
            this.object.append(emptyHeader);
        }

        var letterCount = 0;
        for(let i in letters) {
            let letter = letters[i];
            if(letter == ' ') {
                        
            }
            else {
                this.gameObjects.push(new LetterGameObject(letter, letterCount, this, this.getGame()));
                letterCount++;
            }
        }

        this.getGame().crossword.append(this.object);
    }

    setFocus(letterNumber) {
        if(typeof letterNumber == 'undefined') {
            letterNumber = this.focus ? this.focus : 0;
        }
        if(typeof this.focus == 'undefined') {
            this.focus = letterNumber;
        }
        else {
            this.gameObjects[this.focus].unsetActive();
            if(letterNumber > this.gameObjects.length - 1) {
                this.focus = 0;
            }
            else {
                this.focus = letterNumber;
            }
        }
        this.gameObjects[this.focus].setActive();
    }

    nextLetter() {
        this.setFocus(this.focus + 1);
    }

    prevLetter() {
        this.setFocus(this.focus - 1);
    }

    setActive() {
        this.object.addClass('active');
    }

    unsetActive() {
        this.gameObjects[this.focus].object.removeClass('active');
        this.object.removeClass('active');
    }

    click() {
        this.getGame().setFocus(this.wordNumber);
    }

    insertLetter(letter) {
        if(this.gameObjects[this.focus].insertLetter(letter)) {
            if(this.focus === this.gameObjects.length - 1) {
                this.setFocus(0);
                return 'next';
            }
            this.setFocus(this.focus + 1);
        }
    }
}
