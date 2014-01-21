var viewHeader = Backbone.View.extend({
	el 				: 	$("header"),
	initialization	:	function() {
    },
    render			: 	function () {
        var that = this;
        var user = new m_UserDetails();
        user.fetch({
        	add : false,
        	success: function(model, response) {            		
        		model.set("login",response['name'])
        		model.set('avatar', response['avatar_url']);
        	}
        }).complete(function(resp_repo) {
        	var template = _.template( $("#tpl_header").html(), {profile : user} );
        	that.$el.html(template);
        });
        return this;           	
    }
});