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
    <link rel="stylesheet" href="../css/deposit_money.css">
</head>
<body>
<div class="page-group page">
    <header class="bar bar-nav red1">
        <a class="button button-link button-nav header-left-link pull-left external" href="my.html" data-transition='slide-out'>
            <img class="header-img" src="../img/login/back_arrow.png">
        </a>
       
        <h1 class="title"><span class="font-white font-18">${cunkuan}</span></h1>
        
    </header>

    <div class="content gray">
        <div class="deposit-money-list font-14">
            <div class="row">
                <div class="col-25 font-right font-bold">${huiyuanzhanghao}</div>
                <div class="col-75"><label class="account-no"></label></div>
            </div>
             <div class="row">
                <div class="col-25 font-right font-bold">${zhifuyinhang}</div>
                <div class="col-75">
                	<select id="payment-type">
                		<option value="0" data-bank="">请选择</option>
                		<#list banks as bank>
                		  <option value="${bank.id}" data-bank="${bank.payType}">${bank.name}</option>
                		</#list>
                	</select>
                	<span class="icon icon-right" ></span>
                </div>
            </div>
        </div>
        <div class="deposit-info">
	        <div class="deposit-bank">${qingxuanzecunruyh}</div>
	        <div class="deposit-money-info font-14">
	        	
	        </div>
        </div>

        <div class="button-list">
            <button class="payment-submit-btn">${xiayibu}</button>
        </div>

    </div>
</div>
<script type='text/javascript'>
   var bindPhone='${bindPhone?string('true', 'false')}';
</script> 
<script type='text/javascript' src='language.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto-touch.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm-extend.min.js' charset='utf-8'></script>
<script type='text/javascript' src="../js/http_request.js" charset='utf-8'></script>
<script type='text/javascript' src='../js/deposit_money.js' charset='utf-8'></script>
</body>
</html>