'use strict';

xdescribe('Init: MainController', function(){
   beforeEach(module('KingOFkings'));
   var ctrl,scope;
   beforeEach(inject(function($controller,$rootScope){

      scope=$rootScope.$new();
      ctrl=$controller('MainController',{$scope:scope});
   }));
   it('should create $scope.praises when calling sayPraises',function(){

      expect(scope.praises).toBeUndefined();
      scope.sayPraises();
      expect(scope.praises).toEqual("Praises to the Lord of all");
   });
});

/*
describe('MainController', function(){
   console.log('start');

   it('should create $scope.praises when calling sayPraises',function(){
      console.log('it is ');
      var scope = {}, ctrl = new MainController(scope);
      expect(scope.praises).toBeUndefined();
      scope.sayPraises();
      expect(scope.praises).toEqual("Praises to the Lord of all");
  });
});
*/
