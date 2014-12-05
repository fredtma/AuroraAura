'use strick'
describe('Unit: login with exodus ',function(){

//   beforeEach(module('KingOFkings'));//gospel
//   var ctrl,scope,routeParams;
//   beforeEach(inject(function($controller,$rootScope){scope=$rootScope.$new();routeParams={'login':null};ctrl=$controller('exodus',{$scope:scope,$routeParams:routeParams});}));

   beforeEach(function(){
      browser().navigateTo('index.html#/');
   });
   it('it should jump to /exodus',function(){
      browser().navigateTo('index.html#/genesis');
      console.log(browser().location().path());
      expect(browser().location().path()).toBe("/exodus");
   });
   it("Testing username and password",function(){
      input('data.username').enter('fredtma');
      input('data.password').enter('qwerty');
      element('#login1').click();
      expect(browser().location().path()).toBe("/genesis");
   });

});

//describe("A suite", function() {
//  it("contains spec with an expectation", function() {
//     sleep(5);
//    expect(true).toBe(true);
//  });
//});