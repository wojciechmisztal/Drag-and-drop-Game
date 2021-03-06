class PictureGame extends Game {
    constructor(gameAreaId, version, className) {
        super(gameAreaId, version, className);

        this.loadGame();
    }

    loadGame() {
        this.newQuestion();
        
        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });

    }

    newQuestion() {
        if(this.nextQuestion()) {
            if(this.object) {
                this.object.remove();
            }
            this.object = $('<div>', {id: 'picture-game'});
            this.getGameArea().append(this.object);

            this.createQuestion();
            this.createAnswers();
            this.appendAnswers();
        }
    }

    nextQuestion() {
        if(this.questionNumber === undefined) {
            this.questionNumber = 0;
        }
        else if(this.questionNumber === PictureGame.questions.length - 1) {
            this.endGame();
            return false;
        }
        else {
            this.questionNumber++;
        }
        return true;
    }

    endGame() {
        clearInterval(this.timeInterval);
        Snackbar.removeCallbacks();
        Snackbar.show('success', '_success_header', '_success', false, this.scores.text());
    }

    getQuestion() {
        return PictureGame.questions[this.questionNumber];
    }

    getQuestionNumber() {
        return this.questionNumber;
    }

    createQuestion() {
        this.questionGameObject = new QuestionGameObject(this);
    }

    appendAnswers() {
        let pictureAnswers = $('<div>', {class: 'picture-answers'});
        this.object.append(pictureAnswers);
        this.answerGameObjects.forEach(function (entry) {
            pictureAnswers.append(entry.object);
        })
    }

    createAnswers() {
        this.answerGameObjects = [];

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        let numberOfAnswersToShow = this.getQuestion().numberOfAnswersToShow;
        if(!numberOfAnswersToShow) {
            numberOfAnswersToShow = 3; 
        }

        let answers = this.getQuestion().answers.slice();
        let correctAnswer = answers.splice(this.getQuestion().correct, 1);

        shuffle(answers);
        answers = correctAnswer.concat(answers.slice(0, numberOfAnswersToShow - 1));
        shuffle(answers);

        for(var i in answers) {
            this.answerGameObjects.push(new AnswerGameObject(this.getQuestion().answers.indexOf(answers[i]), this));
        }
        this.correctAnswerNumber = this.getQuestion().correct;
    }

    checkAnswer(answerNumber) {
        setTimeout(() => {
            this.newQuestion();
        }, 2000);

        for(var i in this.answerGameObjects) {
            this.answerGameObjects[i].setClick(false);
        }

        if(this.correctAnswerNumber === answerNumber) {
            this.setScores(true);
            return true;
        }
        else {
            //Snackbar.show("error", '_fail_header', '_fail', false, this.textLocalized);
            return false;
        }
    }

    loadLocale() {
        super.loadLocale();
        for(var i in this.answerGameObjects) {
            let answer = this.answerGameObjects[i];
            answer.loadLocale();
        }
        this.questionGameObject.loadLocale();
    }

    setTimer() {
        this.timerSet = true;
        if (!this.timeInterval) {
            var timer = $('<div>', {id: 'timer', class: 'timer left'}).append('0:00');
            this.getGameArea().prepend(timer);
        }
        else {
            var timer = $('#timer');
            timer.text('0:00');
        }
        var start = new Date;

        this.timeInterval = setInterval(function () {
            var time = parseInt((new Date - start) / 1000);
            timer.text(parseInt(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
        }, 1000);
    }

    setScores(correct) {
        if (!this.scores) {
            this.scores = $('<div>', {class: 'scores right'}).append(0);
        }
        else {
            var score = parseInt(this.scores.text());
            if (correct) {
                score++;
            }
            this.scores.text(score);
        }
        this.getGameArea().prepend(this.scores);
    }

    static loadImages() {
        let length = 0;
        let images = PictureGame.questions;
        for (let i in images) {
            for (let j in images[i].answers) {
                length++;
                let img = new Image;
                img.addEventListener('load', function () {
                    Load.imageLoaded();
                });
                img.src = Game.folder + images[i].answers[j].picture;
                img.style.display = "none";
                $('body').append(img);
            }
        }
        return length;
    }
}
