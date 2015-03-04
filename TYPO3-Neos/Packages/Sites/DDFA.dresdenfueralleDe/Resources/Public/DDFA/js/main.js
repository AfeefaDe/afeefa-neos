require.config({
    baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe',
    paths: {
        modernizr: 'H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: 'requirejs/domReady',
        jquery: 'jquery/jquery-2.1.3',
        qx: 'qooxdoo/qx-oo-4.1.min',
        underscore: 'underscore/underscore-min',
        leaflet: 'leaflet/leaflet',
        hammer: 'hammerjs/hammer.min'
    }
});

require( ['domReady', 'modernizr'], function(domReady) {

	domReady(function(){

		require( ['jquery', 'qx', 'underscore', 'hammer', 'leaflet'], function( $, qx, _, Hammer ){

			require( ['DDFA/js/Map'], function(){

				//////////////
				// MENU //
				//////////////
				
				// show menu
				$menu = $('#mobile-menu-off-canvas');
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


				/////////////
				// Map //
				/////////////
				var map = new DDFA.Map();
				map.render();

			});

		});
	});

});


