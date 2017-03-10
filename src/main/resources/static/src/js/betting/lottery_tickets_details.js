/**
 * Created by Ly on 2016/11/08.
 */

// 详细数据展示
var details = JSON.parse(localStorage.lotteryDetails);
var html = "<div class='row'>" +
	   					"<div class='col-33'>" + languagePackage["js_xiazhushijian"] + "</div>" + 
	   					"<div class='col-66'>" + details.betTimeStr + "</div>" + 
	   				"</div>" +
	   				"<div class='row'>" + 
	   					"<div class='col-33'>" + languagePackage["js_caizhong"] + "</div>" + 
	   					"<div class='col-66'>" + details.gameTypeStr + "</div>" + 
					"</div>" +
					 "<div class='row'>" + 
		   				"<div class='col-33'>" + languagePackage["js_qihao"] + "</div>" + 
		   				"<div class='col-66'>" + details.gameNo + "</div>" + 
		   			"</div>" +
		   			 "<div class='row'>" + 
		   				"<div class='col-33'>" + languagePackage["js_xiazhuzonge"] + "(¥)</div>" + 
		   				"<div class='col-66'>" + formatMoney(formatMoneyIsNull(details.betAmount)/100) + "</div>" + 
		   			"</div>" +
		   			 "<div class='row'>" + 
		   				"<div class='col-33'>" + languagePackage["js_zhongjiangjine"] + "(¥)</div>" + 
		   				"<div class='col-66'>" + formatMoney(formatMoneyIsNull(details.payAmount)/100) + "</div>" + 
		   			"</div>" +
		   			"<div class='row'>" + 
	   				    "<div class='col-33'>" + languagePackage["js_tuishuijine"] + "(¥)</div>" + 
	   				    "<div class='col-66'>" + formatMoney(formatMoneyIsNull(details.payRolling)/100) + "</div>" + 
	   			    "</div>" +
		   			"<div class='row'  style='height:100%;'>" + 
		   				"<div class='col-33'>" + languagePackage["js_kaijianghaoma"] + "</div>" + 
		   				"<div class='col-66' style='width: 55%;word-wrap: break-word;'>" + details.result + "</div>" + 
		   			"</div>";
$(".details-list").html(html);
var htmlInfo = "";
for(var i=0; i<details.details.length; i++){
	htmlInfo += "<table>" +
					"<tr>" +
						"<th>" + languagePackage["js_touzhuneirong"] + "</th>" +
						"<th>" + languagePackage["js_zhushu"] + "</th>" +
						"<th>" + languagePackage["js_xiazhujine"] + "(¥)</th>" +
						"<th>" + languagePackage["js_zhongjiangjine"] + "(¥)</th>" +
					"</tr>" +
					"<tr>" +
						"<td>" + details.details[i].poolName+" "+details.details[i].betContain + "</td>" +
						"<td>" + details.details[i].noteNum + "</td>" +
						"<td>" + formatMoney(formatMoneyIsNull(details.details[i].betAmount)/100) + "</td>" +
						"<td>" + formatMoney(formatMoneyIsNull(details.details[i].payAmount)/100) + "</td>" +
					"</tr>" +
				"</table>";
}
$(".details-info").html(htmlInfo);

