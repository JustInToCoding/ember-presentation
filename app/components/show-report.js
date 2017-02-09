import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    let report = this.get('report');
    if(report) {
      this.set('title', report.get('title'));
    }
  },

  actions: {
    setTitle(title) {
      let report = this.get('report');
      if(report) {
        report.set('title', title);
      }
    }
  }
});
