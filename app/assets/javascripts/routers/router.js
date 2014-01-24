PinterestClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "users/index": "usersIndex",
    "boards/index": "boardsIndex",
    "pins/index": "pinsIndex"
  },

  initialize: function ($rootEl, $rootModalEl) {
    this.$root = $rootEl;
    this.$rootModal = $rootModalEl;
  },

  loggedIn: function () {
  // Populates logged-in-only buttons and removes login bar
      this.clearLogViews();
      this.loggedInButtonsView = new PinterestClone.Views.LoggedInButtonsView();
      this.loggedInDashboardView = new PinterestClone.Views.LoggedInDashboardView();
      $("#auth-only-link-list").append(this.loggedInButtonsView.render());
      $("#backbone-auth").append(this.loggedInDashboardView.render());
  },

  loggedOut: function () {
  // Depopulates logged-in-only buttons and restores login bar
      PinterestClone.currentUser = undefined;
      this.clearLogViews();
      this.loggedOutView = new PinterestClone.Views.LoggedOutView();
      $("#backbone-auth").html(this.loggedOutView.render().$el);
  },

  clearLogViews: function () {
      this.loggedOutView && this.loggedOutView.remove();
      this.loggedInButtonsView && this.loggedInButtonsView.remove();
      this.loggedInDashboardView && this.loggedInDashboardView.remove();
  },

  home: function () {
    var that = this;
    var homeView = new PinterestClone.Views.HomeView();
    this._swapView(homeView, this.$root);
  },

  authModal: function (email, errorHash) {
    console.log(errorHash.responseJSON["errors"])
    var that = this;
    var authModalView = new PinterestClone.Views.AuthModal();
    authModalView.message = errorHash.responseJSON["errors"];
    authModalView.attemptedEmail = email;

    this._swapModalView(authModalView, this.$rootModal);
    this.$rootModal.modal('show');
  },

  usersIndex: function () {
    var that = this;
    var users = new PinterestClone.Collections.Users();

    users.fetch({
      success: function () {
        var usersIndexView = new PinterestClone.Views.UsersIndex({
          collection: users
        });

        that._swapView(usersIndexView, that.$root);
      },

      error: function (data) {
        console.log("Hi");
        console.log(data);
        that.previous();
      }
    });
  },

  boardsIndex: function () {
    var that = this;
    var boards = new PinterestClone.Collections.Boards();
    boards.fetch({
      success: function () {
        var boardsIndexView = new PinterestClone.Views.BoardsIndex({
          collection: boards
        });

        that._swapView(boardsIndexView, that.$root);
      }, 
      error: function () {
        that.previous();
      }
    })
  },
  
  pinsIndex: function () {
    var that = this;
    var pins = new PinterestClone.Collections.Pins();
    pins.fetch({
      success: function () {
        var pinsIndexView = new PinterestClone.Views.PinsIndex({
          collection: pins
        });

        that._swapView(pinsIndexView, that.$root);
      }, 
      error: function () {
        that.previous();
      }
    })
  },

  _swapView: function (view, $selectedElement) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $selectedElement.html(view.render().$el);
  },

  _swapModalView: function (view, $selectedElement) {
    this._currentModalView && this._currentModalView.remove();
    this._currentModalView = view;
    $selectedElement.html(view.render().$el);
  }
});