/*
 * web workers function support with minimun cloning of original
 * @todo:version_db
 */
var set_version,db;
var SITE_MILITIA='http://197.96.139.19/minister/inc/notitia.php';
var SITE_SERVICE='http://197.96.139.19/minister/inc/services.php';
var DB_VERSION='2.98';//@also:DB_VERSION in lib.muneris.js
function $DB(_quaerere,params,_msg,callback,reading,_eternal){
   var res,Tau,ver={};
   var VERSION="2.95";
   if(!db)db=openDatabase("road_cover","","The internal DB version",15*1024*1024,function(){});
   if(db.version!=VERSION&&!set_version){
      ver.ver=VERSION;
      ver.revision={};
//@todo: implement db version change
//      db.changeVersion(db.version,VERSION,function(trans){version_db(db.version,ver,trans)},function(e){console.log(e.message)},function(e){console.log('PASSED');});
      set_version=true;
   }
   if(!reading){
      db.transaction(function(trans){
         trans.executeSql(_quaerere,params,function(trans,results){
            var j=$DB2JSON(results);_msg=_msg||"Successful quaerere";
            if(_eternal){aSync(SITE_MILITIA,_eternal,function(j){});}
            if(typeof callback==="function")callback(results,j);
            iyona(_quaerere,params,_msg);
         },function(_trans,_error){
            _msg=_msg+":-:"+_error.message;iyona(_quaerere,params,_msg);
            if(_eternal&&_msg.indexOf('constraint failed')!=-1){iyona("God is good.");aSync(SITE_MILITIA,_eternal,function(j){});}//update the version, when the error is a constrain
         });
      });
   } else {
      db.readTransaction(function(trans){
         trans.executeSql(_quaerere,params,function(trans,results){
            var j=$DB2JSON(results);
            if(callback)callback(results,j);iyona(_quaerere,params,_msg);
         },function(_trans,_error){
            _msg=_msg+":--:"+_error.message;iyona(_quaerere,params,_msg);
         });
      });
   }
}
//============================================================================//
function $DB2JSON(_results,_type){
   var j={},row,col,len,x,k;
   switch(_type){
      case 1:break;
      case 2:break;
      default:
         len=_results.rows.length;
         for(x=0;x<len;x++){
            row=_results.rows.item(x);
            col=0;
            for(k in row){row[col]=row[k];col++;}
            j[x]=row;
         }//endfor
         j['rows']={"length":len,"source":"generated"}
         break;
   }//endswith
   return j;
 }
//============================================================================//
function aSync(options,data,callback){//www, var, object, method, format, call_success
   var settings={"method":"post","format":"json","www":SITE_SERVICE},params;
   if(typeof options === "object")for(var att in options)settings[att]=options[att];
   else {settings.www=options;settings.var=data;settings.callback=callback;}

   var xhr=new XMLHttpRequest();
   xhr.responseType=settings.format;
   xhr.open(settings.method,settings.www,true);
   xhr.onreadystatechange=function(e){
      if(this.readyState==4 && this.status==200){
         var response=this.response||"{}";//@fix:empty object so as to not cause an error
         if(typeof response==="string"&&settings.format==="json")response=JSON.parse(response);//wen setting responseType to json does not work
         if(typeof settings.callback==="function")settings.callback(response);
      }
   }
   if(settings.var&&typeof settings.var==="object") {
//      var params=new FormData();for (var key in settings.var)params.append(key,settings.var[key]);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      params=JSON.stringify(settings.var);
   }else{
      params=settings.var;
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//      xhr.setRequestHeader("Content-length", params.length);xhr.setRequestHeader("Connection","close");
   }
   xhr.onerror=function(e){e;}
   xhr.send(params);
}
//============================================================================//
function iyona(){
   var l=arguments.length,variable;//WORK.postMessage(arguments);
   for(var x=0;x<l;x++){variable=typeof arguments[x]==="function"?encodeURI(arguments[x].toString()):arguments[x]; WORK.postMessage(variable);}
//   for(var x=0;x<l;x++){variable=typeof arguments[x]==="function"?encodeURI(arguments[x].toString()):arguments[x]; WORK.postMessage(variable);}
}
//============================================================================//
function resetNotitia(_option){
   var db,sql,group,link,perm,client,contact,address,dealer,salesman,ver,features,pages;
   WORK.postMessage("reset progress");
   if(_option.address)$DB("DROP TABLE address",[],"DROP table address");
   if(_option.client)$DB("DROP TABLE clients",[],"DROP table clients");
   if(_option.contact)$DB("DROP TABLE contacts",[],"DROP table contact");
   if(_option.dealer)$DB("DROP TABLE dealers",[],"DROP table dealer");
   if(_option.features)$DB("DROP TABLE features",[],"DROP table features");
   if(_option.groups)$DB("DROP TABLE groups",[],"DROP table groups");
   if(_option.pg)$DB("DROP TABLE link_permissions_groups",[],"DROP table link_permissions_groups");
   if(_option.pu)$DB("DROP TABLE link_permissions_users",[],"DROP table link_permissions_users");
   if(_option.ug)$DB("DROP TABLE link_users_groups",[],"DROP table link_users_groups");
   if(_option.pages)$DB("DROP TABLE pages",[],"DROP table pages");
   if(_option.perm)$DB("DROP TABLE permissions",[],"DROP table permissions");
   if(_option.salesman)$DB("DROP TABLE salesmen",[],"DROP table salesmen");
   if(_option.users)$DB("DROP TABLE users",[],"DROP table users");
   if(_option.db)$DB("DROP TABLE version_db",[],"DROP table version_db");
   if(_option.ver)$DB("DROP TABLE versioning",[],"DROP table versioning");

   address="CREATE TABLE IF NOT EXISTS address(id INTEGER PRIMARY KEY AUTOINCREMENT,ref_name INTEGER,ref_group INTEGER, `type` TEXT NOT NULL DEFAULT 'residential', street TEXT NOT NULL, city TEXT NOT NULL, region TEXT DEFAULT 'Gauteng', country TEXT DEFAULT 'South Africa', modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT `fk_user_adr` FOREIGN KEY (`ref_name`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,CONSTRAINT `fk_client_adr` FOREIGN KEY (`ref_name`) REFERENCES `clients` (`id`) ON UPDATE CASCADE ON DELETE CASCADE)";
   if(_option.address)$DB(address,[],'Table address created');
   if(_option.address)$DB("CREATE INDEX address_ref_name ON address(ref_name)",[],"index ref_name");
   if(_option.address)$DB("CREATE INDEX address_jesua ON address(jesua)",[],"index address_jesua");
   client="CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY AUTOINCREMENT, company TEXT NOT NULL UNIQUE, code TEXT NOT NULL UNIQUE, about TEXT, email TEXT NOT NULL, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.client)$DB(client,[],'Table clients created');
   if(_option.client)$DB("CREATE INDEX client_company ON clients(company)",[],"index client_company");
   if(_option.client)$DB("CREATE INDEX client_code ON clients(code)",[],"index client_code");
   if(_option.client)$DB("CREATE INDEX client_jesua ON clients(jesua)",[],"index client_jesua");
   contact="CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,ref_name INTEGER,ref_group INTEGER, `type` TEXT NOT NULL DEFAULT 'tel', contact TEXT NOT NULL, instruction TEXT, ext TEXT, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT `fk_user_contact` FOREIGN KEY (`ref_name`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,CONSTRAINT `fk_client_contact` FOREIGN KEY (`ref_name`) REFERENCES `clients` (`id`) ON UPDATE CASCADE ON DELETE CASCADE)";
   if(_option.contact)$DB(contact,[],'Table contacts created');
   if(_option.contact)$DB("CREATE INDEX contact_ref_name ON contacts(ref_name)",[],"index ref_name");
   if(_option.contact)$DB("CREATE INDEX contact_contact ON contacts(contact)",[],"index contact");
   if(_option.contact)$DB("CREATE INDEX contact_jesua ON contacts(jesua)",[],"index contact_jesua");
   dealer="CREATE TABLE IF NOT EXISTS dealers(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT NOT NULL, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.dealer)$DB(dealer,[],'Table dealer created');
   if(_option.dealer)$DB("CREATE INDEX dealer_name ON dealers(name)",[],"index dealer_name");
   if(_option.dealer)$DB("CREATE INDEX dealer_jesua ON dealers(jesua)",[],"index dealer_jesua");
   features="CREATE TABLE features(id INTEGER PRIMARY KEY AUTOINCREMENT,feature TEXT NOT NULL UNIQUE,description TEXT,category TEXT,filename TEXT,manus TEXT,tab TEXT, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.features)$DB(features,[],'Version table created');
   if(_option.features)$DB("CREATE INDEX features_jesua ON features(jesua)",[],"index features_jesua");
   group="CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, desc TEXT, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.groups)$DB(group,[],'Table groups created');
   if(_option.groups)$DB("CREATE INDEX groups_name ON groups(name)",[],'index groups_name');
   if(_option.groups)$DB("CREATE INDEX group_jesua ON groups(jesua)",[],"index group_jesua");
   link="CREATE TABLE IF NOT EXISTS link_permissions_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, `permission` TEXT NOT NULL, `group` TEXT NOT NULL, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT `fk_perm_group` FOREIGN KEY (`permission`) REFERENCES `permissions` (`name`) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT `fk_group_perm` FOREIGN KEY (`group`) REFERENCES `groups` (`name`) ON UPDATE CASCADE ON DELETE CASCADE)";
   if(_option.pg)$DB(link,[],'Table link to permissions to groups created');
   if(_option.pg)$DB("CREATE INDEX link_permgroup_perm ON link_permissions_groups(`permission`)",[],'index link_permgroup_perm');
   if(_option.pg)$DB("CREATE INDEX link_permgroup_group ON link_permissions_groups(`group`)",[],'index link_permgroup_group');
   link="CREATE TABLE IF NOT EXISTS link_permissions_users(id INTEGER PRIMARY KEY AUTOINCREMENT, `permission` TEXT NOT NULL, `user` TEXT NOT NULL, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT `fk_perm_user` FOREIGN KEY (`permission`) REFERENCES `permissions` (`name`) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT `fk_user_perm` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE ON DELETE CASCADE)";
   if(_option.pu)$DB(link,[],'Table link to permissions to users created');
   if(_option.pu)$DB("CREATE INDEX link_permuser_perm ON link_permissions_users(`permission`)",[],'index link_permuser_perm');
   if(_option.pu)$DB("CREATE INDEX link_permuser_user ON link_permissions_users(`user`)",[],'index link_permuser_user');
   link="CREATE TABLE IF NOT EXISTS link_users_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, `user` TEXT NOT NULL, `group` TEXT NOT NULL, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT `fk_user_group` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT `fk_group_user` FOREIGN KEY (`group`) REFERENCES `groups` (`name`) ON UPDATE CASCADE ON DELETE CASCADE)";
   if(_option.ug)$DB(link,[],'Table link to users and groups created');
   if(_option.ug)$DB("CREATE INDEX link_usergroup_user ON link_users_groups(`user`)",[],'index link_usergroup_user');
   if(_option.ug)$DB("CREATE INDEX link_usergroup_group ON link_users_groups(`group`)",[],'index link_usergroup_group');
   pages="CREATE TABLE pages(`id` INTEGER PRIMARY KEY AUTOINCREMENT,`page_ref` TEXT ,`title` TEXT NOT NULL UNIQUE, `content` TEXT NOT NULL,`level` TEXT, `type` TEXT,modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE, `selector` TEXT, `option` TEXT, `position` TEXT)";
   if(_option.pages)$DB(pages,[],'Pages table created');
   if(_option.pages)$DB("CREATE INDEX pages_type ON pages(`type`)",[],"index pages_type");
   if(_option.pages)$DB("CREATE INDEX pages_selector ON pages(`selector`)",[],"index pages_selector");
   if(_option.pages)$DB("CREATE INDEX pages_jesua ON pages(jesua)",[],"index pages_jesua");
   perm="CREATE TABLE IF NOT EXISTS permissions (id INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL UNIQUE, `desc` TEXT NOT NULL, `page` TEXT, `enable` INTEGER DEFAULT 1, `rank` INTEGER DEFAULT 0, `icon` TEXT, `sub` TEXT DEFAULT '-1', modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.perm)$DB(perm,[],'Table permissions created');
   if(_option.perm)$DB("CREATE INDEX perm_name ON permissions(name)",[],"index perm_name");
   if(_option.perm)$DB("CREATE INDEX perm_jesua ON permissions(jesua)",[],"index perm_jesua");
   salesman="CREATE TABLE IF NOT EXISTS salesmen(id INTEGER PRIMARY KEY AUTOINCREMENT, dealer INTEGER, firstname TEXT NOT NULL, lastname TEXT NOT NULL, code TEXT NOT NULL, idno TEXT, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE,CONSTRAINT fk_sales_dealer FOREIGN KEY (`dealer`) REFERENCES dealers(`id`) ON DELETE CASCADE ON UPDATE CASCADE)";
   if(_option.salesman)$DB(salesman,[],'Table salesman created');
   if(_option.salesman)$DB("CREATE INDEX salesman_firstname ON salesmen(firstname)",[],"index salesman_firstname");
   if(_option.salesman)$DB("CREATE INDEX salesman_lastname ON salesmen(lastname)",[],"index salesman_lastname");
   if(_option.salesman)$DB("CREATE INDEX salesman_idno ON salesmen(idno)",[],"index salesman_idno");
   if(_option.salesman)$DB("CREATE INDEX salesman_dealer ON salesmen(dealer)",[],"index salesman_dealer");
   if(_option.salesman)$DB("CREATE INDEX salesman_jesua ON salesmen(jesua)",[],"index salesman_jesua");
   sql="CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(90) NOT NULL UNIQUE, password TEXT NOT NULL, firstname TEXT NOT NULL, lastname TEXT NOT NULL, email TEXT NOT NULL, gender TEXT NOT NULL,`level` TEXT, modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.users)$DB(sql,[],'Table users created');
   if(_option.users)$DB("CREATE INDEX user_username ON users(username)",[],"index user_username");
   if(_option.users)$DB("CREATE INDEX user_email ON users(email)",[],"index user_email");
   if(_option.users)$DB("CREATE INDEX user_jesua ON users(jesua)",[],"index user_jesua");
   db="CREATE TABLE IF NOT EXISTS version_db (id INTEGER PRIMARY KEY AUTOINCREMENT, ver FLOAT UNIQUE)";
   if(_option.db)$DB(db,[],'Table version_db created');
   if(_option.db)$DB("CREATE INDEX db_ver ON version_db(ver)",[],"index version_db");
   if(_option.db)$DB("INSERT INTO version_db (ver)VALUES(?)",[DB_VERSION]);
   ver="CREATE TABLE versioning(id INTEGER PRIMARY KEY AUTOINCREMENT,user INTEGER NOT NULL,content text NOT NULL,iota INTEGER NOT NULL,trans INTEGER NOT NULL,mensa TEXT,modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, creation TEXT, jesua TEXT UNIQUE)";
   if(_option.ver)$DB(ver,[],'Version table created');
   if(_option.ver)$DB("CREATE INDEX ver_jesua ON versioning(jesua)",[],"index ver_jesua");

   if(_option.client){novaNotitia("clients","getClients",["id","company","code","about","email","modified","creation","jesua"]);}//endif
   if(_option.dealer)novaNotitia("dealers","getDealer",["name","code","modified","creation","jesua"]);
   if(_option.features){novaNotitia("features","getFeatures",["id","feature","description","category","filename","manus","tab","creation","modified","creation","jesua"]);}//endif
   if(_option.groups){novaNotitia("groups","getGroups",["id","name","desc","modified","creation","jesua"]);}//endif
   if(_option.pu){novaNotitia("link_permissions_users","getPU",["id","permission","user"])}//endif
   if(_option.pg){novaNotitia("link_permissions_groups","getPG",["id","permission","group"])}//endif
   if(_option.ug){novaNotitia("link_users_groups","getUG",["id","user","group"])}//endif
   if(_option.pages){novaNotitia("pages","getPages",["id","page_ref","title","content","level","type","modified","creation","jesua","selector","option","position"]);}//endif
   if(_option.perm){novaNotitia("permissions","getPerm",["id","name","desc","page","enable","sub","modified","creation","jesua"])}//endif
   if(_option.salesman)novaNotitia("salesmen","getSaleman",["firstname","lastname","code","modified","creation","jesua"]);
   if(_option.users){novaNotitia("users","getUsers",["id","username","password","firstname","lastname","email","gender","level","modified","creation","jesua"]);}//endif
}
//============================================================================//
novaNotitia=function(_mensa,_command,_fields){
   var fields='',values=[],sql;var x,l,f=[],n=[];
   aSync({"var":"militia="+_command,"callback":function(json){
      l=_fields.length;
      for(x=0;x<l;x++){f.push('?');n.push('`'+_fields[x]+'`');}
      for(var row in json){ iyona("COMMANDS",_command,row,json[row]);
         if(row==='rows')continue;
         l=_fields.length;
         for(x=0;x<l;x++){values.push(json[row][_fields[x]]);}
         if(_command=="getUsers")json[row].gender=json[row].gender=='Male'?'1':'2';
         fields+=fields==''?"SELECT "+f.join():" UNION SELECT "+f.join();
      };
      sql="INSERT INTO "+_mensa+" ("+n.join()+") "+fields;
      $DB(sql,values,"added "+_mensa,function(){
         WORK.postMessage({"progress":true,"resetTable":_command});
      });
   }});
}
//============================================================================//


