PinterestClone.Models.Pin = Backbone.Model.extend({
  urlRoot: "/pins/",

  initialize: function (id) {
    this.id = id;
  }
});