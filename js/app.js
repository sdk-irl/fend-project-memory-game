/* * If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    = + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    = + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let toggledCardsArray = [];
let moves = 0;
const memoryCardDeck = document.querySelector('.deck');
let clockTimer;
/* move this and memoryCardDeck selector function into another function and call from doEverything */

/* List that holds all cards to pass into the shuffle function */
function shuffleCards() {
    const cards = document.querySelectorAll('.deck li');
    let cardArray = Array.from(cards);
    let shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        memoryCardDeck.appendChild(card);
    }
}
/* Initialize game including stars, clock, and tiles when restart button is pushed */
function initialize() {
    const repeat = document.querySelector('.fa-repeat');
    repeat.addEventListener('click', function(){
        console.log('i work');
        resetStars();
        resetClock();
        resetTiles();
    })
}
function resetStars() {
    const starsPanel = document.querySelector('.stars');
    while (starsPanel.firstChild) {
        starsPanel.removeChild(starsPanel.firstChild);
    }
    for (i=0; i<3; i++) {
        let childEl1 = document.createElement('li');
        console.log(childEl1);
        let childEl2 = document.createElement('i');
        console.log(childEl2);
        childEl2.classList.add('fa', 'fa-star');
        childEl1.appendChild(childEl2);
        starsPanel.appendChild(childEl1);
        console.log(starsPanel); 
    }
}

function resetClock() {
    console.log('resetClock works!');
    clearInterval(clockTimer);
    startClock();
}

function resetTiles() {
    console.log('resetTiles works!');
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

/* Set up the event listener for a card */
memoryCardDeck.addEventListener('click', function(){
    const evtTgt = event.target; 
    /* If cards meet criteria, toggle them to open, add to list */
    if (checkClick(evtTgt)) {
        toggleCard(evtTgt);
        addCardToList(evtTgt);
        /* When two cards in array, check for matching set and increment number of moves in game */
        if (toggledCardsArray.length === 2) {
            checkCardMatch();
            incrementMoves();
            decreaseStars()
        }
    }
});

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
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ 
        .element {
  transform: translate(0 px, -10px)}
  @keyframes tileJump {
      */
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
/* Function to increment the number of moves in the game */
function incrementMoves() {
    moves++;
    let moveNum = document.querySelector('.moves');
    moveNum.textContent = moves;
}

/* Function to decrement number of stars */
function decreaseStars() {
    const starsPanel = document.querySelector('.stars');
    if (moves===7 || moves===14) {
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
/* Function to run all the functions! */
function doEverything() {
    startClock()
    shuffleCards();
    initialize();
}
/* Running everything at the end and with a brief delay to prevent race conditions and soooo much frustration */
setTimeout(doEverything(), 1000);