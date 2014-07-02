angular.module('KingsDirectives', []).
   directive('contenteditable', contenteditable)
   .directive('viewAutofocus',viewAutofocus)
   .directive('listsParent',listsParent)
   .directive('listsChild',['$compile',listsChild]);

function contenteditable() {
   return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
         if (!ngModel)return; // do nothing if no ng-model
         // Specify how UI should be updated
         ngModel.$render = function() {
            element.html(ngModel.$viewValue || '');
         };
         // Listen for change events to enable binding
         element.on('keyup change', function(e) {
            if(e.keyCode===37||e.keyCode===38||e.keyCode===39||e.keyCode===40||e.keyCode===9||e.keyCode===13) return;
            scope.contentChange=true;
            scope.$apply(readViewText);
         });
         element.on("blur",function(){
            var blessing = scope.row||scope.sub;
            iyona.deb("BLUR",element,scope,blessing);
         });
         // No need to initialize, AngularJS will initialize the text based on ng-model attribute// Write data to the model
         function readViewText() {
            var html = element.html();
            // When we clear the content editable the browser leaves a <br> behind// If strip-br attribute is provided then we strip this out
            if (attrs.stripBr && html === '<br>') {html = '';}
            ngModel.$setViewValue(html);
         }
      }
   };
}
function viewAutofocus(){
   return {
      restrict:"A",
      link:function(scope,element,attrs){
         var val=attrs.viewAutofocus;
         if(val==true||val=="true"){
            attrs.$set("autofocus",true); element[0].focus();
            if(typeof scope.sub!="undefined") scope.sub.focus=false;
            else if(typeof scope.row!="undefined") scope.row.focus=false;
         }//if focus is true,then set it to false so that is does not repeat
         else attrs.$set("autofocus",false);
      }
   }
}
//@http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/
function listsParent(){
   return {
      restrict:"E",
      replace:true,
      scope:{"node":"="},
      templateUrl:'cera/templates/lists-parent.html',
      link:function(scope,element,attrs){
         //iyona.deb("PARENT",scope);
      }
   };
}
function listsChild($compile){
   return {
      controller:['$scope','$compile','$element','$timeout',listsCtrl],
      restrict:"E",
      replace:true,
      scope:{"sub":"=","key":"="},
      templateUrl:'cera/templates/lists-child.html',
      link:function(scope,element,attrs){
         var html;//iyona.deb("CHILD",scope);//return;
         if(angular.isArray(scope.sub.child)){
            //iyona.log("THIRD",scope.sub);
            if(typeof scope.sub.child[0].name==="undefined")html="<lists-parent node='sub.child[0].child'></lists-parent>";
            else html="<lists-parent node='sub.child'></lists-parent>";
            $compile(html)(scope,function(cloned,scope){element.append(cloned);});
         }
      }
   };
}
function listsCtrl($scope,$compile,$element,$timeout){
   $scope.tmp=true;
   $scope.restore=function(e){e.stopPropagation(); e.gesture.stopDetect(); e.gesture.stopPropagation();return true;};
   $scope.executiveDirector=function(e){
      var mainNode=$element.parent();//mainNode is the parent ul
      var mainScope = mainNode.scope(),html,key=$scope.key;
      var parentArray=(typeof mainScope.$parent.sub!=="undefined")?//for deep row
         mainScope.$parent.sub.child:(typeof mainScope.row!=="undefined")?//for top row
            mainScope.row.child:$scope.sub.child;
      if(e.keyCode===9)iyona.log("$SCOPE ",$scope,mainScope,mainNode,parentArray,e.keyCode);

      var tab = arrayManifestation(e,key,parentArray);
      if(tab===false) return;//this will prevent script to continue and prevent the lost child data.
      moveCursor(mainNode,$element,key,e);

      //disable the tab before angular's apply, so that it applied nothing. will later on add manual apply with new content.
      if(e.keyCode===9){if(typeof mainScope.row!=='undefined')mainScope.row.child = []; if(typeof mainScope.sub!=='undefined')mainScope.sub.child=[];}
      $timeout(function(){
         if(tab&&e.keyCode===9){//pressing the tab
            iyona.deb("START...",mainNode.children());
            $scope.$apply(function(){
               mainNode.children().remove();//delete all content and recalculate
               if(typeof mainScope.row!=="undefined")mainScope.sub=mainScope.row;//for the second level tree
               mainScope.sub.child=tab[2];iyona.deb("UP",tab,mainScope);
               if(typeof mainScope.sub.child[0].name==="undefined"){html = '<lists-child ng-repeat="(key,sub) in sub.child[0].child | filter:inputSearch | orderBy:sortable:reverse" sub="sub" key="key" ></lists-child>';}
               else {html = '<lists-child ng-repeat="(key,sub) in sub.child | filter:inputSearch | orderBy:sortable:reverse" sub="sub" key="key" ></lists-child>';}
               mainNode.append(html);//you can use append!=html bcos the array has been deleted in func executiveDirector and angular will remove the HTML
               //$compile(mainNode.contents())(mainScope);$scope.$destroy();
            });
         }
      },10);
   };
}