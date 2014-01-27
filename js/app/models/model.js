var m_UserDetails = Backbone.Model.extend({
	url 	: "https://api.github.com/users/mbostock",
	default : {
		login  	: "",
		avatar 	: "",
		blog	: ""
	},	
	getBlog : function() {
		return this.get('blog');
	}
});

var c_User = Backbone.Collection.extend({
	url 	: "https://api.github.com/users/mbostock/repos"
});

var m_Repo = Backbone.Model.extend({
	url: function(){
		return "https://api.github.com/repos/mbostock/" + this.id;
	},
	initialize: function(id){
		this.id = id;
	}
});

var m_Lang = Backbone.Model.extend({
	default : {
		name : "",
		num  : 0
	},
	initialize: function(name, num){			
		this.name = name;
		this.num = num;
	}
});

var c_Lang = Backbone.Collection.extend({
	model	: m_Lang,
	url: function(){
		return "https://api.github.com/repos/mbostock/" + this.id + "/languages";
	},
	initialize: function(id){
		this.id = id;
	}
});