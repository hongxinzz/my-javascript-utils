/* Create By ZhuoHongXin At  2020/1/28 ..... */

const requestAnimFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout (callback, 1000 / 60);
	};
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


const defaule_config = {
	colors: ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'], //默认的颜色
	numberOfParticles: 40, //生成的粒子数量
	canvasClassName: 'TabParticles',//默认canvas插入的class
	maxRange: 100,//粒子爆炸的范围
	width: 20,//小球的默认起始大小
}

const TabParticles = function (opt) {
	const opts = Object.assign ({}, defaule_config, opt);
	this.colors = opts.colors;
	this.numberOfParticles = opts.numberOfParticles;
	this.canvasClassName = opts.canvasClassName;
	this.maxRange = opts.maxRange;
	this.ballList = [];
	this.width = opts.width;
	this.clickX = null;
	this.clickY = null;
	this.animte = null;
	this.circleList = [];
	window.ctx = this.ctx = this.renderCanvas ();
	this.bindEvent ()
}

TabParticles.prototype = {
	renderCanvas: function () {
		const canvasEl = document.createElement ('canvas');
		canvasEl.classList.add (this.canvasClassName);
		canvasEl.width = window.innerWidth;
		canvasEl.height = window.innerHeight;
		canvasEl.style.width = window.innerWidth + 'px';
		canvasEl.style.height = window.innerHeight + 'px';
		canvasEl.style.position = 'fixed';
		canvasEl.style.top = '0';
		canvasEl.style.left = '0';
		canvasEl.style.zIndex = '-1';
		canvasEl.getContext ('2d').scale (1, 1);
		document.body.appendChild (canvasEl);
		if (!document.getElementsByClassName (this.canvasClassName)[0]) {
			throw new Error ('init error')
		}
		return canvasEl.getContext ('2d');
	},
	
	bindEvent () {
		var that = this;
		document.addEventListener ('mousedown', function (e) {
			if (e.target.className === that.canvasClassName || e.target.nodeName !== 'A' || e.target.nodeName !== 'IMG') {
				cancelAnimationFrame (that.animte)
				that.clickX = e.pageX;
				that.clickY = e.pageY;
				that.ballList = [...that.renderBall (), ...that.ballList]
			}
		})
	},
	
	renderBall () {
		let ballList = []
		this.circleList.push (new Circle ({
			x: this.clickX,
			y: this.clickY,
		}))
		for (let i = 0; i < this.numberOfParticles; i++) {
			ballList.push (new Ball ({
				width: this.width,
				x: this.clickX,
				y: this.clickY,
				colors: this.colors,
				maxRange: this.maxRange,
			}))
			if (ballList.length === this.numberOfParticles) {
				this.updateBall ()
			}
		}
		return ballList;
	},
	
	draw: function () {
		for (let i = 0; i < this.circleList.length; i++) {
			if (!this.circleList[i].desory) {
				this.circleList[i].drawCircle ()
			}
		}
		for (let i = 0; i < this.ballList.length; i++) {
			this.ballList[i].drawBall ()
		}
	},
	
	updateBall: function () {
		const that = this;
		this.ctx.clearRect (0, 0, window.innerWidth, window.innerHeight);
		this.draw ();
		this.animte = requestAnimFrame (function () {
			that.updateBall ()
		});
	}
}

