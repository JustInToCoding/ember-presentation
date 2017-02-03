import Ember from 'ember';
import hasComponent from '../utils/has-component';

const { Controller, observer, getOwner } = Ember;

export default Controller.extend({
  queryParams: ['slide'],
  slide: null
});
