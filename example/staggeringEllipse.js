const words = ["customizable", "frame\nagnostic", "object based\n state"];
let stagger = null;
function setup() {
	createCanvas(400, 800);
	stagger = new Stagger();
	timer = createSlider(1, 24, 12, 1);
	timer.position(width / 2 + 78, height * 0.5 - 6);
	timer.style("width", "200px");
	timer.style("transform", "rotate(90deg)");
	timer.changed(() => {
		stagger.build(timer.value());
	});
	// time.rotate(PI/2)
	textAlign(CENTER, CENTER);
	textSize(60);
}

function draw() {
	background(40);
	const progress = (frameCount / (12 * 60)) % 1;
	const pin = map(progress, 0.0, 0.5, 0, 1, true);
	const pout = map(progress, 0.5, 1, 0, 1, true);
	const swap = pin < 1;
	const step = 0;

	stagger.update(progress);

	for (let i = 0; i < stagger.num; i++) {
		const actualstart = createVector(width / 2, 100 + i * step);
		const actualend = createVector(
			width / 2,
			height - 100 - (stagger.num - 1) * step + i * step
		);

		const actual = stagger.animations[i];
		const actualposition = p5.Vector.lerp(
			actualstart,
			actualend,
			easing(actual.progress, 4)
		);

		if (i < stagger.num - 1) {
			const nextstart = createVector(width / 2, 100 + (i + 1) * step);
			const nextend = createVector(
				width / 2,
				height - 100 - (stagger.num - 1) * step + (i + 1) * step
			);

			const next = stagger.animations[i + 1];
			const nextposition = p5.Vector.lerp(
				nextstart,
				nextend,
				easing(next.progress, 4)
			);
			const d = p5.Vector.dist(actualposition, nextposition);
			if (d > 0) {
				const midposition = p5.Vector.lerp(actualposition, nextposition, 0.5);
				push();
				fill("#97F61C");
				ellipse(midposition.x, midposition.y, d);
				push();
				fill(40);
				translate(midposition.x, midposition.y);
				textSize(d / 10);
				text(words[i % words.length], 0, 0);
				pop();
				pop();
			}
		}
	}
}
