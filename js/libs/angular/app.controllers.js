'use strict'
angular.module('KingsControllers',[])
.controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams','crud','notitia',exodus])
   .controller('modalShow',['$scope','$modalInstance','passing','$log',modalShow])
   .controller('gospel',['$scope','$rootScope',gospel])
   .controller('bethel',['$scope','fetch','$rootScope','$location','$routeParams',bethel])
   .controller('chronicles1',['$scope','fetch','$location','$routeParams',chronicles1])
   .controller('leviticus',['$scope','crud','$routeParams',leviticus])
   .controller('joshua',['$scope','crud','$routeParams',joshua])
   .controller('judges',['$scope','crud','$routeParams',judges])
   .controller('numbers',['$scope','crud','$routeParams',numbers])
   .controller('isaiah',['$scope','crud','$routeParams','fetch','$timeout',isaiah])
   .controller('tmplUser',['$scope','crud','$routeParams',tmplUser])
   .controller('tmplClient',['$scope','crud','$routeParams',tmplClient])
   .controller('psalm',['$scope','crud','$routeParams','fetch',psalm])
   .controller('deuteronomy',['$scope','crud','$routeParams','fetch',deuteronomy])
   .controller('proverbs',['$scope','crud',proverbs])
   .controller('rptServers',['$scope','$routeParams','crud','fetch',rptServers]);
//============================================================================//
function gospel($scope,$rootScope){iyona.deb("Check",$scope.licentia,$rootScope.licentia);}
//============================================================================//
/*
 * the controler for the login/logoff system.
 * the users data will stored into the localstorage and the permission will be retrieved.
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function exodus($scope,fetch,$rootScope,$location,$routeParams,crud,notitia) {
   var service=dynamis.get("SITE_ALIQUIS")||"http://demo.xpandit.co.za/aura/aliquis",
   gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};
   $scope.attempt=0;
   //=========================================================================//LOGIN BUTTON
   $scope.login=function(e,s,t){
      var u,p,USER_NAME,procurator,msg;iyona.deb("Login",gPlus);
      if(typeof gPlus.user_info == "undefined") gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};

      s=s||gPlus.user_info.id;e=e||gPlus.user_info.emails[0].value;t=t||gPlus.user_info.kind;

      if((!s||s==0) || $scope.attempt>0 ){//check form when it is not an automated login.
         if(crud.check($scope,'dataForm')===false)return false;
         u=$scope.data.username;p=(e==='ad')?$scope.data.password:md5($scope.data.password);//aliquis
      }else{}//skip validation on autologin

      fetch.post(service,{"u":u,"p":p,"s":s,"e":e,"t":t},function(server){
         var setting= new configuration(),row;iyona.deb("SERVER",server);
         if(server && server.length){
            row         =server.rows[0];
            procurator  =(row['level']==='super')?1:0;
            USER_NAME   ={"operarius":row['username'],"nominis":row['name'],"jesua":row['jesua'],"procurator":procurator,"cons":row["sess"],"mail":row['email']};
            dynamis.set("USER_NAME",USER_NAME);dynamis.set("USER_NAME",USER_NAME,true);$rootScope['USER_NAME']=USER_NAME;
            setting.config();//when login in run setup of default setting
            notitia.principio();//start and set local db
            $rootScope.licentia = row['aditum'];

            $rootScope.menus[1].href="#joshua/administrator/view/"+USER_NAME.operarius;
            $rootScope.panelLeft[1].href="#joshua/administrator/view/"+USER_NAME.operarius;
            $location.path("/genesis");
         }else{$scope.attempt++;msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");
         }
      });//fetch callback
   }//login
   //=========================================================================//FORGOT BUTTON
   $scope.forgot=function(){
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the email",false," danger bold"); return false;}
      var u=$scope.data.username;
      fetch.post(service,{"militia":"oblitus","u":u},function(server){
         var clss=server.mail.status?" success":" danger bold";iyona.msg(server.mail.msg,false,clss)
      });//fetch
   }//forgot
   //=========================================================================//IDENTITY
   $scope.google=function(){
      if (typeof chrome !== "undefined" && chrome.hasOwnProperty("identity")) {
         gPlus = new GPLUS_USER();
         gPlus.getUserInfo(true,function(user_info,access_token,success){iyona.deb('USER INFO',user_info,access_token,gPlus);
            if(success===true){$scope.login(user_info.emails[0].value,user_info.id,user_info.kind);}
            else if (typeof gPlus.user_info === "undefined") gPlus.user_info=user_info;
         });
      }
   }//plus login button
   if (!$routeParams.login) {$scope.google();}
   //=========================================================================//LOGOFF
   if($routeParams.login=='logoff'){
      crud.modalMessage("You are about to logout?\n\rClick yes to remove all your details and session.",
         function(selected){$scope.modalSelected=selected;
            fetch.post(service,{"militia":"vel deleri"},function(server){iyona.deb(server);});
               if("localStorage" in window) localStorage.clear(); sessionStorage.clear();//clear all session and traces of storages
               gPlus=gPlus||new GPLUS_USER();if(gPlus.hasOwnProperty("revokeToken")) gPlus.revokeToken();//remove the token when loginOff
         },function(selected){iyona.debug("The button selected is::",selected);}
      );}
}
//============================================================================//
function modalShow($scope,$modalInstance,passing,$log){
   $scope.passing = passing;
   $scope.title = "Message Box";
   $scope.ok=function(){$modalInstance.close('accepted');};
   $scope.cancel=function(){$modalInstance.dismiss('cancel')};
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
   var cons=impetroUser().cons;$rootScope.init=dynamis.get("init",true)||{};var view=$routeParams.view|'all',cnt=0;
   if(typeof $rootScope.init=="object" && "servers" in $rootScope.init){ angular.extend($scope,$rootScope.init);
      var row1 = (typeof $scope.online.rows[0] !=="undefined")?$scope.online.rows[0].count:0,row2 = (typeof $scope.online.rows[1] !=="undefined")?$scope.online.rows[1].count:0;
      $scope.total=parseInt(row1)+parseInt(row2);
      $scope.down=( ($scope.online.length>1)||($scope.online.length==1&&$scope.online.rows[0].status=="down") )?true:false;
      $scope.msg=($scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
      var n = ($scope.online.rows[1])?$scope.online.rows[1].count:($scope.online.rows[0])?$scope.online.rows[0].count:1;$scope.downTotal=n;
      if($scope.down){
         $scope.msgStatus="You have "+n+" server down";
      }else{$scope.msgStatus="All servers are operational.";}/*set scroller*/
      $scope.last=$scope.online.rows[0].modified;
   }
   if(window.hasOwnProperty("EventSource")){//if the browser support SSE
      if(window.hasOwnProperty("chrome")){
         callWorker({"factum":true},function(data,worker){if(!data) {iyona.log("There was a problem with the server."); return false;}
            var results = typeof data.results=="string"?JSON.parse(data.results):data.results;cnt++;
            $rootScope.init=results;dynamis.set("init",results,true);iyona.deb("WK RESULTS-"+cnt,results);
            angular.extend($scope,data.scope);
            $scope.$apply();
            if(PASCO){navigator.splashscreen.hide();worker.terminate()}//for mobile platform close the SSE & splash
            if(cnt<=1){
               $scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){
                  worker.postMessage({"factum":"close"});
//                  worker.terminate();
                  iyona.log("server event closed.")});
            }//use an if <1 so that the event is not recorded multiple times
         });
      }else{//for FF and other eventSource support
         var serverEvent=new EventSource("http://demo.xpandit.co.za/aura/home-event,"+view);
         serverEvent.onmessage=function(ev){iyona.log("SERVER EVENT MESSAGE",results,ev);}
         serverEvent.addEventListener('init',function(ev){
            var results=JSON.parse(ev.data);iyona.log("SSE INIT...",results,ev);
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
               $scope.$apply();
               if(PASCO){navigator.splashscreen.hide();serverEvent.close();}//for mobile platform close the SSE & splash.
               else if(!$scope.once) {setTimeout(function(){SETiSCROLL(".dashboard")},1500); $scope.once=true;}
            }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
         });
         serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);}
         $scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){serverEvent.close();iyona.log("server event closed.")});
      }
   }else{//when the browser does not support SSE
      fetch.post(dynamis.get('SITE_SERVICE')+',creo,server_events',{},function(results){
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
         }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
      });
   }
   setTimeout(function(){SETiSCROLL(".dashboard")},1000);
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
function chronicles1($scope,fetch,$location,$routeParams){
   var address=$routeParams.server||null,serverName=$routeParams.log||null;$scope.data={};
   $scope.menu={"list":[{"name":"Server Logs", "url":"#chronicles1/log-servers"}]}//set the menu
//   if(address)$scope.menu.list[1]={"name":"View server: "+serverName, "url":"#leviticus/servers/"+serverName+"/details"};
   if(serverName)$scope.menu.list[2]={"name":serverName+" logs"};
   fetch.post(dynamis.get('SITE_SERVICE')+',creo,server_logs',{"militia":"server_logs","servus":serverName},function(server){
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
   var title="Servers",profile='servers',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};
   $scope.sorts=[{"name":"By Title","key":"name"},{"name":"By Date","key":"modified"},{"name":"By Status","key":"status"}];$scope.sortable=null;$scope.reverse=false;

   crud.get($scope,title,profile,defaultScope);
   $scope.addItem=function(ref){crud.addItem(ref)};
   $scope.remItem=function(no,ref,list){crud.remItem(no,ref,list);};
   $scope.savItem=function(ref,list){crud.savItem(ref,list);};

   $scope.submit=function(dataForm){
      if(!$scope.data.mailbox&&$scope.data.email){$scope.data.mailbox=$scope.data.email.substr(0,$scope.data.email.indexOf('@'));}
      $scope.data.name.delta=null;/*prevent the search field to be used instead use jesua*/
      $scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.arrange=function(sort){$scope.sortable=sort;$scope.reverse=!$scope.reverse;}
   $scope.$on("readyList",function(e,server){
      for(var row in $scope.data){
         row=$scope.data[row];row.modified=row.modified.replace('-','/'); row.modified=new Date(row.modified).format("dd mmmm, yyyy HH:MM:ss");row.count=timeDifference(row.modified)+' ago';
         if(row.status=="down") { row.icon="glyphicon-warning-sign";row.clss="danger red";row.tags=[{"name":"Server Down","cls":row.clss}];
         } else if(server.status=="slow") { row.icon="glyphicon-refresh";row.clss="warning";row.tags=[{"name":"Server Slow","cls":row.clss}];
         } else { row.icon="glyphicon-envelope";row.clss="success";row.tags=[{"name":"Server Up","cls":row.clss}];}
      }
   });$scope.typeahead=[];
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
   var title="Administrator",profile='administrator',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.username={"delta":"!@=!#","alpha":$routeParams.jesua};

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){ $scope.data.username.delta=null; $scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.username.delta=null;/*prevent the search field to be used instead use jesua*/crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.linkItem=function(mensa2,list,key){crud.linkItem(mensa2,list,key); }
   $scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      crud.checkboxValue($scope,defaultScope.extra.communication,'communication');
      $scope.ref = "link_users_groups"; $scope.lists = defaultScope.listsConf[$scope.ref];$scope.selected = $scope.data.username.alpha;
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
function judges($scope,crud,$routeParams){
   var title="System Groups",profile='judges',defaultScope=dynamis.get("defaultScope",true)[profile];iyona.deb("FASR",profile,$routeParams,defaultScope);
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){ $scope.data.name.delta=null; $scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.name.delta=null;/*prevent the search field to be used instead use jesua*/crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.linkItem=function(mensa2,list,key){crud.linkItem(mensa2,list,key); }
   $scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      $scope.ref = "link_users_groups"; $scope.lists = defaultScope.listsConf[$scope.ref];$scope.selected = $scope.data.name.alpha;
   });
}
//============================================================================//
/*
 * the controler for clients
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function numbers($scope,crud,$routeParams) {
   var title="Client",profile='clients',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};
iyona.deb("SCOPE SCOPE",$scope);
   crud.get($scope,title,profile,defaultScope);
//   $scope.consent=function(perm){ iyona.log("Permission");return crud.consent(perm);};
   $scope.submit=function(dataForm){$scope.data.name.delta=null;/*prevent the search field to be used instead use jesua*/$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}//function
//============================================================================//
/*
 * the controler for clients
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function isaiah($scope,crud,$routeParams,fetch,$timeout) {
   var title="ADSL Customers",profile='isaiah',defaultScope=dynamis.get("defaultScope",true)[profile];
   var month = new Date().getMonth()+1,view=$routeParams.view,jesua=$routeParams.jesua;
   month = sessionStorage.isaiah||month;

   defaultScope.details.account={"delta":"!@=!#","alpha":$routeParams.jesua,"beta":true};
   defaultScope.details.period={"delta":"AND !@=!#","alpha":month};
   defaultScope.list.period={"delta":"!@=!#","alpha":month};
   defaultScope.messenger = {"period":month,"run_consue":"cost summary"};
   $scope.sortable=null;$scope.reverse=false;
   $scope.months = [{"name":"May","id":"5"},{"name":"June","id":"6"},{"name":"July","id":"7"},{"name":"August","id":"8"},{"name":"September","id":"9"},{"name":"Email Report","id":0}];$scope.month=objSearch($scope.months,month)[0][0];

   if(view=='reports'){
      if(!jesua){$routeParams.jesua='data'; jesua='data';}
      if(jesua==='cost'){
         //rumor and runner used to run quaerere on the data cost graph report
         $scope.rumor='data cost',$scope.runner='cost summary';}
      defaultScope.reports[jesua].period = {"delta":"!@=!#","alpha":month};
   }

   $scope.change_month=function(m,rep,consue){
      if(m.id===0){$scope.downloadCSV();return false;}

      $scope.month=m;sessionStorage.isaiah = m.id;
      rep=rep||'list-history';//if report is list only run main quaerere, else use second quaerere
      consue=consue||false;consue='cost summary';
      var run=consue?consue:false;
      var set=consue?"quaerere_sets":false;
      fetch.post(dynamis.get("SITE_MILITIA")+',rumor',{"mensa": "adsl_history","consuetudinem":{"rumorConf":rep,"uProfile":"isaiah","consuetudinem":set,"messenger":{"period":m.id,"run_consue":run}} },function(server){
         iyona.deb("NOTITIA",server);
         if(server && typeof server.notitia!=="undefined" && typeof server.notitia.iota!=="undefined" ) {
            $scope.data = server.notitia.iota;
            if(typeof server.notitia.consuetudinem.customVal!=="undefined"&&typeof server.notitia.consuetudinem.customVal['cost summary']!=="undefined") {
               var cust = server.notitia.consuetudinem.customVal;
               if(typeof cust['cost summary']!=="undefined" && typeof cust['cost summary'].rows!=="undefined") {
                  cust = cust['cost summary'].rows;
                  $scope.opt.savings = cust[0].savings;
                  $scope.footer = cust[0];
               }
               else iyona.log("Could not retrieve cost summary due to data not existing");
            }
         }
      });
   }
   $scope.downloadCSV=function(){
      fetch.responseType = "application/octet-stream";
      fetch.post(dynamis.get("SITE_ALPHA")+',creo,relatione menstrua',{"messenger":{"period":sessionStorage.isaiah,"mail":impetroUser().mail} },function(server){
         if(typeof server === "undefined") return false;
         iyona.msg("Please check your inbox.");
         window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
         window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
            fs.root.getFile("monthly_report.xls", {create: true},function(dataFile){
               iyona.deb("FILE",dataFile,dataFile.isFile,dataFile.name,dataFile.fullPath);
               var url = dataFile.toURL();
               dataFile.createWriter(function(fileWriter) {
                  var blob = new Blob([server], {type: "text/plain"});

                  fileWriter.onwriteend = function(e) {console.log('Write completed.');};
                  fileWriter.onerror = function(e) {console.log('Write failed: ' + e.toString());};
                  fileWriter.write(blob);
//                  downloadURL(url);
//                  var win = window.open(url, '_blank');win.focus();
               },function(){fileErrorHandler()});
            });
         },function(){fileErrorHandler()});

         iyona.deb("NOTITIA",server);
      });
   }

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      $scope.dataForm=dataForm;
      var params = {"set_change":true,"customer":$scope.data.account.alpha,"choice":$scope.data.choice.class,"prev":$scope.data.current_package.alpha,"init":$scope.data.init_package.alpha};
      fetch.post(sessionStorage.SITE_CONNECT,params,function(server){
         var tmp=$scope.btn;$scope.btn=server.msg;setTimeout(function(){$scope.btn=tmp;$scope.$apply();},2000);
      });
   }
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.arrange=function(sort){$scope.sortable=sort;$scope.reverse=!$scope.reverse;}
   $scope.prima=impetroUser().jesua;
   $scope.$on("readyList",function(e,server){
      var cust = server.consuetudinem.customVal;iyona.deb("server",server,cust);
      if (typeof cust!=="undefined" && typeof cust['cost summary']!=="undefined" && typeof cust['cost summary'].rows!=="undefined" && typeof cust['cost summary'].rows[0]!=="undefined") {
         $scope.opt.savings = cust['cost summary'].rows[0].savings}
   });
   $scope.$on("readyForm",function(e,server){
      var packages = $scope.opt.customVal.package.rows,
      found=objSearch(packages,$scope.data.current_package.alpha,true),//searches the current package in the list of packages
      result=found[0][0],
      next,
      num=(typeof $scope.data.total!=="undefined" && typeof $scope.data.total.alpha!=="undefined")?$scope.data.total.alpha:0;iyona.deb("PASS",num);
      var total = parseFloat(num.replace(",",''));//get the total mb of current package
      $scope.data.choice = result;

      if(total < 10240)next=1+found[1];
      else if(total < 20480)next=2+found[1];
      else if(total < 28000)next=3+found[1];
      else if(total > 30720)next=1+found[1];
      else if(result.class=='hca28'||result.class=='hca29')next=2+found[1];
      else if(result.class=='hca30')next=1+found[1];

      $scope.data.next=packages[next].description;
      $scope.data.next_cost=packages[next].cost;

   });
   $scope.$on("readyList",function(e,server){});
}//function
//============================================================================//
function psalm($scope,crud,$routeParams,fetch){
   var title="Sales Order",profile='sales',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};
   $scope.sorts=[{"name":"By Supplier","key":"supplier"},{"name":"By Client","key":"client"},{"name":"By Quote Number","key":"quote_number"}];$scope.sortable=null;$scope.reverse=false;
   $scope.dateOptions   = {showWeeks:false,"showButtonBar":false};

   crud.get($scope,title,profile,defaultScope);
   if(!$routeParams.jesua){$scope.data.sales_person = impetroUser().operarius;}

   $scope.alert01=function(){$scope.msg="";};
   $scope.arrange=function(sort){iyona.deb("clicked");$scope.sortable=sort;$scope.reverse=!$scope.reverse;};
   $scope.addItem=function(ref,node){var custValue={"barcode":uRand2(5,true,true,true),"supplier_code":node.alpha,"description":"Supplier:"+node.display}; crud.addItem(ref,custValue);iyona.deb("Adding",$scope.opt.listsVal[ref]);};
   $scope.remItem=function(no,ref,list){
      iyona.deb("total",ref,no,$scope.opt.listsVal[ref],$scope.opt.listsVal[ref][no].total,$scope.data.sales_total);
      var tmp = $scope.opt.listsVal[ref][no].total;
      crud.remItem(no,ref,list);
      $scope.$on("remItem",function(e,s){
         iyona.deb("removing",s);
         $scope.data.sales_total -=tmp;
         $scope.calMrgn();
      });
   };
   $scope.chkChng=function(list){list.changed=true;}
   $scope.calMrgn=function(){
      if(!isset($scope.data.quote_total,$scope.data.sales_total))return;
      $scope.data.margin.alpha = ($scope.data.quote_total&&$scope.data.sales_total)?100-Math.round(($scope.data.sales_total/$scope.data.quote_total)*100):0;
      if($scope.data.margin.alpha<10) {$scope.msg = "Profit is bellow 10%"; iyona.msg($scope.msg,true); } else {$scope.msg = "";}
   }
   $scope.savItem=function(ref,list){
      if($scope.closed===true) return;
      var x,l=$scope.opt.listsVal[ref].length;
      $scope.data.sales_total = 0;
      if(isset(list.quantity,list.cost))list.total=list.quantity*list.cost;
      for(x=0;x<l;x++){var node = $scope.opt.listsVal[ref][x];$scope.data.sales_total+=node.total;}
      $scope.calMrgn();
      list.sales_total = $scope.data.sales_total;

      if(list.changed &&list.description &&list.quantity &&list.cost){crud.savItem(ref,list); list.changed=false;}
   };
   $scope.finalize=function(e){
      var proceed = true,msg="Would you like to close this sales?<br/>This will download the import file and close the sale";
      if($scope.data.margin.alpha<10){proceed = false;msg="Please note that the profit is below 10%";}
      crud.modalMessage(msg,
         function(selected){
            if(proceed){$scope.downloadCSV("pastelExport","pastelExport.csv",$scope.data.jesua);
               $scope.closed=true;}
            iyona.deb("Faith...",selected);
         },
         function(selected){iyona.deb("The button selected is::",selected);}
      );
   };

   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);};
   $scope.delete=function(){crud.delete($scope,profile);};
   $scope.$on("readyForm",function(e,s){iyona.deb("readyForm",s); if(s.iota[0].status==="Closed") $scope.closed=true;$scope.calMrgn(); });
   $scope.$on("readySubmit",function(e,s){iyona.deb("readySumit");});
   $scope.$on("readyList",function(e,s){iyona.deb("readyList");});
   $scope.downloadCSV=function(caller,filename,sales){
      window.URL = window.webkitURL || window.URL;
      window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

      fetch.responseType = "application/octet-stream";
      sales = sales||0;

      if(0){window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
         fs.root.getFile(filename, {create: false},function(dataFile){
            dataFile.remove(function(e){iyona.deb("Removed file",e)},fileErrorHandler);
         });
      });}
      fetch.post(dynamis.get("SITE_ALPHA")+',creo,'+caller,{"messenger":{"filename":filename,"mail":impetroUser().mail,"operarius":impetroUser().operarius,"current":sales} },function(server){
         if(typeof server === "undefined") return false;

         iyona.msg("Please check your inbox.");

         window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
            fs.root.getFile(filename, {create: true},function(dataFile){
               var url = dataFile.toURL();iyona.deb("FILE",url,dataFile,dataFile.isFile,dataFile.name,dataFile.fullPath);

               dataFile.createWriter(function(fileWriter) {
                  var blob = new Blob([server], {type: "text/plain"});
                  fileWriter.onwriteend = function(e) {console.log('Write completed.');};
                  fileWriter.onerror = function(e) {console.log('Write failed: ' + e.toString());};
                  fileWriter.write(blob);
//                  chrome.downloads.download({"url":url});
                  downloadLINK(url,filename);
//                  downloadURL(url);
               },fileErrorHandler);
            });
         },fileErrorHandler);

         iyona.deb("NOTITIA",server);
      });
   }
   $scope.filesystem=function(){
      chorme.filesystem.chooseEntry({"type":"openFile"},function(entry){
         entry.file(function(file){
            var reader = new FileReader();
         });
      });
   }
}
//============================================================================//
function deuteronomy($scope,crud,$routeParams,fetch){
   var title="Permissions",profile='licentia',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua||null};

   crud.get($scope,title,profile,defaultScope);
iyona.deb("SCOPE",$scope);
   $scope.alert01=function(){$scope.msg="";};
   $scope.addItem=function(ref,node){
      var name=$scope.data.name.alpha,custValue={"name":node+" "+name,"description":"This permission will allow users to "+node+" "+name,"created":new Date().format("isoDate") };
      var node = $scope.opt.listsVal[ref];
      crud.addItem(ref,custValue);
      var l=node.length,list=node[l-1];
      list.changed=true;
      $scope.savItem(ref,list);
      iyona.deb("Adding",list,l,node);
   };
   $scope.remItem=function(no,ref,list){
      crud.remItem(no,ref,list);
      $scope.$on("remItem",function(e,s){iyona.deb("removing",s);});
   };
   $scope.listItems=function(mensa2,list){$scope.selected=list.search; crud.listItem(mensa2,list); iyona.deb("THE SCOPE",$scope);}
   $scope.linkItem=function(mensa2,list,key){crud.linkItem(mensa2,list,key); }
   $scope.savItem=function(ref,list){
      if(list.changed &&list.name &&list.description){crud.savItem(ref,list); list.changed=false;}
   };

   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);};
   $scope.delete=function(){crud.delete($scope,profile);};
   $scope.$on("readyForm",function(e,s){iyona.deb("readyForm",s); });
   $scope.$on("readySubmit",function(e,s){iyona.deb("readySumit");});
   $scope.$on("readyList",function(e,s){iyona.deb("readyList");});
   $scope.$on("readyListItem",function(e,s){iyona.deb("readyListItem",$scope);$scope.ref="link_permissions_groups";$scope.lists=$scope.opt.listsConf.link_permissions_groups;});

}
//============================================================================//
function proverbs($scope,crud){
   var title="System List",profile='lists',defaultScope=dynamis.get("defaultScope",true)[profile];
   $scope.lists=[{"name":"First","focus":true},{"name":"Second","focus":false,"child":[{"name":"un"},{"name":"deux"},{"name":"trois"}]}];
   $scope.lists[1].child[2].child=[{"name":"you"},{"name":"are"},{"name":"Good"},{"name":"all the time","child":[{"name":"Success"},{"name":"2014"}]}];

   crud.get($scope,title,profile,defaultScope);

   $scope.executiveDirector=function(e,key,node){
      var mainNode=_$(e.target).parent().parent();//mainNode is the parent ul
      moveCursor(mainNode,_$(e.target).parent(),key,e,true);
      var kepPress = arrayManifestation(e,key,node);
   }
   $scope.come=function(row){iyona.deb("FOCUS",row);}
   $scope.gone=function(row){iyona.deb("BLUR",row);}
   $scope.restore=function(e){e.stopPropagation(); e.gesture.stopDetect(); e.gesture.stopPropagation();return true;}
}
//============================================================================//
function tmplUser($scope){}
function tmplClient($scope){}
function rptServers($scope,$routeParams,crud,fetch){
   var title="Servers",profile='servers',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};

   crud.get($scope,title,profile,defaultScope);
   fetch.post(sessionStorage.SITE_SERVICE+',creo,invoice-example',{},function(server){
      if(typeof server.rows!=="undefined"){
         $scope.data = server.rows;
         //SETiSCROLL('#repTable');
      }else{
         iyona.msg("No result found");$scope.data.msg="There was no record found on the server.";
      }
   });

   $scope.order=function(ord){$scope.ord=ord;}
}
//============================================================================//