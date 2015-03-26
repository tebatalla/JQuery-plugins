$.Carousel = function(el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.transitioning = false;
  this.$images = this.$el.find('.items').children();
  this.$images.first().addClass('active');
  this.$el.on("click", '.slide-right', this.slideRight.bind(this));
  this.$el.on("click", '.slide-left', this.slideLeft.bind(this));
};

$.Carousel.prototype = {
  slide: function (dir) {
    if(this.transitioning) {return;}
    this.transitioning = true;
    var $active = this.$images.eq(this.activeIdx);
    var nextIdx = (this.activeIdx + dir + this.$images.length) % this.$images.length;
    var $next = this.$images.eq(nextIdx);
    this.activeIdx = nextIdx;
    if(dir === 1) {
      $next.addClass('left');
      $active.addClass('right');
    } else if(dir === -1) {
      $next.addClass('right');
      $active.addClass('left');
    }

      console.log($active);
    $active.one('transitionend', function(transitionEvent) {
      $active.removeClass('left right active');
      this.transitioning = false;
    }.bind(this));

    setTimeout(function () {
      $next.removeClass('left right').addClass('active');
    }, 0);
  },

  slideLeft: function (event) {
    this.slide(1);
  },

  slideRight: function (event) {
    this.slide(-1);
  }
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
