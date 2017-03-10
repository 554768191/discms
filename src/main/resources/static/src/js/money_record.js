/**
 * Created by Ly on 2016/11/05.
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


var beginDate = "2000-01-01";
var endDate = date;
var type = $("#record-type").val();
var status = $("#record-state").val();
var page = 1;
var count;
// 查询
$(".record-sumbit-btn").tap(function(){
	type = $("#record-type").val();
	status = $("#record-state").val();
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
				("/src/member/moneyRec"),
				{type:type, status:status, size:5, page:page, beginDate:beginDate, endDate:endDate},
				function(data){
					count = data.totalCount;
					lastIndex += 5;
					var html = "";
					if(data.list && data.list.length > 0){
						for(var i = 0; i < data.list.length; i++){
							if(!data.list[i].dwdesc){
								data.list[i].dwdesc == null;
							}
							switch (data.list[i].type) {
								case "1":
									data.list[i].type = languagePackage["js_shoudongcunkuan"];
									break;
								case "2":
									data.list[i].type = languagePackage["js_shoudongqukuan"];
									break;
								case "3":
									data.list[i].type = languagePackage["js_zidongcunkuan"];
									break;
								case "4":
									data.list[i].type = languagePackage["js_zidongqukuan"];
									break;
								case "5":
									data.list[i].type = languagePackage["js_gongsiyouhui"];
									break;
								case "6":
									data.list[i].type = languagePackage["js_gongsiqukuan"];
									break;
								default:
									data.list[i].type = "";
									break;
							}
							switch (data.list[i].status) {
								case "1":
									data.list[i].status = languagePackage["js_pizhunzhong"];
									break;
								case "2":
									data.list[i].status = languagePackage["js_yipizhun"];
									break;
								case "3":
									data.list[i].status = languagePackage["js_weitongguo"];
									break;
								case "4":
									data.list[i].status = languagePackage["js_yiquxiao"];
									break;
								default:
									data.list[i].status = "";
									break;
							}
							html += "<div class='record-one'>" + 
							"<div class='row'>" + 
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_dingdanhao"] + "</div>" +
								"<div class='col-66'>" + data.list[i].orderid + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_caozuoshijian"] + "</div>" +
								"<div class='col-66'>" + data.list[i].reqTimeStr + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_caozuoleixing"] + "</div>" +
								"<div class='col-66'>" + data.list[i].type + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_caozuojine"] + "(<span>¥</span>)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.list[i].money)/100) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_hongli"] + "(<span>¥</span>)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.list[i].bonus)/100) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_fuyan"] + "</div>" +
								"<div class='col-66'>" + (data.list[i].dwdesc?data.list[i].dwdesc:'') + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>"+ languagePackage["js_zhuangtai"] + "</div>" +
								"<div class='col-66'>" + data.list[i].status + "</div>" +
							"</div>";
						if((data.list[i].type==1)&&(data.list[i].status==1 || data.list[i].status==0)){
							html += "<div class='row'>" +
									"<div class='col-33 font-right font-bold'>"+ languagePackage["js_caozuo"] + "</div>" +
									"<div class='col-66'><a href='javascript:void(0)' onclick='delOrder('\"" + data.list[i].orderid +"\"');'>删除</div>" +
								"</div>" +
							"</div>";
						}else{
							html += "<div class='row'>" +
									"<div class='col-33 font-right font-bold'>"+ languagePackage["js_caozuo"] + "</div>" +
									"<div class='col-66'></div>" +
								"</div>" +
							"</div>";
						}
					}
					$('.infinite-scroll-bottom .list-container').append(html);
				}else{
					$('.infinite-scroll-preloader').remove();
				}
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