/**
 * Created by Ly on 2016/10/28.
 */


// 切换图标
var my = $("#nav-list #nav-my");
if(my.is(".active")){
	$(".active .icon .bar-img").attr("src","../img/icon/my_active.png");
}


// 用户登录信息
httpRequest.get(
	"/member/getAccountInfo",
	{},
	function(data){
		if(data){
			$(".user_name").html(data.accountno);
			$(".user_balance").html(formatMoney(formatMoneyIsNull(data.balance)/100));
		}
	}
);

// 点击刷新
$(".header-img-right").tap(function(){
	$.showIndicator();
	httpRequest.get(
			"/member/getAccountInfo",
			{},
			function(data){
				if(data){
					$(".user_name").html(data.accountno);
					$(".user_balance").html(formatMoney(formatMoneyIsNull(data.balance)/100));
					setTimeout(function () {
				        $.hideIndicator();
				    }, 2000);
				}
			}
		);
});

// 退出登录
$(".reg-register-btn").tap(function(){
	$.get("/src/member/logout",{},function(){window.location.href = "login.html";});	
	
});




