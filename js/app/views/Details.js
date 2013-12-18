define(function (require) {

    "use strict";

    var $			= require('jquery'),
        _           = require('underscore.min'),
        Backbone    = require('backbone.min'),
        tpl         = require('text!tpl/Details.html'),
        model		= require('app/models/model'),
        template 	= _.template(tpl);    

    return Backbone.View.extend({
    	el 				: 	$("#main_content"),
		initialization	:	function() {
			console.log("[Details]");
	    },
        render			: 	function (id) {
			var that = this;
            console.log("[Details Render]");
            var repo = new model.m_Repo(id);
			repo.fetch({
				add : true,
				success: function(model, response) {
					var date 		= new Date((model.get('updated_at') || "").replace(/-/g,"/").replace(/[TZ]/g," "));
					var today 		= new Date();
					var millis_day 	= 86400000;
					var days = ((today.getTime() - date.getTime()) / millis_day).toFixed(0);
					// Settings the new attribute of the model, days_ago
					model.set('days_ago', days);					
				}
            }).complete(function(resp_repo) {
	        	
	        	var lang = new model.c_Lang(id);
	        	lang.fetch({
		        	add : false,
					success: function(collection, response) {
						var sum 		= 0;
						var names 		= new Array();
						var nums 		= new Array();
						var nums_perc 	= new Array();
						
						
						$.each(response, function(index, value) {
						    names.push(index);
						    nums.push(value);
						    sum +=value;						    
						});
						
						$.each(nums, function(i, v) {						
						    nums_perc[i] = (nums[i]*100/sum).toFixed(1);
						});
						
						collection.reset();
						$.each(nums, function(i, v) {
					    	collection.add(new model.m_Lang(names[i], (nums[i]*100/sum).toFixed(1)));
					  	});
												
						
					}	
	        	}).complete(function(resp_lang) {
		        	that.$el.html(template({repo : repo, lang : lang}));
	        	});
	        	
            });
            
            return this;
        }
	});
});