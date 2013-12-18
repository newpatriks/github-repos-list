define(function (require) {

    "use strict";

    var $			= require('jquery'),
        _           = require('underscore.min'),
        Backbone    = require('backbone.min'),
        tpl         = require('text!tpl/Home.html'),
        model		= require('app/models/model'),
        template 	= _.template(tpl);    

    return Backbone.View.extend({
    	el 				: 	$("#main_content"),
		initialization	:	function() {
			console.log("[Home]");
	    },
        render			: 	function () {
			var that = this;
            console.log("[Home Render]");
            var user = new model.c_User();
			user.fetch({
				add : true,
				success: function(collection, response) {
					// Ordering the collection
					collection.comparator = function(model) {
						return -model.get('watchers');
					}
					collection.sort();
					collection.reset(collection.first(20));
				}
            }).complete(function(resp) {
	        	that.$el.html(template({repos : user}));	
            });
            return this;
        }
	});
});