/**
 * Created by Ly on 2016/11/03.
 */

// 显示会员账户
$.ajaxSettings.async = false;
var cashPassword;
httpRequest.get(
	("/member/getAccountInfo"),
	{},
	function(data){
		$.ajaxSettings.async = true;
		$(".account-no").html(data.accountno);
		cashPassword = data.cashPassword;
	}
);

// 取款密码为空，设置取款密码
if($("#password-type").val() == "2"){
	$(".old-password").attr("maxlength","4");
	$(".new-password").attr("maxlength","4");
	$(".confirm-password").attr("maxlength","4");
	$(".old-password").attr("placeholder",languagePackage["withdrawal_password_four_num"]);
	$(".new-password").attr("placeholder",languagePackage["withdrawal_password_four_num"]);
	if(!cashPassword){
		$(".password-list").children("div").eq(2).css("display","none");
	}
}else{
	$(".password-list").children("div").eq(2).css("display","block");
	$(".old-password").removeAttr("maxlength");
	$(".new-password").removeAttr("maxlength");
	$(".confirm-password").removeAttr("maxlength");
	$(".old-password").attr("placeholder",languagePackage["login_password_6-15"]);
	$(".new-password").attr("placeholder",languagePackage["login_password_6-15"]);
}

$("#password-type").change(function(){
	if($("#password-type").val() == "2"){
		$(".old-password").attr("maxlength","4");
		$(".new-password").attr("maxlength","4");
		$(".confirm-password").attr("maxlength","4");
		$(".old-password").attr("placeholder",languagePackage["withdrawal_password_four_num"]);
		$(".new-password").attr("placeholder",languagePackage["withdrawal_password_four_num"]);
		if(!cashPassword){
			$(".password-list").children("div").eq(2).css("display","none");
		}
	}else{
		$(".password-list").children("div").eq(2).css("display","block");
		$(".old-password").removeAttr("maxlength");
		$(".new-password").removeAttr("maxlength");
		$(".confirm-password").removeAttr("maxlength");
		$(".old-password").attr("placeholder",languagePackage["login_password_6-15"]);
		$(".new-password").attr("placeholder",languagePackage["login_password_6-15"]);
	}
});

// 提交操作
$(".password-edit-btn").tap(function(){
	// 修改密码
	var changType = $("#password-type").val();
	var oldPassword = $(".old-password").val();
	var newPassword = $(".new-password").val();
	var confirmPassword = $(".confirm-password").val();
	if(newPassword != confirmPassword){
		$.toast(languagePackage["newPassword_confirm"]);
		return;
	}
	if(changType == "1" || (changType == "2" && cashPassword)){
		if(changType == "2"){
			if(newPassword.length != 4 || oldPassword.length != 4 || confirmPassword.length != 4){
				$.toast(languagePackage["withdrawal_password_is_four"]);
				return;
			}
			if(!/^[0-9]*$/.test(newPassword) || !/^[0-9]*$/.test(oldPassword) || !/^[0-9]*$/.test(confirmPassword)){
				$.toast(languagePackage["withdrawal_password_is_four"]);
				return;
			}
		}
		httpRequest.post(
			("/src/member/changePassword"),
			{changType:changType, oldPassword:oldPassword, newPassword:newPassword},
			function(data){
				if(data.code == "0"){
					$.toast(languagePackage["submit-success"]);
					if(changType == "1"){
						window.location.href = "login.html";
					}else{
						window.location.href = "my.html";
					}	
				}else{
					$.toast(languagePackage["submit-error"]);
				}
			}
		);
	}else{
		if(!/^[0-9]*$/.test(newPassword) || !/^[0-9]*$/.test(confirmPassword)){
			$.toast(languagePackage["withdrawal_password_is_four"]);
			return;
		}
		httpRequest.post(
			("/src/member/saveMemberInfo"),
			{cashPassword:newPassword},
			function(data){
				if(data.code == "0"){
					$.toast(languagePackage["submit-success"]);
					window.location.href = "my.html";
				}else{
					$.toast(languagePackage[data.msg]);
				}
			}
		)
	}
});


