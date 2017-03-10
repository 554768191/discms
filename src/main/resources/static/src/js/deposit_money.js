/**
 * Created by Ly on 2016/11/04.
 */

//获取个人信息
httpRequest.get(
  "/member/getAccountInfo",
  {},
  function(result){
	if(result){
		$('.account-no').html(result.accountno);
		//判断入款是否绑定手机号码
		if(bindPhone=='true'){
			if(!result.phone){
				window.location.href='edit_userinfo.html';
				return;
			}
		}
	}  
  }
);




// 获取存入银行
$.ajaxSettings.async = false;
$("#payment-type").change(function(){
	var id = $(this).val();
	var payType = $("#payment-type").find("option[value='"+ id +"']").attr("data-bank");
	if(!payType){
		$(".deposit-info").css("display","none");
	}
	if(payType){
		 $.showPreloader();
		$(".deposit-info").css("display","block");
		httpRequest.get(
				("/src/member/getCompanyBankInfo"),
				{payType:payType},
				function(data){
					$.ajaxSettings.async = true;
					 $.hidePreloader();
					var html = "";
					for(var i = 0; i<data.banks.length; i++){
						html += "<div class='row no-gutter'>" +
								"<div class='col-25'>" +
										"<input type='radio' name='change-bank' data-recordId=\"" + data.banks[i].recordId + 
										"\" data-bankName=\"" + data.banks[i].bankName + "\"></div>" +
								"<div class='col-75'>" +
								"<label><span>" + languagePackage["js_kaihuyinhangwangdian"] + ":</span>" + data.banks[i].bankAdress + "</label>" +
								"<label><span>" + languagePackage["js_shoukuanren"] + ":</span>" + data.banks[i].bankAcount + "</label>" +
								"<label><span>" + languagePackage["js_yinhang"] + ":</span>" + data.banks[i].bankName + "</label>" +
								"<label><span>" + languagePackage["js_zhanghao"] + ":</span>" + data.banks[i].bankCode + "</label>" +
								"</div> </div>";
					}
					$(".deposit-money-info").html(html);
				}
			);
	}
});

// 选择存入银行
$(function (){
	$(document).on("tap",".deposit-money-info .row",function(){
		$(this).find("input").prop("checked",true);
		$(this).siblings().find("input").removeAttr("checked");
	})
});

// 下一步操作
$(".payment-submit-btn").tap(function(){
	var id = $("#payment-type").val();
	var payType = $("#payment-type").find("option[value='"+ id +"']").attr("data-bank");
	var recordId = $(".deposit-money-info .row input[name='change-bank']:checked").attr("data-recordId")
	var bank = $(".deposit-money-info .row input[name='change-bank']:checked").attr("data-bankName");
	if($("#payment-type").val() == 0){
		$.toast(languagePackage["change_pay_bank"]);
		return;
	}
	if(!$(".deposit-money-info .row input[name='change-bank']:checked").val()){
		$.toast(languagePackage["change_deposit_bank"]);
		return;
	}
	httpRequest.post(
		("/src/memeber/deposit1"),
		{bank:bank, payType:payType, recordId:recordId},
		function(data){
			var obj = JSON.stringify(data);
			localStorage.bankInfo = obj;
			if(data.code == "0"){
				$.toast(languagePackage["submit-success"]);
				window.location.href = "deposit2.html";
			}else{
				$.toast(languagePackage["submit-error"]);
			}
		}
	);
	
});