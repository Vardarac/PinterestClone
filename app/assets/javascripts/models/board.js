PinterestClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards/",

  initialize: function (id) {
    this.id = id;
  },

  parse: function (data) {
    data.user = new PinterestClone.Models.User(data.user);
    data.pins = new PinterestClone.Collections.Pins(data.pins);
    return data;
  }
});
