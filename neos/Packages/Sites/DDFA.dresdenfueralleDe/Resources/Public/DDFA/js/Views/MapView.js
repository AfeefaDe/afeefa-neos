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

        // locate btn
    	that.locateBtn = $("<div />").attr('id', 'locate-btn');
        that.view.append(that.locateBtn);
    	
    	that.locateBtn.click(function(){
    		that.locate();
    	});
    	that.locateBtn.on('touchend', function(){
    		that.locate();
    	});


	    /////////////////
      	// MAPBOX INIT //
	    /////////////////
      	L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
		that.map = L.mapbox.map(that.getViewId(), 'felixkamille.4128d9e7', {
			zoomControl: false,
			maxBounds: [
    			L.latLng(50.835169, 13.099075), // south-west corner
    			L.latLng(51.365345, 14.759512)  // north-east corner
			],
			// attributionControl: true,
			tileLayer: {format: 'jpg70'},  // valid values are png, jpg, png32, png64, png128, png256, jpg70, jpg80, jpg90
			tapTolerance: 30,
			maxZoom: 18
    	}).setView([ 51.051, 13.74 ], 14);
		
		// Layer group for main markers (with clustering)
		that.layerForMainMarkers = new L.MarkerClusterGroup({
			iconCreateFunction: function(cluster) {
	          return new L.DivIcon({
	            className: 'location marker-cluster',
	            iconSize: [30, 30],
	            iconAnchor: [15, 15],
	            html: cluster.getChildCount()
	          });
	        },
	        maxClusterRadius: 3,
	        spiderfyOnMaxZoom: true,
	        spiderfyDistanceMultiplier: 2,
	        spiderLegPolylineOptions: { weight: 1.5, color: '#000' }
	        // disableClusteringAtZoom: 17
		});

		// Layer for basic locations
		that.layerForPOIMarkers = L.layerGroup();

		// add layer groups to map
		that.map.addLayer(that.layerForMainMarkers);
		that.map.addLayer(that.layerForPOIMarkers);


		//////////////////////////
		// Last Rendering Steps //
		//////////////////////////

       	// call View.render() --> calls MapView.addEvents() --> calls View.addEvents()
       	this.base(arguments);
        
        that.loading(true);

        // initial actions
		if (APP.getUserDevice() == 'mobile') that.locate();

    },

    addEvents: function() {

    	var that = this;
    	
       	this.base(arguments);
    	
    	that.listen('fetchedNewData', function(){
    		that.loadNewData();
    	});

    	// that.map.on('load', function(e){
    	// 	that.setZoomFilter();
    	// });

    	that.map.on('viewreset', function(e){
    		// that.setZoomFilter();s
    	});

    	that.listen('filterSet', function(){
    		that.loadNewData();
    	});
       	
		// map click (not fired on drag or marker click or sth, pure map click!)
		that.map.on('click', function(e) {
			that.say('mapclicked');
		});

		that.mapCurtain.on('click', function(e) {
			that.say('curtainclicked');
		});

		if( APP.getUserDevice() == 'phone' ){
			$('#main-container').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
				if( e.target != e.currentTarget ) return;
				if( !$(this).hasClass('shifted') && !$(this).hasClass('shifted-small') ){
					that.say('shiftMenuClosed');
				}
			});
		}

		that.listen('mapclicked', function(){
            that.deselectMarker();
        });

		that.listen('DetailViewMobileRendered', function(){
			that.loadFromUrl( {setView: true} );
		});

		that.listen('DetailViewRendered', function(){
			that.loadFromUrl( {setView: true} );
		});

    },
    removeEvents: function() {

    },

    loadNewData: function() {
    	var that = this;

    	// reset things
    	that.removeMarkers();

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

		that.addMarkers(locations);
		that.loadFromUrl({setView: true});
        that.loading(false);

    },

    addMarkers: function(locations) {
	 	
	 	var that = this;

	 	// var newLayer = new L.LayerGroup();

    	_.each(locations, function(location){

			// type specific adjustment
			var iconSize, iconAnchor;

			// IniLocation
			if( location.type === 0 ) {
				iconSize = [24,24];
				iconAnchor = [12,12];
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
			if( location.category ) className += ' cat-' + location.category.name;
			if( location.subCategory ) className += ' subcat-' + location.subCategory;
			if( location.supportNeeded ) className += ' support-needed';

			////////////
			// MARKER //
			////////////
			var marker = L.marker( [location.lat, location.lon] , {
				riseOnHover: true,
			    icon: L.divIcon({
	                className: className,
	                iconSize: iconSize,
	                iconAnchor: iconAnchor
	            })
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
				className: 'afeefa-popup',
				closeButton: false,
				offset: [0, 0]
			})
			    .setLatLng([location.lat, location.lon])
			    .setContent('<span class="title">' + locationName + '</span><span class="category">' +that.getWording('cat_' + location.category.name)+ '</span>');

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

			if (location.type === 3) {
				that.layerForPOIMarkers.addLayer(marker);
			}
			else {
				that.layerForMainMarkers.addLayer(marker);
			}

			var currentLookup = that.getMarkerLocationLookup();
			currentLookup.push( {location: location, marker: marker} );
			that.setMarkerLocationLookup( currentLookup );

			// newLayer.addLayer(marker);
			
		});
		
		that.say('markersCreated');

		// return newLayer;
    },

    removeMarkers: function() {

    	var that = this;

    	that.layerForMainMarkers.clearLayers();
    	that.layerForPOIMarkers.clearLayers();
		
		that.setMarkerLocationLookup([]);

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
    			if(options && options.setView)
    				that.map.setView( [lookup.location.lat, lookup.location.lon], 16);
				that.selectMarker(lookup.marker, lookup.location);
    		}
    	}

    	// if(entryId) that.selectMarkerById(entryId);
    },

    lookupMarkerById: function( id ){
    	var that = this;

    	var hit = _.find( that.getMarkerLocationLookup(), function(pair){
    		return pair.location.entryId == id;
    	});

    	return hit;
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

    selectMarker: function( marker, location, setView ){
    	var that = this;

    	that.deselectMarker();
		that.setSelectedMarker(marker);

		if(setView) that.map.setView( [location.lat, location.lon], 16);
		$(marker._icon).addClass('active');
		
    	APP.getDetailView().load(location);

		window.location.hash = location.entryId;

    },

    selectMarkerFromLink: function( entryId ) {
    	var that = this;

    	var lookup = that.lookupMarkerById( entryId );
        
        if(lookup){
            APP.getMapView().selectMarker(lookup.marker, lookup.location, true);
        }

    },

    deselectMarker: function(){
    	var that = this;

    	if( that.getSelectedMarker() ) {
    		$( that.getSelectedMarker()._icon ).removeClass('active');
    	}

		window.location.hash = '';
		APP.getDetailView().close();
		that.setSelectedMarker(null);

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