qx.Class.define("IncludeView", {
    
    extend : View,
	type: "singleton",

    properties: {
        includes: {},
        baseUrl: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('includeView');
        that.setIncludes({
            refugeeGuide: 'refugeeGuide',
            supporterGuide: 'supporterGuide',
            imprint: 'imprint',
            press: 'press',
            donate: 'donate'
        });
        that.setBaseUrl( '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/inc/' );
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // content
            that.content  = $("<div />");
            that.content.addClass('content');
            that.view.append(that.content);

            that.closeBtn = $("<div />").addClass('closeBtn').append('x');
            that.view.append(that.closeBtn);

            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        load: function( includeKey ){
            var that = this;

            that.reset();
            
            that.view.addClass('active');
            that.view.addClass(includeKey);

            that.say('includeViewOpened');
            
            if(includeKey == that.getIncludes().supporterGuide){
                that.content.load( that.getBaseUrl() + that.getIncludes()[includeKey] + "_de.html", function( response, status, xhr ) {

                });
            }
            else if(includeKey == that.getIncludes().imprint){
                that.content.load( that.getBaseUrl() + that.getIncludes()[includeKey] + ".html", function( response, status, xhr ) {

                });
            } else {
                
                that.content.load( that.getBaseUrl() + that.getIncludes()[includeKey] + '_' + APP.getLM().getCurrentLang() + ".html", function( response, status, xhr ) {
                // that.content.load( that.getBaseUrl() + "inc/refugeeGuide_en.html", function( response, status, xhr ) {

                    if ( status == "error" ) {

                        that.content.load( that.getBaseUrl() + that.getIncludes()[includeKey] + '_en.html', function( response, status, xhr ) {
                            
                            if ( status == "error" ) {

                                that.content.load( that.getBaseUrl() + that.getIncludes()[includeKey] + '_de.html', function( response, status, xhr ) {
                                    loadComplete();
                                });

                            }

                            loadComplete();

                        });

                    }

                    loadComplete();

                });

                function loadComplete(){
                    
                    $('span.locationLink').click(function(){
                        var lookup = APP.getMapView().lookupMarkerById( $(this).attr('name') );
                        if(lookup){
                            APP.getMapView().selectMarker(lookup.marker, lookup.location);
                            APP.getMapView().map.setView( [lookup.location.lat, lookup.location.lon], 15);
                        }
                    });

                }

            }

        },

        reset: function(){
            var that = this;

            that.content.empty();
        },

        minimize: function(bool){
            var that = this;

            if( bool ) that.view.addClass('small')
            else that.view.removeClass('small')
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.closeBtn.click(function(){
                that.close();
                that.say('includeViewClosed');
            });

            that.listen('detailViewOpened', function(){
                that.minimize(true);
            });
            
            // that.listen('detailViewMobileMaximized', function(){
            //     that.minimize(true);
            // });

            // that.listen('detailViewMobileMinimized', function(){
            //     that.minimize(true);
            // });

            that.listen('detailViewClosed', function(){
                that.minimize(false);
            });


            // that.menuBtn.click(function(){
            //     $('#main-container').addClass('shifted-left');
            // });

            // that.listen('curtainclicked', function(){
            //     $('#main-container').removeClass('shifted-left');
            // });
            
        },

        close: function(){
            var that = this;

            that.view.removeClass('active');
            _.each(that.getIncludes(), function(value, key){
                that.view.removeClass(value);
            });
            
            that.say('includeViewClosed');
        },

        changeLanguage: function(){
            var that = this;

        }
    }

});