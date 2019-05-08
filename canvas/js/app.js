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
	this.ballNum = option.ballNum;
	this.ballList = [];
	this.animte = null;
	this.textXY = []
	this.showText = option.showText;
	this.init()
}

DropCanvas.prototype={
	init: function(){
		var that = this;
		this.oWidth = getViewPortSize().width;
		this.oHeight = getViewPortSize().height;
		this.iCanvas = document.createElement("canvas");
		// 设置Canvas 与父元素同宽高
		this.iCanvasW = this.iCanvas.width = this.oWidth;
		this.iCanvasH = this.iCanvas.height = this.oHeight;
		// 获取 2d 绘画环境
		window.ctx = this.ctx = this.iCanvas.getContext("2d");
		// 插入到 body 元素中
		document.body.appendChild(this.iCanvas);
		// addEvent(window,'resize',function(){
		// 	console.log('窗口改变了')
		// 	// that.ctx.clearRect(0, 0, that.iCanvasW, that.iCanvasH);
		// 	this.oWidth = getViewPortSize().width;
		// 	this.oHeight = getViewPortSize().height;
		// 	window.cancelAnimationFrame(that.animte)
		// 	that.init();
		// })
		this.createBall();
		this.getTextStyle();
	},
	getTextStyle:function(){
		var that = this;
		if(this.showText !=='' && typeof(this.showText) !== 'undefined'){
			console.log('in')
			this.ctx.font = '180px Arial';
			this.ctx.fillStyle = "#fff";
			this.ctx.fillRect(0, 0, this.iCanvasW, this.iCanvasH);
			this.ctx.fillStyle = "red";
			this.ctx.textAlign = 'center';
			this.ctx.fillText(this.showText, this.iCanvasW / 2, 400);
			this.imgData = ctx.getImageData(0, 0, this.iCanvasW, this.iCanvasH);
			this.ctx.clearRect(0, 0, this.iCanvasW, this.iCanvasH);
			setTimeout(function () {
				that.createText()
			},2000)
		}
		
	},
	createBall: function () {
		var ballNum = this.ballNum;
		for(var i = 0; i < ballNum; i++){
			var ball = new Ball({maxWidth:this.iCanvasW,maxHeight:this.iCanvasH});
			this.ballList.push(ball);
			if(this.ballList.length === this.ballNum){
				this.updateBall()
			}
		}
	},
	createText:function () {
		var actionCount = 0;
		var canAnimateToText = false;
		for(var x=0; x<this.imgData.width; x+=6) {
			for(var y=0; y<this.imgData.height; y+=6) {
				var i = (y*this.imgData.width + x) * 4;
				if(this.imgData.data[i] == 255 && this.imgData.data[i + 1] == 0 && this.imgData.data[i + 2] == 0 && this.imgData.data[i + 3] == 255){
					if(actionCount >= this.ballList.length){
						alert('输入的文字太多了，粒子忙不过来啦')
						this.updateBall()
						return 
					}
					this.ballList[actionCount].oldX = this.ballList[actionCount].x
					this.ballList[actionCount].oldY = this.ballList[actionCount].y
					this.ballList[actionCount].newX = x;
					this.ballList[actionCount].newY = y;
					this.ballList[actionCount].status = 'stop'
					canAnimateToText = true;
					actionCount++;
				}
			}
		}
		if(canAnimateToText){
			console.log('inText')
			this.animateToText()
		}
	},
	animateToText:function(){
		var that = this;
		for(var i = 0;i<this.ballList.length;i++){
			if(this.ballList[i].newX && this.ballList[i].newX){
				console.log(1)
				dynamics.animate(that.ballList[i], {
					x: that.ballList[i].newX,
					y: that.ballList[i].newY
				},{
					type: dynamics.spring ,
					duration:1000,
				})
			}
		}
		setTimeout(function(){
			that.ballBack();
		},3100);
	},
	ballBack(){
		var that = this;
		for(var i=0;i<this.ballList.length;i++){
			if(this.ballList[i].newX && this.ballList[i].newX){
				this.ballList[i].status = 'start'
				dynamics.animate(that.ballList[i], {
					x: that.ballList[i].oldX,
					y: that.ballList[i].oldY
				},{
					type: dynamics.easeIn,
					duration:1000,
				})
			}
		}
	},
	draw:function(){
		for(var i = 0;i < this.ballList.length;i++){
			this.ballList[i].dropBall()
		}
	},
	updateBall:function () {
		var that = this;
		this.ctx.clearRect(0, 0, this.iCanvasW, this.iCanvasH);
		this.draw();
		this.animte = requestAnimFrame(function () {
			that.updateBall()
		});
	}
}