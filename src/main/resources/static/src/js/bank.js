/**
 * Created by Ly on 2016/11/02.
 */

// 显示银行卡
httpRequest.get(
	"/src/member/myBankInfo",
	{},
	function(data){
		if(!data){
			return;
		}
		var html = "";
		if(data.bankAccount){
			$('.isnull').hide();
			var str = data.bankAccount;
			var bankAccount = str.substr(str.length-4);
		}
		if(data.bankName){
			html = "<div class='bank_info row no-gutter'>"+
   			"<div class='col-25 bank_name'>" +
   			"	<div><span>" + data.bankName + "</span></div>" +
   			"</div>" +
   			"<div class='col-75 bank_detail'>" +
   			"	<div><span><i>**** **** ****</i> " + bankAccount + "</span></div>" +
   			"	<div><span>" + data.cashBankAddress + "</span></div>" +
   			"</div>" +
			"</div>";
		}
		$(".bank_list").html(html);
	}
);