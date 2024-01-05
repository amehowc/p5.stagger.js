function Stagger(initialize = false, num = 12, offset = 2, revert = false) {
	this.num = num;
	this.offset = Math.min(Math.max(0, offset),2);
	this.totalduration = Math.ceil(1 + this.offset);
	this.reverted = revert;
	this.animations = [];
	this.isReady = false
	this.isDone =()=>{
		return this.animations.every((animation)=>{
			return animation.progress === 1
		})
	}
	this.build = (num, offset, revert) => {
		if ((num !== undefined && num !== null) && num !== this.num) this.num = num;
		if ((offset !== undefined && offset !== null) && offset !== this.offset) this.offset = Math.min(Math.max(0, offset),2);
		if ((revert !== undefined && revert !== null) && revert !== this.revert) this.revert = revert;

		this.animations =[]
		for (let i = 0; i < this.num; i++) {
			this.animations[i] = {
				id: i,
				index:
					this.num === 1
						? 0
						: Math.min(
								1,
								this.reverted ? 1 - i / (this.num - 1) : i / (this.num - 1)
						  ),
				freeze: Math.max(0, this.offset),
				progress: 0,
				update: function (_progress) {
					this.progress = Math.max(
						0,
						Math.min(_progress - this.index * this.freeze, 1)
					);
				},
			};
		}
		this.isReady = true
	};
	if (!!initialize) {
		this.build(this.num);
	}
	this.update = (t) => {
		for (let animation of this.animations) {
			animation.update(t * this.totalduration);
		}
	};

	this.ease = (p = 0, g = 2) => {
		if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
		else return 1 - 0.5 * Math.pow(2 * (1 - p), g);
	};

	this.withFrames = (actualFrame, duration = 1) => {
		return Math.max(0, Math.min(actualFrame / duration, 1));
	};

	this.revert = (revert) => {
		if (this.reverted !== revert) {
			this.reverted = revert;
			for (let animation of this.animations) {
				animation.index = Math.min(
					1,
					this.revert
						? 1 - animation.id / (this.num - 1)
						: animation.id / (this.num - 1)
				);
			}
		}
	};
}
