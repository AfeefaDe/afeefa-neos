qx.Class.define("DetailView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('detailView');
		// that.setLoadable(true);

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

			// back button
			that.createBackBtn(function(){
				if( that.view.hasClass('active-large') ) {
					that.resize(1);
          that.say('detailViewMobileMinimized');
				}
				else {
					that.close();
				}
			});

			// scrollable content container
			that.scrollContainer = $("<div />").addClass('scroll-container');
			that.view.append(that.scrollContainer);
			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			// certificate badge
			var thePopper;
			that.certificateBadge = $("<div />")
				.addClass('badge badge-certificate')
				.hover(
					function(){
					  thePopper = new Popper(
						    that.certificateBadge,
						    {
						        content: that.getWording('tooltip.certificate'),
						        contentType: 'html'
						    },
						    {
					        placement: 'right',
									removeOnDestroy: true
						    }
						);
					},
					function(){
						thePopper.destroy();
					}
				);
		  that.scrollContainer.append(that.certificateBadge);

		  // message button
			that.messageBtn = $("<div />")
				.addClass('message-btn')
				.click(function(){
		   		APP.getFormView().load( 'contact', { entry: that.record, mustaches: { recipient: that.record.name } } );
				});
		  that.view.append(that.messageBtn);

			////////////////////
			// image property //
			////////////////////
			that.imageContainer = $("<div />").addClass('image-container');
			that.scrollContainer.append(that.imageContainer);
			
			//////////////////////
			// other properties //
			//////////////////////
			
			// generic
			var properties = ['category', 'times', 'descriptionShort', 'description', 'speakerPublic', 'spokenLanguages', 'location', 'arrival', 'openingHours', 'phone', 'mail', 'web', 'facebook'];
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
				
				// navigation hook
				if(prop == 'location'){
					var $link = $("<a />").css('display', 'none').attr('target', '_blank');
					that.scrollContainer.append($link);
					that['propertyContainer'+prop].click(function(){
						if( that.record.location[0] ){
							var userLocation = APP.getMapView().getUserLocation();
							if ( userLocation )
							   // $link.attr('href', 'http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lon + '&daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir/'+userLocation.lat+','+userLocation.lon+'/'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');
							else
							   // $link.attr('href', 'http://maps.google.com/?daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir//'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');

							$link[0].click();
						}
					});
				}
				else if(prop == 'descriptionShort'){
					that['propertyContainer'+prop].click(function(){
						if( that.record.description ) that.toggleLongDescription();
					});
				}

				that.scrollContainer.append(that['propertyContainer'+prop]);

			});

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		toggleLongDescription: function(){
			var that = this;

			var short = that['propertyContainer'+'descriptionShort'];
			var long = that['propertyContainer'+'description'];
			if( long.hasClass('hidden') ) {
				long.removeClass('hidden');
				short.removeClass('read-more');
			}
			else {
				long.addClass('hidden');
				short.addClass('read-more');
			}

			
		},

		load: function( record ){
			var that = this;
			
			// set URL (except entry is from external data source)
			// if(!record.external) window.location.hash = record.entryId;
			window.location.hash = record.entryId;

			if(that.record) {
				that.reset();
			}

			// set current record
			that.record = record;

			// view
			that.setViewState(1);
			that.view.addClass('type-' + record.type);
			if(record.category) that.view.addClass('cat-' + record.category.name);

			// scroll
			that.scrollContainer.scrollTop(0);
			that.scrollContainer.perfectScrollbar('update');

			// heading
			that.heading.append(record.name ? record.name : '');
			if(record.category) that.headingContainer.addClass('cat-' + record.category.name);

			// certificate badge
			if(record.certified) that.certificateBadge.show();

			// message button
			if(record.mail) that.messageBtn.show();

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

			// dont show read more link if there is no long description
			if( !record.description ) that['propertyContainer'+'descriptionShort'].removeClass('read-more');

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
			that['propertyName'+prop].append( record.subCategory ? that.getWording('cat.' + record.subCategory) : that.getWording('cat.' + propName) );

			// var createEntityLabel = { 0: that.getWording('entity_orga'), 1: that.getWording('entity_market'), 2: that.getWording('entity_event') };
			function createEntityLabel( record ){
				switch( record.type ){
					case 0:
					return that.getWording('entity.orga');
					case 1: 
					return record.offer ? that.getWording('entity.market.offer') : that.getWording('entity.market.request');
					case 2:
					return that.getWording('entity.event');
				}
			}
			// var value = entityLabels[record.type];
			var value = createEntityLabel(record);
			that['propertyValue'+prop].append(value);
			// if(record.location.length) that['propertyValue'+prop].append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
			that['propertyContainer'+prop].show();

			// location
			var prop = 'location';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = (record.location.length > 0) ? buildLocation(record) : that.getWording( 'prop.location.none' );
			function buildLocation(record){
				var location = '';
				if( record.location[0].placename ) location += record.location[0].placename + '<br>';
				if( record.location[0].street ) location += record.location[0].street + '<br>';
				if( record.location[0].zip && record.location[0].city) location += record.location[0].zip + ' ' + record.location[0].city + '<br>';
				else if( record.location[0].city ) location += record.location[0].city + '<br>';
				return location;
			}
			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// time information
			var prop = 'times';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = APP.getUtility().buildTimeString(record);

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
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
					
					// may create link
					if( _.contains( ['web', 'facebook'], prop) ){
						that['propertyValue'+prop].append('<a target="_blank" href="' + record[prop] + '">' + record[prop] + '</a>');
					}
					else if( _.contains( ['description', 'descriptionShort'], prop) ){
						that['propertyValue'+prop].append(record[prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));

						if(record.descriptionShort) that['propertyContainer'+'description'].addClass('hidden');
					}
					else if( _.contains( ['spokenLanguages'], prop) ){
						_.each( record[prop].split(',') , function( langCode ){
							const span = $('<span />')
								.addClass('multiselect-value')
								.append( that.getWording('lan.' + langCode) );
							that['propertyValue'+prop].append( span );
						});
					}
					else {
						that['propertyValue'+prop].append(record[prop]);
					}

					that['propertyContainer'+prop].show();
				}
				else if( record.location[0] && record.location[0][prop] ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );

					if( _.contains( ['arrival'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					} 
					else if( _.contains( ['openingHours'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					}
					else {
						that['propertyValue'+prop].append(record.location[0][prop]);
					}
					
					that['propertyContainer'+prop].show();
				}

			});

			// show DetailView
			that.view.addClass('active');
      that.isActive(true);

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

			that.certificateBadge.hide();
			that.messageBtn.hide();

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
			
			// description toggling
			that['propertyContainer'+'descriptionShort'].addClass('read-more');
			that['propertyContainer'+'description'].removeClass('hidden');

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
      that.isActive(false);
			that.say('detailViewClosed');
		},

		changeLanguage: function(){
			var that = this;
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

			that.listen('searchResultsLoaded', function(){
				that.close();
			});

			that.listen('searchViewClosed', function(){
				// that.view.removeClass('right');
			});

			that.listen('fetchedNewData', function(){
				if( that.record !== null) {
					// reload record
			    var newRecord = APP.getDataManager().getEntryByEntryId(that.record.entryId);
			    that.reset();
			    that.load(newRecord);
				}
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