require.config({
    baseUrl: 'js/lib',
    paths: {
        'app'						: '../app',
        'jquery'					: 'jquery-1.10.2',
        'underscore'				: 'underscore.min',
        'backbone'					: 'backbone.min',
        'bootstrap'					: 'bootstrap.min',
        'text'						: 'text',
        'async' 					: 'async',
        'tpl'						: '../tpl'
    },
    shim: {        
        'bootstrap.min'				: ['jquery', 'scripts'],
        'scripts'					: ['jquery'],
        'jquery.min'				: { exports: '$' },
        'backbone.min'				: { deps: [ 'underscore.min', 'jquery', 'scripts', 'bootstrap.min' ], exports: 'Backbone' },
        'underscore.min'			: { exports: '_' }
    }
       
});

// Start the main app logic.
require([
	"jquery",
	"backbone.min",
	"../app/router"
	], function(
		$, 
		Backbone,
		Router
	){
    	var rout = new Router.AppRouter();
    	Backbone.history.start();
});