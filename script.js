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
  resizeCanvas(); // Resize canvas for mobile devices
});

// Set up canvas
ctx.lineWidth = brushSize;
ctx.lineCap = "round";

// Handle canvas resizing for mobile devices
function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.8, 500); // Limit canvas size
  canvas.width = size;
  canvas.height = size;
}

window.addEventListener("resize", resizeCanvas);

// Event listeners for drawing (mouse and touch)
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

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

// Get coordinates for both mouse and touch events
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
