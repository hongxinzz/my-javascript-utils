/**
 * 兼容浏览器获取边距
 */

function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else {
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}


/**
 * 兼容浏览器获取可视窗口
 */

function getViewPortSize() {
	if (window.innerHeight) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		if (document.compatMode === 'BackCompat') {
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		} else {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
	}
}

/**
 * 获取浏览器滚动距离
 */

function getScrollSize() {
	if (document.body.scrollHeight) {
		return {
			width: document.body.scrollWidth,
			height: document.body.scrollHeight
		}
	} else {
		return {
			width: document.documentElement.scrollWidth,
			height: document.documentElement.scrollHeight
		}
	}
}


/**
 * 获取定位元素的offset
 * @param {* Dom} el
 */
function getPosition(el) {
	var parent = el.offsetParent,
		offsetLeft = el.offsetLeft,
		offsetTop = el.offsetTop;

	while (parent) {
		offsetLeft += parent.offsetLeft;
		offsetTop += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		left: offsetLeft,
		top: offsetTop
	}
}

/**
 * 便利元素子节点
 * @param {* 父级元素} node
 */
function elemChildren(node) {
	var temp = {
		'length': 0,
		'splice': Array.prototype.splice
	}
	for (var i = 0; i < node.childNods.length; i++) {
		var childItem = node.childNods.length[i];
		if (childItem.nodeType === 1) {
			temp[temp.length] = childItem;
			temp['length']++;
		}
	}
	return temp
}

/**
 * 兼容浏览器获取元素样式
 * @param {* 元素} el
 * @param {* 属性} prop
 */
function getStyle(el, prop) {
	if (window.getComputedStyle) {
		if (prop) {
			return window.getComputedStyle(el, null)[prop]
		} else {
			return window.getComputedStyle(el, null)
		}
	} else {
		if (prop) {
			return el.currentStyle[prop]
		} else {
			return el.currentStyle;
		}
	}
}

/**
 * 兼容浏览器事件监听
 * @param {* Dom} el
 * @param {* 事件} type
 * @param {* 执行函数} fn
 */
function addEvent(el, type, fn) {
	if (el.addEventListener) {
		el.addEventListener(type, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + type, function () {
			fn.call(el)
		})
	} else {
		el['on' + type] = fn;
	}
}



    