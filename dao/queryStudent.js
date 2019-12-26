var daoUtil=require("./daoUtil");
function qryPsdByStuId(id,succ){
    var connection=daoUtil.connection();
    connection.connect();
    var qrySql="select * from student where id=?";
    connection.query(qrySql,id,(err,result)=>{
        if(err===null){
            // console.log(result);
            succ(result)
        }else{
            console.log(err)
        }
    })
    connection.end();
}
// qryPsdByStuId(1);
module.exports={"qryPsdByStuId":qryPsdByStuId}