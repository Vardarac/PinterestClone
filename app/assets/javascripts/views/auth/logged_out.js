PinterestClone.Views.LoggedOutView = Backbone.View.extend ({
  tagName: "form",
  events: {
    "click .submit-credentials": "sendCreds",
    "click .guest-login": "guestLogin",
    "keyup #sign-in-text": "checkSubmit",
    "keyup #sign-in-password": "checkSubmit"
  },

  template: JST["auth/logged_out"],

  checkSubmit: function (event) {
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
    this.sendCreds.call(that, "Guest@PinterestClo.ne", "guestpassword");
  },

  sendCreds: function () {
    if (arguments.length > 1) {
  		var email = Array.prototype.slice.call(arguments, 0, 1)[0];
      var password = Array.prototype.slice.call(arguments, 1, 2)[0];

    } else {
      var email = this.$('input.email-input').val();
      var password = this.$('input.password-input').val();
    }
    $.ajax({
      url: "/session",
      type: "POST",
      data: {
        "user":
          {
            email: email,
						password: password
          }
      },
      success: function (response) {
        PinterestClone.handleAuth();
        // Spawn a modal view telling the user they've logged out.
        // Navigate them to the main pins feed.
      },
      error: function (errorHash) {
        PinterestClone.router.authModal(errorHash);
      }
    });
  }
});