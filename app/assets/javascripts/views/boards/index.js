Tack.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  className: 'panel-box col-xs-12',

  render: function () {
    Tack.resetActives();
    $('#boards-link').addClass("active");

    var that = this;
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});