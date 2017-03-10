/**
 * Created by Ly on 2016/11/12.
 */

if(bindPhone=='true'){
//获取个人信息
httpRequest.get(
  "/member/getAccountInfo",
  {},
  function(result){
	if(result){
		$('.account-no').html(result.accountno);
		//判断入款是否绑定手机号码
			if(!result.phone){
				window.location.href='edit_userinfo.html';
				return;
			}
	}  
  }
);}



// 获取支付方式
httpRequest.get(
	("/src/userpayments"),
	{},
	function(data){
		data = data.data;
		var html = "<option value='0'>" + languagePackage["js_qingxuanze"] + "</option>";
		for(var i=0; i <data.length; i++){
			html += "<option value='" + data[i].id + "' data-sn='" + data[i].sn + "' bankId='"+data[i].bankId+"'>" + data[i].name + "</option>";
		}
		$("#online-payment-type").html(html);
	}
)

// 提交支付
$(".payment-submit-btn").tap(function(){
	var type = $("#online-payment-type").val();
	var money = $(".pay-money").val();
	
	if(maxAmount){
		maxAmount=maxAmount.split(",");
		maxAmount=maxAmount.join("");
	}
	
	if(type == "0"){
		$.toast(languagePackage["select_pay_way"]);
		return;
	}
	if(!/^[0-9]*$/.test(money)){
		$.toast(languagePackage["input_pay_money"]);
		return;
	}
	if(parseFloat(money)<parseFloat(minAmount)){
		$.toast(languagePackage["money_min"]+minAmount);
		return;	
	}
	if(parseFloat(money)>parseFloat(maxAmount)){
		$.toast(languagePackage["money_max"]+maxAmount);
		return;	
	}
	
	var sn = $("#online-payment-type").find("option[value='"+ type +"']").attr("data-sn");
	var bid = $("#online-payment-type").find("option[value='"+ type +"']").attr("bankId");
	var url = "/src/" + sn + "/sub";
	$.showPreloader('。。。');
	httpRequest.get(
		url,
		{amount:money,bankId:type,id:bid},
		function(data){
			$.hidePreloader();
			if(data&&data.code==0){
				$.showPreloader('。。。');
				if(data.bindUrl&&data.bindUrl!=undefined){
					var html="";
					html+='<input name="method" value="'+data.method+'"/>';
					html+='<input name="url" value="'+data.msg+'"/>';
					if(data.params&&data.params!=undefined){
					   html+='<input name="requestJSON" value=\''+JSON.stringify(data.params)+'\'/>';
					}
					$('form').html(html);
					$('form').prop('method','POST');
					$('form').prop('action',data.bindUrl+'/bindPost');
					$('form').submit();
					return;
				}
				if(data.method=='GET'){
					window.location.href=data.msg;
					return;
				}
				if(data.method=="POST"){
					var html="";
					for(var key in data.params){
						html+='<input name="'+key+'" value="'+data.params[key]+'"/>';
					}
					$('form').html(html);
					$('form').prop('method','POST');
					$('form').prop('action',data.msg);
					$('form').submit();
				}
				
			}
		}
	)
});
