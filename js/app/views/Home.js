var viewHome = Backbone.View.extend({
	el 				: 	$("#main_content"),
	initialization	:	function() {
	},
	render			: 	function () {
		var that = this;
		var user = new c_User();
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
			var template = _.template( $("#tpl_home").html(), {repos : user} );
			that.$el.html(template);
		});
		return this;
	}
});