qx.Class.define("MapView", {
  
  extend : qx.core.Object,
  type: "singleton",
  
  properties : {
    userLocation: {}
  },
  
  construct: function(){
  	var that = this;

  	that.render();

  	that.setUserLocation(null);
  },

  members : {
    
    render : function() {
      	
      	var that = this;

	    //////////////////
      	// MAPBOX INIT //
	    //////////////////
      	
      	L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
		that.map = L.mapbox.map('map-container', 'felixkamille.4128d9e7', {
			zoomControl: false,
			maxBounds: [
    			L.latLng(50.95, 13.5), // south-west corner
    			L.latLng(51.2, 14.0)  // north-east corner
			],
			attributionControl: false
			// tileLayer: {format: 'jpg70'}  // valid values are png, jpg, png32, png64, png128, png256, jpg70, jpg80, jpg90
    	}).setView([ 51.051, 13.74 ], 13);
		
		//////////////////////
		// Marker Cluster //
		//////////////////////

		that.markerCluster = new L.MarkerClusterGroup({
			iconCreateFunction: function(cluster) {
	          return new L.DivIcon({
	            className: 'marker-cluster',
	            iconSize: [30, 30],
	            iconAnchor: [15, 15],
	            html: cluster.getChildCount()
	          });
	        },
	        maxClusterRadius: 30
		});
		
		that.map.addLayer(that.markerCluster);

		///////////////
		// POI layer //
		///////////////

		// that.poiMarkers = new L.LayerGroup();
		// that.map.addLayer(that.poiMarkers);
		
		// that.stationMarkers = that.addPOIs(mapdata.locations.stations, '#fdc400');
		// that.setZoomFilter();
		
		//////////////
		// Get data //
		//////////////
		
		// APP.getDataManager().getAllLocations(function( data ){
		// 	console.debug(data);
		// });

		// var locations = APP.getData().locations;
		// console.debug(locations);
		that.addLocations(APP.getData().locations);

		// that.addMarkers(mapdata.locations.inis);
		// that.addMarkers(mapdata.locations.publics);
		// that.addMarkers(mapdata.locations.wifi);
		// that.addMarkersGeoJSON();


        // console.debug(that.markerCluster);
		
		// that.map.featureLayer.setFilter(function(f) {
  //           return false;
  //       });

		// that.markerCluster.eachLayer(function(layer){
		// 	layer.setFilter(function(f) {
	 //            return f.properties['marker-symbol'] === 'fast-food';
	 //        });
  //       });
        
        that.addEvents();
    },

    addEvents: function() {

    	var that = this;
    	
    	var $content = $('#content');
			var $map = $('#map-container');
			
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


	    	// that.map.on('load', function(e){
	    	// 	that.setZoomFilter();
	    	// });

	    	that.map.on('viewreset', function(e){
	    		that.setZoomFilter();
	    	});
	    	var $locateBtn = $('#locate-btn');
	    	$locateBtn.click(function(){
	    		// alert('haha');
	    		that.locate();
	    	});
	    	// $('#locate-btn').on('touchend', function(){
	    	// 	that.locate();
	    	// });

    	// require( [ 'hammer' ], function( Hammer ){

	    	// var $locateBtn = $('#locate-btn');
	    	// var hammer = new Hammer($locateBtn[0]);
	    	// hammer.on('tap press', function(ev){
	    	// 	that.locate();
	    	// });

      	// });

    	
    },
    removeEvents: function() {

    },

   //  addMarkersGeoJSON: function(markers, color) {
	 	
	 	// var that = this;

   //  	var featureLayer = L.mapbox.featureLayer()
		 //    .loadURL('/_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/js/geojson/inis.geojson')
		 //    .addTo(that.map);

   //  },

    addLocations: function(locations) {
	 	
	 	var that = this;

	 	// var newLayer = new L.LayerGroup();

    	_.each(locations, function(location){

			// type specific adjustment
			var iconSize, iconAnchor;

			if( location.type === 0 ) {
				iconSize = [30,30];
				iconAnchor = [15,15];
			}
			else if( location.type === 1 ) {
				iconSize = [30,30];
				iconAnchor = [15,15];
			}
			else if( location.type === 2 ) {
				iconSize = [30,30];
				iconAnchor = [15,15];
			}
			else if( location.type === 3 ) {
				iconSize = [15,15];
				iconAnchor = [8,8];
			}
			
			// TODO: quickfix: skip locations without coodinates
			if( !location.lat || !location.lon ) return false;

			var className = 'location';
			className += ' type-' + location.type;
			if(location.supportNeeded) className += ' support-needed';

			var marker = L.marker( [location.lat, location.lon] , {
				riseOnHover: true,
			    icon: L.divIcon({
	                className: className,
	                iconSize: iconSize,
	                iconAnchor: iconAnchor
	            })
			// }).addTo(that.map);
			});
			
			///////////
			// POPUP //
			///////////
			var locationName = location.name;
			if (!locationName) {
				if( location.type === 0 ) locationName = location.initiative.name;
				else if( location.type === 1 ) locationName = location.marketEntry.name;
				else if( location.type === 2 ) locationName = location.event.name;
			}
			marker.bindPopup('<b>' + locationName + '</b>' + "<br>" + location.street);
			marker.on('mouseover', function (e) {
	            this.openPopup();
	        });
	        marker.on('mouseout', function (e) {
	            this.closePopup();
	        });
			
			// TODO load detail view
			// var $content = $('#content');
			// marker.on('click', function(){
			// 	if ( !$content.hasClass('active') ){
			// 		$content.addClass('active');
			// 		$content.addClass('active-small');
			// 	}
				
			// 	// render details
			// 	$content.empty();
			// 	if(marker.name) $content.append('<p class="location-title">' + marker.name + '</p>');
			// 	if(marker.services) $content.append('<div class="location-property"><h3><span class="fa fa-cubes fa-lg fa-fw"></span> ' + 'Services' + '</h3><p>' + marker.services + '</p></div>');
			// 	if(marker.supportNeeded) $content.append('<div class="location-property"><span class="fa fa-user-plus fa-lg fa-fw"></span> ' + 'Supporters wanted' + '</div>');
			// 	if(marker.address) $content.append('<div class="location-property"><span class="fa fa-map-marker fa-lg fa-fw"></span> ' + 'Address' + '</h3><p>' + marker.address + '</p></div>');
			// 	if(marker.web) $content.append('<div class="location-property"><span class="fa fa-globe fa-lg fa-fw"></span> <a target="_blank" href="' + marker.web + '">' + marker.web +'</a></div>');
			// 	if(marker.facebook) $content.append('<div class="location-property"><span class="fa fa-facebook-square fa-lg fa-fw"></span> <a target="_blank" href="' + marker.facebook + '">' + marker.facebook +'</a></div>');
			// 	if(marker.mail) $content.append('<div class="location-property"><span class="fa fa-at fa-lg fa-fw"></span> ' + marker.mail + '</div>');
			// 	if(marker.phone) $content.append('<div class="location-property"><span class="fa fa-phone fa-lg fa-fw"></span> ' + marker.phone + '</div>');
			// 	if(marker.fax) $content.append('<div class="location-property"><span class="fa fa-fax fa-lg fa-fw"></span> ' + marker.fax + '</div>');
			// 	if(marker.staff) $content.append('<div class="location-property"><h3><span class="fa fa-user fa-lg fa-fw"></span> ' + 'Contact person' + '</h3><p>' + marker.staff + '</p></div>');
			// 	if(marker.language) $content.append('<div class="location-property"><h3><span class="fa fa-language fa-lg fa-fw"></span> ' + 'Languages spoken' + '</h3><p>' + marker.language + '</p></div>');
			// 	if(marker.opening) $content.append('<div class="location-property"><h3><span class="fa fa-clock-o fa-lg fa-fw"></span> ' + 'Opening hours' + '</h3><p>' + marker.opening + '</p></div>');
			// 	if(marker.desc) $content.append('<div class="location-property"><h3><span class="fa fa-info fa-lg fa-fw"></span> ' + 'Details' + '</h3><p>' + marker.desc + '</p></div>');

			// 	// $content.append('<p><a href="http://maps.google.com/?saddr=34.052222,-118.243611&daddr=37.322778,-122.031944" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
				
			// 	var userLocation = that.getUserLocation();
			// 	if ( userLocation )
			// 		$content.append('<p><a href="http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lng + '&daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
			// 	else
			// 		$content.append('<p><a href="http://maps.google.com/?daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');

			// 	$content.append('<p><button class="btn btn-default"><span class="fa fa-street-view" aria-hidden="true"></span> Show in Google Street View</button></p>');
				
			// });

			that.markerCluster.addLayer(marker);

			// newLayer.addLayer(marker);
marker
		});

		// return newLayer;
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
    	that.map.locate( {
    		watch: false,
    		setView: false,
    		enableHighAccuracy: true
    	});

    	// update view if location found
		that.map.on('locationfound', function(e) {
		    // alert(e.latlng);
		    that.map.setView( e.latlng , 15);
		    that.setUserLocation = e.latlng;

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

		that.map.on('locationerror', function(e) {
		    alert('Locating failed');
		});
    },

    addCartoDBLayer: function(){
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
    }

  }
});