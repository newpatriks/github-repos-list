var AppRouter = Backbone.Router.extend({
  routes	: {
    "":"home",
    "repo/:id":"details"
  },
  initialize  : function() {
    this.currentView = null;
    var header = new HeaderView({el : "header"});
    header.render();
  },
  home  : function () {
    var collection = new c_User();
    this.initView(new ListView({ collection : collection, el : "#main_content"}));
    collection.fetch();
  },
  details : function(id) {
    this.initView(new DetailsView({id : id, el : "#main_content"}));
  },
  initView  : function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.currentView.render();
  }
});

var rout = new AppRouter();
Backbone.history.start();