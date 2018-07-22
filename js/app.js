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
let toggleCards = [];


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
        if (evtTgt.classList.contains('card') && toggleCards.length < 2) {
            toggleCard(evtTgt);
            addCardToList(evtTgt);
        }
 /*       if (evtTgt.classList.contains('open')){
            function addCardToList(evtTgt);
        }

*/
    });
}
function toggleCard(evtTgt){
    evtTgt.classList.toggle('open');
    evtTgt.classList.toggle('show');
}

/*function addCardToList(evtTgt) {
    toggleCard.push(evtTgt);
} 

/* if array already contains card match then toggle card and match to 'match' */