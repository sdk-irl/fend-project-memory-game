# Memory Game Project

## Table of Contents

* [What is this project](#what_is_this_project)
* [Dependencies](#dependencies)
* [Contributing](#contributing)

## What is this project

Memory Game is a project I created for the Grow with Google Udacity FEND Nanodegree program. I used starter project files from Udacity that contained static HTML and CSS styling. I converted this game from a static project to an interactive one and added styling and responsive design elements.

I included several game behavior functions that the project rubric required, including:
* Memory game logic with randomly shuffled cards
* Congratulations popup modal
* Restart button
* Star rating
* Timer
* Move counter

The game works like the traditional concetration game, where the user flips two cards over at a time. If the cards match, they stay turned over. If not, they are flipped face down and the user flips another two, until the user can match all cards. 

## Dependencies

The shuffle function in the game, which makes the shuffling of the deck random, is called the Fisher-Yates (Knuth) shuffle function from here:
* http://stackoverflow.com/a/2450976

Here is a D3 visual of how this shuffle function works, by Mike Bostock:
* https://bost.ocks.org/mike/shuffle/

Icons are from font-awesome, here:
* https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css

The font family for the page is here:
* https://fonts.googleapis.com/css?family=Coda

## Contributing

This project was submitted for a Udacity course to follow a rubric, so I won't be accepting pull requests
