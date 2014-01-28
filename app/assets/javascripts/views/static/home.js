Tack.Views.HomeView = Backbone.View.extend({
  template: JST['static/home'],

  render: function () {
    Tack.resetActives();
    this.$el.html(this.template());
    return this;
  }
});