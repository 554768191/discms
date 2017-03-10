/**
 * 
 */

// 获取onlineCode
$(function() {
	//获取onlineCode
	$.get('/index/getOnlineCodeByDomain',{},function(result){
		if(result&&result!='null'&&result!=undefined){
			localStorage.onlineCode = result;
			$('#onlineCode').val(result);
		}else{
			var onlineCode = localStorage.onlineCode;
			if (!onlineCode || onlineCode == undefined) {
				$.get('/index/getOnlineCode', {}, function(result) {
					if (result && result != undefined) {
						localStorage.onlineCode = result;
						$('#onlineCode').val(result);
					}
				});
			} else {
				$('#onlineCode').val(onlineCode);
			}
			$('.pos-ab').click(function() {
				displayPass();
			});
		}
	});
});

var verfiy = function() {
	var accountno = $('#accountno').val();
	var ver = $('#accountno').attr('ver');
	ver = ver.split('-');
	if (accountno.length < parseInt(ver[0])
			|| accountno.length > parseInt(ver[1])) {
		$.toast(languagePackage['input_username']);
		return false;
	}
	var ref = $('#accountno').attr('ref');
	if (ref == 1) {
		if (!/^(([a-zA-Z]+\d+)|(\d+[a-zA-Z]+))$/.test(accountno)) {
			$.toast($('#accountno').prop('placeholder'));
			return false;
		}
	}
	var password = $('#password').val();
	ver = $('#password').attr('ver');
	ver = ver.split('-');
	if (password.length < parseInt(ver[0])
			|| password.length > parseInt(ver[1])) {
		$.toast(languagePackage['input_password']);
		return false;
	}

	var confirmPassword = $('#confirmPassword').val();
	if (confirmPassword != password) {
		$.toast(languagePackage['password_not_equal']);
		return false;
	}

	if ($('#cashName')&&$('#cashName').length>0) {
		var cashName = $('#cashName').val();
		ver = $('#cashName').attr('ver');
		if (ver == 'true') {
			if (!cashName) {
				$.toast(languagePackage['input_cashName']);
				return false;
			}
			var ref = $('#cashName').attr('ref');
			if (ref && ref == 'true') {
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
					return flag;
				}
			}
		}
	}

	if ($('#cashPassword')&&$('#cashPassword').length>0) {
		var cashPassword = $('#cashPassword').val();
		ver = $('#cashPassword').attr('ver');
		ver = ver.split('-');
		if (cashPassword.length < parseInt(ver[0])
				|| cashPassword.length > parseInt(ver[1])) {
			$.toast(languagePackage['input_cashpassword']);
			return false;
		}
	}

	if ($('#phone')&&$('#phone').length>0) {
		var phone = $('#phone').val();
		ver = $('#phone').attr('ver');
		if (ver == 'true') {
			// 泰文电话号码验证
			if (localStorage.lang == 'kh_KH') {

			}
			var mobile = /^(13[0-9]|15[0-9]|18[8|9])\d{8}$/;
			var tel = /^\b\d{11}\b|\b\d{9}\b$/;
			if ((!tel.test(phone) && !mobile.test(phone))) {
				$.toast(languagePackage['input_phone']);
				return false;
			}
		}
	}
	
	if ($('#qq')&&$('#qq').length>0) {
		var qq = $('#qq').val();
		ver = $('#qq').attr('ver');
		if (ver == 'true') {
			if(!qq){
				$.toast(languagePackage['qq_format']);
				return false;
			}
		}
	}

	var captcha = $('#captcha').val();
	if (!captcha) {
		$.toast(languagePackage['input_captcha']);
		return false;
	}

	return true;

}

function reloadImage(obj) {
	obj.src = '/regCode.do?timestamp=' + new Date().getTime();
}

function sub() {
	if (!verfiy()) {
		return;
	}
	$.showPreloader('loading。。。')
	$.post('/member/register', $('form').serialize(), function(result) {
		$.hidePreloader();
		if (result) {
			switch (result) {
			case "0":
				window.location.href = 'index.html';
				return;
			case "-1":
				$.toast(languagePackage['captcha_error']);
				return false;
			case '00001':
				$.toast(languagePackage['exists_accountno']);
				return false;
			case '1':
				$.toast(languagePackage['exists_accountno']);
				return false;
			case '10001':
				$.toast('密码只能输入字母和数字');
				return false;
			default:
				$.toast(languagePackage['register_error']);
				return false;
			}
		}
		$.toast(languagePackage['register_error']);
		return false;
	});
}

function displayPass() {
	if ($('.pos-ab').val() == languagePackage['js_display']) {
		$('#password').prop("type", "text");
		$('.pos-ab').val(languagePackage['js_hide']);
	} else {
		$('#password').prop("type", "password");
		$('.pos-ab').val(languagePackage['js_display']);
	}
}
