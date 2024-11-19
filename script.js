let electrons = [];
let shapes = [];
let quantumParticles = [];
let cat;
let nucleusX, nucleusY;
let orbitRadius = 150;
const NUM_ELECTRONS = 5;
const NUM_QUANTUM_PARTICLES = 50;
const NUM_SHAPES = 100;

// IBM Qiskit color scheme
const COLORS = {
    primary: '#6929C4',    // Purple
    secondary: '#1192E8',  // Blue
    tertiary: '#005D5D',   // Dark Teal
    highlight: '#FA4D56',  // Red
    background: '#161616', // Dark gray
    quantum: '#33B1FF'     // Light blue
};

class Cat {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(0, 0);
        this.size = 40;
        this.state = 'unknown'; // quantum state
        this.alpha = 200;
        this.phaseAngle = 0;
    }

    update() {
        // Quantum superposition effect
        this.phaseAngle += 0.02;
        this.alpha = map(sin(this.phaseAngle), -1, 1, 100, 200);
        
        // Random quantum tunneling
        if (random() < 0.01) {
            this.pos = createVector(random(width), random(height));
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        
        // Cat silhouette
        noStroke();
        fill(COLORS.highlight, this.alpha);
        
        // Body
        ellipse(0, 0, this.size * 1.5, this.size);
        
        // Head
        ellipse(-this.size * 0.5, 0, this.size * 0.8);
        
        // Ears
        triangle(
            -this.size * 0.8, -this.size * 0.3,
            -this.size * 0.6, -this.size * 0.6,
            -this.size * 0.4, -this.size * 0.3
        );
        triangle(
            -this.size * 0.8, this.size * 0.3,
            -this.size * 0.6, this.size * 0.6,
            -this.size * 0.4, this.size * 0.3
        );
        
        // Quantum uncertainty effect
        stroke(COLORS.quantum, 50);
        noFill();
        for (let i = 0; i < 3; i++) {
            ellipse(0, 0, this.size * (1.5 + i * 0.2));
        }
        pop();
    }
}

class Shape {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(random(0.2, 0.8));
        this.acc = createVector(0, 0);
        this.size = random(5, 15);
        this.shapeType = random(['circle', 'triangle', 'square']);
        this.color = color(
            random([COLORS.primary, COLORS.secondary, COLORS.tertiary])
        );
    }

    update() {
        // Add quantum tunneling effect
        if (random() < 0.001) {
            this.pos = createVector(random(width), random(height));
        }
        
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
        
        // Wrap around edges
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    display() {
        noStroke();
        fill(this.color);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(frameCount * 0.02);
        
        switch(this.shapeType) {
            case 'circle':
                ellipse(0, 0, this.size);
                break;
            case 'triangle':
                triangle(0, -this.size/2, -this.size/2, this.size/2, this.size/2, this.size/2);
                break;
            case 'square':
                rectMode(CENTER);
                rect(0, 0, this.size, this.size);
                break;
        }
        pop();
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    
    nucleusX = width / 2;
    nucleusY = height / 2;
    
    // Initialize all elements
    for (let i = 0; i < NUM_ELECTRONS; i++) {
        electrons.push(new Electron(orbitRadius));
    }
    
    for (let i = 0; i < NUM_SHAPES; i++) {
        shapes.push(new Shape());
    }
    
    // Initialize Schrödinger's cat
    cat = new Cat();
}

function draw() {
    background(COLORS.background);
    
    // Update and display shapes
    shapes.forEach(shape => {
        shape.update();
        shape.display();
    });
    
    // Draw orbit paths
    drawOrbitPaths();
    
    // Update and display electrons
    electrons.forEach(electron => {
        electron.update();
        electron.display();
    });
    
    // Draw nucleus
    fill(COLORS.highlight);
    noStroke();
    ellipse(nucleusX, nucleusY, 30);
    
    // Update and display cat
    cat.update();
    cat.display();
    
    // Draw entanglement effects
    drawEntanglementEffects();
}

function drawOrbitPaths() {
    // Draw quantum orbital paths
    for (let i = 0; i < 3; i++) {
        noFill();
        stroke(COLORS.quantum, 30);
        strokeWeight(1);
        ellipse(nucleusX, nucleusY, (orbitRadius + i * 40) * 2);
        
        // Add quantum uncertainty effect
        stroke(COLORS.quantum, 15);
        for (let angle = 0; angle < TWO_PI; angle += 0.2) {
            let x = nucleusX + (orbitRadius + i * 40) * cos(angle);
            let y = nucleusY + (orbitRadius + i * 40) * sin(angle);
            let uncertainty = 10;
            point(x + random(-uncertainty, uncertainty), 
                  y + random(-uncertainty, uncertainty));
        }
    }
}

function drawEntanglementEffects() {
    // Draw quantum entanglement lines
    stroke(COLORS.primary, 50);
    strokeWeight(1);
    
    // Connect electrons
    for (let i = 0; i < electrons.length; i++) {
        for (let j = i + 1; j < electrons.length; j++) {
            let d = dist(electrons[i].pos.x, electrons[i].pos.y,
                        electrons[j].pos.x, electrons[j].pos.y);
            
            if (d < orbitRadius * 1.5) {
                let alpha = map(d, 0, orbitRadius * 1.5, 50, 0);
                stroke(COLORS.primary, alpha);
                line(electrons[i].pos.x, electrons[i].pos.y,
                     electrons[j].pos.x, electrons[j].pos.y);
            }
        }
    }
    
    // Connect cat to nearest electron
    let nearestElectron = electrons.reduce((nearest, current) => {
        let d = dist(cat.pos.x, cat.pos.y, current.pos.x, current.pos.y);
        let nearestDist = dist(cat.pos.x, cat.pos.y, nearest.pos.x, nearest.pos.y);
        return d < nearestDist ? current : nearest;
    }, electrons[0]);
    
    stroke(COLORS.highlight, 30);
    line(cat.pos.x, cat.pos.y, nearestElectron.pos.x, nearestElectron.pos.y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    nucleusX = width / 2;
    nucleusY = height / 2;
}

function mouseMoved() {
    // Create quantum attraction to mouse
    let mousePos = createVector(mouseX, mouseY);
    
    electrons.forEach(electron => {
        let dir = p5.Vector.sub(mousePos, electron.pos);
        let d = dir.mag();
        
        if (d < 200) {
            dir.normalize();
            dir.mult(0.5);
            electron.vel.add(dir);
        }
    });
    
    // Move cat away from mouse
    let catToMouse = p5.Vector.sub(mousePos, cat.pos);
    if (catToMouse.mag() < 100) {
        cat.pos.add(catToMouse.mult(-0.02));
    }
}
