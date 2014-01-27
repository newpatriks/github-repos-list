var viewRepo = Backbone.View.extend({
	tagName   :   "div",	
	initialize:	function({el, info , id}) {
		this.info = info;
		this.id = "repo_"+id;
		this.el = el;		
	},	
	render	: 	function () {
		var tpl_repo = _.template( $("#tpl_repo").html(), {repo_info : this.info} );
		this.$el.append(tpl_repo);
		return this;
	}
});
