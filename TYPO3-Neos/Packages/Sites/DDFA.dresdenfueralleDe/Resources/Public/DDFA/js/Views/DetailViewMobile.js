qx.Class.define("DetailViewMobile", {
    
    extend : DetailView,
	type: "singleton",

    properties: {
    },

    construct: function(){
    	var that = this;

        that.setViewId('detailViewMobile');
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
                }
                else if ( that.view.hasClass('active') ){
                    that.resize(2);
                }
                else if ( that.view.hasClass('active-large') ){
                    that.resize(1);
                }
            });

            ////////////////////
            // swipe gestures //
            ////////////////////
            require( [ 'hammer' ], function( Hammer ){

                var hammer = new Hammer(that.headingContainer[0]);
                hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, treshold: 0 });
                hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL, treshold: 0 });

                hammer.on('swipedown', function(ev){
                    that.resize(1);
                });

                hammer.on('swipeup', function(ev){
                    that.resize(2);
                });

                // hammer.on('pandown panup', function(ev){
                //     console.debug('pandown', ev.deltaY, ev);
                //     if( ev.deltaY >= 0 ) that.view.css('bottom', -(ev.deltaY) );
                // });

                // hammer.on('panend', function(ev){
                //     console.debug('panend', ev.deltaY, ev);
                //     if(ev.deltaY > 100) {
                //         that.close();
                //         that.view.css('bottom', "" );
                //     } else {
                //         that.view.css('bottom', "" );
                //     }
                // });

            });

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