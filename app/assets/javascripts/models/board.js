Tack.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards/",

  initialize: function (id) {
    this.id = id;
  },

  parse: function (data) {
    data.user = new Tack.Models.User(data.user);
    data.pins = new Tack.Collections.Pins(data.pins);
    return data;
  }
});
