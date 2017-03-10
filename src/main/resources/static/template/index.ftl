<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${companyName}</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="../css/sm.min.css">
    <link rel="stylesheet" href="../css/sm-extend.min.css">
    <link rel="stylesheet" href="../css/gc-all.css">
</head>
<body>
<div class="page-group">
    <header class="bar bar-nav red1" style="z-index:99">

        <div style="height: 2rem;position: absolute;z-index: 999;">
	        <a class="header-left-link pull-left my-btn" href="#" data-transition='slide-out'>
	           <#switch locate_lang>
                	<#case "CH">
                      	 <img class="header-img" src="../img/icon/lang_ch.png" style="margin-left: 0.4rem;">        
                    <#break>
                    <#case "US">
                         <img class="header-img" src="../img/icon/flag_uk.png" style="margin-left: 0.4rem;">
                    <#break>                 
                    <#case "HK">
                         <img class="header-img" src="../img/icon/flag_hk.png" style="margin-left: 0.4rem;">
                    <#break>
                    <#case "KH">
                         <img class="header-img" src="../img/icon/flag_kh.png" style="margin-left: 0.4rem;">
                    <#break>
                    <#case "TH">
                         <img class="header-img" src="../img/icon/flag_th.png" style="margin-left: 0.4rem;">
                    <#break>
                    <#default>
                         <img class="header-img" src="../img/icon/lang_ch.png" style="margin-left: 0.4rem;">
                </#switch>
	        </a>
        </div>
        <div class="panel-overlay"></div>
        <h1 class="title"><img class="header-logo" src="${logoImage}"></h1>

        <a id="userlogin-balance" class="button button-link button-nav header-left-link pull-right external" href="login.html" data-transition='slide-out'>
            <span class="font-white">${denglu}</span>
        </a>
        <a id="userlogin-img" class="button button-link button-nav header-left-link pull-right external" href="login.html" data-transition='slide-out'>
            <img class="header-img-right" src="../img/icon/user.png">
        </a>

    </header>
    <nav class="bar bar-tab" id="nav-list" style="z-index:99">
        <a class="tab-item active external" id="nav-index" href="index.html">
            <span class="icon"><img class="bar-img" src="../img/icon/home_active.png"></span>
            <span class="tab-label">${shouye}</span>
        </a>
        <#if customerConfig??>
        <a class="tab-item external" id="" href="${customerConfig.href!'#'}">
            <span class="icon"><img class="bar-img" src="../img/icon/service.png"></span>
            <span class="tab-label">${kefu}</span>
        </a>
        <#else> 
        <a class="tab-item external" id="" href="#">
            <span class="icon"><img class="bar-img" src="../img/icon/service.png"></span>
            <span class="tab-label">${kefu}</span>
        </a>
        </#if>
        <a class="tab-item external" id="nav-wallet" href="transfer.html">
            <span class="icon"><img class="bar-img" src="../img/icon/wallet.png"></span>
            <span class="tab-label">${qianbao}</span>
        </a>
        <a class="tab-item external" id="" href="activity.html">
            <span class="icon"><img class="bar-img" src="../img/icon/promotion.png"></span>
            <span class="tab-label">${youhui}</span>
        </a>
        <a class="tab-item external" id="nav-my" href="my.html">
            <span class="icon"><img class="bar-img" src="../img/icon/my.png"></span>
            <span class="tab-label">${wode}</span>
        </a>
    </nav>
    
    <div class="content gray close-panel">
        <!-- Slider -->
        <div class="swiper-container" style="padding-bottom:0;">
            <div class="swiper-wrapper">
            </div>
        </div>
        <div class="row background-white" style="padding-top: 0.25rem;">
            <div class="col-15">
                <img class="content-img" style="margin-left: 0.5rem;" src="../img/icon/speaker.png">
            </div>
            <div class="col-85">
                <marquee id="notice" direction="left" behavior="scroll" scrollamount="3" scrolldelay="200">${gundonggg}</marquee>
            </div>
        </div>
        
        <#list gameTypes as gameType>
            <div class="content-h1 row no-gutter border-bottom">
            <div class="col-100">
                <span class="${gameType.icon} pull-left"></span>
                <span class="pull-left font-bold" style="padding-top: 0.08rem;padding-left: 0.25rem;">${gameType.name}</span>
            </div>
            </div>
            <#if gameMap[gameType.id?c]?size==0>
                <div class="background-white row no-gutter">
                  <div class="col-30 text-center" style="padding: 0.75rem;">
                          <div><img src="../img/icon/more.png" style="max-width: 100%"></div>
                          <div><span class="font-bold font-gray font-middle">${qidaigengduo}</span></div>
                  </div>
                </div>  
            </#if>
            <#list gameMap[gameType.id?c] as game>
                <#if game_index%3==0>
                   <div class="background-white row no-gutter">
                </#if>
                <#if game_index%3!=0>
                   <div class="col-5 text-center">
                      <div class="ver-border"></div>
                   </div> 
                </#if>
                <div class="col-30 text-center" style="padding: 0.75rem;" onclick="toProduct('${game.href}')">
                    <div><img src="../img/icon/${game.icon}.png" style="max-width: 100%"></div>
                    <div><span class="font-bold font-gray font-middle">${game.name}</span></div>
                </div>
                <#if game_index%3==2||(game_index+1)==gameMap[gameType.id?c]?size>
                   <#if game_index%3!=2&&(game_index+1)==gameMap[gameType.id?c]?size>
                      <div class="col-5 text-center">
                          <div class="ver-border"></div>
                      </div>
                      <div class="col-30 text-center" style="padding: 0.75rem;">
                          <div><img src="../img/icon/more.png" style="max-width: 100%"></div>
                          <div><span class="font-bold font-gray font-middle">${qidaigengduo}</span></div>
                      </div>
                   </#if>
                   </div>
                </#if>
            </#list>
        </#list>     
         
        <div class="row">
            <div class="col-100 text-center font-bold font-gray" style="padding: 0.25rem 0;">
                <a href="${domain}">${qiehuandaopc}</a>
            </div>
        </div>
    </div>

    <!-- Left Panel with Reveal effect -->
    <div class="panel panel-left panel-cover theme-dark" id='panel-js-demo' style="width: 40%; background-color: #2d2d2d;z-index:9;margin-top:1rem">
        <div class="content-block text-center" id="lang">
            <#list langs as lan>
               <#switch lan>
                  <#case "CH">
                     <div class="row no-gutter" style="margin: 1rem 0">
                        <div class="col-40"><img data-lang="CH" src="../img/icon/lang_ch.png" style="width: 2rem; vertical-align: middle;"></div>
                        <div class="col-60" style="line-height: 2rem;"><span style="color: #9A9A9A;">${zwjianti}</span></div>
                     </div>
                  <#break> 
                  <#case "HK"> 
                     <div class="row no-gutter" style="margin: 1rem 0">
                        <div class="col-40"><img data-lang="HK" src="../img/icon/flag_hk.png" style="width: 2rem; vertical-align: middle;"></div>
                        <div class="col-60" style="line-height: 2rem;"><span style="color: #9A9A9A;">${zwfanti}</span></div>
                     </div>                  
                  <#break>
                  <#case "US"> 
                     <div class="row no-gutter" style="margin: 1rem 0">
                        <div class="col-40"><img data-lang="US" src="../img/icon/flag_uk.png" style="width: 2rem; vertical-align: middle;"></div>
                        <div class="col-60" style="line-height: 2rem;"><span style="color: #9A9A9A;">${yingwen}</span></div>
                     </div>
                  <#break>
                  <#case "TH">
                     <div class="row no-gutter" style="margin: 1rem 0">
                        <div class="col-40"><img data-lang="TH" src="../img/icon/flag_kh.png" style="width: 2rem; vertical-align: middle;"></div>
                        <div class="col-60" style="line-height: 2rem;"><span style="color: #9A9A9A;">${taiyu}</span></div>
                     </div> 
                  <#break>
                  <#case "KH">
                     <div class="row no-gutter" style="margin: 1rem 0">
                        <div class="col-40"><img data-lang="KH" src="../img/icon/flag_th.png" style="width: 2rem; vertical-align: middle;"></div>
                        <div class="col-60" style="line-height: 2rem;"><span style="color: #9A9A9A;">${jianyu}</span></div>
                     </div>
                  <#break>
               </#switch>
            </#list>
        </div>
    </div>
</div>
<script type='text/javascript' src='language.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/pc-all.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto-touch.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm-extend.min.js' charset='utf-8'></script>
<script type='text/javascript' src="../js/http_request.js" charset='utf-8'></script>
<script type='text/javascript' src='../js/index.js' charset='utf-8'></script>
 <#if customerConfig??>
    <#if customerConfig.type==2>
         <script>
            ${customerConfig.code}
         </script>
    </#if>
    <#if customerConfig.type==3>
         <script type='text/javascript' src='${customerConfig.code}' charset='utf-8'></script>
    </#if>
 </#if>
</body>
</html>