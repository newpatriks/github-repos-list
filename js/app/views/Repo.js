var viewRepo = Backbone.View.extend({
	el 				: 	$("#main_content"),
	initialization	:	function(repo) {
		this.repo = repo;
	},
	render			: 	function () {
		var that = this;		
		var template = _.template( $("#tpl_repo").html(), {repos : this.repo} );
		that.$el.html(template);
		return this;
	}
});