PinterestClone.Views.LoggedInGreetingModalView = Backbone.View.extend({
  events: {
    "click .greet-modal-okay": "dismissGreeting"
  },

  template: JST["modals/auth/greeting_modal"],

  className: "modal-dialog",

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  dismissGreeting: function () {
    $('#main-modal-content').modal('hide')
  }
});