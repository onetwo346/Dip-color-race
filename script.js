document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    initCanvas();
});

function initCanvas() {
    const canvas = document.getElementById('colorCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorChoice');

    // Set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    let isDrawing = false;

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            ctx.strokeStyle = colorPicker.value;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });
}

function clearCanvas() {
    const canvas = document.getElementById('colorCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateOutline() {
    // Placeholder for image generation API
    alert("✨ Generate Outline feature coming soon! We'll integrate an API for dynamic outline generation.");
}
