const authors = [
  "Richard Lassels",
  "J.R.R. Tolkien",
  "Antoine de Saint-Exupéry"
];

const quotes = [
  "The world is a book, and those who do not travel read only a page.",
  "There is some good in this world, and it’s worth fighting for.",
  "It is only with the heart that one can see rightly; what is essential is invisible to the eye."
];

const images = [
  "Picture/author1.jpg",
  "Picture/author2.jpg",
  "Picture/author3.jpg"
];

let i = 0;

const author = document.getElementById("author");
const quote = document.getElementById("quote");
const img = document.getElementById("hero-img");

function fadeIn() {
  author.style.opacity = 1;
  quote.style.opacity = 1;
  img.style.opacity = 1;
}

function fadeOut() {
  author.style.opacity = 0;
  quote.style.opacity = 0;
  img.style.opacity = 0;
}

// set smooth transition (no CSS needed)
author.style.transition = "opacity 0.8s ease";
quote.style.transition = "opacity 0.8s ease";
img.style.transition = "opacity 0.8s ease";

// start visible
fadeIn();

setInterval(() => {
  // fade out
  fadeOut();

  // change after fade out
  setTimeout(() => {
    i = (i + 1) % authors.length;
    author.textContent = authors[i];
    quote.textContent = quotes[i];
    img.src = images[i];

    // fade in
    fadeIn();
  }, 600);

}, 5000);
