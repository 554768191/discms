/**
 * Created by Ly on 2016/11/02.
 */

// 显示用户信息
httpRequest.get(
	("/src/member/getMemberInfo"),
	{},
	function(data){
		if(data.cashName){
			$(".real-name").val(data.cashName);
			$(".real-name").prop('disabled','disabled');
		}
		if(data.phone){
			$(".phone").val(data.phone);
			$(".phone").prop('disabled','disabled');
		}
		if(data.email){
			$(".email").val(data.email);
			$(".email").prop('disabled','disabled');
		}
		if(data.qq){
			$(".qq").val(data.qq);
			$(".qq").prop('disabled','disabled');
		}
	}
)

// 提交操作
$(".userinfo-edit-btn").tap(function(){
	/*var cashName = $(".real-name").val();
	var phone = $(".phone").val();*/
	var email = $(".email").val();
	var qq = $(".qq").val();
	/*if(phone != null && phone != ""){
		if(!/^1[3|4|5|7|8][0-9]{9}$/.test(phone)){
			$.toast(languagePackage["phone_format"]);
			return;
		}
	}*/
	if(email != null && email != ""){
		if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
			$.toast(languagePackage["email_format"]);
			return;
		}
	}
    /*if(cashName&&cashName!=undefined){
    	var flag = true;
		// 验证取款人姓名是否重名
		$.ajax({
			async : false,
			type : 'GET',
			url : '/member/verfiyName',
			data : {
				cashName : cashName
			},
			success : function(result) {
				if (result && result != undefined) {
					var json = $.parseJSON(result);
					if (json.code != '0') {
						flag = false;
						$.toast(languagePackage['cashName_exits']);
						return false;
					} else {
						flag = true;
					}
				}
			}
		});
		if (!flag) {
			$.toast(languagePackage['cashName_exits']);
			return;
		}
    }*/
	$.showPreloader('。。。');
	httpRequest.post(
		("/src/member/saveMemberInfo"),
		{email:email ,qq:qq},
		function(data){
			$.hidePreloader();
			if(data.code == "0"){
				$.toast(languagePackage["submit-success"]);
				window.location.href = "my.html";
			}else{
				$.toast(languagePackage[data.msg]);
			}
		}
	);
});
