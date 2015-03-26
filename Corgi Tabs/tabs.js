$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $($.find(this.$el.data("content-tabs")));
  this.$activeTab = $(this.$contentTabs.find('.active'));
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype = {
  clickTab: function() {
    event.preventDefault();
    var $currentTab = $($(event.target).attr('href'));
    this.$activeTab
      .removeClass('active')
      .addClass('transitioning')
      .one('transitionend', function (event) {
        $(event.currentTarget).removeClass('transitioning');
        this.$activeTab = $currentTab;
        this.$activeTab.addClass('active');
      });
    $(event.currentTarget).find('a').removeClass('active');
    $(event.target).addClass('active');
  }
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
