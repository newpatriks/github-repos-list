var viewHome = Backbone.View.extend({
  tagName   :   "div",
  id        :   "home-list",
  initialization:function() {
    },
    render:function () {
    var that = this;
    var user = new c_User();
    user.fetch({
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
      /*_.each(user, function(item) {
          var tpl_item = _.template($("#tpl_repo").html(),{repo:item});
          $("ul#list-repos").append(template);
      });*/
    });
    return this;
  }
});
