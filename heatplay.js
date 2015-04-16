var Heatplay = function(options){
  var options = options || {},
      canvasName = options.canvas || '',
      canvas,
      context,
      self = this;
  if(canvasName !== '') {
    canvas = document.getElementById(canvasName);
  } else {
    canvas = document.getElementsByTagName('canvas')[0];
  }
  context = canvas.getContext("2d");
  this.playback = function (eventStack) {
    console.log(eventStack.length);
  }
  return this;
};
