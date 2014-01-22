var AppRouter = Backbone.Router.extend({
    routes	: {
    	""				: 	"home",
        "repo/:id"		:	"details"
    },
	initialize 	: 	function() {
		// Loading Header View
		this.currentView = null;
		var header = new viewHeader({el : "header"});
		header.render();
	},
	
	home		:	function () {
		console.log("home");
		this.initView(new viewHome());
  },
  details		: 	function(id) {
	  console.log("details");
		this.initView(new viewDetails({id : id}));
  },
	initView 	:	function(view) {
		console.log("initView");
		this.currentView && this.currentView.remove();
		this.currentView = view;
    this.currentView.render();
	},
});

var rout = new AppRouter();
Backbone.history.start();
