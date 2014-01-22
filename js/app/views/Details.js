var viewDetails = Backbone.View.extend({
	el 				: 	$("#main_content"),
	initialization	:	function(id) {
		this.id = id;
	},
	render			: 	function () {
		var that = this;

	    var repo = new m_Repo(this.id);
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
	    	
	    	var lang = new c_Lang(that.id);
	    	lang.fetch({
	        	add : false,
				success: function(collection, response) {
					var sum 		= 0;
					var names 		= new Array();
					var nums 		= new Array();
					var nums_perc 	= new Array();
					
					
					_.each(response, function(value,index) {
					    names.push(index);
					    nums.push(value);
					    sum +=value;						    
					});
					
					_.each(nums, function(v, i) {						
					    nums_perc[i] = (nums[i]*100/sum).toFixed(1);
					});
					
					collection.reset();
					_.each(nums, function(v, i) {
				    	collection.add(new m_Lang(names[i], (nums[i]*100/sum).toFixed(1)));
				  	});
											
					
				}	
	    	}).complete(function(resp_lang) {
	        	var template = _.template( $("#tpl_details").html(), {repo : repo, lang : lang} );
				that.$el.html(template);
	        	
	        	var elem = "skills_wrapper";
	        	$('#'+elem).append('<div class="few_stats"><ul></ul></div>');	
	        	
	        	
				_.each(lang['models'], function(value,item){
		        	createAverage(elem, 0, 100, value.num, 'path', item);
	        	});
	        	
	    	});
	    	
	    });
	    
	    return this;
	}
});