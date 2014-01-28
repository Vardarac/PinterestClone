Tack.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  render: function () {
    Tack.resetActives();
    $('#users-link').addClass("active");
    var renderedContent = this.template({
      users: this.collection
    });
    
    this.$el.html(renderedContent);

    return this;
  }
});