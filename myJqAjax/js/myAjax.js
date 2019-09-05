var $ = (function () {
	var _xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');

	var TYPE_POST = 'POST',
		TYPE_GET = 'GET',
		ERROR_CODE = 404,
		SUCCESS_CODE = 200;

	/**
	 * 处理兼容
	 */
	if (!_xhr) {
		showError('你的浏览器不支持异步请求')
	}

	/**
	 * doAjax 接受外部参数
	 * @param opt
	 * @private
	 */
	function _doAjax(opt) {
		var opt = opt || {},
			type = formatType(opt.type || TYPE_GET),
			async = opt.async || true,
			url = opt.url,
			data = opt.data || null,
			error = opt.error || function () {
			},
			success = opt.success || function () {
			}
		complete = opt.complete || function () {
		}


		if (!url) {
			showError('您没有填写URL')
		}

		_xhr.open(type, url, async);
		type === TYPE_POST && _xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		_xhr.send(type === TYPE_GET ? null : formatData(data));

		_xhr.onreadystatechange = function () {
			if (_xhr.readyState === 4 && _xhr.status === SUCCESS_CODE) {
				success(JSON.parse(_xhr.responseText));
			}

			if (_xhr.status === ERROR_CODE) {
				error()
			}
			complete();
		}
	}

	/**
	 * 格式化post data数据
	 * @param dataObj
	 * @returns {string}
	 */
	function formatData(dataObj) {
		var str = '';

		for (var key in dataObj) {
			str += key + '=' + dataObj[key] + '&';
		}

		return str.replace(/&$/, '');
	}

	/**
	 * 格式化post get
	 * @param type
	 * @returns {string}
	 */
	function formatType(type) {
		return type.toUpperCase();
	}

	/**
	 * 错误捕获
	 * @param errorStr
	 */
	function showError(errorStr) {
		throw new Error(errorStr)
	}

	return {
		ajax: function (opt) {
			_doAjax(opt)
		},
		post: function (url, data, successCb, errorCb) {
			_doAjax({
				type: TYPE_POST,
				url: url,
				data: data,
				success: successCb,
				error: errorCb
			})
		},
		get: function (url, successCb, errorCb) {
			_doAjax({
				type: TYPE_GET,
				url: url,
				success: successCb,
				error: errorCb
			})
		}
	}
})();