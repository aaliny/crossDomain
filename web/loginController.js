var dataMap=new Map()
var url=require("url");
var request=require("request")
var qryStudent=require("../dao/queryStudent")
function getData(req,res) {
    res.writeHead("200");
    var data=[{a:2},{d:1}]
    res.write(JSON.stringify(data));
    res.end();
}
function login(req,res){
  var query=url.parse(req.url,true).query;
  // console.log(query);
    req.on("data",(data)=>{
        var datas=data.toString();
        var stuid=datas.split("&")[0].split("=")[1];
        var psd=datas.split("&")[1].split("=")[1];
        qryStudent.qryPsdByStuId(stuid,function (result) {
            // console.log(result)
            if(result===null||result.length===0){
                var arr=[];
                res.writeHead("403");
                res.write("未查询到该学生")
                res.end();
            }else if(result[0].password===psd){
                // res.writeHead(200)
                res.writeHead(302,{location:'/main.html','Set-Cookie':`id=${stuid}`});
                res.write("ok")
                res.end();
            }else{
                res.writeHead("404");
                res.write("密码未匹配")
                res.end();

            }
        })

    })
}
function qryRobot(req,res){
    var obj=url.parse(req.url,true).query;
    console.log(obj.val)
    var param={
        "reqType":0,
        "perception": {
            "inputText": {
                "text": obj.val
            }
        },
        "userInfo": {
            "apiKey": "6207d1d1231c42928895fb730159aba6",
            "userId": "6207d1d1231c42928895fb730159aba6"
        }
    }
    request({
        url:"http://openapi.tuling123.com/openapi/api/v2",
        method:"POST",
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(param)
    },function (error,resp,body) {
        if(!error&&resp.statusCode===200){
            var head={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "x-requested-with , content-type"}
            res.writeHead(200,head);
            var obj = JSON.parse(body);
            if (obj && obj.results && obj.results.length >0 && obj.results[0].values) {
                res.write(JSON.stringify(obj.results[0].values));
                res.end();
            } else {
                response.write("{\"text\":\"布吉岛你说的是什么~\"}");
                res.end();
            }
        }else{
            res.writeHead(400);
            res.write('数据异常')
            res.end();
        }
    })

}
dataMap.set("/getData",getData);
dataMap.set("/login",login)
dataMap.set("/qryRobot",qryRobot)
module.exports.path=dataMap;