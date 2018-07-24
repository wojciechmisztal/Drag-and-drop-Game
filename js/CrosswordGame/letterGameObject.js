class LetterGameObject extends GameObject {
    constructor(letter, i, word, game) {
        super(game);
        this.letter = letter;
        this.filled = false;
        this.letterNumber = i;
        this.word = word;
        this.object = $('<div>', {class: 'letter'});
        this.object.on('click', () => {
            this.click();
        });
        word.object.append(this.object);
    }

    click() {
        this.word.setFocus(this.letterNumber);
    }

    insertLetter(letter) {
        this.filled = true;
        if (letter.length === 1 && this.normalize(letter).match(/[a-zł]/i)) {
            this.object.text(letter.toUpperCase());
            this.unsetActive();
            return true;
        }
        return false;
    }

    normalize(letter) {
        if (letter.toLowerCase() === 'ł') {
            letter = 'l';
        }
        return letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    setActive() {
        this.object.addClass('active');
    }

    unsetActive() {
        this.object.removeClass('active');
    }
}
