/*
 * The worker file to process the DB
 * No window|document|parent
 */
var WORK = self;
importScripts('worker.muneris.js');
self.addEventListener('message',function(e){
   var data=e.data,isLecentia=false,cnt=0;
   var defaultScope=data.defaultScope,SITE_SERVICE=data.SITE_SERVICE;

   if(data.hasOwnProperty("novum")) {self.postMessage(data.novum);}
   //=========================================================================//
   else if(data.hasOwnProperty("reprehendo")) {
      aSync(SITE_SERVICE,"militia=ipse&ipse="+data.procus+"&moli="+data.moli,function(result){
         if(typeof result!=="object"){iyona.deb("Not result found.");return false;}
         iyona.log(result);
         for(var mensa in result){
            for(var ver in result[mensa]){
               var quaerere=[],params=[],set=[],actum,jesua,trans,field;
               for(trans in result[mensa][ver]) break;
               for(field in result[mensa][ver][trans]){if(field=='id')continue;
                  quaerere.push('`'+field+'`');params.push(result[mensa][ver][trans][field]);set.push('?');
                  jesua=result[mensa][ver][trans]['jesua']}
               switch(trans){
                  case "1":actum='INSERT INTO '+mensa+' ('+quaerere.join()+')VALUES('+set.join()+')';break;
                  case "2":actum='UPDATE '+mensa+' SET '+quaerere.join('=?,')+'=? WHERE jesua=?';params.push(jesua);break;
               }//endswitch
               var eternal="eternal[ver]="+ver+"&eternal[user]="+data.procus+"&eternal[DEVICE]="+data.moli+"&iyona=version_control&Tau=Alpha&procus=0";
               $DB(actum,params,"Synced "+mensa,function(result,j){},false,eternal);
               switch(isLecentia){case'link_permissions_groups':case'link_permissions_users':isLecentia=true;break;}
            }//for ver
            if(isLecentia)WORK.postMessage('licentia');//run the permission function
         }//endfor mensa in result
      });//aSync
   }//if procus in data
   //=========================================================================//
   else if(data.hasOwnProperty("novaNotitia")){
      resetNotitia({users:1,groups:1,ug:1,perm:1,pg:1,pu:1,client:1,contact:1,address:1,dealer:1,salesman:1,ver:1,pages:1,features:1,db:1});
      WORK.postMessage('Database reseted.');
   }
   //=========================================================================//
   else if(data.hasOwnProperty("progredior")){//progress
      var iDB = callIdb(data,self,defaultScope,SITE_SERVICE);
   }
   //=========================================================================//
   else if (data.hasOwnProperty("enkele")){//single
      var iDB = callIdb(data,self,defaultScope,SITE_SERVICE),l,x;
      iyona.log("WORKING ENKELE", typeof data.militia);
      if(data.militia==="imple"){
         aSync(SITE_SERVICE,{"militia":"imple","mensa":data.mensa,"uProfile":data.uProfile},function(e){
            if(typeof e.notitia==="undefined" || typeof e.notitia[data.mensa].rows==="undefined"){iyona.log("could not auto update iDB",e);WORK.postMessage("could not auto update iDB on "+data.mensa);return false;}
            l=e.notitia[data.mensa].rows.length;iyona.log("DATA added",data.mensa,e);
            for(x=0;x<l;x++){iDB.iWrite(data.mensa,e.notitia[data.mensa].rows[x],true);}
            WORK.postMessage("Worker Typeahead addition for "+data.mensa);
         });
      }
   }
   //=========================================================================//
   else if (data.hasOwnProperty("factum")){
      var serverEvent;
      serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event");
      serverEvent.addEventListener('init',function(ev){
         cnt++;
         if(cnt>=50 && false){iyona.log("Closing worker"); serverEvent.close();self.close();}//DISABLE::after a certain number
         var results=JSON.parse(ev.data);
         console.log("#==============================================================================#");
         console.log("WK + SERVER EVENT INIT-"+cnt,results,"servers" in results===false, !results);
         if(!results||"servers" in results===false) {console.log("There was an error in bethel's results");return false;}
         var back = {"results":results,"scope":{"servers":null,"online":null,"serverLine":null,"nagios":null}};
         var scope=results;
         try{
            results=null;
            var serverStatus={'down':0,'active':0,'slow':0,'nagios':0},xx,ll,nn,row=[];
            scope.total = 0;
            if(typeof scope.online!=="undefined" && typeof scope.online.rows !== "undefined"){
               ll = scope.online.rows.length;
               for(var xx=0;xx<ll;xx++){
                  nn = scope.online.rows[xx];
                  row.push(nn);
                  serverStatus[nn.status] = parseInt(nn.count);
                  scope.total += parseInt(nn.count);
               }
            }
            serverStatus.nagios  = parseInt(scope.nagios.length);
            scope.down           = serverStatus.down>0?true:false;//if there is two row or one with a down status

            scope.msgStatus="All mail servers are operational.<br/>";/*set scroller*/
            if(serverStatus.down)   {scope.msgStatus ="You have "+serverStatus.down+" mail server down<br/>";}
            if(serverStatus.slow)   {scope.msgStatus+="You have "+serverStatus.slow+" slow mail servers<br/>";}/*set scroller*/
            if(serverStatus.nagios) {scope.msgStatus+="You have "+scope.nagios.length+" Nagios server/s down <br/>";}/*set scroller*/

            scope.last=row[0].modified;
            back.scope=scope;
            self.postMessage(back);
         }catch(e){console.log("There was an error in bethel",e.message);}
      });
      serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);console.log(ev);}
      self.onclose=function(){serverEvent.close();iyona.log("Closing worker && SSE :: OnClose");}

      if(data.factum==="close"){
         serverEvent.close();
         serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event,close");
         iyona.log("Living God, Closing worker && SSE");
         self.close();
      }
   }
   else if (data.hasOwnProperty("proxime")){iyona.log("Closing worker && SSE");
      self.close();//serverEvent.close();
   }
});//evenlistener for message


