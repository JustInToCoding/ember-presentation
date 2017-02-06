import Ember from 'ember';
import hasComponent from '../utils/has-component';

const { Component, getOwner } = Ember;

export default Component.extend({
  startSlide: 1,

  didReceiveAttrs() {
    this.setupSlides();
  },

  didRender() {
    this.$().attr({ tabindex: 1 });
    this.$().focus();
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
      this.set('previousSlide', hasPreviousSlide ? previousSlide : null);

      let nextSlide = slide + 1;
      let hasNextSlide = hasComponent(owner, this.getSlideComponentName(nextSlide));
      this.set('nextSlide', hasNextSlide ? nextSlide : 'slide-end');
    }
  },

  startPresentation() {
    this.set('slide', this.get('startSlide'));
    this.setupSlides();
  },

  endPresentation(){
    this.set('slide', null);
    this.set('hasCurrentSlideComponent', false);
    this.set('currentSlideComponent', null);
    this.set('nextSlide', null);
    this.set('previousSlide', null);
  },

  gotoPreviousSlide() {
    let nextSlide = this.get('slide');
    let slide = this.get('previousSlide');
    if(slide) {
      this.set('slide', slide);
      this.setupSlides();
    } else if(nextSlide) {
      // todo if next slide === 'slide-end'
      this.set('slide', null);
      let owner = getOwner(this);
      let currentSlideComponentName = null;
      let hasCurrentSlideComponent = false;
      this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
      this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);

      let hasNextSlide = hasComponent(owner, this.getSlideComponentName(nextSlide));
      this.set('nextSlide', hasNextSlide ? nextSlide : null);
    } else {
      this.set('slide', null);
    }
  },

  gotoNextSlide() {
    let previousSlide = this.get('slide');
    let slide = this.get('nextSlide');

    if(slide) {
      this.set('slide', slide);
      this.setupSlides();
    } else if(previousSlide) {
      this.set('slide', null);
      let owner = getOwner(this);
      let currentSlideComponentName = 'slide-end';
      let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
      this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
      this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);

      let hasPreviousSlide = hasComponent(owner, this.getSlideComponentName(previousSlide));
      this.set('previousSlide', hasPreviousSlide ? previousSlide : null);
    } else {
      this.set('slide', null);
    }
  },

  getSlideComponentName(slide) {
    return `slide-${slide}`;
  },

  keyDown(event) {
    console.log(event.keyCode);
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
    previousSlide() {
      this.gotoPreviousSlide();
    },
    nextSlide() {
      this.gotoNextSlide();
    }
  }
});
