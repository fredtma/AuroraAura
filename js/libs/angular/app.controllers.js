'use strict'
var cerebrum=angular.module('KingsControllers',[]);
cerebrum.controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams',exodus])
   .controller('bethel',['$scope','fetch','$rootScope','$location','$routeParams',bethel])
   .controller('deuteronomy',['$scope','fetch','$location','$routeParams',deuteronomy])
   .controller('leviticus',['$scope','crud','notitia','$routeParams',leviticus])
   .controller('joshua',['$scope','crud','$routeParams',joshua])
   .controller('numbers',['$scope','crud','$routeParams',numbers]);
//============================================================================//
/*
 * the controler for the login/logoff system.
 * the users data will stored into the localstorage and the permission will be retrieved.
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function exodus($scope,fetch,$rootScope,$location,$routeParams) {
   var service=dynamis.get("SITE_SERVICE")||"https://nedbankqa.jonti2.co.za/modules/exchange/inc/services.php";
   $scope.login=function(){
      var u,p,row,USER_NAME,procurator,msg;
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the username",false," danger bold");return false;}
      if("data" in $scope===false||"password" in $scope.data===false){iyona.msg("Your are required to fill in the password",false," danger bold");return false;}
      u=$scope.data.username;p=md5($scope.data.password);//aliquis
      $scope.attempt=0;
      fetch.post(service,{"militia":"aliquis","u":u,"p":p},function(server){var setting= new configuration(); iyona.deb(setting,'settting');
         if(server.length>0){row=server.rows[0];procurator=(row['level']==='super')?1:0;iyona.deb(row,"row");
            USER_NAME={"operarius":row['username'],"licencia":row['aditum'],"nominis":row['name'],"jesua":row['jesua'],"procurator":procurator,"cons":row["sess"]};
            dynamis.set("USER_NAME",USER_NAME,true);$rootScope['USER_NAME']=USER_NAME;
            setting.config().eternal();
            _$("[ng-controller='initSet']").scope().menus[1].href="#joshua/administrator/"+USER_NAME.operarius+"/details";
            $location.path("/genesis");
         }else{$scope.attempt++;msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");
         }
      });//fetch callback
   }//login
   $scope.forgot=function(){
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the email",false," danger bold");return false;}
      var u=$scope.data.username;
      fetch.post(service,{"militia":"oblitus","u":u},function(server){
         iyona.deb(server,"server");var clss=server.mail.status?" success":" danger bold";
         iyona.msg(server.mail.msg,false,clss)
      });//fetch
   }//forgot
   if($routeParams.login=='logoff'){ if(confirm("You are about to logout")){
      iyona.deb(dynamis.get("SITE_SERVICE"),'dynamis.get("SITE_SERVICE")',service);
      fetch.post(service,{"militia":"vel deleri"},function(server){
         iyona.msg(server.notitia.msg,server);});
         if("localStorage" in window) localStorage.clear(); sessionStorage.clear();}}
}
//============================================================================//
/*
 * The dashboard controler.
 * This controller first gets the data from the localStorage and then from the online data.
 * @param {object} $scope object scope
 * @param {object} fetch ajax function
 * @param {object} $rootScope root scope to init
 * @returns null
 */
function bethel($scope,fetch,$rootScope,$location,$routeParams){
   var cons=impetroUser().cons;$rootScope.init=dynamis.get("init",true)||{};var view=$routeParams.view;iyona.deb($rootScope.init,'$rootScope.init');
   if(typeof $rootScope.init=="object" && "servers" in $rootScope.init){ angular.extend($scope,$rootScope.init);
      $scope.total=$rootScope.init.servers.length;
      $scope.down=( ($rootScope.init.online.length>1)||($rootScope.init.online.length==1&&$rootScope.init.online.rows[0].status=="down") )?true:false;
      $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
      var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
      if($scope.down){
         $scope.msgStatus="You have "+n+" server down";
         for(var srv in $rootScope.init.online.rows){
            srv=$rootScope.init.online.rows[srv];if(srv.status!="active")$scope.msg+=srv.address+" is "+srv.status+". ";
         }
      }else{$scope.msgStatus="All servers are operational.";}
      $scope.last=$rootScope.init.online.rows[0].modified;
   }

   var serverEvent=new EventSource("https://nedbankqa.jonti2.co.za/modules/exchange/services/tester.php");
   serverEvent.onmessage=function(ev){iyona.deb(ev);}
   serverEvent.addEventListener('init',function(ev){
      var results=JSON.parse(ev.data);iyona.deb("SERVER EVENT",results,ev);
      if(!results||"servers" in results===false) {iyona.log("There was an error in bethel's results");return false;}
      $rootScope.init=results;dynamis.set("init",results,true);$scope.servers={},$scope.online={};$scope.serverLine={};
      iyona.deb(results,'results',$rootScope.init,dynamis.get("init",true));
      try{ angular.extend($scope,results);
         $scope.total=($rootScope.init.servers.length)?$rootScope.init.servers.length:'0';
         $scope.down=( ($rootScope.init.online.length>1)||($rootScope.init.online.length==1&&$rootScope.init.online.rows[0].status=="down") )?true:false;
         $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
         var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
         if($scope.down){
            $scope.msgStatus="You have "+n+" server down";
         }else{$scope.msgStatus="All servers are operational.";}
         $scope.last=$rootScope.init.online.rows[0].modified;
         $scope.$apply();
         if(PASCO)navigator.splashscreen.hide();iyona.deb($scope,'$scope');
      }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
   });
   serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);}
$scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){serverEvent.close();iyona.log("server event closed.")});

   $scope.moveTo=function(server,direct){
      if(!direct)$location.path("/leviticus/servers/"+server+"/details");
      else $location.path(server);
   }
}
//============================================================================//
/*
 * the servers log system.
 * display a simple list of server logs,
 * it depends if it will show all the last 10 logs or the logs for a specific server.
 * The menu is cutomized depending on what it is showing
 */
function deuteronomy($scope,fetch,$location,$routeParams){
   var address=$routeParams.server||null,serverName=$routeParams.log||null;$scope.data={};
   $scope.menu={"list":[{"name":"Server Logs", "url":"#deuteronomy/log-servers"}]}//set the menu
   if(address)$scope.menu.list[1]={"name":"View server: "+serverName, "url":"#leviticus/servers/"+serverName+"/details"};
   if(serverName)$scope.menu.list[2]={"name":serverName+" logs"};
   fetch.post(dynamis.get('SITE_SERVICE'),{"militia":"deut","servus":serverName},function(server){
      iyona.deb(server,'server');if(server&&"rows" in server===false) return false;
      angular.extend($scope.data,server.rows);iyona.deb($scope.data,'$scope.data');
   });
}
//============================================================================//
/*
 * single page for the server display.
 * server page does not use the crud default setting
 * This form customizes it display
 * @param {object} $scope
 * @param {object} $rootScope
 * @param {object} $routeParams
 * @param {service} notitia
 * @returns {undefined}
 */
function leviticus($scope,crud,notitia,$routeParams){
   $scope.menu={"details":[{"name":"Server List", "url":"#leviticus/servers/view/all"},{"name":"Server"}],"list":[{"name":"Server List", "url":"#leviticus/servers/new/details"}]}//set the menu
   var keyName="Server",mensa='servers',scope={"details":dynamis.get("scope")[$routeParams.page],"list":dynamis.get("scope")[$routeParams.page]},options={};
   options.consuetudinem="foreign";
   options.foreign={"link_clients_servers":{"parent":"name","col1":"server_name","col2":"client_name","refField":"name","refTable":"clients","title":"Link "+keyName+" to clients","type":"radio"}};
   $scope.view=$routeParams.view||'details';$scope.details=$routeParams.opt||'';$scope.cons={};
   $scope.data={};$scope.cust={};$scope.opt=options;$scope.btn="Add a new "+keyName;$scope.btnClass='form-control btn btn-primary';
   scope.details.name={"delta":"!@=!#","alpha":$scope.details};
//   scope.list.display={"alpha":null,"eta":{"field":'modified',"type":'date',"format":'%d %M, %Y %H:%i:%s'}};
   scope.list.status={"beta":"status","gamma":"DESC"};
   delete scope.list.jesua;delete scope.list.created;delete scope.list.mailbox;delete scope.list.password;

   crud.get($scope,scope,keyName,mensa,options);
   $scope.licentia=getLicentia();
   $scope.submit=function(){if(!$scope.data.mailbox){iyona.deb($scope.data,'data');$scope.data.mailbox=$scope.data.email.substr(0,$scope.data.email.indexOf('@'));} iyona.deb($scope.data,'data');}//crud.submit($scope,mensa,options);}
   $scope.delete=function(){crud.delete($scope,mensa);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.$on("readyList",function(e,server){iyona.deb("Blessed Savior.",server);
      for(var row in $scope.data){ row=$scope.data[row];row.modified=row.modified.replace('-','/'); row.modified=new Date(row.modified).format("dd mmmm, yyyy HH:MM:ss");row.count=timeDifference(row.modified)+' ago';
         if(row.status=="down") { row.icon="glyphicon-warning-sign";row.clss="danger red";row.tags=[{"name":"Server Down","cls":row.clss}];
         } else if(server.status=="slow") { row.icon="glyphicon-refresh";row.clss="warning";row.tags=[{"name":"Server Slow","cls":row.clss}];
         } else { row.icon="glyphicon-envelope";row.clss="success";row.tags=[{"name":"Server Up","cls":row.clss}];}
      }
   });
}
//============================================================================//
/*
 * users page for details and list
 * @param {object} $scope
 * @param {service} notitia
 * @param {object} $routeParams
 * @returns {void}
 */
function joshua($scope,crud,$routeParams){
   $scope.menu={"details":[{"name":"Administrators' List", "url":"#joshua/administrator/view/all"},{"name":"Administrator"}],"list":[{"name":"Administrators", "url":"#joshua/administrator/new/details"}]}//set the menu
   var keyName="administrator",mensa='users',scope={"details":dynamis.get("scope")[$routeParams.page],"list":dynamis.get("scope")[$routeParams.page]},options={};
   options.consuetudinem="foreign";
   options.foreign={"link_users_clients":{"parent":"username","col1":"username","col2":"client_name","refField":"name","refTable":"clients","title":"Link "+keyName+" to Clients"}};
   $scope.view=$routeParams.view||'details';$scope.details=$routeParams.opt||'';$scope.cons={};
   $scope.opt=options;$scope.btn="Add a new "+keyName;$scope.btnClass='form-control btn btn-primary';
   scope.details.username={"delta":"!@=!#","alpha":$scope.details};
   delete scope.list.title;delete scope.list.jesua;delete scope.list.modified;delete scope.list.created;
   //setup
   $scope.cons.communication=['email','sms','mobile','browser'];$scope.cons.titles=['Mr.','Mrs.','Miss.','Doc.','Sir.'];
   crud.get($scope,scope,keyName,mensa,options);
   $scope.submit=function(){crud.submit($scope,mensa,options);}
   $scope.delete=function(){crud.delete($scope,mensa);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){iyona.deb("Blessed Savior.",server);
      $scope.cons.comm=server.iota[0].communication;
   });
}
//============================================================================//
/*
 * the controler for clients
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function numbers($scope,crud,$routeParams) {
   $scope.menu={"details":[{"name":"Client List", "url":"#numbers/clients/view/all"},{"name":"Client"}],"list":[{"name":"Client List", "url":"#numbers/clients/new/details"}]}//set the menu
   var keyName="Client",mensa='clients',scope={"details":dynamis.get("scope")[$routeParams.page],"list":dynamis.get("scope")[$routeParams.page]},options={};
   options.consuetudinem="foreign";
   options.foreign={"link_users_clients":{"parent":"name","col1":"client_name","col2":"username","refField":"username","refTable":"users","title":"Link "+keyName+" to Users","type":"checkbox"}, "link_clients_servers":{"parent":"name","col1":"client_name","col2":"server_name","refField":"name","refTable":"servers","title":"Link "+keyName+" to servers","type":"radio"}};
   $scope.view=$routeParams.view||'details';$scope.details=$routeParams.opt||'';$scope.cons={};
   $scope.opt=options;$scope.btn="Add a new "+keyName;$scope.btnClass='form-control btn btn-primary';
   scope.details.name={"delta":"!@=!#","alpha":$scope.details};
   delete scope.list.modified;delete scope.list.created;

   crud.get($scope,scope,keyName,mensa,options);
   $scope.submit=function(){crud.submit($scope,mensa,options);}
   $scope.delete=function(){crud.delete($scope,mensa);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.licentia=getLicentia();
   $scope.$on("readyForm",function(e,server){iyona.deb("Blessed Savior.",server);});
}//function