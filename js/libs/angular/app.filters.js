angular.module('KingsFilters', [])
.filter('ucfirst', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substring(1);
    }
}).filter('increment',function(){
   return function(input){if(!angular.isNumber(input))return input;
      return input=input+1;
   }
}).filter('lastTime',function(){
   return function(input){
      return input=timeDifference(input);
   }
})
.filter('display',function(){
   return function(input,option){
      if(typeof option!=='object' || option==null)return input;
      switch(option.case){
         case 'pre': input="<b>"+option.value+"</b> "+input; break;
         case 'suf': input+=" <b>"+option.value+"</b>"; break;
      }
      return input;
   }
})
;