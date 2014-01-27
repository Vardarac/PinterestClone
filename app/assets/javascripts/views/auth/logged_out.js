PinterestClone.Views.LoggedOutView = Backbone.View.extend ({
  tagName: "form",
  events: {
    "click .submit-credentials": "sendCreds",
    "click .guest-login": "guestLogin",
    "keyup #main-sign-in-text": "enterPressed",
    "keyup #main-sign-in-password": "enterPressed",
    "focus #main-sign-in-text": "clearError",
    "focus #main-sign-in-password": "clearError"
  },

  template: JST["auth/logged_out"],

  enterPressed: function (event) {
    if (event.which == 13) {
      this.sendCreds();
    }
  },

  render: function () {
    this.$el.addClass("navbar-form");
    this.$el.attr('role', 'form');
    this.$el.html(this.template());
    return this;
  },

  guestLogin: function (event) {
    event.preventDefault();
    var that = this;
    this.sendCreds("called", "Guest@PinterestClo.ne", "guestpassword");
  },

  clearError: function (event) {
    if($(event.target).parent().hasClass("has-error")){
      PinterestClone.clearError($(event.target).parent());
    }
  },

  sendCreds: function () {
    PinterestClone.sendCreds(arguments);
  }
});