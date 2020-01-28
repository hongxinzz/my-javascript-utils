/* Create By ZhuoHongXin At  2020/1/28 ..... */
var Ball = function (opt) {
	const opts = Object.assign ({}, opt);
	this.width = opts.width;
	this.colors = opts.colors;
	this.maxRange = opts.maxRange;
	this.ctx = ctx;
	this.startX = opts.x;
	this.startY = opts.y;
	this.x = opts.x;
	this.y = opts.y;
	this.speedX = this.randomNum (-8, 8);
	this.speedY = this.randomNum (-8, 8);
	this.color = this.colors[this.getBallColor ()];
	this.drawBall ()
}

Ball.prototype = {
	drawBall: function () {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath ();
		this.ctx.arc (this.x, this.y, this.width, 0, 2 * Math.PI, true);
		// this.ctx.closePath();
		this.ctx.fill ();
		this.ballMove ()
	},
	ballMove: function () {
		this.x += this.speedX;
		this.y += this.speedY;
		this.width -= this.randomNum (-1, 3);
		if (this.width <= 0) {
			this.width = 0;
		}
		if (Math.abs (this.x - this.startX) >= this.maxRange) {
			this.speedX = 0;
			this.width = 0;
		}
		if (Math.abs (this.y - this.startY) >= this.maxRange) {
			this.speedY = 0;
			this.width = 0;
		}
	},
	randomNum: function (max, min) {
		return Math.random () * (max - min) + min;
	},
	getBallColor: function () {
		return parseInt ((Math.random () * this.colors.length), 10)
	}
}
