qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {}
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.addEvents();
            that.say(that.classname + 'Rendered');
        },

        getWording: function( key ){
            var that = this;

            return APP.getLM().resolve(key);
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