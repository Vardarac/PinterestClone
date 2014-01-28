Tack.Views.AuthModal = Backbone.View.extend({
  events: {
    "click .modal-submit-credentials": "sendCreds"
  },

  template: JST["modals/auth/auth_modal"],

  className: "modal-dialog",

  render: function () {
    renderedContent = this.template({
      message: this.message,
      attemptedEmail: this.attemptedEmail,
      attemptedPassword: this.attemptedPassword
    });

    this.$el.html(renderedContent);

    return this;
  },

  sendCreds: function (event) {
    event.preventDefault();
    Tack.sendCreds();
  }
});