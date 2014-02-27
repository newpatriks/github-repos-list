var HeaderView = Backbone.View.extend({
  template    : _.template( $("#tpl_header").html() ),
  initialize  : function() {
    this.user = new m_UserDetails();
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
      that.$el.html(that.template({profile : that.user}));
    });
    return this;
  }
});
