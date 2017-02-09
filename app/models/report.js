import DS from 'ember-data';

export default DS.Model.extend({
  rows: DS.hasMany(),
  title: DS.attr('string'),
  createdAt: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  updatedAt: DS.attr('date', {
    defaultValue() { return new Date(); }
  })
});
