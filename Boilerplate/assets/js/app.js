const gameObject = {
    ALLOWED_ERRORS: 6,
    currentErrors: 0,
    correctGuesses: 0,
    guessWordContainer: document.querySelector('#guessWord'),
    guessWord: null,
    errorsContainer: document.querySelector('#errors'),
    spans: null,
    title: null,
}

const guessWordForm = document.querySelector('#guessWordForm');
guessWordForm.addEventListener('submit', function(e){
    e.preventDefault();

    gameObject.guessWord = guessWordForm.querySelector('input[name="guessWord"]').value.toUpperCase().trim();

    startGame(gameObject.guessWord);
})

function startGame(guessWord) {
    const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const englishAlphabetArray = englishAlphabet.split('');
    const lettersContainer = document.querySelector('#lettersContainer');
    
    englishAlphabetArray.forEach(letter => generateLetterSpan(letter, lettersContainer))

    
    gameObject.title = gameObject.guessWordContainer.querySelector('h3');
    gameObject.title.textContent = 'Your word is:';

    console.log(guessWord.length)
    createGuessFields(guessWord.length, gameObject.guessWordContainer);
}

function createGuessFields(wordLength, container) {
    for(let i = 0; i < wordLength; i++){
        let span = document.createElement('span');
        span.textContent = '_';

        container.append(span);
    }
}

function onSelectLetter(e) {
    let letter = e.target;
    if(gameObject.currentErrors == gameObject.ALLOWED_ERRORS && gameObject.correctGuesses == gameObject.guessWord.length)
        return;

    let flag = false;
    for(let i = 0; i < gameObject.guessWord.length; i++) {
        if(gameObject.guessWord[i] === letter.textContent){
            flag = true;
            gameObject.spans = gameObject.guessWordContainer.querySelectorAll('span');
            gameObject.spans[i].textContent = letter.textContent;
            gameObject.correctGuesses++;
            letter.classList.add('correct')
        }
    }
    if(!flag){
        gameObject.currentErrors = ++gameObject.currentErrors;
        gameObject.errorsContainer.textContent = `Your errors: ${gameObject.currentErrors}`;
        letter.classList.add('wrong')
    }

    if(gameObject.currentErrors == gameObject.ALLOWED_ERRORS){
        alert('YOU GOT HANGED');
    }

    if(gameObject.correctGuesses == gameObject.guessWord.length){
        alert('YOU GUESSED IT')
    }

    letter.removeEventListener('click', onSelectLetter);
}

function generateLetterSpan(letter, container){
    let letterSpan = document.createElement('span');
    letterSpan.textContent = letter.toUpperCase();

    letterSpan.addEventListener('click', onSelectLetter);

    container.append(letterSpan);
}
