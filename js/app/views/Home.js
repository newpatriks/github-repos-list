var viewHome = Backbone.View.extend({
	tagName   :   "div",
  id        :   "home-list",
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
        	//that.$el.html(template({repos : user}));
        	var template = _.template( $("#tpl_home").html(), {repos : user} );
        	$("#main_content").html(template);
        });
        return this;
    }
});
