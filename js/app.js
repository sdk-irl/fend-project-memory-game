/* * card open show
 * card
 * card match
 * --
 * fa fa-diamond
 * fa fa-paper-plane-o
 * fa fa-anchor
 * fa fa-bolt
 * fa fa-bomb
 * fa fa-leaf
 * fa fa-bicycle
 * fa fa-cube
 */

/*
 * Create a list that holds all of your cards
 */
/*let allCards = [
    ""
]*/
let toggledCardsArray = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const memoryCards = document.querySelectorAll('.card');

/* display card's symbol*/
for (memoryCard of memoryCards) {
    memoryCard.addEventListener('click', function(){
        const evtTgt = event.target; 
        if (evtTgt.classList.contains('card') && toggledCardsArray.length < 2) {
            toggleCard(evtTgt);
            addCardToList(evtTgt);
            if (toggledCardsArray.length === 2) {
                checkCardMatch();
            }
        }
    });
}
function toggleCard(evtTgt){
    evtTgt.classList.toggle('open');
    evtTgt.classList.toggle('show');
}

function addCardToList(evtTgt) {
    toggledCardsArray.push(evtTgt);
} 

function checkCardMatch() {
    if (toggledCardsArray[0].firstElementChild.className 
    /* if toggled cards match, change to match color, toggle class to match, and empty array */
        === toggledCardsArray[1].firstElementChild.className) {
        toggledCardsArray[0].classList.add('match');
        toggledCardsArray[1].classList.add('match');
        toggledCardsArray = [];
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ */
    }
    else {
    /* wait a couple seconds for player to see cards, then toggles cards, then resets card array; */
       setTimeout(function timeoutID() {
            toggleCard(toggledCardsArray[0]);
            toggleCard(toggledCardsArray[1]);
            toggledCardsArray = [];
            } , 1250);
        /* add css animation https://css-tricks.com/almanac/properties/a/animation/ */
    }
}