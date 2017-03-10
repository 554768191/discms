/**
 * Created by Ly on 2016/11/07.
 */

// 获取轮播图
httpRequest.get(
	"/index/picture",
	{type:"2",lang:localStorage.lang},
	function(data){
		if(data){
			var html = "";
			for(var i = 0; i<data.length; i++){
				var img = data[i].picPath + "/" + data[i].picName;
				var remark = data[i].picPath + "/" +data[i].remark;
				html += "<div class='activity-img'>" +
   					"<a class='external' href='activity_details.html?remark=" + remark + "'><img alt='' src=" + img + "></a>" +
   					"</div>";
			}
			$(".activity-list").html(html);
		}
	}
);