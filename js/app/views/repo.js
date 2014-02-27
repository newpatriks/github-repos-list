var ItemView = Backbone.View.extend({
  template  :  _.template( $("#tpl_repo").html() ),
  initialize: function(options) {
    this.info = options.model;    
    this.el = options.el;
  },
  render  :   function () {
    this.$el.append(this.template({repo_info : this.info}));
    return this;
  }
});
