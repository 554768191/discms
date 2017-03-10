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

// 热门游戏
var hot_game_data = [
          	        { eventFn: "mermaidsMillions", imgSrc: "mermaidsMillions.png", cn_ZH: "百万美人鱼", cn_HK: "百萬美人魚", en_US: "Mermaids Millions" },
          	        { eventFn: "thunderstruck", imgSrc: "thunderstruck.png", cn_ZH: "雷击", cn_HK: "雷擊", en_US: "Thunderstruck" },
          	        { eventFn: "tombRaider", imgSrc: "tombRaider.png", cn_ZH: "古墓丽影", cn_HK: "古墓麗影", en_US: "古墓丽影" },
          	        { eventFn: "ladiesNite", imgSrc: "ladiesNite.png", cn_ZH: "黑夜中的女士", cn_HK: "黑夜中的女士", en_US: "Ladies Nite" },
          	        { eventFn: "springBreak", imgSrc: "springBreak.png", cn_ZH: "春天的假期", cn_HK: "春天的假期", en_US: "Spring Break" },
          	        { eventFn: "avalon", imgSrc: "avalon.png", cn_ZH: "阿瓦隆", cn_HK: "阿瓦隆", en_US: "Avalon" },
          	        { eventFn: "agentJaneBlonde", imgSrc: "agentJaneBlonde.png", cn_ZH: "理金发女郎简", cn_HK: "理金發女郎簡", en_US: "Agent Jane Blonde" },
          	        { eventFn: "burningDesire", imgSrc: "burningDesire.png", cn_ZH: "燃烧的欲望", cn_HK: "燃燒的欲望", en_US: "燃燒的欲望" },
          	        { eventFn: "deckTheHalls", imgSrc: "deckTheHalls.png", cn_ZH: "闪亮的圣诞节", cn_HK: "閃亮的聖誕節", en_US: "Deck the Halls" },
          	        { eventFn: "adventurePalace", imgSrc: "adventurePalace.png", cn_ZH: "冒险宫殿", cn_HK: "冒險宮殿", en_US: "Adventure Palace" },
          	        { eventFn: "tallyHo", imgSrc: "tallyHo.png", cn_ZH: "塔里好", cn_HK: "塔裏好", en_US: "Tally Ho" },
          	        { eventFn: "loaded", imgSrc: "loaded.png", cn_ZH: "豪门黑金", cn_HK: "豪門黑金", en_US: "Rich Black Golden" },
          	        { eventFn: "breakDaBankAgain", imgSrc: "breakDaBankAgain.png", cn_ZH: "再次打破银行", cn_HK: "再次打破銀行", en_US: "Break da Bank Again" },
          	        { eventFn: "cashapillar", imgSrc: "cashapillar.png", cn_ZH: "现金柱子", cn_HK: "現金柱子", en_US: "Cashapillar" },
          	        { eventFn: "alaskanFishing", imgSrc: "alaskanFishing.png", cn_ZH: "阿拉斯加钓鱼", cn_HK: "阿拉斯加釣魚", en_US: "Alaskan Fishing" },
          	        { eventFn: "stashOfTheTitans", imgSrc: "stashOfTheTitans.png", cn_ZH: "藏匿的泰坦", cn_HK: "藏匿的泰坦", en_US: "Stash of the Titans" },
          	        { eventFn: "carnaval", imgSrc: "carnaval.png", cn_ZH: "卡纳瓦尔", cn_HK: "卡納瓦爾", en_US: "Carnaval" },
          	        { eventFn: "voila", imgSrc: "nopic.png", cn_ZH: "瞧！", cn_HK: "瞧！", en_US: "Voila!" },
          	        { eventFn: "lionsPride", imgSrc: "lionsPride.png", cn_ZH: "狮子的骄傲", cn_HK: "獅子的驕傲", en_US: "Lion's Pride" },
          	        { eventFn: "bigTop", imgSrc: "bigTop.png", cn_ZH: "大帐篷", cn_HK: "大帳篷", en_US: "Big Top" },
          	        { eventFn: "breakDaBank", imgSrc: "breakDaBank.png", cn_ZH: "打破大银行", cn_HK: "打破大銀行", en_US: "Break Big Bank" },
          	        { eventFn: "purePlatinum", imgSrc: "purePlatinum.png", cn_ZH: "纯白金", cn_HK: "純白金", en_US: "Pure Platinum" },
          	        { eventFn: "5ReelDrive", imgSrc: "5ReelDrive.png", cn_ZH: "5轮驱动", cn_HK: "5輪驅動", en_US: "5 Reel Drive" },
          	        { eventFn: "couchPotato", imgSrc: "couchPotato.png", cn_ZH: "电视迷", cn_HK: "電視迷", en_US: "TV Fan" },
          	        { eventFn: "halloweenies", imgSrc: "halloweenies.png", cn_ZH: "万圣节前夕", cn_HK: "萬聖節前夕", en_US: "Halloweenies" },
          	        { eventFn: "whatAHoot", imgSrc: "whatAHoot.png", cn_ZH: "真可笑", cn_HK: "真可笑", en_US: "What a Hoot" },
          	        { eventFn: "thunderstruckII", imgSrc: "thunderstruckII.png", cn_ZH: "五雷轰顶II", cn_HK: "五雷轟頂II", en_US: "Thunderstruck II" },
          	        { eventFn: "reelThunder", imgSrc: "reelThunder.png", cn_ZH: "卷筒的雷声", cn_HK: "卷筒的雷聲", en_US: "Reel Thunder" },
          	        { eventFn: "isis", imgSrc: "isis.png", cn_ZH: "伊希斯", cn_HK: "伊希斯", en_US: "Isis" },
          	        { eventFn: "centreCourt", imgSrc: "centreCourt.png", cn_ZH: "中心球场", cn_HK: "中心球場", en_US: "Centre Court" },
          	        { eventFn: "theTwistedCircus", imgSrc: "theTwistedCircus.png", cn_ZH: "奇异马戏团", cn_HK: "奇異馬戲團", en_US: "The Twisted Circus" },
          	        { eventFn: "starlightKiss", imgSrc: "starlightKiss.png", cn_ZH: "星光下的吻", cn_HK: "星光下的吻", en_US: "Starlight Kiss" },
          	        { eventFn: "mayanPrincess", imgSrc: "mayanPrincess.png", cn_ZH: "玛雅公主", cn_HK: "瑪雅公主", en_US: "Mayan Princess" },
          	        { eventFn: "tigersEye", imgSrc: "nopic.png", cn_ZH: "老虎的眼睛", cn_HK: "老虎的眼睛", en_US: "Tiger's Eyes" },
          	        { eventFn: "eaglesWings", imgSrc: "eaglesWings.png", cn_ZH: "依格的翅膀", cn_HK: "依格的翅膀", en_US: "Eagel's Wings" },
          	        { eventFn: "highSociety", imgSrc: "highSociety.png", cn_ZH: "上流社会", cn_HK: "上流社會", en_US: "High Society" },
          	        { eventFn: "hitman", imgSrc: "hitman.png", cn_ZH: "杀手代号47", cn_HK: "殺手代號47", en_US: "Hitman 47" },
          	        { eventFn: "footballStar", imgSrc: "footballStar.png", cn_ZH: "足球明星", cn_HK: "足球明星", en_US: "Football Star" },
          	        { eventFn: "treasurePalace", imgSrc: "nopic.png", cn_ZH: "珍宝宫殿", cn_HK: "珍寶宮殿", en_US: "Treasure Palace" },
          	        { eventFn: "beachBabes", imgSrc: "nopic.png", cn_ZH: "沙滩宝贝", cn_HK: "沙灘寶貝", en_US: "Beach Babies" },
          	        { eventFn: "madHatters", imgSrc: "madHatters.png", cn_ZH: "疯子", cn_HK: "瘋子", en_US: "Mad Hatters" },
          	        { eventFn: "theGrandJourney", imgSrc: "nopic.png", cn_ZH: "伟大的旅程", cn_HK: "偉大的旅程", en_US: "The Grand Journey" },
          	        { eventFn: "kathmandu", imgSrc: "kathmandu.png", cn_ZH: "加德满都", cn_HK: "加德滿都", en_US: "Kathmandu" },
          	        { eventFn: "summertime", imgSrc: "summertime.png", cn_ZH: "夏季", cn_HK: "夏季", en_US: "Summertime" },
          	        { eventFn: "silverfang", imgSrc: "silverfang.png", cn_ZH: "银牙狼", cn_HK: "銀牙狼", en_US: "Silver Fang" },
          	        { eventFn: "mysticDreams", imgSrc: "mysticDreams.png", cn_ZH: "神秘的梦", cn_HK: "神秘的夢", en_US: "Mystic Dreams" },
          	        { eventFn: "bushTelegraph", imgSrc: "bushTelegraph.png", cn_ZH: "布什电报", cn_HK: "布什電報", en_US: "Bush Telegraph" },
          	        { eventFn: "ageOfDiscovery", imgSrc: "ageOfDiscovery.png", cn_ZH: "发现的时代", cn_HK: "發現的時代", en_US: "Age Of Discovery" },
          	        { eventFn: "barsNStripes", imgSrc: "barsNStripes.png", cn_ZH: "酒吧和条纹", cn_HK: "酒吧和條紋", en_US: "Bars and Stripes" },
          	        { eventFn: "rivieraRiches", imgSrc: "rivieraRiches.png", cn_ZH: "里维埃拉财富", cn_HK: "裏維埃拉財富", en_US: "Riviera Riches" },
          	        { eventFn: "santaPaws", imgSrc: "santaPaws.png", cn_ZH: "圣诞狗狗", cn_HK: "聖誕狗狗", en_US: "Santa Paws" },
          	        { eventFn: "bigKahuna", imgSrc: "bigKahuna.png", cn_ZH: "显赫人物", cn_HK: "顯赫人物", en_US: "Big Kahuna" },
          	        { eventFn: "sureWin", imgSrc: "sureWin.png", cn_ZH: "精英不败", cn_HK: "精英不敗", en_US: "Sure Win" },
          	        { eventFn: "cricketStar", imgSrc: "cricketStar.png", cn_ZH: "板球明星", cn_HK: "板球明星", en_US: "Boardball Star" },
          	        { eventFn: "secretAdmirer", imgSrc: "secretAdmirer.png", cn_ZH: "秘密的仰慕者", cn_HK: "秘密的仰慕者", en_US: "Secret Admirer" },
          	        { eventFn: "luckyLeprechaun", imgSrc: "luckyLeprechaun.png", cn_ZH: "幸运的小妖精", cn_HK: "幸運的小妖精", en_US: "Lucky Leprechaun" },
          	        { eventFn: "rhymingReelsGeorgiePorgie", imgSrc: "rhymingReelsGeorgiePorgie.png", cn_ZH: "淘气的乔治", cn_HK: "淘氣的喬治", en_US: "Rhyming Reels Georgie Porgie" },
          	        { eventFn: "harveys", imgSrc: "harveys.png", cn_ZH: "哈维斯", cn_HK: "哈維斯", en_US: "Harveys" },
          	        { eventFn: "boogieMonsters", imgSrc: "boogieMonsters.png", cn_ZH: "不羁的怪物", cn_HK: "不羁的怪物", en_US: "Boogie Monsters" },
          	        { eventFn: "liquidGold", imgSrc: "liquidGold.png", cn_ZH: "金水", cn_HK: "金水", en_US: "Liquid Gold" },
          	        { eventFn: "dragonsMyth", imgSrc: "dragonsMyth.png", cn_ZH: "龙的神话", cn_HK: "龍的神話", en_US: "Dragons Myth" },
          	        { eventFn: "coolWolf", imgSrc: "coolWolf.png", cn_ZH: "酷品狼", cn_HK: "酷品狼", en_US: "Cool Wolf" },
          	        { eventFn: "breakAway", imgSrc: "breakAway.png", cn_ZH: "逃出", cn_HK: "逃出", en_US: "Break Away" },
          	        { eventFn: "ariana", imgSrc: "ariana.png", cn_ZH: "艾丽安娜", cn_HK: "艾麗安娜", en_US: "Ariana" },
          	        { eventFn: "cashville", imgSrc: "cashville.png", cn_ZH: "现金维尔", cn_HK: "現金維爾", en_US: "Cashville" },
          	        { eventFn: "fishParty", imgSrc: "fishParty.png", cn_ZH: "渔夫派对", cn_HK: "漁夫派對", en_US: "Fish Party" },
          	        { eventFn: "kingsOfCash", imgSrc: "kingsOfCash.png", cn_ZH: "国王的现金", cn_HK: "國王的現金", en_US: "Cash Of Kings" },
          	        { eventFn: "summerHoliday", imgSrc: "summerHoliday.png", cn_ZH: "暑假", cn_HK: "暑假", en_US: "Summer Holiday" },
          	        { eventFn: "supeItUp", imgSrc: "supeItUp.png", cn_ZH: "挂表", cn_HK: "挂表", en_US: "Supe It Up" },
          	        { eventFn: "partyIsland", imgSrc: "partyIsland.png", cn_ZH: "狂欢岛", cn_HK: "狂歡島", en_US: "Party Island" },
          	        { eventFn: "asianBeauty", imgSrc: "asianBeauty.png", cn_ZH: "亚洲美女", cn_HK: "亞洲美女", en_US: "Asian Beauty" },
          	        { eventFn: "bridesmaids", imgSrc: "bridesmaids.png", cn_ZH: "伴娘", cn_HK: "伴娘", en_US: "Bridesmaid" },
          	        { eventFn: "sterlingSilver", imgSrc: "sterlingSilver.png", cn_ZH: "标准纯银", cn_HK: "標准純銀", en_US: "Sterling Silver" },
          	        { eventFn: "rugbyStar", imgSrc: "rugbyStar.png", cn_ZH: "橄榄球明星", cn_HK: "橄榄球明星", en_US: "Rugby Star" },
          	        { eventFn: "goldenEra", imgSrc: "goldenEra.png", cn_ZH: "黄金时期", cn_HK: "黃金時期", en_US: "Golden Era" }
                  ];

// 电子扑克
var video_poker_data = [
             	        { eventFn: "acesAndEights", imgSrc: "acesAndEights.png", cn_ZH: "A和8扑克", cn_HK: "百萬美人魚", en_US: "Aces and Eights Poker" },
             	        { eventFn: "acesAndFaces", imgSrc: "acesFaces.png", cn_ZH: "王牌扑克", cn_HK: "王牌撲克", en_US: "Aces and Faces Poker" },
             	        { eventFn: "bonusDeucesWild", imgSrc: "bonusDeucesWild.png", cn_ZH: "奖金平分扑克", cn_HK: "獎金平分撲克", en_US: "Bonus Deuces Wild Poker" },
             	        { eventFn: "deucesWild", imgSrc: "deucesWild.png", cn_ZH: "野蛮对决扑克", cn_HK: "野蠻對決撲克", en_US: "Deuces Wild Poker" },
             	        { eventFn: "doubleDoubleBonus", imgSrc: "doubleDoubleBonus.png", cn_ZH: "双倍奖金扑克", cn_HK: "雙倍獎金撲克", en_US: "Double Double Bonus Poker" },
             	        { eventFn: "jacksOrBetter", imgSrc: "jacksOrBetter.png", cn_ZH: "更好的扑克", cn_HK: "更好的撲克", en_US: "Jacks or Better Poker" }
                     ];

// 桌面游戏
var table_games_data = [
             	        { eventFn: "europeanRoulette", imgSrc: "nopic.png", cn_ZH: "欧洲轮盘赌金", cn_HK: "歐洲輪盤賭金", en_US: "European Roulette Gold" },
             	        { eventFn: "europeanBlackjackGold", imgSrc: "nopic.png", cn_ZH: "欧洲黄金二十一点", cn_HK: "歐洲黃金二十一點", en_US: "European Blackjack Gold" },
             	        { eventFn: "classicBlackjackGold", imgSrc: "classicBlackjackGold.png", cn_ZH: "经典黄金二十一点", cn_HK: "經典黃金二十一點", en_US: "Atlantic City Blackjack Gold" },
             	        { eventFn: "atlanticCityBlackjackGold", imgSrc: "atlanticCityBlackjackGold.png", cn_ZH: "大西洋黄金二十一点", cn_HK: "大西洋黃金二十一點", en_US: "Atlantic City Blackjack Gold" },
             	        { eventFn: "vegasDowntownBlackjackGold", imgSrc: "vegasDowntownBlackjackGold.png", cn_ZH: "拉斯维加斯黄金二十一点", cn_HK: "拉斯維加斯黃金二十一點", en_US: "Vegas Downtown Blackjack Gold" },
             	        { eventFn: "vegasSingleDeckBlackjackGold", imgSrc: "vegasSingleDeckBlackjackGold.png", cn_ZH: "拉斯维加斯二十一点", cn_HK: "拉斯維加斯二十一點", en_US: "Vegas Downtown Blackjack Gold" },
             	        { eventFn: "vegasStripBlackjackGold", imgSrc: "vegasStripBlackjackGold.png", cn_ZH: "拉斯维加斯二十一点", cn_HK: "拉斯維加斯二十一點", en_US: "Vegas Strip Blackjack Gold" },
             	        { eventFn: "americanRouletteGold", imgSrc: "americanRouletteGold.png", cn_ZH: "美国轮盘赌金", cn_HK: "美國輪盤賭金", en_US: "American Roulette Gold" }
                     ];

// 晋级游戏
var progressives_data = [
              	        { eventFn: "cashSplash", imgSrc: "cashSplash.png", cn_ZH: "现金飞溅", cn_HK: "現金飛濺", en_US: "Cash Splash" },
              	        { eventFn: "majorMillions", imgSrc: "majorMillions.png", cn_ZH: "大百万", cn_HK: "大百萬", en_US: "Major Millions" },
              	        { eventFn: "treasureNile", imgSrc: "treasureNile.png", cn_ZH: "宝尼罗河", cn_HK: "寶尼羅河", en_US: "Treasure Nile" }
                      ];

// 老虎机
var slots_data = [
       	        { eventFn: "mermaidsMillions", imgSrc: "mermaidsMillions.png", cn_ZH: "百万美人鱼", cn_HK: "百萬美人魚", en_US: "Mermaids Millions" },
       	        { eventFn: "thunderstruck", imgSrc: "thunderstruck.png", cn_ZH: "雷击", cn_HK: "雷擊", en_US: "Thunderstruck" },
       	        { eventFn: "tombRaider", imgSrc: "tombRaider.png", cn_ZH: "古墓丽影", cn_HK: "古墓麗影", en_US: "Ancient Tomb Raider" },
       	        { eventFn: "ladiesNite", imgSrc: "ladiesNite.png", cn_ZH: "黑夜中的女士", cn_HK: "黑夜中的女士", en_US: "Ladies Nite" },
       	        { eventFn: "springBreak", imgSrc: "springBreak.png", cn_ZH: "春天的假期", cn_HK: "春天的假期", en_US: "Spring Break" },
       	        { eventFn: "avalon", imgSrc: "avalon.png", cn_ZH: "阿瓦隆", cn_HK: "阿瓦隆", en_US: "Avalon" },
       	        { eventFn: "agentJaneBlonde", imgSrc: "agentJaneBlonde.png", cn_ZH: "理金发女郎简", cn_HK: "理金發女郎簡", en_US: "Agent Jane Blonde" },
       	        { eventFn: "burningDesire", imgSrc: "burningDesire.png", cn_ZH: "燃烧的欲望", cn_HK: "燃燒的欲望", en_US: "Fired Desire" },
       	        { eventFn: "deckTheHalls", imgSrc: "deckTheHalls.png", cn_ZH: "闪亮的圣诞节", cn_HK: "閃亮的聖誕節", en_US: "Deck the Halls" },
       	        { eventFn: "adventurePalace", imgSrc: "adventurePalace.png", cn_ZH: "冒险宫殿", cn_HK: "冒險宮殿", en_US: "Adventure Palace" },
       	        { eventFn: "tallyHo", imgSrc: "tallyHo.png", cn_ZH: "塔里好", cn_HK: "塔裏好", en_US: "Tally Ho" },
       	        { eventFn: "loaded", imgSrc: "loaded.png", cn_ZH: "豪门黑金", cn_HK: "豪門黑金", en_US: "Rich Black Golden" },
       	        { eventFn: "breakDaBankAgain", imgSrc: "breakDaBankAgain.png", cn_ZH: "再次打破银行", cn_HK: "再次打破銀行", en_US: "Break da Bank Again" },
       	        { eventFn: "cashapillar", imgSrc: "cashapillar.png", cn_ZH: "现金柱子", cn_HK: "現金柱子", en_US: "Cashapillar" },
       	        { eventFn: "alaskanFishing", imgSrc: "alaskanFishing.png", cn_ZH: "阿拉斯加钓鱼", cn_HK: "阿拉斯加釣魚", en_US: "Alaskan Fishing" },
       	        { eventFn: "stashOfTheTitans", imgSrc: "stashOfTheTitans.png", cn_ZH: "藏匿的泰坦", cn_HK: "藏匿的泰坦", en_US: "Stash of the Titans" },
       	        { eventFn: "carnaval", imgSrc: "carnaval.png", cn_ZH: "卡纳瓦尔", cn_HK: "卡納瓦爾", en_US: "Carnaval" },
       	        { eventFn: "voila", imgSrc: "nopic.png", cn_ZH: "瞧！", cn_HK: "瞧！", en_US: "Voila!" },
       	        { eventFn: "lionsPride", imgSrc: "lionsPride.png", cn_ZH: "狮子的骄傲", cn_HK: "獅子的驕傲", en_US: "Lion's Pride" },
       	        { eventFn: "bigTop", imgSrc: "bigTop.png", cn_ZH: "大帐篷", cn_HK: "大帳篷", en_US: "Big Top" },
       	        { eventFn: "breakDaBank", imgSrc: "breakDaBank.png", cn_ZH: "打破大银行", cn_HK: "打破大銀行", en_US: "Break Big Bank" },
       	        { eventFn: "purePlatinum", imgSrc: "purePlatinum.png", cn_ZH: "纯白金", cn_HK: "純白金", en_US: "Pure Platinum" },
       	        { eventFn: "5ReelDrive", imgSrc: "5ReelDrive.png", cn_ZH: "5轮驱动", cn_HK: "5輪驅動", en_US: "5 Reel Drive" },
       	        { eventFn: "couchPotato", imgSrc: "couchPotato.png", cn_ZH: "电视迷", cn_HK: "電視迷", en_US: "電視迷" },
       	        { eventFn: "halloweenies", imgSrc: "halloweenies.png", cn_ZH: "万圣节前夕", cn_HK: "萬聖節前夕", en_US: "Halloweenies" },
       	        { eventFn: "whatAHoot", imgSrc: "whatAHoot.png", cn_ZH: "真可笑", cn_HK: "真可笑", en_US: "What a Hoot" },
       	        { eventFn: "thunderstruckII", imgSrc: "thunderstruckII.png", cn_ZH: "五雷轰顶II", cn_HK: "五雷轟頂II", en_US: "Thunderstruck II" },
       	        { eventFn: "reelThunder", imgSrc: "reelThunder.png", cn_ZH: "卷筒的雷声", cn_HK: "卷筒的雷聲", en_US: "Reel Thunder" },
       	        { eventFn: "isis", imgSrc: "isis.png", cn_ZH: "伊希斯", cn_HK: "伊希斯", en_US: "Isis" },
       	        { eventFn: "centreCourt", imgSrc: "centreCourt.png", cn_ZH: "中心球场", cn_HK: "中心球場", en_US: "Centre Court" },
       	        { eventFn: "theTwistedCircus", imgSrc: "theTwistedCircus.png", cn_ZH: "奇异马戏团", cn_HK: "奇異馬戲團", en_US: "The Twisted Circus" },
       	        { eventFn: "starlightKiss", imgSrc: "starlightKiss.png", cn_ZH: "星光下的吻", cn_HK: "星光下的吻", en_US: "Starlight Kiss" },
       	        { eventFn: "mayanPrincess", imgSrc: "mayanPrincess.png", cn_ZH: "玛雅公主", cn_HK: "瑪雅公主", en_US: "Mayan Princess" },
       	        { eventFn: "tigersEye", imgSrc: "nopic.png", cn_ZH: "老虎的眼睛", cn_HK: "老虎的眼睛", en_US: "Tiger's Eyes" },
       	        { eventFn: "eaglesWings", imgSrc: "eaglesWings.png", cn_ZH: "依格的翅膀", cn_HK: "依格的翅膀", en_US: "Eagel's Wings" },
       	        { eventFn: "highSociety", imgSrc: "highSociety.png", cn_ZH: "上流社会", cn_HK: "上流社會", en_US: "High Society" },
       	        { eventFn: "hitman", imgSrc: "hitman.png", cn_ZH: "杀手代号47", cn_HK: "殺手代號47", en_US: "Hitman 47" },
       	        { eventFn: "footballStar", imgSrc: "footballStar.png", cn_ZH: "足球明星", cn_HK: "足球明星", en_US: "Football Star" },
       	        { eventFn: "treasurePalace", imgSrc: "nopic.png", cn_ZH: "珍宝宫殿", cn_HK: "珍寶宮殿", en_US: "Treasure Palace" },
       	        { eventFn: "beachBabes", imgSrc: "nopic.png", cn_ZH: "沙滩宝贝", cn_HK: "沙灘寶貝", en_US: "Beach Babies" },
       	        { eventFn: "madHatters", imgSrc: "madHatters.png", cn_ZH: "疯子", cn_HK: "瘋子", en_US: "Mad Hatters" },
       	        { eventFn: "theGrandJourney", imgSrc: "nopic.png", cn_ZH: "伟大的旅程", cn_HK: "偉大的旅程", en_US: "The Grand Journey" },
       	        { eventFn: "kathmandu", imgSrc: "kathmandu.png", cn_ZH: "加德满都", cn_HK: "加德滿都", en_US: "Kathmandu" },
       	        { eventFn: "summertime", imgSrc: "summertime.png", cn_ZH: "夏季", cn_HK: "夏季", en_US: "Summertime" },
       	        { eventFn: "silverfang", imgSrc: "silverfang.png", cn_ZH: "银牙狼", cn_HK: "銀牙狼", en_US: "Silver Fang" },
       	        { eventFn: "mysticDreams", imgSrc: "mysticDreams.png", cn_ZH: "神秘的梦", cn_HK: "神秘的夢", en_US: "Mystic Dreams" },
       	        { eventFn: "bushTelegraph", imgSrc: "bushTelegraph.png", cn_ZH: "布什电报", cn_HK: "布什電報", en_US: "Bush Telegraph" },
       	        { eventFn: "ageOfDiscovery", imgSrc: "ageOfDiscovery.png", cn_ZH: "发现的时代", cn_HK: "發現的時代", en_US: "Age Of Discovery" },
       	        { eventFn: "barsNStripes", imgSrc: "barsNStripes.png", cn_ZH: "酒吧和条纹", cn_HK: "酒吧和條紋", en_US: "Bars and Stripes" },
       	        { eventFn: "rivieraRiches", imgSrc: "rivieraRiches.png", cn_ZH: "里维埃拉财富", cn_HK: "裏維埃拉財富", en_US: "Riviera Riches" },
       	        { eventFn: "santaPaws", imgSrc: "santaPaws.png", cn_ZH: "圣诞狗狗", cn_HK: "聖誕狗狗", en_US: "Santa Paws" },
       	        { eventFn: "bigKahuna", imgSrc: "bigKahuna.png", cn_ZH: "显赫人物", cn_HK: "顯赫人物", en_US: "Big Kahuna" },
       	        { eventFn: "sureWin", imgSrc: "sureWin.png", cn_ZH: "精英不败", cn_HK: "精英不敗", en_US: "Sure Win" },
       	        { eventFn: "cricketStar", imgSrc: "cricketStar.png", cn_ZH: "板球明星", cn_HK: "板球明星", en_US: "Boardball Star" },
       	        { eventFn: "secretAdmirer", imgSrc: "secretAdmirer.png", cn_ZH: "秘密的仰慕者", cn_HK: "秘密的仰慕者", en_US: "Secret Admirer" },
       	        { eventFn: "luckyLeprechaun", imgSrc: "luckyLeprechaun.png", cn_ZH: "幸运的小妖精", cn_HK: "幸運的小妖精", en_US: "Lucky Leprechaun" },
       	        { eventFn: "rhymingReelsGeorgiePorgie", imgSrc: "rhymingReelsGeorgiePorgie.png", cn_ZH: "淘气的乔治", cn_HK: "淘氣的喬治", en_US: "Rhyming Reels Georgie Porgie" },
       	        { eventFn: "harveys", imgSrc: "harveys.png", cn_ZH: "哈维斯", cn_HK: "哈維斯", en_US: "Harveys" },
       	        { eventFn: "boogieMonsters", imgSrc: "boogieMonsters.png", cn_ZH: "不羁的怪物", cn_HK: "不羁的怪物", en_US: "Boogie Monsters" },
       	        { eventFn: "liquidGold", imgSrc: "liquidGold.png", cn_ZH: "金水", cn_HK: "金水", en_US: "Liquid Gold" },
       	        { eventFn: "dragonsMyth", imgSrc: "dragonsMyth.png", cn_ZH: "龙的神话", cn_HK: "龍的神話", en_US: "Dragons Myth" },
       	        { eventFn: "coolWolf", imgSrc: "coolWolf.png", cn_ZH: "酷品狼", cn_HK: "酷品狼", en_US: "Cool Wolf" },
       	        { eventFn: "breakAway", imgSrc: "breakAway.png", cn_ZH: "逃出", cn_HK: "逃出", en_US: "Break Away" },
       	        { eventFn: "ariana", imgSrc: "ariana.png", cn_ZH: "艾丽安娜", cn_HK: "艾麗安娜", en_US: "Ariana" },
       	        { eventFn: "cashville", imgSrc: "cashville.png", cn_ZH: "现金维尔", cn_HK: "現金維爾", en_US: "Cashville" },
       	        { eventFn: "fishParty", imgSrc: "fishParty.png", cn_ZH: "渔夫派对", cn_HK: "漁夫派對", en_US: "Fish Party" },
       	        { eventFn: "kingsOfCash", imgSrc: "kingsOfCash.png", cn_ZH: "国王的现金", cn_HK: "國王的現金", en_US: "Cash Of Kings" },
       	        { eventFn: "summerHoliday", imgSrc: "summerHoliday.png", cn_ZH: "暑假", cn_HK: "暑假", en_US: "Summer Holiday" },
       	        { eventFn: "supeItUp", imgSrc: "supeItUp.png", cn_ZH: "挂表", cn_HK: "挂表", en_US: "Supe It Up" },
       	        { eventFn: "partyIsland", imgSrc: "partyIsland.png", cn_ZH: "狂欢岛", cn_HK: "狂歡島", en_US: "Party Island" },
       	        { eventFn: "asianBeauty", imgSrc: "asianBeauty.png", cn_ZH: "亚洲美女", cn_HK: "亞洲美女", en_US: "Asian Beauty" },
       	        { eventFn: "bridesmaids", imgSrc: "bridesmaids.png", cn_ZH: "伴娘", cn_HK: "伴娘", en_US: "Bridesmaid" },
       	        { eventFn: "sterlingSilver", imgSrc: "sterlingSilver.png", cn_ZH: "标准纯银", cn_HK: "標准純銀", en_US: "Sterling Silver" },
       	        { eventFn: "rugbyStar", imgSrc: "rugbyStar.png", cn_ZH: "橄榄球明星", cn_HK: "橄榄球明星", en_US: "Rugby Star" },
       	        { eventFn: "goldenEra", imgSrc: "goldenEra.png", cn_ZH: "黄金时期", cn_HK: "黃金時期", en_US: "Golden Era" }
       ];

// 渲染游戏
function RenderData(game,gameId){
	var html = "";
	for(var i=0; i<game.length; i++){
		html += "<div class='col-33 text-center' style='padding: 0.75rem;'>" +
		"<a href='javascript:void(0)' onclick=\"openMgGame(\'" + game[i].eventFn + "\')\"><div><img src='../img/mg/" + game[i].imgSrc + "' style='max-width: 100%'></div>" +
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
	$("#progressivesGames").hide();
	$("#slotsGames").hide();
})
// 渲染电子扑克
RenderData(video_poker_data,$("#videoPokerGames"));
//点击显示隐藏
$("#videoPokerGamesShow").tap(function(){
	$("#videoPokerGames").toggle();
	$("#hotGames").hide();
	$("#tableGames").hide();
	$("#progressivesGames").hide();
	$("#slotsGames").hide();
})
// 渲染桌面游戏
RenderData(table_games_data,$("#tableGames"));
//点击显示隐藏
$("#tableGamesShow").tap(function(){
	$("#tableGames").toggle();
	$("#hotGames").hide();
	$("#videoPokerGames").hide();
	$("#progressivesGames").hide();
	$("#slotsGames").hide();
})
// 渲染晋级游戏
RenderData(progressives_data,$("#progressivesGames"));
//点击显示隐藏
$("#progressivesGamesShow").tap(function(){
	$("#progressivesGames").toggle();
	$("#hotGames").hide();
	$("#videoPokerGames").hide();
	$("#tableGames").hide();
	$("#slotsGames").hide();
})
// 渲染老虎机
RenderData(slots_data,$("#slotsGames"));
//点击显示隐藏
$("#slotsGamesShow").tap(function(){
	$("#slotsGames").toggle();
	$("#hotGames").hide();
	$("#videoPokerGames").hide();
	$("#tableGames").hide();
	$("#progressivesGames").hide();
})
// 默认隐藏游戏列表
$("#videoPokerGames").hide();
$("#tableGames").hide();
$("#progressivesGames").hide();
$("#slotsGames").hide();

// 点击游戏跳转
function openMgGame(gameCode){
    var url= "/src/mg/index.do?gameid="+gameCode;
    httpRequest.get(url,{},function(result){
    	if(result){
    		if(result.code==0){
    			window.location.href=result.msg;
    		}else{
    			alert(result.msg);
    		}
    	}
    });
};
