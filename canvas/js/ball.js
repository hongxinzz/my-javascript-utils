/**
 * 小球的实体类
 * @param option 小球配置
 * @constructor
 */
function Ball(option) {
	this.maxWidth = option.maxWidth;
	this.maxHeight = option.maxHeight;
	this.size = this.randomNum(option.size.max, option.size.min);
	this.ctx = ctx;
	this.color = this.getBallColor();
	this.x = option.x || this.randomNum(this.size, this.maxWidth - this.size);
	this.y = option.y || this.randomNum(this.size, this.maxHeight - this.size);
	this.speedX = this.randomNum(-1, 1);
	this.speedY = this.randomNum(-1, 1);
	this.drawBall()
}

Ball.prototype = {
	//绘制小球
	drawBall: function () {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fill();
		this.ballMove()
	},
	//小球移动并碰撞检测
	ballMove: function () {
		if(this.status === 'stop'){
			return
		}
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x >= this.maxWidth - this.size) {
			this.speedX = -this.speedX
		}else if(this.x <=0){
			this.speedX = Math.abs(this.speedX)
		}
		if(this.y >= this.maxWidth - this.size){
			this.speedY = -this.speedY
		}else if(this.y <=0){
			this.speedY =  Math.abs(this.speedY);
		}
	},
	//小球随机颜色
	getBallColor:function(){
		var r = Math.floor(this.randomBallColor());
		var g = Math.floor(this.randomBallColor());
		var b = Math.floor(this.randomBallColor());
		return "rgb("+r+","+g+","+b+")"
	},
	//小球大小
	randomNum: function (max, min) {
		return Math.random() * (max - min) + min;
	},
	//随机数值
	randomBallColor:function(){
		return Math.random() * 256;
	}
}