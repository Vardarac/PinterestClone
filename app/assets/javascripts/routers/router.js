Tack.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "users/index": "usersIndex",
    "boards/index": "boardsIndex",
    "pins/index": "pinsIndex",
    "pins/new": "createPinModal",
    "boards/new": "createBoardModal"
  },

  initialize: function ($rootEl, $rootModalEl) {
    this.$root = $rootEl;
    this.$rootModal = $rootModalEl;
  },

  loggedIn: function () {
  // Populates logged-in-only buttons and removes login bar
    this.clearLogViews();
    this.loggedInButtonsView = new Tack.Views.LoggedInButtonsView();
    this.loggedInDashboardView = new Tack.Views.LoggedInDashboardView();

    $("#auth-only-link-list").append(this.loggedInButtonsView.render());
    $("#backbone-auth").append(this.loggedInDashboardView.render());

    if(Tack.freshLogin) {
      var loggedInGreetingModalView = new Tack.Views.LoggedInGreetingModalView();
      this._swapModalView(loggedInGreetingModalView, this.$rootModal);
      this.$rootModal.modal('show');
      Tack.freshLogin = false;
      Tack.freshUser = false;
    }
  },

  loggedOut: function () {
  // Depopulates logged-in-only buttons and restores login bar
      Tack.currentUser = undefined;
      this.clearLogViews();
      this.loggedOutView = new Tack.Views.LoggedOutView();
      $("#backbone-auth").html(this.loggedOutView.render().$el);
  },

  clearLogViews: function () {
      this.loggedOutView && this.loggedOutView.remove();
      this.loggedInButtonsView && this.loggedInButtonsView.remove();
      this.loggedInDashboardView && this.loggedInDashboardView.remove();
  },

  home: function () {
    var homeView = new Tack.Views.HomeView();
    this._swapView(homeView, this.$root);
  },

  authModal: function (email, password, errorHash) {
    var authModalView = new Tack.Views.AuthModal();
    authModalView.message = errorHash.responseJSON["errors"];
    authModalView.attemptedEmail = email;
    authModalView.attemptedPassword = password;

    this._swapModalView(authModalView, this.$rootModal);
    this.$rootModal.modal('show');
  },

  createPinModal: function () {
    var newPinModal = new Tack.Views.NewPinModal();
    this._swapModalView(newPinModal, this.$rootModal);
    this.$rootModal.modal('show');
  },

  createBoardModal: function () {
    var newBoardModal = new Tack.Views.NewBoardModal();
    this._swapModalView(newBoardModal, this.$rootModal);
    this.$rootModal.modal('show');
  },

  usersIndex: function () {
    var that = this;
    var users = new Tack.Collections.Users();

    users.fetch({
      success: function () {
        var usersIndexView = new Tack.Views.UsersIndex({
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
    var boards = new Tack.Collections.Boards();
    boards.fetch({
      success: function () {
        var boardsIndexView = new Tack.Views.BoardsIndex({
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
    var pins = new Tack.Collections.Pins();
    pins.fetch({
      success: function () {
        var pinsIndexView = new Tack.Views.PinsIndex({
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