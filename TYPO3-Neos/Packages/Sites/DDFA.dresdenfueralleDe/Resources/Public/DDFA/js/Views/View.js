qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {},
        loadable: { init : false }
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.view.addClass('view-container');

            if( that.getLoadable() ) {
                var loadingCurtain = $("<div />").addClass('loading-curtain');
                that.view.append(loadingCurtain);
            }

            that.addEvents();
            that.say(that.classname + 'Rendered');
        },

        getWording: function( key ){
            var that = this;

            return APP.getLM().resolve(key);
        },

        loading: function( bool ){
            var that = this;

            if (bool) {
                that.view.addClass('loading');
            }
            else {
                that.view.removeClass('loading');
            }
                
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
                that.changeLanguage();
            });

            ////////////////////////////
            // AFTER VIEW IS RENDERED //
            ////////////////////////////
            that.listen(that.classname + 'Rendered', function(){
        
                // initialize bootstrap tooltips
                $(function () {
                    console.debug('init tooltips');
                    that.view.find('[data-toggle="tooltip"]').tooltip();
                })

            });
        },

        changeLanguage: function(){
            
        }
    }

});