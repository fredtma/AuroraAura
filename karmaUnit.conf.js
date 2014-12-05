// Karma configuration
// Generated on Wed Nov 05 2014 13:11:06 GMT+0200 (South Africa Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'js/libs/angular/angular.min.js',
      'js/libs/bootstrap/ui-bootstrap-0.9.0.min.js',
      'js/libs/angular/angular-route.min.js',
      'js/libs/angular/angular-mocks.js',
      'js/biliotheca/lib.muneris.js',
      'js/libs/angular/angular-animate.min.js',
      'js/libs/angular/angular-sanitize.min.js',
      'js/libs/angular/angular-resource.min.js',
      'js/libs/angular/angular-gestures.min.js',
      'js/libs/angular/app.filters.js',
      'js/libs/angular/app.js',
      'js/libs/angular/app.controllers.js',
      'js/libs/angular/app.service.js',
      'js/libs/angular/app.directive.js',
      'js/biliotheca/lib.consuetudinem.js',
      'test/*.js',
      {pattern: 'js/welcome.js',watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    proxies:{'/':'http://localhost:7000/xpandit/'},
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
