let electrons = [];
let nucleusX, nucleusY;
let orbitRadius = 150;
let quantumParticles = [];
const NUM_ELECTRONS = 5;
const NUM_QUANTUM_PARTICLES = 50;

class Electron {
    constructor(radius) {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(2);
        this.acc = createVector(0, 0);
        this.radius = radius + random(-20, 20);
        this.angle = random(TWO_PI);
        this.size = 15;
        this.color = color(0, 188, 212, 200); // Cyan with alpha
    }

    update() {
        // Calculate target position on orbit
        let targetX = nucleusX + this.radius * cos(this.angle);
        let targetY = nucleusY + this.radius * sin(this.angle);
        let target = createVector(targetX, targetY);
        
        // Create attraction to orbit position
        let force = p5.Vector.sub(target, this.pos);
        force.mult(0.05);
        this.acc = force;

        this.vel.add(this.acc);
        this.vel.limit(3);
        this.pos.add(this.vel);
        
        // Update angle for orbital motion
        this.angle += 0.02;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    
    // Set nucleus position
    nucleusX = width / 2;
    nucleusY = height / 2;

    // Initialize electrons
    for (let i = 0; i < NUM_ELECTRONS; i++) {
        electrons.push(new Electron(orbitRadius));
    }

    // Initialize quantum particles for background
    for (let i = 0; i < NUM_QUANTUM_PARTICLES; i++) {
        quantumParticles.push({
            pos: createVector(random(width), random(height)),
            vel: p5.Vector.random2D().mult(0.5),
            size: random(5, 15)
        });
    }
}

function draw() {
    background('#0c0c0c'); // Dark grey background

    // Draw random shapes in the background for a quantum feel
    drawQuantumBackground();

    // Draw nucleus at the center
    noStroke();
    fill('#ffca28'); // Yellow
    ellipse(nucleusX, nucleusY, 30, 30);

    // Draw electrons in orbit
    for (let i = 0; i < electrons.length; i++) {
        let electron = electrons[i];
        let electronX = nucleusX + electron.radius * cos(electron.angle);
        let electronY = nucleusY + electron.radius * sin(electron.angle);

        // Draw the electron
        fill('#00bcd4'); // Cyan
        ellipse(electronX, electronY, 15, 15);

        // Increment angle for circular motion
        electron.angle += 0.05;
    }

    // Draw the orbit
    noFill();
    stroke('#ffffff', 80); // White with transparency
    ellipse(nucleusX, nucleusY, orbitRadius * 2);

    // Draw electrons following the cursor
    drawElectronsFollowingCursor();

    // Draw superposition and entanglement effects
    drawSuperposition();
    drawEntanglement();
}

function drawQuantumBackground() {
    // Randomly generate abstract "quantum" shapes to add background effects
    for (let i = 0; i < 3; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(15, 50);
        let alpha = random(50, 100);

        noFill();
        stroke('#ffffff', alpha); // White with transparency
        
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

function drawElectronsFollowingCursor() {
    let numFollowingElectrons = 2;
    let attractionStrength = 0.05;
    let orbitRadius = 30;

    for (let i = 0; i < numFollowingElectrons; i++) {
        let electron = electrons[i];
        let targetX = mouseX + orbitRadius * cos(electron.angle);
        let targetY = mouseY + orbitRadius * sin(electron.angle);

        // Move electron towards the target position
        electron.x += (targetX - electron.x) * attractionStrength;
        electron.y += (targetY - electron.y) * attractionStrength;

        // Draw the electron
        fill('#00bcd4'); // Cyan
        ellipse(electron.x, electron.y, 15, 15);

        // Increment angle for circular motion
        electron.angle += 0.02;
    }
}

function drawSuperposition() {
    // Visualize superposition by drawing overlapping transparent circles
    let superpositionRadius = 50;
    let alpha = 100;

    for (let i = 0; i < 5; i++) {
        let x = nucleusX + random(-superpositionRadius, superpositionRadius);
        let y = nucleusY + random(-superpositionRadius, superpositionRadius);

        fill('#00bcd4', alpha); // Cyan with transparency
        ellipse(x, y, 15, 15);
    }
}

function drawEntanglement() {
    // Visualize entanglement by drawing lines connecting pairs of electrons
    stroke('#ff4081', 100); // Pink with transparency
    for (let i = 0; i < electrons.length; i++) {
        for (let j = i + 1; j < electrons.length; j++) {
            let electron1 = electrons[i];
            let electron2 = electrons[j];
            line(electron1.x, electron1.y, electron2.x, electron2.y);
        }
    }
}

// Adjust canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
