/* Create By ZhuoHongXin At  2020/1/28 ..... */
const Circle = function (opts) {
	this.x = opts.x;
	this.y = opts.y;
	this.speed = 5;
	this.ctx = ctx;
	this.size = 0;
	this.desory = false;
	this.maxSize = this.randomNum (100, 70);
	this.color = '#F00';
	this.globalAlpha = 1;
}
Circle.prototype = {
	drawCircle: function () {
		ctx.globalAlpha = this.globalAlpha;
		this.ctx.beginPath ();
		this.ctx.arc (this.x, this.y, this.size, 0, 2 * Math.PI, true);
		ctx.lineWidth = 1;
		ctx.strokeStyle = this.color;
		ctx.stroke ();
		ctx.globalAlpha = 1;
		this.circleMove ()
	},
	circleMove: function () {
		this.globalAlpha -= 0.12;
		if (this.size >= this.maxSize) {
			this.desory = true;
			return;
		}
		this.size += this.speed;
	},
	
	randomNum: function (max, min) {
		return Math.random () * (max - min) + min;
	}
}
