Tack.Views.NewBoardModal = Backbone.View.extend({
  events: {
    "submit-new-board": "createBoard"
  },

  template: JST["auth/boards/new"],

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createBoard: function () {
    $.ajax({
      url: "/boards",
      type: "POST",
      data: {
        "description": description,
        "name": name,
        "image_url": image_url,
        "user_id": Tack.currentUser.id // Create moar! | Add some pins | Close 
      }
    })
  }
});