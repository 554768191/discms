/**
 * By Ly, 2017-02-13 
 */
var loading = function(){$.get(
	"/index/flash",
	function(result){
		if(result){
			var res = $.parseJSON(result);
			if(res.code == 0){
				return;
			}
		}
		var lang = localStorage.lang;
		switch (lang) {
		case "zh_CN":
			window.location.href = "/src/CH/login.html";
			break;
		case "zh_HK":
			window.location.href = "/src/HK/login.html";
			break;
		case "en_UK":
			window.location.href = "/src/UK/login.html";
			break;
		case "th_TH":
			window.location.href = "/src/TH/login.html";
			break;
		default:
			window.location.href = "/src/CH/login.html";
			break;
		}
	}
)};

setInterval( "loading()", 60000);