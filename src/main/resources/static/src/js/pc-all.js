/**
 * Created by gavin on 2016/10/24.
 */

// 计算金钱
function formatMoney(num) {
	num = num.toFixed(2);
	var parts = num.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

// 当金钱数字null
function formatMoneyIsNull(num){
	num == null ? 0 : num;
	return num;
}
/**
 * 时间戳转日期
 * @param timestamp
 * @returns
 */
function formatDate(timestamp){
	if(!timestamp){
		return '';
	}
	var newDate = new Date();
	newDate.setTime(timestamp); 
	return newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
}

// 状态
function formatStatus(stat){
	if(!stat){
		return '未收注';
	}
	switch(stat){
	case '0':
		return '未收注';
		break;
	case '1':
		return '进行中';
		break;
	case '2':
		return '已结算';
		break;
	case '3':
		return '退款';
		break;
	case '4':
		return '拒绝';
		break;
	}
	return '未收注'; 
}

// 结果
function formatResult(res){
	if(!res){
		return '';
	}
	switch(res){
	case '0':
		return '和';
	case '1':
		return '赢';
	case '2':
		return '输';
	case '3':
		return '赢半';
	case '4':
		return '输半';
	}
	return '';
}

//额度转换订单状态
function formatTransferResult(res){
	if(!res){
		return '';
	}
	switch(res){
	case '0':
		return '转账失败';
	case '1':
		return '转账成功';
	case '2':
		return '转账失败';
	case '3':
		return '请求超时';
	}
	return '';
}


// 获取url参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) 
		return unescape(r[2]); 
	return null; //返回参数值
} 
