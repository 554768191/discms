/**
 * Created by Ly on 2016/10/28.
 */

var GCLCode="GCL";//gc直播
var GGLCode="GGL";//gg直播 
var AGLCode="AGL";//ag直播
var PTLCode="PTL";//pt直播
var GCSCode="GCS";//gc体育
var GCCCode="GCC";//gc彩票
var PTECode="PTE";//pt电子
var OBLCode="OBL";//欧博直播
var XTDLCode="XTDL";//新天地
var TBSCode="TBS";//UG体育
var GDCode="GD";//GD
var MGCode="MG";//MG电子
var BBINCode="BBIN";//bbin
var MGECode="MGE";//mg电子
var IMCode="IM";//im体育
var GGCode="GG";//捕鱼
var GACode="GA";//ga电子
var TGPCode="TGP";//太阳城

// 弹出侧边栏
$(".my-btn").click(function() {
    $.openPanel("#panel-js-demo");
});
localStorage.lang = "zh_CN";
$("#lang div").tap(function(){
	localStorage.lang = $(this).find("img").attr("data-lang");
	var src = "../"+localStorage.lang+"/"+"index.html";
	window.location.href = src;
});

// 获取语言
var lang = $(".header-img").attr("src");
if(lang == "../img/icon/lang_ch.png"){
	lang = "zh_CN";
}
if(lang == "../img/icon/flag_hk.png"){
	lang = "zh_HK";
}
if(lang == "../img/icon/flag_uk.png"){
	lang = "en_UK";
}
if(lang == "../img/icon/flag_th.png"){
	lang = "th_TH";
}

// 获取滚动公告
httpRequest.get(
	"/index/runMessage",
	{count:"5"},
	function(data){
		if(!data||data.length<1){
			return;
		}
		var html = "";
		for(var i in data){
			html += data[i].message;
			html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		$("#notice").html(html);
	}
);

// 获取轮播图
$(function() {
	httpRequest.get(
		"/index/picture",
		{type:"1",lang:lang},
		function(data){
			var html = "";
			if(data&&data.length>0){	
				for(var i = 0; i<data.length; i++){
					var img = data[i].picPath + "/" + data[i].picName;
					html += "<div class='swiper-slide'>";
					html += "<img src="+img+" style='width:100%' alt=''>";
					html += "</div>";
				}
			}else{
				html += "<div class='swiper-slide'>";
				html += "<img src='/src/img/banner.jpg' style='width:100%' alt=''>";
				html += "</div>";
			}
			$(".swiper-wrapper").html(html);
			$(".swiper-container").swiper({autoplay: 5000});
		}
	);
});

// 获取url参数
function getParam(paramName){
    paramValue ="";
    isFound =false;
    if (this.location.search.indexOf("?") ==0&&this.location.search.indexOf("=")>1){
        arrSource = unescape(this.location.search).substring(1,this.location.search.length).split("&");
        i =0;
        while (i < arrSource.length &&!isFound){
            if (arrSource[i].indexOf("=") >0){
                 if (arrSource[i].split("=")[0].toLowerCase()==paramName.toLowerCase()){
                    paramValue = arrSource[i].split("=")[1];
                    isFound =true;
                 }
            }
            i++;
        }  
    }
   return paramValue;
}
//获取onlineCode
var onlineCode = getParam("onlineCode");

// session储存onlineCode
if(onlineCode&&onlineCode!=undefined){
	localStorage.onlineCode=onlineCode;
    httpRequest.get("/index/setOnlineCode", {onlineCode: onlineCode}, function(){});
}

// 用户登录信息
httpRequest.get(
	"/member/getAccountInfo?_="+new Date().getTime(),
	{},
	function(data){
		if(data){
			$("#userlogin-balance").attr("href","transfer.html");
			$("#userlogin-img").attr("href","transfer.html");
			$("#userlogin-balance").find("span").html(formatMoney(formatMoneyIsNull(data.balance)/100));
			$("#userlogin-img").find("img").attr("src","../img/icon/cash.png");
		}
	}
);

var toProduct=function(url){
	var code = "";
	if(url.indexOf("gcl") > -1){
		code = GCCCode;
	}
	if(url.indexOf("ag") > -1){
		code = AGLCode;
	}
	if(url.indexOf("gd") > -1){
		code = GDCode;
	}
	if(url.indexOf("ug") > -1){
		code = TBSCode;
	}
	if(url.indexOf("mg") > -1){
		code = MGCode;
	}
	if(url.indexOf("im") > -1){
		code = IMCode;
	}
	if(url.indexOf("pt") > -1){
		code = PTECode;
	}
	if(url.indexOf("tgp") > -1){
		code = TGPCode; 
	}
	httpRequest.get(
		"/index/maintaince",
		{code:code},
		function(result){
			if(result){
				if(result.code == 0){
					if(url.indexOf('gclottery')>-1){
						$.get(
							    url,
								{lang:lang},
								function(result){
									   if(result){
										   if("loginout"==result){
											   window.location.href="login.html";
											   return;
										   }
										   var jobj=$.parseJSON(result);
										   if(jobj.code!="0"){
											   if(jobj.msg){
												   console.log(jobj.msg);
											   }else{
												   console.log(jobj);
											   }
										   }else{
											   window.location.href=jobj.url;
										   }
									   }
								   }
								);
						return;
					}
					window.location.href=url;
				}else if(result.code == -1){
					var beginTime = result.beginTime;
					var endTime = result.endTime;
					$.toast("系统维护，开始时间到结束时间：" + beginTime + "-" + endTime);
				}
			}
		}
	);
	
}








