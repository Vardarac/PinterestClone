Tack.Models.Pin = Backbone.Model.extend({
  urlRoot: "/pins/",

  initialize: function (id) {
    this.id = id;
  },

  parse: function (data) {
    data.user = new Tack.Models.User(data.user);
    data.board = new Tack.Models.Board(data.board);
    return data;
  }
});