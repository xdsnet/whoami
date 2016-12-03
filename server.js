var express = require("express")
var app = express()
require('dotenv').load();

app.get("/*",function(req,res){
    //console.log(req.path)
    var apiPath = decodeURI(req.path) //解码出查询数据
    var serverHost=req.protocol+"://"+req.host+"/"
    var noRestStr='<!DOCTYPE html>'+
'<html lang="zh"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
'        <title>who am i microservice</title>'+
'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
'    </head>'+
'    <body>'+
'        <div class="container">'+
'            <h1 class="header">'+
'                API基本调用: Who am i服务(who am i microservice)'+
'            </h1>'+
'            <blockquote>'+
'                使用场景:'+
'                <ul>以标准调用接口<code>api/whoami/</code>调用服务,了解访问者的IP地址，语言，操作系统等信息。</ul>'+
'            </blockquote>'+
'            <h3>调用样例:</h3>'+
'            <code>'+serverHost+'api/whoami/</code>'+
'            <h3>样例输出:</h3>'+
'            <code>'+
'                {"ipaddress":"192.168.1.216","language":"zh-CN","software":"Windows NT 6.1; Win64; x64; rv:50.0"}'+
'            </code>'+
'        </div>'+
'</body></html>'
    
    if (apiPath!=="/api/whoami/"){
        res.end(noRestStr)
    }else{  
        var rt={};
        rt["ipaddress"]=req.ip
        rt["language"]=((req.headers["accept-language"]).split(","))[0]
        
        rt["software"]=/\((.*)\)/.exec(req.headers["user-agent"])[1]
        res.send(JSON.stringify(rt))
    }
})
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});