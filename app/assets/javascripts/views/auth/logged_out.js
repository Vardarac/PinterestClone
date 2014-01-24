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
    this.sendCreds.call(that, "Guest@PinterestClo.ne", "guestpassword");
  },

  sendCreds: function () {
    if (arguments.length > 1) {
      var email = Array.prototype.slice.call(arguments, 0, 1)[0];
      var password = Array.prototype.slice.call(arguments, 1, 2)[0];
    } else {
      var email = $("#main-sign-in-text").val();
      var password = $("#main-sign-in-password").val();
    }

    if(this.validCreds(email, password)) {

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
          PinterestClone.router.authModal(email, errorHash);
        }
      });

    }
  },

  validCreds: function (email, password) {
    var pass = true;
    if (email === undefined || email.length < 1) {
      pass = false;
      $("#main-sign-in-text").val("");
      $(".main-email-group").addClass("has-error");
      $("#main-sign-in-text").attr("placeholder", "Please enter an e-mail!");
    }
    // } else if (email.match(PinterestClone.mailValidator) === null) {
    //   pass = false;
    //   $("#main-sign-in-text").val("");
    //   $(".main-email-group").addClass("has-error");
    //   $("#main-sign-in-text").attr("placeholder", "Invalid e-mail!");
    // }

    if (password === undefined || password.length < 1) {
      pass = false;
      $("#main-sign-in-password").val("");
      $(".main-password-group").addClass("has-error");
      $("#main-sign-in-password").attr("placeholder", "Please enter a password!");
    } else if (password.length < 6) {
      pass = false;
      $("#main-sign-in-password").val("");
      $(".main-password-group").addClass("has-error");
      $("#main-sign-in-password").attr("placeholder", "Password must be 6+ chars");
    }
    return pass;
  },

  clearError: function (event) {
    if($(event.target).parent().hasClass("has-error")){
      PinterestClone.clearError($(event.target).parent());
    }
  }
});