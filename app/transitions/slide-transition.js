import moveOver from "./move-over";
export default function(opts) {
  let oldSlide = this.oldValue.substring(6);
  let newSlide = this.newValue.substring(6);
  if(parseInt(oldSlide) > parseInt(newSlide)) {
    return moveOver.call(this, 'x', 1, opts);
  } else {
    return moveOver.call(this, 'x', -1, opts);
  }
}
