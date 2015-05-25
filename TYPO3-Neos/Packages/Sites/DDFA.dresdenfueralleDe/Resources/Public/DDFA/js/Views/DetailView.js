qx.Class.define("DetailView", {
    
    extend : View,
	type: "singleton",

    properties: {
        viewId: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('detailView');
    },

    members : {
        
    	render: function(){
    		var that = this;

    		// view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // heading
            that.headingContainer = $("<div />").addClass('heading');
            
            that.heading = $("<h1 />");
            that.headingContainer.append(that.heading);

            that.view.append(that.headingContainer);

            // scrollable content container
            var scrollContainer = $("<div />").addClass('scroll-container');
            that.view.append(scrollContainer);
            
            ////////////////////
            // image property //
            ////////////////////
            that.imageContainer = $("<div />").addClass('image');
            
            that.image = $("<img />");
            that.imageContainer.append(that.image);

            scrollContainer.append(that.imageContainer);
            
            //////////////////////
            // other properties //
            //////////////////////
            
            // generic
            var properties = _.union( ['category', 'location'], APP.getConfig().simpleProperties );
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
                
                scrollContainer.append(that['propertyContainer'+prop]);

            });

            $('body').append(that.view);

            that.addEvents();
        },

        load: function( record ){
            var that = this;
            
            if(that.record) {
                if(that.record === record) {
                    that.reset();
                    that.close();
                    return;
                }
                that.reset();
            }

            // set current record
            that.record = record;

            // record type
            that.view.addClass('type-' + record.type);
            
            // heading
            that.heading.append(record.name ? record.name : '');

            ////////////////////
            // image property //
            ////////////////////
            var imagePath = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/img/';
            if( record.image ) {
                that.imageContainer.css('height', that.view.innerWidth()*0.6);
                that.imageContainer.addClass(record.image.type);
                that.imageContainer.show();

                that.image.attr('src', imagePath + record.image.src);
            }

            //////////////////////
            // other properties //
            //////////////////////
            
            // category
            var prop = 'category';
            that['propertyIcon'+prop].addClass('icon-' + record[prop]);
            that['propertyName'+prop].append(record[prop]);
            var value = (record.type !== 1) ? 'official entry' : 'private entry';
            that['propertyValue'+prop].append(value);
            that['propertyContainer'+prop].show();

            // location
            var prop = 'location';
            that['propertyIcon'+prop].addClass('icon-' + prop);
            that['propertyName'+prop].append(prop);
            
            var value = buildLocation(record);
            function buildLocation(record){
                var location = '';
                if( record.street ) location += record.street;
                // if( record.district ) location += ' ' + '(' + record.district + ')';
                if( record.zip && record.city) location += '<br>' + record.zip + ' ' + record.city;
                else if( record.city ) location += '<br>' + record.city;
                return location;
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
                    that['propertyName'+prop].append(prop);
                    that['propertyValue'+prop].append(record[prop]);
                    that['propertyContainer'+prop].show();
                }

            });

            // show DetailView
            that.view.addClass('active');
        },

        reset: function() {
            var that = this;

            // record type
            that.view.removeClass('type-0 type-1 type-2 type-3');

            // heading
            that.heading.empty();

            // image property
            that.imageContainer.hide();
            that.imageContainer.removeClass('logo photo');

            // other properties
            
            // generic
            var properties = _.union( ['category', 'location'], APP.getConfig().simpleProperties );
            // var properties = APP.getConfig().simpleProperties;
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
            that.reset();
            that.view.removeClass('active');
        },

        changeLanguage: function(){

            // request that.record's entryId in current locale
            var recordRelocalized;
            // recordRelocalized = 

            // load new record
            that.load(recordRelocalized);
        },

        addEvents: function() {
            var that = this;

            that.listen('mapclicked', function(){
                that.close();
            });

        }
    }

});