import Ember from 'ember';
import hasComponent from '../utils/has-component';

const { Component, getOwner } = Ember;

export default Component.extend({
  startSlide: 1,

  init() {
    this._super(...arguments);
    let owner = getOwner(this);
    let currentSlideComponentName = this.getSlideComponentName('start');
    let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
    this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
    this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);
  },

  didReceiveAttrs() {
    this.setupSlides();
  },

  didRender() {
    this.$().attr({ tabindex: 1 });
  },

  setupSlides() {
    if(this.get('slide')) {
      let slide = parseInt(this.get('slide'));
      let owner = getOwner(this);

      let currentSlideComponentName = this.getSlideComponentName(slide);
      let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
      this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
      this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);

      let previousSlide = slide - 1;
      let hasPreviousSlide = hasComponent(owner, this.getSlideComponentName(previousSlide));
      this.set('previousSlide', hasPreviousSlide ? previousSlide :  hasComponent(owner, this.getSlideComponentName('start')) ? 'start' : null);

      let nextSlide = slide + 1;
      let hasNextSlide = hasComponent(owner, this.getSlideComponentName(nextSlide));
      this.set('nextSlide', hasNextSlide ? nextSlide : hasComponent(owner, this.getSlideComponentName('end')) ? 'end' : null);
    }
  },

  startPresentation() {
    this.set('slide', this.get('startSlide'));
    this.setupSlides();
  },

  setStartSlide() {
    let owner = getOwner(this);
    let currentSlideComponentName = this.getSlideComponentName('start');
    let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
    this.set('slide', null);
    this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
    this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);
  },

  endPresentation(){
    this.setStartSlide();
    this.set('nextSlide', null);
    this.set('previousSlide', null);
  },

  gotoPreviousSlide() {
    let nextSlide = this.get('slide');
    let slide = this.get('previousSlide');
    if(slide === 'start') {
      this.setStartSlide();
      this.set('previousSlide', null);
      this.set('nextSlide', nextSlide);
    } else if(slide) { // There is a previousSlide so set as current slide
      this.set('slide', slide);
      this.setupSlides();
    } else if(nextSlide) {
      this.set('slide', null);
      this.set('hasCurrentSlideComponent', false);
      this.set('currentSlideComponent', null);

      this.set('previousSlide', null);
      this.set('nextSlide', nextSlide);
    } else { // slide = null & previousSlide = null
      return;
    }
  },

  gotoNextSlide() {
    let previousSlide = this.get('slide');
    let slide = this.get('nextSlide');
    let endSlideComponentName = this.getSlideComponentName('end');

    if(slide === 'end') { // If goto slide end
      this.set('slide', null);
      let owner = getOwner(this);

      let hasCurrentSlideComponent = hasComponent(owner, endSlideComponentName);
      this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
      this.set('currentSlideComponent', hasCurrentSlideComponent ? endSlideComponentName : null);

      this.set('previousSlide', previousSlide);
      this.set('nextSlide', null);

    } else if(slide) {
      this.set('slide', slide);
      this.setupSlides();
    } else {
      return;
    }
  },

  getSlideComponentName(slide) {
    return `slide-${slide}`;
  },

  keyDown(event) {
    if(event.keyCode === 37) { // Left arrow
      this.gotoPreviousSlide();
    } else if(event.keyCode === 39) { // Right arrow
      this.gotoNextSlide();
    } else if(event.keyCode === 32) { // Space bar
      // TODO: start automatic slideshow?
      // this.startPresentation();
    } else if(event.keyCode === 27) { // ESC
      this.endPresentation();
    }
  },

  actions: {
    startPresentation() {
      this.startPresentation();
    },
    endPresentation() {
      this.endPresentation();
    },
    previousSlide() {
      this.gotoPreviousSlide();
    },
    nextSlide() {
      this.gotoNextSlide();
    }
  }
});
