/**
 * Created by Ly on 2016/11/05.
 */

// 五秒后跳转首页
window.onload =function() {
	var i = 4;
	setInterval(function(){               
	if(i == 0) {
	        location.href = "index.html";
	    }
	document.getElementById("time").innerHTML = i--;
    },1000);
};