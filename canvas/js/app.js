/**
 * 创建小球的个数
 * @param option
 * @constructor
 */
var requestAnimFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
function DropCanvas(option) {
	this.ballNum = option.ballNum; //小球个数
	this.ballList = []; //小球数组
	this.animte = null; //动画
	this.showTextColor = option.showTextColor || ''; //文字颜色
	this.showText = option.showText || ''; //显示的文字
	this.initTextFont = option.initTextFont || '180px';
	this.iniFontFamily = option.iniFontFamily || 'Arial';
	this.ballSize = {
		max:option.maxSize || 3 ,
		min:option.minSize || 1,
	} //小球大小
	this.isCanBack = option.isCanBack;
	this.animateEnd = option.animateEnd || function(){}; //回调函数
	this.isCanBack = option.isCanBack  || true; //是否停止
	this.init()
}

DropCanvas.prototype={
	init: function(){
		this.oWidth = getViewPortSize().width;
		this.oHeight = getViewPortSize().height;
		this.iCanvas = document.createElement("canvas");
		// 设置Canvas 与父元素同宽高
		this.iCanvasW = this.iCanvas.width = this.oWidth;
		this.iCanvasH = this.iCanvas.height = this.oHeight;
		this.iCanvas.className = 'dropCanvas';
		// 获取 2d 绘画环境
		window.ctx = this.ctx = this.iCanvas.getContext("2d");
		// 插入到 body 元素中
		document.body.appendChild(this.iCanvas);
		this.createBall();
		this.getTextStyle();
	},
	getTextStyle:function(){
		var that = this;
		if(this.showText !=='' && typeof(this.showText) !== 'undefined'){
			//获取文字默认的imgdata
			this.ctx.font = this.initTextFont + ' ' +this.iniFontFamily;
			this.ctx.fillStyle = "#fff";
			this.ctx.fillRect(0, 0, this.iCanvasW, this.iCanvasH);
			this.ctx.fillStyle = "red";
			this.ctx.textAlign = 'center';
			this.ctx.fillText(this.showText, this.iCanvasW / 2, 400);
			this.imgData = ctx.getImageData(0, 0, this.iCanvasW, this.iCanvasH);
			this.ctx.clearRect(0, 0, this.iCanvasW, this.iCanvasH);
			setTimeout(function () {
				that.createText()
			},1000)
		}

	},
	createBall: function () {
		//生成球体
		var ballNum = this.ballNum;
		for(var i = 0; i < ballNum; i++){
			var ball = new Ball({size:this.ballSize,maxWidth:this.iCanvasW,maxHeight:this.iCanvasH});
			this.ballList.push(ball);
			if(this.ballList.length === this.ballNum){
				this.updateBall()
			}
		}
	},
	createText:function () {
		//开始i获取imgdata的坐标值
		var actionCount = 0;
		var canAnimateToText = false;
		for(var x=0; x<this.imgData.width; x += 6) {
			for(var y=0; y<this.imgData.height; y += 6) {
				var i = (y*this.imgData.width + x) * 4;
				if(this.imgData.data[i] == 255 && this.imgData.data[i + 1] == 0 && this.imgData.data[i + 2] == 0 && this.imgData.data[i + 3] == 255){
					if(actionCount >= this.ballList.length){
						alert('输入的文字太多了，粒子忙不过来啦')
						this.updateBall()
						return
					}
					this.ballList[actionCount].oldX = this.ballList[actionCount].x;
					this.ballList[actionCount].oldY = this.ballList[actionCount].y;
					this.ballList[actionCount].newX = x;
					this.ballList[actionCount].newY = y;
					this.ballList[actionCount].oldColor = this.ballList[actionCount].color;
					this.ballList[actionCount].color = this.showTextColor === '' ? this.ballList[actionCount].color: this.showTextColor;
					this.ballList[actionCount].status = 'stop';
					canAnimateToText = true;
					actionCount++;
				}
			}
		}
		if(canAnimateToText){
			//获取之后开始执行例子到指定的X，Y轴
			this.animateToText()
		}
	},
	animateToText:function(){
		var that = this;
		for(var i = 0;i<this.ballList.length;i++){
			if(this.ballList[i].newX && this.ballList[i].newX){
				dynamics.animate(that.ballList[i], {
					x: that.ballList[i].newX,
					y: that.ballList[i].newY
				},{
					type: dynamics.easeIn,
					duration:1000,
					complete:function () {
						that.animateEnd(true)
					}
				})
				that.ballList[i].newX = 0;
				that.ballList[i].newY = 0;
			}
		}
		if(this.isCanBack){
			setTimeout(function(){
				// 三秒之后回到点位
				that.ballBack();
			},3000);
		}
	},
	ballBack(){
		var that = this;
		for(var i=0;i<this.ballList.length;i++){
			if(this.ballList[i].oldX && this.ballList[i].oldY){
				this.ballList[i].status = 'start';
				dynamics.animate(that.ballList[i], {
					x: that.ballList[i].oldX,
					y: that.ballList[i].oldY,
				},{
					type: dynamics.easeIn,
					duration:1500,
				})
				this.ballList[i].color = this.ballList[i].oldColor;
				this.ballList[i].oldX = 0;
				this.ballList[i].oldY = 0;

			}
		}
	},
	draw:function(){
		//绘制每一颗小球
		for(var i = 0;i < this.ballList.length;i++){
			this.ballList[i].drawBall()
		}
	},
	updateBall:function () {
		//不停地重复
		var that = this;
		this.ctx.clearRect(0, 0, this.iCanvasW, this.iCanvasH);
		this.draw();
		this.animte = requestAnimFrame(function () {
			that.updateBall()
		});
	}
}
