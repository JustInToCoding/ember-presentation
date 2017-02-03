export default function(){
  this.transition(
    this.hasClass('slide-wrapper'),
    this.use('slideTransition')
  );
}
