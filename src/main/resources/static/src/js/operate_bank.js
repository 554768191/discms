/**
 * Created by Ly on 2016/11/02.
 */

// 获取银行卡信息
httpRequest.get(
	"/src/member/myBankInfo",
	{},
	function(data){
		if(data.bankName){
			var bankName = data.bankName;
			$("#bank-name").find("option[value="+ bankName +"]").attr("selected","selected");
		}
		if(data.cashName){
			$(".real-name").val(data.cashName);
			var ver=$(".real-name").attr('ver');
			if(ver=="true"){
				$(".real-name").prop('disabled','disabled');
			}
		}
		if(data.bankAccount){
			$(".account-no").val(data.bankAccount);
		}
		if(data.cashBankAddress){
			$(".bank-address").val(data.cashBankAddress);
		}
	}
);

// 编辑操作
$(".sumbit-btn").tap(function(){
	var bankName = $("#bank-name").val();
	var bankAccount = $(".account-no").val();
	var cashBankAddress = $(".bank-address").val();
	var cashName = $(".real-name").val();
	var cashPassword = $(".bank-password").val();
	if(bankName == "" || bankName == null){
		$.toast(languagePackage["change_deposit_bank"]);
		return;
	}
	if(bankAccount == "" || bankAccount == null){
		$.toast(languagePackage["bank_account_notNull"]);
		return;
	}
	if(!/^[0-9]*$/.test(bankAccount)){
		$.toast(languagePackage["bank_account_format"]);
		return;
	}
	if(cashBankAddress == "" || cashBankAddress == null){
		$.toast(languagePackage["bank_cashAddress_notNull"]);
		return;
	}
	if(cashName == "" || cashName == null){
		$.toast(languagePackage["bank_cashName_notNull"]);
		return;
	}
	if(cashPassword.length != 4){
		$.toast(languagePackage["withdrawal_password_is_four"]);
		return;
	}
	if(!/^[0-9]*$/.test(cashPassword)){
		$.toast(languagePackage["withdrawal_password_is_four"]);
		return;
	}
	$.showPreloader('。。。');
	httpRequest.post(
		"/src/member/saveBankInfo",
		{bankName:bankName, cashBankAccount:bankAccount, cashBankAddress:cashBankAddress, cashName:cashName, cashPassword:cashPassword},
		function(data){
			$.hidePreloader();
			if(data.code == "0"){
				$.toast(languagePackage["submit-success"]);
				window.location.href = "banks.html";
			}else if(data.code == "10004"){
				$.toast(languagePackage["bank_account_exists"]);
			}else{
				$.toast(languagePackage[data.msg]);
			}
		}
	);
});
