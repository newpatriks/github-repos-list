var HeaderView = Backbone.View.extend({
  el        :   $("header"),
  initialize  : function() {
    this.user = new m_UserDetails();
  },
  events : {
    "click #submit-form" : "searchUser"
  },
  render      :   function () {
    var that = this;
    this.user.fetch({
      add : false,
      success: function(model, response) {
        model.set("login",response['name'])
        model.set('avatar', response['avatar_url']);
      }
    }).complete(function(resp_repo) {
      var template = _.template( $("#tpl_header").html(), {profile : that.user} );
      that.$el.html(template);
    });
    return this;
  }
  // Implementation for the search feature (INCOMPLETE)
  //  ,
  // searchUser : function(e) {
  //   e.preventDefault();
  //   var search = new c_search($(e.target).parent().find('#search').val());
  //   search.fetch();
  //   (search.get('total_count') > 0) ?
  // }
});
