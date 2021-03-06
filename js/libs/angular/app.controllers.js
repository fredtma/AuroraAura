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
   .controller('job',['$scope','crud','$routeParams',job])
   .controller('deuteronomy',['$scope','crud','$routeParams','fetch',deuteronomy])
   .controller('kingsI',['$scope','crud','$routeParams','fetch',kingsI])
   .controller('proverbs',['$scope','crud',proverbs])
   .controller('rptServers',['$scope','$routeParams','crud','fetch',rptServers])
   .controller('MainController',['$scope',function($scope){
      $scope.name = "Lord";
      $scope.sayPraises=function(){
         $scope.praises="Praises to the "+$scope.name+" of all";
      };
   }]);
//============================================================================//
function gospel($scope,$rootScope){iyona.deb("Check",$scope.licentia,$rootScope.licentia);}
//============================================================================//
/*
 * the controler for the login/logoff system.
 * the users data will stored into the localstorage and the permission will be retrieved.
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function exodus($scope,fetch,$rootScope,$location,$routeParams,crud,notitia) {$scope.test=1;
   var service=dynamis.get("SITE_ALIQUIS")||"https://demo.xpandit.co.za/aura/aliquis",
   gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};
   $scope.attempt=0;
   //=========================================================================//LOGIN BUTTON
   $scope.login=function(e,s,t){
      var u,p,USER_NAME,procurator,msg;iyona.deb("Login",gPlus);
      if(typeof gPlus.user_info === "undefined") gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};

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
            notitia.principio();//start and set local db and if there is an upgrade it will run
            rootMenu(row,$rootScope,USER_NAME);
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
      } else {}
   }//plus login button
   if (!$routeParams.login && typeof chrome !== "undefined" && chrome.hasOwnProperty("identity")) { $scope.google();}
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

   $rootScope.init=dynamis.get("init",true)||{};
   $scope.iframe = "none";
   var view=$routeParams.view|'all',cnt=0;

   if(typeof $rootScope.init==="object" && "servers" in $rootScope.init){
      angular.extend($scope,$rootScope.init);
      resultWorkout();
   }

   if(window.hasOwnProperty("EventSource")){//if the browser support SSE

      if(window.hasOwnProperty("chrome")){//chrome will do it in the background
         callWorker({"factum":true},function(data,worker){
            if(!data) {iyona.log("There was a problem with the server."); return false;}
            var results = typeof data.results==="string"? JSON.parse(data.results): data.results;cnt++;
            if(typeof results!=="object"||typeof results.servers==="undefined") {console.log("There was an error in bethel's results");return false;}

            $rootScope.init=results;
            dynamis.set("init",results,true);
            iyona.deb("WK RESULTS:"+cnt,results, data);

            $scope.$apply(function(){
               $scope.down       = results.down;
               $scope.last       = results.last;
               $scope.msgStatus  = results.msgStatus;
               $scope.msg        = results.last;
               $scope.online     = results.online;
               $scope.nagios     = results.nagios;
               $scope.servers    = results.servers;
               $scope.serverLine = results.serverLine;
               $scope.total      = results.total;
               $scope.iframe     = (cnt%2)?"none":"block";
            });
            if(PASCO){navigator.splashscreen.hide();worker.terminate()}//for mobile platform close the SSE & splash
            if(cnt<=1){
               $scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){
                  worker.postMessage({"factum":"close"});//close when changing to an other state
                  worker.terminate();
                  iyona.log("server event closed.")});
            }//use an if <1 so that the event is not recorded multiple times
         });

      }else{//for FF and other eventSource support
         var serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event");
         serverEvent.onmessage=function(ev){iyona.log("SERVER EVENT MESSAGE",ev);}
         serverEvent.addEventListener('init',function(ev){
            cnt++;
            if(cnt>=50 && false){iyona.log("Closing worker"); serverEvent.close();self.close();}//DISABLE::after a certain number
            var results=JSON.parse(ev.data);
            $scope.iframe = (cnt%2)?"none":"block";
            resultApplication(results);
         });
         serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);}
         $scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){serverEvent.close();iyona.log("server event closed.")});
      }

   }else{//when the browser does not support SSE
      var repeat=true;
      fetch.post('https://demo.xpandit.co.za/aura/home-event,ie',{},function(results){
         cnt++;
         if(cnt>=50 && false){iyona.log("Closing iteration"); repeat=false;}//DISABLE::after a certain number
         resultApplication(results,'ie');
      });
   }
   setTimeout(function(){SETiSCROLL(".dashboard")},1000);
   $scope.moveTo=function(server,direct){
      if(!direct)$location.path("/leviticus/servers/view/"+server);
      else $location.path(server);
   }
   function resultApplication(results,from){

      iyona.log("RESULTS INIT...",results);
      if(!results||typeof results.servers==="undefined") {iyona.log("There was an error in bethel's results");return false;}

      $scope.servers={},$scope.online={};$scope.serverLine={};
      $rootScope.init=results;
      dynamis.set("init",results,true);
      try{
         angular.extend($scope,results);
         results=null;
         resultWorkout();
         //$scope.$apply();
         if(PASCO){navigator.splashscreen.hide();if(from==='ie')serverEvent.close();}//for mobile platform close the SSE & splash.
      }catch(e){iyona.log(e.message,false,"there was an error in bethel");}
   }
   function resultWorkout(){
      var serverStatus={'down':0,'active':0,'slow':0,'nagios':0},xx,ll,nn,row=[];
      $scope.total=0;
      if(typeof $scope.online!=="undefined" && typeof $scope.online.rows !== "undefined"){
         ll = $scope.online.rows.length;
         for(var xx=0;xx<ll;xx++){
            nn = $scope.online.rows[xx];
            row.push(nn);
            serverStatus[nn.status] = parseInt(nn.count);
            $scope.total += parseInt(nn.count);
         }
      }
      serverStatus.nagios  = parseInt($scope.nagios.length);
      $scope.down          = serverStatus.down>0?true:false;//if there is two row or one with a down status

      $scope.msgStatus="All servers are operational.<br/>";
      if(serverStatus.down)         {$scope.msgStatus="You have "+serverStatus.down+" server down.<br/>";}
      else if (serverStatus.slow)   {$scope.msgStatus+="You have "+serverStatus.slow+" slow servers.<br/>";}
      else if (serverStatus.nagios) {$scope.msgStatus+="You have "+$scope.nagios.length+" Nagios server/s down <br/>";}
      $scope.last=row[0].modified;
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
   fetch.post(dynamis.get('SITE_SERVICE')+',creo,server_logs',{"militia":"server_logs","servus":serverName,"uProfile":"servers"},function(server){
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
         row=$scope.data[row];
         row.modified=row.modified.replace('-','/');
         row.modified=new Date(row.modified).format("dd mmmm, yyyy HH:MM:ss");
         row.count=timeDifference(row.modified)+' ago';
         //iyona.deb("COUNTING",row.modified,row);
         if(row.status==="down")       { row.icon="glyphicon-warning-sign";row.clss="danger red";row.tags=[{"name":"Server Down","cls":row.clss}];}
         else if(row.status==="slow")  { row.icon="glyphicon-refresh";row.clss="warning";row.tags=[{"name":"Server Slow","cls":row.clss}];}
         else                          { row.icon="glyphicon-envelope";row.clss="success";row.tags=[{"name":"Server Up","cls":row.clss}];}
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
   $scope.viewLink=function(ref){iyona.deb($scope.data.username);
      $scope.ref = ref; $scope.lists = defaultScope.listsConf[$scope.ref];$scope.selected = $scope.data.username.alpha;
      setTimeout(function(){SETiSCROLL('#referencesLink')},1000);/*set scroller*/
   }
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
   var title="System Groups",profile='judges',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){ $scope.data.name.delta=null; $scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.name.delta=null;/*prevent the search field to be used instead use jesua*/crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.viewLink=function(ref){
      $scope.ref = ref; $scope.lists = defaultScope.listsConf[$scope.ref];$scope.selected = $scope.data.name.alpha;
      setTimeout(function(){SETiSCROLL('#referencesLink')},1000);/*set scroller*/
   }
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
   $scope.months = [{"name":"January","id":"1"},{"name":"February","id":"2"},{"name":"March","id":"3"},{"name":"April","id":"4"},{"name":"May","id":"5"},{"name":"June","id":"6"},{"name":"July","id":"7"},{"name":"August","id":"8"},{"name":"September","id":"9"},{"name":"October","id":"10"},{"name":"November","id":"11"},{"name":"December","id":"12"},{"name":"Email Report","id":0}];
   $scope.month=objSearch($scope.months,month);iyona.deb("MONTHS",$scope.month,$scope.months,month);
   $scope.month= isset($scope.month[0]) && isset($scope.month[0][0])?$scope.month[0][0]:{};

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
      var filename = "monthly_report.xls";
      fetch.responseType = "application/octet-stream";
      fetch.post(dynamis.get("SITE_ALPHA")+',creo,relatione menstrua',{"messenger":{"period":sessionStorage.isaiah,"mail":impetroUser().mail} },function(server){
         if(typeof server === "undefined") return false;
         iyona.msg("Please check your inbox.");
         window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
         window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
            fs.root.getFile(filename, {create: true},function(dataFile){
               iyona.deb("FILE",dataFile,dataFile.isFile,dataFile.name,dataFile.fullPath);
               var url = dataFile.toURL();
               dataFile.createWriter(function(fileWriter) {
                  var blob = new Blob([server], {type: "text/plain"});

                  fileWriter.onwriteend = function(e) {console.log('Write completed.');};
                  fileWriter.onerror = function(e) {console.log('Write failed: ' + e.toString());};
                  fileWriter.write(blob);
                  downloadLINK(url,filename);
//                  downloadURL(url);
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
      var cust = server.consuetudinem.customVal;iyona.deb("readyList",cust);
      if (isset(cust)&& isset(cust['cost summary'])&& isset(cust['cost summary'].rows)&& isset(cust['cost summary'].rows[0]) ) {
         $scope.opt.savings = cust['cost summary'].rows[0].savings}
   });
   $scope.$on("readyForm",function(e,server){
      var packages = $scope.opt.customVal.package.rows;
      var found=objSearch(packages,$scope.data.current_package.alpha,true),//searches the current package in the list of packages
      result=found[0][0],
      next,
      num=(typeof $scope.data.total!=="undefined" && typeof $scope.data.total.alpha!=="undefined")?$scope.data.total.alpha:0;

      iyona.deb('$scope',$scope,packages,num,typeof num);
      var total = (typeof num==='string')?parseFloat(num.replace(",",'')):num;//get the total mb of current package
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
            if(proceed){$scope.downloadCSV("pastelExport","pastelExport.csv",$scope.data.jesua,"Close Current Sales");}
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
   $scope.downloadCSV=function(caller,filename,sales,licentia){
      window.URL = window.webkitURL || window.URL;
      window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

      fetch.responseType = "application/octet-stream";
      sales = sales||0;

      if(1){window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
         fs.root.getFile(filename, {create: false},function(dataFile){
            dataFile.remove(function(e){iyona.deb("Removed file",e)},fileErrorHandler);
         });
      });}
      fetch.post(dynamis.get("SITE_ALPHA")+',creo,'+caller,{"messenger":{"filename":filename,"mail":impetroUser().mail,"operarius":impetroUser().operarius,"current":sales},"licentia":licentia },function(server){
         if(typeof server === "undefined") return false;
         if(typeof server ==="object" && (server.err||server.notitia.err) ) {iyona.msg(server.err||server.notitia.err,true,'danger'); return false;}

         iyona.msg("Please check your inbox.");
         $scope.closed=true;

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
/*
 * the controler for clients
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function job($scope,crud,$routeParams) {
   var title="Checklist",profile='checklist',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};
   var tmp1,tmp2,tmp3;

   crud.get($scope,title,profile,defaultScope);
   $scope.data.new_setup         = ['Kaseya Installed','Antivirus Installed','Mimecast (MSO) Installed','Startup Applications Removed'];
	$scope.data.replacement_setup = ['Kaseya Uninstalled','Antivirus Uninstalled'];

//   $scope.consent=function(perm){ iyona.log("Permission");return crud.consent(perm);};
   $scope.submit=function(dataForm){
      if($scope.data.status==='finished') $scope.data.engineer_finished = new Date().format('isoDate');

      tmp1 = $scope.data.done;
      tmp2 = $scope.data.install;
      tmp3 = $scope.data.uninstall;
      $scope.data.done     = Object.keys($scope.data.done).join();
      $scope.data.install  = Object.keys($scope.data.install).join();
      $scope.data.uninstall= Object.keys($scope.data.uninstall).join();
      console.log("THE DATA",$scope.data,tmp1,tmp2,tmp3);
      $scope.dataForm=dataForm;
      crud.submit($scope,profile);
   }
   $scope.delete=function(){crud.delete($scope,profile);}
//   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
//   $scope.DBset=function(field,val){return crud.DBset(field,val);}

   $scope.prima=impetroUser().operarius;
   $scope.$on("readyList",function(e,server){console.log('server',server);});
   $scope.$on("readySubmit",function(e,server){
      $scope.data.done     = tmp1;
      $scope.data.install  = tmp2;
      $scope.data.uninstall= tmp3;
   });
   $scope.$on("readyForm",function(e,server){
      $scope.data.user = $scope.prima;
      $scope.data.done = crud.setString2Array($scope.data.done);
      $scope.data.install = crud.setString2Array($scope.data.install);
      $scope.data.uninstall = crud.setString2Array($scope.data.uninstall);
      $scope.data.givenTime = "Last modified @ "+$scope.data.modified+($scope.data.engineer_finished?" and Engineer finished @ "+$scope.data.engineer_finished:"");
      $scope.readonly = ($scope.data.status==='client request'||$scope.data.status==='escalate')?false:true;

   });
}//function
//============================================================================//permissions
function deuteronomy($scope,crud,$routeParams,fetch){
   var title="Permissions",profile='licentia',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua||null};

   crud.get($scope,title,profile,defaultScope);

   $scope.alert01=function(){$scope.msg="";};
   $scope.chkChng=function(list){list.changed=true;}
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
function kingsI($scope,crud,$routeParams,fetch){
   var title="Main Servers",profile='machine',defaultScope=dynamis.get("defaultScope",true)[profile];iyona.deb("FASR",profile,$routeParams,defaultScope);
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua||null};
   $scope.sorts=[{"name":"By Company","key":"company"},{"name":"By Name","key":"name"},{"name":"By Type","key":"type"},{"name":"By Status","key":"status"}];$scope.sortable=null;$scope.reverse=false;

   crud.get($scope,title,profile,defaultScope);


   $scope.addItem=function(ref,node){
      var name=$scope.data.name.alpha,custValue={"name":node+" "+name,"description":"This permission will allow users to "+node+" "+name,"created":new Date().format("isoDate") };
      var node = $scope.opt.listsVal[ref];
      crud.addItem(ref,custValue);
      var l=node.length,list=node[l-1];
      list.changed=true;//used to change only the new item will be updated
      $scope.savItem(ref,list);
      iyona.deb("Adding",list,l,node);
   };
   $scope.remItem=function(no,ref,list){
      crud.remItem(no,ref,list);
      $scope.$on("remItem",function(e,s){iyona.deb("removing",s);});
   };iyona.deb("00000",$scope.$parent);
   $scope.new=function(){$scope.data = {};};
   $scope.listItems=function(mensa2,list){$scope.selected=list.search; crud.listItem(mensa2,list); iyona.deb("THE SCOPE",$scope);}
   $scope.linkItem=function(mensa2,list,key,field){crud.linkItem(mensa2,list,key,field); _$('#inputSearch')[0].focus();  }
   $scope.savItem=function(ref,list){
      if(list.changed &&list.host &&list.command){list.use_mother=false; crud.savItem(ref,list); list.changed=false;}
   };

   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);};
   $scope.delete=function(){crud.delete($scope,profile);};
   $scope.arrange=function(sort){$scope.sortable=sort;$scope.reverse=!$scope.reverse;}
   $scope.$on("readyForm",onUpdate);
   $scope.$on("readySubmit",onUpdate);
   $scope.$on("readyList",function(e,s){iyona.log("readyList",e,s,$scope.data); });
   $scope.$on("readyListItem",function(e,s){iyona.deb("readyListItem",$scope);$scope.ref="link_permissions_groups";$scope.lists=$scope.opt.listsConf.link_permissions_groups;});
   function onUpdate(e,s){iyona.deb("readyFormUpdate",s,$scope);
      crud.navigateNext("ndxServCompanyMain",$routeParams.jesua||null,'name');

      if(isset(s.consuetudinem)){
         var copy = s.consuetudinem.listsVal,x,l,node1,node2;
         if(isset(copy.nagios_services)){
            l=copy.nagios_services.length;
            for(x=0;x<l;x++){
               node1 = $scope.opt.listsVal.nagios_services[x];
               node2 = copy.nagios_services[x];
               //we need to keep the original in order to validate linked items
               node1.live   = (isset(node1.string))?"set":"down";
               node1.string = (isset(node1.string))?node1.string :(isset(node2.default))?node2.name+node2.default:node2.name;
               //iyona.deb("ON",node1,node2,node1.command,node2.name,node2.default);
            }
         }
      }
   }
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
   fetch.post(sessionStorage.SITE_SERVICE+',creo,invoice-example',{"uProfile":profile},function(server){
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