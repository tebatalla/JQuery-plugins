$.Zoomable = function(el) {
  this.$el = $(el);
  this.focusBoxSize = 100;
  this.$el.mouseenter(this.createFocusBox.bind(this));
  this.$el.mousemove(this.renderFocusBox.bind(this));
  this.$el.mouseleave(this.removeFocusBox.bind(this));
};

$.Zoomable.prototype = {
  calcFocusBox: function(event) {
    var $target = $(event.currentTarget);
    var offset = $target.offset();
    var relX = event.pageX - offset.left;
    var relY = event.pageY - offset.top;
    var half = this.focusBoxSize / 2;
    var X = Math.min(Math.max(relX - half, 0), $target.width() - this.focusBoxSize);
    var Y = Math.min(Math.max(relY - half, 0), $target.height() - this.focusBoxSize);
    return [X, Y];
  },

  createFocusBox: function (event) {
    this.$focusBox = $('<div class="focus-box"></div>');
    this.$focusBox
      .css('height', '' + this.focusBoxSize + "px")
      .css('width', '' + this.focusBoxSize + "px");
    this.$el.append(this.$focusBox);
    this.renderFocusBox(event);
  },

  renderFocusBox: function (event) {
    var pos = this.calcFocusBox(event);
    this.$focusBox
      .css('top', '' + pos[1] + "px")
      .css('left', '' + pos[0] + "px");
  },

  removeFocusBox: function (event) {
    console.log('removed');
    this.$focusBox.remove();
  }
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
