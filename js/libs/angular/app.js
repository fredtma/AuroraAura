'use strict'
angular.module('KingOFkings',['ngRoute','angular-gestures','ngSanitize','ngAnimate','KingsControllers','KingsServices','KingsFilters','KingsDirectives','ui.bootstrap'])
.config(['$routeProvider','$compileProvider','$sceDelegateProvider',function($routeProvider,$compileProvider,$sceDelegateProvider){
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|mail|chrome-extension):/);
   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|chrome-extension|file):/);
   $sceDelegateProvider.resourceUrlWhitelist(['self', /demo.xpandit.co.za/]);
   $routeProvider
      .when('/gospel/:view?',{templateUrl:'cera/home.html'})
      .when('/genesis/:view?',{templateUrl:'cera/dashboard.html'})
      .when('/exodus/:login?',{templateUrl:'cera/login.html'})
      .when('/chronicles1/:page/:log?/:server?',{templateUrl:'cera/log_servers.html'})
      .when('/leviticus/:page/:view?/:jesua?',{templateUrl:'cera/servers.html'})
      .when('/joshua/:page/:view?/:jesua?',{templateUrl:'cera/users.html'})
      .when('/judges/:page/:view?/:jesua?',{templateUrl:'cera/groups.html'})
      .when('/proverbs/:page/:view?/:jesua?',{templateUrl:'cera/lists.html'})
      .when('/numbers/:page/:view?/:jesua?',{templateUrl:'cera/clients.html'})
      .when('/isaiah/:page/:view?/:jesua?',{templateUrl:'cera/adsl.html'})
      .when('/psalm/:page/:view?/:jesua?',{templateUrl:'cera/sales.html'})
      .when('/deuteronomy/:page/:view?/:jesua?',{templateUrl:'cera/permissions.html'})
      .when('/report/:report?',{templateUrl:'cera/reports/servers-rpt.html'})
      .when('/reportAll/:report?',{templateUrl:'cera/reports/reports.html'})
      .otherwise({redirectTo:'/genesis'});
}]).run(['notitia','$location','$rootScope','crud','fetch',function(notitia,$location,$rootScope,crud,fetch){
   Hammer.defaults.stop_browser_behavior.userSelect=PASCO?'NONE':'text';//in desktop mode allow selectable text
   var user = impetroUser();
   notitia.notitia();/*innitiate the DB*/
   if(!impetroUser().operarius&&$location.$$url!='/exodus') {$location.path("/exodus");}/*less intensive redirect when not login*/

   //$rootScope.$on("$routeChangeStart",function(event,next,current){if(!impetroUser().singularis && next.loadedTemplateUrl!="cera/login.html"){$location.path("/exodus");}});//redirect when not login by watching event
   var href=(impetroUser())?"#joshua/administrator/view/"+impetroUser().operarius:"#joshua/administrator/view/none";
   $rootScope.site={"title":sessionStorage.SITE_NAME,"company":"XpandIT"};
   $rootScope.menus=[
      {"link":true,"header":"dropdown-header","text":"Action List"},
      {"link":true,"icon":"glyphicon glyphicon-user","text":"User Profile","href":href},
      {"link":true,"icon":"glyphicon glyphicon-flag","text":"Profile List","href":"#joshua/administrator/list"},
      {"link":true,"icon":"glyphicon glyphicon-briefcase","text":"Clients","href":"#numbers/clients/list"},
      {"link":true,"icon":"glyphicon glyphicon-hdd","text":"Servers","href":"#leviticus/servers/list"},
      {"link":true,"icon":"glyphicon glyphicon-road","text":"ADSL List","href":"#isaiah/adsl/list"},
      {"link":true,"icon":"glyphicon glyphicon-list","text":"System List","href":"#proverbs/list"},
      {"link":true,"icon":"glyphicon glyphicon-lock","text":"Permissions","href":"#deuteronomy/licentia/list"},
      {"divider":"divider"},{"link":true,"header":"dropdown-header","text":"Settings"},
      {"link":true,"icon":"glyphicon glyphicon-cog","text":"Configuration"},
      {"link":true,"icon":"glyphicon glyphicon-off","href":"#exodus/logoff","text":"Log Off"},
      {"link":true,"icon":"glyphicon glyphicon-home","href":"#genesis","text":"Dashboard"}];
   $rootScope.panelLeft=[{"name":"Functions","id":"panelFunctions","header":true,"cls":"list-header"},{"name":"User Profile","id":"panelProfile","header":false,"icon":"glyphicon-user","href":href},{"name":"Profile List","id":"panelProfileList","header":false,"icon":"glyphicon-flag","href":"#joshua/administrator/list"},{"name":"Clients","id":"panelClients","header":false,"icon":"glyphicon-briefcase","href":"#numbers/clients/list"},{"name":"Servers","id":"panelServers","header":false,"icon":"glyphicon-hdd","href":"#leviticus/servers/list"},{"header":false,"id":"panelADSL","name":"ADSL List","icon":"glyphicon glyphicon-road","text":"ADSL List","href":"#isaiah/adsl/list"},{"header":false,"id":"systemList","name":"System List","icon":"glyphicon glyphicon-list","text":"System List","href":"#proverbs/list"},{"name":"System","id":"panelCommunicate","header":true,"cls":"list-header"},{"name":"Share","id":"panelShare","header":false,"icon":"glyphicon-retweet"},{"name":"Feed Back","id":"panelFeed","header":false,"icon":"glyphicon-comment"},{"name":"Configuration","id":"panelConfig","header":false,"icon":"glyphicon-cog"},{"name":"Help","id":"panelHelp","header":false,"icon":"glyphicon-question-sign"},{"name":"Log Off","id":"panelLogOff","header":false,"icon":"glyphicon-off danger","href":"#exodus/logoff"}];
   $rootScope.panelRight=[{"name":"Knowledge Graph","id":"panelKnowledge","header":true,"cls":"list-header"},{"name":"Email","id":"panelEmail","header":false},{"name":"Network","id":"panelNetword","header":false},{"name":"Setup","id":"panelSetup","header":false},{"name":"Server","id":"panelServer","header":false},{"name":"Software","id":"panelSoftware","header":false}];
   $rootScope.PASCO=PASCO;
   $rootScope.debug=PASCO?false:false;//no mobile debug
   $rootScope.debug=(typeof chrome !== "undefined" && chrome.hasOwnProperty("identity"))?false:$rootScope.debug;//no app debug
   $rootScope.debug=(user!==null&&user.operarius==="fredtma")?true:$rootScope.debug;//no app debug
   $rootScope.showPanel=false;
   $rootScope.exit=function(){crud.modalMessage("Are you sure you want to exit the application?",function(selected){$location.path("/exodus");if("app" in navigator)navigator.app.exitApp();if("localStorage" in window) localStorage.clear(); sessionStorage.clear();},function(selected){iyona.deb("The btn is::"+selected);});}
   $rootScope.refresh=function(){
      fetch.post(dynamis.get("SITE_ALPHA")+',creo,joshua',{},function(server){
         if(isset(server.licentia)){
            $rootScope.licentia = $rootScope.licentia||{};
            $rootScope.licentia.jesua="licentia";
            angular.extend($rootScope.licentia,server.licentia);
            iyona.deb("Maker of Licentia",$rootScope.licentia,server.licentia);
            notitia.iWrite("creo",$rootScope.licentia,true);
         }
      });
   };
   //$rootScope.refresh();
      if(notitia.IDBReady === true){iyona.log("On IDB running licentia");
            notitia.iRead("creo","licentia",function(e){var cursor = e.target.result; iyona.deb("Reading...",e, cursor); if(isset(cursor)) $rootScope.licentia=cursor; });
      }else{
         document.addEventListener("IDBReady",function(e){iyona.log("On IDB ready licentia");
            notitia.iRead("creo","licentia",function(e){var cursor = e.target.result; iyona.deb("Reading...",e, cursor); if(isset(cursor)) $rootScope.licentia=cursor; iyona.deb("POP",$rootScope.licentia);$rootScope.$apply(); });
         });
      }

   $rootScope.panelMenu=function(swipe,e){
      if(swipe==='left')$rootScope.showPanel=$rootScope.showPanel=='left'?false:'right';
      else if(swipe==='right')$rootScope.showPanel=$rootScope.showPanel=='right'?false:'left';
      else $rootScope.showPanel=false;
      e.cancelBuble=true; e.stopPropagation(); e.gesture.stopPropagation(); e.gesture.stopDetect(); return true;
   }
   $rootScope.isViewLoading = {"display":"none"};
}]);
//============================================================================//
//if (window.PASCO) {load_async("cordova.js", false, 'end', false);load_async("js/PushNotification.js", false, 'end', false);load_async("js/index.js", false, 'end', false); }else{load_async("js/welcome.js", false, 'end', false);}
if (window.PASCO) {load_script(["cordova.js","js/PushNotification.js","js/index.js"], false, 'end', false);}else{load_script(["js/welcome.js"], false, 'end', false);}
//============================================================================//

//============================================================================//
