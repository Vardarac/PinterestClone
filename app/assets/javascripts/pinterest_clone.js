window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.mailValidator = new RegExp("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$");
    var $content = $("#content")
    var $modalContent = $("#main-modal-content")
    this.router = new PinterestClone.Routers.Router($content, $modalContent);
		var that = this;
    this.handleAuth();
    Backbone.history.start();
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

  clearError: function($target) {
    console.log("I'm")
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