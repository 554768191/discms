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
    <link rel="stylesheet" href="../css/operate_bank.css">
</head>
<body>
<div class="page-group page">
    <header class="bar bar-nav red1">
		<a class="button button-link button-nav header-left-link pull-left external" href="banks.html" data-transition='slide-out'>
            <img class="header-img" src="../img/login/back_arrow.png">
        </a>
        
        <h1 class="title"><span class="font-white font-18">${bianjiyhk}</span></h1>

    </header>
    
    <div class="content gray">
   		<div class="add_bank_list font-14">
            <div class="row">
                <div class="col-25 font-right font-bold">${yhmingcheng}</div> 
                <div class="col-75">
                	<select id="bank-name">
                	    <option value="">请选择</option>
                	    <#list banks as bank>
                		<option value="${bank.name}">${bank.name}</option>
                		</#list>
                	</select>
                </div>
            </div>
            <div class="row">
                <div class="col-25 font-right font-bold">${kaihuming}</div>
                <div class="col-75"><input type="text" class="real-name" ver="${isEditCashName?string('true','false')}"></div>
            </div>
            <div class="row">
                <div class="col-25 font-right font-bold">${kaihuzhanghao}</div>
                <div class="col-75"><input type="text" class="account-no"></div>
            </div>
            <div class="row">
                <div class="col-25 font-right font-bold">${kaihuhang}</div>
                <div class="col-75"><input type="text" class="bank-address" placeholder="例四川省银行高新支行,请务必填写"></div>
            </div>
            <div class="row">
                <div class="col-25 font-right font-bold">${qukuanmima}</div>
                <div class="col-75"><input type="text" class="bank-password"></div>
            </div>
   		</div>
   		
   		<div class="add_bank_botton_list row">
   			   <div class="col-50"><button class="sumbit-btn font-white">${tijiao}</button></div>
   			   <div class="col-50">
	   			   <a class="external font-red" href="banks.html" >
	   			   		<button class="cancel-btn">${quxiao}</button>
	   			   </a>
   			   </div>
   		</div>
	</div>
</div>

<script type='text/javascript' src='language.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto-touch.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm-extend.min.js' charset='utf-8'></script>
<script type='text/javascript' src="../js/http_request.js" charset='utf-8'></script>
<script type='text/javascript' src='../js/operate_bank.js' charset='utf-8'></script>
</body>
</html>