let toggledCardsArray = [];
let moves = 0;
let memoryCardDeck;
let clockTimer;

/* Initialize game including stars, clock, and tiles when restart button is pushed */
function initialize() {
    const repeat = document.querySelector('.fa-repeat');

    /* Set up the event listener for a card */
    memoryCardDeck = document.querySelector('.deck');
    memoryCardDeck.addEventListener('click', handleCardClick);

    /* Set up the event listener for the repeast button */
    repeat.addEventListener('click', function(){
        resetStars();
        resetClock();
        resetTiles();
        moves = 0;
        displayMoves();
    });
}

/* When a card is clicked on, do what is necessary */
function handleCardClick(ev) {
    const evtTgt = ev.target;
    /* If cards meet criteria, toggle them to open, add to list */
    if (checkClick(evtTgt)) {
        toggleCard(evtTgt);
        addCardToList(evtTgt);
        /* When two cards in array, check for matching set and increment
           number of moves in game */
        if (toggledCardsArray.length === 2) {
            checkCardMatch();
            moves++;
            displayMoves();
            decreaseStars();
            setTimeout(winModal, 10);
        }
    }
}

function resetStars() {
    const starsPanel = document.querySelector('.stars');
    while (starsPanel.firstChild) {
        starsPanel.removeChild(starsPanel.firstChild);
    }
    for (i=0; i<3; i++) {
        let childEl1 = document.createElement('li');
        let childEl2 = document.createElement('i');
        childEl2.classList.add('fa', 'fa-star');
        childEl1.appendChild(childEl2);
        starsPanel.appendChild(childEl1);
    }
}

function resetClock() {
    clearInterval(clockTimer);
    startClock();
}

function resetTiles() {
    const cardOpenShow = memoryCardDeck.querySelectorAll('.open.show');
    const cardMatches = memoryCardDeck.querySelectorAll('.open.show.match');
    for (card of cardOpenShow) {
        card.classList.toggle('open');
        card.classList.toggle('show');
    }
    for (match of cardMatches) {
        match.classList.toggle('match');
    }
}

/* List that holds all cards to pass into the shuffle function */
function shuffleCards() {
    const cards = document.querySelectorAll('.deck li');
    let cardArray = Array.from(cards);
    let shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        memoryCardDeck.appendChild(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* Function to check card for match, for less than 2 cards, and not the same card */
function checkClick(evtTgt) {
    return (
        (evtTgt.classList.contains('card')
        && (!evtTgt.classList.contains('match')
        && toggledCardsArray.length < 2
        && !toggledCardsArray.includes(evtTgt))
        )
    )}

/* Function to toggle cards to open */
function toggleCard(evtTgt){
    evtTgt.classList.toggle('open');
    evtTgt.classList.toggle('show');
}

/* Function to add cards to the card deck */
function addCardToList(evtTgt) {
    toggledCardsArray.push(evtTgt);
} 

/* Function to see if cards match */
function checkCardMatch() {
    /* if toggled cards match, change to match color, toggle class to match, and empty array */
    if (toggledCardsArray[0].firstElementChild.className 
        === toggledCardsArray[1].firstElementChild.className) {
        toggledCardsArray[0].classList.add('match');
        toggledCardsArray[1].classList.add('match');
        toggledCardsArray = [];
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ */
    }
    else {
    /* Wait for player to see cards, then toggles cards, then resets card array; */
       setTimeout(function timeoutID() {
            toggleCard(toggledCardsArray[0]);
            toggleCard(toggledCardsArray[1]);
            toggledCardsArray = [];
            } , 900);
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ */
    }
}

/* Function to update the display of number of moves in a game */
function displayMoves() {
    const moveNum = document.querySelector('.moves');
    moveNum.textContent = moves;
}

/* Function to decrement number of stars */
function decreaseStars() {
    const starsPanel = document.querySelector('.stars');
    if (moves===9 || moves===15) {
        let star = starsPanel.querySelector('li');
        starsPanel.removeChild(star);
    }
}

/* Function to run clock */
function startClock() {
    let seconds = 0;
    let minutes = 0;
    const clock = document.querySelector('.clock');
    /* interval to increment clock */
    clockTimer = setInterval(function() {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        /* Convert minutes to 00:00 and display on page */
        const displayMinutes = minutes < 10 ? "0" + minutes : "" + minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds: "" + seconds;
        clock.innerHTML = displayMinutes + ":" + displaySeconds;
    }, 1000);
}

function winModal() {
    console.log('winModal is working');
    if (memoryCardDeck.querySelectorAll('li').length === memoryCardDeck.querySelectorAll('.match').length) {
        console.log('winModal is working2');
        const numOfStars = document.querySelectorAll('.stars li').length;
        window.alert(printWinMessage(numOfStars)); 
    }
}

function printWinMessage(numOfStars) {
    const starPlural = numOfStars === 1 ? 'star' : 'stars';
    const totalTime = captureTime();
    const message = 'Congratulations! You won the game! \n You scored ' + numOfStars + ' ' + starPlural + '! \n It took you ' + totalTime +'.';
    return message;
}

function captureTime() {
    console.log('captureTime is working');
    clearInterval(clockTimer);
    const panelClock = document.querySelector('.clock');
    return panelClock.innerHTML;
}

/* Function to run all the functions! */
function doEverything() {
    initialize();
    shuffleCards();
    startClock();
}

/* Running everything at the end and with a brief delay to prevent race conditions and soooo much frustration */
setTimeout(doEverything, 100);
