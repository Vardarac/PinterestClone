PinterestClone.Views.AuthModal = Backbone.View.extend({
  template: JST["modals/auth/auth_modal"],

  className: "modal-dialog",

  render: function () {
    renderedContent = this.template({
      message: this.message,
      attemptedEmail: this.attemptedEmail
    });

    this.$el.html(renderedContent);

    return this;
  }
});