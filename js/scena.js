chrome.app.runtime.onLaunched.addListener(function(){
   chrome.app.window.create('welcome.html',
   {
      "bounds":{'width':1600,'height':1024},
      "minWidth":800, "minHeight":600,"id":"9"
   });
});

//chrome.runtime.onInstalled.addListener(function() {chrome.storage.local.set(items, callback);});//used to store data/db on start up
//chrome.runtime.onSuspend.addListener(function() { });