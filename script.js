let electrons = [];
let nucleusX, nucleusY;
let orbitRadius = 150;
let quantumParticles = [];
const NUM_ELECTRONS = 5;
const NUM_QUANTUM_PARTICLES = 50;

// Initialize smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

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

    // Initialize quantum particles
    for (let i = 0; i < NUM_QUANTUM_PARTICLES; i++) {
        quantumParticles.push({
            pos: createVector(random(width), random(height)),
            vel: p5.Vector.random2D().mult(0.5),
            size: random(5, 15)
        });
    }
}

function draw() {
    clear(); // Use clear instead of background for transparency
    
    // Update and display quantum particles
    updateQuantumParticles();
    
    // Draw nucleus
    fill(255, 202, 40, 200); // Yellow with alpha
    noStroke();
    ellipse(nucleusX, nucleusY, 30);
    
    // Update and display electrons
    electrons.forEach(electron => {
        electron.update();
        electron.display();
    });
    
    // Draw orbit paths
    drawOrbitPaths();
    
    // Draw entanglement effects
    drawEntanglementEffects();
}

function updateQuantumParticles() {
    quantumParticles.forEach(particle => {
        // Update position
        particle.pos.add(particle.vel);
        
        // Wrap around screen edges
        if (particle.pos.x < 0) particle.pos.x = width;
        if (particle.pos.x > width) particle.pos.x = 0;
        if (particle.pos.y < 0) particle.pos.y = height;
        if (particle.pos.y > height) particle.pos.y = 0;
        
        // Draw the particle
        noStroke();
        fill(0, 188, 212, 100); // Cyan with low alpha
        ellipse(particle.pos.x, particle.pos.y, particle.size);
        
        // Add a subtle glow effect
        for (let i = 0; i < 3; i++) {
            fill(0, 188, 212, 20 - i * 5);
            ellipse(particle.pos.x, particle.pos.y, particle.size + i * 5);
        }
    });
}

function drawOrbitPaths() {
    // Draw multiple orbital paths with varying radii
    for (let i = 0; i < 3; i++) {
        noFill();
        stroke(255, 255, 255, 50); // White with low alpha
        strokeWeight(1);
        ellipse(nucleusX, nucleusY, (orbitRadius + i * 40) * 2);
    }
    
    // Add quantum uncertainty effect to orbits
    for (let i = 0; i < TWO_PI; i += 0.2) {
        let x = nucleusX + orbitRadius * cos(i);
        let y = nucleusY + orbitRadius * sin(i);
        let uncertainty = 10;
        
        stroke(255, 255, 255, 20);
        for (let j = 0; j < 3; j++) {
            let dx = random(-uncertainty, uncertainty);
            let dy = random(-uncertainty, uncertainty);
            point(x + dx, y + dy);
        }
    }
}

function drawEntanglementEffects() {
    // Draw connection lines between electrons
    stroke(255, 64, 129, 50); // Pink with low alpha
    strokeWeight(1);
    
    for (let i = 0; i < electrons.length; i++) {
        for (let j = i + 1; j < electrons.length; j++) {
            // Calculate distance between electrons
            let d = dist(
                electrons[i].pos.x, electrons[i].pos.y,
                electrons[j].pos.x, electrons[j].pos.y
            );
            
            // Only draw lines if electrons are within a certain distance
            if (d < orbitRadius * 1.5) {
                // Make lines more transparent with distance
                let alpha = map(d, 0, orbitRadius * 1.5, 50, 0);
                stroke(255, 64, 129, alpha);
                
                // Draw the connection line
                line(
                    electrons[i].pos.x, electrons[i].pos.y,
                    electrons[j].pos.x, electrons[j].pos.y
                );
                
                // Add some particle effects along the connection
                let numParticles = 3;
                for (let k = 0; k < numParticles; k++) {
                    let t = k / numParticles;
                    let x = lerp(electrons[i].pos.x, electrons[j].pos.x, t);
                    let y = lerp(electrons[i].pos.y, electrons[j].pos.y, t);
                    
                    noStroke();
                    fill(255, 64, 129, alpha);
                    ellipse(x, y, 4);
                }
            }
        }
    }
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    nucleusX = width / 2;
    nucleusY = height / 2;
}

// Add mouse interaction
function mouseMoved() {
    // Create a subtle attraction force to the mouse
    electrons.forEach(electron => {
        let mousePos = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mousePos, electron.pos);
        let d = dir.mag();
        
        if (d < 200) {
            dir.normalize();
            dir.mult(0.5);
            electron.vel.add(dir);
        }
    });
}

// Add touch interaction for mobile devices
function touchMoved() {
    mouseMoved();
    return false; // Prevent default
}