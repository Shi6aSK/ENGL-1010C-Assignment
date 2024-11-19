// IBM Qiskit color scheme - Defined using RGB values instead of hex
const COLORS = {
    primary: [105, 41, 196],     // #6929C4 in RGB
    secondary: [17, 146, 232],   // #1192E8 in RGB
    tertiary: [0, 93, 93],       // #005D5D in RGB
    highlight: [250, 77, 86],    // #FA4D56 in RGB
    background: [22, 22, 22],    // #161616 in RGB
    quantum: [51, 177, 255]      // #33B1FF in RGB
};

class Electron {
    constructor(radius) {
        this.angle = random(TWO_PI);
        this.radius = radius + random(-20, 20);
        this.speed = random(0.01, 0.02);
        this.pos = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.uncertainty = random(5, 15);
        this.phase = random(TWO_PI);
    }

    update() {
        // Orbital motion
        this.angle += this.speed;
        
        // Calculate base position
        let targetX = nucleusX + this.radius * cos(this.angle);
        let targetY = nucleusY + this.radius * sin(this.angle);
        
        // Add quantum uncertainty
        let noiseOffset = frameCount * 0.01;
        let uncertaintyX = map(noise(noiseOffset, this.phase), 0, 1, -this.uncertainty, this.uncertainty);
        let uncertaintyY = map(noise(noiseOffset + 100, this.phase), 0, 1, -this.uncertainty, this.uncertainty);
        
        targetX += uncertaintyX;
        targetY += uncertaintyY;
        
        // Smooth movement using acceleration
        let target = createVector(targetX, targetY);
        let desired = p5.Vector.sub(target, this.pos);
        desired.mult(0.1);
        
        this.acc = desired;
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }

    display() {
        // Electron glow effect
        for (let i = 3; i > 0; i--) {
            fill(...COLORS.quantum, map(i, 3, 0, 50, 150));
            noStroke();
            ellipse(this.pos.x, this.pos.y, i * 5);
        }
        
        // Core electron
        fill(...COLORS.quantum);
        ellipse(this.pos.x, this.pos.y, 8);
    }
}

class Cat {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(0, 0);
        this.size = 40;
        this.alpha = 200;
        this.phaseAngle = 0;
        this.quantum_state = random(['alive', 'dead', 'superposition']);
    }

    update() {
        this.phaseAngle += 0.02;
        this.alpha = map(sin(this.phaseAngle), -1, 1, 100, 200);
        
        if (random() < 0.005) {
            this.quantum_state = random(['alive', 'dead', 'superposition']);
            this.pos = createVector(
                random(width * 0.2, width * 0.8),
                random(height * 0.2, height * 0.8)
            );
        }
        
        this.vel.add(p5.Vector.random2D().mult(0.1));
        this.vel.mult(0.95);
        this.pos.add(this.vel);
        
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        
        // Quantum state visual effect
        let stateColor;
        if (this.quantum_state === 'alive') {
            stateColor = color(...COLORS.quantum);
        } else if (this.quantum_state === 'dead') {
            stateColor = color(...COLORS.highlight);
        } else {
            let aliveColor = color(...COLORS.quantum);
            let deadColor = color(...COLORS.highlight);
            stateColor = lerpColor(aliveColor, deadColor, sin(this.phaseAngle) * 0.5 + 0.5);
        }
        
        noStroke();
        fill(stateColor, this.alpha);
        
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
        stroke(stateColor, 50);
        noFill();
        for (let i = 0; i < 3; i++) {
            ellipse(0, 0, this.size * (1.5 + i * 0.2) * (1 + sin(this.phaseAngle + i) * 0.2));
        }
        pop();
    }
}

let electrons = [];
let cat;
let nucleusX, nucleusY;
let orbitRadius = 150;
const NUM_ELECTRONS = 5;

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    
    nucleusX = width / 2;
    nucleusY = height / 2;
    
    for (let i = 0; i < NUM_ELECTRONS; i++) {
        electrons.push(new Electron(orbitRadius));
    }
    
    cat = new Cat();
    smooth();
}

function draw() {
    background(...COLORS.background);
    
    drawOrbitPaths();
    
    electrons.forEach(electron => {
        electron.update();
        electron.display();
    });
    
    drawNucleus();
    
    cat.update();
    cat.display();
    
    drawEntanglementEffects();
}

function drawOrbitPaths() {
    for (let i = 0; i < 3; i++) {
        noFill();
        stroke(...COLORS.quantum, 20);
        strokeWeight(1);
        
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.1) {
            let r = orbitRadius + i * 40 + random(-5, 5);
            let x = nucleusX + r * cos(angle);
            let y = nucleusY + r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}

function drawNucleus() {
    for (let i = 4; i > 0; i--) {
        fill(...COLORS.highlight, map(i, 4, 0, 50, 150));
        noStroke();
        ellipse(nucleusX, nucleusY, i * 10);
    }
    
    fill(...COLORS.highlight);
    ellipse(nucleusX, nucleusY, 20);
}

function drawEntanglementEffects() {
    electrons.forEach((electron1, i) => {
        electrons.slice(i + 1).forEach(electron2 => {
            let d = dist(electron1.pos.x, electron1.pos.y,
                        electron2.pos.x, electron2.pos.y);
            
            if (d < orbitRadius * 1.5) {
                let alpha = map(d, 0, orbitRadius * 1.5, 100, 0);
                stroke(...COLORS.primary, alpha);
                strokeWeight(1);
                
                drawQuantumLine(
                    electron1.pos.x, electron1.pos.y,
                    electron2.pos.x, electron2.pos.y
                );
            }
        });
    });
}

function drawQuantumLine(x1, y1, x2, y2) {
    beginShape();
    for (let i = 0; i <= 1; i += 0.1) {
        let x = lerp(x1, x2, i);
        let y = lerp(y1, y2, i);
        
        let uncertainty = 2 * sin(frameCount * 0.05 + i * 10);
        x += uncertainty;
        y += uncertainty;
        
        vertex(x, y);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    nucleusX = width / 2;
    nucleusY = height / 2;
}

function mouseMoved() {
    return touchMoved();
}

function touchMoved() {
    let pointerPos = createVector(mouseX, mouseY);
    
    electrons.forEach(electron => {
        let dir = p5.Vector.sub(pointerPos, electron.pos);
        let d = dir.mag();
        
        if (d < 200) {
            dir.normalize();
            dir.mult(0.5);
            electron.vel.add(dir);
        }
    });
    
    let catToPointer = p5.Vector.sub(pointerPos, cat.pos);
    if (catToPointer.mag() < 150) {
        cat.vel.add(catToPointer.normalize().mult(-0.5));
        if (random() < 0.1) {
            cat.quantum_state = random(['alive', 'dead', 'superposition']);
        }
    }
    
    return false;
}