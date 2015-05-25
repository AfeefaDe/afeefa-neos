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

            that.listen('mapclicked', function(){
                that.close();
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
            that.reset();
            that.view.removeClass('active');
            that.view.removeClass('active-large');
        },

    }

});