require.config({
    baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe',
    paths: {
        domReady: 'requirejs/domReady',
        jquery: 'jquery/jquery-2.1.3',
        qx: 'qooxdoo/qx-oo-4.1.min',
        underscore: 'underscore/underscore-min',
        leaflet: 'leaflet/leaflet'
    }
});

require( ['domReady'], function(domReady) {

	domReady(function(){

		require( ['jquery', 'qx', 'underscore', 'leaflet'], function( $, qx, _ ){

			require( ['DDFA/js/Map'], function(){

				var map = new DDFA.Map();
				map.render();

			});

		});
	});

});


