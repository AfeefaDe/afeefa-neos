// create anmial class
	qx.Class.define("DDFA.Map", {
	  extend : qx.core.Object,
	  
	  // properties : {
	  //   map: {},
	  //   options: {
	  //   	locate: false
	  //   }
	  // },
	  
	  members : {
	    
	    render : function() {
	      	
	      	var that = this;

	      	// TODO define class properties in the class header; currently causing problems accessing those properties inside the class itself, because theyre not instantiated (see manual for a solution)
	      	that.options = {
	      		locate: false
	      	};

	      	L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
			that.map = L.mapbox.map('map-container', 'felixkamille.4128d9e7', {
				zoomControl: false,
				maxBounds: [
	    			L.latLng(50.95, 13.5), // south-west corner
	    			L.latLng(51.2, 14.0)  // north-east corner
    			],
    			attributionControl: false
	    	}).setView([ 51.051, 13.74 ], 13);
			
			that.userLocation = null;
	    	if (that.options.locate) that.locate();

			// L.mapbox.tileLayer('felixkamille.4128d9e7', {
			//     accessToken: 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA',
			//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
			// }).addTo(that.map);

			// function addCartoDBLayer(){
			// 	cartodb.createLayer(that.map, 'http://felixkamille.cartodb.com/api/v2/viz/ecd0d3aa-7423-11e4-9658-0e018d66dc29/viz.json')
   //        .addTo(that.map)
   //    	  .on('done', function(layer) {
	          // layer.setInteraction(true);
		         //  layer.on('featureOver', function(e, latlng, pos, data) {
		         //    cartodb.log.log(e, latlng, pos, data);
		         //  });
	          // layer.on('error', function(err) {
	          //   cartodb.log.log('error: ' + err);
	          // });
	        // })
	  //       .on('error', function() {
	  //         cartodb.log.log("some error occurred");
	  //       });
			// };
			// addCartoDBLayer();

			that.markerCluster = new L.MarkerClusterGroup({
				iconCreateFunction: function(cluster) {
		          return new L.DivIcon({
		            className: 'marker-cluster',
		            iconSize: [30, 30],
		            html: cluster.getChildCount()
		          });
		        }
			});

			that.poiMarkers = new L.LayerGroup();
			that.map.addLayer(that.poiMarkers);

			// var categories = {
			// 	advice: {id: 0, name: 'Advice', maki: 'heart'},
			// 	medic: {id: 1, name: 'Medical Care', maki: 'hospital'},
			// 	language: {id: 2, name: 'Language learning', maki: 'college'},
			// 	leisure: {id: 3, name: 'Leisure activities', maki: 'pitch'},
			// 	jobs: {id: 4, name: 'Jobs + Internships'},
			// 	public: {id: 5, name: 'Public offices', maki: 'town-hall'},
			// 	religion: {id: 6, name: 'Religious Institutions'},
			// 	shops: {id: 7, name: 'International shops', maki: 'shop'},
			// 	translation: {id: 8, name: 'Translation service'},
			// 	donation: {id: 9, name: 'Donation'},
			// 	network: {id: 10, name: 'Network', maki: 'star'}
			// }

			// var inis = [
			// 	{geo: [51.0491571,13.7391965], name: 'Cabana', cat: categories.advice, address: 'Kreuzstraße 7, 01067 Dresden', phone: '0351 492 33 67', mail: 'cabana@infozentrum-dresden.de', web: 'http://www.infozentrum-dresden.de', services: 'Beratung, Integrationskurse, Information'},
			// 	{geo: [51.051, 13.74], cat: categories.language, name: 'DAMF Deutschkurse für Asylsuchende', address: 'Dresden', phone: '', mail: 'damf-dd@gmx.de', web: 'http://damf.blogsport.de', services: 'Deutschkurse; Niveaueinstufungen, Alphabetisierung, A1, Einstufungstests, ehrenamtlich'},
			// 	{geo: [51.05225,13.70205], cat: categories.advice, name: 'Kontaktgruppe Asyl e.V.', address: 'Emerich-Ambros-Ufer 42, 01159 Dresden', phone: '', mail: 'kontaktgruppe-asyl@web.de', web: 'http://kontaktgruppeasyl.blogsport.de/', services: 'Beratung, Soziokulturelle Angebote, ...'},
			// 	{geo: [51.10749,13.68406], cat: categories.network, name: 'Bündnis Buntes Radebeul', address: 'August-Bebel-Straße 49, 01445 Radebeul', phone: '0351-8383457', mail: 'info@buntes-radebeul.de', web: 'http://www.buntes-radebeul.de', services: 'Deutschkurse, Einzelfallhilfe und Begleitung, soziokulturelle Angebote, Sammlungen, Netzwerkarbeit'},
			// 	{geo: [51.0242401,13.8379731],  cat: categories.network, name: 'Laubegast ist Bunt', address: 'Österreicher Str. 54, 01279 Dresden', phone: '0157-87828576', mail: 'vitae@cvjm-dresden.de', web: 'http://www.laubegast-ist-bunt.de', services: 'Deutschkurse,Hilfen im Alltag, Freizeitangebote, Veranstaltungen für Flüchtlinge und Anwohner, Plakat-, Flyer- und Postkartenaktionen'},
			// 	{geo: [51.0665643,13.783502], cat: categories.advice, name: 'RAA Sachsen Opferberatung', address: 'Bautzner Str. 45, 01099 Dresden', phone: '(0351) 88 9 41 74', mail: 'opferberatung.dresden@raa-sachsen.de', web: 'http://raa-sachsen.de/index.php/dresden.html', services: 'Parteiliche, klientelorientierte, aufsuchende, vrtrauliche, mehrsprachige und kostenlose Beratung und Unterstützung Betroffener rechtsmotivierter und rassistischer Gewalt, deren Angehörige, Freunde und Freundinnen  sowie Zeug_innen eines Angriffs'}
			// ];

			// var publics = [
			// 	{geo: [51.04229, 13.79701], name: 'Sozialamt Dresden', cat: categories.public, address: 'Junghansstraße 2, 01277 Dresden'},
			// 	{geo: [51.052652, 13.730282], name: 'Ausländerbehörde Dresden', cat: categories.public, address: 'Theaterstraße 13 / Zimmer 056, 01067 Dresden'},
			// ];

			// var stations = [
			// 	{geo: [51.063158, 13.746389], name: 'Albertplatz', cat: {maki: 'rail-metro'} },
			// 	{geo: [51.050871, 13.733557], name: 'Postplatz', cat: {maki: 'rail-metro'} },
			// 	// {geo: [51.04108, 13.732684], name: 'Hauptbahnhof', cat: {maki: 'rail-metro'} },
			// 	{geo: [51.038473, 13.746587], name: 'Lennéplatz', cat: {maki: 'rail-metro'} }
			// ];

			require( [ 'hammer' ], function( Hammer ){

				$content = $('#content');
				$map = $('#map-container');
				
				// hide content (map click)
				$map.click(function(){
					if ( $content.hasClass('active-large') ){
						$content.removeClass('active-large');
						$content.addClass('active-small');
					}
					else {
						$content.removeClass('active');
						$content.removeClass('active-small');
						$content.removeClass('active-large');
					}
				});

				// hide content (swipe down)
				// var mc = new Hammer($content[0]);
				// mc.on("swipedown", function(ev) {
				// 	if ( $content.hasClass('active-large') ){
				// 		$content.removeClass('active-large');
				// 		$content.addClass('active-small');
				// 	}
				// });

				$content.click(function(){
					if ( $content.hasClass('active-small') ){
						$content.removeClass('active-small');
						$content.addClass('active-large');
					}
					else if ( $content.hasClass('active-large') ){
						$content.removeClass('active-large');
						$content.addClass('active-small');
					}
				});


	      	});
			
			// that.addMarkers(inis);
			that.addMarkers(mapdata.locations.inis);
			// that.addMarkersGeoJSON(inis);
			that.addMarkers(mapdata.locations.publics);
			that.stationMarkers = that.addPOIs(mapdata.locations.stations, '#fdc400');
			that.setZoomFilter();

			that.map.addLayer(that.markerCluster);

            // console.debug(that.markerCluster);
			
			// that.map.featureLayer.setFilter(function(f) {
	  //           return false;
	  //       });

			// that.markerCluster.eachLayer(function(layer){
			// 	layer.setFilter(function(f) {
		 //            return f.properties['marker-symbol'] === 'fast-food';
		 //        });
	  //       });
	        
	        that.createLegend();

	        that.addEvents();

	    },

	    addEvents: function() {

	    	var that = this;
	    	
	    	// that.map.on('load', function(e){
	    	// 	that.setZoomFilter();
	    	// });

	    	that.map.on('viewreset', function(e){
	    		that.setZoomFilter();
	    	});
	    	
	    },
	    removeEvents: function() {

	    },

	    createLegend: function() {
	    	var that = this;

	    	var $legend = $('#mobile-menu-off-canvas-right .content');
	    	_.each(mapdata.categories, function(cat){
	    		if(cat.maki)
	    			$legend.append('<p class="legend-entry ' + cat.maki + '">' + cat.name + '</p>');
	    		else
	    			$legend.append('<p class="legend-entry">' + cat.name + '</p>');
	    	});
	    },

	    addMarkersGeoJSON: function(markers, color) {
    	 	
    	 	var that = this;

	    	var featureLayer = L.mapbox.featureLayer()
			    .loadURL('/_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/js/geojson/inis.geojson')
			    .addTo(that.map);

	    },

	    addMarkers: function(markers, color) {
    	 	
    	 	var that = this;

    	 	var newLayer = new L.LayerGroup();

	    	if(color === undefined) color = '#333';

	    	_.each(markers, function(marker){
				// var leafMarker = L.marker(marker.geo).addTo(that.map);
				var leafMarker = L.marker(marker.geo, {
					riseOnHover: true,
					icon: L.mapbox.marker.icon({
				        'marker-size': 'large',
				        'marker-symbol': (marker.cat !== null && marker.cat.maki !== undefined) ? marker.cat.maki : '',
				        'marker-color': color
				    })
				// }).addTo(that.map);
				});
				// leafMarker.bindPopup('<b>' + marker.name + '</b>' + "<br>" + marker.address + "<br>" + marker.phone + "<br>" + marker.mail + "<br>" + marker.web + "<br>" + marker.services);
				
				leafMarker.on('click', function(){
					if ( !$content.hasClass('active') ){
						$content.addClass('active');
						$content.addClass('active-small');
					}
					
					// render details
					$content.empty();
					if(marker.name) $content.append('<p class="location-title">' + marker.name + '</p>');
					if(marker.services) $content.append('<p><span class="fa fa-cubes fa-lg"></span> ' + marker.services + '</p>');
					if(marker.address) $content.append('<p><span class="fa fa-map-marker fa-lg"></span> ' + marker.address + '</p>');
					if(marker.web) $content.append('<p><span class="fa fa-globe fa-lg"></span> <a target="_blank" href="' + marker.web + '">' + marker.web +'</a></p>');
					if(marker.facebook) $content.append('<p><span class="fa fa-facebook-square fa-lg"></span> <a target="_blank" href="' + marker.facebook + '">' + marker.facebook +'</a></p>');
					if(marker.mail) $content.append('<p><span class="fa fa-at fa-lg"></span> ' + marker.mail + '</p>');
					if(marker.phone) $content.append('<p><span class="fa fa-phone fa-lg"></span> ' + marker.phone + '</p>');
					if(marker.fax) $content.append('<p><span class="fa fa-fax fa-lg"></span> ' + marker.fax + '</p>');
					if(marker.staff) $content.append('<p><span class="fa fa-user fa-lg"></span> ' + marker.staff + '</p>');
					if(marker.language) $content.append('<p><span class="fa fa-language fa-lg"></span> ' + marker.language + '</p>');
					if(marker.opening) $content.append('<p><span class="fa fa-clock-o fa-lg"></span> ' + marker.opening + '</p>');
					if(marker.desc) $content.append('<p><span class="fa fa-info fa-lg"></span> ' + marker.desc + '</p>');

					// $content.append('<p><a href="http://maps.google.com/?saddr=34.052222,-118.243611&daddr=37.322778,-122.031944" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
					
					if ( that.userLocation )
						$content.append('<p><a href="http://maps.google.com/?saddr=' + that.userLocation.lat + ',' + that.userLocation.lng + '&daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
					else
						$content.append('<p><a href="http://maps.google.com/?daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');

					$content.append('<p><button class="btn btn-default"><span class="fa fa-street-view" aria-hidden="true"></span> Show in Google Street View</button></p>');
					
				});

				that.markerCluster.addLayer(leafMarker);

				newLayer.addLayer(leafMarker);

			});

			return newLayer;
	    },

	    addPOIs: function(markers, color) {
    	 	
    	 	var that = this;

	    	if(color === undefined) color = '#333';
    	 	
    	 	var newLayer = new L.LayerGroup();

	    	_.each(markers, function(marker){
				// var leafMarker = L.marker(marker.geo).addTo(that.map);
				var leafMarker = L.marker(marker.geo, {
					riseOnHover: true,
					zIndexOffset: -1000,
					icon: L.divIcon({
		                className: 'marker-station',
		                html: '<p><span class="fa fa-subway"></span> '+ marker.name + '</p>',
		                // html: '<p>' + marker.name + '</p>',
		                // iconSize: [100,20],
		                iconSize: [100,20],
		                iconAnchor: [50,25]
		            })
				// }).addTo(that.map);
				});

				newLayer.addLayer(leafMarker);
			});

	    	return newLayer;
	    },

	    setZoomFilter: function(){
	    	
	    	var that = this;

	    	var currentLayers = that.stationMarkers.getLayers();
	    	var newLayers = _.filter(currentLayers, function(){
	    		return that.map.getZoom() >= 14;
	    	});
	    	that.poiMarkers.clearLayers();
	    	
	    	_.each(newLayers, function(layer) {
	    		that.poiMarkers.addLayer(layer);
	    	});
	    },

	    // sample code for geocoding (finding coords by location names)
	    // see https://www.mapbox.com/mapbox.js/api/v2.1.5/l-mapbox-geocoder/
	    find: function() {

	    	var that = this;
	    	
	    	geocoder.query('Chester, NJ', showMap);

				function showMap(err, data) {
				    // The geocoder can return an area, like a city, or a
				    // point, like an address. Here we handle both cases,
				    // by fitting the map bounds to an area or zooming to a point.
				    if (data.lbounds) {
				        that.map.fitBounds(data.lbounds);
				    } else if (data.latlng) {
				        that.map.setView([data.latlng[0], data.latlng[1]], 13);
				    }
				}
	    },

	    // locate the user on startup and set view to his position
	    locate: function() {

	    	var that = this;

	    	// trigger locating
	    	that.map.locate( {watch: false, setView: false, enableHighAccuracy: true} );

	    	// update view if location found
    		that.map.on('locationfound', function(e) {
				    // alert(e.latlng);
				    that.map.setView( e.latlng , 15);
				    that.userLocation = e.latlng;

				    var myIcon = L.icon({
						    iconUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/img/noun_91817_cc.png',
						    // iconRetinaUrl: 'my-icon@2x.png',
						    iconSize: [30, 30],
						    iconAnchor: [15, 15],
						    popupAnchor: [40, -10]
						    // shadowUrl: 'my-icon-shadow.png',
						    // shadowRetinaUrl: 'my-icon-shadow@2x.png',
						    // shadowSize: [68, 95],
						    // shadowAnchor: [22, 94]
						});

						// L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
				    var leafMarker = L.marker(e.latlng, {
				    	// icon: myIcon
				    	icon: L.divIcon({
			                className: 'marker-user-location',
			                html: '',
			                // html: '<p>' + marker.name + '</p>',
			                // iconSize: [100,20],
			                iconSize: [16,16],
			                iconAnchor: [8,8]
			            })
				    }).addTo(that.map);
				});
	    }

	  }
	});