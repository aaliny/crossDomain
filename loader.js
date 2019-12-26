var fs=require("fs");
var globalConf=require("./conf")
// console.log(__dirname)
var  pathMap=new Map();
var dirs=fs.readdirSync(`${__dirname}/${globalConf["web_path"]}`);
for(i=0;i<dirs.length;i++){
    var temp=require(`./${globalConf["web_path"]}/${dirs[i]}`);
    // console.log(temp.path)
    if(temp.path){
        for( var [key,val] of temp.path){
            if(pathMap.get(key)==null){
                pathMap.set(key,val)
            }   else{
                throw new Error("文件中定义错误")
            }
        }
    }
}
// console.log(dirs);
module.exports=pathMap;