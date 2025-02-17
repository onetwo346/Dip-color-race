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

let currentColor = "black";
let isDrawing = false;
let brushSize = 5;

// Show game page and hide intro page
startButton.addEventListener("click", () => {
  introPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
});

// Set up canvas
ctx.lineWidth = brushSize;
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

// Event listener for brush size
brushSizeInput.addEventListener("input", () => {
  brushSize = brushSizeInput.value;
  ctx.lineWidth = brushSize;
});

// Event listener for generating new outline
generateOutlineButton.addEventListener("click", generateOutline);

// Event listener for clear button
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Event listener for save button
saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "artwork.png";
  link.href = canvas.toDataURL();
  link.click();
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

// Generate random outline
function generateOutline() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.beginPath();

  // Random shapes
  const shapes = ["circle", "square", "triangle", "star"];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  switch (randomShape) {
    case "circle":
      ctx.arc(250, 250, 100, 0, Math.PI * 2);
      break;
    case "square":
      ctx.rect(150, 150, 200, 200);
      break;
    case "triangle":
      ctx.moveTo(250, 150);
      ctx.lineTo(150, 350);
      ctx.lineTo(350, 350);
      ctx.closePath();
      break;
    case "star":
      drawStar(250, 250, 100, 5, 0.5);
      break;
  }

  ctx.stroke();
}

// Draw a star
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
