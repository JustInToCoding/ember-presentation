import Ember from 'ember';
import hasComponent from '../utils/has-component';

const { Controller, observer, getOwner } = Ember;

export default Controller.extend({
  queryParams: ['slide'],
  slide: null,
  startSlide: 1,

  slideQueryParamChanged: observer('slide', function() {
    let slide = parseInt(this.get('slide'));
    this.set('slideNumber', slide);

    let owner = getOwner(this);

    let currentSlideComponentName = this.getSlideComponentName(slide);
    let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
    this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
    this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);

    let previousSlide = slide - 1;
    let hasPreviousSlide = hasComponent(owner, this.getSlideComponentName(previousSlide));
    this.set('previousSlide', hasPreviousSlide ? previousSlide : null);

    let nextSlide = slide + 1;
    let hasNextSlide = hasComponent(owner, this.getSlideComponentName(nextSlide));
    this.set('nextSlide', hasNextSlide ? nextSlide : null);
  }),

  getSlideComponentName(slide) {
    return `slide-${slide}`;
  }
});
