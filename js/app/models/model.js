var addingSecretIDURL = "?client_id=bc91a7e9991ba3256a60&client_secret=0a08c2743d3f021e5a209f6ae751237648bfdce9";

var m_UserDetails = Backbone.Model.extend({
  url   : "https://api.github.com/users/mbostock" + addingSecretIDURL,
  default : {
    login   : "",
    avatar  : "",
    blog  : ""
  },
  getBlog : function() {
    return this.get('blog');
  }
});

var c_User = Backbone.Collection.extend({
  url   : "https://api.github.com/users/mbostock/repos" + addingSecretIDURL,
  comparator: function (model) {     
    return -(model.get('watchers')); 
  }
});

var m_Repo = Backbone.Model.extend({
  url: function(){
    return "https://api.github.com/repos/mbostock/" + this.id + addingSecretIDURL
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
  model : m_Lang,
  url: function(){
    return "https://api.github.com/repos/mbostock/" + this.id + "/languages" + addingSecretIDURL
  },
  initialize: function(id){
    this.id = id;
  }
});
