// DOM Elements
const introPage = document.getElementById("introPage");
const gamePage = document.getElementById("gamePage");
const startButton = document.getElementById("startButton");
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPalette = document.querySelector(".color-palette");
const generateOutlineButton = document.getElementById("generateOutlineButton");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const brushSizeInput = document.getElementById("brushSize");

// Global Variables
let currentColor = "black";
let isDrawing = false;
let brushSize = 5;

// Show Game Page and Hide Intro Page
startButton.addEventListener("click", () => {
  introPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
  resizeCanvas(); // Resize canvas for mobile devices
});

// Set Up Canvas
ctx.lineWidth = brushSize;
ctx.lineCap = "round";

// Handle Canvas Resizing for Mobile Devices
function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.8, 500); // Limit canvas size
  canvas.width = size;
  canvas.height = size;
}

window.addEventListener("resize", resizeCanvas);

// Event Listeners for Drawing (Mouse and Touch)
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

// Event Listener for Color Selection
colorPalette.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    currentColor = e.target.getAttribute("data-color");
  }
});

// Event Listener for Brush Size
brushSizeInput.addEventListener("input", () => {
  brushSize = brushSizeInput.value;
  ctx.lineWidth = brushSize;
});

// Event Listener for Generating New Outline
generateOutlineButton.addEventListener("click", generateOutline);

// Event Listener for Clear Button
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Event Listener for Save Button
saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "artwork.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Drawing Functions
function startDrawing(e) {
  e.preventDefault(); // Prevent scrolling on touch devices
  isDrawing = true;
  ctx.beginPath();
  const { offsetX, offsetY } = getCoordinates(e);
  ctx.moveTo(offsetX, offsetY);
}

function draw(e) {
  e.preventDefault(); // Prevent scrolling on touch devices
  if (!isDrawing) return;
  const { offsetX, offsetY } = getCoordinates(e);
  ctx.strokeStyle = currentColor;
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

// Get Coordinates for Both Mouse and Touch Events
function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      offsetX: e.touches[0].clientX - rect.left,
      offsetY: e.touches[0].clientY - rect.top,
    };
  } else {
    return {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    };
  }
}

// Generate Random Outline
function generateOutline() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.beginPath();

  // Random Shapes
  const shapes = ["circle", "square", "triangle", "star"];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  switch (randomShape) {
    case "circle":
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 4, 0, Math.PI * 2);
      break;
    case "square":
      ctx.rect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
      break;
    case "triangle":
      ctx.moveTo(canvas.width / 2, canvas.height / 4);
      ctx.lineTo(canvas.width / 4, (canvas.height * 3) / 4);
      ctx.lineTo((canvas.width * 3) / 4, (canvas.height * 3) / 4);
      ctx.closePath();
      break;
    case "star":
      drawStar(canvas.width / 2, canvas.height / 2, canvas.width / 4, 5, 0.5);
      break;
  }

  ctx.stroke();
}

// Draw a Star
function drawStar(cx, cy, radius, spikes, inset) {
  let rot = (Math.PI / 2) * 3;
  let step = Math.PI / spikes;

  ctx.moveTo(cx, cy - radius);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      cx + Math.cos(rot) * radius,
      cy + Math.sin(rot) * radius
    );
    rot += step;
    ctx.lineTo(
      cx + Math.cos(rot) * (radius * inset),
      cy + Math.sin(rot) * (radius * inset)
    );
    rot += step;
  }
  ctx.closePath();
}
