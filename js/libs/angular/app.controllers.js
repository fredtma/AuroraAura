'use strict'
angular.module('KingsControllers',[])
.controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams','crud',exodus])
   .controller('modalShow',['$scope','$modalInstance','passing','$log',modalShow])
   .controller('bethel',['$scope','fetch','$rootScope','$location','$routeParams',bethel])
   .controller('deuteronomy',['$scope','fetch','$location','$routeParams',deuteronomy])
   .controller('leviticus',['$scope','crud','$routeParams',leviticus])
   .controller('joshua',['$scope','crud','$routeParams',joshua])
   .controller('numbers',['$scope','crud','$routeParams',numbers])
   .controller('isaiah',['$scope','crud','$routeParams','fetch','$timeout',isaiah])
   .controller('tmplUser',['$scope','crud','$routeParams',tmplUser])
   .controller('tmplClient',['$scope','crud','$routeParams',tmplClient])
   .controller('psalm',['$scope','crud','$routeParams',psalm])
   .controller('proverbs',['$scope','crud','fetch','$element',proverbs])
   .controller('rptServers',['$scope','$routeParams','crud','fetch',rptServers]);
//============================================================================//
/*
 * the controler for the login/logoff system.
 * the users data will stored into the localstorage and the permission will be retrieved.
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function exodus($scope,fetch,$rootScope,$location,$routeParams,crud) {
   var service=dynamis.get("SITE_SERVICE")||"http://demo.xpandit.co.za/app_xpandit/inc/services.php",
   gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};
   //=========================================================================//LOGIN BUTTON
   $scope.login=function(e,s,t){
      var u,p,USER_NAME,procurator,msg;iyona.deb("Login",gPlus);
      if(typeof gPlus.user_info == "undefined") gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};

      s=s||gPlus.user_info.id;e=e||gPlus.user_info.emails[0].value;t=t||gPlus.user_info.kind;
      if(!s||s==0){//check form when it is not an automated login.
         if(crud.check($scope,'dataForm')===false)return false;
         u=$scope.data.username;p=md5($scope.data.password);//aliquis
      }else{}//skip validation on autologin
      $scope.attempt=0;
      fetch.post(service,{"militia":"aliquis","u":u,"p":p,"s":s,"e":e,"t":t},function(server){var setting= new configuration(),row;
         if(server.length>0){row=server.rows[0];procurator=(row['level']==='super')?1:0;
            USER_NAME={"operarius":row['username'],"licencia":row['aditum'],"nominis":row['name'],"jesua":row['jesua'],"procurator":procurator,"cons":row["sess"]};
            dynamis.set("USER_NAME",USER_NAME,true);$rootScope['USER_NAME']=USER_NAME;
            setting.config();//when login in run setup of default setting

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
            fetch.post(service,{"militia":"vel deleri"},function(server){iyona.msg(server.notitia.msg,server);});
               if("localStorage" in window) localStorage.clear(); sessionStorage.clear();//clear all session and traces of storages
               gPlus=gPlus||new GPLUS_USER();if(gPlus.hasOwnProperty("revokeToken")) gPlus.revokeToken();//remove the token when loginOff
         },function(selected){iyona.debug("The button selected is::",selected);}
      );}
}
//============================================================================//
function modalShow($scope,$modalInstance,passing,$log){
   $scope.passing = passing;
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
            $rootScope.init=results;dynamis.set("init",results,true);iyona.deb("RESULTS-"+cnt,results);
            angular.extend($scope,data.scope);
            $scope.$apply();
            if(PASCO){navigator.splashscreen.hide();worker.terminate()}//for mobile platform close the SSE & splash
            if(cnt<=1)$scope.$on("$routeChangeStart",function(ev,newLoc,oldLoc){worker.terminate();iyona.log("server event closed.")});//use an if <1 so that the event is not recorded multiple times
         });
      }else{//for FF and other eventSource support
         var serverEvent=new EventSource("http://demo.xpandit.co.za/app_xpandit/services/tester.php?view="+view);
         serverEvent.onmessage=function(ev){iyona.log("SERVER EVENT MESSAGE",results,ev);}
         serverEvent.addEventListener('init',function(ev){
            var results=JSON.parse(ev.data);iyona.log("SERVER EVENT INIT...",results,ev);
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
   var title="Servers",profile='servers',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};
   $scope.sorts=[{"name":"By Title","key":"name"},{"name":"By Date","key":"modified"},{"name":"By Status","key":"status"}];$scope.sortable=null;$scope.reverse=false;

   crud.get($scope,title,profile,defaultScope);
   $scope.addItem=function(ref){crud.addItem(ref)};
   $scope.remItem=function(no,ref,list){crud.remItem(no,ref,list);};
   $scope.savItem=function(ref,list){crud.savItem(ref,list);};
   $scope.licentia=getLicentia();
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
   $scope.submit=function(dataForm){$scope.data.username.delta=null; $scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.username.delta=null;/*prevent the search field to be used instead use jesua*/crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){crud.checkboxValue($scope,defaultScope.extra.communication,'communication');});
}
//============================================================================//
/*
 * the controler for clients
 * $routerParams /section/:page/:opt[name,view,new]/:view[all,details]
 */
function numbers($scope,crud,$routeParams) {
   var title="Client",profile='clients',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};

//   var notitiaWorker=new Worker("js/biliotheca/worker.js");
//   notitiaWorker.postMessage({"notitia":"iDB"});
//   notitiaWorker.addEventListener("message",function(e){
//      iyona.deb("Working on",e.data,e);
//   },false);

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.data.name.delta=null;/*prevent the search field to be used instead use jesua*/$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
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
   defaultScope.details.account={"delta":"!@=!#","alpha":$routeParams.jesua,"beta":true};
   defaultScope.details.period={"delta":"AND !@=!#","alpha":month};
   defaultScope.list.period={"delta":"!@=!#","alpha":month};
   $scope.sorts=[{"name":"By Accounts","key":"account"},{"name":"By Size","key":"total"},{"name":"By Status","key":"status"}];$scope.sortable=null;$scope.reverse=false;

   if(view=='reports'){
      load_script("js/libs/chart.js-master/Chart.mim-mod.js",false,'end',true);
      if(!jesua){$routeParams.jesua='data'; jesua='data';}
      defaultScope.reports[jesua].period = {"delta":"!@=!#","alpha":month};
   }

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      $scope.dataForm=dataForm;
      var params = {"set_change":true,"customer":$scope.data.account.alpha,"choice":$scope.data.choice.class,"prev":$scope.data.current_package.alpha,"init":$scope.data.init_package.alpha};
      fetch.post(sessionStorage.SITE_CLASS,params,function(server){
         var tmp=$scope.btn;$scope.btn=server.msg;setTimeout(function(){$scope.btn=tmp;$scope.$apply();},2000);
      });
   }
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.arrange=function(sort){$scope.sortable=sort;$scope.reverse=!$scope.reverse;}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      var packages = $scope.opt.customVal.package.rows,
      found=objSearch(packages,$scope.data.current_package.alpha,true),
      result=found[0][0],
      next,
      total = parseFloat($scope.data.total.alpha.replace(",",'') );
      $scope.data.choice = result;

      if(total < 10240)next=1+found[1];
      else if(total < 20480)next=2+found[1];
      else if(total < 28000)next=3+found[1];
      else if(total > 30720)next=1+found[1];
      else if(result.class=='hca28'||result.class=='hca29')next=2+found[1];
      else if(result.class=='hca30')next=1+found[1];

      iyona.deb("Found",found,'next=',next,'total=',total,$scope.data.total.alpha);
      $scope.data.next=packages[next].description;
      $scope.data.next_cost=packages[next].cost;

   });
   $scope.$on("readyList",function(e,server){
      if(typeof server.iota!="undefined"&&view=='reports'){
         $scope.table = {};$scope.table.title = [];
         var rows=server.iota,len=rows.length,x,labels=[],y,l,field,key,dataSet={},element;
         var fillColor=[],strokeColor=[],pointStrokeColor=[],pointColor=[],legend=[],prop=[],options={};
         if(jesua=='data'){
            element=defaultScope.functions.reports.report.data;//gets the json settings and iterats trough the options
            for(key in element){field = element[key];
               if(typeof field.set!="undefined"){
                  prop.push(key);//get the field name to be used in dataSet and in conjunstion with the rows fetched from the server
                  dataSet[key] = [];
                  fillColor.push(field.fillColor);
                  strokeColor.push(field.strokeColor);
                  legend.push(field.title);
               }
               if(field.title)$scope.table.title.push({"title":field.title,"key":key});
            }
            options={"fillColor":fillColor,"strokeColor":strokeColor};//set the bar graph colors and options settings
            $scope.opt.legend=legend;//used in the presentation page to display the legends
            $scope.opt.strokeColor=strokeColor;// used as a background color in the presentation page
            $scope.opt.graphTitle="Data usage by Clients";
            for(x=0;x<len;x++){
               labels.push(rows[x].client||rows[x].account);
               l=prop.length;//add the data that are only available in the property
               for(y=0;y<l;y++)dataSet[prop[y]].push(Math.round(rows[x][prop[y]]));
            }
            $timeout(function(){var bar = new jsGraph(labels,dataSet,'canvas',options).barChart();},1000);
         }else if(jesua=='cost'){
            element=defaultScope.functions.reports.report.cost;
            for(key in element){field = element[key];
               if(typeof field.set!="undefined"){
                  prop.push(key);
                  dataSet[key] = [];
                  fillColor.push(field.fillColor);
                  strokeColor.push(field.strokeColor);
                  pointColor.push(field.pointColor);
                  pointStrokeColor.push(field.pointStrokeColor);
                  legend.push(field.title);
               }
               if(field.title)$scope.table.title.push({"title":field.title,"key":key});
            }
            options={"fillColor":fillColor,"strokeColor":strokeColor,"pointColor":pointColor,"pointStrokeColor":pointStrokeColor};
            $scope.opt.legend=legend;
            $scope.opt.strokeColor=strokeColor;
            $scope.opt.graphTitle="Data usage by Clients";
            for(x=0;x<len;x++){
               labels.push(rows[x].client||rows[x].account);
               l=prop.length;//add the data that are only available in the property
               for(y=0;y<l;y++)dataSet[prop[y]].push(Math.round(rows[x][prop[y]]));
            }
            $timeout(function(){var line = new jsGraph(labels,dataSet,'canvas',options).lineChart();},1000);
         }
      }
   });
}//function
//============================================================================//
function psalm($scope){
   $scope.templates=[
      {"name":"User Detail","url":"cera/templates/tmpl_user.html","disabled":false},
      {"name":"Client Detail","url":"cera/templates/tmpl_client.html","disabled":true}
   ];
}
//============================================================================//
function proverbs($scope,crud,fetch,$element){
   var title="System List",profile='lists',defaultScope=dynamis.get("defaultScope",true)[profile];
   $scope.lists=[{"name":"First","focus":true},{"name":"Second","focus":false,"child":[{"name":"un"},{"name":"deux"},{"name":"trois"}]}];
   $scope.lists[1].child[2].child=[{"name":"you"},{"name":"are"},{"name":"Good"},{"name":"all the time","child":[{"name":"Success"},{"name":"2014"}]}];

   crud.get($scope,title,profile,defaultScope);
   $scope.executiveDirector=function(e,key,node){
      var mainNode=$element.parent(),num;//mainNode is the parent ul
      if(e.keyCode==38){
         num=(key-1)*1;
         if(num<0) {
            return false;
         }else{
            _$(mainNode.children()[num]).find("div")[1].focus();
         }//find the children & the prev DOM element,set the DOM element to element then find the second DOM div, then focus
      }
      else if (e.keyCode==40) {
         var nodeLength=mainNode.children().length,subNode;
         num=(key+1)*1;
         if(num>=nodeLength){
            subNode=_$(mainNode.children()[nodeLength-1]);iyona.deb("subNode",subNode.find("ul"));
            _$(subNode.find("ul").find("li")[0]).find("div")[1].focus();
         }else{
            _$(mainNode.children()[num]).find("div")[1].focus();
         }
      }
      executiveDirector(e,key,node);
   }
   $scope.restore=function(e){e.stopPropagation(); e.gesture.stopDetect(); e.gesture.stopPropagation();return true;}
}
//============================================================================//
function tmplUser($scope){}
function tmplClient($scope){}
function rptServers($scope,$routeParams,crud,fetch){
   var title="Servers",profile='servers',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};

   crud.get($scope,title,profile,defaultScope);
   fetch.post(sessionStorage.SITE_SERVICE,{"militia":"invloice-example"},function(server){
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