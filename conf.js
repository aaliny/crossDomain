var fs=require("fs");
var serverConf=fs.readFileSync("./server.conf");
var confs=serverConf.toString().split("\r\n");
var globalConfs={};
confs.forEach(ele=>{
    if(ele){
        globalConfs[ele.split("=")[0]]=ele.split("=")[1]
    }
})
module.exports=globalConfs;
