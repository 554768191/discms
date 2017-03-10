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
    <link rel="stylesheet" href="../css/login_register.css">
</head>
<body>
<div class="page-group">
    <header class="bar bar-nav red1">
        <a class="button button-link button-nav pull-left external" href="login.html" data-transition='slide-out'>
            <img class="header-img" src="../img/login/back_arrow.png">
        </a>
        <h1 class="title"><span class="font-white font-18">${zhuce}</span></h1>

        <a class="button button-link button-nav header-left-link pull-right external" href="login.html" data-transition='slide-out'>
            <span class="font-white">${denglu}</span>
        </a>
        <a class="button button-link button-nav header-left-link pull-right external" href="login.html" data-transition='slide-out'>
            <img class="header-img-right" src="../img/icon/user.png">
        </a>
    </header>

    <div class="content gray">
        <form action="/member/register" method="POST">
        <div class="reg-input-list font-14" >
            <div class="row">
                <div class="col-25 font-right font-bold">${yonghuming}</div>
                <#if usernameVerfiy==0>
                   <div class="col-75"><input type="text" ref="${usernameVerfiy}" ver="${usernameLength}" id="accountno" name="accountno" class="username" placeholder="${usernameLength}${yonghumingjiaoyan}"></div>
                <#else>
                   <div class="col-75"><input type="text" ref="${usernameVerfiy}" ver="${usernameLength}" id="accountno" name="accountno" class="username" placeholder="${usernameDesc}"></div>   
                </#if>
            </div>
            <div class="row pos-re">
                <div class="col-25 font-right font-bold">${mima}</div>
                <div class="col-75"><input id="password" ver="passwordLength" name="password" type="password" class="password" placeholder="${passwordLength}${mimajiaoyan}"><input type="button" style="max-width:3rem;" class="btn-show pos-ab" value="${mmxianshi}"/></div>
            </div>
            <div class="row">
                <div class="col-25 font-right font-bold">${querenmima}</div>
                <div class="col-75"><input id="confirmPassword" name="confirmPassword" type="password" class="confirm-password" placeholder="${querenmimajiaoyan}"></div>
            </div>
            <#if displayName?string('yes', 'no')=='yes'>
            <div class="row">
                <div class="col-25 font-right font-bold">${zhenshixingming}</div>
                <div class="col-75"><input ver="${mustName?string('true','false')}" ref="${nameExists?string('true','false')}" id="cashName" name="cashName" type="text" class="real-name" placeholder="${zhenshixingmingjiaoyan}"></div>
            </div>
            </#if>
            <#if displayOnlineCode?string('yes', 'no')=='yes'>
            <div class="row">
                <div class="col-25 font-right font-bold">${tuiguangdaima}</div>
                <div class="col-75"><input id="onlineCode" name="onlineCode" <#if enableOnlineCode?string('yes', 'no')=='no'>readonly="readonly"</#if> type="text" class="promotion-code" placeholder="${tuiguangdaimajiaoyan}"></div>
            </div>
            </#if>
            <#if displayPhone?string('yes', 'no')=='yes'>
            <div class="row">
                <div class="col-25 font-right font-bold">${shoujihaoma}</div>
                <div class="col-75"><input ver="${mustPhone?string('true', 'false')}" type="number" id="phone" name="phone" class="promotion-code" placeholder="${shoujihaomajiaoyan}"></div>
            </div>
            </#if>
            <#if displayQQ?string('yes', 'no')=='yes'>
            <div class="row">
                <div class="col-25 font-right font-bold">${qq}</div>
                <div class="col-75"><input ver="${mustQQ?string('true', 'false')}" type="number" id="qq" name="pqq" class="promotion-code" placeholder="${qq}"></div>
            </div>
            </#if>
            <#if displayCashPassword?string('yes','no')=='yes'>
                <div class="row">
                <div class="col-25 font-right font-bold">${qukuanmima}</div>
                <div class="col-75"><input ver="${cashPasswordLength}" id="cashPassword" name="cashPasswd" type="password" class="confirm-password" placeholder="${qukuanmimajiaoyan}"></div>
            </div>
            </#if>
            <div class="row">
                <div class="col-25 font-right font-bold">${yanzhengma}</div>
                <div class="col-50"><input id="captcha" name="captcha" type="number" class="verification-code" placeholder="${yanzhengmajiaoyan}"></div>
                <div class="col-25"><img src="/regCode.do" style="width:100%;" onclick="reloadImage(this)"/></div>
            </div>
        </div>
        </form>
         <div class="button-list">
            <button class="reg-register-btn" onclick="sub()">${lijizhuce}</button>
        </div>
    </div>
</div>
<script type='text/javascript' src='language.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm-extend.min.js' charset='utf-8'></script>

<script type='text/javascript' src='../js/register.js'></script>
</body>
</html>