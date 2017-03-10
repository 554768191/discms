/**
 * Created by CL on 2016/10/28.
 */
var page = 1;
var count;
// 点击刷新
$(".header-img-right").tap(function(){
	$.showIndicator();
	httpRequest.get(
			"/member/getAccountInfo",
			{},
			function(data){
				if(data){
					
					setTimeout(function () {
				        $.hideIndicator();
				    }, 2000);
				}
			}
		);
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
		httpRequest.post(
				("/src/member/tuishuiRec"),
				{page:page, size:10},
				function(data){
					if(!data){$('.infinite-scroll-preloader').remove();return;}
					count = data.totalCount;
					lastIndex += 5;
					var html = "";
					if(data.rows && data.rows.length > 0){
						for(var i = 0; i < data.rows.length; i++){
							html += "<div class='record-one'>" + 
							"<div class='row'>" + 
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_kaishishijian"] + "</div>" +
								"<div class='col-66'>" + formatDate(data.rows[i].backstartdate) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_jieshushijian"] + "</div>" +
								"<div class='col-66'>" + formatDate(data.rows[i].backenddate) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_youxiaotouzhujine"] + "(¥)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.rows[i].realbetmoney)/100) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_paicaizonge"] + "(¥)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.rows[i].paymoney)/100) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_chulishijian"] + "</div>" +
								"<div class='col-66'>" + formatDate(data.rows[i].operatortime) + "</div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-33 font-right font-bold'>" + languagePackage["js_tuishuizonge"] + "(¥)</div>" +
								"<div class='col-66'>" + formatMoney(formatMoneyIsNull(data.rows[i].backmoney)/100) + "</div>" +
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