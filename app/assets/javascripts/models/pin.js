PinterestClone.Models.Pin = Backbone.Model.extend({
  urlRoot: "/pins/",

  initialize: function (id) {
    this.id = id;
  },

  parse: function (data) {
    data.user = new PinterestClone.Models.User(data.user);
    data.board = new PinterestClone.Collections.Pins(data.board);
    return data;
  }
});