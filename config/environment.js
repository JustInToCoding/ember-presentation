/* jshint node: true */

var fs = require('fs');
var path = require('path');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-presentation',
    environment: environment,
    rootURL: '',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      routerCode: fs.readFileSync(path.join(__dirname, '../examples/router.js'), { encoding: 'utf-8' }),
      routeHandlerCode: fs.readFileSync(path.join(__dirname, '../examples/route.js'), { encoding: 'utf-8' }),
      modelCode: fs.readFileSync(path.join(__dirname, '../app/models/report.js'), { encoding: 'utf-8' }),
      templateCode: fs.readFileSync(path.join(__dirname, '../examples/template.hbs'), { encoding: 'utf-8' }),
      componentCode: fs.readFileSync(path.join(__dirname, '../app/components/show-report.js'), { encoding: 'utf-8' }),
      componentTemplateCode: fs.readFileSync(path.join(__dirname, '../app/templates/components/show-report.hbs'), { encoding: 'utf-8' })
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
