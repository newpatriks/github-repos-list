var viewHome = Backbone.View.extend({
  tagName   :   "div",
  id        :   "home-list",
  initialize  : function() {
    this.user = new c_User();
  },
    render      :   function () {
    var that = this;    
    this.user.fetch({
      add : true,
      success: function(collection, response) {
        // Ordering the collection
        collection.comparator = function(model) {
          return -model.get('watchers');
        }
        collection.sort();
        collection.reset(collection.first(20));
      }
        }).complete(function(resp) {
          var template = _.template( $("#tpl_home").html());
          $("#main_content").html(template);
          _.each(that.user.models, function(item,i){
        that.subRender(item, i);
      });
        });
        return this;
    },
    subRender: function(item, i) {
    var subview = new viewRepo({el:"#list-repos",info : item}).render();
  }
});
