let particles = [];
const gravity = .25;
const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];
let endColor;
let houses;

function setup() {
  pixelDensity(1);
	createCanvas(windowWidth, windowHeight-40);
	// windowHeight - 40 is just for my display since it extends past my screen
	endColor = color(25);
	makeHouses();
    makeMoon();
}

function makeMoon() {
  moon = createGraphics(300, 150);
  moon.noStroke();
  moon.fill('yellow');
  moon.circle(150, 75, 150);
  moon.fill(25);
  moon.circle(random(300), 75, 150);
}

function makeHouses() {
	houses = createGraphics(width, height);
	houses.strokeWeight(2);
	const houseCount = 10;
	const houseWidth = width / houseCount;
	const houseWindowWidth = width/random(25, 40);
	const houseWindowHeight = height/random(25, 60);
	for (let i = 0; i < houseCount; i++) {
		const houseHeight = random(50, 300);
		houses.fill(135);
		houses.rect(houseWidth * i, height - houseHeight, houseWidth, houseHeight * 2);

		for (let windowY = height - houseHeight + 10; windowY < height - houseWindowHeight - 5; windowY += houseWindowHeight + 5) {
			houses.fill(random() < 0.50 ? color(random(255), random(255), random(255), random(175)) : 50);
			houses.rect(houseWidth * i + 12, windowY, houseWindowWidth, houseWindowHeight);

			houses.fill(random() < 0.50 ? color(random(255), random(255), random(10), random(255)) : 50);
			houses.rect(houseWidth * (i + 1) - 12 - houseWindowWidth, windowY, houseWindowWidth, houseWindowHeight);

		}
	}
}

function mousePressed() {
	particles.push(new Firework(mouseX, height));
}

function draw() {
	background(25);
    image(moon, 150, 50);
	particles.forEach((p) => {
		p.step();
		p.draw();
	});
	particles = particles.filter((p) => p.isAlive);

	image(houses, 0, 0);
}

class Particle {
	constructor(x, y, xSpeed, ySpeed, pColor, size) {
		this.x = x;
		this.y = y;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.color = pColor;
		this.size = size;
		this.isAlive = true;
		this.trail = [];
		this.trailIndex = 0;
	}

	step() {
		this.trail[this.trailIndex] = createVector(this.x, this.y);
		this.trailIndex++;
		if (this.trailIndex > 10) {
			this.trailIndex = 0;
		}
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		this.ySpeed += gravity;

		if (this.y > height) {
			this.isAlive = false;
		}
	}

	draw() {
		this.drawTrail();
		fill(this.color);
		noStroke();
		circle(this.x, this.y, this.size * 2);
	}

	drawTrail() {
		let index = 0;

		for (let i = this.trailIndex - 1; i >= 0; i--) {
			const tColor = lerpColor(color(this.color), endColor,
				index / this.trail.length);
			fill(tColor);
			noStroke();
			circle(this.trail[i].x, this.trail[i].y, this.size);
			index++;
		}

		for (let i = this.trail.length - 1; i >= this.trailIndex; i--) {
			const tColor = lerpColor(color(this.color), endColor,
				index / this.trail.length);
			fill(tColor);
			noStroke();
			circle(this.trail[i].x, this.trail[i].y, this.size);
			index++;
		}
	}
}

class Firework extends Particle {
	constructor(x, y) {
		super(x, y, random(-2, 2), random(-10, -15),
			random(colors), 10);
		this.countdown = random(30, 60);
	}

	step() {
		super.step();

		this.countdown--;
		if (this.countdown <= 0) {
			const explosionSize = random(20, 50);
			for (let i = 0; i < explosionSize; i++) {

				const speed = random(5, 10);
				const angle = random(TWO_PI);
				const xSpeed = cos(angle) * speed;
				const ySpeed = sin(angle) * speed;

				particles.push(new Particle(this.x, this.y,
					xSpeed, ySpeed,
					this.color, 5
				));
			}
			this.isAlive = false;
		}
	}
}

