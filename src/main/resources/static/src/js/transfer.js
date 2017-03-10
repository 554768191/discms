/**
 * Created by Ly on 2016/10/31.
 */

$.ajaxSettings.async = false;
var data;
// 加载json

$.get("/src/third/list", {}, function(json) {
	$.ajaxSettings.async = true;
	if ("loginout" == json) {
		window.location.href = "login.html";
		return;
	}
	data = $.parseJSON(json);
	var gc = {};
	gc.id = "0";
	gc.name = "GC主账户";
	gc.code = "gc";
	data.push(gc);
	var html1 = "";
	for (var i = 0; i < data.length; i++) {
		if (data[i].code == 'gc') {
			html1 += "<option value=\"" + data[i].code + "\" selected>" + data[i].name + "</option>";
		} else {
			html1 += "<option value=\"" + data[i].code + "\">" + data[i].name + "</option>";
		}
	}
	$("#out-money").html(html1);
	var html2 = "<option value='0'>" + languagePackage['js_qingxuanze'] + "</option>"
	for (var i = 0; i < data.length; i++) {
		if (data[i].code != "gc") {
			html2 += "<option value=\"" + data[i].code + "\">" + data[i].name + "</option>";
		}
	}
	$("#info-money").html(html2);
});
// 转出
$("#out-money").change(
		function() {
			var v = $(this).val();

			var pthtml = "";
			for (var i = 0; i < data.length; i++) {
				if (data[i].code == "gc") {
					pthtml += "<option value=\"" + data[i].code + "\">" + data[i].name + "</option>";
				}
			}
			var gchtml = "<option value='0'>" + languagePackage['js_qingxuanze'] + "</option>";
			for (var i = 0; i < data.length; i++) {
				if (data[i].code != "gc") {
					gchtml += "<option value=\"" + data[i].code + "\">" + data[i].name + "</option>";
				}
			}
			if (v !== 'gc') {
				$("#info-money").html(pthtml);
			} else {
				$("#info-money").html(gchtml);
			}
		});

function sub() {
	var lquota = $('#money').val();
	if (!lquota) {
		$.toast(languagePackage['input_money']);
		return;
	}
	var changeTo = $('#info-money').val();
	if (!changeTo||changeTo==undefined||changeTo=='0') {
		$.toast(languagePackage['select_into_platform']);
		return;
	}
	var changeFrom = $('#out-money').val();
	if (!changeFrom||changeFrom==undefined||changeFrom=='0') {
		$.toast(languagePackage['select_out_platform']);
		return;
	}
	$.showPreloader('loading');
	$.post('/src/money/quotaConversion', {
		lquota : lquota,
		changeTo : changeTo,
		changeFrom : changeFrom
	}, function(result) {
		$.hidePreloader();
		if ("loginout" == result) {
			window.location.href = 'login.html';
			return;
		}
		if (result) {
			var json = $.parseJSON(result);
			if (json.code == '0') {
				$.toast(languagePackage['transfer_success']);
				getGcBalance();
				switch (changeFrom) {
				case 'mg':
					getMgBalance();
					break;
				case 'pt':
					getPtBalance();
					break;
				case 'ag':
					getAgBalance();
					break;
				case 'im':
					getImBalance();
					break;
				case 'ug':
					getUgBalance();
					break;
				case 'gd':
					getGdBalance();
					break;
				case 'bbin':
					getBBinBalance();
					break;
				case 'tgp':
					getTGPBalance();
					break;
				case 'ab':
					getABBalance();
					break;
				case 'ga':
					getGABalance();
					break;
				case 'xtd':
					getXTDBalance();
					break;
				default:
					break;
				}

				switch (changeTo) {
				case 'mg':
					getMgBalance();
					break;
				case 'pt':
					getPtBalance();
					break;
				case 'ag':
					getAgBalance();
					break;
				case 'im':
					getImBalance();
					break;
				case 'ug':
					getUgBalance();
					break;
				case 'gd':
					getGdBalance();
					break;
				case 'bbin':
					getBBinBalance();
					break;
				case 'tgp':
					getTGPBalance();
					break;
				case 'ab':
					getABBalance();
					break;
				case 'ga':
					getGABalance();
					break;
				case 'xtd':
					getXTDBalance();
					break;
				default:
					break;
				}
			} else {
				$.toast(json.msg);
			}
		}
	});
}

$(function() {
	getBalance();
});

function getBalance() {
	// 主账户余额
	getGcBalance();
	if ($(".transfer-list div[code='ag']")) {
		getAgBalance();
	}
	if ($(".transfer-list div[code='gd']")) {
		getGdBalance();
	}
	if ($(".transfer-list div[code='mg']")) {
		getMgBalance();
	}
	if ($(".transfer-list div[code='pt']")) {
		getPtBalance();
	}
	if ($(".transfer-list div[code='im']")) {
		getImBalance();
	}
	if ($(".transfer-list div[code='ug']")) {
		getUgBalance();
	}
	if ($(".transfer-list div[code='bbin']")) {
		getBBinBalance();
	}
	if ($(".transfer-list div[code='tgp']")) {
		getTGPBalance();
	}
	if ($(".transfer-list div[code='ab']")) {
		getABBalance();
	}
	if ($(".transfer-list div[code='ga']")) {
		getGABalance();
	}
	if ($(".transfer-list div[code='xtd']")) {
		getXTDBalance();
	}
}

/**
 * ag balance
 */
function getAgBalance() {
	$.get('/src/ag/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='ag']").html(result);
		} else {
			$(".transfer-list div[code='ag']").html('0.00');
		}
	});
}

/**
 * gd balance
 */
function getGdBalance() {
	$.get('/src/gd/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='gd']").html(result);
		} else {
			$(".transfer-list div[code='gd']").html('0.00');
		}
	});
}

/**
 * mg balance
 */
function getMgBalance() {
	$.get('/src/mg/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='mg']").html(result);
		} else {
			$(".transfer-list div[code='mg']").html('0.00');
		}
	});
}

/**
 * pt balance
 */
function getPtBalance() {
	$.get('/src/pt/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='pt']").html(result);
		} else {
			$(".transfer-list div[code='pt']").html('0.00');
		}
	});
}

/**
 * im balance
 */
function getImBalance() {
	$.get('/src/im/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='im']").html(result);
		} else {
			$(".transfer-list div[code='im']").html('0.00');
		}
	});
}

/**
 * ug balance
 */
function getUgBalance() {
	$.get('/src/ug/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='ug']").html(result);
		} else {
			$(".transfer-list div[code='ug']").html('0.00');
		}
	});
}

/**
 * gc balance
 */
function getGcBalance() {
	$.get('/src/member/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='gc']").html(parseFloat(result) / 100);
		} else {
			if('loginout'==result){
				window.location.href='login.html';
				return;
			}
			$(".transfer-list div[code='gc']").html('0.00');
		}
	});
}

function getBBinBalance(){
	$.get('/src/bbin/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='bbin']").html(parseFloat(result));
		} else {
			$(".transfer-list div[code='bbin']").html('0.00');
		}
	});
}

function getTGPBalance(){
	$.get('/src/tgp/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='tgp']").html($.parseJSON(result).balance);
		} else {
			$(".transfer-list div[code='tgp']").html('0.00');
		}
	});
}

function getABBalance(){
	$.get('/src/ab/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='ab']").html($.parseJSON(result).balance);
		} else {
			$(".transfer-list div[code='ab']").html('0.00');
		}
	});
}

function getGABalance(){
	$.get('/src/ga/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='ga']").html($.parseJSON(result).balance);
		} else {
			$(".transfer-list div[code='ga']").html('0.00');
		}
	});
}

function getXTDBalance(){
	$.get('/src/xtd/balance', {}, function(result) {
		if (result && 'loginout' != result) {
			$(".transfer-list div[code='xtd']").html($.parseJSON(result).balance);
		} else {
			$(".transfer-list div[code='xtd']").html('0.00');
		}
	});
}
