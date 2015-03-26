$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = $(this.$contentTabs.find('.active'));
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype = {
  clickTab: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var $currentTab = $($target.attr('href'));

    this.$activeTab
      .removeClass('active')
      .addClass('transitioning')
      .one('transitionend', function (transitionEvent) {
        var $transitionTarget = $(transitionEvent.currentTarget);
        $transitionTarget.removeClass('transitioning');
        this.$activeTab = $currentTab;
        this.$activeTab.addClass('active transitioning');
        setTimeout(function() {
          // console.log(transitionEvent);
          this.$activeTab.removeClass('transitioning');
        }.bind(this), 0);
      }.bind(this));

    this.$el.find('a').removeClass('active');
    $target.addClass('active');
  }
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
