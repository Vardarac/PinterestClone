Tack.Views.LoggedInDashboardView = Backbone.View.extend ({
  tagName: "li",
  template: JST["auth/logged_in_dashboard"],
  events: {
    "click .sign-out-link": "logOut"
  },
  
  render: function () {
    this.$el.addClass("dropdown");
    return this.$el.append(this.template);
  },

  logOut: function(event) {
    event.preventDefault();
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        Tack.handleAuth();
      },
      error: function (error) {
      }
    })
  }
});