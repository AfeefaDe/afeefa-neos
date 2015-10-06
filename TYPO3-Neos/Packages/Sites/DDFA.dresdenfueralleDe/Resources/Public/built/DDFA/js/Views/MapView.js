qx.Class.define("MapView", {
  
  extend : View,
  type: "singleton",
  
  properties : {
    userLocation: {},
    markerLocationLookup: {},
    selectedMarker: {}
  },
  
  construct: function(){
  	var that = this;

    that.setViewId('mapView');

    that.setLoadable(true);
  	that.setUserLocation(null);
  	that.setSelectedMarker(null);
  	that.setMarkerLocationLookup([]);
  },

  members : {
    
    render : function() {
      	
      	var that = this;

      	// view container
        that.view = $("<div />");
        that.view.attr('id', that.getViewId());

        $('#main-container').append(that.view);

        // dark map curtain
      	that.mapCurtain = $("<div />").attr('id', 'map-curtain');
        $('#main-container').append(that.mapCurtain);

	    //////////////////
      	// MAPBOX INIT //
	    //////////////////
      	
      	L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
		// that.map = L.mapbox.map('map-container', 'felixkamille.4128d9e7', {
		that.map = L.mapbox.map(that.getViewId(), 'felixkamille.4128d9e7', {
			zoomControl: false,
			maxBounds: [
    			L.latLng(50.894413, 13.304980), // south-west corner
    			L.latLng(51.2, 14.0)  // north-east corner
			],
			// attributionControl: true,
			tileLayer: {format: 'jpg70'},  // valid values are png, jpg, png32, png64, png128, png256, jpg70, jpg80, jpg90
			tapTolerance: 30,
			maxZoom: 18
    	}).setView([ 51.051, 13.74 ], 13);
		
		///////////////////////////////
		// Layer for basic locations //
		///////////////////////////////
		that.basicLayer = L.layerGroup();
		that.map.addLayer(that.basicLayer);

		//////////////////////
		// Marker Cluster //
		//////////////////////

		that.markerCluster = new L.MarkerClusterGroup({
			iconCreateFunction: function(cluster) {
	          return new L.DivIcon({
	            className: 'location marker-cluster',
	            iconSize: [30, 30],
	            iconAnchor: [15, 15],
	            html: cluster.getChildCount()
	          });
	        },
	        maxClusterRadius: 10,
	        spiderfyOnMaxZoom: true,
	        spiderfyDistanceMultiplier: 2,
	        spiderLegPolylineOptions: { weight: 1.5, color: '#000' }
	        // disableClusteringAtZoom: 17
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


		// that.addLocations(APP.getData().locations);

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
        
        // that.addEvents();
       	this.base(arguments);
        
        that.loading(true);
    },

	// TODO: outsource in Router
    loadFromUrl: function( options ){
    	var that = this;

		var url = window.location.hash.split('#');
    	url = _.without(url, '');
    	var entryId = url[0];
    	
    	if(entryId) {
    		var lookup = that.lookupMarkerById(entryId);
    		if(lookup){
    			if(options && options.setView) that.map.setView( [lookup.location.lat, lookup.location.lon], 15);
    			that.selectMarker(lookup.marker, lookup.location);
    		}
    	}

    	// if(entryId) that.selectMarkerById(entryId);
    },

    loadNewData: function() {
    	var that = this;

    	// reset things
    	that.markerCluster.clearLayers();
		that.setMarkerLocationLookup([]);

		// get ALL data
		var locations = APP.getData().locations;
		
		// filter active?
        var filter = APP.getActiveFilter();
        if( filter ) {
        	
            locations = _.filter(locations, function(location){
        		// don't filter these location types:
        		if( _.contains([2, 3], location.type) ) return true;
                
                return location.category.name === filter.category;
            });

        }

		that.addLocations(locations);
		that.loadFromUrl();
        that.loading(false);

    },

    lookupMarkerById: function( id ){
    	var that = this;

    	var hit = _.find( that.getMarkerLocationLookup(), function(pair){
    		return pair.location.entryId == id;
    	});

    	return hit;
    	// if(hit) that.selectMarker(hit.marker, hit.location);
    },

    addEvents: function() {

    	var that = this;
    	
       	// this.base(arguments);
       	
       	// TODO inherit from View superclass
       	that.listen('languageChanged', function(){
            that.changeLanguage();
        });

	    //////////
    	// say //
	    //////////
		// map click (not fired on drag or marker click or sth, pure map click!)
		that.map.on('click', function(e) {
			that.say('mapclicked');
		});

		that.mapCurtain.on('click', function(e) {
			that.say('curtainclicked');
		});

		if( APP.getUserDevice() == 'phone' ){

			// $('#main-container').bind("transitionstart webkitTransitionStart oTransitionStart MSTransitionStart", function(){
			// 	if( $(this).hasClass('shifted') )
			// 		$('#lang-menu').hide();
			// 	else ( $(this).hasClass('shifted-small') )
			// 		$('#main-menu').hide();
			// });
			$('#main-container').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
				if( e.target != e.currentTarget ) return;
				if( !$(this).hasClass('shifted') && !$(this).hasClass('shifted-small') ){
					that.say('shiftMenuClosed');
				}
			});

		}

		//////////////
		// listen //
		//////////////
		that.listen('mapclicked', function(){
            that.deselectMarker();
        });

		// that.listen('appInitialized', function(){
		that.listen('DetailViewMobileRendered', function(){
		// that.listen('markersCreated', function(){
			that.loadFromUrl( {setView: true} );
		});

		that.listen('DetailViewRendered', function(){
			that.loadFromUrl( {setView: true} );
		});

    	// that.map.on('load', function(e){
    	// 	that.setZoomFilter();
    	// });

    	that.map.on('viewreset', function(e){
    		// that.setZoomFilter();s
    	});
    	
    	that.listen('fetchedNewData', function(){
    		that.loadNewData();
    	});

    	that.listen('filterSet', function(){
    		that.loadNewData();
    	});

    	// var $locateBtn = $('#locate-btn');
    	// $locateBtn.click(function(){
    	// 	// alert('haha');
    	// 	that.locate();
    	// });
		
		// that.locate();
		
    	// $('#locate-btn').on('touchend', function(){
    	// 	that.locate();
    	// });
    	
    },
    removeEvents: function() {

    },

    changeLanguage: function() {
    	var that = this;

        that.loading(true);
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

			// IniLocation
			if( location.type === 0 ) {
				iconSize = [30,30];
				iconAnchor = [15,15];
			}
			// MarketLocation
			else if( location.type === 1 ) {
				iconSize = [23,23];
				iconAnchor = [12,12];
			}
			// EventLocation
			else if( location.type === 2 ) {
				iconSize = [23,23];
				iconAnchor = [15,15];
			}
			// BasicLocation
			else if( location.type === 3 ) {

				// Gemeinschaftsunterkunft
				if( location.category && location.category.name === 'housing') {
					iconSize = [30,30];
					iconAnchor = [15,15];
				}
				// sonstige
				else {
					iconSize = [15,15];
					iconAnchor = [8,8];
				}

			}
			
			// TODO: quickfix: skip locations without coodinates
			if( !location.lat || !location.lon ) return false;

			var className = 'location';
			className += ' type-' + location.type;
			className += ' rating-' + location.rating;
			if( location.category ) className += ' cat cat-' + location.category.name;
			if( location.supportNeeded ) className += ' support-needed';

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
			
			var popup = L.popup({
				className: 'ddfa-popup',
				closeButton: false,
				offset: [0, 0]
			})
			    .setLatLng([location.lat, location.lon])
			    .setContent('<b>' + locationName + '</b>');

			marker.on('mouseover', function (e) {
	            that.map.openPopup(popup);
	        });
	        marker.on('mouseout', function (e) {
	            that.map.closePopup();
	        });
			

			// TODO load detail view
			marker.on('click', function(){
				that.selectMarker(marker, location);
			});

			// 	// $content.append('<p><a href="http://maps.google.com/?saddr=34.052222,-118.243611&daddr=37.322778,-122.031944" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
				
			// 	var userLocation = that.getUserLocation();
			// 	if ( userLocation )
			// 		$content.append('<p><a href="http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lng + '&daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
			// 	else
			// 		$content.append('<p><a href="http://maps.google.com/?daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');

			// 	$content.append('<p><button class="btn btn-default"><span class="fa fa-street-view" aria-hidden="true"></span> Show in Google Street View</button></p>');
				
			// });

			// if( location.type !== 3) that.markerCluster.addLayer(marker);
			if (location.type === 3) {
				that.basicLayer.addLayer(marker);
			}
			else {
				that.markerCluster.addLayer(marker);
			}

			var currentLookup = that.getMarkerLocationLookup();
			currentLookup.push( {location: location, marker: marker} );
			that.setMarkerLocationLookup( currentLookup );

			// newLayer.addLayer(marker);
			
		});
		
		that.say('markersCreated');

		// return newLayer;
    },

    selectMarker: function( marker, location ){
    	var that = this;

    	that.deselectMarker();
		that.setSelectedMarker(marker);

    	APP.getDetailView().load(location);
		$(marker._icon).addClass('active');

		window.location.hash = location.entryId;
    },

    deselectMarker: function(){
    	var that = this;

    	if( that.getSelectedMarker() ) {
    		$( that.getSelectedMarker()._icon ).removeClass('active');
    		that.setSelectedMarker(null);
			window.location.hash = '';
    	}

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
		    that.map.setView( e.latlng , 13);
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