import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('reports', { path: '/reports' }, function() {
    this.route('index', { path: '/' });
    this.route('new');
    this.route('report', { path: '/:report_id' }, function(){
      this.route('view', { path: '/' });
      this.route('edit', { path: '/edit' });
    });
  });
});

export default Router;
