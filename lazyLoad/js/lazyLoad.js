;(function (root) {

	/**
	 * 类型检测
	 * @type {string}
	 */
	var TYPE_ARRAY = "[object Array]",
		TYPE_OBJECT = "[object Object]";

	/**
	 * 默认的配置
	 * root 节点
	 * dataSet 自定义属性
	 * imgList 用户传进来的图片数组
	 * margin 距离多少的时候显示
	 * @type {{margin: number, root: null, dataSet: string, imgList: Array}}
	 */
	var defaultConfig = {
		root:null,
		dataSet:'data-src',
		imgList:[],
		margin: 0
	}


	var LazyLoad = function (options) {
		options = Object.assign(defaultConfig,!getTypeArray(options,TYPE_OBJECT) ? {} : options);
		this.root = options.root;
		this.dataSet = options.dataSet;
		this.imgList = Array.prototype.slice.call(options.imgList);
		this.margin = options.margin;
	}

	LazyLoad.prototype = {
		init: function () {
			//这里需要判断下 是不是数组 或者小于0的
			if (!getTypeArray(this.imgList,TYPE_ARRAY) || this.imgList <= 0) {
				this.getImgDom()
			} else {
				this.bindEvent()
			}
		},

		getImgDom: function () {
			this.imgList = Array.prototype.slice.call(document.querySelectorAll(this.root ? this.root : 'img'));
			this.bindEvent()
		},

		bindEvent: function () {
			var that = this;
			if(!checkDataSet(this.imgList,this.dataSet)){
				throw new Error(this.dataSet + ' 获取值错误，请检查')
			}
			this.imgLoad();
			window.addEventListener("scroll", function () {
				that.imgLoad()
			})
		},

		imgLoad:function () {
			var that = this,
				viewHeight = document.documentElement.clientHeight;
			this.imgList.forEach(function (image) {
				var rect = image.getBoundingClientRect();
				if (rect.bottom >= 0 && rect.top  < viewHeight + that.margin) {
					image.src = image.getAttribute(that.dataSet);
				}
			})
		}
	};

	/**
	 * 检验类型
	 * @param current
	 * @param target
	 * @returns {boolean}
	 */
	function getTypeArray(current,target) {
		return Object.prototype.toString.call(current) === target;
	}

	/**
	 * 判断用户传进来的dataSet 是否有值
	 * @param images
	 * @param dataSet
	 * @returns {boolean}
	 */
	function checkDataSet(images,dataSet){
		for(var i = 0; i < images.length; i++){
			if(!images[i].getAttribute(dataSet)){
				return false
			}else{
				return true
			}
		}
	}


	root.lazyLoad = function (options) {
		return new LazyLoad(options).init()
	};

}(window))