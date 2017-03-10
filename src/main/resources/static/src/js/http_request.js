/**
 * Created by gavin on 2016/10/25.
 */
function AjaxHelper() {
    this.ajax = function(url, type, dataType, data, callback) {
        $.ajax({
            url: url,
            type: type,
            dataType: dataType,
            data: data,
            success: function(result){
            	if("loginout"==result){
            		var local_lang=localStorage.lang;
            		switch (local_lang) {
					case 'zh_CN':
						window.location.href='/src/CH/login.html';
						return;
					case 'zh_HK':
						window.location.href='/src/HK/login.html';
						return;
					case 'en_UK':
						window.location.href='/src/US/login.html';
						return;
					default:
						break;
					}
            		window.location.href='login.html';
            		return;
            	}
            	if(result){
            		result=$.parseJSON(result);
            	}else{
            		result=null;
            	}
            	callback(result);
            },
            error: function(xhr, errorType, error) {
                //('Ajax request error, errorType: ' + errorType +  ', error: ' + error)
            }
        })
    }
}
// ajax get请求
AjaxHelper.prototype.get = function(url, data, callback) {
    this.ajax(url, 'GET', 'text', data, callback)
}

// ajax post请求
AjaxHelper.prototype.post = function(url, data, callback) {
    this.ajax(url, 'POST', 'text', data, callback)
}

//ajax get请求(text)
AjaxHelper.prototype.getText = function(url, data, callback) {
    this.ajax(url, 'GET', 'text', data, callback)
}

//ajax post请求(text)
AjaxHelper.prototype.postText = function(url, data, callback) {
    this.ajax(url, 'POST', 'text', data, callback)
}

// 构造函数
AjaxHelper.prototype.constructor = AjaxHelper

// 初始化对象
var httpRequest = new AjaxHelper();

