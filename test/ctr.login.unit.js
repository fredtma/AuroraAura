xdescribe("Login unit testing",function(){

   beforeEach(module('KingOFkings'));
   var ctrl,scope,routeParams,_notitia;
   var validEmails =['test@mail.com','fredtma@techie.com','real@truthful.true'];
   var invalidEmails =['@test@mail','fredtmatechie.com','real@ truthful.true'];

   beforeEach(inject(function($controller,$rootScope,notitia){
      scope=$rootScope.$new();
      scope.dataForm = {$invalid:false};
      routeParams={'login':null};
      _notitia = notitia;
      ctrl=$controller('exodus',{$scope:scope,$routeParams:routeParams});
   }));

   it("Ensure invalid email addresses are caught", function(){
      var valid,x,l=invalidEmails.length;
      for(x=0;x<l;x++){
         valid=_notitia.sanatio(invalidEmails[x],'email address',{'field':{'title':'email','type':'email'}} );
         expect(valid).toBeFalsy();
      }
   });
   it("Ensure valid email addresses pass validation", function(){
      var valid,x,l=validEmails.length;
      for(x=0;x<l;x++){
         valid=_notitia.sanatio(validEmails[x],'email address',{'field':{'title':'email','type':'email'}} );
         expect(valid).toBeTruthy();
      }
   });
   it("Testing login entry",function(){
      scope.data.username='fredtma';
      scope.data.password='qwerty12';
   });

});