window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.mailValidator = new RegExp("\/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b\/");
    var $content = $("#content")
    var $modalContent = $("#main-modal-content")
    this.router = new PinterestClone.Routers.Router($content, $modalContent);
		var that = this;
    this.handleAuth();
    Backbone.history.start();
  },

  modalOpen: function () {
    return $("body").hasClass("modal-open");
  },

  resetActives: function() {
    $(".active").removeClass();
  },
  
  handleAuth: function() {
		var that = this;
    $.ajax({
      url:"/session/show",
      type:"GET",
      success: function (responseUser) {
        PinterestClone.currentUser = responseUser;
        that.router.loggedIn();
      },
      error: function (data) {
        that.router.loggedOut();
      }
    });
  },

  sendCreds: function () {
    if (arguments[0] !== undefined && arguments[0].length > 0 && arguments[0][0] === "called") {
      var email = arguments[0][1];
      var password = arguments[0][2];
    } else if (!this.modalOpen()) {
      var email = $("#main-sign-in-text").val();
      var password = $("#main-sign-in-password").val();
    } else if (this.modalOpen()) {
      var email = $(".modal-email-input").val() === "" ? $(".modal-email-input").attr("placeholder") : $(".modal-email-input").val();
      var password = $(".modal-password-input").val();
    }

    console.log(email + password)

    if(PinterestClone.validCreds(email, password)) {
      if (!this.modalOpen() || (this.modalOpen() && $(".modal-password-confirm").val().length < 1)) {
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
            PinterestClone.freshLogin = true;
            PinterestClone.handleAuth();
            // Spawn a modal view telling the user they've logged out.
            // Navigate them to the main pins feed.
          },
          error: function (errorHash) {
            PinterestClone.router.authModal(email, password, errorHash);
          }
        });
      } else if (this.modalOpen() && $(".modal-password-confirm").val().length > 1) {
        $.ajax({
          url: "/users",
          type: "POST",
          data: {
            "user":
              {
                email: email,
                password: password
              }
          },
          success: function (response) {
            PinterestClone.freshLogin = true;
            PinterestClone.freshUser = true;
            PinterestClone.handleAuth();
            // Spawn a modal view telling the user they've logged out.
            // Navigate them to the main pins feed.
          },
          error: function (errorHash) {
            PinterestClone.router.authModal(email, password, errorHash);
          }
        });
      }
    }
  },

  validCreds: function (email, password) {
    console.log("in here")
    var pass = true;
    if (email === undefined || email.length < 1) {
      pass = false;
      PinterestClone.setError(this.modalOpen() ? $(".modal-email-input") : $("#main-sign-in-text"), "Please enter an e-mail!");
    }

    if (password === undefined || password.length < 1) {
      pass = false;
      PinterestClone.setError(this.modalOpen() ? $(".modal-password-input") : $("#main-sign-in-password"), "Please enter a password!");
    } else if (password.length < 6) {
      pass = false;
      PinterestClone.setError(this.modalOpen() ? $(".modal-password-input") : $("#main-sign-in-password"), "Password must be 6+ chars");
    } else if (this.modalOpen() && $(".modal-password-confirm").val().length > 0 && $(".modal-password-confirm").val() !== password) {
      pass = false;
      PinterestClone.setError($(".modal-password-confirm"), "Password confirmation doesn't match password");
    }

    return pass;
  },

  setError: function($target, message) {
    $target.val("");
    $target.parent().addClass("has-error");
    $target.attr("placeholder", message);
  },

  clearError: function($target) {
    $target.removeClass("has-error");
  }
};

$(document).ready(function(){
  PinterestClone.initialize();
  $('#content').css({'margin-top': (($('.navbar-fixed-top').height()) + 1 )+'px'});
  $(window).resize(function(){
      $('#content').css({'margin-top': (($('.navbar-fixed-top').height()) + 1 )+'px'});
  });
});