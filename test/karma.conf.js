module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-material/angular-material.js',

      '../app/src/responsavel/app.js',
      '../app/src/responsavel/home.service.js',
      '../app/src/responsavel/home.controller.js',

      'test/unit/**/*.js'
    ],

    logLevel: config.LOG_ERROR,
    port: 9876,
    reporters: ['progress'],
    colors: true,

    autoWatch : false,
    singleRun : true,

    // For TDD mode
    //autoWatch : true,
    //singleRun : false,

    frameworks: ['jasmine'],
    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]

  });
};
