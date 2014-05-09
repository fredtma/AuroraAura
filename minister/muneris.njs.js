var mysql= require('/wwwroot/localhost/node_modules/mysql');
//============================================================================//
//CONNECTION DB MYSQL                                                         //
//============================================================================//
var db = mysql.createConnection({"host":"localhost","user":"xpandit","password":"Success2013","database":"mb_xpandit"});
db.connect(function(err){if(err){console.log("error when connection to DB:",err); setTimeout(dbConnect,2000);} });
db.on("error",function(err){
   console.log("DB error::",err);
   if(err.code==='PROTOCOL_CONNECTION_LOST'){
      dbConnect();
   } else {
      throw err;
   }
});

exports.dbConnect = function (){
   var db = mysql.createConnection({"host":"localhost","user":"xpandit","password":"Success2013","database":"mb_xpandit"});
   db.connect(function(err){if(err){console.log("error when connection to DB:",err); setTimeout(dbConnect,2000);} });
   db.on("error",function(err){
      console.log("DB error::",err);
      if(err.code==='PROTOCOL_CONNECTION_LOST'){
         dbConnect();
      } else {
         throw err;
      }
   });
   return db;
}
exports.db=db;
//============================================================================//