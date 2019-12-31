var http=require("http");
var url= require("url");
var fs=require("fs")
var globalConf=require("./conf");
var loder=require("./loader")
var log=require("./log")
// console.log(globalConf)
http.createServer((req,res)=>{
    // console.log(url.parse(req.url).pathname,url.parse(req.url,true).query);
    var pathname=url.parse(req.url).pathname
    log(pathname)
    if(isStatic(pathname)){
        try {
            console.log("666")
            var datas=fs.readFileSync(`${__dirname}${globalConf["page_path"]}${pathname}`)
            res.writeHead("200");
            res.write(datas);
            res.end();
        }catch (e) {
            res.writeHead("404");
            res.write("<html><body><h1>404 NotFound</h1></body></body></html>")
        }
    }else{
        // console.log(loder,pathname)
        if(loder.get(pathname)){
            // console.log(loder.get(pathname))
            try{
                loder.get(pathname)(req,res)
            }catch (e) {
                res.writeHead(500);
                res.write("<html><body><h1>500 BadServer</h1></body></html>");
                res.end();

            }
        } else{
            res.writeHead(404);
            res.write("<html><body><h1>404 NotFound</h1></body></html>");
            res.end();
        }


    }



}).listen(12306)
log("服务启动")
function isStatic(pathName) {
    var arrs=globalConf["static_file_type"].split("|");
    // console.log(arrs)
    for(var i=0;i<arrs.length;i++){
        if(pathName.indexOf(arrs[i])==pathName.length-arrs[i].length){
            return true;
            console.log('hhh')
        }
    }
    return false
}