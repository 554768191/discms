var date = new Date();
var year = date.getFullYear();   
var mouth = date.getMonth()+1;   
if(mouth < 10){
	mouth = "0"+mouth;
}
var day = date.getDate(); 
if(day < 10){
	day = "0"+day;
}
var hour = date.getHours(); 
if(hour < 10){
	day = "0"+hour;
}
var minute = date.getMinutes(); 
if(minute < 10){
	minute = "0"+minute;
}

$("#datetime-picker").datetimePicker({
	 toolbarTemplate: '<header class="bar bar-nav">\
		  <button class="button button-link pull-right close-picker">确定</button>\
		  <h1 class="title">请选择时间</h1>\
		  </header>',
	 value: [year, mouth, day, hour, minute]
  });

// 获取显示数据
var json = JSON.parse(localStorage.bankInfo);
if(json){
	if(json.payType=='4'){
		$(".bank-add-info").html('<a href="/src/weixinqr.html?qr='+json.record.bankAdress+'">查看二维码</a>');
	}else{
		$(".bank-add-info").html(json.record.bankAdress);
	}
	$(".bank-account-info").html(json.record.bankAcount);
	$(".bank-name-info").html(json.record.bankName);
	$(".bank-code-info").html(json.record.bankCode);
	$(".bank-orderid-info").html(json.record.orderid);
	$(".deposit-details-write .bank-orderid-info").html(json.record.orderid);
}

$(".details-submit-btn").click(function(){
	var minAmount=$('#minAmount').val();
	var maxAmount=$('#maxAmount').val();
	if(maxAmount){
		maxAmount=maxAmount.split(",");
		maxAmount=maxAmount.join("");
		maxAmount=parseFloat(maxAmount);
	}
	var orderId = json.record.orderid;
	var money = $(".deposit-money").val();
	var cashBankName = $(".bank-name-info").html();
	var cashBankAccountName = $(".deposit-account").val();
	var cashBankAccountno = $(".bank-code-info").html();
	var cashBankAddress = $(".bank-add-info").html();
	var wdType = $("#deposit-type").val();
	var reqTime = $("#datetime-picker").val();
	if(!money){
		$.toast(languagePackage["input_deposit_money_notNull"]);
		return;
	}
	if(parseFloat(money)<parseFloat(minAmount)){
		$.toast(languagePackage["money_min"]+minAmount);
		return;
	}
	if(parseFloat(money)>maxAmount){
		$.toast(languagePackage["money_max"]+maxAmount);
		return;
	}
	if(!cashBankAccountName){
		$.toast(languagePackage["input_deposit_account_notNull"]);
		return;
	}
	if(wdType == "0"){
		$.toast(languagePackage["select_deposit_type"]);
		return;
	}
	$.showPreloader('。。。');
	httpRequest.post(
		("/src/memeber/deposit2"),
		{
			orderId:orderId, 
			money:money, 
			cashBankName:cashBankName, 
			cashBankAccountName:cashBankAccountName,
			cashBankAccountno:cashBankAccountno,
			cashBankAddress:cashBankAddress,
			wdType:wdType,
			reqTime:reqTime
		},
		function(data){
			$.hidePreloader();
			if(data.code == "0"){
				$.toast(languagePackage["submit-success"]);
				window.location.href = "deposit3.html";
			}else{
				$.toast(languagePackage["submit-error"]);
			}
		}
	);
});


