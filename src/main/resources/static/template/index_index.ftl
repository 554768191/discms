<!DOCTYPE html>
<html>
<head>

</head>
<body>

<script>
   // 获取url参数
function getParam(paramName){
    paramValue ="";
    isFound =false;
    if (this.location.search.indexOf("?") ==0&&this.location.search.indexOf("=")>1){
        arrSource = unescape(this.location.search).substring(1,this.location.search.length).split("&");
        i =0;
        while (i < arrSource.length &&!isFound){
            if (arrSource[i].indexOf("=") >0){
                 if (arrSource[i].split("=")[0].toLowerCase()==paramName.toLowerCase()){
                    paramValue = arrSource[i].split("=")[1];
                    isFound =true;
                 }
            }
            i++;
        }  
    }
   return paramValue;
}
   //获取onlineCode
   var onlineCode = getParam("onlineCode");
   if(onlineCode&&onlineCode!=undefined){
      window.location.href='/src/${lang}/index.html?onlineCode='+onlineCode;
   }else{
      window.location.href='/src/${lang}/index.html';
   }
   
</script>
</body>
</html>