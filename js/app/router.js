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
	
	initView 	:	function(view) {
		console.log("initView");
		if (this.currentView) {
			
		}
		this.currentView = view;
		this.currentView.render();
	},
	
	home		:	function () {
		console.log("home");
		this.home = new viewHome({el : "#main_content"});
		this.home.render();
    },
    details		: 	function(id) {
	    console.log("details");
		this.details = new viewDetails({el : "#main_content", id : id});
		this.details.render();
    }
});

var rout = new AppRouter();
Backbone.history.start();