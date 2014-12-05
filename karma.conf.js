// Karma configuration
// Generated on Mon Oct 20 2014 16:54:46 GMT+0200 (South Africa Standard Time)
// e3e use
// #https://github.com/angular/protractor, 
// #install scenario: @http://stackoverflow.com/questions/18134922/error-when-running-angularjs-karma-sample
// #setup proxies @http://stackoverflow.com/questions/15907432/jasmine-karma-test-browser-is-not-defined
// #e2e @http://stackoverflow.com/questions/13173719/is-it-possible-to-mix-testacular-karma-with-angular-scenario
// 
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['ng-scenario','jasmine'],

    // list of files / patterns to load in the browser
    files: ['test/*.js'],

    // list of files to exclude
    exclude: [],

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
	//===================================================================================//
	 //urlRoot:'/__karma/',
	 proxies:{'/':'http://localhost:7000/xpandit/'},
	//===================================================================================//
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
