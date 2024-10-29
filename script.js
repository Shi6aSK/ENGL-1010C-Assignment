let electronAngle = 0;
let nucleusX, nucleusY;
let orbitRadius = 150;

function setup() {
    // Create the canvas and set up the nucleus position at the center
    createCanvas(windowWidth, windowHeight);
    nucleusX = width / 2;
    nucleusY = height / 2;
}

function draw() {
    background(20, 20, 60, 50); // A dark blue background with some transparency for fading trails
    
    // Draw random shapes in the background for a quantum feel
    drawQuantumBackground();

    // Draw nucleus at the center
    noStroke();
    fill(255, 204, 0);
    ellipse(nucleusX, nucleusY, 30, 30);

    // Calculate electron position on circular orbit
    let electronX = nucleusX + orbitRadius * cos(electronAngle);
    let electronY = nucleusY + orbitRadius * sin(electronAngle);

    // Draw the electron
    fill(0, 200, 255);
    ellipse(electronX, electronY, 15, 15);

    // Increment angle for circular motion
    electronAngle += 0.05;

    // Draw the orbit
    noFill();
    stroke(255, 255, 255, 80);
    ellipse(nucleusX, nucleusY, orbitRadius * 2);
}

function drawQuantumBackground() {
    // Randomly generate abstract "quantum" shapes to add background effects
    for (let i = 0; i < 3; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(15, 50);
        let alpha = random(50, 100);

        noFill();
        stroke(255, alpha);
        
        // Draw different shapes randomly
        if (i % 3 == 0) {
            ellipse(x, y, size, size);
        } else if (i % 3 == 1) {
            rect(x, y, size, size);
        } else {
            triangle(x, y, x + size, y + size, x + size / 2, y - size / 2);
        }
    }
}

// Adjust canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
