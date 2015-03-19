require.config({
    baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe',
    paths: {
        modernizr: 'H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: 'requirejs/domReady',
        jquery: 'jquery/jquery-2.1.3',
        qx: 'qooxdoo/qx-oo-4.1.min',
        underscore: 'underscore/underscore-min',
        leaflet: 'leaflet/leaflet',
        leafletCluster: 'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster',
        hammer: 'hammerjs/hammer.min',
        cartodb: 'http://libs.cartocdn.com/cartodb.js/v3/3.12/cartodb',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min',
        mapbox: 'https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox',
        mapdata: 'DDFA/js/geojson/mapdata'
    }
});

require( ['domReady', 'modernizr'], function(domReady) {

	domReady(function(){

		require( ['jquery', 'qx', 'underscore', 'hammer', 'bootstrap'], function( $, qx, _, Hammer ){

			require( ['DDFA/js/Map', 'mapdata'], function(){

				//////////////
				// MENU //
				//////////////
				
				console.debug(mapdata);

				// show menu
				var $menu = $('#mobile-menu-off-canvas-left');
				$('#menu-btn').click(function(){
					$menu.addClass('active');
				});

				// hide menu (click the map)
				$('#map-container').click(function(){
					$menu.removeClass('active');
				});
				var myElement = document.getElementById('myElement');

				// hide menu (swipe back)
				var mc = new Hammer($menu[0]);
				mc.on("swipeleft", function(ev) {
					$menu.removeClass('active');
				});

				// show legend
				var $legend = $('#mobile-menu-off-canvas-right');
				$('#legend-btn').click(function(){
					$legend.addClass('active');
				});

				// hide legend (click the map)
				$('#map-container').click(function(){
					$legend.removeClass('active');
				});
				var myElement = document.getElementById('myElement');

				// hide legend (swipe back)
				var mc = new Hammer($legend[0]);
				mc.on("swiperight", function(ev) {
					$legend.removeClass('active');
				});


				/////////////
				// Map //
				/////////////
				var map = new DDFA.Map();
				map.render();

			});

		});
	});

});


