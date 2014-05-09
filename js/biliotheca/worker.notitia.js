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
      var ver = data.DB_VERSION||null,x,l;
      var iRequest=self.indexedDB.open("app_xpandit",parseInt(ver)),idb,option=data.option,upgrading=false;

      iRequest.onsuccess=function(e){self.postMessage("Worker iDB Ready");
         idb=idb||e.target.result||iRequest.result;
         //place the addition of data in seperate loop, in order to prevent `transaction running`
         if(upgrading==true){
            for(var profile in defaultScope){
               var table = defaultScope[profile].mensa;
               aSync(SITE_SERVICE,{"militia":"imple","mensa":table},function(e){
                  //iyona.log("RESOURCE",e);
                  if("notitia" in e===false){iyona.log("could not auto update iDB");return false;}
                  l=e.notitia.rows.length;
                  for(x=0;x<l;x++){iWrite(e.notitia.mensa,e.notitia.rows[x],true);}
               });
         }}upgrading=false;
      }
      iRequest.onerror=function(e){iyona.log("Database error code: "+e.target.error.message);}

      iRequest.onupgradeneeded=function(e){self.postMessage("Upgradding");
         idb=e.target.result||iRequest.result;upgrading=true;

         for(var profile in defaultScope){
            if(option!==true||(typeof option=="object" && option.hasOwnProperty(profile)==false )){iyona.log("skipping",profile); continue;}
            var table = defaultScope[profile].mensa;
            var mensa = defaultScope[profile].creation;

            if(idb.objectStoreNames.contains(table)!==true){//new store creation
               var store=iRequest.result.createObjectStore(table,{keyPath:"jesua"});
               for(var field in mensa){//@note:no need to add store as the store is dynamic.
                  var current=mensa[field]; if(field==='jesua')continue;
                  if(current.unique) store.createIndex('uniq_'+field,field,{unique:true});//keyname,keypath
                  if(current.ndx) store.createIndex(current.ndx,field);
               }//for field in mensa.fields
            }else{//to update the object store's index
               store=(iRequest.transaction)?iRequest.transaction.objectStore(table):e.currentTarget.transaction.objectStore(table);
               var x,l=store.indexNames.length;
               //iyona.log("COLUMN",typeof store.indexNames,store.indexNames instanceof Array,store.indexNames,table);
               for(x=0;x<l;x++){if(typeof store.indexNames[x]==='string')store.deleteIndex(store.indexNames[x]);}//remove all indexs

               for(var field in mensa){//@note:no need to add store as the store is dynamic.
                  var current=mensa[field];//if(field==='jesua')continue;iyona.log("CURRENT",current,field);
                  try{
                     if(current.unique&&!objSearch(store.indexNames,'uniq_'+field)) {store.createIndex('uniq_'+field,field,{unique:true});}
                     if(current.ndx&&!objSearch(store.indexNames,current.ndx)) {store.createIndex(current.ndx,field);}
                  }catch(e){iyona.log("An error occured in creating the index::"+e.message, field,e)}

               }//for field in mensa.fields
            }
            iRequest.transaction.onerror=function(e){iyona.log("A database error code: "+e.target.errorCode,e);}

         }
      }
      iWrite=function(_store,_data,_update){var crud;
         if(iRequest&&iRequest.readyState!="done"){iRequest.addEventListener("success",function(){iyona.log("Here it act"); iWrite(_store,_data,_update)},false); return false;}
         else if(iRequest) {idb=iRequest.result;}
         else {iyona.log("No iRequest");return false;}
         if(idb.objectStoreNames.contains(_store)!==true){iyona.log("No store iFound");return false;}

         var store=_store||"users",transaction=idb.transaction(store,"readwrite"),request;
         var objectStore=transaction.objectStore(store);
         if(typeof _data!=="object") {iyona.log("No iData");return false;}

         if(!_update){request=objectStore.add(_data);crud='inserted';}
         else {request=objectStore.put(_data);crud='updated';}
         request.onsuccess=function(e){iyona.log("Successfully "+crud+" iWrite to "+store);}
         request.oncomplete=function(e){iyona.log("Successfully completed iWrite to "+store+"::"+e.target.error.message);}
         request.onerror=function(e){iyona.log("Error while writing to "+store+"::"+e.target.error.message,_data);}
         if(x>=l){iyona.log("Closing worker");self.close();}//closes worker after last iteration
      }
   }
   else if (data.hasOwnProperty("factum")){
      var serverEvent=new EventSource("http://demo.xpandit.co.za/app_xpandit/services/tester.php");
      serverEvent.addEventListener('init',function(ev){cnt++;if(cnt>=50){iyona.log("Closing worker"); serverEvent.close();self.close();}
         var results=JSON.parse(ev.data);iyona.log("SERVER EVENT INIT-"+cnt);
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
   }
});//evenlistener for message


