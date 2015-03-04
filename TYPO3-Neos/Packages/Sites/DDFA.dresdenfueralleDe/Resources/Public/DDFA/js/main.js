require.config({
    baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe',
    paths: {
        modernizr: 'H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: 'requirejs/domReady',
        jquery: 'jquery/jquery-2.1.3',
        qx: 'qooxdoo/qx-oo-4.1.min',
        underscore: 'underscore/underscore-min',
        leaflet: 'leaflet/leaflet'
    }
});

require( ['domReady', 'modernizr'], function(domReady) {

	domReady(function(){

		require( ['jquery', 'qx', 'underscore', 'leaflet'], function( $, qx, _ ){

			require( ['DDFA/js/Map'], function(){

				//////////////
				// MENU //
				//////////////
				
				$('#menu-btn').click(function(){
					$('#mobile-menu-off-canvas').addClass('active');
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


