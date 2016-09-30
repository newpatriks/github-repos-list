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
        this.initView(new HomeView());
    },
    details : function(id) {
        this.initView(new DetailsView({id : id}));
    },
    initView  : function(view) {
        this.currentView && this.currentView.remove();
        this.currentView = view;
        this.currentView.render();
    }
});

var rout = new AppRouter();
Backbone.history.start();
