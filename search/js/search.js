window.onload = function () {
	init();
};

function init() {
	kwSearch()
}

var kwSearch = (function () {
	var showKw = document.getElementById('J_show_kw'),
		inp = document.getElementById('J_input'),
		inpData = JSON.parse(document.getElementById('J_data').innerText),
		timer = null,
		index = 0;


	addEvent(inp, 'focus', function () {
		clearInterval(timer);
		showKw.style.color = '#ccc';
	});
	addEvent(inp, 'blur', function () {
		autoShowKs(this.value, true);
		timer = setInterval(autoChangeKs, 2000);
	});

	addEvent(inp, 'input', function () {
		autoShowKs(this.value, false);
	});

	addEvent(inp, 'propertychange', function () {
		autoShowKs(this.value, false);
	});

	function setAuto() {
		autoChangeKs();
		timer = setInterval(autoChangeKs, 2000);
	}

	function autoChangeKs() {
		var inpLen = inpData.length;
		showKw.innerHTML = inpData[index];
		index = index >= inpLen - 1 ? 0 : index + 1;
	}

	function autoShowKs(val, bool) {
		var valLen = val.length;
		if (valLen <= 0) {
			showKw.className = 'auto-kw show';
			showKw.style.color = bool ? '#333' : '#ccc';
			// setAuto()
		} else {
			showKw.className = 'auto-kw hide'
		}
	}

	return function () {
		setAuto()
	}
})()
