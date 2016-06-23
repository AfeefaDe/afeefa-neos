require.config({
    
    // baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/js',
    
    paths: {
      modernizr: '../../H5BP/js/vendor/modernizr-2.8.3.min',
      domReady: '../../requirejs/domReady',
      jquery: '../../jquery/jquery-2.2.2.min',
      perfectScrollbarJQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.7/js/min/perfect-scrollbar.jquery.min',
      chosen: '../../chosen/chosen.jquery.min',
      momentjs: '../../momentjs/moment.min',
	combodate: '../../combodate/combodate',
      restive: '../../restive/restive.min',
      qx: '../../qooxdoo/qx-oo-4.1.min',
      underscore: '../../underscore/underscore-min',
      hammer: '../../hammerjs/hammer.min',
      bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
      fontawesome: 'https://use.fontawesome.com/43c3d746ca',
      d3: '../../d3/d3.min',
      // mapbox: 'https://api.tiles.mapbox.com/mapbox.js/v2.3.0/mapbox',
      mapbox: 'https://api.mapbox.com/mapbox.js/v2.4.0/mapbox',
      // mc: 'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster'
      mc: '../../leafletPlugins/leaflet.markercluster'
    },

    shim: {
      'mapbox': {
          //These script dependencies should be loaded before loading
          //mapbox.js
          // deps: ['underscore', 'jquery'],
          //Once loaded, use the global 'L' as the
          //module value.
          exports: 'L'
      },
      'modernizr': {
          //These script dependencies should be loaded before loading
          //modernizr.js
          // deps: ['underscore', 'jquery'],
          //Once loaded, use the global 'Modernizr' as the
          //module value.
          exports: 'Modernizr'
      },
      'qx': {
          //These script dependencies should be loaded before loading
          //qx.js
          // deps: ['underscore', 'jquery'],
          //Once loaded, use the global 'qx' as the
          //module value.
          exports: 'qx'
      },
      'd3': {
          exports: 'd3'
      },
      "mc": ["mapbox"],
      "Daddy": ["qx"],
      "bootstrap": ["jquery"],
      "chosen": ["jquery"],
      "restive": ["jquery"],
      "combodate": ["jquery"],
      'APPAFEEFA': ["qx"],
			'DataManager': ["qx"],
			'Router': ["qx"],
			'LanguageManager': ["qx"],
			'Views/View': ["qx"],
			'Views/MapView': ["qx"],
			'Views/SearchView': ["qx"],
			'Views/DetailView': ["qx"],
			'Views/MenuView': ["qx"],
			'Views/LegendView': ["qx"],
			'Views/LanguageView': ["qx"],
			'Views/PlusView': ["qx"],
			'Views/FormView': ["qx"],
			'Views/IncludeView': ["qx"]
    },

    // enforceDefine: true,

    waitSeconds: 0	// disable "Load timeout for modules" error
});

require([
	'domReady',
	'qx',
	'jquery',
	'underscore',
	'hammer',
	'd3',
	'mapbox',
	'mc',
	'perfectScrollbarJQuery',
	'chosen',
	'momentjs',
	'combodate',
	'modernizr',
	'bootstrap',
	'fontawesome',
	'Daddy',
	'restive',
	'APPAFEEFA',
	'DataManager',
	'Router',
	'LanguageManager',
	'Views/View',
	'Views/MapView',
	'Views/SearchView',
	'Views/DetailView',
	'Views/MenuView',
	'Views/LegendView',
	'Views/LanguageView',
	'Views/PlusView',
	'Views/FormView',
	'Views/IncludeView'
], function(domReady, qx, $, _, Hammer) {

	domReady(function(){

		// require( [ 'modernizr'], function(  ){

			// require( [], function(){

				// require( [], function(){

					APP = new APPAFEEFA();
					
					// initialize app (e.g. fetch data)
					APP.init(function(){
						
						// var views;
						
						// if( APP.getUserDevice() === 'phone' ) {
						// 	views = ['Views/MapView', 'Views/DetailView', 'Views/DetailViewMobile', 'Views/PlusView'];
						// } else {
						// 	views = ['Views/MapView', 'Views/DetailView', 'Views/PlusView'];
						// }

						// require( views, function(){
						// 	APP.getRouter().navigate();
						// });

						// require( [], function(){
							
							if( APP.getUserDevice() === 'mobile' ) {
								
								require( ['Views/DetailViewMobile', 'Views/LanguageViewMobile'], function(){
									APP.getRouter().initialNavigate();
								});

							} else {
								APP.getRouter().initialNavigate();
							}

							APP.say('appInitialized');

						// });
					

					});



					//////////////
					// MENU //
					//////////////
					
					// console.debug(mapdata);

					// show menu
					// var $menu = $('#mobile-menu-off-canvas-left');
					// $('#menu-btn').click(function(){
					// 	$menu.addClass('active');
					// });

					// // hide menu (click the map)
					// $('#map-container').click(function(){
					// 	$menu.removeClass('active');
					// });
					// var myElement = document.getElementById('myElement');

					// // hide menu (swipe back)
					// var mc = new Hammer($menu[0]);
					// mc.on("swipeleft", function(ev) {
					// 	$menu.removeClass('active');
					// });

					// // show legend
					// var $legend = $('#mobile-menu-off-canvas-right');
					// $('#legend-btn').click(function(){
					// 	$legend.addClass('active');
					// });

					// // hide legend (click the map)
					// $('#map-container').click(function(){
					// 	$legend.removeClass('active');
					// });
					// var myElement = document.getElementById('myElement');

					// // hide legend (swipe back)
					// var mc = new Hammer($legend[0]);
					// mc.on("swiperight", function(ev) {
					// 	$legend.removeClass('active');
					// });

				// });
			
			// });

		// });
	});

});


