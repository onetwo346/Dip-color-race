document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    initCanvas();
});

function initCanvas() {
    const canvas = document.getElementById('colorCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorChoice');

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
    const canvas = document.getElementById('colorCanvas');
    const ctx = canvas.getContext('2d');

    // Example: Draw a simple outline (replace with your image generation logic)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 400, 400); // Example outline
}
