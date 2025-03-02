// Initialize elements
const mainWindow = document.getElementById('mainWindow');
const mainImage = document.getElementById('mainImage');
const dragBar = document.getElementById('dragBar');
const menu = document.getElementById('menu');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const modeBtn = document.getElementById('mode');
const closeBtn = document.getElementById('close');
const forElement = document.getElementById('for');
const sorryElement = document.getElementById('sorry');
const introBackground = document.getElementById('introBackground');

const path = require('path');

// Check if we're in production or development
let imagesPath;

if (process.env.NODE_ENV === 'development') {
  imagesPath = path.join(__dirname, 'images');
} else {
  imagesPath = path.join(__dirname, '../../src/', 'images');
}

// Define the images array with correct paths
const images = [
    path.join(imagesPath, '1.png'),
    path.join(imagesPath, '2.png'),
    path.join(imagesPath, '3.png'),
    path.join(imagesPath, '4.png'),
    path.join(imagesPath, '5.png'),
    path.join(imagesPath, '6.png'),
    path.join(imagesPath, '7.png'),
    path.join(imagesPath, '8.png'),
    path.join(imagesPath, '9.png')
];

console.log(images); // To check the final paths
console.log(path.join(__dirname, 'images/icon.png'));

// Variables to manage slideshow state
let index = 0;
let slideshowMode = false;
let slideshowInterval;
let firstVisit = true;

// Event listener for close button
closeBtn.addEventListener('click', () => {
  window.close();
});

// Functions for fading effects
function fadeIn(element) {
  element.style.opacity = '1';
  element.style.transition = 'opacity 0.5s ease-in-out';
}

function fadeOut(element) {
  element.style.opacity = '0';
  element.style.transition = 'opacity 0.5s ease-in-out';
}

// Function to get and display a random image
function getRandomImage() {
  // Shuffle the images array
  images.sort(() => Math.random() - 0.5);
  
  // Set the first image as the src
  mainImage.src = images[0];
}


// Functions for handling app initialization
function onStart() {
  // Initially set all elements to be hidden
  forElement.style.opacity = '0';
  sorryElement.style.display = 'block';
  sorryElement.style.opacity = '0';
  introBackground.style.opacity = '1';

  // Fade in #for after 1 second
  setTimeout(() => fadeIn(forElement), 1000);

  // Fade in #sorry after 2 seconds
  setTimeout(() => fadeIn(sorryElement), 2000);

  // Fade out #introBackground after 4 seconds
  setTimeout(() => fadeOut(introBackground), 5000);
  setTimeout(() => { introBackground.style.display = 'none'; }, 5500);
}

function onStartReturning() {
  // Initially set all elements to be hidden
  forElement.style.opacity = '0';
  sorryElement.style.display = 'none';
  introBackground.style.opacity = '1';

  // Fade in #for after 1 second
  setTimeout(() => fadeIn(forElement), 100);

  // Fade out #introBackground after 2 seconds
  setTimeout(() => fadeOut(introBackground), 1100);
  setTimeout(() => { introBackground.style.display = 'none'; }, 1600);
}

// Functions for slideshow controls
function changeImage(direction) {
  index = (index + direction + images.length) % images.length;
  mainImage.src = images[index];
}

// Event listeners for window load
window.onload = function () {
  // Check if this is the first time the app is opening
  if (!sessionStorage.getItem('firstVisit')) {
    sessionStorage.setItem('firstVisit', 'false');
    getRandomImage();
    onStart();
  } else {
    getRandomImage();
    onStartReturning();
  }
};

// Event listeners for hover effect on main window
mainWindow.addEventListener('mouseenter', () => {
  fadeIn(dragBar);
  fadeIn(menu);
});

mainWindow.addEventListener('mouseleave', () => {
  fadeOut(dragBar);
  fadeOut(menu);
});

// Event listeners for slideshow control buttons
prevBtn.addEventListener('click', () => changeImage(-1));
nextBtn.addEventListener('click', () => changeImage(1));

// Event listener for slideshow mode toggle button
modeBtn.addEventListener('click', () => {
  slideshowMode = !slideshowMode;
  modeBtn.textContent = slideshowMode ? 'SLIDESHOW ON' : 'SLIDESHOW OFF';

  if (slideshowMode) {
    slideshowInterval = setInterval(() => {
      changeImage(1);
    }, 5000);
  } else {
    clearInterval(slideshowInterval);
  }
});

// Initialize elements as hidden
dragBar.style.opacity = '0';
menu.style.opacity = '0';
