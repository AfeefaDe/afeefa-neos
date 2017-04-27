qx.Class.define("MapView", {
	
	extend : View,
	type: "singleton",
	
	properties : {
		userLocation: {},
		entryMarkerLookup: {},
		selectedMarker: {},
		viewCoords: {}
	},
	
	construct: function(){
		var that = this;

		that.setViewId('mapView');

		// that.setLoadable(true);
		that.setUserLocation(null);
		that.setSelectedMarker(null);
		that.setEntryMarkerLookup([]);
		that.setViewCoords({
			dresden: { lat: 51.051, lon: 13.74, zoom: 14 },
			pirna: { lat: 50.957456, lon: 13.937007, zoom: 14 },
			leipzig: { lat: 51.336143, lon: 12.362952, zoom: 14 },
			bautzen: { lat: 51.1803977, lon: 14.4242263, zoom: 14 }
		});
	},

	members : {
		
		render : function() {
				
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			/////////////////
			// MAPBOX INIT //
			/////////////////
			L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
			that.map = L.mapbox.map(that.getViewId(), 'felixkamille.4128d9e7', {
			zoomControl: false,
			maxBounds: [
					L.latLng(50.115749, 11.804513), // south-west corner
					L.latLng(51.757315, 15.118189)  // north-east corner
			],
			// attributionControl: true,
			tileLayer: {format: 'jpg70'},  // valid values are png, jpg, png32, png64, png128, png256, jpg70, jpg80, jpg90
			tapTolerance: 30,
			maxZoom: 20
			}).setView([ that.getViewCoords()[APP.getArea()].lat, that.getViewCoords()[APP.getArea()].lon ], that.getViewCoords()[APP.getArea()].zoom);
		
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
					// disableClusteringAtZoom: 16
		});

		// Layers for content-specific data (e.g. wifi networks) to handle them seperately (e.g. zoom-dependent visibility)
		that.layerForWifiMarkers = L.layerGroup();

		// add layer groups to map
		that.map.addLayer(that.layerForMainMarkers);
		// that.map.addLayer(that.layerForWifiMarkers);


		//////////////////////////
		// Last Rendering Steps //
		//////////////////////////

				// call View.render() --> calls MapView.addEvents() --> calls View.addEvents()
				this.base(arguments);
				
				// initial actions
				// that.locate( APP.getUserDevice() == 'mobile' );
		},

		addEvents: function() {

			var that = this;
			
				this.base(arguments);
			
			that.listen('fetchedNewData', function(){
				that.loadNewData();
			});

			that.map.on('load', function(e){
				that.applyInteractiveFilters();
			});

			that.map.on('viewreset', function(e){
				that.applyInteractiveFilters();
			});

			that.listen('filterSet', function(){
				that.loadNewData();
			});

			that.listen('markersCreated', function(){
				that.applyInteractiveFilters();
			});

			// map click (not fired on drag or marker click or sth, pure map click!)
			that.map.on('click', function(e) {
				that.say('mapclicked');
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

			that.listen('DetailViewClosed', function(){
					that.deselectMarker();
			});

			that.listen('searchResultsLoaded', function(){
					// that.beShy(true);
			});

			// that.map.on('zoomend', function(){
			// 	if(that.getSelectedMarker()){
			// 		try{ that.layerForMainMarkers.getVisibleParent(that.getSelectedMarker()).spiderfy(); } catch(e){}
			// 	}
			// });
		},
		removeEvents: function() {

		},

		loadNewData: function() {
			var that = this;

			// reset things
			that.removeMarkers();

			// aplly filters
			var filter = APP.getActiveFilter();
			
			var entries = _.filter(APP.getData().entries, function(entry){
				// only entries with location data
				if( entry.location.length < 1) return false;
				
				// legend filter active?
				if( filter ) {
					if( filter.category !== undefined )
						if( !entry.category || !(entry.category.name === filter.category) ) return false;

					if( filter.subCategory !== undefined )
						if( !(entry.subCategory === filter.subCategory) ) return false;

					if( filter.tags !== undefined )
						if( !entry.tags || entry.tags.indexOf(filter.tags) < 0 ) return false;

					if( filter.type !== undefined )
						if( !(entry.type === parseInt(filter.type)) ) return false;

					if( filter.forChildren !== undefined )
						if( !(entry.forChildren === filter.forChildren) ) return false;

					if( filter.supportWanted !== undefined )
						if( !(entry.supportWanted === filter.supportWanted) ) return false;
				};
				
				// show markers depending on zoom level
				// if( entry.subCategory == 'wifi' ){
				// 	// that.map.getZoom() < 16 )
				// 	if( filter && filter.subCategory && filter.subCategory == 'wifi' )
				// 		return true;
				// 	else
				// 		return false;
				// }

				return true;

			});

			that.addMarkers(entries);
			// that.loadFromUrl({setView: true});
		},

		addMarkers: function(entries) {
		
		var that = this;

		// var newLayer = new L.LayerGroup();

		_.each(entries, function(entry){

			// type specific adjustment
			var iconSize, iconAnchor;

			// IniLocation
			if( entry.type === 0 ) {
				iconSize = [24,24];
				iconAnchor = [12,12];
			}
			// MarketLocation
			else if( entry.type === 1 ) {
				iconSize = [23,23];
				iconAnchor = [12,12];
			}
			// EventLocation
			else if( entry.type === 2 ) {
				iconSize = [23,23];
				iconAnchor = [15,15];
			}
			// BasicLocation
			else if( entry.type === 3 ) {
				iconSize = [23,23];
				iconAnchor = [12,12];
			}
			
			// TODO: quickfix: skip locations without coodinates
			if( !entry.location[0].lat || !entry.location[0].lon ) return false;

			var className = 'location';
			className += ' type-' + entry.type;
			if( entry.category ) className += ' cat-' + entry.category.name;
			if( entry.subCategory ) className += ' subcat-' + entry.subCategory;
			if( entry.supportNeeded ) className += ' support-needed';

			////////////
			// MARKER //
			////////////
			var marker = L.marker( [entry.location[0].lat, entry.location[0].lon] , {
				riseOnHover: true,
				icon: L.divIcon({
					className: className,
					iconSize: iconSize,
					iconAnchor: iconAnchor,
					html: function(){
						var html = '';
						if(entry.type == 2){
							var classString = 'type-' + entry.type;
							if( entry.category ) classString += ' cat-' + entry.category.name;
							if( entry.subCategory ) classString += ' subcat-' + entry.subCategory;
							// the diamond
							html = '<span class="' + classString + ' event-shape"></span>';
							// the icon
							html += '<span class="' + classString + ' event-icon"></span>';
						}
						return html;
					}()
				})
			});

			///////////
			// POPUP //
			///////////
			var locationName = entry.name;
			// if (!locationName) {
			// 	if( location.type === 0 ) locationName = location.initiative.name;
			// 	else if( location.type === 1 ) locationName = location.marketEntry.name;
			// 	else if( location.type === 2 ) locationName = location.event.name;
			// }
			
			var popup = L.popup(
				{
					className: 'afeefa-popup',
					closeButton: false,
					offset: [0, 0]
				})
				.setLatLng([entry.location[0].lat, entry.location[0].lon])
				.setContent(function(){
					var container = $("<div />"),
							titleLabel = $("<span />").addClass('title'),
							categoryLabel = $("<span />").addClass('category');
							dateLabel = $("<span />").addClass('date');
					
					container.append(titleLabel);
					container.append(categoryLabel);
					container.append(dateLabel);

					titleLabel.append(locationName);

					if(entry.subCategory){
						categoryLabel.append( that.getWording('cat.' + entry.subCategory) );
						categoryLabel.append( ' (' + (entry.category ? that.getWording('cat.' + entry.category.name) : '[category missing]') + ')' );
					}
					else {
						categoryLabel.append( entry.category ? that.getWording('cat.' + entry.category.name) : '[category missing]' );
					}

					if(entry.type == 2) {
						dateLabel.append(APP.getUtility().buildTimeString(entry));
					}

					container.on('click', function(e){
						APP.getDetailView().load(entry);
						if( APP.getUserDevice() == 'mobile' ){
							APP.getDetailView().resize(2);
							APP.getDetailView().say('detailViewMobileMaximized');
						}
					});

					return container[0];
				}());

				marker.bindPopup(popup);
				

				marker.on('mouseover', function (e) {
						that.map.openPopup(popup);
				});
				marker.on('mouseout', function (e) {
						that.map.closePopup();
				});
			

			// TODO load detail view
			marker.on('click', function(){
				that.selectMarker(marker, entry);
			});

			if (entry.type === 3 && entry.subCategory && entry.subCategory == 'wifi') {
				that.layerForWifiMarkers.addLayer(marker);
			}
			else {
				that.layerForMainMarkers.addLayer(marker);
			}

			var currentLookup = that.getEntryMarkerLookup();
			currentLookup.push( {entry: entry, marker: marker} );
			that.setEntryMarkerLookup( currentLookup );

			// newLayer.addLayer(marker);
			
		});
		
		that.say('markersCreated');

		// return newLayer;
		},

		removeMarkers: function() {

			var that = this;

			that.layerForMainMarkers.clearLayers();
			that.layerForWifiMarkers.clearLayers();
		
			that.setEntryMarkerLookup([]);

		},

		setViewToArea: function(areaName){
			var that = this;

			if( areaName == 'pirna' ) {
				that.map.setView([ that.getViewCoords().pirna.lat, that.getViewCoords().pirna.lon ], that.getViewCoords().pirna.zoom);
			}
			else {
				console.log('city mentioned in URl not defined');
			}
		},

		loadEntryById: function(id, options){
			var that = this;

			var lookup = that.lookupEntryById(id);
				// if(lookup){
					// if(options && options.setView)
					// 	that.map.setView( [lookup.entry.location[0].lat, lookup.entry.location[0].lon], 16);
					// that.selectMarker(lookup.marker, lookup.entry, options);
				// }
				if(lookup && lookup.marker) that.selectMarker(lookup.marker, lookup.entry, options);
				else that.selectMarker(null, lookup, options);
		},

		lookupEntryById: function( id ){
			var that = this;

			var hit;
			
			// does the entry have a marker on the map?
			hit = _.find( that.getEntryMarkerLookup(), function(pair){
				return pair.entry.entryId == id;
			});

			// if no marker, only find the entry
			if(!hit) hit = _.find(APP.getData().entries, function(entry){
				return entry.entryId == id;
			});

			return hit;
		},

		changeLanguage: function() {
			var that = this;
		},
	 //  addMarkersGeoJSON: function(markers, color) {
		
		// var that = this;

	 //  	var featureLayer = L.mapbox.featureLayer()
		 //    .loadURL('/_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/js/geojson/inis.geojson')
		 //    .addTo(that.map);

	 //  },

		selectMarker: function( marker, entry, options ){
			var that = this;

			if(options === undefined) options = {};

			that.deselectMarker();
			that.setSelectedMarker(marker);

			if(marker){
				if(options && options.setView) that.map.setView( [entry.location[0].lat, entry.location[0].lon], 16);
				try{ that.layerForMainMarkers.getVisibleParent(marker).spiderfy(); } catch(e){}
				$(marker._icon).addClass('active');
				marker.openPopup();
			}

			if(!options.preventDetailView) APP.getDetailView().load(entry);
		},

		selectMarkerFromLink: function( entryId, options ) {
			var that = this;

			if(options === undefined) options = {};

			var lookup = that.lookupEntryById( entryId );
				
			if(lookup && lookup.marker){
					options.setView = true;
					APP.getMapView().selectMarker(lookup.marker, lookup.entry, options);
			}

		},

		deselectMarker: function(){
			var that = this;

			if( that.getSelectedMarker() ) {
				$( that.getSelectedMarker()._icon ).removeClass('active');
				// that.layerForMainMarkers.getVisibleParent(that.getSelectedMarker()).unspiderfy();
			}

			window.location.hash = '';
			that.say('mapMarkerDeselected');
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

		applyInteractiveFilters: function(){
			var that = this;

			if( that.map.getZoom() >= 16){
				// show wifi networks on high zoom levels only
				if( !that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.addLayer(that.layerForWifiMarkers);
			} else {
				if( that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.removeLayer(that.layerForWifiMarkers);
			}

			var filter = APP.getActiveFilter();
			if( filter && filter.subCategory && filter.subCategory == 'wifi' ){
				if( !that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.addLayer(that.layerForWifiMarkers);
			}

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
		locate: function(setView) {

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
				if(setView) that.map.setView( e.latlng , 15);
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
				// alert('Locating failed');
		});
		},

		beShy: function(bool){
			var that = this;

			console.warn('map is being shy');
			// that.showCurtain(true);

			if(bool) that.view.addClass('shy');
			else that.view.removeClass('shy');
		}

	}
});