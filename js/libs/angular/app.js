'use strict'
angular.module('KingOFkings',['ngRoute','angular-gestures','ngSanitize','ngAnimate','KingsControllers','KingsServices','KingsFilters'])
.config(['$routeProvider',function($routeProvider){
   $routeProvider
      .when('/genesis/:view?',{templateUrl:'cera/home.html'})
      .when('/exodus/:login?',{templateUrl:'cera/login.html'})
      .when('/deuteronomy/:page/:log?/:server?',{templateUrl:'cera/log_servers.html'})
      .when('/leviticus/:page/:opt?/:view?',{templateUrl:'cera/servers.html'})
      .when('/joshua/:page/:opt?/:view?',{templateUrl:'cera/users.html'})
      .when('/numbers/:page/:opt?/:view?',{templateUrl:'cera/clients.html'})
      .otherwise({redirectTo:'/genesis'});
}]).run(['notitia','$location','$rootScope',function(notitia,$location,$rootScope){
   notitia.notitia();/*innitiate the DB*/
   if(!impetroUser().operarius&&$location.$$url!='/exodus') $location.path("/exodus");/*less intensive redirect when not login*/
   //$rootScope.$on("$routeChangeStart",function(event,next,current){if(!impetroUser().singularis && next.loadedTemplateUrl!="cera/login.html"){$location.path("/exodus");}});//redirect when not login by watching event
   var href=(impetroUser())?"#joshua/administrator/"+impetroUser().operarius+"/details":"#joshua/administrator/none/details";
   $rootScope.site={"title":sessionStorage.SITE_NAME,"company":"XpandIT"};
   $rootScope.menus=[{"link":true,"header":"dropdown-header","text":"Action List"},{"link":true,"icon":"glyphicon glyphicon-user","text":"User Profile","href":href},{"link":true,"icon":"glyphicon glyphicon-list","text":"Profile List","href":"#joshua/administrator/view/all"},{"link":true,"icon":"glyphicon glyphicon-briefcase","text":"Clients","href":"#numbers/clients/view/all"},{"link":true,"icon":"glyphicon glyphicon-hdd","text":"Servers","href":"#leviticus/servers/view/all"},{"divider":"divider"},{"link":true,"header":"dropdown-header","text":"Settings"},{"link":true,"icon":"glyphicon glyphicon-cog","text":"Configuration"},{"link":true,"icon":"glyphicon glyphicon-off","href":"#exodus/logoff","text":"Log Off"}];
   $rootScope.panelLeft=[{"name":"Functions","id":"panelFunctions","header":true,"cls":"list-header"},{"name":"User Profile","id":"panelProfile","header":false,"icon":"glyphicon-user","href":href},{"name":"Profile List","id":"panelProfileList","header":false,"icon":"glyphicon-list","href":"#joshua/administrator/view/all"},{"name":"Clients","id":"panelClients","header":false,"icon":"glyphicon-briefcase","href":"#numbers/clients/view/all"},{"name":"Servers","id":"panelServers","header":false,"icon":"glyphicon-hdd","href":"#leviticus/servers/view/all"},{"name":"System","id":"panelCommunicate","header":true,"cls":"list-header"},{"name":"Share","id":"panelShare","header":false,"icon":"glyphicon-retweet"},{"name":"Feed Back","id":"panelFeed","header":false,"icon":"glyphicon-comment"},{"name":"Configuration","id":"panelConfig","header":false,"icon":"glyphicon-cog"},{"name":"Help","id":"panelHelp","header":false,"icon":"glyphicon-question-sign"},{"name":"Log Off","id":"panelLogOff","header":false,"icon":"glyphicon-off danger","href":"#exodus/logoff"}];
   $rootScope.panelRight=[{"name":"Knowledge Graph","id":"panelKnowledge","header":true,"cls":"list-header"},{"name":"Email","id":"panelEmail","header":false},{"name":"Network","id":"panelNetword","header":false},{"name":"Setup","id":"panelSetup","header":false},{"name":"Server","id":"panelServer","header":false},{"name":"Software","id":"panelSoftware","header":false}];
   $rootScope.PASCO=PASCO;
}]);
//============================================================================//

configuration.prototype.eternal=function(){
   var date = new Date().format("isoDateTime");
   var scope = {
      "users":{"created":date, "modified":date,"jesua":null,"firstname":null,"lastname":null,"username":null,"email":null,"mobile":null,"title":"Mr.","communication":"email"},
      "clients":{"created":date, "modified":date,"jesua":null,"name":null,"code":null,"desc":null},
      "servers":{"created":date, "modified":date,"jesua":null,"name":null,"address":null,"mailbox":null,"email":null,"password":null,"status":null,"period":null},
      "log_servers":{"hour":null,"created":date, "modified":date,"name":null,"address":null,"reason":null,"status":null}
   };
   var defaults={"jesua":{"type":"TEXT","key":"unique"},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"}};
   var loremIpsum={
         "users":{"defaults":defaults,"fields":{"username":{"type":"TEXT","unique":true},"firstname":{"type":"TEXT","null":true},"lastname":{"type":"TEXT"},"email":{"type":"TEXT","null":true},"password":{"type":"TEXT","null":true},"mobile":{"type":"TEXT"},"title":{"type":"TEXT"},"communication":{"type":"TEXT"} }},
         "clients":{"defaults":defaults,"fields":{"name":{"type":"TEXT","null":true,"unique":true},"code":{"type":"TEXT","null":true,"unique":true},"desc":{"type":"TEXT"} }},
         "contacts":{"defaults":defaults,"fields":{"ref_user":{"type":"TEXT","null":true,"ref":{"table":"users","field":"jesua"}},"type":{"type":"TEXT","null":true},"contact":{"type":"TEXT","null":true,"ndx":"ndxContact"},"instruction":{"type":"TEXT"},"ext":{"type":"TEXT"}}},
         "servers":{"defaults":defaults,"fields":{"name":{"type":"TEXT","null":true,"ndx":"ndxServerName"},"address":{"type":"TEXT","null":true},"mailbox":{"type":"TEXT"},"email":{"type":"TEXT","unique":true},"password":{"type":"TEXT"},"status":{"type":"TEXT"},"period":{"type":"INTEGER"}}},
         "version_db":{"fields":{"id":{"type":"INTEGER","key":true},"ver":{"type":"REAL"}}},
         "log_servers":{"fieds":{"hour":{"type":"TEXT","key":true},"created":{"type":"TEXT"}, "modified":{"type":"TEXT"},"name":{"type":"TEXT","unique":true},"address":{"type":"TEXT"},"reason":{"type":"TEXT"},"status":{"type":"TEXT"}}}
      }

   scope.administrator=scope.users;
   dynamis.set("scope",scope);
   dynamis.set("loremIpsum",loremIpsum);
   return this;
};
(function(){var settings= new configuration(); settings.eternal();  iyona.deb(settings,'settings'); })();