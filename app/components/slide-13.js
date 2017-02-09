import Ember from 'ember';
import config from '../config/environment';

const { inject } = Ember;

export default Ember.Component.extend({
  componentCode: config.APP.componentCode,
  componentTemplateCode: config.APP.componentTemplateCode,
  store: inject.service(),

  init() {
    this._super(...arguments);
    let store = this.get('store');
    this.set('report', store.createRecord('report', {
      title: 'Some report title'
    }));
  }
});
