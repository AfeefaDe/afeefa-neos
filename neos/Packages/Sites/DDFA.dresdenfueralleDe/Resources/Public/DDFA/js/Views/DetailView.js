qx.Class.define("DetailView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('detailView');
		that.setLoadable(true);

		that.record = null;
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			// TODO: remove this IE css hack when possible
			if( L.Browser.ie ) that.view.css('overflow', 'auto');

			// heading
			that.headingContainer = $("<div />").addClass('heading');
			that.heading = $("<h1 />");
			that.headingContainer.append(that.heading);
			that.view.append(that.headingContainer);

			// close button
		  that.closeBtn = $("<div />")
			.addClass('btn close-btn')
		  // bootstrap tooltip
			.click(function(){
			  that.close();
			});
		  that.view.append(that.closeBtn);

			// scrollable content container
			that.scrollContainer = $("<div />").addClass('scroll-container');
			that.view.append(that.scrollContainer);
			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			////////////////////
			// image property //
			////////////////////
			that.imageContainer = $("<div />").addClass('image-container');
			that.scrollContainer.append(that.imageContainer);
			
			//////////////////////
			// other properties //
			//////////////////////
			
			// generic
			// var properties = _.union( ['category'], APP.getConfig().simpleProperties,  ['location'] );, 
			var properties = ['category', 'times', 'description', 'speakerPublic', 'spokenLanguages', 'location', 'openingHours', 'phone', 'mail', 'web', 'facebook', 'dateFrom', 'dateTo'];
			_.each(properties, function(prop){

				that['propertyContainer'+prop] = $("<div />").addClass('property ' + prop);
				
				that['propertyIcon'+prop] = $("<div />").addClass('property-icon');
				that['propertyContainer'+prop].append(that['propertyIcon'+prop]);
				
				var catText = $("<div />").addClass('property-text');
				that['propertyName'+prop] = $("<p />").addClass('property-name');
				that['propertyValue'+prop] = $("<p />").addClass('property-value');
				catText.append(that['propertyName'+prop]);
				catText.append(that['propertyValue'+prop]);
				that['propertyContainer'+prop].append(catText);
				
				that.scrollContainer.append(that['propertyContainer'+prop]);

			});

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function( record ){
			var that = this;
			
			if(that.record) {
				that.reset();
			}

			// set current record
			that.record = record;

			// view
			that.setViewState(1);
			that.view.addClass('type-' + record.type);
			that.view.addClass('cat-' + record.category.name);

			// heading
			that.heading.append(record.name ? record.name : '');
			that.headingContainer.addClass('cat-' + record.category.name);

			////////////////////
			// image property //
			////////////////////
			if( record.imageType && record.image ) {
				
				switch(record.imageType){
					case 'youtube':
						// supposed, yt link is as 'https://www.youtube.com/watch?v=RURToWXI6QM'
						var ytid = record.image.substr(32);
						var ytEmbed = $( '<iframe width="100%" src="https://www.youtube.com/embed/' + ytid + '?rel=0&amp;showinfo=0' + '" frameborder="0" allowfullscreen></iframe>');
						that.imageContainer.append(ytEmbed);
						break;
					case 'image':
						var image = $( '<img src="' + record.image + '"/>');
						that.imageContainer.append(image);
						break;
				}

				that.imageContainer.addClass('active');
			}

			//////////////////////
			// other properties //
			//////////////////////
			
			// category
			var prop = 'category';
			var propName = record[prop] ? record[prop].name : 'nee';
			that['propertyIcon'+prop].addClass('cat-' + propName);
			// TODO dirty code for subcategory, but hey ;)
			that['propertyIcon'+prop].addClass('subcat-' + record.subCategory);
			that['propertyIcon'+prop].addClass('type-' + record.type);
			that['propertyName'+prop].append( record.subCategory ? that.getWording('cat_' + record.subCategory) : that.getWording('cat_' + propName) );

			var entityLabels = { 0: that.getWording('entity_orga'), 1: that.getWording('entity_market'), 2: that.getWording('entity_event') };
			var value = entityLabels[record.type];
			that['propertyValue'+prop].append(value);
			that['propertyContainer'+prop].show();

			// location
			var prop = 'location';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop_' + prop ) );
			
			var value = buildLocation(record);
			function buildLocation(record){
				var location = '';
				if( record.placename ) location += record.placename + '<br>';
				if( record.street ) location += record.street + '<br>';
				if( record.zip && record.city) location += record.zip + ' ' + record.city + '<br>';
				else if( record.city ) location += record.city + '<br>';
				return location;
			}
			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// time information
			var prop = 'times';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop_' + prop ) );
			
			var value = record.type !== 3 ? buildTimes(record.marketEntry) : buildTimes(record);

			function buildTimes(record){
				var times = '';
				
				var dateFrom = record.dateFrom? convertTime(record.dateFrom) : record.dateFrom;
				var dateTo = record.dateTo? convertTime(record.dateTo) : record.dateTo;
				var timeFrom = record.timeFrom;
				var timeTo = record.timeTo;

				if( dateFrom && timeFrom && dateTo && timeTo){
					times += 'vom ' + dateFrom + ' um ' + timeFrom + '<br>';
					times += 'bis ' + dateTo + ' um ' + timeTo;
				}
				else if( dateFrom && timeFrom && timeTo){
					times += dateFrom + ' von ' + timeFrom + ' bis ' + timeTo;
				}
				else if( dateFrom && timeFrom){
					times += dateFrom + ' um ' + timeFrom;
				}
				else if( dateFrom && dateTo){
					times += 'vom ' + dateFrom + ' bis ' + dateTo;
				}
				else if( dateFrom ){
					times += dateFrom;
				}
				
				function convertTime( timeValue ){
					var dateObj = new Date(timeValue);
					var formattedString = '';
					if( record.locale == 'de' ){
						formattedString = (dateObj.getDate()) +'.'+ (dateObj.getMonth()+1) +'.'+ (dateObj.getFullYear())
					} else {
						formattedString = timeValue;
					}

					return formattedString;
				}

				return times;
			}
			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// generic
			var properties = APP.getConfig().simpleProperties;
			_.each(properties, function(prop){

				// only render property if available
				if( record[prop] ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop_' + prop ) );
					
					// may create link
					if( _.contains( ['web', 'facebook'], prop) ){
						that['propertyValue'+prop].append('<a target="_blank" href="' + record[prop] + '">' + record[prop] + '</a>');
					}
					else if( _.contains( ['description'], prop) ){
						that['propertyValue'+prop].append(record[prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					}
					else if( _.contains( ['spokenLanguages'], prop) ){
						_.each( record[prop].split(',') , function( langCode ){
							const span = $('<span />')
								.addClass('multiselect-value')
								.append( that.getWording('lan_' + langCode) );
							that['propertyValue'+prop].append( span );
						});
					}
					else {
						that['propertyValue'+prop].append(record[prop]);
					}

					that['propertyContainer'+prop].show();
				}

			});

			// navigate + streetview
			// $content.append('<p><a href="http://maps.google.com/?saddr=34.052222,-118.243611&daddr=37.322778,-122.031944" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
			//  var userLocation = that.getUserLocation();
			//  if ( userLocation )
			//      $content.append('<p><a href="http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lng + '&daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
			//  else
			//      $content.append('<p><a href="http://maps.google.com/?daddr=' + marker.geo[0] + ',' + marker.geo[1] + '" target="_blank"><button class="btn btn-default"><span class="fa fa-location-arrow" aria-hidden="true"></span> Navigate</button></a></p>');
			//  $content.append('<p><button class="btn btn-default"><span class="fa fa-street-view" aria-hidden="true"></span> Show in Google Street View</button></p>');

			that.loading(false);

			// show DetailView
			that.view.addClass('active');

			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');

			that.say('detailViewOpened');
		},

		reset: function() {
			var that = this;

			// view
			that.view.removeClass('type-0 type-1 type-2 type-3');
			that.view.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			// heading
			that.heading.empty();
			that.headingContainer.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			// image property
			that.imageContainer.empty();
			that.imageContainer.removeClass('active image youtube');

			// entry icon
			that['propertyIconcategory'].removeClass('type-0 type-1 type-2 type-3');
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)subcat-\S+/g) || []).join(' ');
			});
			
			// generic
			var properties = _.union( ['category', 'location', 'times'], APP.getConfig().simpleProperties );
			
			_.each(properties, function(prop){
				that['propertyIcon'+prop].removeClass (function (index, css) {
					return (css.match (/(^|\s)icon-\S+/g) || []).join(' ');
				});
				that['propertyName'+prop].empty();
				that['propertyValue'+prop].empty();
				that['propertyContainer'+prop].hide();
			});
			
			// delete current record
			that.record = null;
		},

		close: function() {
			var that = this;
			
			// only close if active
			if(!that.getViewState()) return;

			that.view.removeClass('active');
			that.reset();
			that.setViewState(0);
			that.say('DetailViewClosed');
		},

		changeLanguage: function(){
			var that = this;

			that.loading(true);

			// if( that.record !== null) {

			//     var record = that.record;
			//     that.reset();
			//     that.load(record);
				
			// }

			// request that.record's entryId in current locale
			// var recordRelocalized;
			// recordRelocalized = 

			// load new record
			// that.load(recordRelocalized);
		},

		addEvents: function() {
			var that = this;

			this.base(arguments);

			that.listen('searchFieldFocused', function(){
				// if( APP.getUserDevice() === 'mobile' )
					that.close();
				// else
				// 	that.view.addClass('right');
			});

			that.listen('searchViewClosed', function(){
				// that.view.removeClass('right');
			});

			that.listen('includeViewOpened', function(){
				if( APP.getUserDevice() === 'mobile' )
					that.close();
			});

			that.listen('includeViewClosed', function(){
			});

			that.listen('mapMarkerDeselected', function(){
				that.close();
			});

			that.listen('mapclicked', function(){
				that.close();
			});

			that.headingContainer.click(function(){
				if( APP.getUserDevice() === 'desktop' || APP.getUserDevice() === 'tablet' )
					APP.getMapView().selectMarkerFromLink(that.record.entryId);
			});
		}

	}

});