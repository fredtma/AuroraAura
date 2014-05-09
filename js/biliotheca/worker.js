self.addEventListener("message",function(e){
   var DB_SIZE=3;
   var Idb;
   self.postMessage("Listening");
   console.log("Love");
   var IDBKeyRange = IDBKeyRange || webkitIDBKeyRange || msIDBKeyRange;
   var iRequest=self.indexedDB.open("app_xpandit",DB_SIZE);

   iRequest.onsuccess=function(e){
      Idb=iRequest.result;
      console.log("request",e,Idb);
      self.postMessage("success "+JSON.stringify(e));
   }
   iRequest.onerror=function(e){console.log("request",e,e.target);self.postMessage("iError::"+JSON.stringify(e)+" TARGET::"+JSON.stringify(e.target)+" MESSAGE::"+JSON.stringify(e.target.error) );}

//   iRequest.onupgradeneeded=function(e){self.postMessage("Upgradding"); console.log("This is needed.");}
   iRequest.onupgradeneeded=function (evt){evt.target.result.createObjectStore("Employees", { keyPath: "EmpId" });self.postMessage("Did upgraded.");}
});


/*
      var players = [{ num: 10, name: "kMac", age: 16, position: "point guard" },{ num: 12, name: "Brad", age: 15, position: "small forward" },{ num: 23, name: "Josh", age: 15, position: "shooting guard" },{ num: 32, name: "Patrick", age: 15, position: "power forward" },{ num: 42, name: "Elo", age: 16, position: "center" }];
      var store=e.currentTarget.result.createObjectStore("players",{"keyPath":"num"});
      store.createIndex("name","name",{"unique":false});
      store.createIndex("position","position",{"unique":true});
      for (var x in players){
         var req=store.add(players[x]);
         req.onsuccess=function(e){console.log("added player");self.postMessage("Added player::"+players[x].name);}
         req.onerror=function(e){console.log("no addition");self.postMessage("no addition::"+JSON.stringify(e));}
      }
 */