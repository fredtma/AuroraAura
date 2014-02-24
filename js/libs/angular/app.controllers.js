'use strict'
var cerebrum=angular.module('KingsControllers',[]);
cerebrum.controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams','crud',exodus])
   .controller('bethel',['$scope','fetch','$rootScope','$location','$routeParams',bethel])
   .controller('deuteronomy',['$scope','fetch','$location','$routeParams',deuteronomy])
   .controller('leviticus',['$scope','crud','$routeParams',leviticus])
   .controller('joshua',['$scope','crud','$routeParams',joshua])
   .controller('numbers',['$scope','crud','$routeParams',numbers]);
//============================================================================//
/*
 * the controler for the login/logoff system.
 * the users data will stored into the localstorage and the permission will be retrieved.
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function exodus($scope,fetch,$rootScope,$location,$routeParams,crud) {
   var service=dynamis.get("SITE_SERVICE")||"https://nedbankqa.jonti2.co.za/modules/exchange/inc/services.php",
   gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};
   $scope.login=function(e,s,t){iyona.deb('gPlus',gPlus);
      var u,p,row,USER_NAME,procurator,msg;s=s||gPlus.user_info.id;e=e||gPlus.user_info.emails[0].value;t=t||gPlus.user_info.kind;
      if(!s||s==0){
         if(crud.check($scope,'dataForm')===false)return false;
         u=$scope.data.username;p=md5($scope.data.password);//aliquis
      }else{}//skip validation on autologin
      $scope.attempt=0;
      fetch.post(service,{"militia":"aliquis","u":u,"p":p,"s":s,"e":e,"t":t},function(server){var setting= new configuration(); iyona.deb(setting,'settting');
         if(server.length>0){row=server.rows[0];procurator=(row['level']==='super')?1:0;iyona.deb(row,"row");
            USER_NAME={"operarius":row['username'],"licencia":row['aditum'],"nominis":row['name'],"jesua":row['jesua'],"procurator":procurator,"cons":row["sess"]};
            dynamis.set("USER_NAME",USER_NAME,true);$rootScope['USER_NAME']=USER_NAME;
            setting.config().eternal();
            $rootScope.menus[1].href="#joshua/administrator/"+USER_NAME.operarius+"/details";
            $rootScope.panelLeft[1].href="#joshua/administrator/"+USER_NAME.operarius+"/details";
            $location.path("/genesis");
         }else{$scope.attempt++;msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");
         }
      });//fetch callback
   }//login
   $scope.forgot=function(){
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the email",false," danger bold"); return false;}
      var u=$scope.data.username;
      fetch.post(service,{"militia":"oblitus","u":u},function(server){
         iyona.deb(server,"server");var clss=server.mail.status?" success":" danger bold";
         iyona.msg(server.mail.msg,false,clss)
      });//fetch
   }//forgot
   $scope.google=function(){
      if (typeof chrome !== "undefined" && chrome.hasOwnProperty("identity")) {
         gPlus = new GPLUS_USER();
         gPlus.getUserInfo(true,function(user_info,access_token){iyona.deb('user_info',user_info);
            if(user_info&&user_info.emails&&user_info.emails[0].value&&user_info.id){$scope.login(user_info.emails[0].value,user_info.id,user_info.kind);}
         });
      }
   }//plus login button
   if(typeof chrome !== "undefined")iyona.deb("CHROME",chrome);
   if (!$routeParams.login) {$scope.google();}

   if($routeParams.login=='logoff'){
      $("#myModal").modal("show");
      $(".modal-title").html("Login out");
      $(".modal-body").html("You are about to logout?<br/>Click yes to remove all your details and session.");
      $("#btnYesModal").click(function(){
         fetch.post(service,{"militia":"vel deleri"},function(server){iyona.msg(server.notitia.msg,server);});
         if("localStorage" in window) localStorage.clear(); sessionStorage.clear();
         gPlus=gPlus||new GPLUS_USER();if(gPlus.hasOwnProperty("revokeToken")) gPlus.revokeToken();
         $(this).unbind('click');$("#myModal").modal("hide");});}
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
   if(typeof $rootScope.init=="object" && "servers" in $rootScope.init){ angular.extend($scope,$rootScope.init);iyona.deb('$rootScope.init',$rootScope.init);
      var row1 = (typeof $scope.online.rows[0] !=="undefined")?$scope.online.rows[0].count:0,row2 = (typeof $scope.online.rows[1] !=="undefined")?$scope.online.rows[1].count:0;
      $scope.total=parseInt(row1)+parseInt(row2);
      $scope.down=( ($scope.online.length>1)||($scope.online.length==1&&$scope.online.rows[0].status=="down") )?true:false;
      $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
      var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
      if($scope.down){
         $scope.msgStatus="You have "+n+" server down";
      }else{$scope.msgStatus="All servers are operational.";}/*set scroller*/setTimeout(function(){SETiSCROLL(".dashboard")},2000);
      $scope.last=$scope.online.rows[0].modified;
   }iyona.deb("TYPE",typeof EventSource,window.hasOwnProperty("EventSource"));
   if(window.hasOwnProperty("EventSource")){iyona.deb("SSE");
      var serverEvent=new EventSource("https://nedbankqa.jonti2.co.za/modules/exchange/services/tester.php?view="+view);
      serverEvent.onmessage=function(ev){iyona.deb("SERVER EVENT MESSAGE",results,ev);}
      serverEvent.addEventListener('init',function(ev){
         var results=JSON.parse(ev.data);iyona.deb("SERVER EVENT INIT",results,ev);
         if(!results||"servers" in results===false) {iyona.log("There was an error in bethel's results");return false;}
         $rootScope.init=results;dynamis.set("init",results,true);$scope.servers={},$scope.online={};$scope.serverLine={};
         iyona.deb(results,'results',$rootScope.init,dynamis.get("init",true));
         try{ angular.extend($scope,results);results=null;
            var row1 = (typeof $scope.online.rows[0] !=="undefined")?$scope.online.rows[0].count:0,row2 = (typeof $scope.online.rows[1] !=="undefined")?$scope.online.rows[1].count:0;
            $scope.total=parseInt(row1)+parseInt(row2);
            $scope.down=( ($scope.online.length>1)||($scope.online.length==1&&$scope.online.rows[0].status=="down") )?true:false;
            $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
            var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
            if($scope.down){
               $scope.msgStatus="You have "+n+" server down";
            }else{$scope.msgStatus="All servers are operational.";}
            $scope.last=$scope.online.rows[0].modified;
            $scope.$apply();
            if(PASCO){navigator.splashscreen.hide();serverEvent.close();}//for mobile platform close the SSE & splash.
            else if(!$scope.once) {setTimeout(function(){SETiSCROLL(".dashboard")},1500); $scope.once=true;}
         }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
      });
      serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);}
      $scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){serverEvent.close();iyona.log("server event closed.")});
   }else{iyona.deb("NO SSE");
      fetch.post(dynamis.get('SITE_SERVICE'),{'militia':'init'},function(results){
         if(!results||"servers" in results===false) {iyona.log("There was an error in bethel's results");return false;}
         $rootScope.init=results;dynamis.set("init",results,true);$scope.servers={},$scope.online={};$scope.serverLine={};
         try{ angular.extend($scope,results);results=null;
            var row1 = (typeof $scope.online.rows[0] !=="undefined")?$scope.online.rows[0].count:0,row2 = (typeof $scope.online.rows[1] !=="undefined")?$scope.online.rows[1].count:0;
            $scope.total=parseInt(row1)+parseInt(row2);
            $scope.down=( ($scope.online.length>1)||($scope.online.length==1&&$scope.online.rows[0].status=="down") )?true:false;
            $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
            var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
            if($scope.down){
               $scope.msgStatus="You have "+n+" server down";
            }else{$scope.msgStatus="All servers are operational.";}
            $scope.last=$scope.online.rows[0].modified;
            if(PASCO){navigator.splashscreen.hide();serverEvent.close();}//for mobile platform close the SSE & splash.
            else if(!$scope.once) {setTimeout(function(){SETiSCROLL(".dashboard")},1500); $scope.once=true;}
         }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
      });
   }
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
//   if(address)$scope.menu.list[1]={"name":"View server: "+serverName, "url":"#leviticus/servers/"+serverName+"/details"};
   if(serverName)$scope.menu.list[2]={"name":serverName+" logs"};
   fetch.post(dynamis.get('SITE_SERVICE'),{"militia":"deut","servus":serverName},function(server){
      iyona.deb(server,'server');if(server&&"rows" in server===false) return false;/*set scroller*/setTimeout(SETiSCROLL,1000);
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
function leviticus($scope,crud,$routeParams){
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
   $scope.submit=function(dataForm){if(!$scope.data.mailbox&&$scope.data.email){
      $scope.data.mailbox=$scope.data.email.substr(0,$scope.data.email.indexOf('@'));}$scope.dataForm=dataForm; iyona.deb('$scope',$scope,dataForm);
      crud.submit($scope,mensa,options);}
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
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,mensa,options);}
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
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,mensa,options);}
   $scope.delete=function(){crud.delete($scope,mensa);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.licentia=getLicentia();
   $scope.$on("readyForm",function(e,server){iyona.deb("Blessed Savior.",server);});
}//function