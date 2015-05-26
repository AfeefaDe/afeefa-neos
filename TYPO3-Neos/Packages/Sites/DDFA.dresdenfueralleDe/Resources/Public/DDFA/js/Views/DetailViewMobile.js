qx.Class.define("DetailViewMobile", {
    
    extend : DetailView,
	type: "singleton",

    properties: {
    },

    construct: function(){
    	var that = this;

        that.setViewId('detailViewMobile');
    },

    members : {
        
    	addEvents: function(){
    		var that = this;

            // call superclass
            this.base(arguments);

            // enlargement steps
            that.headingContainer.click(function(){
                if ( that.view.hasClass('active') ){
                    that.view.removeClass('active');
                    that.view.addClass('active-large');
                }
                else if ( that.view.hasClass('active-large') ){
                    that.view.removeClass('active-large');
                    that.view.addClass('active');
                }
            });

            // TODO: swipe down to close
            // require( [ 'hammer' ], function( Hammer ){

            //     var hammer = new Hammer(that.view);
            //     hammer.on('swipedown', function(ev){
            //         that.close();
            //     });

            // });
        },

        close: function() {
            var that = this;
            
            // call superclass
            this.base(arguments);

            that.view.removeClass('active-large');
        },

    }

});