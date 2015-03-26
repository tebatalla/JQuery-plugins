$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find('.gutter-images');
  this.$images = this.$gutterImages.children();
  this.$activeImg = this.$images.first();
  this.activate(this.$activeImg);
  this.$gutterImages.on("click", "img", this.activateNewImage.bind(this));
  this.$el.find('.gutter').on("click", "a.nav", this.shiftGutterImages.bind(this));
  this.$gutterImages.on("mouseenter", "img", this.tempActivateNewImage.bind(this));
  this.$gutterImages.on("mouseleave", "img", this.activateActiveImage.bind(this));

  this.gutterIdx = 0;
  this.fillGutterImages();
};

$.Thumbnails.prototype = {
  activate: function ($img) {
    this.$el.find('.active').html($img.clone());
  },

  activateNewImage: function(event) {
    this.$activeImg = $(event.currentTarget);
    this.activate(this.$activeImg);
  },

  tempActivateNewImage: function(event) {
    var $currentTarget = $(event.currentTarget);
    this.activate($currentTarget);
  },

  activateActiveImage: function(event) {
    this.activate(this.$activeImg);
  },

  fillGutterImages: function() {
    this.$images.remove();
    var counter = this.gutterIdx;
    while(counter < this.gutterIdx + 5) {
      this.$gutterImages.append(this.$images.eq(counter % this.$images.length));
      counter++;
    }
  },

  shiftGutterImages: function(event) {
    if($(event.currentTarget).hasClass('left')) {
      this.gutterIdx = (this.gutterIdx - 1 + this.$images.length) % this.$images.length;
    } else {
      this.gutterIdx = (this.gutterIdx + 1) % this.$images.length;
    }
    this.fillGutterImages();
  }
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
