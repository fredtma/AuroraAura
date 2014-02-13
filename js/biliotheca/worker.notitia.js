/*
 * The worker file to process the DB
 */
importScripts('parva.muneris.js');
var db,creoDB;
var WORK = self;
self.addEventListener('message',function(e){
   var data=e.data,isLecentia=false;
   iyona(data);
   if(data.hasOwnProperty("novum")) {self.postMessage(data.novum);}
   //=========================================================================//
   else if(data.hasOwnProperty("reprehendo")) {
      aSync(SITE_SERVICE,"militia=ipse&ipse="+data.procus+"&moli="+data.moli,function(result){
         if(typeof result!=="object"){iyona("Not result found.");return false;}
         iyona(result);
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
});//evenlistener for message


