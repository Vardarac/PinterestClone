Tack.Views.ErrorModalView = Backbone.View.extend({
  template: JST["modals/error"],

  initialize: function (messages) {
    this.messages = messages;
  },

  render: function () {
    return this.template({
      messages: messages
    });
  }
});