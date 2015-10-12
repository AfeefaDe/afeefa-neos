qx.Class.define("DetailViewMobile", {
    
    extend : DetailView,
	type: "singleton",

    properties: {
    },

    construct: function(){
    	var that = this;

        that.setViewId('detailViewMobile');
        that.setLoadable(true);
        that.record = null;
    },

    members : {
        
    	addEvents: function(){
    		var that = this;

            // call superclass
            this.base(arguments);

            // enlargement steps
            that.headingContainer.click(function(){
                if( that.view.hasClass('active-large') && that.view.hasClass('active') ){
                    that.resize(1);
                    that.say('detailViewMobileMinimized');
                }
                else if ( that.view.hasClass('active') ){
                    that.resize(2);
                    that.say('detailViewMobileMaximized');
                }
                else if ( that.view.hasClass('active-large') ){
                    that.resize(1);
                }
            });

            // that.listen('includeViewClicked', function(e){
            //     if( e.customData.viewState == 1 )
            //         that.close();
            // });

        },

        // parameter state: 0 = complete close, 1 = small, 2 = large
        resize: function( state ){
            var that = this;

            // close completely
            if( !state ){
                that.close();
            }
            // small state
            else if( state == 1 ){
                that.view.removeClass('active-large');
                that.view.addClass('active');
            }
            // large state
            else if( state == 2 ){
                that.view.removeClass('active');
                that.view.addClass('active-large');
            }
            
        },

        close: function() {
            var that = this;
            
            // call superclass
            this.base(arguments);
            
            that.view.removeClass('active-large');
        },

    }

});