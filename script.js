// script.js
const introPage = document.getElementById("introPage");
const gamePage = document.getElementById("gamePage");
const startButton = document.getElementById("startButton");
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPalette = document.querySelector(".color-palette");
const clearButton = document.getElementById("clearButton");

let currentColor = "black";
let isDrawing = false;

// Show game page and hide intro page
startButton.addEventListener("click", () => {
  introPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
});

// Set up canvas
ctx.lineWidth = 5;
ctx.lineCap = "round";

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listener for color selection
colorPalette.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    currentColor = e.target.getAttribute("data-color");
  }
});

// Event listener for clear button
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Drawing functions
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = currentColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}
