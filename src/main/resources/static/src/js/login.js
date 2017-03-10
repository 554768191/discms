/**
 * Created by Ly on 2016/10/28.
 */


if(localStorage.login_username&&localStorage.login_username!=undefined){
	$(".username").val(localStorage.login_username);
}
if(localStorage.login_password&&localStorage.login_password!=undefined){
	$(".password").val(localStorage.login_password);
}
if(localStorage.login_remember&&localStorage.login_remember!=undefined&&localStorage.login_remember!="0"){
	$("#rememberPass").prop("checked","checked");
}


// 点击登录
$(".log-login-btn").tap(function(){
	var username = $(".username").val();
	var password = $(".password").val();
	if(username == "" || username == null){
		$.toast(languagePackage["username_notNull"]);
		return;
	}
	if(password == "" || password == null){
		$.toast(languagePackage["password_notNull"]);
		return;
	}
	if($('#rememberPass').prop('checked')){
		localStorage.login_remember="1";
		localStorage.login_username=username;
		localStorage.login_password=password;
	}else{
		localStorage.login_remember="0";
		localStorage.login_username="";
		localStorage.login_password="";
	}
	$.showPreloader('loading。。。');
	httpRequest.post(
		"/member/login",
		{accountno:username,password:password},
		function(data){
			$.hidePreloader();
			if(data.code == 0){
				window.location.href = "/index.html";
			}else{
				toastError(data.code);
			}
		}
	);
});

//登录返回错误提示
function toastError(code){
	switch (code) {
	case 10001:
		$.toast(languagePackage["login_input_error"]);
		break;
	case 10002:
		$.toast(languagePackage["password_error"]);
		break;
	case 10003:
		$.toast(languagePackage["account_locked"]);
		break;		
	default:
		$.toast(languagePackage["login_error"]);
	    break;
	}
}

// 忘记密码
$(".forgetPwd").tap(function(){
	$.toast(languagePackage["contact-customer-service"]);
});

function testlogin(){
	$.showPreloader('loading。。。');
	httpRequest.get(
			"/testlogin",
			{},
			function(data){
				$.hidePreloader();
				if(data.code == 0){
					localStorage.login_username=data.accountno;
					localStorage.login_password=data.password;
					window.location.href = "/index.html";
				}else{
					$.toast(data.msg);
				}
			}
		);
}
