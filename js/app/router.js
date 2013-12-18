define(function (require) {
    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone.min'),
        Modernizr 	= require('modernizr.min');
        
        
        
    var AppRouter = Backbone.Router.extend({
        routes	: {
        	""				: 	"home",
        	"/"				: 	"home",
            "/repos"		:	"home",
            "/repo/:id"		:	"details"
        },
                
		initialize 	: 	function() {
			// Loading Header View			
		},
		
		initView 	:	function(view) {
			if (this.currentView) {
				//this.currentView.remove();
			}
			this.currentView = view;
		},
		
		home		:	function () {
			var that = this;
    		require(["app/views/Header"], function(Header) {
				var header = new Header({el : "header"});
				header.render();
			});
			
    		require(["app/views/Home"], function(Home) {
				var home = new Home({el : "#main_content"});
				home.render();
				that.initView(home);
			});
        },
        
        details		: 	function(id) {
	        var that = this;
    		require(["app/views/Header"], function(Header) {
				var header = new Header({el : "header"});
				header.render();
			});
			
    		require(["app/views/Details"], function(Details) {
				var details = new Details({el : "#main_content"});
				details.render(id);
				that.initView(details);
			});
        }
    });
    
    return {
	    AppRouter : AppRouter
    };
    
});