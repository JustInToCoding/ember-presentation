import moveOver from "./move-over";
export default function(opts) {
  let oldSlide = parseInt(this.oldValue.substring(6));
  let newSlide = parseInt(this.newValue.substring(6));
  if(oldSlide > newSlide) {
    return moveOver.call(this, 'x', 1, opts);
  } else {
    return moveOver.call(this, 'x', -1, opts);
  }
}
