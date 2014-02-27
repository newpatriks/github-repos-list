var ListView = Backbone.View.extend({
  id        :   "home-list",
  template  :  _.template( $("#tpl_home" ).html() ),
  initialize  : function(options) {
    options = options || {};    
    this.collection = options.collection;
    this.listenTo(this.collection, 'add', this.appendItem);
    this.listenTo(this.collection, 'reset', this.render);      
    this.subviews = [];
  },
  render      :   function () {        
    this.$el.html(this.template());
    this.collection.each(function(model) {
      console.log(model);
      this.appendItem(model);      
    }, this);
    return this;
  },  
  appendItem  :  function(model) {
    //console.log(model.get('name'));
    subview = new ItemView({ model : model, el : "#list-repos"});    
    $(this.el).append(subview.el);
    subview.render();
    this.subviews.push(subview);
  },
  close  :  function() {
    _.each(this.subviews, function(subview) {
      subview.close && subview.close();
    });
    this.stopListening();
  }
});
