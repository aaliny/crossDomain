var fs=require("fs");
var globalConf=require("./conf")
function log(data) {
    fs.writeFile(`${__dirname}${globalConf["log_path"]}`,data+'\n',{flag:'a'},()=>{})
}
module.exports=log;