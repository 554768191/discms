/**
 * Created by Ly on 2016/11/08.
 */

// 搜索条件
$(".bar a .icon").tap(function(){
	$(".record-list").css("display","block");
	$(".record-result-list").css("display","none");
	$('.infinite-scroll-preloader').css("display","none");
});

//获取当前时间
var date = new Date();
var year = date.getFullYear();   //获取系统的年；
var mouth = date.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
if(mouth < 10){
	mouth = "0"+mouth;
}
var day = date.getDate(); // 获取系统日，
if(day < 10){
	day = "0"+day;
}
var hour = date.getHours(); //获取系统时
if(hour < 10){
	day = "0"+hour;
}
var minute = date.getMinutes(); //获取系统分
if(minute < 10){
	minute = "0"+minute;
}
date = year+"-"+mouth+"-"+day;

// 开始日期
$("#start-search-date").calendar({
    value: [date]
});

//结束日期
$("#end-search-date").calendar({
    value: [date]
});


var beginDate;
var endDate;
var page = 1;
var count;
var details;
// 查询
$(".record-sumbit-btn").tap(function(){
	beginDate = $("#start-search-date").val();
	endDate = $("#end-search-date").val();
	if(!beginDate){
		$.toast(languagePackage["start_date_notNull"]);
		return;
	}
	if(!endDate){
		$.toast(languagePackage["end_date_notNull"]);
		return;
	}
	$(".record-list").css("display","none");
	$(".record-result-list").css("display","block");
	$('.infinite-scroll-preloader').css("display","block");
	$(".record-result-info .record-one").remove();
	page=1;
	loadDate();
});

var loadDate = function(){
	//加载flag 
	var loading = false;
	// 最多可加载的条目
	var maxItems = 100;
	// 每次加载添加多少条目
	var itemsPerLoad = 5;
	function addItems(number, lastIndex) {
	    // 生成新条目的HTML
		httpRequest.get(
				("/src/ag/record.do"),
				{page:page, pageCount:10, beginDate:beginDate, endDate:endDate, lang:"zh_CN"},
				function(data){
					count = data.totalCount;
					lastIndex += 5;
					var html = "";
					if(data.list && data.list.length > 0){
						for(var i = 0; i < data.list.length; i++){
							html += "<div class='record-one'>" + 
							"<div class='row'>" + 
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_touzhushijian"] + "</div>" +
								"<div class='col-66'>" + data.list[i].bettimeStr + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_youximingcheng"] + "</div>" +
								"<div class='col-66'>" + data.list[i].gametype + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_tingming"] + "</div>" +
								"<div class='col-66'>" + data.list[i].round + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_youxijuhao"] + "</div>" +
								"<div class='col-66'>" +  data.list[i].gamecode + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_zhuohao"] + "</div>" +
								"<div class='col-66'>" + data.list[i].tablecode + "</div>" +
							"</div>" +
							"<div class='row' style='height: 100%;'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_saiguo"] + "</div>" +
								"<div class='col-66'>" + data.list[i].gameResult + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_touzhujine"] + "(¥)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.list[i].betvalue)/100) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_shuying"] + "(¥)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.list[i].payMoney-data.list[i].betvalue)/100) + "</div>" +
							"</div>" +
						"</div>";
						}
						$('.infinite-scroll-bottom .list-container').append(html);
					}
					$('.infinite-scroll-preloader').remove();
				}
			);
	}
	//预先加载5条
	addItems(itemsPerLoad, 0);
	// 上次加载的序号
	var lastIndex = 5;
	// 注册'infinite'事件处理函数
	$(function(){
		$(document).on('infinite', '.infinite-scroll-bottom',function() {
		    // 如果正在加载，则退出
		    if (loading) return;
		    // 设置flag
		    loading = true;
		    // 模拟1s的加载过程
		    setTimeout(function() {
		        // 重置加载flag
		        loading = false;
		        maxItems = count;
		        if (lastIndex >= maxItems) {
		            // 加载完毕，则注销无限加载事件，以防不必要的加载
		            $.detachInfiniteScroll($('.infinite-scroll'));
		            // 删除加载提示符
		            $('.infinite-scroll-preloader').remove();
		            return;
		        }
			    page++;
		        // 添加新条目
		        addItems(itemsPerLoad, lastIndex);
		        // 更新最后加载的序号
		        lastIndex = $('.list-container .record-one').length;
		        //容器发生改变,如果是js滚动，需要刷新滚动
		        $.refreshScroller();
		    }, 1000);
		});
		$.init();
	});
}
loadDate();