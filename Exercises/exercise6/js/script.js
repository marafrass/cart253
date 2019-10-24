"use strict";

// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
//////////////// FIXED = antelope was missing the final "e"
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
//////////////// FIXED = no space between "function" and "setup"
function setup() {
  createCanvas(windowWidth, windowHeight);
  //////////////// FIXED = "tiger" variable was missing the second parameter
  tiger = new Predator(100, 100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  //////////////// FIXED = zebra didn't have a parameter for "y" (second parameter nonexistent)
  zebra = new Prey(100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  //////////////// FIXED = background was missing a letter (d)
  background(0);

  // Handle input for the tiger

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelop.display();
  zebra.disploy();
  b.display();
}