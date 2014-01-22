var viewDetails = Backbone.View.extend({
	tagName         : "div",
  id              : "details-view",
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
				    	collection.add(new m_Lang(names[i], (nums[i]*100/sum).toFixed(1)));
				  	});
											
					
				}	
	    	}).complete(function(resp_lang) {
	        	var template = _.template( $("#tpl_details").html(), {repo : repo, lang : lang} );
				    $("#main_content").html(template);
	        	
	        	var elem = "skills_wrapper";
	        	$('#main_content').append('<div class="few_stats"><ul></ul></div>');	
	        	
	        	
	        	$.each(lang['models'], function(item, value){
		        	createAverage(elem, 0, 100, value.num, 'path', item);
	        	});
	        	
	    	});
	    	
	    });
	    
	    return this;
	}
});
