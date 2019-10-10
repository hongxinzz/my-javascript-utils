;(function () {
	/**
	 * 默认规则
	 * @type {{phone: {msg: string, test: test}, name: {msg: string, test: (function(*): boolean)}, required: {msg: string, test: (function(*): boolean)}, email: {msg: string, test: (function(*): boolean)}}}
	 */
	var defaultRules = {
		required: {
			msg: '字段必填',
			test: function (obj) {
				return obj.value.length > 0 && obj.value != obj.defaultValue;
			}
		},
		email: {
			msg: '邮箱格式错误',
			test: function (obj) {
				return !obj.value || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(obj.value);
			}
		},
		phone: {
			msg: '错误的号码',
			test: function (obj) {
				var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec(obj.value);
				if (m) {
					obj.value = "(" + m[1] + ")" + m[2] + "-" + m[3];
					return !obj.value || m;
				}
			}
		},
		name:{
			msg: '字段必填',
			test: function (obj) {
				return obj.value.length > 0 && obj.value != obj.defaultValue;
			}
		}
	}
	
	var CheckForm = function (el,options) {
		this.event = options.defaultEvent;
		this.el = el;
	}
	
	CheckForm.prototype  = {
		init:function () {
			var that = this;
			this.el.addEventListener(this.event,function (e) {
				that.validateForm(e.target)
			})
		},
		/**
		 * 表单检验
		 * @param type
		 */
		validateForm:function (type) {
			if(!defaultRules[type.name].test(type) && !defaultRules[type.name].isCkeck){
				defaultRules[type.name].isCkeck = true;
				this.appendError(type,defaultRules[type.name].msg)
			}else{
				defaultRules[type.name].isCkeck = false;
				this.removeError(type);
			}
		},
		/**
		 * 插入错误提示
		 * @param el
		 * @param text
		 */
		appendError:function (el,text) {
			var div = document.createElement('div'),
				parent = el.parentNode;
			div.innerHTML = text;
			div.style.color = 'red';
			div.classList.add('error-msg');
			if(parent.lastChild === el){
				parent.appendChild(div);
			}else{
				parent.insertBefore(div,el.nextSibling);
			}
		},
		/**
		 * 移除错误
		 * @param el
		 */
		removeError:function (el) {
			var parent = el.parentNode.childNodes;
			if(parent[parent.length - 2].className !=='error-msg') return;
			el.parentNode.removeChild(parent[parent.length - 2])
		}
	}
	
	window.checkForm = function (el,options) {
		return new CheckForm(el,options).init()
	}
}())