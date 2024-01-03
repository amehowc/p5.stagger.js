let stagger = null;
function setup() {
	createCanvas(400, 800);
	stagger = new Stagger();
	pg = createGraphics(400, 400);
	pg.textSize(160);
	pg.textLeading(130);
	pg.textAlign(CENTER, CENTER);
	pg.noStroke();
	pg.fill("#97F61C");
	pg.text("REL\nIA\nBLE", pg.width / 2, pg.height / 2 + 10);
	imageMode(CENTER);

	timer = createSlider(0, 1, 0, 0.001);
	timer.position(width / 2 - 100, height * 0.5 - 6);
	timer.style("width", "200px");
}

function draw() {
	background(40);
	const progress = timer.value(); 
	stagger.update(progress);

	for (let i = 0; i < stagger.num; i++) {
		const actual = stagger.animations[i];
		const step = Math.max(1, pg.height / (stagger.num - 1));
		const x =
			width / 2 +
			sin(actual.progress * TWO_PI * 2) * (swap * 0.5 + (!swap * PI) / 4) * 200;
		const y = actual.progress * (height - pg.height) + step * i;

		push();
		translate(x, y);
		rotate(sin(actual.progress * TWO_PI * 4) * (PI / 2 + (!swap * PI) / 4));
		image(pg, 0, 0, pg.width, step, 0, step * i, pg.width, step);
		pop();
	}
}
