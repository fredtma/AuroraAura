var app = {
   pushNotification:window.plugins.pushNotification,
   // Application Constructor
   initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   onDeviceReady: function() {
      console.log('Received Event: DeviceReady');
      document.body.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
      app.devicePushNotification();
   },
   devicePushNotification: function(){
      var senderID=dynamis.get("projectID")||"17238315752";
      if ( device.platform == 'android' || device.platform == 'Android' )
      {this.pushNotification.register(successNotification,errorNotification, {"senderID":senderID,"ecb":"app.onNotificationGCM"});}
      else
      {this.pushNotification.register(tokenHandler,errorNotification, {"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});}
   },
   onNotificationGCM:function(e){
      switch (e.event)
      {
         case 'registered':
            if (e.regid.length > 0)iyona.log("Regid " + e.regid);break;
         case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            var msg;
            if("payload" in e){msg = "Msg:"+e.payload.message+", MsgCnt:"+e.payload.msgcnt;}
            if(e.foreground){msg+=" in forground:"+e.foreground}//if the application is in the front: @todo set msg on status
            if(e.coldstart){msg+=" in coldstart:"+e.coldstart}//if the application has not started: start the application
            iyona.log('message = ' + e.message + ' msgcnt = ' + e.msgcnt+", msg:"+msg);
            break;
         case 'error':alert('GCM error = ' + e.msg);break;
         default:alert('An unknown GCM event has occurred');break;
      }
   },
   onNotificationAPN: function(e) {
      if (e.alert){navigator.notification.alert(e.alert);}
      if (e.sound){var snd = new Media(e.sound);snd.play();}
      if (e.badge){this.pushNotification.setApplicationIconBadgeNumber(successNotification, errorNotification, e.badge);}
   }
};
app.initialize();
//============================================================================//
//PHONEGAP FUNCTIONS                                                          //
//============================================================================//
function successNotification (result) {
	iyona.log('successful push notification result = ' + result);
}
//============================================================================//
function errorNotification (error) {
	alert('error = ' + error);
}
//============================================================================//
function tokenHandler (result) {
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
	alert('device token = ' + result);
}
//============================================================================//