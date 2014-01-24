PinterestClone.Views.LoggedOutView = Backbone.View.extend ({
  tagName: "form",
  events: {
    "click .submit-credentials": "sendCreds",
    "keyup #sign-in-text": "checkSubmit",
    "keyup #sign-in-password": "checkSubmit"
  },

  template: JST["auth/logged_out"],

  checkSubmit: function (event) {
    console.log("hi mom!")
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

  sendCreds: function () {
		var email = this.$('input.email-input').val();
		var password = this.$('input.password-input').val();
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
      error: function (err) {
        PinterestClone.offerSignUp();
      }
    });
  }
});