define(function (require) {

    "use strict";

    var $			= require('jquery'),
        _           = require('underscore.min'),
        Backbone    = require('backbone.min'),
        tpl         = require('text!tpl/Header.html'),
        model		= require('app/models/model'),
        template 	= _.template(tpl);

    return Backbone.View.extend({
    	el 				: 	$("header"),
		initialization	:	function() {
			console.log("[Home]");
	    },
        render			: 	function () {
            console.log("[Home Render]");
            var that = this;
            var user = new model.m_UserDetails();
            user.fetch({
            	add : false,
            	success: function(model, response) {            		
            		model.set("login",response['name'])
            		model.set('avatar', response['avatar_url']);
            	}
            }).complete(function(resp_repo) {
            	that.$el.html(template({profile : user}));
            });
            return this;           	
        }
	});
});