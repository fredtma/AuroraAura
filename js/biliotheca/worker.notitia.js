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
   else if(data.hasOwnProperty("progredior")){
      var iDB = callIdb(data,self,defaultScope,SITE_SERVICE);
   }
   //=========================================================================//
   else if (data.hasOwnProperty("enkele")){
      var iDB = callIdb(data,self,defaultScope,SITE_SERVICE),l,x;
      iyona.log("WORKING ENKELE", typeof data.militia);
      if(data.militia==="imple"){
         aSync(SITE_SERVICE,{"militia":"imple","mensa":data.mensa},function(e){
            if("notitia" in e===false){iyona.log("could not auto update iDB");return false;}
            l=e.notitia.rows.length;
            for(x=0;x<l;x++){iDB.iWrite(data.mensa,e.notitia.rows[x],true);}
            WORK.postMessage("Worker Typeahead addition for "+data.mensa);
         });
      }
   }
   //=========================================================================//
   else if (data.hasOwnProperty("factum")){
      var serverEvent;
      serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event");
      serverEvent.addEventListener('init',function(ev){
         cnt++;if(cnt>=50){iyona.log("Closing worker"); serverEvent.close();self.close();}
         var results=JSON.parse(ev.data);iyona.log("WK + SERVER EVENT INIT-"+cnt);
         if(!results||"servers" in results===false) {iyona.log("There was an error in bethel's results");return false;}
         var back = {"results":results,"scope":{"servers":null,"online":null,"serverLine":null}};
         var scope=results;
         try{ results=null;
            var row1 = (typeof scope.online.rows[0] !=="undefined")?scope.online.rows[0].count:0,row2 = (typeof scope.online.rows[1] !=="undefined")?scope.online.rows[1].count:0;
            scope.total=parseInt(row1)+parseInt(row2);//total number of server
            scope.down=( (scope.online.length>1)||(scope.online.length==1&&scope.online.rows[0].status=="down") )?true:false;//if there is two row or one with a down status
            scope.msg=(scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
            var n = (scope.online.rows[1])?scope.online.rows[1].count:(scope.online.rows[0])?scope.online.rows[0].count:1;
            scope.downTotal=n;
            if(scope.down){
               scope.msgStatus="You have "+n+" server down";
            }else{scope.msgStatus="All servers are operational.";}
            scope.last=scope.online.rows[0].modified;
            back.scope=scope; self.postMessage(back);
         }catch(e){iyona.log("There was an error in bethel",e.message);}
      });
      serverEvent.onerror=function(ev){iyona.deb("Server event error.",ev);}
      self.onclose=function(){serverEvent.close();iyona.log("Closing worker && SSE :: OnClose");}

      if(data.factum==="close"){
         serverEvent.close();
         serverEvent=new EventSource("http://demo.xpandit.co.za/aura/home-event,close");
         iyona.log("Living God, Closing worker && SSE");
         self.close();
      }
   }
   else if (data.hasOwnProperty("proxime")){iyona.log("Closing worker && SSE");
      self.close();//serverEvent.close();
   }
});//evenlistener for message


