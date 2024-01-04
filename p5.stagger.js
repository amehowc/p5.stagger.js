function Stagger(num = 12, offset = 2, initialize = true) {
	this.num = num;
	this.offset = Math.max(0,offset);
	this.totalduration = Math.ceil(1 + this.offset);
	this.reverted = true;
	this.animations = [];
	this.build = (num) => {
		if (num !== this.num) this.num = num;
		for (let i = 0; i < this.num; i++) {
			this.animations[i] = {
				id: i,
				index: Math.min(
					1,
					this.reverted ? 1 - i / (this.num - 1) : i / (this.num - 1)
				),
				freeze: Math.max(0,this.offset),
				progress: 0,
				update: function (_progress) {
					this.progress = Math.max(
						0,
						Math.min(_progress - this.index * this.freeze, 1)
					);
				},
			};
		}
	};
    if(!!initialize){
	    this.build(this.num);
    }
	this.update = (t) => {
		for (let animation of this.animations) {
			animation.update(t * this.totalduration);
		}
	};

    this.ease = (p = 0, g = 2) => {
					if (p < 0.5) return 0.5 * pow(2 * p, g);
					else return 1 - 0.5 * pow(2 * (1 - p), g);
				};
	
	this.withFrames =(actualFrame, duration = 1)=>{
			return Math.max(0,Math.min((actualFrame/duration),1))
	}

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
