
let toggledCardsArray = [];
const memoryCardDeck = document.querySelector('.deck');

/* List that holds all of your cards to pass into the shuffle function */
function shuffleCards() {
    const cards = document.querySelectorAll('.deck li');
    let cardArray = Array.from(cards);
    let shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        memoryCardDeck.appendChild(card);
    }
}
shuffleCards();

/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/* * If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    = + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    = + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/* display card's symbol*/

/* Set up the event listener for a card */
memoryCardDeck.addEventListener('click', function(){
    const evtTgt = event.target; 
    /* If cards meet criteria, toggle them to open, add to list */
    if (checkClick(evtTgt)) {
        toggleCard(evtTgt);
        addCardToList(evtTgt);
        /* When two cards in array, check for matching set */
        if (toggledCardsArray.length === 2) {
            checkCardMatch();
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
    if (toggledCardsArray[0].firstElementChild.className 
    /* if toggled cards match, change to match color, toggle class to match, and empty array */
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
    /* Wait a couple seconds for player to see cards, then toggles cards, then resets card array; */
       setTimeout(function timeoutID() {
            toggleCard(toggledCardsArray[0]);
            toggleCard(toggledCardsArray[1]);
            toggledCardsArray = [];
            } , 1250);
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ */
    }
}