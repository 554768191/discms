/**
 * Created by Ly on 2016/11/03.
 */

// 获取银行信息
httpRequest.get(
	("/src/member/myAccountAndBankInfo"),
	{},
	function(data){
		if(!data.bankName || !data.bankAccount || !data.cashBankAddress){
			window.location.href = "banks_edit.html";
		}else{
			$(".account-no").html(data.accountno);
			$(".account-balance").html(formatMoney(formatMoneyIsNull(data.balance)/100));
			$(".bank-name").html(data.bankName);
			var strba = data.bankAccount;
			var bankAccount = strba.substr(strba.length-4);
			$("#bank-no").val(strba);
			$(".bank-no").html("**** **** **** " + bankAccount);
			var strcn = data.cashName;
			var cashName = strcn.substr(strcn.length-1);
			$("#real-name").val(strcn);
			$(".real-name").html("*" +cashName);
		}
	}
)


function sub(){
	var minAmount=$('#minAmount').val();
	var maxAmount=$('#maxAmount').val();
	var balance=$('.account-balance').html();
	
	if(balance){
		balance=balance.split(",");
		balance=balance.join("");
	}
	
	if(maxAmount){
		maxAmount=maxAmount.split(",");
		maxAmount=maxAmount.join("");
	}
	
	var money=$('#draw-sum').val();
	if(!money){
		$.toast(languagePackage["money_is_not_null"]);
		return;
	}
	if(money>parseFloat(balance)){
		$.toast(languagePackage["balance_is_not_enough"]);
		return;
	}
	if(money<minAmount){
		$.toast(languagePackage["money_min"]+minAmount);
		return;
	}
	if(money>parseFloat(maxAmount)){
		$.toast(languagePackage["money_max"]+maxAmount);
		return;
	}
	var cashPassword=$('#cashPassword').val();
	if(!cashPassword){
		$.toast(languagePackage["password_notNull"]);
		return;
	}
	var bankName=$('.bank-name').html();
	//var cashName=$('.real-name').html();
	var cashName = $("#real-name").val();
	//var cashBankAccountno=$('.bank-no').html();
	var cashBankAccountno = $("#bank-no").val();
	$.showPreloader('。。。')
	$.post(
		'/src/member/withoutMoney',	
	    {cashPassword:cashPassword,money:money,bankName:bankName,cashName:cashName,cashBankAccountno:cashBankAccountno}, 
	    function(result){
	    	$.hidePreloader();
	    	if(result){
	    		var json=$.parseJSON(result);
	    		if(json.code=='0'){
	    			$.toast(languagePackage["submit-success"]);
	    		}else{
	    			if('10002'==json.code){
	    				$.toast(languagePackage["cash_password_error"]);
	    				return;
	    			}
	    			if(json.msg){
	    				$.toast(json.msg);
	    			}else{
	    				$.toast(languagePackage["submit-error"]);
	    			}
	    		}
	    	}
	    }
	);
}



