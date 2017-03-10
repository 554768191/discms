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
    <meta name="format-detection" content="telephone=no, email=no"/>
    <link rel="stylesheet" href="../css/sm.min.css">
    <link rel="stylesheet" href="../css/sm-extend.min.css">
    <link rel="stylesheet" href="../css/gc-all.css">
    <link rel="stylesheet" href="../css/deposit_money_details.css">
</head>
<body>
<div class="page-group page">
    <header class="bar bar-nav red1">
        <a class="button button-link button-nav header-left-link pull-left external" href="deposit1.html" data-transition='slide-out'>
            <img class="header-img" src="../img/login/back_arrow.png">
        </a>
       
        <h1 class="title"><span class="font-white font-18">${tianxiecunkuanxinxi}</span></h1>
        
    </header>

    <div class="content gray">
    	<div class="deposit-details-list font-14">
    		<div class="deposit-details-info">
    			<div>${xuanzeyhzhanghuziliao}</div>
    			<div class="row">
    				<div class="col-40">${kaihuhang}</div>
    				<div class="col-60"><label class="bank-add-info"></label></div>
    			</div>
    			<div class="row">
    				<div class="col-40">${shoukuanren}</div>
    				<div class="col-60"><label class="bank-account-info"></label></div>
    			</div>
    			<div class="row">
    				<div class="col-40">${yhmingcheng}</div>
    				<div class="col-60"><label class="bank-name-info"></label></div>
    			</div>
    			<div class="row">
    				<div class="col-40">${quxianyinhangzhanghao}</div>
    				<div class="col-60"><label class="bank-code-info"></label></div>
    			</div>
    			<div class="row">
    				<div class="col-40">${dingdanhao}</div>
    				<div class="col-60"><label class="bank-orderid-info"></label></div>
    			</div>
    		</div>
    		<div class="deposit-details-data">${tianxiecunkuanziliao}</div>
    		<div class="deposit-details-write">
    			<div class="row">
    				<div class="col-25">${dingdanhao}</div>
    				<div class="col-75"><label class="bank-orderid-info"></label></div>
    			</div>
    			<div class="row">
    				<div class="col-25">${cunrujine}</div>
    				<div class="col-75"><input type="text" class="deposit-money"></div>
    			</div>
    			<div class="row">
    				<div class="col-25">${cunrushijian}</div>
    				<div class="col-75"><input type="text"  id='datetime-picker'></div>
    			</div>
    			<div class="row">
    				<div class="col-25">${cunkuanren}</div>
    				<div class="col-75"><input type="text" class="deposit-account"></div>
    			</div>
    			<div class="row">
    				<div class="col-25">${cunkuanfangshi}</div>
    				<div class="col-75">
						<select id="deposit-type">
							<option value="0">请选择</option>
							<#list WbType as wt>
							   <option value="${wt.id}">${wt.name}</option>
							</#list>
						</select>
						<span class="icon icon-right" ></span>
					</div>
    			</div>
    		</div>
    		<div class="deposit-remarks">
    			<ul>
	    			<li>请备份订单号, 并复制进您的工作汇款备注栏</li>
	    			<li>转账完成后请保留单据作为核对证明</li>
	    			<li>
	    				接下来您可以透过以下方式完成转账...
	    				<ul>
	    					<li>网路银行转账: 登入您的网路银行完成转账</li>
	    					<li>ATM转帐: 到您最近的ATM将款项转到上述银行账号</li>
	    					<li>ATM现存: 到上述银行ATM以现金存入银行账号</li>
	    					<li>银行柜台: 到您最近的银行将款项转到上述银行账号</li>
	    				</ul>	
	    			</li>
					<li>请备份订单号, 并复制进您的工作汇款备注栏</li>
					<li>请确实填写转帐金额与时间</li>
					<li>每笔转帐请提交一次</li>
					<li>若您使用ATM存款, 请填写ATM所属分行，会加快您的款项到帐时间</li>
    			</ul>
    		</div>
    	</div>
        <input type="hidden" id="minAmount" name="minAmount" value="${minAmount}"/>
        <input type="hidden" id="maxAmount" name="maxAmount" value="${maxAmount}"/>
        <div class="button-list">
            <button class="details-submit-btn">${tijiao}</button>
            <a class="external" href="deposit1.html"><button class="details-previous-btn">${shangyibu}</button></a>
        </div>

    </div>
</div>

<script type='text/javascript' src='language.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/zepto-touch.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/sm-extend.min.js' charset='utf-8'></script>
<script type='text/javascript' src="../js/http_request.js" charset='utf-8'></script>
<script type='text/javascript' src='../js/deposit_money_details.js' charset='utf-8'></script>
</body>
</html>