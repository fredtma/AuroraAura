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
.filter('refined',function(){
   return function(items,fields,value){
      if(fields instanceof  Array===false || typeof value ==="undefined") return items;//if fields to search is not an array or there is no search
      var val,item,field,x,l=items.length,l2=fields.length,filtered = [];

      for(x=0;x<l;x++){//first iteration of items to item
         item=items[x];
         for(var y=0;y<l2;y++){//second iteration gets the fields to search
            field=fields[y];
            val = new RegExp(value,'i');
            if(item[field] && item[field].search(val)!==-1) {filtered.push(item);break;}//once found break second iteration
         }
      }
      return filtered;
   }
})
;