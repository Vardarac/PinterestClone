Tack.Models.User = Backbone.Model.extend({
  urlRoot: "/users/",

  initialize: function (id) {
    this.id = id;
  }
});