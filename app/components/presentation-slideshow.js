import Ember from 'ember';
import hasComponent from '../utils/has-component';

const { Component, getOwner } = Ember;

export default Component.extend({
  startSlide: 1,

  didReceiveAttrs() {
    this.setupSlides();
  },

  didRender() {
    this.$().attr({ tabindex: 1 }), this.$().focus();
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
      this.set('nextSlide', hasNextSlide ? nextSlide : null);
    }
  },

  startPresentation() {
    this.set('slide', this.get('startSlide'));
    this.setupSlides();
  },

  gotoPreviousSlide() {
    this.set('slide', this.get('previousSlide'));
    this.setupSlides();
  },

  gotoNextSlide() {
    let previousSlide = this.get('slide');
    let slide = this.get('nextSlide');
    this.set('slide', slide);
    if(slide) {
      this.setupSlides();
    } else if(previousSlide) {
      let owner = getOwner(this);
      let currentSlideComponentName = 'slide-end';
      let hasCurrentSlideComponent = hasComponent(owner, currentSlideComponentName);
      this.set('hasCurrentSlideComponent', hasCurrentSlideComponent);
      this.set('currentSlideComponent', hasCurrentSlideComponent ? currentSlideComponentName : null);

      let hasPreviousSlide = hasComponent(owner, this.getSlideComponentName(previousSlide));
      this.set('previousSlide', hasPreviousSlide ? previousSlide : null);
    }
  },

  getSlideComponentName(slide) {
    return `slide-${slide}`;
  },

  keyDown(event) {
    if(event.keyCode == 37) {
      this.gotoPreviousSlide();
    } else if(event.keyCode == 39) {
      this.gotoNextSlide();
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
