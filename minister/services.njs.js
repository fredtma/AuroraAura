exports.content=function(head,response,mimeResult){
   var mysql = require('/wwwroot/localhost/auroraAura/minister/muneris.njs.js'),db=mysql.dbConnect();
   db.query("SELECT * FROM mb_xpandit.users WHERE username=? LIMIT 1",["fredtma"],function(err,rows,fields){
      if(err) throw err;
      var content = "The solution is: "+rows[0].firstname;
      console.log("content::",content);
      response.setHeader("Content-Type", mimeResult);
      response.writeHeader(200);
      response.write(content,"binary");
      response.end();
      return content;
   });
   db.end();
};