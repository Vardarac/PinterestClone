PinterestClone.Views.PinsIndex = Backbone.View.extend({
  template: JST['pins/index'],
  className: 'panel-box col-xs-12',

  render: function () {
    console.log(this.collection.get("board"))
    PinterestClone.resetActives();
    $('#pins-link').addClass("active");

    var that = this;
    var renderedContent = this.template({
      pins: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});