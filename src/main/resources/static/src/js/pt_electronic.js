/**
 * Created by Ly on 2016/11/09.
 */

// 轮播图
$(".swiper-container").swiper({autoplay: 5000});

//用户登录信息
httpRequest.get(
	"/member/getAccountInfo?_="+new Date().getTime(),
	{},
	function(data){
		if(data){
			$("#userlogin-balance").attr("href","wallet.html");
			$("#userlogin-img").attr("href","wallet.html");
			$("#userlogin-balance").find("span").html(formatMoney(formatMoneyIsNull(data.balance)/100));
			$("#userlogin-img").find("img").attr("src","../img/icon/cash.png");
		}
	}
);

httpRequest.get(
		"/src/pt/index?_="+new Date().getTime(),
		{},
		function(result){
	    	if(result){
	    		if(result.code==0){
	    			var username = result.accountno.toUpperCase();
	                var pwd = result.password;
	                $("#c_username").attr("value", username);
	                $("#c_password").attr("value", pwd);
	                login(1);                
	                $.showPreloader('loading。。。')
	    		}else{
	    			alert(result.msg);
	    		}
	    	}
	    });

// 热门游戏
var hot_game_data = [
          	        { eventFn: "ano", imgSrc: "ano.png", cn_ZH: "一夜奇遇", cn_HK: "一夜奇遇", en_US: "One Night Adventure" },
          	        { eventFn: "art", imgSrc: "art.png", cn_ZH: "北极宝藏", cn_HK: "北極寶藏", en_US: "Arctic Treasure" },
          	        { eventFn: "bl", imgSrc: "bl.png", cn_ZH: "海滨嘉年华", cn_HK: "海濱嘉年華", en_US: "Beach Life" },
          	        { eventFn: "bob", imgSrc: "bob.png", cn_ZH: "奖金熊", cn_HK: "獎金熊", en_US: "Bonus Bears" },
          	        { eventFn: "ct", imgSrc: "ct.png", cn_ZH: "船长的宝藏", cn_HK: "船長的寶藏", en_US: "Captains Treasure" },
          	        { eventFn: "ir2", imgSrc: "ir2.png", cn_ZH: "钢铁侠2", cn_HK: "鋼鐵俠2", en_US: "Iron Man 2" },
          	        { eventFn: "hlk2", imgSrc: "hlk2.png", cn_ZH: "绿巨人", cn_HK: "綠巨人", en_US: "Hulk" },
          	        { eventFn: "irmn3", imgSrc: "irmn3.png", cn_ZH: "钢铁侠3", cn_HK: "鋼鐵俠3", en_US: "Iron Man 3" },
          	        { eventFn: "jpgt", imgSrc: "jpgt.png", cn_ZH: "中奖的巨人", cn_HK: "中獎的巨人", en_US: "Jackpot Giant" },
          	        { eventFn: "kkg", imgSrc: "kkg.png", cn_ZH: "无敌金刚", cn_HK: "無敵金剛", en_US: "Invincible King Kong" },
          	        { eventFn: "lm", imgSrc: "lm.png", cn_ZH: "疯狂乐透", cn_HK: "瘋狂樂透", en_US: "Lotto Madness" },
          	        { eventFn: "gtsmrln", imgSrc: "gtsmrln.png", cn_ZH: "玛丽莲梦露", cn_HK: "瑪麗蓮夢露", en_US: "Marilyn Monroe" }
          	     ];

// 桌面&卡牌游戏
var table_card_data = [
            	        { eventFn: "ba", imgSrc: "ba.png", cn_ZH: "百家乐", cn_HK: "百家樂", en_US: "Baccarat" },
            	        { eventFn: "bjs", imgSrc: "bjs.png", cn_ZH: "魔幻21点", cn_HK: "魔幻21點", en_US: "Blackjack Switch" },
            	        { eventFn: "cheaa", imgSrc: "cheaa.png", cn_ZH: "赌场HOLD'EM游戏", cn_HK: "賭場HOLD'EM遊戲", en_US: "Casino Holdem" },
            	        { eventFn: "mobro", imgSrc: "mobro.png", cn_ZH: "欧洲轮盘", cn_HK: "歐洲輪盤", en_US: "European Roulette" },
            	        { eventFn: "bjp", imgSrc: "bjp.png", cn_ZH: "完美的游戏", cn_HK: "完美的遊戲", en_US: "Perfect Blackjack" }
                    ];

// 老虎机
var slot_machines_data = [
               	        { eventFn: "ano", imgSrc: "ano.png", cn_ZH: "一夜奇遇", cn_HK: "一夜奇遇", en_US: "One Night Adventure" },
               	        { eventFn: "art", imgSrc: "art.png", cn_ZH: "北极宝藏", cn_HK: "北極寶藏", en_US: "Arctic Treasure" },
               	        { eventFn: "bl", imgSrc: "bl.png", cn_ZH: "海滨嘉年华", cn_HK: "海濱嘉年華", en_US: "Beach Life" },
               	        { eventFn: "bob", imgSrc: "bob.png", cn_ZH: "奖金熊", cn_HK: "獎金熊", en_US: "Bonus Bears" },
               	        { eventFn: "ct", imgSrc: "ct.png", cn_ZH: "船长的宝藏", cn_HK: "船長的寶藏", en_US: "Captains Treasure" },
               	        { eventFn: "catqc", imgSrc: "catqc.png", cn_ZH: "猫女王", cn_HK: "貓女王", en_US: "Cat Queen" },
               	        { eventFn: "chl", imgSrc: "chl.png", cn_ZH: "樱桃爱恋", cn_HK: "櫻桃愛戀", en_US: "Cherry Love" },
               	        { eventFn: "mobdt", imgSrc: "mobdt.png", cn_ZH: "沙漠宝藏", cn_HK: "沙漠寶藏", en_US: "Desert Treasure" },
               	        { eventFn: "dlm", imgSrc: "dlm.png", cn_ZH: "情圣博士", cn_HK: "情聖博士", en_US: "Dr Lovemore" },
               	        { eventFn: "eas", imgSrc: "eas.png", cn_ZH: "惊喜复活节", cn_HK: "驚喜複活節", en_US: "Surprising Easter Day" },
               	        { eventFn: "esm", imgSrc: "esm.png", cn_ZH: "艾丝美拉达", cn_HK: "艾絲美拉達", en_US: "Esmeralda" },
               	        { eventFn: "fsf", imgSrc: "fsf.png", cn_ZH: "神奇四侠", cn_HK: "神奇四俠", en_US: "Fantastic Four" },
               	        { eventFn: "fdt", imgSrc: "fdt.png", cn_ZH: "戴图理的神奇七", cn_HK: "戴圖理的神奇七", en_US: "Frankie Dettori Magic seven" },
               	        { eventFn: "fdtjg", imgSrc: "fdtjg.png", cn_ZH: "戴图理的神奇七大奖", cn_HK: "戴圖理的神奇七大獎", en_US: "Frankie Dettori's Magic Seven Jackpot Gamble" },
               	        { eventFn: "ashfmf", imgSrc: "ashfmf.png", cn_ZH: "满月的命运", cn_HK: "滿月的命運", en_US: "Full Moon Fortunes" },
               	        { eventFn: "fnfrj", imgSrc: "fnfrj.png", cn_ZH: "酷炫水果", cn_HK: "酷炫水果", en_US: "Funky Fruits" },
               	        { eventFn: "ges", imgSrc: "ges.png", cn_ZH: "艺伎故事", cn_HK: "藝伎故事", en_US: "Geisha Story" },
               	        { eventFn: "glrj", imgSrc: "glrj.png", cn_ZH: "角斗士大奖", cn_HK: "角鬥士大獎", en_US: "Gladiator Jackpot" },
               	        { eventFn: "bib", imgSrc: "bib.png", cn_ZH: "湛蓝深海", cn_HK: "湛藍深海", en_US: "Great Blue" },
               	        { eventFn: "hf", imgSrc: "hf.png", cn_ZH: "万圣节财富", cn_HK: "萬聖節財富", en_US: "Halloween Fortune" },
               	        { eventFn: "ashhotj", imgSrc: "ashhotj.png", cn_ZH: "丛林之心", cn_HK: "叢林之心", en_US: "The Heart of Jungle" },
               	        { eventFn: "hk", imgSrc: "hk.png", cn_ZH: "公路之王", cn_HK: "公路之王", en_US: "Highway Kings" },
               	        { eventFn: "irl", imgSrc: "irl.png", cn_ZH: "爱尔兰的好运", cn_HK: "愛爾蘭的好運", en_US: "Irish Luck" },
               	        { eventFn: "ir2", imgSrc: "ir2.png", cn_ZH: "钢铁侠2", cn_HK: "鋼鐵俠2", en_US: "Iron Man 2" },
               	        { eventFn: "hlk2", imgSrc: "hlk2.png", cn_ZH: "绿巨人", cn_HK: "綠巨人", en_US: "Hulk" },
               	        { eventFn: "irmn3", imgSrc: "irmn3.png", cn_ZH: "钢铁侠3", cn_HK: "鋼鐵俠3", en_US: "Iron Man 3" },
               	        { eventFn: "jpgt", imgSrc: "jpgt.png", cn_ZH: "中奖的巨人", cn_HK: "中獎的巨人", en_US: "Jackpot Giant" },
               	        { eventFn: "kkg", imgSrc: "kkg.png", cn_ZH: "无敌金刚", cn_HK: "無敵金剛", en_US: "Invincible King Kong" },
               	        { eventFn: "lm", imgSrc: "lm.png", cn_ZH: "疯狂乐透", cn_HK: "瘋狂樂透", en_US: "Lotto Madness" },
               	        { eventFn: "gtsmrln", imgSrc: "gtsmrln.png", cn_ZH: "玛丽莲梦露", cn_HK: "瑪麗蓮夢露", en_US: "Marilyn Monroe" },
               	        { eventFn: "mrcb", imgSrc: "mrcb.png", cn_ZH: "返现先生", cn_HK: "返現先生", en_US: "Mr. Cashback" },
               	        { eventFn: "pmn", imgSrc: "pmn.png", cn_ZH: "月下黑豹", cn_HK: "月下黑豹", en_US: "Panther Moon" },
               	        { eventFn: "pgv", imgSrc: "pgv.png", cn_ZH: "企鹅的假期", cn_HK: "企鵝的假期", en_US: "Penguin Vacation" },
               	        { eventFn: "pst", imgSrc: "pst.png", cn_ZH: "法老王的秘密", cn_HK: "法老王的秘密", en_US: "Pharaohs Secrets" },
               	        { eventFn: "pnp", imgSrc: "pnp.png", cn_ZH: "粉红豹", cn_HK: "粉紅豹", en_US: "Pink Panther" },
               	        { eventFn: "gtssmbr", imgSrc: "gtssmbr.png", cn_ZH: "巴西桑巴", cn_HK: "巴西桑巴", en_US: "amba Brazil" },
               	        { eventFn: "ssp", imgSrc: "ssp.png", cn_ZH: "圣诞奇迹", cn_HK: "聖誕奇迹", en_US: "Santa Surprise" },
               	        { eventFn: "shmst", imgSrc: "shmst.png", cn_ZH: "夏洛克的秘密", cn_HK: "夏洛克的秘密", en_US: "Sherlock Mystery" },
               	        { eventFn: "sis", imgSrc: "sis.png", cn_ZH: "沉默的武士", cn_HK: "沈默的武士", en_US: "Silent Samurai" },
               	        { eventFn: "sib", imgSrc: "sib.png", cn_ZH: "银弹", cn_HK: "銀彈", en_US: "Silver Bullet" },
               	        { eventFn: "spidc", imgSrc: "spidc.png", cn_ZH: "蜘蛛侠", cn_HK: "蜘蛛俠", en_US: "蜘蛛俠" },
               	        { eventFn: "sol", imgSrc: "sol.png", cn_ZH: "好运连胜", cn_HK: "好運連勝", en_US: "Streak of Luck" },
               	        { eventFn: "cnpr", imgSrc: "cnpr.png", cn_ZH: "甜蜜派对", cn_HK: "甜蜜派對", en_US: "Sweet Party" },
               	        { eventFn: "tpd2", imgSrc: "tpd2.png", cn_ZH: "泰国天堂", cn_HK: "泰國天堂", en_US: "Thai Paradise" },
               	        { eventFn: "tmqd", imgSrc: "tmqd.png", cn_ZH: "三个火枪手", cn_HK: "三個火槍手", en_US: "The Three Musketeers" },
               	        { eventFn: "whk", imgSrc: "whk.png", cn_ZH: "白色狮王", cn_HK: "白色獅王", en_US: "White King" },
               	        { eventFn: "gtswg", imgSrc: "gtswg.png", cn_ZH: "疯狂赌徒", cn_HK: "瘋狂賭徒", en_US: "Wild Gambler" },
               	        { eventFn: "wlg", imgSrc: "wlg.png", cn_ZH: "舞龙", cn_HK: "舞龍", en_US: "Dragon Dance" },
               	        { eventFn: "xmn50", imgSrc: "xmn50.png", cn_ZH: "X战警50线", cn_HK: "X戰警50線", en_US: "X-Men 50 Lines" },
               	        { eventFn: "zcjb", imgSrc: "zcjb.png", cn_ZH: "招财进宝", cn_HK: "招財進寶", en_US: "Zhao Cai Jin Bao" },
               	        { eventFn: "nian", imgSrc: "nian.png", cn_ZH: "年年有余", cn_HK: "年年有余", en_US: "Nian Nian You Yu" },
               	        { eventFn: "vcstd", imgSrc: "vcstd.png", cn_ZH: "豪华假期", cn_HK: "豪華假期", en_US: "Vacation Station Deluxe" },
               	        { eventFn: "ir", imgSrc: "ir.png", cn_ZH: "浮冰流", cn_HK: "浮冰流", en_US: "Ice Run" },
               	        { eventFn: "donq", imgSrc: "donq.png", cn_ZH: "堂吉诃德的财富", cn_HK: "堂吉诃德的財富", en_US: "The Riches of Don Quixote" },
               	        { eventFn: "ashcpl", imgSrc: "ashcpl.png", cn_ZH: "宝物箱中寻", cn_HK: "寶物箱中尋", en_US: "Chests of Plenty" },
               	        { eventFn: "ashwgaa", imgSrc: "ashwgaa.png", cn_ZH: "疯狂赌徒北极探险", cn_HK: "瘋狂賭徒北極探險", en_US: "Wild Gambler Arctic Adventure" },
               	        { eventFn: "mobbj", imgSrc: "mobbj.png", cn_ZH: "21点", cn_HK: "21點", en_US: "Blackjack" },
               	        { eventFn: "gtspor", imgSrc: "gtspor.png", cn_ZH: "非常幸运", cn_HK: "非常幸運", en_US: "Plenty O Fortune" },
               	        { eventFn: "avng", imgSrc: "avng.png", cn_ZH: "复仇者联盟", cn_HK: "複仇者聯盟", en_US: "The Avengers" }
                       ];

// 渲染游戏
function RenderData(game,gameId){
	var html = "";
	for(var i=0; i<game.length; i++){
		html += "<div class='col-33 text-center' style='padding: 0.75rem;'>" +
		"<a href='javascript:void(0)' onclick=\"askTempandLaunchGame(\'ngm\',\'" + game[i].eventFn + "\')\"><div><img src='../img/pt/" + game[i].imgSrc + "' style='max-width: 100%'></div>" +
		"<div><span class='font-black font-small'>" + game[i].cn_ZH + "</span></div></a>" +
		"</div>";
	};
	gameId.html(html);
}

// 渲染热门游戏
RenderData(hot_game_data,$("#hotGames"));
//点击显示隐藏
$("#hotGamesShow").tap(function(){
	$("#hotGames").toggle();
	$("#videoPokerGames").hide();
	$("#tableGames").hide();
	$("#slotsGames").hide();
})
// 渲染电子扑克
var html = "<div class='col-33 text-center' style='padding: 0.75rem;'>" +
	"<a href='javascript:void(0)' onclick=\"askTempandLaunchGame('ngm', 'jb_mh50')\"><div><img src='../img/pt/jb_mh50.png' style='max-width: 100%'></div>" +
	"<div><span class='font-black font-small'> 对J高手 </span></div></a>" +
	"</div>";
$("#videoPokerGames").html(html);
//点击显示隐藏
$("#videoPokerGamesShow").tap(function(){
	$("#videoPokerGames").toggle();
	$("#hotGames").hide();
	$("#tableGames").hide();
	$("#slotsGames").hide();
})
// 渲染桌面&卡牌游戏
RenderData(table_card_data,$("#tableGames"));
//点击显示隐藏
$("#tableGamesShow").tap(function(){
	$("#tableGames").toggle();
	$("#hotGames").hide();
	$("#videoPokerGames").hide();
	$("#slotsGames").hide();
})
// 渲染老虎机
RenderData(slot_machines_data,$("#slotsGames"));
//点击显示隐藏
$("#slotsGamesShow").tap(function(){
	$("#slotsGames").toggle();
	$("#hotGames").hide();
	$("#videoPokerGames").hide();
	$("#tableGames").hide();
})
// 默认隐藏游戏列表
$("#videoPokerGames").hide();
$("#tableGames").hide();
$("#slotsGames").hide();

iapiSetCallout('Login', calloutLogin);

function login(realMode) {
    iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
    iapiLogin(document.getElementById("loginform").username.value, document.getElementById("loginform").password.value, realMode, "en");
}

function calloutLogin(response) {

    if (response.errorCode) {
    	// 隐藏正在登陆提示
    	$.hidePreloader();
    	alert(response.errorCode);
    } else {
    	
    	// 隐藏正在登陆提示
    	$.hidePreloader();
    }
}

/*******************************************************登陆前后*********************************************************/

function getUrlVars() {
	var vars = {};
	var windowHref = window.location.href + "?username=" + document.getElementById("loginform").username.value;
	var parts = windowHref.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

iapiSetCallout('GetTemporaryAuthenticationToken', calloutGetTemporaryAuthenticationToken);

function askTempandLaunchGame(type, game) {
	
	currentgame = game;
	gametype = type;
	var realMode = 1;
	iapiRequestTemporaryToken(realMode, '698', 'GamePlay');	
}

function launchMobileClient(temptoken) {
	var clientUrl = "";
	if (gametype == "mps") {
		clientUrl=''+'?username=' + getUrlVars()["username"] + '&temptoken=' + temptoken + '&game=' + currentgame + '&real=1';
	} else if (gametype = "ngm") {
		var language=localStorage.lang;
		switch (language) {
		case 'zh_CN':
			language='zh-cn';
			break;
		case 'en_UK':
			language='en';
			break;
		case 'zh_HK':
			language='zh-hk';
			break;
		default:
			language='en';
			break;
		}
		clientUrl = 'http://hub.gm175888.com/igaming/' + '?gameId=' + currentgame + '&real=1' + '&username=' + getUrlVars()["username"] + '&lang=' + language + '&tempToken=' + temptoken + '&lobby=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'lobby.do' + '&support=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'support.do' + '&logout=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'logout.do';
	}
	document.location = clientUrl;
}

//CALLOUT----------------------------------------------

function calloutGetTemporaryAuthenticationToken(response) {
	if (response.errorCode) {
		alert("Token failed. " + response.playerMessage + " Error code: " + response.errorCode);
	}
	else {
		launchMobileClient(response.sessionToken.sessionToken);		
	}
}


