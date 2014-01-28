Tack.Views.LoggedInButtonsView = Backbone.View.extend ({
  tagName: "ul",
  className: "nav navbar-nav",
  template: JST["auth/logged_in_buttons"],
  render: function () {
    return this.$el.append(this.template);
  }
});